import { Flex, Icon, Text, HStack, VStack, Button, Box, Spacer} from "@chakra-ui/react";

import { FaTwitter } from "react-icons/fa";
import {
  BiSolidHomeCircle,
  BiHash,
  BiBell,
  BiEnvelope,
  BiBookmark,
  BiDetail,
  BiUser,
  BiDotsHorizontalRounded
} from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";

function HomeLeftSidebar() {
  return (
    <Flex
      flexDir={"column"}
      justifyContent={"space-between"}
      w={"240px"}
      h={"calc(100vh - 24px)"}
      ml={"auto"}
      mr={"40px"}
      pos={"sticky"}
      pb={2}
      userSelect={"none"}
    >
      <Flex flexDir={"column"} gap={12}>
        <Icon as={FaTwitter} boxSize={10} color={"blue.400"} />
        <Flex flexDir={"column"} gap={8} fontSize={"xl"} fontWeight={"500"}>
          <HStack gap={4}>
            <Icon as={BiSolidHomeCircle} boxSize={7}/>
            <Text>Home</Text>
          </HStack>
          <HStack gap={4}>
            <Icon as={BiHash} boxSize={7}/>
            <Text>Explore</Text>
          </HStack>
          <HStack gap={4}>
            <Icon as={BiBell} boxSize={7}/>
            <Text>Notifications</Text>
          </HStack>
          <HStack gap={4}>
            <Icon as={BiEnvelope} boxSize={7}/>
            <Text>Messages</Text>
          </HStack>
          <HStack gap={4}>
            <Icon as={BiBookmark} boxSize={7}/>
            <Text>Bookmarks</Text>
          </HStack>
          <HStack gap={4}>
            <Icon as={BiDetail} boxSize={7}/>
            <Text>Lists</Text>
          </HStack>
          <HStack gap={4}>
            <Icon as={BiUser} boxSize={7}/>
            <Text>Profile</Text>
          </HStack>
          <HStack gap={4}>
            <Icon as={CgMoreO} boxSize={7}/>
            <Text>More</Text>
          </HStack>
        </Flex>
        <Button colorScheme="blue" borderRadius={"100px"} h={"52px"} fontSize={"xl"}>Tweet</Button>
      </Flex>
      <Flex w={"100%"} h={"56px"} p={"12px"} borderRadius={"100px"} alignItems={"center"} _hover={{bg: "gray.100", cursor: "pointer"}}>
        <HStack>
            <Box boxSize={"40px"} borderRadius={"50%"} bg={"blue.200"}></Box>
            <VStack alignItems={"start"} gap={0}>
                <Text fontWeight={"600"}>Display Name</Text>
                <Text color={"gray.500"}>@Username</Text>
            </VStack>
        </HStack>
        <Spacer />
        <Icon as={BiDotsHorizontalRounded} boxSize={6}/>
      </Flex>
    </Flex>
  );
}

export default HomeLeftSidebar;
