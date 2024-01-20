type Props = React.ComponentProps<"div">;

const BoardHeader = ({ ...props }: Props): JSX.Element => {
  return (
    <div className={`w-1/2 flex justify-around text-sm ${props.className}`}>
      <a href={"/board"}>리스트</a>
      <a href={"/board/create"}>작성하기</a>
    </div>
  );
};
export default BoardHeader;
