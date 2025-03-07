import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  draft: z.boolean(),
  lang: z.enum(["en", "es"]),
});

const postCollection = defineCollection({
  loader: glob({ pattern: "{en,es}/posts/*.md", base: "./src/content" }),
  schema: postSchema,
});

export const collections = {
  posts: postCollection,
};

export type Post = z.infer<typeof postSchema>;
