package com.example.todoapp.service

import com.example.todoapp.dto.TaskRequestDTO
import com.example.todoapp.dto.TaskResponseDTO
import com.example.todoapp.entity.Task
import com.example.todoapp.repository.TaskRepository
import jakarta.persistence.Id
import jakarta.transaction.Status
import org.springframework.stereotype.Service

@Service
class TaskService(private val taskRepository: TaskRepository) {

    fun createTask(request: TaskRequestDTO): TaskResponseDTO {
        val task = Task(
            title = request.title,
            description = request.description,
            priority = request.priority,
            category = request.category,
            status = "pending"
        )
        return taskRepository.save(task).toResponseDTO()
    }

    fun listTask(): List<TaskResponseDTO> {
        return taskRepository.findAll().map { it.toResponseDTO() }
    }

    fun updateTaskStatus(id: Long, status: String): TaskResponseDTO? {
        val task = taskRepository.findById(id).orElse(null) ?: return null
        task.status = status
        return taskRepository.save(task).toResponseDTO()
    }

    fun deleteTask(id: Long){
        taskRepository.deleteById(id)
    }

    private fun Task.toResponseDTO() = TaskResponseDTO(id!!, title, description, priority, category, status)
}