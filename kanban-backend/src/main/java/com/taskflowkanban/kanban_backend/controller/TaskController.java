package com.taskflowkanban.kanban_backend.controller;

import com.taskflowkanban.kanban_backend.dto.TaskCreateDTO;
import com.taskflowkanban.kanban_backend.dto.TaskMoveDTO;
import com.taskflowkanban.kanban_backend.dto.TaskResponseDTO;
import com.taskflowkanban.kanban_backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(dto));
    }

    @PatchMapping("/{id}/move")
    public ResponseEntity<TaskResponseDTO> moveTask(@PathVariable Long id, @RequestBody TaskMoveDTO dto) {
        return ResponseEntity.ok(taskService.moveTask(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/subtasks/{subtaskId}/toggle")
    public ResponseEntity<Void> toggleSubtask(@PathVariable Long subtaskId) {
        taskService.toggleSubtask(subtaskId);
        return ResponseEntity.noContent().build();
    }
}
