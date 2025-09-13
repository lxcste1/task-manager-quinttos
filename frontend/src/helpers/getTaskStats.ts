export type TaskStatus = "completed" | "pending";

export function getTaskStats<T extends { status: TaskStatus }>(
  tasks: readonly T[]
) {
  const total = tasks.length;
  let completed = 0;

  for (const t of tasks) {
    if (t.status === "completed") completed++;
  }

  const pending = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, pending, percent };
}
