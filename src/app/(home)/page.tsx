import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return <></>;
  }

  const dailyTasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
      deletedAt: undefined,
      OR: [
        {
          startDate: {
            gte: startOfDay(new Date()),
            lte: endOfDay(new Date()),
          },
        },
        {
          endDate: {
            gte: startOfDay(new Date()),
            lte: endOfDay(new Date()),
          },
        },
      ],
    },
  });

  return (
    <div>
      {dailyTasks.map((task) => (
        <h1 key={task.id}>{task.name}</h1>
      ))}
    </div>
  );
}
