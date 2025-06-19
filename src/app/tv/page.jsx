import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard"
const TvPage = () => {
  return (
    <ClientAuthGuard>
      <div>Tv Page</div>
    </ClientAuthGuard>
  )
}

export default TvPage