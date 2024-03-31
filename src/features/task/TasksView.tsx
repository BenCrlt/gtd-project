"use client";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { formatDate } from "@/lib/date";
import { TasksInRange } from "@/resolvers/task/query";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { EditTaskFormContext } from "./TaskEditFormContext";
import TaskItem from "./TaskItem";
import { TaskEditView } from "./TaskItem/TaskEditView";

interface Props {
  tasks: TasksInRange;
  date: Date;
}

export default function TasksView({ tasks, date }: Props) {
  const { open, setOpen, onCreate } = useContext(EditTaskFormContext);
  return (
    <div className="min-w-96 flex flex-col gap-4">
      <div>
        <Typography variant="h2">{formatDate(date, "PPPP")}</Typography>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </DialogTrigger>
        <Button onClick={onCreate}>
          <Plus />
        </Button>
        <TaskEditView />
      </Dialog>
    </div>
  );
}
