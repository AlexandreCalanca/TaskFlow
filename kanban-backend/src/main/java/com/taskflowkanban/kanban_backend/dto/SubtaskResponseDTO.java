package com.taskflowkanban.kanban_backend.dto;

import com.taskflowkanban.kanban_backend.model.Subtask;

public record SubtaskResponseDTO(
        Long id,
        String title,
        Boolean isCompleted,
        Integer position
) {
    public static SubtaskResponseDTO fromEntity(Subtask subtask) {
        return new SubtaskResponseDTO(
                subtask.getId(),
                subtask.getTitle(),
                subtask.getIsCompleted(),
                subtask.getPosition()
        );
    }
}