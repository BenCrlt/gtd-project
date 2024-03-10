"use client";

import { Calendar } from "@/components/ui/calendar";

type Props = {
  date: Date | undefined;
  onChange: (dateToSave: Date) => void;
};

export function DatePicker({ date, onChange }: Props) {
  return (
    <Calendar
      mode="single"
      selected={date}
      initialFocus
      onSelect={(daySelected) => {
        if (!date || !daySelected) {
          return;
        }
        onChange(
          new Date(
            daySelected.getFullYear(),
            daySelected.getMonth(),
            daySelected.getDate(),
            date.getHours(),
            date.getMinutes()
          )
        );
      }}
    />
  );
}
