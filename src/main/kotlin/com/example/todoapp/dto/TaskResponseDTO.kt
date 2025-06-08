package com.example.todoapp.dto

data class TaskResponseDTO(
    val id: Long,
    val title: String,
    val description: String,
    val priority: String,
    val category: String,
    val status: String
)
