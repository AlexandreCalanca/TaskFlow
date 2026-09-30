package com.taskflowkanban.kanban_backend;

import com.taskflowkanban.kanban_backend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final BoardRepository boardRepository;

    @Override
    @Transactional(readOnly = true)
    public void run(String... args) {
        System.out.println("\n========== TESTE DE MAPEAMENTO COMPLETO ==========");

        boardRepository.findAll().forEach(board -> {
            System.out.println(" Quadro: " + board.getName() + " (ID: " + board.getId() + ")");

            board.getColumns().forEach(col -> {
                System.out.println("   Coluna [" + col.getPosition() + "]: " + col.getName());

                col.getTasks().forEach(task -> {
                    System.out.println("     Tarefa [" + task.getPosition() + "]: " + task.getTitle());

                    task.getSubtasks().forEach(sub -> {
                        String status = sub.getIsCompleted() ? "[X]" : "[ ]";
                        System.out.println("       " + status + " Subtarefa [" + sub.getPosition() + "]: " + sub.getTitle());
                    });
                });
            });
        });

        System.out.println("==================================================\n");
    }
}