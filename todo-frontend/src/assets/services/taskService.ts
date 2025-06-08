// src/services/taskService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/tasks";

// src/assets/services/taskService.ts
export interface TaskResponseDTO {
  id: number;
  title: string;
  description: string;
  priority: string;
  category: string;
  status: string;
}

export interface TaskRequestDTO {
  id: number;
  title: string;
  description: string;
  priority: string;
  category: string;
  status: string;
}

// Array local para armazenar as tasks mockadas
let mockTasks: TaskResponseDTO[] = [
  {
    id: 1,
    title: "Tarefa Mock 1",
    description: "",
    priority: "low",
    category: "general",
    status: "pending",
  },
  {
    id: 2,
    title: "Tarefa Mock 2",
    description: "",
    priority: "medium",
    category: "general",
    status: "completed",
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Retorna todas as tasks (simula chamada async)
export const getTasks = async (): Promise<TaskResponseDTO[]> => {
  await delay(200);
  return [...mockTasks];
};

// Cria uma nova task e retorna ela
export const createTask = async (
  title: string
): Promise<TaskResponseDTO> => {
  await delay(200);
  const newTask: TaskResponseDTO = {
    id: mockTasks.length ? Math.max(...mockTasks.map((t) => t.id)) + 1 : 1,
    title,
    description: "",
    priority: "low",
    category: "general",
    status: "pending",
  };
  mockTasks.push(newTask);
  return newTask;
};

// Atualiza status da task e retorna ela atualizada
export const updateTaskStatus = async (
  id: number,
  status: string
): Promise<TaskResponseDTO> => {
  await delay(200);
  const task = mockTasks.find((t) => t.id === id);
  if (!task) throw new Error("Task not found");
  task.status = status;
  return task;
};

// Deleta task pelo id
export const deleteTask = async (id: number): Promise<void> => {
  await delay(200);
  mockTasks = mockTasks.filter((t) => t.id !== id);
};
