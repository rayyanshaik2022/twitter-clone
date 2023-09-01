import {
  Flex,
  HStack,
  VStack,
  Box,
  Spacer,
  Textarea,
  Button,
  Icon,
  Image,
  useOutsideClick,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import autosize from "autosize";
import { BiImage, BiSmile } from "react-icons/bi";

import { auth, useFirestore } from "../firebase";
import { useUser } from "../hooks/useUser";

import { collection, addDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

import EmojiPicker from "emoji-picker-react";

function HomeMakeTweet(props) {
  const ref = useRef();
  const refOutsideClick = useRef()

  useEffect(() => {
    autosize(ref.current);
    return () => {
      autosize.destroy(ref.current);
    };
  }, []);

  useOutsideClick({
    ref: refOutsideClick,
    handler: () => setShowEmoji(false),
  })

  const [postInput, setPostInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const db = useFirestore();
  const { authUser } = useUser();

  const onChangePostInput = (e) => {
    setPostInput(e.target.value);
  };

  const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const postTweet = async () => {
    if (postInput.length < 2) {
      return;
    }

    try {
      setLoading(true);
      const docRefUser = doc(db, "Users", authUser.uid);
      const docSnap = await getDoc(docRefUser);

      if (!docSnap.exists()) {
        return;
      }

      const userData = docSnap.data();

      const functions = getFunctions();
      const newPost = httpsCallable(functions, "newPost");
      const result = await newPost({
        author: { id: authUser.uid, username: userData.username },
        textContent: postInput,
      });

      console.log("Post created!", result);
      setPostInput("");
      props.setPushPost({ ...result.data, id: result.id, isNewClient: true, newClientId: randomNumber(1, 99999) });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error("Error adding document: ", e);
    }
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
            mr={1}
            alignSelf={"start"}
          ></Box>
        )}

        <VStack w={"100%"}>
          <Textarea
            value={postInput}
            onChange={onChangePostInput}
            placeholder="What's happening"
            size="md"
            resize={"none"}
            border={"none"}
            fontSize={"xl"}
            minH={"60px"}
            _focus={{ border: "none" }}
            _placeholder={{ color: "gray.500" }}
            variant={"none"}
            ref={ref}
            maxLength={280}
          />
          <HStack w={"100%"} pl={6} gap={5}>
            <Icon
              as={BiImage}
              boxSize={8}
              color={"blue.300"}
              _hover={{ cursor: "pointer" }}
            />
            <Icon
              as={BiSmile}
              boxSize={8}
              color={"blue.300"}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setShowEmoji(true);
              }}
            />
            {showEmoji ? (
              <Box pos={"absolute"} mt={"440px"} ref={refOutsideClick}>
                <EmojiPicker width={"320px"} height={"380px"} onEmojiClick={(emoji) => {setPostInput(postInput + emoji.emoji)}}/>
              </Box>
            ) : null}
            <Spacer />
            <Button
              isLoading={loading}
              colorScheme="blue"
              borderRadius={"100px"}
              h={"42px"}
              px={6}
              fontSize={"md"}
              onClick={postTweet}
            >
              Tweet
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Flex>
  );
}

export default HomeMakeTweet;
