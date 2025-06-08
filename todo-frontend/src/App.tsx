import React, { useState, useEffect } from "react";
import { Box, Paper, Button } from "@mui/material";
import Input from "./assets/components/atoms/Input";
import Checkbox from "./assets/components/atoms/Checkbox";
import TaskList, { Task } from "./assets/components/organisms/TaskList";
import FilterBar from "./assets/components/organisms/FilterBar";
import ProgressBar from "./assets/components/atoms/ProgressBar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "./assets/services/taskService";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

useEffect(() => {
  const mockTasks = [
    { id: 1, title: "Tarefa Mock 1", completed: false, status: "pending" },
    { id: 2, title: "Tarefa Mock 2", completed: true, status: "completed" },
    { id: 3, title: "Tarefa Mock 3", completed: false, status: "pending" },
  ];
  setTasks(mockTasks);
}, []);


  const handleToggle = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const newStatus = task.completed ? "pending" : "completed";
    const updated = await updateTaskStatus(id, newStatus);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: updated.status,
              completed: updated.status === "completed",
            }
          : t
      )
    );
  };

  const handleEdit = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setEditingTaskId(id);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = (id: number) => {
    // Não implementado no backend — edita só no frontend por enquanto
    if (editingTitle.trim() === "") return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title: editingTitle.trim() } : t
      )
    );
    setEditingTaskId(null);
    setEditingTitle("");
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTitle("");
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = async () => {
    if (inputValue.trim() === "") return;
    const newTask = await createTask(inputValue.trim());
    setTasks((prev) => [
      ...prev,
      {
        id: newTask.id,
        title: newTask.title,
        completed: newTask.status === "completed",
        status: newTask.status,
      },
    ]);
    setInputValue("");
  };

  const handleClearAll = () => {
    // Caso deseje apagar todas do backend, pode ser feito com múltiplos deletes
    tasks.forEach((t) => deleteTask(t.id));
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent =
    tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#bbdefb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" gap={1}>
            <Input
              placeholder="Add a new task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleAddTask}
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              +
            </Button>
          </Box>

          <Box flex={1}>
            <FilterBar filter={filter} onChange={setFilter} />
          </Box>

          <Box>
            {filteredTasks.map((task) => (
              <Box
                key={task.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
                sx={{
                  bgcolor: "#f0f0f0",
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                  sx={{ mr: 1 }}
                />
                {editingTaskId === task.id ? (
                  <>
                    <Input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      style={{ flexGrow: 1, marginRight: 8 }}
                      autoFocus
                    />
                    <Button
                      onClick={() => handleSaveEdit(task.id)}
                      sx={{ minWidth: 36, p: 0 }}
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      sx={{ minWidth: 36, p: 0, ml: 1 }}
                    >
                      <CloseIcon />
                    </Button>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        textDecoration: task.completed ? "line-through" : "none",
                        flexGrow: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => handleToggle(task.id)}
                    >
                      {task.title}
                    </Box>
                    <Box>
                      <Button
                        onClick={() => handleEdit(task.id)}
                        sx={{ minWidth: 36, p: 0, mr: 1 }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => handleDelete(task.id)}
                        sx={{ minWidth: 36, p: 0 }}
                        color="error"
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            ))}
          </Box>

          <Box display="flex" alignItems="center" gap={2} mt={1}>
            <Box flex={1}>
              <ProgressBar
                completedTasks={completedCount}
                totalTasks={tasks.length}
              />
            </Box>
            <Button
              onClick={handleClearAll}
              sx={{ fontSize: "11px", height: 40, minWidth: 100 }}
              variant="contained"
            >
              Clear All
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
