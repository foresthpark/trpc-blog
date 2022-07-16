import { createRouter } from "./context";

export const postRouter = createRouter()
  .mutation("create-post", {})
  .query("posts", {})
  .query("single-post", {});
