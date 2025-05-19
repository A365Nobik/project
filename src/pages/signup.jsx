import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneFlip } from "react-icons/fa6";
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
  const [phone, setPhone] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    setPhone(!phone);
  }
  console.log(dataForm);
  function handleChange(event) {
    setDataForm((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  async function handleSubmitPhone(a) {
    a.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        phone: dataForm.phone,
        password: dataForm.password,
        options: {
          channel: "whatsapp",
          name: dataForm.name,
        },
      });
      console.log("Navigate");
      await navigate("/home");
      if (error) throw error;
    } catch (error) {
      alert(error.message);
      console.log(data);
      if (dataForm.email === "") alert("Please enter Phone");
      else alert("Check your Phone");
      if (dataForm.name === "") alert("Please enter name");
      if (dataForm.password === "") alert("Please enter password");
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
    <div className="flex justify-center items-center flex-col">
      <form
        className="flex justify-center items-center flex-col gap-2"
        onSubmit={!phone ? handleSubmitEmail : handleSubmitPhone}
      >
        <h1 className=" bg-[#1a1a1a] p-1 rounded-2xl font-bold text-lg">
          Register
        </h1>
        <div
          className="flex flex-col justify-center items-center
        gap-1 ml-5"
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
              type={!phone ? "text" : "number"}
              name={!phone ? "email" : "phone"}
              placeholder={!phone ? "Email" : "Phone"}
              onChange={handleChange}
            />
            {!phone ? (
              <MdEmail onClick={handleClick} />
            ) : (
              <FaPhoneFlip onClick={handleClick} />
            )}
          </div>
        </div>
        <button className="bg-[#1a1a1a] p-1 rounded-md" type="submit">
          Register
        </button>
      </form>
      <div className="flex  gap-2">
        <p>Have an Account?</p>
        <Link
          className="border-solid hover:border-b-1 w-max text-center"
          to={"/sign-in"}
        >
          Login
        </Link>
      </div>
      <hr className="w-50 mt-2" />
      <Link
        className="flex justify-self-center border-solid hover:border-b-1 w-max text-center"
        to={"/"}
      >
        Home
      </Link>
    </div>
  );
}
