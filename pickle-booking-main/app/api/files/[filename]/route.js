import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const filename = params.filename;
  const dataDir = process.env.DATA_DIR || process.cwd();
  const filePath = path.join(dataDir, "uploads", filename);
  try {
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    let type = "application/octet-stream";
    if (ext === ".png") type = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") type = "image/jpeg";
    return new NextResponse(buffer, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=3600" } });
  } catch (e) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}