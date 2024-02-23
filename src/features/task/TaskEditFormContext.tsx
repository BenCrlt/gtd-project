import { TasksInRange } from "@/resolvers/task/query";
import { Priority } from "@prisma/client";
import { PropsWithChildren, createContext, useState } from "react";

export type EditTaskFormContextType = {
  taskToSave: TaskInEditingMode;
  onSelect: (task: TasksInRange[number]) => void;
  onUpdateField: <
    T extends TaskInEditingMode,
    K extends keyof T,
    V extends T[K]
  >(
    key: K,
    value: V
  ) => void;
  onResetField: <T extends TaskInEditingMode, K extends keyof T>(
    key: K
  ) => void;
};

const EditTaskFormContext = createContext<EditTaskFormContextType>({
  taskToSave: {
    name: "",
    description: "",
    area: null,
    startDate: new Date(),
    endDate: null,
    isDone: false,
    priority: Priority.LOW,
  },
  onSelect: () => {
    return;
  },
  onUpdateField: () => {
    return;
  },
  onResetField: () => {
    return;
  },
});

type TaskInEditingMode = Pick<
  TasksInRange[number],
  | "name"
  | "description"
  | "area"
  | "startDate"
  | "endDate"
  | "isDone"
  | "priority"
>;

const EditTaskFormProvider = ({ children }: PropsWithChildren) => {
  const [taskToSave, setTaskToSave] = useState<TaskInEditingMode>({
    name: "",
    description: "",
    area: null,
    startDate: new Date(),
    endDate: null,
    isDone: false,
    priority: Priority.LOW,
  });
  const [taskBeforeEditing, setTaskBeforeEditing] =
    useState<TaskInEditingMode>(taskToSave);

  const onSelect = (task: TasksInRange[number]) => {
    setTaskBeforeEditing(task);
    setTaskToSave(task);
  };

  return (
    <EditTaskFormContext.Provider
      value={{
        taskToSave,
        onSelect,
        onUpdateField: (key, value) =>
          setTaskToSave((prev) => ({ ...prev, [key]: value })),
        onResetField: (key) =>
          setTaskToSave((prev) => ({
            ...prev,
            [key]: taskBeforeEditing[key as keyof TaskInEditingMode],
          })),
      }}
    >
      {children}
    </EditTaskFormContext.Provider>
  );
};
export { EditTaskFormContext, EditTaskFormProvider };
