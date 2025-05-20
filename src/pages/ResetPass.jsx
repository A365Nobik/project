import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  function handleChange(event) {
    setEmail(event.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        email,
        {}
      );
      if (error) throw error;
      alert("Check your email");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(email);
  return (
    <>
      <header className="flex justify-center items-center text-center">
        <h1 className=" bg-[#1a1a1a] p-3 rounded-2xl text-5xl font-bold ">
          Reset password
        </h1>
      </header>
      <main className="flex mt-10  justify-center m-auto mb-0 items-center">
        <div className="flex flex-col justify-center items-center">
          <p className="text-center text-2xl">
            You'll be receive an email to reset your password
          </p>
          <div className="gap-1 flex justify-center items-center text-2xl mt-4">
            <input
              className="border-[#1a1a1a] border-2 outline-0"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <MdEmail />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#1a1a1a] p-1 rounded-md mt-2"
            type="submit"
          >
            Send an email
          </button>
        </div>
      </main>
    </>
  );
}
