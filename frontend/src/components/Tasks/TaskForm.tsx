import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useUsers } from "@/hooks/useUsers";

type TaskFormProps = {
  title: string;
  description: string;
  assignedTo?: number | "";
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onAssignedToChange?: (v: number | "") => void;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  isEditing: boolean;
  onCancel?: () => void;
};

const TaskForm = ({
  title,
  description,
  assignedTo = "",
  onTitleChange,
  onDescriptionChange,
  onAssignedToChange,
  onSubmit,
  isEditing,
  onCancel,
}: TaskFormProps) => {
  const { users, loading, error } = useUsers();

  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">
          {isEditing ? "Editar tarea" : "Agregar tarea"}
        </h2>
      </div>
      <Card className="mb-8">
        <CardContent className="p-4">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="title">
                Título<span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Título..."
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onTitleChange(e.target.value)
                }
                className="text-base bg-white"
                name="title"
                id="title"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                placeholder="Descripción..."
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  onDescriptionChange(e.target.value)
                }
                className="min-h-[100px] text-base resize-none bg-white"
                name="description"
                id="description"
              />
            </div>
            <div className="flex flex-col gap-1 w-full md:w-[50%]">
              <Label htmlFor="assigned_to">Asignar a</Label>
              <Select
                name="assigned_to"
                value={assignedTo === "" ? "" : String(assignedTo)}
                onValueChange={(val) =>
                  onAssignedToChange?.(val ? Number(val) : "")
                }
                disabled={loading || !onAssignedToChange}
              >
                <SelectTrigger className="bg-white! w-full">
                  <SelectValue placeholder="Asignarme a mí automáticamente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Usuarios</SelectLabel>
                    {users.map((u) => (
                      <SelectItem
                        key={u.id}
                        value={String(u.id)}
                        className="hover:bg-primary/20!"
                      >
                        {u.name} — {u.email}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {loading && (
                <span className="text-xs text-muted-foreground">
                  Cargando usuarios…
                </span>
              )}
              {error && <span className="text-xs text-red-600">{error}</span>}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={!title.trim()}
              >
                {isEditing ? "Actualizar tarea" : "Crear tarea"}
              </Button>

              {isEditing && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default TaskForm;
