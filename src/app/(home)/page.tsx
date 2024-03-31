"use server";
import Loader from "@/components/ui/loader";
import { getAuthSession } from "@/lib/auth";
import { getTasksInRange } from "@/resolvers/task/query";
import { endOfDay, startOfDay } from "date-fns";
import { Suspense } from "react";
import UserPlanning from "./userPlanning/page";

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
      <Suspense fallback={<Loader />}>
        <UserPlanning tasks={dailyTasks} />
      </Suspense>
    </div>
  );
}
