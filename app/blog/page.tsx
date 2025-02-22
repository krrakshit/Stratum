import { BlogCard } from "../components/BlogCard";
import { getAllPosts } from "@/lib/notion";
import Footer from "../components/Footer"

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Blog Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
    <Footer/>
        </>
  );
}