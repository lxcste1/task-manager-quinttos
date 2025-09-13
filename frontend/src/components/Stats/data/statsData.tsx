import { CheckCircle, Clock, Target } from "lucide-react";

export const statsCardData = [
  {
    description: "Total de tareas",
    icon: <Target className="w-8 h-8 text-primary" />,
    textColor: "primary",
    iconColor: "primary/10",
  },
  {
    description: "Tareas completadas",
    icon: <CheckCircle className="w-8 h-8 text-secondary" />,
    textColor: "secondary",
    iconColor: "secondary/10",
  },
  {
    description: "Tareas Pendientes",
    icon: <Clock className="w-8 h-8 text-muted-foreground" />,
    textColor: "muted-foreground",
    iconColor: "muted",
  },
];
