import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

if (!process.env.NOTION_TOKEN) {
  throw new Error("Missing NOTION_TOKEN environment variable");
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error("Missing NOTION_DATABASE_ID environment variable");
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  publishedAt: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const database = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Published Date",
      date: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: "Published Date",
        direction: "descending",
      },
    ],
  });

  return database.results.map((page) => {
    //@ts-expect-error error hai 
    const properties = page.properties as any;
    
    // Add null checks and default values
    const title = properties.Title?.title?.[0]?.plain_text || "Untitled";
    const slug = properties.Slug?.rich_text?.[0]?.plain_text || "";
    const coverImage = properties.Cover?.files?.[0]?.file?.url || "";
    const description = properties.Description?.rich_text?.[0]?.plain_text || "";
    const publishedAt = properties["Published Date"]?.date?.start || new Date().toISOString();

    return {
      id: page.id,
      title,
      slug,
      coverImage,
      description,
      publishedAt,
    };
  }).filter(post => post.slug !== ""); // Only return posts with valid slugs
}

export async function getPostBySlug(slug: string): Promise<{ post: BlogPost; markdown: string } | null> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  const page = response.results[0];
  if (!page) {
    return null;
  }
 //@ts-expect-error error hai 
  const properties = page.properties as any;
  
  // Add null checks and default values
  const title = properties.Title?.title?.[0]?.plain_text || "Untitled";
  const pageSlug = properties.Slug?.rich_text?.[0]?.plain_text || "";
  const coverImage = properties.Cover?.files?.[0]?.file?.url || "";
  const description = properties.Description?.rich_text?.[0]?.plain_text || "";
  const publishedAt = properties["Published Date"]?.date?.start || new Date().toISOString();

  const post: BlogPost = {
    id: page.id,
    title,
    slug: pageSlug,
    coverImage,
    description,
    publishedAt,
  };

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const markdown = n2m.toMarkdownString(mdBlocks);
 //@ts-expect-error error hai 
  return { post, markdown };
}