import { useState } from "react";
import { Link } from "react-router-dom";
import UserData from "../components/UserData";

export default function Home({ token }) {
  const [showData, setShowData] = useState(false);

  function handleClick() {
    setShowData(!showData);
  }
  return (
    <>
      <footer className="flex justify-center items-center ">
        <h1 className="font-bold text-5xl bg-[#1a1a1a] p-3 rounded-2xl">
          Account Page
        </h1>
      </footer>
      <main className="flex flex-col justify-center items-center h-screen text-3xl">
        <div className="flex flex-col justify-center items-center">
          <h1>Welcome, {token.user.user_metadata.name}</h1>
          {showData?<UserData token={token} />:""}
          <button onClick={handleClick} className="bg-[#1a1a1a] p-1 rounded-md">
            Show my data
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Link
            className="flex justify-self-center border-solid hover:border-b-1 w-max text-center  text-blue-500"
            to={"/"}
          >
            Home
          </Link>
          <a
            href="/"
            className="bg-[#1a1a1a] p-1 rounded-md"
            onClick={() => {
              sessionStorage.removeItem("token");
            }}
          >
            Logout
          </a>
        </div>
      </main>
    </>
  );
}
