"use server";

import { TaskFormProps } from "@/features/task/TaskEditFormContext";
import { prisma } from "@/lib/prisma";
import { omit } from "lodash";

export const saveTask = async (taskToSave: TaskFormProps) => {
  if (!taskToSave.id) {
    return prisma.task.create({
      data: {
        ...taskToSave,
      },
    });
  }
  return prisma.task.update({
    where: { id: taskToSave.id },
    data: {
      ...omit(taskToSave, ["userId"]),
    },
  });
};
