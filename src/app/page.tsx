import { CommentType } from "@/types/types";
import Link from "next/link";
import { headers } from "next/headers";

const getAllComments = async ( host: string ) => {
  const res = await fetch(`http://${host}/api/comment/`, {
    cache: "no-store"
  });
  const data = await res.json();
  return data.comments;
}

export default async function Home() {
  const header = await headers();
  const host = header.get("host");
  const comments = await getAllComments(host!);
  console.log(comments);
  
  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold">
          Full Stack Blog 📝
        </h1>
      </div>

      <div className="flex my-5">
        <Link
          href={"/pages/add"}
          className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold"
        >
          ブログ新規作成
        </Link>
      </div>
        <>
        {comments.map((comment: CommentType) => (
          <div key={comment.id} className="w-full flex flex-col justify-center items-center">
            <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-300 flex flex-col justify-center">
              <div className="flex items-center my-3">
                <div className="mr-auto">
                  <h2 className="mr-auto font-semibold">{comment.title}</h2>
                </div>
                <Link
                  href={`/pages/edit/${comment.id}`}
                  className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
                >
                  編集
                </Link>
              </div>

              <div className="mr-auto my-1">
                <blockquote className="font-bold text-slate-700">{new Date(comment.date).toDateString()}</blockquote>
              </div>

              <div className="mr-auto my-1">
                <h2>{comment.content}</h2>
              </div>
            </div>
          </div>
        ))}
        </>
    </main>
  );
};