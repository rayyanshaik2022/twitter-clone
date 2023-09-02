import {
  Flex,
  HStack,
  VStack,
  Box,
  Text,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFirestore } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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

function PostComment(props) {
  // props.comment

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const db = useFirestore();

  useEffect(() => {
    const getData = async () => {
      try {
        const docRefUser = doc(db, "Users", props.comment.authorId);
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
            transition={"0.14s ease-in-out"}
            _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
            onClick={() => navigate("/profile/" + user.username)}
            className="no-redirect"
          />
        ) : (
          <Box
            boxSize={"40px"}
            minW={"40px"}
            borderRadius={"50%"}
            bg={"blue.200"}
            mr={2}
            alignSelf={"start"}
            className="no-redirect"
          />
        )}
        <VStack w={"100%"}>
          <HStack justifyContent={"start"} w={"100%"} className="no-redirect">
            <Heading as={"h3"} fontSize={"18px"}>
              {user ? user.displayName : "DISPLAY NAME"}
            </Heading>
            <Heading
              as={"h4"}
              size={"sm"}
              fontWeight={"300"}
              color={"gray.500"}
              _hover={{ cursor: "pointer", textDecor: "underline" }}
            >
              {/* {props.isNewClient
                ? "@" + props.authorUsername + " • " + "1 second" + " ago"
                : "@" +
                  props.authorUsername +
                  " • " +
                  timeSince(props.datePosted.toDate()) +
                  " ago"} */}
              @{props.comment.authorUsername} •{" "}
              {
                props.comment.new ? timeSince(props.comment.datePosted) : timeSince(props.comment.datePosted.toDate())
              } ago
            </Heading>
          </HStack>
          <Text justifyContent={"start"} w={"100%"}>
            {props.comment.textContent}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
}

export default PostComment;
