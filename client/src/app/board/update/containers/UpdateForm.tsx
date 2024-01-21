"use client";

import * as React from "react";
import EditorContainer from "@/app/board/common/container/EditorContainer";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toUtc } from "@/app/utils/dateManager";
import { useRouter } from "next/navigation";

type UpdateForm = {
  title: string;
  article: string;
  updated_at: string;
  seq: number;
};

type Props = {
  target: {
    article: string;
    created_at: string;
    seq: number;
    slug: string;
    title: string;
    updated_at: string | null;
  }[];
};

const UpdateForm = ({ target }: Props) => {
  const router = useRouter();
  const form = useForm<UpdateForm>();
  const { register, handleSubmit, setValue, watch } = form;

  const [content, setContent] = React.useState<string>(target[0].article);
  const articleText = watch("article");

  React.useEffect(() => {
    if (content !== articleText) {
      setValue("article", content);
    }
  }, [content]);

  const submit: SubmitHandler<UpdateForm> = async (updateData: UpdateForm) => {
    const updateDate = toUtc(new Date(Date.now()));
    updateData.updated_at = updateDate;
    updateData.seq = target[0].seq;

    const request = await fetch("/board/update/api", {
      method: "PATCH",
      body: JSON.stringify(updateData),
    });

    if (request.status < 400) {
      console.log("업데이트 성공!");
      router.push(await request.json());
      router.refresh();
    } else {
      alert("게시물 업데이트 중 오류 발생!");
      return console.error(await request.json());
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={"w-full"}>
      <input
        type={"text"}
        {...register("title", { value: target[0].title })}
        className={"w-full border-2"}
      />
      <EditorContainer content={content} setContent={setContent} />
      <button type={"submit"} className={"border-2"}>
        업데이트
      </button>
    </form>
  );
};
export default UpdateForm;
