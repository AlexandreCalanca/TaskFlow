package com.taskflowkanban.kanban_backend;

import com.taskflowkanban.kanban_backend.repository.BoardRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class KanbanBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(KanbanBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner runTest(BoardRepository boardRepository) {
		return args -> {
			System.out.println("=========================================");
			boardRepository.findAll().forEach(board -> {
				System.out.println("Board recuperado do PostgreSQL -> ID: " + board.getId() + " | Nome: " + board.getName());
			});
			System.out.println("=========================================");
		};
	}
}