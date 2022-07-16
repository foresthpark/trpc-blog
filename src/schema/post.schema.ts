import z from "zod";

export const createPostSchema = z.object({
  title: z.string().max(256, "Title is too long"),
  body: z.string().min(10),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;

export const getSinglePostSchmea = z.object({
  postId: z.string().uuid(),
});
