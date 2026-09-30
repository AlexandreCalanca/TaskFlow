package com.taskflowkanban.kanban_backend.repository;

import com.taskflowkanban.kanban_backend.model.ColumnEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColumnRepository extends JpaRepository<ColumnEntity, Long> {
    List<ColumnEntity> findByBoardIdOrderByPositionAsc(Long boardId);
}