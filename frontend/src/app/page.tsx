"use client";

import { useState } from "react";
import { login, logout } from "@/services/auth";
import { getTasks, createTask, deleteTask, getStats } from "@/services/tasks";
import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import StatsSection from "@/components/Home/StatsSection";
import CTASection from "@/components/Home/CTASection";

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
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
