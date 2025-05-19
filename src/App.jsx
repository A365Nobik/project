import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import NotFound from "./pages/NotFound";
import AccPage from "./pages/AccPage";
import Home from "./pages/Home";

export default function App() {
  const [token, setToken] = useState(null);

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

  return (
    <>
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn setDataToken={setToken} />} />
        <Route path="*" element={<NotFound />} />
        {token ? (
          <Route path="/acc" element={<AccPage token={token} />}></Route>
        ) : (
          ""
        )}
      </Routes>
    </>
  );
}
