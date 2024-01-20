"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import EditorContainer from "@/app/board/common/container/EditorContainer";
import { useRouter } from "next/navigation";

type FormType = {
  title: string;
  article: string;
  slug: string;
};

const BoardForm = (): JSX.Element => {
  const form = useForm<FormType>();
  const { register, handleSubmit, setValue } = form;
  const router = useRouter();

  const [content, setContent] = React.useState<string>("");
  React.useEffect(() => {
    setValue("article", content);
  }, [content]);

  const submit: SubmitHandler<FormType> = async (data) => {
    data.slug = encodeURIComponent(data.slug);

    const request = await fetch("/board/create/api", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (request.status < 400) {
      const redirectURL = await request.json();
      router.push(redirectURL);
    } else {
      console.error(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="text" {...register("title")} className={"border-2"} />
      <input type="text" {...register("slug")} className={"border-2"} />
      <EditorContainer content={content} setContent={setContent} />
      <button type="submit">전송</button>
    </form>
  );
};
export default BoardForm;
