import { getTasks } from "@/lib/api"
import TaskItem from "./TaskItem"

export default async function TasksList() {
    const tasks = await getTasks()
    
    if (!tasks) {
        return <p>Not tasks founded!</p>
    }

    return (
        <ul className="flex flex-col gap-4">
            {
                tasks.map((task) => (
                    <TaskItem key={task._id} task={task}/>
                ))
            }
        </ul>
    )
}