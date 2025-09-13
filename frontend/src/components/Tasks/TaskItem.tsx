import { CheckedState, Task } from "@/types/types";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Edit3, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number, checked: CheckedState) => void | Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void | Promise<void>;
  loading?: boolean;
};

const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
  const isCompleted = task.status === "completed";
  return (
    <Card className="border border-border">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={(checked) => onToggle(task.id, checked)}
            className="mt-1"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3
                  className={`font-medium text-base ${
                    isCompleted
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {task.title}
                </h3>

                {task.description && (
                  <p
                    className={`text-sm mt-1 ${
                      isCompleted
                        ? "line-through text-muted-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={isCompleted ? "secondary" : "default"}
                  className={
                    task.status === "pending"
                      ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                      : ""
                  }
                >
                  {task.status}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={() => onEdit(task)}
                className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                Editar
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="text-destructive hover:text-destructive/80 text-sm font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
