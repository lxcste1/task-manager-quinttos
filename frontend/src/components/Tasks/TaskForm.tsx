import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TaskFormProps = {
  title: string;
  description: string;
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  isEditing: boolean;
  onCancel?: () => void;
};

const TaskForm = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  isEditing,
  onCancel,
}: TaskFormProps) => {
  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Agregar tarea
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

            <div className="flex gap-2">
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
