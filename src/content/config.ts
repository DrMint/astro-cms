import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      // author: reference("authors"),
    })
    .describe("Articles displayed on the website"),
});

const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    portfolio: z.string().url().describe("A link to the author's portfolio"),
  }),
});

const articles = defineCollection({
  type: "content",
  schema: z.object({
    draft: z
      .boolean()
      .default(true)
      .describe("If true, do not display the article on the website"),
    tags: z.array(z.string()).optional(),
    rating: z.number().default(5).describe("A number between 0 and 5"),
    publishingDate: z
      .date()
      .default(new Date())
      .describe("The listed date of the article"),
    status: z
      .enum(["Draft", "Review", "Completed"])
      .optional()
      .describe("Status of the article")
      .default("Completed"),
  }),
});

export const collections = {
  blog,
  authors,
  articles,
};
