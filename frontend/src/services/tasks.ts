import { api } from "@/lib/api";
import { Task } from "@/types";

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get("/tasks");
  return data.data || data || [];
}

export async function createTask(input: {
  title: string;
  description?: string;
  status?: "pending" | "completed";
}): Promise<Task> {
  const payload = {
    title: input.title,
    description: input.description ?? null,
    status: input.status ?? "pending",
  };
  const { data } = await api.post("/tasks", payload);
  return data.data || data;
}

export async function updateTask(
  id: number,
  updates: Partial<Pick<Task, "title" | "description" | "status">>
): Promise<Task> {
  const { data } = await api.put(`/tasks/${id}`, updates);
  return data.data || data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}

export async function toggleDone(id: number, done: boolean) {
  return updateTask(id, { status: done ? "completed" : "pending" });
}

export async function getStats(): Promise<{
  total: number;
  completed: number;
  pending: number;
}> {
  const { data } = await api.get("/stats");
  return data;
}
