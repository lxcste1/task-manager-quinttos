import { CheckCircle, Clock, Edit3, Filter, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { featuresData } from "./data/featuresData";
import FeatureCard from "./components/FeatureCard";

const FeaturesSection = () => {
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
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              bullets={feature.bullets}
            />
          ))}
        </div>

        {/* Task Preview | TODO: Replace with real data */}
        <div className="bg-card rounded-lg border p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Vista previa de la tabla de tareas
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs md:text-sm font-medium">
                    Completar diseño de la aplicación
                  </p>
                  <p className="hidden md:block text-sm text-muted-foreground">
                    Finalizar mockups y prototipos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="hidden md:block">
                  Completada
                </Badge>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs md:text-sm font-medium">
                    Implementar funcionalidad de búsqueda
                  </p>
                  <p className="hidden md:block text-sm text-muted-foreground">
                    Agregar filtros y ordenamiento
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="hidden md:block">
                  Pendiente
                </Badge>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
