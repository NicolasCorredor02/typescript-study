"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/tasks";
import { deleteTask, postTask } from "@/lib/api";
import TaskItem from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TaskItemList({
  initialTasks,
}: {
  initialTasks: Task[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const refreshTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
        const newTasks = await response.json();
        setTasks(newTasks);
      } catch (error) {
        console.error("Error fetching new tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    refreshTasks();
  }, []);

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleNewTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTask.trim()) return;

    try {
      setIsLoading(true);
      const { data } = await postTask({ description: newTask.trim() });
      setTasks((prevTasks) => [...prevTasks, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {isLoading && <p>Updating tasks...</p>}
      {tasks.map((task) => (
        <ul key={task._id}>
          <TaskItem task={task} onDelete={handleDelete} />
        </ul>
      ))}

      <form onSubmit={handleNewTask} className="flex gap-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Task"}
        </Button>
      </form>
    </div>
  );
}
