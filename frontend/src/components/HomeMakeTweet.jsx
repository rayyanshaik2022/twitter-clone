import {
  Flex,
  HStack,
  VStack,
  Box,
  Spacer,
  Textarea,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import autosize from "autosize";
import { BiImage, BiSmile } from "react-icons/bi";

function HomeMakeTweet() {
  const ref = useRef();
  useEffect(() => {
    autosize(ref.current);
    return () => {
      autosize.destroy(ref.current);
    };
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
        <Box
          boxSize={"40px"}
          minW={"40px"}
          borderRadius={"50%"}
          bg={"blue.200"}
          mr={1}
          alignSelf={"start"}
        ></Box>
        <VStack w={"100%"}>
          <Textarea
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
            <Icon as={BiImage} boxSize={8} color={"blue.300"} _hover={{cursor: "pointer"}}/>
            <Icon as={BiSmile} boxSize={8} color={"blue.300"} _hover={{cursor: "pointer"}}/>
            <Spacer />
            <Button
              colorScheme="blue"
              borderRadius={"100px"}
              h={"42px"}
              px={6}
              fontSize={"md"}
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
