import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router/router";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
