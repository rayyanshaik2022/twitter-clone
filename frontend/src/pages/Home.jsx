import { Grid, Flex, Text } from "@chakra-ui/react";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";

// Import components
import HomeLeftSidebar from "../components/HomeLeftSidebar";
import HomeRightSideBar from "../components/HomeRightSidebar";

function Home() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setAuthUser(user);
//       } else {
//         setAuthUser(null);
//       }

//       setLoading(false);
//     });
//   }, []);

  return (
    <>
      <Grid templateColumns={"repeat(3, 1fr)"} pt={6}>
        <HomeLeftSidebar />
        <p>2</p>
        <HomeRightSideBar />
      </Grid>
    </>
  );
}

export default Home;
