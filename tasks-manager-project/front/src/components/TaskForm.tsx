"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function TaskForm() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      description: "",
    },
  });

  const router = useRouter();

  const onSubmit = handleSubmit (async (data) => {
    const description = data.description.trim();
    await postTask({description});
    reset();
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="flex gap-4">
      <Input
        placeholder="Add new task"
        {...register("description", { required: true })}
      />
      <Button className="cursor-pointer">Add Task</Button>
    </form>
  );
}
