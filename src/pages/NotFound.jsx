import { Link } from "react-router-dom"

export default function NotFound(){
  return(
    <div className="flex flex-col justify-center items-center gap-4">
        <h1 className=" bg-[#1a1a1a] p-1 rounded-2xl font-bold text-lg">Page not found</h1>
        <Link className="border-solid hover:border-b-1  text-blue-500" to={"/"}>Home Page</Link>
    </div>
  )
}
