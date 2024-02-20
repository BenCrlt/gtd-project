import { DateAndTimePicker } from "@/components/ui/date-and-time-picker";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { TasksInRange } from "@/resolvers/task/query";
import { useState } from "react";

export type TaskEditViewProps = {
  task: TasksInRange[number];
};

export const TaskEditView = ({ task }: TaskEditViewProps) => {
  const {
    name,
    description,
    startDate: startDateInit,
    endDate: endDateInit,
  } = task;

  const [startDate, setStartDate] = useState(startDateInit);
  const [endDate, setEndDate] = useState(endDateInit);

  return (
    <SheetContent className="min-w-max">
      <SheetHeader>
        <SheetTitle>{name}</SheetTitle>
        {description}
      </SheetHeader>
      <div className="flex gap-2">
        <DateAndTimePicker
          title="Date de début"
          date={startDate}
          onConfirm={(dateToSave) => setStartDate(dateToSave)}
        />
        <DateAndTimePicker
          title="Date de fin"
          date={endDate}
          onConfirm={(dateToSave) => setEndDate(dateToSave)}
        />
      </div>
    </SheetContent>
  );
};
