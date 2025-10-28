// src/app/api/upload/route.ts
export const runtime = "nodejs"; // ⬅️ НЭМ

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const url = await new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: process.env.CLOUDINARY_FOLDER || "portfolio/certificates" },
      (err, res) => {
        if (err || !res?.secure_url)
          return reject(err || new Error("Upload failed"));
        resolve(res.secure_url);
      }
    );
    stream.end(buffer);
  });

  return NextResponse.json({ secure_url: url });
}
