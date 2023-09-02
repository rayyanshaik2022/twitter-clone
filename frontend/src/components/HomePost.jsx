import {
  Flex,
  HStack,
  VStack,
  Box,
  Text,
  Heading,
  Icon,
  Image,
  keyframes,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiComment, BiHeart, BiLinkAlt } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useFirestore } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

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

function HomePost(props) {
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const navigate = useNavigate();
  const db = useFirestore();

  useEffect(() => {
    const getData = async () => {
      try {
        const docRefUser = doc(db, "Users", props.authorId);
        const docSnap = await getDoc(docRefUser);

        if (!docSnap.exists()) {
          return;
        }

        const userData = docSnap.data();
        setUser(userData);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    getData();

  }, []);

  useEffect(() => {
    if (!props.user) {
      return;
    }

    if (props.user.liked.includes(props.id)) {
      setIsLiked(true);
    }

    console.log(props.user)
  }, [props.user])
  

  const handleClickLikePost = async () => {
    setIsLiked(!isLiked);

    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

    // Make like request to cloud functions here
    const functions = getFunctions();
    const likePost = httpsCallable(functions, "likePost");
    const result = await likePost({
      post: { id: props.id },
      author: { id: props.authorId },
    });
  };

  return (
    <Flex
      w={"100%"}
      p={4}
      borderBottom={"1px solid"}
      borderBottomColor={"gray.300"}
      bg={"whiteAlpha.900"}
      top={0}
      zIndex={1}
    >
      <HStack gap={2} w={"100%"}>
        {user ? (
          <Image
            src={user.photoURL}
            boxSize={"40px"}
            minW={"40px"}
            borderRadius={"50%"}
            bg={"blue.200"}
            mr={2}
            alignSelf={"start"}
            _hover={{ cursor: "pointer" }}
            onClick={() => navigate("/profile/" + user.username)}
          />
        ) : (
          <Box
            boxSize={"40px"}
            minW={"40px"}
            borderRadius={"50%"}
            bg={"blue.200"}
            mr={2}
            alignSelf={"start"}
          />
        )}
        <VStack w={"100%"}>
          <HStack justifyContent={"start"} w={"100%"}>
            <Heading as={"h3"} fontSize={"18px"}>
              {user ? user.displayName : "DISPLAY NAME"}
            </Heading>
            <Heading
              as={"h4"}
              size={"sm"}
              fontWeight={"300"}
              color={"gray.500"}
              _hover={{ cursor: "pointer" }}
              onClick={() => navigate("/profile/" + user.username)}
            >
              {props.isNewClient
                ? "@" + props.authorUsername + " • " + "1 second" + " ago"
                : "@" +
                  props.authorUsername +
                  " • " +
                  timeSince(props.datePosted.toDate()) +
                  " ago"}
            </Heading>
          </HStack>
          <Text justifyContent={"start"} w={"100%"}>
            {props.textContent}
          </Text>
          <HStack
            w={"90%"}
            justifyContent={"space-between"}
            alignSelf={"start"}
            mt={2}
            mb={-2}
          >
            <HStack
              _hover={{ color: "blue.500", cursor: "pointer" }}
              color={"gray.500"}
              p={2}
              userSelect={"none"}
            >
              <Icon as={BiComment} boxSize={6} />
              <Text size={"sm"}>{props.comments.length}</Text>
            </HStack>
            <HStack
              _hover={{ color: "red.500", cursor: "pointer" }}
              onClick={handleClickLikePost}
              color={"gray.500"}
              p={2}
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
              <Text size={"sm"}>{likes}</Text>
            </HStack>
            <Icon
              as={BiLinkAlt}
              boxSize={6}
              _hover={{ color: "green.500", cursor: "pointer" }}
              color={"gray.500"}
            />
          </HStack>
        </VStack>
      </HStack>
    </Flex>
  );
}

export default HomePost;
