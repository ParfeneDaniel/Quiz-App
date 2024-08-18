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
    path: "signUp",
    element: <SignUp />,
  },
  {
    path: "signIn",
    element: <SignIn />,
  },
  {
    path: "profile",
    element: <Profile />,
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
      {
        path: "createQuiz",
        element: <CreateQuiz />,
      },
    ],
  },
]);
