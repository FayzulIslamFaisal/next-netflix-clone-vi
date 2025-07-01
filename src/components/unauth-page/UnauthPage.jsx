"use client"

import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa6"

const UnauthPage = () => {
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-zinc-900 px-8 py-18 rounded-lg shadow-md text-white max-w-sm w-full text-center border">
        <h1 className="text-3xl font-bold mb-6">Sign In to Netflix</h1>
        <button
          onClick={() => signIn("github")}
          className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 w-full rounded hover:bg-gray-300 transition"
        >
          <FaGithub size={20} />
          Sign in with GitHub
        </button>
      </div>
    </div>
  )
}

export default UnauthPage