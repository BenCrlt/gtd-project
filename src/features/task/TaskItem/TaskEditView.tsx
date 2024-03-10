import { DateAndTimePicker } from "@/components/ui/date-and-time-picker";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";
import { Area, Priority } from "@prisma/client";
import { useContext } from "react";
import { EditTaskFormContext } from "../TaskEditFormContext";
export const TaskEditView = () => {
  const {
    taskToSave: { name, description, startDate, endDate, priority, area },
    onUpdateField,
    onResetField,
  } = useContext(EditTaskFormContext);

  return (
    <DialogContent className="min-w-max flex flex-col gap-4 m-2">
      <Typography className="py-4 pr-2" variant="h1">
        {name}
      </Typography>
      <div className="grid grid-cols-2 items-center gap-2">
        <Typography>Date de début</Typography>
        <DateAndTimePicker
          date={startDate}
          onChange={(dateToSave) => onUpdateField("startDate", dateToSave)}
          onCancel={() => onResetField("startDate")}
        />
        <Typography>Date de fin</Typography>
        <DateAndTimePicker
          date={endDate ?? undefined}
          onChange={(dateToSave) => onUpdateField("endDate", dateToSave)}
          onCancel={() => onResetField("endDate")}
        />
        <Typography>Area</Typography>
        <Select
          onValueChange={(e) => onUpdateField("area", e as Area)}
          value={area ?? "Non renseigné"}
        >
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
        <Typography>Priorité</Typography>
        <Select
          onValueChange={(e) => onUpdateField("priority", e as Priority)}
          value={priority}
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
      <div className="flex flex-col gap-4">
        <Typography variant="h2">Description</Typography>
        <Textarea
          value={description}
          placeholder="Renseigner une description"
          onChange={(e) => onUpdateField("description", e.currentTarget.value)}
        />
      </div>
      <DialogFooter className="flex gap-2">
        <DialogClose className="opacity-50">Annuler</DialogClose>
        <DialogClose>Confirmer</DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
