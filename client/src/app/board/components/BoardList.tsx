import Link from "next/link";

type Props = {
  seq: number;
  title: string;
  created_at: string;
  slug: string;
};

const BoardList = (element: Props): JSX.Element => {
  return (
    <div className={"flex justify-between"}>
      <p>{element.seq}</p>
      <Link href={`/board/view/${element.slug}`}>{element.title}</Link>
      <p>{element.created_at}</p>
    </div>
  );
};
export default BoardList;
