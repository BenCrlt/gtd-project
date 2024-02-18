"use client";

import { PopoverClose } from "@radix-ui/react-popover";
import { useMemo, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Typography from "../typography";
import { TimeScrollArea } from "./time-scroll-area";

export type TimePickerProps = {
  initDate?: Date;
};

export const TimePicker = ({ initDate }: TimePickerProps) => {
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

  return (
    <div>
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Input value={valueToDisplay} />
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <div className="flex gap-2 h-40 items-center justify-center px-10 ">
            <TimeScrollArea
              selectorValues={hoursSelectorValues}
              setValue={setHours}
            />
            <Typography variant="h2">:</Typography>
            <TimeScrollArea
              selectorValues={minutesSelectorValues}
              setValue={setMinutes}
            />
          </div>
          <div className="flex justify-between items-center border p-1">
            <PopoverClose>
              <Button className="opacity-80" variant="ghost">
                Annuler
              </Button>
            </PopoverClose>
            <PopoverClose>
              <Button variant="ghost">Confirmer</Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
