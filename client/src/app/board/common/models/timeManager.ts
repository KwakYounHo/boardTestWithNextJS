import { format } from "date-fns-tz";

export const timer = (date: string) => {
  const timeZone = "Asia/Seoul";
  const pattern = "yyyy년 MM월 dd일";
  const output = format(new Date(date), pattern, { timeZone });

  return output;
};
