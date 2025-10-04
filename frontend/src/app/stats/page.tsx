"use client";

import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "@/context/TasksContext";
import { getTaskStats } from "@/helpers/getTaskStats";
import StatsCard from "@/components/common/StatsCard";
import { CheckCircle, Clock, Target } from "lucide-react";
import ProgressCard from "@/components/common/ProgressCard";

export default function StatsPage() {
  const { tasks } = useTasks();

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
      iconColor: "muted",
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
        <div className={`grid md:grid-cols-3 gap-6 mb-8`}>
          {statsCardData.map((stat, index) => (
            <StatsCard
              key={uuidv4()}
              title={stat.title}
              description={stat.description}
              icon={stat.icon}
              classNames={{
                cardContainer: "text-center",
                cardTitle: `text-3xl font-bold text-${stat.textColor}`,
                cardIcon: `w-16 h-16 bg-${stat.iconColor} rounded-full flex items-center justify-center mx-auto mb-2`,
              }}
            />
          ))}
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
