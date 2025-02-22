"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BlogPost } from "@/lib/notion";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-all group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold tracking-tight">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {post.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4">
          <p className="text-sm text-muted-foreground">
            {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
          </p>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </CardFooter>
      </Card>
    </Link>
  );
}