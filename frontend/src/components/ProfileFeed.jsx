// Chakra UI imports
import { Flex, Heading } from "@chakra-ui/react";

// Firebase imports
import { query, where, getDocs, collection, limit } from "firebase/firestore";

// Hook imports
import { useEffect, useState } from "react";
import { useFirestore } from "../firebase";

// Component imports
import HomePost from "./HomePost";

function ProfileFeed(props) {
  const [posts, setPosts] = useState([]);
  const db = useFirestore();

  useEffect(() => {
    if (!props.user) {
      return;
    }

    const myQuery = async () => {
      const q = query(
        collection(db, "Posts"),
        where("authorUsername", "==", props.user.username),
        limit(80)
      );
      const querySnapshot = await getDocs(q);
      let newPosts = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        newPosts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      newPosts.sort((post1, post2) => post2.datePosted - post1.datePosted);
      setPosts(newPosts);
    };

    myQuery();
  }, [props.user]);

  return (
    <>
      {props.user ? (
        posts.map((post) =>
          post.id ? (
            <HomePost key={post.id} {...post} user={props.user} />
          ) : (
            <HomePost key={post.newClientId} {...post} user={props.user} />
          )
        )
      ) : (
        <Flex py={12} align={"center"} justify={"center"}>
          <Heading size={"lg"}>This account does not exist.</Heading>
        </Flex>
      )}
    </>
  );
}

export default ProfileFeed;
