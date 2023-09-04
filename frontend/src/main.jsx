import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { extendTheme } from "@chakra-ui/react";

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
    element: <App page="profile" />,
  },
  {
    path: "/profile/:username",
    element: <App page="profile" />,
  },
  {
    path: "/:username/status/:postid",
    element: <App page="post" />,
  },
  {
    path: "/hashtag/:hashtag",
    element: <App page="hashtag" />,
  },
  {
    path: "*",
    element: <App page="home" />,
  },
]);

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
