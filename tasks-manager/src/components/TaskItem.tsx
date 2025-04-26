"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Task } from "@/types/tasks";
import { Trash } from "lucide-react";

export default function TaskItem({ task, onDelete }: { task: Task; onDelete: (taskId: string) => void }) {


  return (
    <li className="flex border-2 justify-between">
      <Label className="w-full px-2">{task.description}</Label>
      <Button
        onClick={() => onDelete(task._id!)}
      >
        <Trash />
      </Button>
    </li>
  );
}
