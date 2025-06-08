// src/components/organisms/TaskList.tsx
import React from "react";
import TaskCard from "../molecules/TaskCard";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  status: "completed" | "pending" | "in-progress";
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return <p>Nenhuma tarefa encontrada.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          completed={task.completed}
          status={task.status}
          onToggle={() => onToggle(task.id)}
          onEdit={() => onEdit(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
