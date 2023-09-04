// Chakra UI imports
import { HStack, Image, VStack, Text, Spacer, Button } from "@chakra-ui/react";

// Firebase imports
import { getFunctions, httpsCallable } from "firebase/functions";

// Hook imports
import { useState } from "react";

function FollowUserCard(props) {
  const [follows, setFollows] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState("Following");

  const onClickFollow = async () => {
    setIsLoading(true);

    const functions = getFunctions();
    const followUser = httpsCallable(functions, "followUser");
    await followUser({
      user: { uid: props.user.uid },
    });

    setFollows(!follows);

    setIsLoading(false);
  };

  const onHoverBtnText = () => {
    setBtnText("Unfollow");
  };

  const onHoverOutBtnText = () => {
    setBtnText("Following");
  };

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
        {!follows ? (
          <Button
            colorScheme="blackAlpha"
            bg={"black"}
            borderRadius={"100px"}
            onClick={onClickFollow}
            isLoading={isLoading}
          >
            Follow
          </Button>
        ) : (
          <Button
            colorScheme="blackAlpha"
            bg={"black"}
            borderRadius={"100px"}
            onClick={onClickFollow}
            _hover={{
              bg: "red.100",
              border: "1px solid",
              borderColor: "red.500",
              color: "red.500",
            }}
            onMouseOver={onHoverBtnText}
            onMouseOut={onHoverOutBtnText}
            isLoading={isLoading}
          >
            {btnText}
          </Button>
        )}
      </HStack>
    </>
  );
}

export default FollowUserCard;
