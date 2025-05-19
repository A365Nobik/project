import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import SmallPass from "../components/SmalPass";

export default function SignUp() {
  const [dataForm, setDataForm] = useState({
    name: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const [SmallPass, setSmallPass] = useState(false);

  console.log(dataForm);
  function handleChange(event) {
    setDataForm((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
    if (dataForm.password.length < 5) {
      setSmallPass(true);
    }else {
      setSmallPass(false);
      
    }
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
      if (dataForm.name === "") alert("Please enter name");
      if (dataForm.password === "") alert("Please enter password");
      if (dataForm.password.length < 6)
        alert("Please enter password incudes 6 or more symbol");
      if (dataForm.email === "") alert("Please enter email");
      if (
        dataForm.name !== "" &&
        dataForm.password !== "" &&
        dataForm.password.length >= 6 &&
        dataForm.email !== ""
      )
        alert("Check your Email");
      if (error) throw error;
      console.log(data);
      navigate("/");
    } catch (error) {
      alert(error.massage);
    }
  }

  return (
    <>
      <header className="flex justify-center items-center ">
        <h1 className="font-bold text-5xl bg-[#1a1a1a] p-3 rounded-2xl">
          Register
        </h1>
      </header>
      <main className="flex justify-center items-center h-screen text-4xl  m-auto ">
        <div className="flex justify-center items-center flex-col border-solid border-3 py-10 sm:text- rounded-2xl border-[#1a1a1a] signup ">
          <form
            className="flex justify-center items-center flex-col gap-2 "
            onSubmit={handleSubmitEmail}
          >
              {SmallPass ? <h1>Min password length is  6 symbols</h1> : null}
            
            <div
              className="flex flex-col justify-center items-center
            gap-2 ml-5 pr-3 "
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
