"use client";

import Typography from "../typography";
import { TimeScrollArea } from "./time-scroll-area";

export type TimePickerProps = {
  date: Date | undefined;
  onChange: (dateToSave: Date) => void;
};

export const TimePicker = ({ date, onChange }: TimePickerProps) => {
  const hoursSelectorValues = Array.from({ length: 24 }).map((_, index) =>
    index.toString().padStart(2, "0")
  );

  const minutesSelectorValues = Array.from({ length: 60 }).map((_, index) =>
    index.toString().padStart(2, "0")
  );

  return (
    <div className="flex gap-2 h-40 items-center justify-center px-10 ">
      <TimeScrollArea
        selectorValues={hoursSelectorValues}
        onChange={(value) =>
          date &&
          onChange(
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDay(),
              value,
              date.getMinutes()
            )
          )
        }
      />
      <div>
        <Typography variant="h2">:</Typography>
      </div>
      <TimeScrollArea
        selectorValues={minutesSelectorValues}
        onChange={(value) =>
          date &&
          onChange(
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDay(),
              date.getHours(),
              value
            )
          )
        }
      />
    </div>
  );
};
