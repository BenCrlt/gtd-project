import { DateRange } from "@/lib/date";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getTasksInRange = async (
  userId: string,
  { start, end }: DateRange
) =>
  prisma.task.findMany({
    where: {
      userId: userId,
      deletedAt: undefined,
      OR: [
        {
          startDate: {
            gte: start,
            lte: end,
          },
        },
        {
          endDate: {
            gte: start,
            lte: end,
          },
        },
      ],
    },
    include: {
      project: true,
    },
    orderBy: [
      {
        priority: "desc",
      },
      { startDate: "asc" },
    ],
  });

export type TasksInRange = Prisma.PromiseReturnType<typeof getTasksInRange>;
