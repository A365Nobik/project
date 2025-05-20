import { createClient } from "@supabase/supabase-js";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  const [usId, setUsId] = useState("");
  const [pass, setPass] = useState("");
  const [usData, setUsData] = useState("");
  const [ussData, setUssData] = useState(null);
  const [signDate, setSignDate] = useState(null);
  const [createDate, setCreateDate] = useState(null);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  const [allUssShow, setAllUssShow] = useState(false);
  const [usDataShow, setUsDataShow] = useState(false);
  const [passChangeShow, setPassChangeShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [email, setEmail] = useState(false);
  const [newUserShow, setNewUserShow] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [name, setName] = useState(false);
  const [newUsEmail, setNewUsEmail] = useState("");
  const [newUsName, setNewUsName] = useState("");
  const [newUsPass, setNewUsPass] = useState("");
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  const adminAuthClient = supabase.auth.admin;

  const inputRef = useRef(null);
  const nameTag = useRef(null);
  const emailTag = useRef(null);
  function handleChange(event) {
    setUsId(event.target.value);
  }
  function emailInputChange(event) {
    setEmailInput(event.target.value);
  }
  function nameInputChange(event) {
    setNameInput(event.target.value);
  }
  function passInput(event) {
    setPass(event.target.value);
  }
  async function getUsers() {
    setAllUssShow(!allUssShow);
    try {
      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      });
      if (error) throw error;
      setUssData(users);
      console.log(ussData);
    } catch (error) {
      alert(error);
    }
  }
  async function getUsById() {
    if (usId === "") alert("Enter User Id");
    else {
      setUsDataShow(!usDataShow);
      setEmail(false);
      setName(false);
      setPassChangeShow(false);
      setUpdate(false);
      setUssData(false);
      try {
        const { data, error } = await supabase.auth.admin.getUserById(usId);
        if (error) throw error;
        console.log(data);
        setUsData(data);
        console.log(usData);
        if (data?.user?.last_sign_in_at) {
          setSignDate(new Date(data.user.last_sign_in_at));
        } else {
          setSignDate(null);
        }
        if (data?.user?.confirmed_at) {
          setCreateDate(new Date(data.user.created_at));
        } else {
          setCreateDate(null);
        }
      } catch (error) {
        alert(error);
        setSignDate(null);
        setCreateDate(null);
      }
    }
  }
  async function deleteUser() {
    try {
      const { data, error } = await supabase.auth.admin.deleteUser(usId);
      if (error) throw error;
      console.log(data);
      alert("User deleted");
      setUsDataShow(false);
      setUsId("");
      inputRef.current.value = "";
    } catch (error) {
      alert(error);
    }
  }
  async function changePass() {
    try {
      const { data: user, error } = await supabase.auth.admin.updateUserById(
        usId,
        { password: pass }
      );
      if (error) throw error;
      console.log(user);
      alert("Password changed");
    } catch (error) {
      alert(error);
    }
  }
  function updateBtn() {
    setUpdate(!update);
    setEmail(false);
    setName(false);
  }
  function emailBtn() {
    setEmail(!email);
    setName(false);
  }
  function nameBtn() {
    setName(!name);
    setEmail(false);
  }
  async function changeEmail() {
    if (emailInput === "") alert("Enter Email");
    else {
      try {
        const { data: user, error } = await supabase.auth.admin.updateUserById(
          usId,
          { email: emailInput }
        );

        if (error) throw error;
        console.log(user);
        alert("Email changed");
        emailTag.current.textContent=`User Email: ${emailInput}`
      } catch (error) {
        alert(error);
      }
    }
  }
  async function nameChange() {
    if (nameInput === "") alert("Enter Name");
    else {
      try {
        const { data: user, error } = await supabase.auth.admin.updateUserById(
          usId,
          { user_metadata: { name: nameInput } }
        );
        if (error) throw error;
        console.log(user);
        alert("Name changed");
        nameTag.current.textContent = `User Name: ${nameInput}`;
      } catch (error) {
        alert(error);
      }
    }
  }
  function showCreatePanel() {
    setEmail(false);
    setName(false);
    setPassChangeShow(false);
    setUpdate(false);
    setUssData(false);
    setNewUserShow(!newUserShow);
  }
  async function createNewUser() {
    if (newUsEmail === "" || newUsName === "" || newUsPass === "")
      alert("Enter data");
    else {
      try {
        const { data, error } = await supabase.auth.admin.createUser({
          email: newUsEmail,
          password: newUsPass,
          user_metadata: { name: newUsName },
        });
        if (error) throw error;
        console.log(data);
        alert("New user created");
        setNewUserShow(false);
      } catch (error) {
        alert(error);
      }
    }
  }
  return (
    <>
      <header className="flex flex-col justify-center items-center text-center gap-1">
        <h1 className=" bg-[#1a1a1a] p-3 rounded-2xl text-5xl font-bold ">
          Admin Panel
        </h1>
        <hr className="w-50 m-0.5" />
        <a
          className="text-2xl text-cyan-600"
          href="https://supabase.com/dashboard/project/nzwavuvnzzbnmzvfdriq/auth/users?f={%22search_query%22:%2297b5f410-8eb1-4d8f-a49c-c99ddbf28793%22}"
          target="_blank"
        >
          SupaBase Dashboard
        </a>
        <Link
          className="flex justify-self-center border-solid hover:border-b-1 w-max text-center  text-blue-500"
          to={"/"}
        >
          Home
        </Link>
      </header>
      <main className="admin flex justify-center items-center mt-3 text-4xl w-auto">
        <div className="flex flex-col justify-center items-center w-auto">
          <div className="flex flex-col gap-1 justify-center items-center">
            <input
              ref={inputRef}
              onChange={handleChange}
              className="border-[#1a1a1a] border-2 outline-0"
              type="text"
              name="userid"
              placeholder="User ID"
            />
            <div
              className="flex
gap-1 justify-center items-center"
            >
              <button
                onClick={getUsById}
                className="bg-[#1a1a1a] p-1 m-2 rounded-md"
                type="submit"
              >
                Get User
              </button>
              <button
                onClick={getUsers}
                className="bg-[#1a1a1a] p-1 m-2 rounded-md"
                type="submit"
              >
                Get Users
              </button>{" "}
              <button
                onClick={showCreatePanel}
                className="bg-[#1a1a1a] p-1 m-2 rounded-md"
                type="submit"
              >
                Create New User
              </button>
            </div>
            {newUserShow && (
              <div className="flex flex-col justify-center items-center gap-1 mt-4 pt-0 p-4 bg-[#1a1a1a] rounded-lg text-white">
                <h1 className="bg-[#242424] rounded-2xl p-1 mt-1">New User</h1>
                <div className="flex flex-col justify-center items-center gap-2">
                  <input
                    onChange={(event) => setNewUsName(event.target.value)}
                    className="border-[#242424] border-2 outline-0"
                    type="text"
                    name="name"
                    placeholder="User Name"
                  />
                  <input
                    onChange={(event) => setNewUsEmail(event.target.value)}
                    className="border-[#242424] border-2 outline-0"
                    type="email"
                    name="email"
                    placeholder="User Email"
                  />
                  <input
                    onChange={(event) => setNewUsPass(event.target.value)}
                    className="border-[#242424] border-2 outline-0"
                    type="text"
                    name="pass"
                    placeholder="User Password"
                  />
                  <button
                    onClick={createNewUser}
                    className="bg-[#242424] p-1 m-2 rounded-md"
                  >
                    Create
                  </button>
                </div>
              </div>
            )}
            {usDataShow && (
              <div className=" admin flex flex-col   justify-center items-center mt-4 pt-0 p-4 bg-[#1a1a1a] rounded-lg text-white">
                <h1 className="bg-[#242424] rounded-2xl p-1">User data</h1>
                <h1>User Id: {usData?.user?.id}</h1>
                <h1 ref={emailTag}>User Email: {usData?.user?.email}</h1>
                <h1>User Phone: {usData?.user?.phone}</h1>
                <h1>User Role: {usData?.user?.role}</h1>
                <h1>
                  User Created:
                  {createDate ? createDate.toLocaleString() : "Never"}
                </h1>
                <h1 ref={nameTag}>
                  User Name: {usData?.user?.user_metadata?.name}
                </h1>
                <h1>
                  User Phone Verification:
                  {String(usData?.user?.user_metadata?.phone_verified)}
                </h1>
                <h1>
                  User Email Verification:
                  {String(usData?.user?.user_metadata?.email_verified)}
                </h1>
                <h1>
                  Last SignIn: {signDate ? signDate.toLocaleString() : "Never"}
                </h1>
                <hr className="w-full m-1" />
                <div className="flex justify-center items-center">
                  <button
                    className="bg-[#242424] p-1 m-2 rounded-md"
                    onClick={deleteUser}
                  >
                    Delete User
                  </button>
                  <button
                    className="bg-[#242424] p-1 m-2 rounded-md"
                    onClick={() => setPassChangeShow(!passChangeShow)}
                  >
                    Change Password
                  </button>
                  <button
                    className="update bg-[#242424] p-1 m-2 rounded-md"
                    onClick={updateBtn}
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
            {passChangeShow && (
              <div className="flex flex-col  justify-center items-center gap-1  p-5 bg-[#1a1a1a] rounded-lg text-white">
                <input
                  onChange={passInput}
                  className="border-[#242424] border-2 outline-0"
                  type="text"
                  name="pass"
                  placeholder="New Password"
                />
                <button
                  className="bg-[#242424] p-1 m-2 rounded-md"
                  onClick={changePass}
                >
                  Set New Password
                </button>
              </div>
            )}
            {update && (
              <div className="flex   justify-center items-center gap-1  p-5 bg-[#1a1a1a] rounded-lg text-white">
                <button
                  onClick={emailBtn}
                  className="bg-[#242424] p-1 m-2 rounded-md"
                >
                  Email
                </button>
                <button
                  onClick={nameBtn}
                  className="bg-[#242424] p-1 m-2 rounded-md"
                >
                  Name
                </button>
              </div>
            )}
            {email && (
              <div className="flex flex-col  justify-center items-center gap-1  p-5 bg-[#1a1a1a] rounded-lg text-white">
                <input
                  onChange={emailInputChange}
                  className="border-[#242424] border-2 outline-0"
                  type="text"
                  name="pass"
                  placeholder="New Email"
                />
                <button
                  className="bg-[#242424] p-1 m-2 rounded-md"
                  onClick={changeEmail}
                >
                  Set New Email
                </button>
              </div>
            )}{" "}
            {name && (
              <div className="flex flex-col  justify-center items-center gap-1  p-5 bg-[#1a1a1a] rounded-lg text-white">
                <input
                  onChange={nameInputChange}
                  className="border-[#242424] border-2 outline-0"
                  type="text"
                  name="name"
                  placeholder="New Name"
                />
                <button
                  className="bg-[#242424] p-1 m-2 rounded-md"
                  onClick={nameChange}
                >
                  Set New Name
                </button>
              </div>
            )}
            {allUssShow && ussData && (
              <div className=" admin-users flex flex-col w-auto justify-between items-center mt-4 pt-0 p-4 bg-[#1a1a1a] rounded-lg text-white">
                <h1>All Users</h1>
                {ussData.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex col-2 gap-2 text-2xl text-center h-auto w-auto justify-center items-center border-2 border-gray-500 border-solid m-2 p-2"
                  >
                    <h1>User №{index + 1}</h1>
                    <h1>User Id: {user.id}</h1>
                    <h1>User Email: {user.email}</h1>
                    <h1>User Name: {user.user_metadata?.name || "No name"}</h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="flex justify-center items-center mt-4 ">
        <a
          href="/"
          className="bg-[#1a1a1a] p-1 text-2xl rounded-md"
          onClick={() => {
            sessionStorage.removeItem("token");
          }}
        >
          Logout
        </a>
      </footer>
    </>
  );
}
