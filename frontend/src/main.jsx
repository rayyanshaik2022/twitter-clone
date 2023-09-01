import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App page="home" />,
  },
  {
    path: "/home",
    element: <App page="home" />,
  },
  {
    path: "/sign-up",
    element: <App page="sign-up" />,
  },
  {
    path: "/log-in",
    element: <App page="log-in" />,
  },
  {
    path: "/profile",
    element: <App page="profile" />
  },
  {
    path: "/profile/:username",
    element: <App page="profile" />
  },
  {
    path: "*",
    element: <App />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);