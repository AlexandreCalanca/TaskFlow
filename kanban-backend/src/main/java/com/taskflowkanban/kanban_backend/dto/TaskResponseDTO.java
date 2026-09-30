package com.taskflowkanban.kanban_backend.dto;

import com.taskflowkanban.kanban_backend.model.Task;
import java.time.LocalDateTime;
import java.util.List;

public record TaskResponseDTO(
        Long id,
        String title,
        String description,
        Integer position,
        LocalDateTime createdAt,
        List<SubtaskResponseDTO> subtasks
) {
    public static TaskResponseDTO fromEntity(Task task) {
        return new TaskResponseDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPosition(),
                task.getCreatedAt(),
                task.getSubtasks().stream().map(SubtaskResponseDTO::fromEntity).toList()
        );
    }
}