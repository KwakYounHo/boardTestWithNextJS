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
    data.slug = encodeURIComponent(data.title);

    const request = await fetch("/board/create/api", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (request.status < 400) {
      const redirectURL = await request.json();
      router.push(redirectURL);
    } else {
      alert("게시글 생성 중 오류!");
      console.error(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={"w-full"}>
      <input type="text" {...register("title")} className={"border-2 w-full"} />
      <EditorContainer content={content} setContent={setContent} />
      <button type="submit">전송</button>
    </form>
  );
};
export default BoardForm;
