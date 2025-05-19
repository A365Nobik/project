import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../client";

export default function SignIn({ setDataToken }) {
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  function handleChange(event) {
    setDataForm((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  console.log(dataForm);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: dataForm.email,
        password: dataForm.password,
      });
      console.log(data);
      if (error) alert(error);
      if (data.user === null && data.session === null) {
        alert("User is not defined!");
      } else {
        setDataToken(data);
        navigate("/acc");
      }
    } catch (error) {
      alert(error.message);
    }
  }

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: dataForm.email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      emailRedirectTo: 'https://nobik-auth.netlify.app/acc',
    },
  })
}


  return (
    <>
      <header className="flex justify-center items-center ">
        <h1 className="font-bold text-5xl bg-[#1a1a1a] p-3 rounded-2xl">
          Login
        </h1>
      </header>
      <main className="flex justify-center items-center h-screen text-4xl">
        <div className="flex flex-col justify-center items-center text-#ffffffde border-solid border-3 px-2 py-6 rounded-2xl border-[#1a1a1a] signin  ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-2"
          >
            <input
              className="border-[#1a1a1a] border-2 outline-0"
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="border-[#1a1a1a] border-2 outline-0"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            <button className="bg-[#1a1a1a] p-1 rounded-md" type="submit">
              Login
            </button>
          </form>
          <div className="flex flex-col justify-center items-center">
            <p>Don't have an account?</p>
            <Link
              className="border-solid hover:border-b-1 w-max text-center  text-blue-500"
              to={"/sign-up"}
            >
              Register
            </Link>
          </div>
          <hr className="w-50 mt-2" />
          <Link
            className="flex justify-self-center border-solid hover:border-b-1 w-max text-center  text-blue-500"
            to={"/"}
          >
            Home
          </Link>
        </div>
      </main>
    </>
  );
}
