"use server";

import { TaskFormProps } from "@/features/task/TaskEditFormContext";
import { prisma } from "@/lib/prisma";
import { omit } from "lodash";
import { revalidatePath } from "next/cache";

export const saveTask = async (taskToSave: TaskFormProps) => {
  if (!taskToSave.id) {
    const taskCreated = prisma.task.create({
      data: {
        ...taskToSave,
      },
    });
    revalidatePath("/");
    return taskCreated;
  }
  const taskUpdated = await prisma.task.update({
    where: { id: taskToSave.id },
    data: {
      ...omit(taskToSave, ["userId"]),
    },
  });
  revalidatePath("/");
  return taskUpdated;
};
