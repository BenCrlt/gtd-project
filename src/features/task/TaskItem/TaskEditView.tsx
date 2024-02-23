import { DateAndTimePicker } from "@/components/ui/date-and-time-picker";
import { DialogContent } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Typography from "@/components/ui/typography";
import { Area, Priority } from "@prisma/client";
import { useContext } from "react";
import { EditTaskFormContext } from "../TaskEditFormContext";
export const TaskEditView = () => {
  const {
    taskToSave: { name, description, startDate, endDate },
    onUpdateField,
    onResetField,
  } = useContext(EditTaskFormContext);

  return (
    <DialogContent className="min-w-max flex flex-col gap-4">
      <Typography className="mb-8" variant="h1">
        {name}
      </Typography>
      <div>
        <div className="flex gap-2 items-center">
          <Typography>Date de début</Typography>
          <DateAndTimePicker
            date={startDate}
            onChange={(dateToSave) => onUpdateField("startDate", dateToSave)}
            onCancel={() => onResetField("startDate")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Typography>Date de fin</Typography>
          <DateAndTimePicker
            date={endDate ?? undefined}
            onChange={(dateToSave) => onUpdateField("endDate", dateToSave)}
            onCancel={() => onResetField("endDate")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Typography>Area</Typography>
          <Select onValueChange={(e) => onUpdateField("area", e as Area)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Area" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(Area).map((area, index) => (
                <SelectItem value={area} key={`area-edit-form-select-${index}`}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Typography>Priorité</Typography>
          <Select
            onValueChange={(e) => onUpdateField("priority", e as Priority)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(Priority).map((priority, index) => (
                <SelectItem
                  value={priority}
                  key={`priority-edit-form-select-${index}`}
                >
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col">
        <Typography variant="h2">Description</Typography>
        <Typography>{description}</Typography>
      </div>
    </DialogContent>
  );
};
