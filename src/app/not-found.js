import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/" className='bg-red-600 text-white px-4 py-2 border rounded'>Return Home</Link>
        </div>
    </div>
  )
}