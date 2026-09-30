package com.taskflowkanban.kanban_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@ComponentScan(basePackages = "com.taskflowkanban")
@RestController
public class KanbanBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(KanbanBackendApplication.class, args);
	}

	@GetMapping("/ola")
	public String ping() {
		return "Backend Kanban ativo!";
	}
}