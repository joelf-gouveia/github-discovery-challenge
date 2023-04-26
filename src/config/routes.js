import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "../pages/SignUp/SignUp"
import { Login } from "../pages/Login/Login"
import { Discovery } from "../pages/Discovery/Discovery"
import { Navbar } from "../components/Navbar/Navbar";
import ErrorPage from "../components/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "discovery",
            element: <Discovery />
        }
    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "signup",
    element: <SignUp />
  }
]);
