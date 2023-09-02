import {
  Grid,
  Flex,
  Text,
  Box,
  Heading,
  Image,
  VStack,
  HStack,
  Icon,
  Button,
} from "@chakra-ui/react";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDoc,
  doc,
  query,
  getDocs,
  where,
  collection,
} from "firebase/firestore";

import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useFirestore } from "../firebase";
import { useParams } from "react-router-dom";

// Import components
import HomeLeftSidebar from "../components/HomeLeftSidebar";
import HomeRightSideBar from "../components/HomeRightSidebar";
import ProfileFeed from "../components/ProfileFeed";

import { BiCalendarHeart, BiLocationPlus } from "react-icons/bi";

function Profile() {
  const { authUser } = useUser();
  let { username } = useParams();
  const [user, setUser] = useState(null);
  const db = useFirestore();

  useEffect(() => {
    const getData = async () => {
      try {
        if (username != undefined) {
          const q = query(
            collection(db, "Users"),
            where("username", "==", username)
          );

          const querySnapshot = await getDocs(q);
          // Should only be 1
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setUser(doc.data());
          });

          return;
        }
        const docRefUser = doc(db, "Users", authUser.uid);
        const docSnap = await getDoc(docRefUser);

        if (!docSnap.exists()) {
          return;
        }

        const userData = docSnap.data();
        setUser(userData);
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
              {user ? user.displayName : "@" + username}
            </Heading>
            <Text color={"gray.500"}>
              {user ? user.posts.length + " posts" : "0 posts"}
            </Text>
          </Box>
          <Flex
            w={"100%"}
            flexDir={"column"}
            pos={"relative"}
            borderBottom={"1px solid"}
            borderBottomColor={"gray.300"}
          >
            <Box w={"100%"} bg={"gray.200"} h={"190px"}></Box>
            <Box
              w={"100%"}
              bg={"white"}
              h={"190px"}
              display={"flex"}
              justifyContent={"end"}
              pos={"relative"}
            >
              <Flex
                mt={"auto"}
                w={"100%"}
                px={4}
                flexDir={"column"}
                color={"gray.600"}
                py={2}
                pos={"relative"}
              >
                <VStack alignItems={"start"} gap={0}>
                  <Heading as={"h1"} size={"md"} color={"black"}>
                    {user ? user.displayName : "@" + username}
                  </Heading>
                  <Text>{user ? "@" + user.username : null}</Text>
                </VStack>
                {user ? (
                  <HStack gap={4} mt={3}>
                    <HStack gap={1}>
                      <Icon as={BiLocationPlus} boxSize={5} />
                      <Text>{user ? user.location : "Home sweet home"}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={BiCalendarHeart} boxSize={5} />
                      <Text>
                        Joined{" "}
                        {user
                          ? new Date(
                              user.joinDate.toDate().toString()
                            ).toDateString()
                          : "Some time ago..."}
                      </Text>
                    </HStack>
                  </HStack>
                ) : null}
                <HStack gap={5} mt={2}>
                  <HStack gap={1}>
                    <Text color={"black"} fontWeight={"600"}>
                      {user ? user.following.length : 0}
                    </Text>
                    <Text>Following</Text>
                  </HStack>
                  <HStack gap={1}>
                    <Text color={"black"} fontWeight={"600"}>
                      {user ? user.followers.length : 0}
                    </Text>
                    <Text>Followers</Text>
                  </HStack>
                </HStack>
              </Flex>
              {
                ( user && user.uid == authUser.uid) ? (<Button
                  pos={"absolute"}
                  top={4}
                  right={4}
                  justifySelf={"start"}
                  borderRadius={"100px"}
                  variant={"outline"}
                >
                  Edit Profile
                </Button>) : null
              }
            </Box>
            {user ? (
              <Image
                pos={"absolute"}
                left={4}
                top={0}
                bottom={0}
                my={"auto"}
                boxSize={28}
                borderRadius={"100%"}
                bg={"blue.400"}
                src={user.photoURL}
              />
            ) : (
              <Box
                pos={"absolute"}
                left={4}
                top={0}
                bottom={0}
                my={"auto"}
                boxSize={28}
                borderRadius={"100%"}
                bg={"blue.400"}
              ></Box>
            )}
          </Flex>
          <ProfileFeed user={user} />
        </Box>
        <HomeRightSideBar />
      </Grid>
    </>
  );
}

export default Profile;
