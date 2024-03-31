import { DateRange } from "@/lib/date";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export enum StatusTask {
  ONLY_TODO,
  ONLY_DONE,
  ALL,
}

const getStatusTaskCondition = (status: StatusTask) => {
  switch (status) {
    case StatusTask.ALL:
      return undefined;
    case StatusTask.ONLY_DONE:
      return true;
    case StatusTask.ONLY_TODO:
      return false;
    default:
      throw Error("SHOULD NOT HAPPEN");
  }
};

export const getTasksInRange = async (
  userId: string,
  { start, end }: DateRange,
  status: StatusTask
) =>
  prisma.task.findMany({
    where: {
      userId: userId,
      deletedAt: undefined,
      isDone: getStatusTaskCondition(status),
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
    orderBy: [
      {
        priority: "desc",
      },
      { startDate: "asc" },
    ],
  });

export type TasksInRange = Prisma.PromiseReturnType<typeof getTasksInRange>;
