import { HStack, Image, VStack, Text, Spacer, Button } from "@chakra-ui/react";

function FollowUserCard(props) {
  return (
    <>
      <HStack>
        <Image
          src={props.user.photoURL}
          boxSize={"40px"}
          borderRadius={"50%"}
          bg={"blue.200"}
          mr={1}
        />
        <VStack alignItems={"start"} gap={0}>
          <Text fontWeight={"600"}>{props.user.displayName}</Text>
          <Text color={"gray.500"}>@{props.user.username}</Text>
        </VStack>
        <Spacer />
        <Button colorScheme="blackAlpha" bg={"black"} borderRadius={"100px"}>
          Follow
        </Button>
      </HStack>
    </>
  );
}

export default FollowUserCard;
