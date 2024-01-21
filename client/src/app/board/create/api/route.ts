import databaseAdapter from "@/app/board/common/adapter/databaseAdapter";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";
import { type Database } from "@/app/lib/Database";
import { cookies } from "next/headers";
import { toUtc } from "@/app/utils/dateManager";

export const POST = async (req: NextRequest) => {
  const requestBody = await req.json();
  const database = databaseAdapter(
    createRouteHandlerClient<Database>({ cookies })
  );

  const created_at = toUtc(new Date(Date.now()));
  requestBody.created_at = created_at;

  const { data, error } = await database.insert(requestBody);

  if (error)
    return NextResponse.json(error, {
      status: 400,
    });
  if (data) {
    const redirectURL = new URL(
      `/board/view/${data[0].slug}?seq=${data[0].seq}`,
      req.url
    );
    return NextResponse.json(redirectURL, {
      status: 201,
    });
  }
};
