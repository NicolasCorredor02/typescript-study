import TaskForm from "@/components/TaskForm";
import TaskSkeleton from "@/components/TaskSkeleton";
import TasksList from "@/components/TasksList";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // Esto hace que cada vez que se entre a la pagina se haga una peticion

export default function Home() {

  return (
    <div className="w-1/2">
      <h1 className="mb-32 text-center text-4xl">Tasks Manager</h1>
      <section className="my-4">
        <Suspense fallback={<TaskSkeleton />}>
          <TasksList />
        </Suspense>
      </section>
      <section>
        <TaskForm />
      </section>
    </div>
  );
}
