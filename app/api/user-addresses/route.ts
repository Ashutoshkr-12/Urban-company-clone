import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { phoneNumber, pincode, area, city, state } = body;

  if (!pincode || !area || !city || !state) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const address = await prisma.address.create({
    data: {
      userId: user.id,
      phoneNumber,
      pincode,
      area,
      city,
      state,
    },
  });

  return NextResponse.json({ success: true, data: address });
}

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
  });

  return NextResponse.json({ success: true, data: addresses });
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const address = await prisma.address.findUnique({
    where: { id: params.id },
  });

  if (!address || address.userId !== user.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  await prisma.address.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
