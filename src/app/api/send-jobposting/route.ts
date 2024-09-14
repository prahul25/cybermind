import JobModel from "@/model/Job.model";
import dbConnect from "@/lib/dbConnect";
import { uploadImage } from "@/lib/uploadFileOnCloudinary";
import { NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
  const formData = await request.formData();
  
  const logo = formData.get("logo") as File | null;
    const jobRole = formData.get("jobRole") as string | null;
    const experience = formData.get("experience") as string | null;
    const location = formData.get("location") as string | null;
    const salary = formData.get("salary") as string | null;
    const description = formData.get("description") as string | null;

    if (!logo || !jobRole || !experience || !location || !salary || !description) {
      throw new Error("All fields are required");
    }
  const uploadedFile = await uploadImage(logo, "nextjs-imagegallary")
  const uploadedFileUrl = uploadedFile.url
console.log(uploadedFileUrl)
  if(!uploadedFileUrl){
    throw new Error("Failed to upload logo file on cloudinary")
  }

    const jobPosting = await JobModel.create({
      logo:uploadedFileUrl,
      jobRole,
      experience,
      location,
      salary,
      description,
    });
    if (!jobPosting) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to post job",
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      {
        success: true,
        message: "Successfully Job posted",
        data:jobPosting
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Successfully message sent", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
