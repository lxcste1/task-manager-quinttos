"use client";

import React, { useState } from "react";
import { useTasks } from "@/context/TasksContext";
import TaskForm from "@/components/Tasks/TaskForm";
import TaskItem from "@/components/Tasks/TaskItem";
import SkeletonItem from "@/components/Tasks/SkeletonItem";
import { CheckedState, Task } from "@/types/types";

export default function TasksPage() {
  const { tasks, loading, addTask, updateTask, removeTask, toggleDone } =
    useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    const cleanDesc = description.trim();
    if (!cleanTitle) return;

    if (editingTask) {
      await updateTask(editingTask.id, {
        title: cleanTitle,
        description: cleanDesc || undefined,
      });
      setEditingTask(null);
    } else {
      await addTask({ title: cleanTitle, description: cleanDesc || undefined });
    }

    setTitle("");
    setDescription("");
  };

  const handleToggle = async (id: number, checked: CheckedState) => {
    const done = checked === true;
    await toggleDone(id, done);
  };

  const handleDelete = async (id: number) => {
    await removeTask(id);
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description ?? "");
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
  };
  const TasksSkeleton = () => (
    <div className="space-y-3" aria-hidden>
      {[0, 1, 2].map((i) => (
        <SkeletonItem key={i} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background" aria-busy={loading}>
      <div className="mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Tareas</h1>
        </div>

        <TaskForm
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onSubmit={handleSubmit}
          isEditing={!!editingTask}
          onCancel={cancelEditing}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Vista de tareas
          </h2>
        </div>
        {loading ? (
          <TasksSkeleton />
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onEdit={startEditing}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
