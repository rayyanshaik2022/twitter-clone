import {
  Flex,
  HStack,
  VStack,
  Box,
  Text,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { BiComment, BiHeart, BiLinkAlt, BiShare, BiShareAlt } from "react-icons/bi";

function HomePost(props) {
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
          <HStack justifyContent={"start"} w={"100%"}>
            <Heading as={"h3"} fontSize={"18px"}>
              Display Name
            </Heading>
            <Heading
              as={"h4"}
              size={"sm"}
              fontWeight={"300"}
              color={"gray.500"}
            >
              {"@" + props.authorUsername + " • " + props.datePosted.toDate()}
            </Heading>
          </HStack>
          <Text justifyContent={"start"} w={"100%"}>
            {props.textContent}
          </Text>
          <HStack w={"90%"} justifyContent={"space-between"} alignSelf={"start"} mt={4}>
            <HStack>
              <Icon as={BiComment} boxSize={6} color={"gray.500"} />
              <Text size={"sm"} color={"gray.500"}>
                {props.comments.length}
              </Text>
            </HStack>
            <HStack>
              <Icon as={BiHeart} boxSize={6} color={"gray.500"} />
              <Text size={"sm"} color={"gray.500"}>
                {props.likes}
              </Text>
            </HStack>
            <Icon as={BiLinkAlt} boxSize={6} color={"gray.500"} />
          </HStack>
        </VStack>
      </HStack>
    </Flex>
  );
}

export default HomePost;
