import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";

const MINUTES_IN_ONE_HOUR = 60;
const MINUTES_IN_ONE_DAY = MINUTES_IN_ONE_HOUR * 24;

export type DateRange = {
  start: Date;
  end: Date;
};

const DEFAULT_FORMAT = "yyyy-MM-dd";

export const formatDate = (date: Date, dateFormat?: string) =>
  format(date, dateFormat ?? DEFAULT_FORMAT);

export const getTimeDifferenceString = (
  startDate: Date,
  endDate?: Date | null
) => {
  if (!endDate) {
    return undefined;
  }
  const _differenceInMinutes = differenceInMinutes(endDate, startDate);
  if (_differenceInMinutes >= MINUTES_IN_ONE_DAY) {
    return `${differenceInDays(endDate, startDate)}d`;
  }
  if (_differenceInMinutes >= MINUTES_IN_ONE_HOUR) {
    return `${differenceInHours(endDate, startDate)}h`;
  }
  return `${_differenceInMinutes}m`;
};
