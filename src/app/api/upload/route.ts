import { v2 as cloudinary } from "cloudinary";

// IMPORTANT: ensure Node runtime (not edge)
export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "Invalid file upload" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "agri-exchange",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(buffer);
    });

    if (!uploadResult?.secure_url) {
      return Response.json(
        { error: "No secure_url returned from Cloudinary" },
        { status: 500 }
      );
    }

    return Response.json({
      secure_url: uploadResult.secure_url,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    return Response.json(
      {
        error: "Upload failed",
        details: String(err),
      },
      { status: 500 }
    );
  }
}