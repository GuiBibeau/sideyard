import { NextResponse } from "next/server";
import { getXataClient } from "@/lib/xata";
import { currentUser } from "@clerk/nextjs";

const xata = getXataClient();

type FormData = {
  name: string;
  email: string;
  description: string;
  type: string;
  file: Blob;
  price: string;
};

const parseFormData = async (request: Request): Promise<FormData> => {
  const formData = await request.formData();
  return {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as string,
    file: formData.get("file") as File,
    price: formData.get("price") as string,
  };
};

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    const formData = await parseFormData(request);
    const file = formData.file;

    const fileName: string = file.name;
    const fileData = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type;

    let userId: string | null = null;

    if (user) {
      userId = user?.id || null;
    }

    const newListingXata = await xata.db.listings.create({
      name: formData.name,
      email: formData.email,
      description: formData.description,
      thumbnail: {
        name: fileName,
        mediaType: mimeType,
        // Xata expects a base64 encoded string for the file content
        base64Content: fileData.toString("base64"),
        enablePublicUrl: true,
      },
      price: formData.price ? parseInt(formData.price, 10) : null,
      userId,
    });

    return NextResponse.json({ ...newListingXata, ok: true });
  } catch (error) {
    console.error("An error occurred while creating the listing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
