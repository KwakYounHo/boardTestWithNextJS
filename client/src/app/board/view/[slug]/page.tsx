import databaseAdapter from "@/app/board/common/adapter/databaseAdapter";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MarkdownRenderer from "@/app/board/common/components/MarkdownRenderer";

import type { Database } from "@/app/lib/Database";
import type { Metadata } from "next";

type MetadataProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: MetadataProps): Promise<Metadata> => {
  return {
    title: `게시판 - ${decodeURIComponent(params.slug)}`,
  };
};

const ViewBoard = async ({ params }: MetadataProps): Promise<JSX.Element> => {
  const database = databaseAdapter(
    createServerComponentClient<Database>({ cookies })
  );
  const post = await database.selectSlug(params.slug);

  return (
    <>
      {post ? (
        <>
          <h1 className={"m-7 text-xl font-black"}>{post[0].title}</h1>
          <MarkdownRenderer content={post[0].article} />
        </>
      ) : (
        <p>이 문구가 보인다면 관리자에게 문의 부탁드립니다</p>
      )}
    </>
  );
};
export default ViewBoard;