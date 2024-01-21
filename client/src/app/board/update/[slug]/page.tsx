import databaseAdapter from "@/app/board/common/adapter/databaseAdapter";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UpdateForm from "@/app/board/update/containers/UpdateForm";

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
    title: `게시판 수정 - ${params.slug}`,
  };
};

const Update = async ({
  params,
  searchParams,
}: MetadataProps): Promise<JSX.Element> => {
  const database = databaseAdapter(
    createServerComponentClient<Database>({ cookies })
  );
  const data = await database.selectSlugAndSeq(params.slug, searchParams.seq);

  return (
    <>
      {data ? (
        <>
          <h1 className={"my-7"}>게시글 수정</h1>
          <UpdateForm target={data} />
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};
export default Update;
