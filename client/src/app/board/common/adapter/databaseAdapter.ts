import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/lib/Database";

type PostRows = Database["public"]["Tables"]["posts"]["Row"];

const databaseAdapter = (database: SupabaseClient<Database>) => {
  const insert = (data: Pick<PostRows, "article" | "slug" | "title">) => {
    database.from("posts").insert(data);
  };

  const getAllPost = async () => {
    const { data } = await database
      .from("posts")
      .select("seq, title, slug, created_at");
    return data;
  };

  return { insert, getAllPost };
};

export default databaseAdapter;
