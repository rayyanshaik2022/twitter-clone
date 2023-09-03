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
  useMediaQuery,
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
import { RiQuillPenLine } from "react-icons/ri";

import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, provider } from "../firebase";

function scrollTo(offset, callback) {
  const fixedOffset = offset.toFixed();
  const onScroll = function () {
    if (window.pageYOffset.toFixed() === fixedOffset) {
      window.removeEventListener("scroll", onScroll);
      callback();
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
}

function HomeLeftSidebar(props) {
  const { authUser } = useUser();
  const navigate = useNavigate();
  const [isLargerThan860] = useMediaQuery("(min-height: 860px)");
  const [isLargerThan1280W] = useMediaQuery("(min-width: 1280px)");

  const smoothScroll = () => {
    scrollTo(0, () => {
      navigate("/home");
      document.getElementsByClassName("post-input")[0].focus();
    });
  };

  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/sign-up");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const navigateProfile = () => {
    navigate("/profile");
  };

  // responsive sidebar
  if (!isLargerThan1280W) {
    return (
      <Flex
        flexDir={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        ml={"auto"}
        w={"84px"}
        px={2}
        pt={3}
        pb={1}
        h={"100vh"}
        pos={"sticky"}
        top={0}
        overflowY={"auto"}
        gap={8}
      >
        <Flex w={"100%"} flexDir={"column"} alignItems={"center"} gap={3}>
          <Flex
            align={"center"}
            justify={"center"}
            boxSize={12}
            borderRadius={"100px"}
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            onClick={() => navigate("/home")}
          >
            <Icon as={FaTwitter} boxSize={7} color={"blue.400"} />
          </Flex>

          <Flex
            align={"center"}
            justify={"center"}
            boxSize={12}
            borderRadius={"100px"}
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            onClick={() => navigate("/home")}
          >
            <Icon as={BiSolidHomeCircle} boxSize={7} />
          </Flex>
          <Flex
            align={"center"}
            justify={"center"}
            boxSize={12}
            borderRadius={"100px"}
            _hover={{ bg: "gray.100", cursor: "not-allowed" }}
          >
            <Icon as={BiHash} boxSize={7} />
          </Flex>

          <Flex
            align={"center"}
            justify={"center"}
            boxSize={12}
            borderRadius={"100px"}
            _hover={{ bg: "gray.100", cursor: "not-allowed" }}
          >
            <Icon as={BiBell} boxSize={7} />
          </Flex>
          <Flex
            align={"center"}
            justify={"center"}
            boxSize={12}
            borderRadius={"100px"}
            _hover={{ bg: "gray.100", cursor: "not-allowed" }}
          >
            <Icon as={BiEnvelope} boxSize={7} />
          </Flex>
          <Flex
            align={"center"}
            justify={"center"}
            boxSize={12}
            borderRadius={"100px"}
            _hover={{ bg: "gray.100", cursor: "not-allowed" }}
          >
            <Icon as={BiBookmark} boxSize={7} />
          </Flex>
          <Flex
            align={"center"}
            justify={"center"}
            boxSize={12}
            borderRadius={"100px"}
            _hover={{ bg: "gray.100", cursor: "not-allowed" }}
          >
            <Icon as={BiDetail} boxSize={7} />
          </Flex>
          <Flex
            align={"center"}
            justify={"center"}
            boxSize={12}
            borderRadius={"100px"}
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            onClick={navigateProfile}
          >
            <Icon as={BiUser} boxSize={7} />
          </Flex>
          <Flex
            align={"center"}
            justify={"center"}
            boxSize={12}
            borderRadius={"100px"}
            _hover={{ bg: "gray.100", cursor: "not-allowed" }}
          >
            <Icon as={CgMoreO} boxSize={7} />
          </Flex>

          <Flex
            align={"center"}
            justify={"center"}
            boxSize={12}
            borderRadius={"100px"}
            bg={"blue.300"}
            _hover={{ bg: "blue.400", cursor: "pointer" }}
            mt={4}
            onClick={smoothScroll}
          >
            <Icon as={RiQuillPenLine} color={"white"} boxSize={8} />
          </Flex>
        </Flex>
        <Flex
          align={"center"}
          justify={"center"}
          boxSize={14}
          borderRadius={"100px"}
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          onClick={navigateProfile}
        >
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
        </Flex>
      </Flex>
    );
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
        <HStack justify={"space-between"}>
          <Icon as={FaTwitter} boxSize={10} color={"blue.400"} />
          <Button
            colorScheme="blue"
            borderRadius={"100px"}
            onClick={onClickSignOut}
          >
            Log out
          </Button>
        </HStack>
        <Flex
          flexDir={"column"}
          gap={1}
          fontSize={isLargerThan860 ? "xl" : "md"}
          fontWeight={"500"}
        >
          <HStack
            gap={4}
            _hover={{ bg: "gray.50", cursor: "pointer" }}
            p={4}
            py={isLargerThan860 ? 4 : 3}
            borderRadius={"100px"}
            onClick={() => navigate("/home")}
          >
            <Icon as={BiSolidHomeCircle} boxSize={isLargerThan860 ? 7 : 6} />
            <Text>Home</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            py={isLargerThan860 ? 4 : 3}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={BiHash} boxSize={isLargerThan860 ? 7 : 6} />
            <Text>Explore</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            py={isLargerThan860 ? 4 : 3}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={BiBell} boxSize={isLargerThan860 ? 7 : 6} />
            <Text>Notifications</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            py={isLargerThan860 ? 4 : 3}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={BiEnvelope} boxSize={isLargerThan860 ? 7 : 6} />
            <Text>Messages</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            py={isLargerThan860 ? 4 : 3}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={BiBookmark} boxSize={isLargerThan860 ? 7 : 6} />
            <Text>Bookmarks</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            py={isLargerThan860 ? 4 : 3}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={BiDetail} boxSize={isLargerThan860 ? 7 : 6} />
            <Text>Lists</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            py={isLargerThan860 ? 4 : 3}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "pointer" }}
            onClick={navigateProfile}
          >
            <Icon as={BiUser} boxSize={isLargerThan860 ? 7 : 6} />
            <Text>Profile</Text>
          </HStack>
          <HStack
            gap={4}
            p={4}
            py={isLargerThan860 ? 4 : 3}
            borderRadius={"100px"}
            _hover={{ bg: "gray.50", cursor: "not-allowed" }}
          >
            <Icon as={CgMoreO} boxSize={isLargerThan860 ? 7 : 6} />
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
          <VStack alignItems={"start"} gap={0} pos={"relative"}>
            <Text fontWeight={"600"}>
              {authUser ? authUser.displayName : "DISPLAY NAME"}
            </Text>
            <Text color={"gray.500"}>
              @{props.user ? props.user.username : "USERNAME"}
            </Text>
          </VStack>
        </HStack>
        <Spacer />
        <Icon as={BiDotsHorizontalRounded} boxSize={6} />
      </Flex>
    </Flex>
  );
}

export default HomeLeftSidebar;
