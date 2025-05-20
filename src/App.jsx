import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import NotFound from "./pages/NotFound";
import AccPage from "./pages/AccPage";
import Home from "./pages/Home";
import ResetPass from "./pages/ResetPass";
import UpdatePass from "./pages/UpdatePass";
import Admin from "./pages/Admin";

export default function App() {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (token?.user?.email === "admin@gmail.com") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [token]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/sign-in"
          element={<SignIn admin={admin} setDataToken={setToken} />}
        />
        {token ? (
          <Route path="/acc" element={<AccPage token={token} />}></Route>
        ) : (
          ""
        )}
        <Route path="/reset-pass" element={<ResetPass />} />
        <Route path="/update-pass" element={<UpdatePass />} />
        {admin ? <Route path="/admin" element={<Admin />}></Route> : ""}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
