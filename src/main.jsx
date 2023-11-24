import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/router";
import AuthContext from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthContext>
        <RouterProvider router={router}></RouterProvider>
      </AuthContext>
    </HelmetProvider>
  </React.StrictMode>
);
