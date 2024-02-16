import { format } from "date-fns";

export type DateRange = {
  start: Date;
  end: Date;
};

const DEFAULT_FORMAT = "yyyy-MM-dd";

export const formatDate = (date: Date, dateFormat?: string) =>
  format(date, dateFormat ?? DEFAULT_FORMAT);
