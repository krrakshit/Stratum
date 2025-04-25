import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import mongoose from "mongoose";

// Use the correct parameter name to match the file name
type Params = { params: { _id: string } };

export async function GET(
  request: NextRequest,
  context: Params
) {
  try {
    // Get the ID from the correct parameter name
    const { _id } = context.params;
    
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