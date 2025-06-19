import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard"
const MyListPpage = () => {
  return (
    <ClientAuthGuard>
      <div>MyList Page</div>
    </ClientAuthGuard>
  )
}

export default MyListPpage