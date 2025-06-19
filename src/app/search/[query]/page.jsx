import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard"
const SearchPpage = () => {
  return (
    <ClientAuthGuard>
      <div>Search Page</div>
    </ClientAuthGuard>
  )
}

export default SearchPpage