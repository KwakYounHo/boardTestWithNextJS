import Link from "next/link";
import { format } from "date-fns";

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
      <p>{format(new Date(element.created_at), "yyyy년 MM월 dd일")}</p>
    </div>
  );
};
export default BoardList;
