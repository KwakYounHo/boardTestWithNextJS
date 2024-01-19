const BoardLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <main className={"container flex flex-col items-center m-auto"}>
      {children}
    </main>
  );
};
export default BoardLayout;
