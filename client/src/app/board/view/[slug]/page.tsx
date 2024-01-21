import databaseAdapter from "@/app/board/common/adapter/databaseAdapter";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MarkdownRenderer from "@/app/board/common/components/MarkdownRenderer";
import DeleteButton from "@/app/board/view/[slug]/components/DeleteButton";
import Link from "next/link";

import type { Database } from "@/app/lib/Database";
import type { Metadata } from "next";

type MetadataProps = {
  params: {
    slug: string;
  };
  searchParams: {
    seq: number;
  };
};

export const generateMetadata = async ({
  params,
}: MetadataProps): Promise<Metadata> => {
  return {
    title: `게시판 - ${decodeURIComponent(params.slug)}`,
  };
};

const ViewBoard = async ({
  params,
  searchParams,
}: MetadataProps): Promise<JSX.Element> => {
  const database = databaseAdapter(
    createServerComponentClient<Database>({ cookies })
  );
  const post = await database.selectSlugAndSeq(params.slug, searchParams.seq);

  return (
    <>
      {post ? (
        <>
          <h1 className={"my-7 text-xl font-black"}>{post[0].title}</h1>
          <MarkdownRenderer content={post[0].article} className={"w-full"} />
          <div className={"flex"}>
            <DeleteButton seq={searchParams.seq} />
            <Link href={`/board/update/${post[0].slug}?seq=${post[0].seq}`}>
              <button type={"button"} className={"border-2"}>
                업데이트
              </button>
            </Link>
          </div>
        </>
      ) : (
        <p>이 문구가 보인다면 관리자에게 문의 부탁드립니다</p>
      )}
    </>
  );
};
export default ViewBoard;
