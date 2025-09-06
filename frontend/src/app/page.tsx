"use client";

import { useState } from "react";
import { login, logout } from "@/services/auth";
import {
  getTasks,
  createTask,
  deleteTask,
  getStats,
} from "@/services/tasks";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [title, setTitle] = useState("");

  async function handleLogin() {
    const u = await login("admin@example.com", "password");
    setUser(u);
    await loadData();
  }

  async function loadData() {
    const [tasksData, statsData] = await Promise.all([getTasks(), getStats()]);
    setTasks(tasksData);
    setStats(statsData);
  }

  async function handleCreateTask() {
    if (!title) return;
    await createTask({ title });
    setTitle("");
    await loadData();
  }

  async function handleDeleteTask(id: number) {
    await deleteTask(id);
    await loadData();
  }

  return (
    <div style={{ padding: "2rem" }}>
      {!user ? (
        <>
          <h1>Login</h1>
          <button onClick={handleLogin}>Login con admin@example.com</button>
        </>
      ) : (
        <>
          <h1>Hola {user.name}!</h1>
          <button
            onClick={() => {
              logout();
              setUser(null);
            }}
          >
            Logout
          </button>

          <h2>Stats</h2>
          {stats && (
            <p>
              Total: {stats.total} | Completadas: {stats.completed} |
              Pendientes: {stats.pending}
            </p>
          )}

          <h2>Tasks</h2>
          <ul>
            {tasks.map((t) => (
              <li key={t.id}>
                {t.title} ({t.completed ? "✔" : "❌"})
                <button onClick={() => handleDeleteTask(t.id)}>Eliminar</button>
              </li>
            ))}
          </ul>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nueva tarea"
          />
          <button onClick={handleCreateTask}>Agregar</button>
        </>
      )}
    </div>
  );
}
