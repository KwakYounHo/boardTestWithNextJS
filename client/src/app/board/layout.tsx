import BoardHeader from "@/app/board/components/boardHeader";

const BoardLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <main className={"container flex flex-col items-center m-auto"}>
        <BoardHeader className={"my-5"} />
        {children}
      </main>
    </>
  );
};
export default BoardLayout;
