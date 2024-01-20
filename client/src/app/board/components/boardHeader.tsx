import Link from "next/link";

type Props = React.ComponentProps<"div">;

const BoardHeader = ({ ...props }: Props): JSX.Element => {
  return (
    <div className={`w-1/2 flex justify-around text-sm ${props.className}`}>
      <Link href={"/board"}>리스트</Link>
      <Link href={"/board/create"}>작성하기</Link>
    </div>
  );
};
export default BoardHeader;
