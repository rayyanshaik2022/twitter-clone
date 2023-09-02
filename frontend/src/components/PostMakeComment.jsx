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

import { BiImage, BiSmile } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import autosize from "autosize";
import { getFunctions, httpsCallable } from "firebase/functions";

function PostMakeComment(props) {
  const ref = useRef();
  const refOutsideClick = useRef();

  useEffect(() => {
    autosize(ref.current);
    return () => {
      autosize.destroy(ref.current);
    };
  }, []);

  useOutsideClick({
    ref: refOutsideClick,
    handler: () => setShowEmoji(false),
  });

  const [postInput, setPostInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const onChangePostInput = (e) => {
    setPostInput(e.target.value);
  };

  const postComment = async () => {
    if (postInput.length < 2) {
      return;
    }

    try {
      setLoading(true);
      const functions = getFunctions();
      const newPost = httpsCallable(functions, "newComment");
      const result = await newPost({
        textContent: postInput,
        author: { username: props.user.username },
        post: { id: props.postId },
      });
      props.setPushComment({
        ...result.data,
        new: true,
      });
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
        <Image
          src={props.user.photoURL}
          boxSize={"40px"}
          minW={"40px"}
          borderRadius={"50%"}
          bg={"blue.200"}
          alignSelf={"start"}
        />

        <VStack w={"100%"}>
          <Textarea
            value={postInput}
            onChange={onChangePostInput}
            placeholder="Post your reply!"
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
            className={"post-input"}
          />
          <HStack w={"100%"} pl={4} gap={5}>
            <Icon
              as={BiImage}
              boxSize={6}
              color={"blue.300"}
              _hover={{ cursor: "not-allowed" }}
            />
            <Icon
              as={BiSmile}
              boxSize={6}
              color={"blue.300"}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setShowEmoji(true);
              }}
            />
            {showEmoji ? (
              <Box pos={"absolute"} mt={"440px"} ref={refOutsideClick}>
                <EmojiPicker
                  width={"320px"}
                  height={"380px"}
                  onEmojiClick={(emoji) => {
                    setPostInput(postInput + emoji.emoji);
                  }}
                />
              </Box>
            ) : null}
            <Spacer />
            <Button
              isLoading={loading}
              colorScheme="blue"
              borderRadius={"100px"}
              px={4}
              size={"sm"}
              onClick={postComment}
            >
              Reply
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Flex>
  );
}

export default PostMakeComment;
