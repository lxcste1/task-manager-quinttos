import { Edit3, Plus, Search } from "lucide-react";
import { BulletProps } from "../components/FeatureCard";

export const featuresData = [
  {
    title: "Crear Tareas",
    description:
      "Crea tareas con título, descripción detallada y estado personalizable",
    icon: <Plus className="w-6 h-6 text-primary" />,
    bullets: [
      { color: "primary", text: "Título y descripción" },
      { color: "primary", text: "Estados: Pendiente/Completada" },
      { color: "primary", text: "Interfaz intuitiva" },
    ] as BulletProps[],
  },
  {
    title: "Buscar y Filtrar",
    description:
      "Lista organizada con búsqueda por título y filtros por estado",
    icon: <Search className="w-6 h-6 text-primary" />,
    bullets: [
      { color: "secondary", text: "Búsqueda por título" },
      { color: "secondary", text: "Filtros por estado" },
      { color: "secondary", text: "Vista de tabla organizada" },
    ] as BulletProps[],
  },
  {
    title: "Editar y Eliminar",
    description:
      "Modifica tareas existentes o elimínalas cuando ya no las necesites",
    icon: <Edit3 className="w-6 h-6 text-primary" />,
    bullets: [
      { color: "destructive", text: "Edición completa" },
      { color: "destructive", text: "Eliminación segura" },
      { color: "destructive", text: "Cambios instantáneos" },
    ] as BulletProps[],
  },
];
