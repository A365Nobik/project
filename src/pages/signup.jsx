import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default function SignUp() {
  const [dataForm, setDataForm] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  console.log(dataForm);
  function handleChange(event) {
    setDataForm((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmitEmail(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: dataForm.email,
        password: dataForm.password,
        options: {
          data: {
            name: dataForm.name,
          },
        },
      });
      if (error) throw error;
      console.log(data);
      navigate("/");
      if (dataForm.email === "") alert("Please enter email");
      else alert("Check your Email");
      if (dataForm.name === "") alert("Please enter name");
      if (dataForm.password === "") alert("Please enter password");
    } catch (error) {
      alert(error.massage);
    }
  }

  return (
    <>
      <footer className="flex justify-center items-center ">
        <h1 className="font-bold text-5xl bg-[#1a1a1a] p-3 rounded-2xl">
          Register
        </h1>
      </footer>
      <main className="flex justify-center items-center h-screen text-4xl  w-screen ">
        <div className="flex justify-center items-center flex-col border-solid border-3 py-10 sm:text-red rounded-2xl border-[#1a1a1a] w-screen ">
          <form
            className="flex justify-center items-center flex-col gap-2 "
            onSubmit={handleSubmitEmail}
          >
            <div
              className="flex flex-col justify-center items-center
            gap-2 ml-5 pr-3"
            >
              <div className="gap-1 flex justify-center items-center">
                <input
                  className="border-[#1a1a1a] border-2 outline-0"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
                <FaUser />
              </div>

              <div className="gap-1 flex justify-center items-center">
                <input
                  className="border-[#1a1a1a] border-2 outline-0"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <FaLock />
              </div>
              <div className="gap-1 flex justify-center items-center">
                <input
                  className="border-[#1a1a1a] border-2 outline-0"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <MdEmail />
              </div>
            </div>
            <button className="bg-[#1a1a1a] p-1 m-2 rounded-md" type="submit">
              Register
            </button>
          </form>
          <div className="flex  gap-2">
            <p>Have an Account?</p>
            <Link
              className="border-solid hover:border-b-1 w-max text-center  text-blue-500"
              to={"/sign-in"}
            >
              Login
            </Link>
          </div>
          <hr className="w-50 mt-2 " />
          <Link
            className="flex justify-self-center border-solid hover:border-b-1 w-max text-center text-blue-500"
            to={"/"}
          >
            Home
          </Link>
        </div>
      </main>
    </>
  );
}
