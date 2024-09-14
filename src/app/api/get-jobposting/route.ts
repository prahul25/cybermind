import dbConnect from "@/lib/dbConnect";
import JobModel from "@/model/Job.model";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const jobPostings = await JobModel.find();
    if (!jobPostings || jobPostings.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No job postings found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
        success:true,
        message:"All posted job found",
        data:jobPostings
    },{ status: 200 })
  } catch (error) {
    console.log("Error whilw fetching job postings" , error)

    return NextResponse.json({
        success:false,
        message:"Internal server error"
    },{ status: 500 })
  }
}
