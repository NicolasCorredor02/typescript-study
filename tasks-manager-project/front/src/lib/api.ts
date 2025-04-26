import { Task } from "@/types/tasks";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}`, {
    cache: "no-store"
  });

  if (!response.ok) throw new Error("Error fetching tasks");

  const tasks = await response.json();

  return tasks;
}

export async function postTask(taskData: Omit<Task, "_id" | "status">): Promise<void> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) throw new Error("Error adding task"); 
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error deleting task");
}
