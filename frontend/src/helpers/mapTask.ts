import { Task, TaskDTO } from "@/types/types";

export const mapTask = (t: TaskDTO): Task => ({
  id: t.id,
  title: t.title,
  description: t.description ?? null,
  status: t.status,
  createdBy: t.created_by,
  assignedTo: t.assigned_to,
  createdAt: t.created_at,
  updatedAt: t.updated_at,
});
