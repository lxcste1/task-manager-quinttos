import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const CTASection = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleTasks = () => {
    if (isAuthenticated) {
      router.push("/tasks");
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4 text-foreground">
          ¿Listo para ser más productivo?
        </h3>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Comienza a organizar tus tareas hoy mismo y experimenta una nueva
          forma de gestionar tu tiempo y proyectos.
        </p>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 cursor-pointer"
          onClick={handleTasks}
        >
          <Plus className="w-5 h-5" />
          Crear mi primera tarea
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
