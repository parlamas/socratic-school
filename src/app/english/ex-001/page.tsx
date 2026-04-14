// src/app/english/ex-001/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.server";
import Exercise001 from '../components/ex-001';

const EXERCISE_ID = "cmnyn65sk0001ky049bomjzqw";

export default async function Page() {
  const session = await getServerSession(authOptions);

  let accessStatus: 'guest' | 'signed-in' | 'purchased' = 'guest';

  if (session?.user?.id) {
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

  return <Exercise001 accessStatus={accessStatus} />;
}