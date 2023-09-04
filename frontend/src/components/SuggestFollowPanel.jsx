import {
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import {
  query,
  getDocs,
  where,
  collection,
  documentId,
  limit,
} from "firebase/firestore";
import { useFirestore } from "../firebase";
import { useUser } from "../hooks/useUser";

import FollowUserCard from "./FollowUserCard";

function SuggestFollowPanel(props) {
  const [users, setUsers] = useState([]);
  const { authUser } = useUser();
  const db = useFirestore();

  useEffect(() => {
    if (!props.user || !authUser) {
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
  }, [props.user, authUser]);


  if (!props.user) {
    return <>Loading...</>
  }

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
          <FollowUserCard user={user} authUser={props.user} setAuthUser={props.setUser} key={user.username} />
        ) : (null))
      }
      {
        users.length < 1 || !users[0].username ? (<Text size={"sm"}>No suggested users!</Text>) : null
      }
    </Flex>
  );
}
export default SuggestFollowPanel;
