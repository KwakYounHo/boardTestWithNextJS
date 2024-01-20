"use client";

import { useRouter } from "next/navigation";

type Props = {
  seq: number;
};

const DeleteButton = ({ seq }: Props): JSX.Element => {
  const router = useRouter();

  const deleteRequest = async () => {
    const request = await fetch(`/board/delete/api?seq=${seq}`, {
      method: "DELETE",
    });

    if (request.status < 400) {
      router.push(await request.json());
    } else {
      console.error(await request.json());
    }
  };

  return (
    <>
      <button type={"button"} onClick={deleteRequest} className={"border-2"}>
        삭제하기
      </button>
    </>
  );
};
export default DeleteButton;
