"use client";
import { useCallback, useMemo, useState } from "react";
import { useTasks } from "@/context/TasksContext";
import type { Task } from "@/types/types";

export type TaskFormValues = {
  title: string;
  description: string;
  assignedTo: number | "";
};

export function useTaskForm() {
  const { addTask, updateTask } = useTasks();

  const [values, setValues] = useState<TaskFormValues>({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const setField = useCallback(
    <K extends keyof TaskFormValues>(k: K, v: TaskFormValues[K]) => {
      setValues((s) => ({ ...s, [k]: v }));
    },
    []
  );

  const startEditing = useCallback((task: Task) => {
    setEditingTask(task);
    setValues({
      title: task.title,
      description: task.description ?? "",
      assignedTo: "",
    });
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingTask(null);
    setValues({ title: "", description: "", assignedTo: "" });
  }, []);

  const submit = useCallback(async () => {
    const cleanTitle = values.title.trim();
    const cleanDesc = values.description.trim();
    if (!cleanTitle) return;

    if (editingTask) {
      await updateTask(editingTask.id, {
        title: cleanTitle,
        description: cleanDesc || undefined,
      });
      setEditingTask(null);
    } else {
      await addTask({
        title: cleanTitle,
        description: cleanDesc || undefined,
        status: "pending",
        assignedTo: values.assignedTo, // se envía solo si es number; tu service ya lo filtra
      });
    }

    setValues({ title: "", description: "", assignedTo: "" });
  }, [values, editingTask, addTask, updateTask]);

  return {
    values,
    setField,
    editingTask,
    startEditing,
    cancelEditing,
    submit,
    // helpers para usar directo en props del form
    bind: useMemo(
      () => ({
        title: values.title,
        description: values.description,
        assignedTo: values.assignedTo,
        onTitleChange: (v: string) => setField("title", v),
        onDescriptionChange: (v: string) => setField("description", v),
        onAssignedToChange: (v: number | "") => setField("assignedTo", v),
      }),
      [values, setField]
    ),
  };
}
