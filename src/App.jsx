import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2">
        <h1>Home page</h1>
        <Link className="border-solid hover:border-b-1" to={"/sign-in"}>Login</Link>
      </div>
    </>
  );
}
