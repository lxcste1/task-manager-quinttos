import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BarChart3 } from "lucide-react";

const ProgressCard = () => {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Progreso General
          </CardTitle>
          <CardDescription>
            Visualización del estado actual de tus tareas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tareas Completadas</span>
                <span className="text-primary font-medium">75%</span>
              </div>
              <div className="w-full bg-white rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm">Completadas (18)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-sm">Pendientes (6)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProgressCard;
