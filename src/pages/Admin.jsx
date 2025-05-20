import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function Admin() {
  const [usId, setUsId] = useState("");
  const [usData, setUsData] = useState(null);
  const [ussData, setUssData] = useState(null);
  const [signDate, setSignDate] = useState(null);
  const [createDate, setCreateDate] = useState(null);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  const [allUssShow, setAllUssShow] = useState(false);
  const [usDataShow, setUsDataShow] = useState(false);
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const adminAuthClient = supabase.auth.admin;

  function handleChange(event) {
    setUsId(event.target.value);
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
    setUsDataShow(!usDataShow);
    try {
      const { data, error } = await supabase.auth.admin.getUserById(usId);
      if (error) throw error;
      console.log(data);
      setUsData(data);
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
  async function deleteUser() {
    try {
      const { data, error } = await supabase.auth.admin.deleteUser(usId);
      if (error) throw error;
      console.log(data);
    } catch (error) {
      alert(error);
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
      </header>
      <main className="flex justify-center items-center mt-3 text-4xl w-auto">
        <div className="flex flex-col justify-center items-center w-auto">
          <div className="flex flex-col gap-1 justify-center items-center">
            <input
              onChange={handleChange}
              className="border-[#1a1a1a] border-2 outline-0"
              type="text"
              name="userid"
              placeholder="User ID"
            />
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
            </button>
            {usData && usDataShow && (
              <div className=" flex flex-col   justify-center items-center mt-4 pt-0 p-4 bg-[#1a1a1a] rounded-lg text-white">
                <h1 className="bg-[#242424] rounded-2xl p-1">User data</h1>
                <h1>User Id: {usData.user.id}</h1>
                <h1>User Email: {usData.user.email}</h1>
                <h1>User Phone: {usData.user.phone}</h1>
                <h1>User Role: {usData.user.role}</h1>
                <h1>
                  User Created:{" "}
                  {createDate ? createDate.toLocaleString() : "Never"}
                </h1>
                <h1>User Name: {usData.user.user_metadata.name}</h1>
                <h1>
                  User Phone Verification:
                  {String(usData.user.user_metadata.phone_verified)}
                </h1>
                <h1>
                  User Email Verification:
                  {String(usData.user.user_metadata.email_verified)}
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
                </div>
              </div>
            )}

            {allUssShow && ussData && (
              <div className="flex flex-col w-auto justify-between items-center mt-4 pt-0 p-4 bg-[#1a1a1a] rounded-lg text-white">
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
    </>
  );
}
