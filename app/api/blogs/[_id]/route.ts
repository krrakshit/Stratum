import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import mongoose from "mongoose";

interface RouteParams {
  params: {
    _id: string;
  };
}

// Correct way to type params in Next.js app router API route
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Get the ID from the params object
    const { _id } = params;
    
    // Validate ID
    if (!_id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Check if ID is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json(
        { error: "Invalid blog ID format" },
        { status: 400 }
      );
    }
    
    // Fetch blog post
    const blog = await BlogModel.findById(_id);
    
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}