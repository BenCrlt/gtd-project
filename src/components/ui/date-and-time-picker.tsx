import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { DatePicker } from "./date-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { TimePicker } from "./time-picker";

export type Props = {
  title?: string;
  date: Date | undefined;
  onChange: (dateToSave: Date) => void;
  onCancel: () => void;
};

export const DateAndTimePicker = ({ date, onChange, onCancel }: Props) => {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP p") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 flex flex-col gap-1"
        onPointerDownOutside={onCancel}
      >
        <DatePicker date={date} onChange={onChange} />
        <TimePicker date={date} onChange={onChange} />
        <div className="flex justify-between items-center border h-10 p-2">
          <PopoverClose onClick={onCancel}>Annuler</PopoverClose>
          <PopoverClose>Confirmer</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
