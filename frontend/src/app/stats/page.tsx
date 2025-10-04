"use client";

import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "@/context/TasksContext";
import { getTaskStats } from "@/helpers/getTaskStats";
import StatsCard from "@/components/common/StatsCard";
import { CheckCircle, Clock, Target, UserPlus } from "lucide-react";
import ProgressCard from "@/components/common/ProgressCard";
import { Card } from "@/components/ui/card";

export default function StatsPage() {
  const { tasks, stats } = useTasks();

  const { total, completed, pending, percent } = useMemo(
    () => getTaskStats(tasks ?? []),
    [tasks]
  );

  const statsCardData = [
    {
      title: total,
      description: "Total de tareas",
      icon: <Target className="w-8 h-8 text-primary" />,
      textColor: "primary",
      iconColor: "primary/10",
    },
    {
      title: completed,
      description: "Tareas completadas",
      icon: <CheckCircle className="w-8 h-8 text-secondary" />,
      textColor: "secondary",
      iconColor: "secondary/10",
    },
    {
      title: pending,
      description: "Tareas Pendientes",
      icon: <Clock className="w-8 h-8 text-muted-foreground" />,
      textColor: "muted-foreground",
      iconColor: "foreground",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Estadísticas
          </h1>
        </div>
        <div className={`mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
          {statsCardData.map((stat) => (
            <StatsCard
              key={uuidv4()}
              title={stat.title}
              description={stat.description}
              icon={stat.icon}
              classNames={{
                cardContainer: "text-center",
                cardTitle: `text-3xl font-bold text-${stat.textColor}`,
                cardIcon: `w-16 h-16 bg-${stat.iconColor} rounded-full flex items-center justify-center mx-auto mb-2`,
                cardDescription: "text-muted-foreground",
              }}
            />
          ))}
        </div>
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          {stats && "assigned_to_me" in stats && (
            <Card className="rounded-2xl bg-green-50 p-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <Target className="h-7 w-7 text-blue-700" />
              </div>
              <div className="text-4xl font-bold text-blue-700">
                {stats.assigned_to_me ?? 0}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Asignadas a mí
              </div>
            </Card>
          )}
          {stats && "created_by_me" in stats && (
            <Card className="rounded-2xl bg-green-50 p-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                <UserPlus className="h-7 w-7 text-purple-700" />
              </div>
              <div className="text-4xl font-bold text-purple-700">
                {stats.created_by_me ?? 0}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Creadas por mí
              </div>
            </Card>
          )}
        </div>
        <ProgressCard
          percent={percent}
          completed={completed}
          pending={pending}
        />
      </div>
    </div>
  );
}
