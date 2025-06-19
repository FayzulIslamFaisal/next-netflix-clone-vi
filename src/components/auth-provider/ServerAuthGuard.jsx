// components/auth/ServerAuthGuard.jsx
import { getServerSession } from "next-auth";

import UnauthPage from "../unauth-page/UnauthPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ServerAuthGuard({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <UnauthPage />;
  }

  return <>{children}</>;
}
