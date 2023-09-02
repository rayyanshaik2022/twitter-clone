import { Grid, Flex, Text, Box, Heading } from "@chakra-ui/react";

import { auth, useFirestore } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";

// Import components
import HomeLeftSidebar from "../components/HomeLeftSidebar";
import HomeRightSideBar from "../components/HomeRightSidebar";
import HomeMakeTweet from "../components/HomeMakeTweet";
import HomeFeed from "../components/HomeFeed";

function Home() {
  const { authUser } = useUser();
  const [pushPost, setPushPost] = useState(null);
  const [user, setUser] = useState(null);

  const db = useFirestore();

  useEffect(() => {
    const getData = async () => {
      try {
        const docRefUser = doc(db, "Users", authUser.uid);
        const docSnap = await getDoc(docRefUser);

        if (!docSnap.exists()) {
          return;
        }

        const userData = docSnap.data();
        setUser({...userData, id: docRefUser.id});
      } catch (e) {
        console.log("ERROR", e);
      }
    };

    if (!authUser) {
      return;
    }

    getData();
  }, [authUser]);

  if (!authUser) {
    return <>Loading Home...</>;
  }

  return (
    <>
      <Grid templateColumns={"repeat(3, 1fr)"} p={0}>
        <HomeLeftSidebar user={user} />
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
            bg={"whiteAlpha.500"}
            backdropFilter={"blur(6px)"}
            pos={"sticky"}
            top={0}
            zIndex={2}
          >
            <Heading as={"h1"} size={"md"}>
              Home
            </Heading>
          </Box>
          <HomeMakeTweet pushPost={pushPost} setPushPost={setPushPost} />
          <HomeFeed pushPost={pushPost} setPushPost={setPushPost} user={user} />
        </Box>
        <HomeRightSideBar />
      </Grid>
    </>
  );
}

export default Home;
