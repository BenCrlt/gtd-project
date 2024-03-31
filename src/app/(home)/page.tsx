"use server";
import Loader from "@/components/ui/loader";
import { getAuthSession } from "@/lib/auth";
import { getTasksInRange, StatusTask } from "@/resolvers/task/query";
import { endOfDay, startOfDay } from "date-fns";
import { Suspense } from "react";
import UserPlanning from "./userPlanning/page";

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return <></>;
  }

  const todoTasks = await getTasksInRange(
    session.user.id,
    {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
    },
    StatusTask.ONLY_TODO
  );

  const doneTasks = await getTasksInRange(
    session.user.id,
    {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
    },
    StatusTask.ONLY_DONE
  );

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <UserPlanning todoTasks={todoTasks} doneTasks={doneTasks} />
      </Suspense>
    </div>
  );
}
