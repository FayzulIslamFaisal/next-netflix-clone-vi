"use client";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";
import { useContext } from "react";
import { GlobalContext } from "../context";
import ManageAccount from "@/components/manage-account";
const SearchPpage = () => {
  const { loggedInAccount } = useContext(GlobalContext);
  if (loggedInAccount === null) {
    return <ManageAccount />;
  }
  return (
    <ClientAuthGuard>
      <div>Search Page</div>
    </ClientAuthGuard>
  )
}

export default SearchPpage