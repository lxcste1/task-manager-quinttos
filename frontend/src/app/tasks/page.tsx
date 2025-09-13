"use client";

import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleDone,
  getStats,
} from "@/services/tasks";
import { Task } from "@/types";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    completed: number;
    pending: number;
  } | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<{
    title: string;
    description: string;
    status: Task["status"];
  }>({
    title: "",
    description: "",
    status: "pending",
  });

  const load = async () => {
    const [t, s] = await Promise.all([getTasks(), getStats()]);
    setTasks(t);
    setStats(s);
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description ?? "",
      status: task.status,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", description: "", status: "pending" });
  };

  const saveEdit = async (id: number) => {
    await updateTask(id, form);
    cancelEdit();
    await load();
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    await createTask({
      title: newTitle.trim(),
      description: newDesc || undefined,
      status: "pending",
    });
    setNewTitle("");
    setNewDesc("");
    await load();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    await load();
  };

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Tasks</h1>

      {stats && (
        <div style={{ marginBottom: 16 }}>
          <strong>Stats:</strong> Total {stats.total} · Completed{" "}
          {stats.completed} · Pending {stats.pending}
        </div>
      )}

      <section style={{ marginBottom: 24, display: "grid", gap: 8 }}>
        <input
          placeholder="Título…"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción (opcional)…"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button onClick={handleCreate}>Crear tarea</button>
      </section>

      <ul style={{ display: "grid", gap: 12 }}>
        {tasks.map((t) => {
          const isEditing = editingId === t.id;
          return (
            <li
              key={t.id}
              style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
            >
              {!isEditing ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <input
                        type="checkbox"
                        checked={t.status === "completed"}
                        onChange={async (e) => {
                          await toggleDone(t.id, e.target.checked);
                          await load();
                        }}
                      />
                      <span style={{ fontWeight: 600 }}>{t.title}</span>
                    </label>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 999,
                        background:
                          t.status === "completed" ? "#e6ffed" : "#fff7e6",
                        border: "1px solid #ddd",
                        fontSize: 12,
                      }}
                    >
                      {t.status}
                    </span>
                  </div>
                  {t.description && (
                    <p style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>
                      {t.description}
                    </p>
                  )}

                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button onClick={() => startEdit(t)}>Editar</button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      style={{ color: "crimson" }}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "grid", gap: 8 }}>
                    <input
                      value={form.title}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, title: e.target.value }))
                      }
                      placeholder="Título"
                    />
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, description: e.target.value }))
                      }
                      placeholder="Descripción"
                      rows={3}
                    />
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          status: e.target.value as Task["status"],
                        }))
                      }
                    >
                      <option value="pending">pending</option>
                      <option value="completed">completed</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button onClick={() => saveEdit(t.id)}>Guardar</button>
                    <button onClick={cancelEdit}>Cancelar</button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
