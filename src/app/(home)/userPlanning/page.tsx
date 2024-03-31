"use client";
import { EditTaskFormProvider } from "@/features/task/TaskEditFormContext";
import TasksView from "@/features/task/TasksView";
import { TasksInRange } from "@/resolvers/task/query";

interface Props {
  todoTasks: TasksInRange;
  doneTasks: TasksInRange;
}

export default function UserPlanning({ todoTasks, doneTasks }: Props) {
  return (
    <div className="flex justify-around w-full">
      <EditTaskFormProvider>
        <TasksView
          todoTasks={todoTasks}
          doneTasks={doneTasks}
          date={new Date()}
        />
      </EditTaskFormProvider>
    </div>
  );
}
