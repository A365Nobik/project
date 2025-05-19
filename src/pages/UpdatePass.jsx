import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
export default function UpdatePass() {
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  function handleChange(event) {
    setPassword(event.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) throw error;
      console.log(data);
      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <header className="flex justify-center items-center text-center">
        <h1 className=" bg-[#1a1a1a] p-3 rounded-2xl text-5xl font-bold ">
          Update password
        </h1>
      </header>

      <main className="flex mt-10  justify-center m-auto mb-0 items-center">
        <form>
          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-2xl">
              Please enter your new password
            </p>
            <div className="gap-1 flex justify-center items-center text-2xl mt-4">
              <input
                autoComplete="password"
                className="border-[#1a1a1a] border-2 outline-0"
                type="password"
                name="password"
                placeholder="New Password"
                onChange={handleChange}
              />
              <FaLock />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-[#1a1a1a] p-1 rounded-md mt-2"
              type="submit"
            >
              Update password
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
