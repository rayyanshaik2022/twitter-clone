import { Grid, Flex, Text, Box, Heading } from "@chakra-ui/react";

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
      <Grid templateColumns={"repeat(3, 1fr)"} p={0}>
        <HomeLeftSidebar />
        <Box
          w={"100%"}
          minH={"100vh"}
          borderLeft={"1px solid"}
          borderLeftColor={"gray.300"}
          borderRight={"1px solid"}
          borderRightColor={"gray.300"}
        >
          <Box
            w={"100%"}
            p={4}
            borderBottom={"1px solid"}
            borderBottomColor={"gray.300"}
            bg={"whiteAlpha.900"}
            pos={"sticky"}
            top={0}
          >
            <Heading as={"h1"} size={"md"}>
              Home
            </Heading>
          </Box>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
          <Heading size={"4xl"}>123</Heading>
        </Box>
        <HomeRightSideBar />
      </Grid>
    </>
  );
}

export default Home;
