// Hook imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Firebase imports
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useUser() {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
        navigate("/sign-up/");
      }
    });
  }, []);

  return { authUser };
}
