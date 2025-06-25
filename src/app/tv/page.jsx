"use client";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";
import { useContext } from "react";
import { GlobalContext } from "../context";
import ManageAccount from "@/components/manage-account";
const TvPage = () => {
  const { loggedInAccount } = useContext(GlobalContext);
  if (loggedInAccount === null) {
    return <ManageAccount />;
  }
  
  return (
    <ClientAuthGuard>
      <main className="bg-black text-white min-h-screen">
        <CommonLayout mediaData={mediaData} />
      </main>
    </ClientAuthGuard>
  )
}

export default TvPage