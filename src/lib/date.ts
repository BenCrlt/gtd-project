import { format } from "date-fns";

const DEFAULT_FORMAT = "YYYY-MM-DD";

export const formatDate = (date: Date) => format(date, DEFAULT_FORMAT);
