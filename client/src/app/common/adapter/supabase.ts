import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/lib/Database";

export const supabaseAdapter = (supabase: SupabaseClient<Database>) => {
  const postInsert = (title: string, slug: string, article: string): void => {
    supabase.from("posts").insert({ title, slug, article });
  };

  return { postInsert };
};
