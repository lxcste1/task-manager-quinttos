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
  createdAt?: string;
  updatedAt?: string;
};

export type Stats = {
  total: number;
  completed: number;
  pending: number;
};
