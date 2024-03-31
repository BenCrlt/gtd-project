"use client";
import { EditTaskFormProvider } from "@/features/task/TaskEditFormContext";
import TasksView from "@/features/task/TasksView";
import { TasksInRange } from "@/resolvers/task/query";

interface Props {
  tasks: TasksInRange;
}

export default function UserPlanning({ tasks }: Props) {
  return (
    <div className="flex justify-around w-full">
      <EditTaskFormProvider>
        <TasksView tasks={tasks} date={new Date()} />
      </EditTaskFormProvider>
    </div>
  );
}
