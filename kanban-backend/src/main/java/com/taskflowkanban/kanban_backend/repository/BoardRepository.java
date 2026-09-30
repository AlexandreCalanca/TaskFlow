package com.taskflowkanban.kanban_backend.repository;

import com.taskflowkanban.kanban_backend.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
}