"use client";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";
import { useContext } from "react";
import { GlobalContext } from "../context";
import ManageAccount from "@/components/manage-account";

const MoviesPpage = () => {
  const { loggedInAccount } = useContext(GlobalContext);
  if (loggedInAccount === null) {
    return <ManageAccount />;
  }
  return (
    <ClientAuthGuard>
      <div>Movies Page</div>
    </ClientAuthGuard>
  );
};

export default MoviesPpage;
