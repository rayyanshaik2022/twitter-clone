import {
  Flex,
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  Spacer,
  Button,
} from "@chakra-ui/react";

function SuggestFollowPanel() {
  return (
    <Flex
      w={"100%"}
      p={4}
      bg={"gray.50"}
      borderRadius={8}
      gap={8}
      flexDir={"column"}
    >
      <Heading as={"h1"} fontSize={"2xl"} fontWeight={700}>
        Who to follow
      </Heading>
      <HStack>
        <Box boxSize={"40px"} borderRadius={"50%"} bg={"blue.200"} mr={1}></Box>
        <VStack alignItems={"start"} gap={0}>
          <Text fontWeight={"600"}>Display Name</Text>
          <Text color={"gray.500"}>@Username</Text>
        </VStack>
        <Spacer />
        <Button colorScheme="blackAlpha" bg={"black"} borderRadius={"100px"}>
          Follow
        </Button>
      </HStack>
      <HStack>
        <Box boxSize={"40px"} borderRadius={"50%"} bg={"blue.200"} mr={1}></Box>
        <VStack alignItems={"start"} gap={0}>
          <Text fontWeight={"600"}>Display Name</Text>
          <Text color={"gray.500"}>@Username</Text>
        </VStack>
        <Spacer />
        <Button colorScheme="blackAlpha" bg={"black"} borderRadius={"100px"}>
          Follow
        </Button>
      </HStack>
      <HStack>
        <Box boxSize={"40px"} borderRadius={"50%"} bg={"blue.200"} mr={1}></Box>
        <VStack alignItems={"start"} gap={0}>
          <Text fontWeight={"600"}>Display Name</Text>
          <Text color={"gray.500"}>@Username</Text>
        </VStack>
        <Spacer />
        <Button colorScheme="blackAlpha" bg={"black"} borderRadius={"100px"}>
          Follow
        </Button>
      </HStack>
    </Flex>
  );
}
export default SuggestFollowPanel;
