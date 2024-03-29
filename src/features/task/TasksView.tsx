"use client";

import { Dialog } from "@/components/ui/dialog";
import Typography from "@/components/ui/typography";
import { formatDate } from "@/lib/date";
import { TasksInRange } from "@/resolvers/task/query";
import { EditTaskFormProvider } from "./TaskEditFormContext";
import TaskItem from "./TaskItem";

interface Props {
  tasks: TasksInRange;
  date: Date;
}

export default function TasksView({ tasks, date }: Props) {
  return (
    <EditTaskFormProvider>
      <Dialog>
        <div className="min-w-96 flex flex-col gap-4">
          <div>
            <Typography variant="h2">{formatDate(date, "PPPP")}</Typography>
          </div>
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      </Dialog>
    </EditTaskFormProvider>
  );
}
