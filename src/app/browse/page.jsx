"use client";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";

import { useContext } from "react";
import { GlobalContext } from "../context";
import ManageAccount from "@/components/manage-account";

const BrowsePage = () => {
  const { loggedInAccount } = useContext(GlobalContext);
  if (loggedInAccount === null) {
    return <ManageAccount />;
  }

  console.log("Home Page loggedInAccount", loggedInAccount);
  

  return (
    <ClientAuthGuard>
      <div className=" flex gap-2 items-center">Browse Page </div>
    </ClientAuthGuard>
  );
};

export default BrowsePage;
