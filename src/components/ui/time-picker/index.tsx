"use client";

import { PopoverClose } from "@radix-ui/react-popover";
import { useMemo, useState } from "react";
import { Input } from "../input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Typography from "../typography";
import { TimeScrollArea } from "./time-scroll-area";

export type TimePickerProps = {
  initDate: Date | undefined;
  onConfirm: (dateToSave: Date) => void;
};

export const TimePicker = ({ initDate, onConfirm }: TimePickerProps) => {
  const [hours, setHours] = useState(initDate ? initDate.getHours() : 12);
  const [minutes, setMinutes] = useState(initDate ? initDate.getMinutes() : 0);

  const hoursSelectorValues = Array.from({ length: 24 }).map((_, index) =>
    index.toString().padStart(2, "0")
  );

  const minutesSelectorValues = Array.from({ length: 60 }).map((_, index) =>
    index.toString().padStart(2, "0")
  );

  const valueToDisplay = useMemo(
    () =>
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`,
    [hours, minutes]
  );

  const onConfirmTimeSelection = () => {
    const dateToSave = initDate ?? new Date();
    dateToSave.setHours(hours);
    dateToSave.setMinutes(minutes);
    onConfirm(dateToSave);
  };

  const onCancelTimeSelection = () => {
    setHours(initDate ? initDate.getHours() : 12);
    setMinutes(initDate ? initDate.getMinutes() : 0);
  };

  return (
    <div>
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Input value={valueToDisplay} />
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-auto"
          onPointerDownOutside={onCancelTimeSelection}
        >
          <div className="flex gap-2 h-40 items-center justify-center px-10 ">
            <TimeScrollArea
              selectorValues={hoursSelectorValues}
              setValue={setHours}
            />
            <div>
              <Typography variant="h2">:</Typography>
            </div>
            <TimeScrollArea
              selectorValues={minutesSelectorValues}
              setValue={setMinutes}
            />
          </div>
          <div className="flex justify-between items-center border h-10 p-2">
            <PopoverClose onClick={onCancelTimeSelection}>Annuler</PopoverClose>
            <PopoverClose onClick={onConfirmTimeSelection}>
              Confirmer
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
