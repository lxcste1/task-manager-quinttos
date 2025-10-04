import { CheckedState, Task } from "@/types/types";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Edit3, Trash2, UserIcon, UserPlus } from "lucide-react";
import { Badge } from "../ui/badge";
import { useUsers } from "@/hooks/useUsers";
import { useMemo } from "react";
import { Button } from "../ui/button";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number, checked: CheckedState) => void | Promise<void>;
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void | Promise<void>;
};

const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
  const isCompleted = task.status === "completed";

  const { users } = useUsers();
  const usersById = useMemo(
    () => new Map(users.map((u) => [u.id, u])),
    [users]
  );
  const assignee = usersById.get(task.assignedTo);
  const creator = usersById.get(task.createdBy);

  const handleEdit = () => {
    if (onEdit) onEdit(task);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(task.id);
  };

  return (
    <Card className="border border-border">
      <CardContent>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={(checked) => onToggle(task.id, checked)}
            className="border-sm mt-1"
          />

          <div className="flex flex-col gap-2 flex-1 min-w-0">
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
            <div className="flex flex-wrap gap-2">
              {assignee && (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-green-200 p-2">
                    <UserPlus className="h-3 w-3 text-green-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Asignada a
                    </p>
                    {assignee ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          {assignee.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {assignee.email}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {task.assignedTo}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {creator && (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-green-200 p-2">
                    <UserIcon className="h-3 w-3 text-green-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Creada por
                    </p>
                    {creator ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          {creator.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {creator.email}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {task.createdBy}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {onEdit && onDelete && (
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => handleEdit}
                  className="text-primary hover:text-primary/80 px-2 py-1 hover:bg-green-100! text-sm font-medium flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  Editar
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => handleDelete}
                  className="text-destructive hover:text-destructive/80 hover:bg-red-50! text-sm font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
