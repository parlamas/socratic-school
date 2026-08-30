// src/app/english/ex-005/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.server";
import Exercise005 from '../components/ex-005';

const EXERCISE_ID = "cmtfqfi7k0001ih04pgvgrd1f";

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
            exerciseId: EXERCISE_ID,
          },
        },
      });
      accessStatus = access ? 'purchased' : 'signed-in';
    }
  }

  return <Exercise005 accessStatus={accessStatus} />;
}