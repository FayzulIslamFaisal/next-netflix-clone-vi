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
      <div>Tv Page</div>
    </ClientAuthGuard>
  )
}

export default TvPage