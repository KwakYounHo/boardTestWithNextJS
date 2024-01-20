import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);

export const utcToISO8601 = (date: string, format: string): string => {
  return dayjs(date).tz("Asia/Yangon").format(format);
};

export const toUtc = (date: Date): string => {
  return dayjs(date).utc().format("YYYY-MM-DDTHH:mm:ss.SSS+00:00");
};
