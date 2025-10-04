import { mapTask } from "@/helpers/mapTask";
import { api } from "@/lib/api";
import { Task } from "@/types/types";

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get("/tasks");
  const raw = data.data || data || [];
  return raw.map(mapTask);
}

export async function createTask(input: {
  title: string;
  description?: string;
  status?: "pending" | "completed";
  assignedTo?: number | "";
}): Promise<Task> {
  const payload = {
    title: input.title,
    description: input.description ?? null,
    status: input.status ?? "pending",
  };

  if (typeof input.assignedTo === "number") {
    // @ts-expect-error - extendemos payload dinámicamente
    payload.assigned_to = input.assignedTo;
  }
  const { data } = await api.post("/tasks", payload);
  return mapTask(data.data || data);
}

export async function updateTask(
  id: number,
  updates: Partial<Pick<Task, "title" | "description" | "status">> & {
    assigned_to?: number;
  }
): Promise<Task> {
  const { data } = await api.put(`/tasks/${id}`, updates);
  return mapTask(data.data || data);
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
