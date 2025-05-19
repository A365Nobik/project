import { Link } from "react-router-dom";

export default function Home({ token }) {
  console.log(token);
  return (
    <>
      <header className="flex justify-center items-center text-center">
        <h1 className=" bg-[#1a1a1a] p-3 rounded-2xl text-5xl font-bold ">
          Home page
        </h1>
      </header>

      <main className="flex  justify-center m-auto mb-0 items-center">
        <div className="flex flex-col  h-screen m-0 justify-center items-center gap-2 text-center text-3xl">
          <div className="flex justify-center items-center gap-2">
            <Link
              className=" hover:border-b-1    text-blue-500"
              to={"/sign-in"}
            >
              Login
            </Link>
            <Link className="hover:border-b-1  text-blue-500 " to={"/sign-up"}>
              Register
            </Link>
          </div>
          {token ? (
            <Link className="hover:border-b-1  text-blue-500" to={"/acc"}>
              My account Page
            </Link>
          ) : (
            ""
          )}
        </div>
      </main>
      <footer className=" flex  gap-3 justify-center items-center">
        Created by A365Nobik with
        <a
          target="_blank"
          className="hover:border-b-1  text-blue-500"
          href="https://supabase.com/"
        >
          SupaBase
        </a>
      </footer>
    </>
  );
}
