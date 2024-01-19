"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import EditorContainer from "@/app/board/common/container/EditorContainer";

type FormType = {
  title: string;
  article: string;
  slug: string;
};

const BoardForm = (): JSX.Element => {
  const form = useForm<FormType>();
  const { register, handleSubmit, setValue } = form;

  const [content, setContent] = React.useState<string>("");
  React.useEffect(() => {
    setValue("article", content);
  }, [content]);

  const submit: SubmitHandler<FormType> = (data) => {
    data.slug = encodeURIComponent(data.slug);
    console.log(data);
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
