"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { formatDate } from "@/lib/date";
import { TasksInRange } from "@/resolvers/task/query";
import { Dialog } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { EditTaskFormContext } from "./TaskEditFormContext";
import TaskItem from "./TaskItem";
import { TaskEditView } from "./TaskItem/TaskEditView";

interface Props {
  todoTasks: TasksInRange;
  doneTasks: TasksInRange;
  date: Date;
}

export default function TasksView({ todoTasks, date, doneTasks }: Props) {
  const { open, setOpen, onCreate } = useContext(EditTaskFormContext);
  return (
    <div className="min-w-96 flex flex-col gap-4">
      <div>
        <Typography variant="h2">{formatDate(date, "PPPP")}</Typography>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            {todoTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
          <Button onClick={onCreate} className="w-full">
            <Plus />
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          {doneTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <TaskEditView />
      </Dialog>
    </div>
  );
}
