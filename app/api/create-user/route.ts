import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";


export async function POST() {
  const user = await currentUser();

  if (!user) return new Response("Not authenticated", { status: 401 });

  await prisma.user.upsert({
    where: { id: user.id },
    update: {
      email: user.emailAddresses[0].emailAddress,
      fullName: user.firstName + " " + user.lastName,
      imageUrl: user.imageUrl
    },
    create: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      fullName: user.firstName + " " + user.lastName,
      imageUrl: user.imageUrl
    }
  });

  return new Response("User synced", { status: 200 });
}
