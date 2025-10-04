"use client";

import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { cx } from "class-variance-authority";
import { useTasks } from "@/context/TasksContext";
import TaskForm from "@/components/Tasks/TaskForm";
import TaskItem from "@/components/Tasks/TaskItem";
import { Input } from "@/components/ui/input";
import { TaskStatus } from "@/helpers/getTaskStats";
import { CheckedState, Task } from "@/types/types";
import { useTaskForm } from "@/hooks/useTaskForm";
import { TasksSkeleton } from "@/components/Tasks/TasksSkeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

type StatusFilter = "all" | TaskStatus;

export default function TasksPage() {
  const { tasks, loading, removeTask, toggleDone } = useTasks();

  const { bind, editingTask, startEditing, cancelEditing, submit } =
    useTaskForm();

  const [query, setQuery] = useState<string>("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  const handleToggle = async (id: number, checked: CheckedState) => {
    const done = checked === true;
    await toggleDone(id, done);
  };

  const handleDelete = async (id: number) => {
    await removeTask(id);
  };

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      const byTitle = q === "" || t.title.toLowerCase().includes(q);
      const byStatus = status === "all" || t.status === status;
      return byTitle && byStatus;
    });
  }, [tasks, query, status]);

  const selectClassNames = cx(
    "w-full sm:w-56 rounded-xl border px-3 py-2 shadow-sm file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 min-w-0 bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive sm:max-w-md"
  );

  return (
    <div className="min-h-screen bg-background" aria-busy={loading}>
      <div className="mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Tareas</h1>
        </div>

        <TaskForm
          title={bind.title}
          description={bind.description}
          assignedTo={bind.assignedTo}
          onTitleChange={bind.onTitleChange}
          onDescriptionChange={bind.onDescriptionChange}
          onAssignedToChange={bind.onAssignedToChange}
          onSubmit={handleSubmit}
          isEditing={!!editingTask}
          onCancel={cancelEditing}
        />

        <div className="min-h-[700px] mb-8">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Vista de tareas
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between my-6">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título…"
              className="w-full sm:max-w-md rounded-xl border px-3 py-2 shadow-sm"
              aria-label="Buscar por título"
              name="search"
            />
            <Select
              value={status}
              onValueChange={(val) => setStatus(val as StatusFilter)}
              name="status"
              aria-label="Filtrar por estado"
            >
              <SelectTrigger className={selectClassNames}>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <TasksSkeleton />
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={uuidv4()}
                  task={task}
                  onToggle={handleToggle}
                  onEdit={(t: Task) => startEditing(t)}
                  onDelete={handleDelete}
                />
              ))}
              {filteredTasks.length === 0 && (
                <div className="text-center text-sm text-gray-500 py-8">
                  No hay tareas que coincidan con los filtros.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
