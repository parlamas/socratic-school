// src/app/multilingual/ex-002/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.server";
import Exercise002 from '../components/ex-002';

const EXERCISE_ID = "cmo6yrq130001u4v8wv7kr7yi";

export default async function Page() {
  const session = await getServerSession(authOptions);

  let accessStatus: 'guest' | 'signed-in' | 'purchased' = 'guest';

  if (session?.user?.id) {
    if ((session.user as any).role === 'admin' || (session.user as any).role === 'instructor') {
      accessStatus = 'purchased';
    } else {
      const access = await prisma.userExercise.findUnique({
        where: {
          userId_exerciseId: {
            userId: session.user.id,
            exerciseId: "cmo6yrq130001u4v8wv7kr7yi",
          },
        },
      });
      accessStatus = access ? 'purchased' : 'signed-in';
    }
  }

  return <Exercise002 accessStatus={accessStatus} />;
}
