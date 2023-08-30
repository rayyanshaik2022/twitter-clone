import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App(props) {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
        navigate("/sign-up");
      }

      setLoading(false);
    });
  }, []);

  if (loading) {
    return <>Loading page...</>;
  }

  if (props.page == "sign-up") {
    return <Signup />;
  }

  if (props.page == "log-in") {
    return <Login />;
  }

  if (props.page == "home") {
    return <Home />;
  }

  return <></>;
}

export default App;
