import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import databaseAdapter from "@/app/board/common/adapter/databaseAdapter";
import { cookies } from "next/headers";
import BoardList from "@/app/board/components/BoardList";

import type { Metadata } from "next";
import type { Database } from "@/app/lib/Database";

export const metadata: Metadata = {
  title: "게시판 - 리스트",
};

const Board = async (): Promise<JSX.Element> => {
  const database = databaseAdapter(
    createServerComponentClient<Database>({ cookies })
  );

  const list = await database.getAllPost();

  return (
    <>
      <h1 className={"my-5"}>게시판 리스트</h1>
      {list ? (
        <div className={"flex flex-col items-center w-full my-5"}>
          {list.map((element) => (
            <BoardList {...element} key={element.seq} />
          ))}
        </div>
      ) : (
        <p>이 문구가 보인다면 관리자에게 문의하시길 바랍니다</p>
      )}
    </>
  );
};
export default Board;
