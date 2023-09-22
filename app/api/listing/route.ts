import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { put } from "@vercel/blob";
import { generateNanoId } from "@/lib/nanoid";
import { Session } from "next-auth"; // Make sure to import the correct type
import { getExtensionFromBlob } from "@/lib/file-extension";

type FormData = {
  name: string;
  email: string;
  description: string;
  type: string;
  file: Blob;
  price: string;
};

const isAuthenticated = (session: Session | null): string | null => {
  return session?.user?.email || null;
};

const getUserById = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

const parseFormData = async (request: Request): Promise<FormData> => {
  const formData = await request.formData();
  return {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as string,
    file: formData.get("file") as Blob,
    price: formData.get("price") as string,
  };
};

const uploadFile = async (file: Blob) => {
  const fileId = generateNanoId(21);
  const fileExtension = getExtensionFromBlob(file);
  const fileName = `${fileId}${fileExtension}`;
  return await put(fileName, file, { access: "public" });
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = isAuthenticated(session);
    const formData = await parseFormData(request);
    const blob = await uploadFile(formData.file);

    let userId: string | null = null;

    if (userEmail) {
      const user = await getUserById(userEmail);
      userId = user?.id || null;
    }

    const newListing = await prisma.listing.create({
      data: {
        name: formData.name,
        email: formData.email,
        description: formData.description,
        type: formData.type,
        fileUrl: blob.url,
        price: formData.price ? parseInt(formData.price, 10) : null,
        userId,
      },
    });

    return NextResponse.json({ ...newListing, ok: true });
  } catch (error) {
    console.error("An error occurred while creating the listing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
