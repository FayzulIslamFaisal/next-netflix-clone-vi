"use client";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";

import { useContext } from "react";
import { GlobalContext } from "../context";
import ManageAccount from "@/components/manage-account";
import CommonLayout from "@/components/common-layout";

const BrowsePage = () => {
  const { loggedInAccount } = useContext(GlobalContext);
  if (loggedInAccount === null) {
    return <ManageAccount />;
  }

  console.log("Home Page loggedInAccount", loggedInAccount);
  

  return (
    <ClientAuthGuard>
      <main>
        <CommonLayout/>
      </main>
    </ClientAuthGuard>
  );
};

export default BrowsePage;
