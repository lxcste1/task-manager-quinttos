import { api } from "@/lib/api";

export type Task = {
  id: number;
  title: string;
  description?: string | null;
  status: "pending" | "completed";
  createdAt?: string;
  updatedAt?: string;
};

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get("/tasks");
  // Handle Laravel Resource Collection response
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
  // Handle Laravel Resource response
  return data.data || data;
}

export async function updateTask(
  id: number,
  updates: Partial<Pick<Task, "title" | "description" | "status">>
): Promise<Task> {
  const { data } = await api.put(`/tasks/${id}`, updates);
  // Handle Laravel Resource response
  return data.data || data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}

/** azúcar si querés un toggle rápido desde un checkbox */
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
