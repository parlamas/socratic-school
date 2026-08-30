// src/app/english/ex-003/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.server";
import Exercise003 from '../components/ex-003';

const EXERCISE_ID = "cmtfphhtw0001ky049peccx1j";

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

  return <Exercise003 accessStatus={accessStatus} />;
}


