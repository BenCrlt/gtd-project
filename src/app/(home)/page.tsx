import Loader from "@/components/ui/loader";
import TasksView from "@/features/task/TasksView";
import { getAuthSession } from "@/lib/auth";
import { getTasksInRange } from "@/resolvers/task/query";
import { endOfDay, startOfDay } from "date-fns";
import { Suspense } from "react";

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return <></>;
  }

  const dailyTasks = await getTasksInRange(session.user.id, {
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  });

  return (
    <div>
      <div className="flex justify-around w-full">
        <Suspense fallback={<Loader />}>
          <TasksView tasks={dailyTasks} date={new Date()} />
        </Suspense>
      </div>
    </div>
  );
}
