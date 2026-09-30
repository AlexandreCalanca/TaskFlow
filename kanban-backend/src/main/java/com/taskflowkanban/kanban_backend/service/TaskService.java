package com.taskflowkanban.kanban_backend.service;

import com.taskflowkanban.kanban_backend.dto.TaskCreateDTO;
import com.taskflowkanban.kanban_backend.dto.TaskMoveDTO;
import com.taskflowkanban.kanban_backend.dto.TaskResponseDTO;
import com.taskflowkanban.kanban_backend.model.ColumnEntity;
import com.taskflowkanban.kanban_backend.model.Subtask;
import com.taskflowkanban.kanban_backend.model.Task;
import com.taskflowkanban.kanban_backend.repository.ColumnRepository;
import com.taskflowkanban.kanban_backend.repository.SubtaskRepository;
import com.taskflowkanban.kanban_backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ColumnRepository columnRepository;
    private final SubtaskRepository subtaskRepository;

    @Transactional
    public TaskResponseDTO createTask(TaskCreateDTO dto) {
        ColumnEntity column = columnRepository.findById(dto.columnId())
                .orElseThrow(() -> new RuntimeException("Coluna não encontrada com ID: " + dto.columnId()));

        int nextPosition = column.getTasks().size() + 1;

        Task task = Task.builder()
                .title(dto.title())
                .description(dto.description())
                .position(nextPosition)
                .column(column)
                .subtasks(new ArrayList<>())
                .build();

        if (dto.subtasks() != null && !dto.subtasks().isEmpty()) {
            for (int i = 0; i < dto.subtasks().size(); i++) {
                Subtask subtask = Subtask.builder()
                        .title(dto.subtasks().get(i))
                        .position(i + 1)
                        .isCompleted(false)
                        .task(task)
                        .build();
                task.getSubtasks().add(subtask);
            }
        }

        Task saved = taskRepository.save(task);
        return TaskResponseDTO.fromEntity(saved);
    }

    @Transactional
    public TaskResponseDTO moveTask(Long taskId, TaskMoveDTO dto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com ID: " + taskId));

        if (!task.getColumn().getId().equals(dto.targetColumnId())) {
            ColumnEntity newColumn = columnRepository.findById(dto.targetColumnId())
                    .orElseThrow(() -> new RuntimeException("Coluna destino não encontrada"));
            task.setColumn(newColumn);
        }

        task.setPosition(dto.newPosition());
        Task updated = taskRepository.save(task);
        return TaskResponseDTO.fromEntity(updated);
    }

    @Transactional
    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    @Transactional
    public void toggleSubtask(Long subtaskId) {
        Subtask subtask = subtaskRepository.findById(subtaskId)
                .orElseThrow(() -> new RuntimeException("Subtarefa não encontrada com ID: " + subtaskId));
        subtask.setIsCompleted(!subtask.getIsCompleted());
        subtaskRepository.save(subtask);
    }
}
