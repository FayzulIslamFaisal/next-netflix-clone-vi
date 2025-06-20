
import BrowsePage from "./browse/page";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";

export default function Home() {
  return (
    <ClientAuthGuard>
      <BrowsePage/>
    </ClientAuthGuard>
    
  );
}
