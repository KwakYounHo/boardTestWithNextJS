import Link from "next/link";
import { utcToISO8601 } from "@/app/utils/dateManager";

type Props = {
  seq: number;
  title: string;
  created_at: string;
  slug: string;
};

const BoardList = (element: Props): JSX.Element => {
  return (
    <div className={"flex justify-between w-1/2"}>
      <p>{element.seq}</p>
      <Link href={`/board/view/${element.slug}?seq=${element.seq}`}>
        {element.title}
      </Link>
      <p>{utcToISO8601(element.created_at, "YYYY년 MM월 DD일")}</p>
    </div>
  );
};
export default BoardList;
