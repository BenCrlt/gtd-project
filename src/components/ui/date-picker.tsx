"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";

type Props = {
  initDate: Date | undefined;
  onConfirm: (dateToSave: Date) => void;
};

export function DatePicker({ initDate, onConfirm }: Props) {
  const [day, setDay] = useState(initDate);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !day && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {day ? format(day, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        onPointerDownOutside={() => setDay(initDate)}
      >
        <Calendar
          mode="single"
          selected={day}
          initialFocus
          onSelect={(daySelected) => setDay(daySelected)}
        />
        <div className="flex justify-between items-center border h-10 p-2">
          <PopoverClose onClick={() => setDay(initDate)}>Annuler</PopoverClose>
          <PopoverClose onClick={() => day && onConfirm(day)}>
            Confirmer
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
