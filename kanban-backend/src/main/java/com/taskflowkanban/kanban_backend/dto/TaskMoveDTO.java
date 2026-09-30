package com.taskflowkanban.kanban_backend.dto;

public record TaskMoveDTO(
        Long targetColumnId,
        Integer newPosition
) {}