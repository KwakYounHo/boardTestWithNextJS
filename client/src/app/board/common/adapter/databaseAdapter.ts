import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/lib/Database";

type PostRows = Database["public"]["Tables"]["posts"]["Row"];

const databaseAdapter = (database: SupabaseClient<Database>) => {
  const insert = async (
    insertData: Pick<PostRows, "article" | "slug" | "title">
  ) => {
    const { data, error } = await database
      .from("posts")
      .insert([{ ...insertData }])
      .select();
    return { data, error };
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

  const deletePost = async (seq: string): Promise<void | PostgrestError> => {
    const { error } = await database.from("posts").delete().eq("seq", seq);
    if (error) error;
  };

  const updatePost = async (
    updateData: Pick<PostRows, "title" | "article" | "updated_at" | "seq">
  ) => {
    const { seq, ...send } = updateData;
    const { data, error } = await database
      .from("posts")
      .update({ ...send })
      .eq("seq", updateData.seq)
      .select();

    return { data, error };
  };

  return { insert, getAllPost, selectSlugAndSeq, deletePost, updatePost };
};

export default databaseAdapter;
