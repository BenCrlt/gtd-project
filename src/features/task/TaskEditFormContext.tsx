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
  onSubmit: () => Promise<void>;
  onUpdateField: <T extends TaskFormProps, K extends keyof T, V extends T[K]>(
    key: K,
    value: V
  ) => void;
  onResetField: <T extends TaskFormProps, K extends keyof T>(key: K) => void;
  editName: boolean;
  setEditName: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const defaultTask: TaskFormProps = {
  id: undefined,
  name: "",
  description: "",
  area: null,
  startDate: new Date(),
  endDate: null,
  priority: Priority.LOW,
  userId: "",
};

const EditTaskFormContext = createContext<EditTaskFormContextType>({
  taskToSave: defaultTask,
  onSelect: () => {
    return;
  },
  onSubmit: async () => {
    return new Promise((res) => res());
  },
  onUpdateField: () => {
    return;
  },
  onResetField: () => {
    return;
  },
  editName: false,
  setEditName: () => false,
  loading: false,
  open: false,
  setOpen: () => false,
});

export type TaskFormProps = Pick<
  Task,
  | "name"
  | "description"
  | "area"
  | "startDate"
  | "endDate"
  | "priority"
  | "userId"
> & { id?: string };

const EditTaskFormProvider = ({ children }: PropsWithChildren) => {
  const [taskToSave, setTaskToSave] = useState<TaskFormProps>(defaultTask);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [taskBeforeEditing, setTaskBeforeEditing] =
    useState<TaskFormProps>(taskToSave);

  const [editName, setEditName] = useState<boolean>(false);

  const onSelect = (task: TasksInRange[number]) => {
    setTaskBeforeEditing(task);
    setTaskToSave(task);
  };

  const onSubmit = async (): Promise<void> => {
    setLoading(true);
    setEditName(false);
    await saveTask(taskToSave);
    setLoading(false);
    setOpen(false);
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
        loading,
        open,
        setOpen,
      }}
    >
      {children}
    </EditTaskFormContext.Provider>
  );
};
export { EditTaskFormContext, EditTaskFormProvider };
