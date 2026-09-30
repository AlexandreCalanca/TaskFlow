package com.taskflowkanban.kanban_backend.service;

import com.taskflowkanban.kanban_backend.dto.BoardCreateDTO;
import com.taskflowkanban.kanban_backend.dto.BoardResponseDTO;
import com.taskflowkanban.kanban_backend.model.Board;
import com.taskflowkanban.kanban_backend.model.ColumnEntity;
import com.taskflowkanban.kanban_backend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional(readOnly = true)
    public List<BoardResponseDTO> findAll() {
        return boardRepository.findAll()
                .stream()
                .map(BoardResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public BoardResponseDTO findById(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board não encontrado com id: " + id));
        return BoardResponseDTO.fromEntity(board);
    }

    @Transactional
    public BoardResponseDTO create(BoardCreateDTO dto) {
        Board board = Board.builder()
                .name(dto.name())
                .build();

        // Já inicializa com as 3 colunas padrão do Kanban
        ColumnEntity colTodo = ColumnEntity.builder().name("A Fazer").position(1).board(board).build();
        ColumnEntity colInProg = ColumnEntity.builder().name("Em Progresso").position(2).board(board).build();
        ColumnEntity colDone = ColumnEntity.builder().name("Concluído").position(3).board(board).build();

        board.setColumns(List.of(colTodo, colInProg, colDone));

        Board saved = boardRepository.save(board);
        return BoardResponseDTO.fromEntity(saved);
    }

    @Transactional
    public void delete(Long id) {
        boardRepository.deleteById(id);
    }
}