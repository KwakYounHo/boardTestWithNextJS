import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/lib/Database";

type PostRows = Database["public"]["Tables"]["posts"]["Row"];

const databaseAdapter = (database: SupabaseClient<Database>) => {
  const insert = async (data: Pick<PostRows, "article" | "slug" | "title">) => {
    const { data: result, error } = await database
      .from("posts")
      .insert([{ ...data }])
      .select();
    return { result, error };
  };

  const getAllPost = async () => {
    const { data } = await database
      .from("posts")
      .select("seq, title, slug, created_at")
      .order("seq", { ascending: false });
    return data;
  };

  const selectSlugAndSeq = async (slug: string, seq: number) => {
    const { data } = await database
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("seq", seq);
    return data;
  };

  return { insert, getAllPost, selectSlugAndSeq };
};

export default databaseAdapter;
