"use client"

const UnauthPage = () => {
   
  return (
    <div className="text-center p-10">
      <h2 className="text-xl font-bold mb-4">Please Sign In</h2>
      <button
        onClick={() => signIn("github")}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
      >
        Sign in with GitHub
      </button>
    </div>
  )
}

export default UnauthPage