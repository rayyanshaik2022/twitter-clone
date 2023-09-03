import {
  Flex,
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  Spacer,
  Button,
  Image
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import {
  getDoc,
  doc,
  query,
  getDocs,
  where,
  collection,
  documentId,
  FieldPath,
  limit,
  orderBy,
} from "firebase/firestore";
import { useFirestore } from "../firebase";
import { useUser } from "../hooks/useUser";

import FollowUserCard from "./FollowUserCard";

function SuggestFollowPanel(props) {
  const [users, setUsers] = useState([]);
  const { authUser } = useUser();
  const db = useFirestore();

  useEffect(() => {
    if (!props.user) {
      return;
    }

    const getData = async () => {
      const q = query(
        collection(db, "Users"),
        where(documentId(), "not-in", [authUser.uid, ...props.user.following]),
        limit(4)
      );
      const querySnapshot = await getDocs(q);

      let newUsers = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        newUsers.push(doc.data());
      });

      setUsers(newUsers);
    };

    getData();
  }, [props.user]);

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
      {
        users.map((user, index) => user.username && index < 4 ? (
          <FollowUserCard user={user} key={user.username} />
        ) : (null))
      }
      {/* <HStack>
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
      </HStack> */}
    </Flex>
  );
}
export default SuggestFollowPanel;
