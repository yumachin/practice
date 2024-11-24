"use client";

import { useRouter } from "next/navigation";
import { use, useRef } from "react";

const editComment = async ( title: string | undefined, content: string | undefined, id: number ) => {
  const res = await fetch(`/api/comment/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "applicatin/json"
    },
    body: JSON.stringify({ title, content, id })
  });
  return res.json();
}

const deleteComment = async ( id: number ) => {
  const res = await fetch(`/api/comment/${id}`, {
    method: "DELETE"
  });
  return await res.json();
}

export default function EditComment({ params }: { params: Promise<{ id : number }> }) {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { id } = use(params);

  const handleEdit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    await editComment(titleRef.current?.value, contentRef.current?.value, id);
    router.push("/");
    router.refresh();
  }

  const handleDelete = async ( e: React.FormEvent ) => {
    e.preventDefault();
    await deleteComment( id );
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
          <form>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={contentRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            />
            <button onClick={handleEdit} className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              更新
            </button>
            <button onClick={handleDelete} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
