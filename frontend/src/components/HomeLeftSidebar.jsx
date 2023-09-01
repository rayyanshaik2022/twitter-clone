import {
  Flex,
  Icon,
  Text,
  HStack,
  VStack,
  Button,
  Box,
  Spacer,
  Image,
} from "@chakra-ui/react";

import { FaTwitter } from "react-icons/fa";
import {
  BiSolidHomeCircle,
  BiHash,
  BiBell,
  BiEnvelope,
  BiBookmark,
  BiDetail,
  BiUser,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";

import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

function HomeLeftSidebar(props) {
  const { authUser } = useUser();
  const navigate = useNavigate();

  const smoothScroll = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    navigate("/home")
  };

  const navigateProfile = () => {
    navigate("/profile")
  }

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"space-between"}
      w={"240px"}
      pt={6}
      pb={2}
      h={"calc(100vh - 24px)"}
      ml={"auto"}
      mr={"40px"}
      pos={"sticky"}
      top={0}
      userSelect={"none"}
    >
      <Flex flexDir={"column"} gap={12}>
        <Icon as={FaTwitter} boxSize={10} color={"blue.400"} />
        <Flex flexDir={"column"} gap={1} fontSize={"xl"} fontWeight={"500"}>
          <HStack
            gap={4}
            _hover={{ bg: "gray.50", cursor: "pointer" }}
            p={4}
            borderRadius={"100px"}
            onClick={() => navigate("/home")}
          >
            <Icon as={BiSolidHomeCircle} boxSize={7} />
            <Text>Home</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={BiHash} boxSize={7} />
            <Text>Explore</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={BiBell} boxSize={7} />
            <Text>Notifications</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={BiEnvelope} boxSize={7} />
            <Text>Messages</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={BiBookmark} boxSize={7} />
            <Text>Bookmarks</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={BiDetail} boxSize={7} />
            <Text>Lists</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "pointer" }}
            onClick={navigateProfile}
          >
            <Icon as={BiUser} boxSize={7} />
            <Text>Profile</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={CgMoreO} boxSize={7} />
            <Text>More</Text>
          </HStack>
        </Flex>
        <Button
          colorScheme="blue"
          borderRadius={"100px"}
          h={"52px"}
          fontSize={"xl"}
          onClick={smoothScroll}
        >
          Tweet
        </Button>
      </Flex>
      <Flex
        w={"100%"}
        h={"56px"}
        p={"12px"}
        borderRadius={"100px"}
        alignItems={"center"}
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        onClick={navigateProfile}
      >
        <HStack>
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
            ></Box>
          )}
          <VStack alignItems={"start"} gap={0}>
            <Text fontWeight={"600"}>
              {authUser ? authUser.displayName : "DISPLAY NAME"}
            </Text>
            <Text color={"gray.500"}>@{props.user ? props.user.username : "USERNAME"}</Text>
          </VStack>
        </HStack>
        <Spacer />
        <Icon as={BiDotsHorizontalRounded} boxSize={6} />
      </Flex>
    </Flex>
  );
}

export default HomeLeftSidebar;
