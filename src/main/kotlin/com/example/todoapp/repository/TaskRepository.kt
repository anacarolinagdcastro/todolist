package com.example.todoapp.repository

import com.example.todoapp.entity.Task
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository : JpaRepository <Task, Long>