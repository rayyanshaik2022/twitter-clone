import { Flex, VStack, Heading, Text } from "@chakra-ui/react";

function SuggestFollowPanel() {
  return (
    <Flex w={"100%"} p={4} bg={"gray.50"} borderRadius={8} gap={8} flexDir={"column"}>
        <Heading as={"h1"} fontSize={"2xl"} fontWeight={700}>Who to follow</Heading>
        <VStack alignItems={"start"} gap={0}>
            <Text fontSize={"sm"} color={"gray.400"}>Trending</Text>
            <Heading as={"h2"} fontSize={"lg"}>#monday</Heading>
            <Text fontSize={"sm"} color={"gray.400"}>12.1k Tweets</Text>
        </VStack>
        <VStack alignItems={"start"} gap={0}>
            <Text fontSize={"sm"} color={"gray.400"}>Trending</Text>
            <Heading as={"h2"} fontSize={"lg"}>#monday</Heading>
            <Text fontSize={"sm"} color={"gray.400"}>12.1k Tweets</Text>
        </VStack>
        <VStack alignItems={"start"} gap={0}>
            <Text fontSize={"sm"} color={"gray.400"}>Trending</Text>
            <Heading as={"h2"} fontSize={"lg"}>#monday</Heading>
            <Text fontSize={"sm"} color={"gray.400"}>12.1k Tweets</Text>
        </VStack>
    </Flex>
  );
}
export default SuggestFollowPanel;
