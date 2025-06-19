"use client"
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UnauthPage from "../unauth-page/UnauthPage";

const ClientAuthGuard = ({ children }) => {
    const { data: session, status } = useSession();
    // const router = useRouter();
    // useEffect(() => {
        if (status === "unauthenticated") {
        // router.push("/login"); 
            return <UnauthPage/>
        }
    // }, [status]);

    if (status === "loading") {
        return (
        <div className="flex justify-center items-center h-screen">
            <h3 className="text-4x font-bold">Loading...</h3>
        </div>
        ); 
    }
    // console.log("Auth Groud session===>",session);
    // console.log("Auth Groud status===>",status);
    

    if (!session) return null; 

  return <>{children}</>; 
}

export default ClientAuthGuard