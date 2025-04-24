import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, description, content, coverImage } = await request.json();
    
    // Validate required fields
    if (!title || !description || !content || !coverImage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check description length
    if (description.split(" ").length > 30) {
      return NextResponse.json(
        { error: "Description must be 30 words or less" },
        { status: 400 }
      );
    }
    
    // Create blog post
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        content,
        coverImage,
      },
    });
    
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
} 