import React from "react";
import { Button } from "../ui/button";
import { BarChart3, Plus } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
          Gestiona tus tareas con{" "}
          <span className="text-primary">eficiencia</span>
        </h2>
        <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
          Una aplicación completa para organizar, seguir y completar todas tus
          tareas personales. Mantén el control de tu productividad con
          herramientas intuitivas y estadísticas detalladas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Comenzar ahora
          </Button>
          <Button size="lg" variant="outline" className="cursor-pointer">
            <BarChart3 className="w-5 h-5" />
            Ver estadísticas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
