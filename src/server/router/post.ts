import { TRPCError } from "@trpc/server";
import {
  createPostSchema,
  getSinglePostSchmea,
} from "./../../schema/post.schema";
import { createRouter } from "./context";

export const postRouter = createRouter()
  .mutation("create-post", {
    input: createPostSchema,
    async resolve({ ctx, input }) {
      console.log("🚀 ~ file: post.ts ~ line 12 ~ resolve ~ input", input);
      if (!ctx.user) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "User is not logged in",
        });
      }

      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });

      return post;
    },
  })
  .query("posts", {
    async resolve({ ctx }) {
      return ctx.prisma.post.findMany();
    },
  })
  .query("single-post", {
    input: getSinglePostSchmea,
    async resolve({ ctx, input }) {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });
    },
  });
