// Chakra UI imports
import { Grid, Box, Heading } from "@chakra-ui/react";

// Firebase imports
import { getDoc, doc } from "firebase/firestore";

// Hook imports
import { useFirestore } from "../firebase";
import { useMediaQuery } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useParams } from "react-router-dom";

// Component imports
import HomeLeftSidebar from "../components/HomeLeftSidebar";
import HomeRightSideBar from "../components/HomeRightSidebar";
import HashtagFeed from "../components/HashtagFeed";

function Hashtag() {
  const { authUser } = useUser();
  const [user, setUser] = useState(null);
  const { hashtag } = useParams();

  const [isLargerThan1280W] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan1020W] = useMediaQuery("(min-width: 1020px)");
  const [isLargerThan420W] = useMediaQuery("(min-width: 420px)")
  const db = useFirestore();

  const getGridColumns = () => {
    if (isLargerThan1280W) {
      return "repeat(3, 1fr)";
    } else if (isLargerThan1020W) {
      return "minmax(84px, 1fr) minmax(460px, 1fr) minmax(320px, 3fr)";
    } else if (isLargerThan420W) {
      return "minmax(84px, 1fr) minmax(320px, 6fr)";
    } else {
      return "minmax(64px, 1fr) minmax(320px, 6fr)";
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const docRefUser = doc(db, "Users", authUser.uid);
        const docSnap = await getDoc(docRefUser);
        const userData = docSnap.data();
        setUser({ ...userData, id: docRefUser.id });
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
    return <>Loading Hashtags...</>;
  }

  return (
    <>
      <Grid templateColumns={getGridColumns()} p={0}>
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
              #{hashtag}
            </Heading>
          </Box>

          <HashtagFeed hashtag={hashtag} user={user} />
        </Box>

        {isLargerThan1020W ? (
          <HomeRightSideBar user={user} setUser={setUser} />
        ) : null}
      </Grid>
    </>
  );
}

export default Hashtag;
