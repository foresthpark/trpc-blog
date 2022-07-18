import { format } from "date-fns";
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
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            The Blog
          </h2>
          <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
            <p className="text-xl text-gray-500">
              You write stuff. Some are good.
            </p>

            <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
              <Link href={`/posts/new`}>
                <button
                  type="button"
                  className="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
                >
                  Create Post
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {data.map((post) => (
            <div key={post.title}>
              <p className="text-sm text-gray-500">
                <time dateTime={post.createdAt.toString()}>
                  {format(post.createdAt, "MMMM d, yyyy")}
                </time>
              </p>
              <a href="#" className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">
                  {post.title}
                </p>
                <p className="mt-3 text-base text-gray-500">{post.body}</p>
              </a>
              <div className="mt-3">
                <a
                  href={`/posts/${post.id}`}
                  className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Read full story
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    // <div>
    //   {data?.map((post) => {
    //     return (
    //       <article key={post.id}>
    //         <p>{post.title}</p>
    //         <Link href={`/posts/${post.id}`}>Read Post</Link>
    //       </article>
    //     );
    //   })}
    // </div>
  );
};

export default AllPostsPage;
