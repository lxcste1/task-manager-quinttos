export type User = {
  id: number;
  name: string;
  email: string;
};

export type Task = {
  id: number;
  title: string;
  description?: string | null;
  status: "pending" | "completed";
  createdBy: number;
  assignedTo: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TaskDTO = {
  id: number;
  title: string;
  description?: string | null;
  status: "pending" | "completed";
  created_by: number;
  assigned_to: number;
  created_at?: string;
  updated_at?: string;
};

export type Stats = {
  total: number;
  completed: number;
  pending: number;
};

export type CheckedState = boolean | "indeterminate";
