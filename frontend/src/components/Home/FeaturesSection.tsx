import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Filter } from "lucide-react";
import { featuresData } from "./data/featuresData";
import FeatureCard from "./components/FeatureCard";
import { useAuth } from "@/context/AuthContext";
import { useTasks } from "@/context/TasksContext";
import TaskItem from "../Tasks/TaskItem";
import { tasksDataMock } from "./data/tasksDataMock";
import { CheckedState, Task } from "@/types/types";
import { TasksSkeleton } from "../Tasks/TasksSkeleton";

const FeaturesSection = () => {
  const { isAuthenticated } = useAuth();
  const { tasks, loading, toggleDone } = useTasks();

  const handleToggle = async (id: number, checked: CheckedState) => {
    const done = checked === true;
    await toggleDone(id, done);
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">
            Gestión Completa de Tareas
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Todas las herramientas que necesitas para mantener tus tareas
            organizadas y bajo control
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={uuidv4()}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              bullets={feature.bullets}
            />
          ))}
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Vista previa de la tabla de tareas
          </h4>
          {loading ? (
            <TasksSkeleton />
          ) : (
            <div className="space-y-3">
              {isAuthenticated
                ? tasks.map((task) => (
                    <TaskItem
                      task={task}
                      key={uuidv4()}
                      onToggle={handleToggle}
                    />
                  ))
                : tasksDataMock.map((task) => (
                    <TaskItem
                      task={task as Task}
                      key={uuidv4()}
                      onToggle={() => {}}
                    />
                  ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
