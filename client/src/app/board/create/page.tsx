import BoardForm from "@/app/board/create/containers/BoardForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "게시판 - 작성하기",
};

const CreateBoard = (): JSX.Element => {
  return (
    <>
      <h1>글 작성하기</h1>
      <BoardForm />
    </>
  );
};
export default CreateBoard;
