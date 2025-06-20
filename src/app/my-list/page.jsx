"use client";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";
import { useContext } from "react";
import { GlobalContext } from "../context";
import ManageAccount from "@/components/manage-account";
const MyListPpage = () => {

  const { loggedInAccount } = useContext(GlobalContext);
  if (loggedInAccount === null) {
    return <ManageAccount />;
  }
  return (
    <ClientAuthGuard>
      <div>MyList Page</div>
    </ClientAuthGuard>
  )
}

export default MyListPpage