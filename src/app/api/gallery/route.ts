import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// GET /api/gallery — fetch all images from the fabilicious-gallery folder
export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:fabilicious-gallery")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const images = result.resources.map((img: {
      public_id: string;
      secure_url: string;
      width: number;
      height: number;
      created_at: string;
    }) => ({
      public_id: img.public_id,
      url: img.secure_url,
      width: img.width,
      height: img.height,
      created_at: img.created_at,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

// DELETE /api/gallery — delete an image by public_id
export async function DELETE(req: NextRequest) {
  try {
    const { password, public_id } = await req.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
