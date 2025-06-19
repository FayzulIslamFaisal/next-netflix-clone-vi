import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";

const BrowsePage =async () => {
  const session = await getServerSession(authOptions);
  console.log("session for home page", session);
  
  return (
    <ClientAuthGuard>
      <div className=" flex gap-2 items-center">Browse Page {session?.user?.name} || <Image src={session?.user?.image} alt="image" width={50} height={50}/> </div>
    </ClientAuthGuard>
  )
}

export default BrowsePage