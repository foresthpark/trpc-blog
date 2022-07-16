import Link from "next/link";
import React from "react";
import { trpc } from "../../utils/trpc";

const AllPostsPage = () => {
  const { data, error, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) return <p className="text-5xl">Loading...</p>;
  if (!data) {
    return <h1 className="text-5xl text-blue-500">No Posts...</h1>;
  }

  return (
    <div>
      {data?.map((post) => {
        return (
          <article key={post.id}>
            <p>{post.title}</p>
            <Link href={`/posts/${post.id}`}>Read Post</Link>
          </article>
        );
      })}
    </div>
  );
};

export default AllPostsPage;
