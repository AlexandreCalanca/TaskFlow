package com.taskflowkanban.kanban_backend.dto;

import com.taskflowkanban.kanban_backend.model.Board;
import java.time.LocalDateTime;
import java.util.List;

public record BoardResponseDTO(
        Long id,
        String name,
        LocalDateTime createdAt,
        List<ColumnResponseDTO> columns
) {
    public static BoardResponseDTO fromEntity(Board board) {
        return new BoardResponseDTO(
                board.getId(),
                board.getName(),
                board.getCreatedAt(),
                board.getColumns().stream().map(ColumnResponseDTO::fromEntity).toList()
        );
    }
}