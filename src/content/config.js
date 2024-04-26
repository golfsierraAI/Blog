import { defineCollection } from "astro:content";
import { blogSchema } from "./schema/blogSchema";

const blogCollection = defineCollection({
  type: "content",
  schema: blogSchema,
});

export const collections = {
  blogs: blogCollection,
};
