import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Validate from "../pages/Validate";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import CreateQuiz from "../pages/CreateQuiz";

export const router = createBrowserRouter([
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "createquiz",
    element: <CreateQuiz />
  },
  {
    path: "validate/:emailToken",
    element: <Validate />,
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
