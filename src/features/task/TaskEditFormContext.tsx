import { saveTask } from "@/resolvers/task/mutation";
import { TasksInRange } from "@/resolvers/task/query";
import { Priority, Task } from "@prisma/client";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type EditTaskFormContextType = {
  taskToSave: TaskFormProps;
  onSelect: (task: TasksInRange[number]) => void;
  onSubmit: () => void;
  onUpdateField: <T extends TaskFormProps, K extends keyof T, V extends T[K]>(
    key: K,
    value: V
  ) => void;
  onResetField: <T extends TaskFormProps, K extends keyof T>(key: K) => void;
  editName: boolean;
  setEditName: Dispatch<SetStateAction<boolean>>;
};

const defaultTask: TaskFormProps = {
  id: undefined,
  name: "",
  description: "",
  area: null,
  startDate: new Date(),
  endDate: null,
  isDone: false,
  priority: Priority.LOW,
  userId: "",
};

const EditTaskFormContext = createContext<EditTaskFormContextType>({
  taskToSave: defaultTask,
  onSelect: () => {
    return;
  },
  onSubmit: () => {
    return;
  },
  onUpdateField: () => {
    return;
  },
  onResetField: () => {
    return;
  },
  editName: false,
  setEditName: () => false,
});

export type TaskFormProps = Pick<
  Task,
  | "name"
  | "description"
  | "area"
  | "startDate"
  | "endDate"
  | "isDone"
  | "priority"
  | "userId"
> & { id: string | undefined };

const EditTaskFormProvider = ({ children }: PropsWithChildren) => {
  const [taskToSave, setTaskToSave] = useState<TaskFormProps>(defaultTask);
  const [taskBeforeEditing, setTaskBeforeEditing] =
    useState<TaskFormProps>(taskToSave);

  const [editName, setEditName] = useState<boolean>(false);

  const onSelect = (task: TasksInRange[number]) => {
    setTaskBeforeEditing(task);
    setTaskToSave(task);
  };

  const onSubmit = (): void => {
    setEditName(false);
    void saveTask(taskToSave);
  };

  return (
    <EditTaskFormContext.Provider
      value={{
        taskToSave,
        onSelect,
        onSubmit,
        onUpdateField: (key, value) =>
          setTaskToSave((prev) => ({ ...prev, [key]: value })),
        onResetField: (key) =>
          setTaskToSave((prev) => ({
            ...prev,
            [key]: taskBeforeEditing[key as keyof TaskFormProps],
          })),
        editName,
        setEditName,
      }}
    >
      {children}
    </EditTaskFormContext.Provider>
  );
};
export { EditTaskFormContext, EditTaskFormProvider };
