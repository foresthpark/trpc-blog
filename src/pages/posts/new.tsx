import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

const CreatePostPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreatePostInput>();
  const { mutate, error } = trpc.useMutation(["posts.create-post"], {
    onSuccess: (data, variables, context) => {
      console.log(data, variables, context);
      router.push(`/posts/${data.id}`);
    },
  });

  const onSubmit = (data: CreatePostInput) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-red-500">{error.message}</p>}
      <h1>Create Posts</h1>
      <br />
      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: "You need a title" })}
      />
      <br />
      <textarea
        placeholder="Body"
        {...register("body", { required: "You need a body" })}
      />
      <br />
      <br />
      <br />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostPage;
