package com.example.todoapp.controller

import com.example.todoapp.dto.TaskRequestDTO
import com.example.todoapp.dto.TaskResponseDTO
import com.example.todoapp.service.TaskService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tasks")
class TaskController(private val taskService: TaskService) {

    @PostMapping
    fun createTask(@RequestBody request: TaskRequestDTO): ResponseEntity<TaskResponseDTO> {
        return ResponseEntity(taskService.createTask(request), HttpStatus.CREATED)
    }

    @GetMapping
    fun listTasks(): List<TaskResponseDTO> {
        return taskService.listTask()
    }

    @PatchMapping("/{id}/status")
    fun updateTaskStatus(@PathVariable id: Long, @RequestParam status: String): ResponseEntity<TaskResponseDTO> {
        return taskService.updateTaskStatus(id, status).let {
            if (it != null) ResponseEntity(it, HttpStatus.OK)
            else ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    fun deleteTask(@PathVariable id: Long): ResponseEntity<Void> {
        taskService.deleteTask(id)
        return ResponseEntity.noContent().build()
    }
}
