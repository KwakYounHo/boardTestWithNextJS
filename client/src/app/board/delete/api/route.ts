import databaseAdapter from "@/app/board/common/adapter/databaseAdapter";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const target = req.nextUrl.searchParams.get("seq");
  const database = databaseAdapter(createRouteHandlerClient({ cookies }));

  if (target) {
    const error = await database.deletePost(target);
    const redirectURL = new URL("/board", req.url);

    if (error) {
      return NextResponse.json(error, {
        status: 400,
        headers: {
          "Cache-Control": "no-Store",
        },
      });
    } else {
      return NextResponse.json(redirectURL, {
        status: 200,
        headers: {
          "Cache-Control": "no-Store",
        },
      });
    }
  } else {
    return NextResponse.json("유효하지 않은 seq", {
      status: 400,
      headers: {
        "Cache-Control": "no-Store",
      },
    });
  }
};
