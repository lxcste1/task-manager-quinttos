"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Task, Stats } from "@/types/types";
import { getTasks, createTask, deleteTask, getStats } from "@/services/tasks";
import { useAuth } from "./AuthContext";

type TasksContextValue = {
  tasks: Task[];
  stats: Stats | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const [t, s] = await Promise.all([getTasks(), getStats()]);
      setTasks(t as Task[]);
      setStats(s as Stats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error loading data");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const addTask = useCallback(
    async (title: string) => {
      if (!title.trim()) return;
      const tempId = Math.random();
      const optimistic: Task = { id: tempId, title, status: "pending" };
      setTasks((prev) => [optimistic, ...prev]);
      try {
        await createTask({ title });
        await reload();
      } catch (e) {
        setTasks((prev) => prev.filter((t) => t.id !== tempId));
        throw e;
      }
    },
    [reload]
  );

  const removeTask = useCallback(
    async (id: number) => {
      const backup = tasks;
      setTasks((prev) => prev.filter((t) => t.id !== id));
      try {
        await deleteTask(id);
        await reload();
      } catch (e) {
        setTasks(backup);
        throw e;
      }
    },
    [tasks, reload]
  );

  return (
    <TasksContext.Provider
      value={{ tasks, stats, loading, error, reload, addTask, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within <TasksProvider>");
  return ctx;
}
