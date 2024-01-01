import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";

async function page() {
  const session = await getServerSession(authOptions);

  return <div className="flex w-full h-screen items-center justify-center">Welcome to admin {session?.user.name}</div>;
}

export default page;
