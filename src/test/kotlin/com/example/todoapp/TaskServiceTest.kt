package com.example.todoapp.service

import com.example.todoapp.dto.TaskRequestDTO
import com.example.todoapp.dto.TaskResponseDTO
import com.example.todoapp.entity.Task
import com.example.todoapp.repository.TaskRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.boot.test.context.SpringBootTest
import org.junit.jupiter.api.extension.ExtendWith

@ExtendWith(MockitoExtension::class)
class TaskServiceTest {

    @Mock
    private lateinit var taskRepository: TaskRepository // Mock do TaskRepository

    @InjectMocks
    private lateinit var taskService: TaskService // O Mockito irá injetar o mock do repositório

    @Test
    fun `test create task`() {

        val request = TaskRequestDTO(1L, "Title Test", "Description Test", "medium", "study", "pending")

        val task = Task(
            id = 1,
            title = request.title,
            description = request.description,
            priority = request.priority,
            category = request.category,
            status = "pending"
        )

        `when`(taskRepository.save(any(Task::class.java))).thenReturn(task)



        val response = taskService.createTask(request)

        assertEquals(request.title, response.title)
        assertEquals(request.description, response.description)
        assertEquals(request.priority, response.priority)
        assertEquals(request.category, response.category)
        assertEquals("pending", response.status) // O status deve ser 'pending'

        verify(taskRepository).save(any(Task::class.java))
    }
}