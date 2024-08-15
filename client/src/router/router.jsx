import { createBrowserRouter } from "react-router-dom";
import { signUp } from "../pages/SignUp";
import { signIn } from "../pages/SignIn";

export const router = createBrowserRouter([
    {
        path: 'signup',
        element: <SignUp />,
    },
    {
        path: 'signin',
        element: <signIn />
    }
]);