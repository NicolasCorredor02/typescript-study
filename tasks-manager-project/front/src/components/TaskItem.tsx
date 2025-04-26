"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { deleteTask } from "@/lib/api";
import { Task } from "@/types/tasks";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TaskItem({ task }: { task: Task }) {
  const router = useRouter();

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    router.refresh();
  };

  return (
    <li className="flex border-2 justify-between">
      <Label className="w-full px-2">{task.description}</Label>
      <Button
        className="cursor-pointer"
        variant="destructive"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTask(task._id);
        }}
      >
        <Trash />
      </Button>
    </li>
  );
}
