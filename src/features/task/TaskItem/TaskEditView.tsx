import { DatePicker } from "@/components/ui/date-picker";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TimePicker } from "@/components/ui/time-picker/index";
import Typography from "@/components/ui/typography";
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
        <SheetDescription>
          <Typography>{description}</Typography>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              <Typography>Date de début</Typography>
              <DatePicker date={startDate} setDate={setStartDate} />
              <TimePicker initDate={startDate} />
            </div>
            <div className="flex flex-col gap-1">
              <Typography>Date de fin</Typography>
              <DatePicker date={endDate || undefined} setDate={setEndDate} />
              <TimePicker initDate={endDate} />
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};
