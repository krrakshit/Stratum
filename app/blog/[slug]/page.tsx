import { getPostBySlug } from "@/lib/notion";
import { format } from "date-fns";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export const revalidate = 3600; // Revalidate every hour

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { post, markdown } = await getPostBySlug(params.slug);

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src={post.coverImage || "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
      <p className="mb-8 text-muted-foreground">
        {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
      </p>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </article>
  );
}