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
  keyframes,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";

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
import { useNavigate, useParams } from "react-router-dom";

// Import components
import HomeLeftSidebar from "../components/HomeLeftSidebar";
import HomeRightSideBar from "../components/HomeRightSidebar";
import PostMakeComment from "../components/PostMakeComment";
import CommentFeed from "../components/CommentFeed";

import { BiComment, BiLinkAlt } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getFunctions, httpsCallable } from "firebase/functions";

const likeAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3)
  }
  100% {
    transform: scale(1)
  }
`;

function Post() {
  const { authUser } = useUser();
  let { username, postid } = useParams();
  const [author, setAuthor] = useState(null);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [lastLike, setLastLike] = useState(new Date())
  const [pushComment, setPushComment] = useState(null);
  const db = useFirestore();
  const toast = useToast();
  const navigate = useNavigate();
  const [isLargerThan1280W] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan1020W] = useMediaQuery("(min-width: 1020px)");

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
            setLikes(postSnap.data().likes);
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

    const getUserData = async () => {
      try {
        const docRefUser = doc(db, "Users", authUser.uid);
        const docSnap = await getDoc(docRefUser);

        if (!docSnap.exists()) {
          return;
        }

        const userData = docSnap.data();
        setUser(userData);
        setIsLiked(userData.liked.includes(postid));
      } catch (e) {
        console.log("ERROR", e);
      }
    };

    if (!authUser) {
      return;
    }

    getData();
    getPostData();
    getUserData();
  }, [authUser]);

  const handleClickLikePost = async () => {
    setIsLiked(!isLiked);

    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

    let timeClicked = new Date();

    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

    if (timeClicked - lastLike < 1200) {
      console.log("Limited like, user is liking too fast!")
      return;
    }

    setLastLike(timeClicked);

    // Make like request to cloud functions here
    const functions = getFunctions();
    const likePost = httpsCallable(functions, "likePost");
    await likePost({
      post: { id: postid },
      author: { id: user.uid },
    });
  };

  const linkCopiedToast = () => {
    navigator.clipboard.writeText(
      "http://localhost:5173/" + author.username + "/status/" + postid
    );
    toast({
      position: "bottom-center",
      render: () => (
        <Box
          color="white"
          w={"220px"}
          mb={4}
          py={2}
          px={2}
          bg="blue.400"
          borderRadius={6}
          textAlign={"center"}
        >
          Link copied to clipboard!
        </Box>
      ),
    });
  };

  const getGridColumns = () => {
    if (isLargerThan1280W) {
      return "repeat(3, 1fr)";
    } else if (isLargerThan1020W) {
      return "minmax(84px, 1fr) minmax(460px, 1fr) minmax(320px, 3fr)";
    } else {
      return "minmax(84px, 1fr) minmax(320px, 6fr)";
    }
  };

  if (!authUser || !author || !post) {
    return <>Loading Post...</>;
  }

  return (
    <>
      <Grid templateColumns={getGridColumns()} p={0}>
        {/* TODO Re add prop user={user} */}
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
              Tweet
            </Heading>
          </Box>
          <Flex
            w={"100%"}
            flexDir={"column"}
            pos={"relative"}
            borderBottom={"1px solid"}
            borderBottomColor={"gray.300"}
            py={3}
            px={4}
            gap={2}
          >
            <HStack>
              {author ? (
                <Image
                  src={author.photoURL}
                  boxSize={"40px"}
                  minW={"40px"}
                  borderRadius={"50%"}
                  bg={"blue.200"}
                  _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
                  onClick={() => navigate("/profile/" + author.username)}
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
            <Box
              w={"100%"}
              h={"1px"}
              alignSelf={"center"}
              bg={"gray.300"}
            ></Box>
            <HStack gap={1}>
              <Text fontWeight={"600"}>{likes}</Text>
              <Text color={"gray.600"} mr={4}>
                {" "}
                likes
              </Text>

              <Text fontWeight={"600"}>{post.comments.length}</Text>
              <Text color={"gray.600"}> replies</Text>
            </HStack>
            <Box
              w={"100%"}
              h={"1px"}
              alignSelf={"center"}
              bg={"gray.300"}
            ></Box>

            <HStack
              w={"100%"}
              justifyContent={"space-around"}
              alignSelf={"start"}
              mt={2}
              mb={-2}
              color={"gray.500"}
              pb={2}
              px={2}
            >
              <Icon
                as={BiComment}
                boxSize={6}
                _hover={{ color: "blue.500", cursor: "pointer" }}
                onClick={() => {
                  document.getElementsByClassName("post-input")[0].focus();
                }}
              />
              <Box
                _hover={{ color: "red.500", cursor: "pointer" }}
                onClick={handleClickLikePost}
                color={"gray.500"}
                userSelect={"none"}
              >
                {isLiked ? (
                  <Icon
                    as={AiFillHeart}
                    boxSize={6}
                    color={"red.500"}
                    animation={`${likeAnimation} 0.4s ease-in-out`}
                  />
                ) : (
                  <Icon as={AiOutlineHeart} boxSize={6} />
                )}
              </Box>
              <Icon
                as={BiLinkAlt}
                onClick={linkCopiedToast}
                boxSize={6}
                _hover={{ color: "green.500", cursor: "pointer" }}
              />
            </HStack>
          </Flex>
          {/* <ProfileFeed user={user} /> */}
          <PostMakeComment
            user={user}
            postId={postid}
            pushComment={pushComment}
            setPushComment={setPushComment}
          />
          <CommentFeed
            post={post}
            pushComment={pushComment}
            setPushComment={setPushComment}
          />
        </Box>
        {isLargerThan1020W ? (
          <HomeRightSideBar user={user} setUser={setUser} />
        ) : null}
      </Grid>
    </>
  );
}

export default Post;
