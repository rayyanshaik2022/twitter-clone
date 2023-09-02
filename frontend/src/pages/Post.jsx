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

function Post() {
  const { authUser } = useUser();
  let { username, postid } = useParams();
  const [author, setAuthor] = useState(null);
  const [post, setPost] = useState(null);
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
            setAuthor(doc.data());
          });

          return;
        }

        setAuthor(null);
      } catch (e) {
        console.log("ERROR", e);
      }
    };

    const getPostData = async () => {
      try {
        if (postid != undefined) {
          const postRef = doc(db, "Posts", postid);
          const postSnap = await getDoc(postRef);

          if (postSnap.exists()) {
            console.log("Post document data:", postSnap.data());
            setPost({ ...postSnap.data(), id: postid });
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            setPost(null);
          }

          return;
        }

        setPost(null);
      } catch (e) {
        console.log("ERROR", e);
      }
    };

    if (!authUser) {
      return;
    }

    getData();
    getPostData();
  }, [authUser]);

  if (!authUser || !author || !post) {
    return <>Loading Post...</>;
  }

  return (
    <>
      <Grid templateColumns={"repeat(3, 1fr)"} p={0}>
        {/* TODO Re add prop user={user} */}
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
            bg={"whiteAlpha.500"}
            backdropFilter={"blur(6px)"}
            pos={"sticky"}
            top={0}
            zIndex={2}
          >
            <Heading as={"h1"} size={"md"}>
              Tweet
            </Heading>
          </Box>
          <Flex
            w={"100%"}
            flexDir={"column"}
            pos={"relative"}
            borderBottom={"1px solid"}
            borderBottomColor={"gray.300"}
            p={3}
            gap={2}
          >
            <HStack>
              {authUser ? (
                <Image
                  src={authUser.photoURL}
                  boxSize={"40px"}
                  minW={"40px"}
                  borderRadius={"50%"}
                  bg={"blue.200"}
                />
              ) : (
                <Box
                  boxSize={"40px"}
                  minW={"40px"}
                  borderRadius={"50%"}
                  bg={"blue.200"}
                ></Box>
              )}
              <VStack alignItems={"start"} gap={0}>
                <Text fontWeight={"600"}>
                  {author ? author.displayName : "DISPLAY NAME"}
                </Text>
                <Text color={"gray.500"}>
                  @{author ? author.username : "USERNAME"}
                </Text>
              </VStack>
            </HStack>
            <Text justifyContent={"start"} w={"100%"}>
              {post.textContent}
            </Text>

            <HStack>
              <Text color={"gray.600"}>
                {new Date(post.datePosted.toDate().toString()).toDateString()}
              </Text>
            </HStack>
            <Box w={"99%"} h={"1px"} alignSelf={"center"} bg={"gray.300"}></Box>
            <HStack gap={1}>
                <Text fontWeight={"600"}>{post.likes}</Text>
                <Text color={"gray.600"} mr={4}> likes</Text>

                <Text fontWeight={"600"}>{post.comments.length}</Text>
                <Text color={"gray.600"}> replies</Text>
            </HStack>
          </Flex>
          {/* <ProfileFeed user={user} /> */}
        </Box>
        <HomeRightSideBar />
      </Grid>
    </>
  );
}

export default Post;
