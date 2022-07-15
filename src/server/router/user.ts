import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import {
  createUserOutputSchema,
  createUserSchema,
} from "./../../schema/user.schema";
import { createRouter } from "./context";

export const userRouter = createRouter().mutation("register-user", {
  input: createUserSchema,
  //   output: createUserOutputSchema,
  resolve: async ({ ctx, input }) => {
    const { email, name } = input;

    try {
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }
  },
});
