import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../client";

export default function SignIn() {
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
        navigate("/home");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center text-#ffffffde">
        <form
          onSubmit={handleSubmit}
          //   onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-2"
        >
          <h1 className=" bg-[#1a1a1a] p-1 rounded-2xl font-bold text-lg">
            Login
          </h1>
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
            className="border-solid hover:border-b-1 w-max text-center"
            to={"/sign-up"}
          >
            Register
          </Link>
        </div>
      </div>
      <hr className="w-50 mt-2" />
      <Link
        className="flex justify-self-center border-solid hover:border-b-1 w-max text-center"
        to={"/"}
      >
        Home
      </Link>
    </>
  );
}
