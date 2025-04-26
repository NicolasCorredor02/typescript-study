import { Skeleton } from "@/components/ui/skeleton"

export default function TaskSkeleton() {
    return (
        <div className="flex flex-col items-center gap-5 my-4">
            <div className="w-full flex justify-between items-center gap-5">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-[50px] rounded-2xl" />
            </div>
            <div className="w-full flex justify-between items-center gap-5">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-[50px] rounded-2xl" />
            </div>
            <div className="w-full flex justify-between items-center gap-5">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-[50px] rounded-2xl" />
            </div>
        </div>
    )
}