import { Task } from "@/types/tasks";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}`);

  if (!response.ok) throw new Error("Error fetching tasks");

  return response.json();
}

export async function postTask({
  description,
}: Task): Promise<{ data: Task }> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description
    }),
  });

  if (!response.ok) throw new Error("Error adding task");
  
  await fetch("/api/revalidate")
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error deleting task");
}
