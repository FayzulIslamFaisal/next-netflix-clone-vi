import ServerAuthGuard from "@/components/auth-provider/ServerAuthGuard"
const MoviesPpage = () => {
  return (
   <ServerAuthGuard>
      <div>Movies Page</div>
    </ServerAuthGuard>
    
  )
}

export default MoviesPpage