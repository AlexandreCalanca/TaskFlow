package com.taskflowkanban.kanban_backend.dto;

import com.taskflowkanban.kanban_backend.model.ColumnEntity;
import java.util.List;

public record ColumnResponseDTO(
        Long id,
        String name,
        Integer position,
        List<TaskResponseDTO> tasks
) {
    public static ColumnResponseDTO fromEntity(ColumnEntity col) {
        return new ColumnResponseDTO(
                col.getId(),
                col.getName(),
                col.getPosition(),
                col.getTasks().stream().map(TaskResponseDTO::fromEntity).toList()
        );
    }
}