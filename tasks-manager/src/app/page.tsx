import TaskSkeleton from "@/components/TaskSkeleton";
import { Suspense } from "react";
import { getTasks } from "@/lib/api";
import TaskItemList from "@/components/TaskItemList";

export default async function Home() {
  const initialTasks = await getTasks();

  return (
    <main className="h-auto flex flex-col">
      <h1 className="mb-32 mx-auto text-4xl">Tasks Manager</h1>
      <section className="mt-4">
        <Suspense fallback={<TaskSkeleton />}>
          <TaskItemList initialTasks={initialTasks} />
        </Suspense>
      </section>
    </main>
  );
}
