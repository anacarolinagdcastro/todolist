package com.example.todoapp.controller

import com.example.todoapp.dto.TaskRequestDTO
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc  // Corrigido: agora mockMvc é injetado pelo Spring

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `test create task endpoint`() {
        val taskRequest = TaskRequestDTO(
            id = 1L,
            title = "Title Test",
            description = "Description Test",
            priority = "medium",
            category = "study",
            status = "pending"
        )

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(taskRequest))
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
    }
}
