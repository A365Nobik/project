import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import App from "./App";
import NotFound from "./pages/NotFound";
export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "*", element: <NotFound /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/sign-in", element: <SignIn /> },
]);
