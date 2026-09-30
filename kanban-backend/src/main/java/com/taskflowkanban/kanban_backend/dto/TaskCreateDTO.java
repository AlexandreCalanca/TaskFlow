package com.taskflowkanban.kanban_backend.dto;

import java.util.List;

public record TaskCreateDTO(
        Long columnId,
        String title,
        String description,
        List<String> subtasks
) {}