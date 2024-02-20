import { DatePicker } from "./date-picker";
import { TimePicker } from "./time-picker";
import Typography from "./typography";

export type Props = {
  title?: string;
  date: Date;
  onConfirm: (dateToSave: Date) => void;
};

export const DateAndTimePicker = ({ date, onConfirm, title }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <Typography>{title}</Typography>
      <DatePicker initDate={date} onConfirm={onConfirm} />
      <TimePicker initDate={date} onConfirm={onConfirm} />
    </div>
  );
};
