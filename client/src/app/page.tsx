import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "게시판 테스트",
};

const Home = (): JSX.Element => {
  return (
    <main className={"container flex justify-center m-auto"}>
      <Link href={"/board"}>보드로 이동</Link>
    </main>
  );
};
export default Home;
