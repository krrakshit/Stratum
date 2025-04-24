import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import BlogModel from "@/models/Blog";

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Parse the JSON body
    const body = await request.json();
    
    // Validate required fields
    const { title, description, content, coverImage } = body;
    
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
    const blog = await BlogModel.create({
      title,
      description,
      content,
      coverImage,
    });
    
    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    // More robust error handling
    const errorMessage = err instanceof Error ? err.message : "Failed to create blog post";
    console.error("Error creating blog:", errorMessage);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const blogs = await BlogModel.find().sort({ createdAt: -1 });
    
    return NextResponse.json(blogs);
  } catch (err) {
    // More robust error handling
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch blog posts";
    console.error("Error fetching blogs:", errorMessage);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}