import databaseAdapter from "../../common/adapter/databaseAdapter";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import type { Database } from "@/app/lib/Database";

export const PATCH = async (req: NextRequest) => {
  const updateData = await req.json();
  const database = databaseAdapter(
    createRouteHandlerClient<Database>({ cookies })
  );

  const { data, error } = await database.updatePost(updateData);

  if (error) return NextResponse.json(error, { status: 400 });
  if (data) {
    const redirectURL = new URL(
      `/board/view/${data[0].slug}?seq=${data[0].seq}`,
      req.url
    );
    return NextResponse.json(redirectURL, {
      status: 200,
    });
  }
};
