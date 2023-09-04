// Chakra UI imports
import { Flex, Heading } from "@chakra-ui/react";

// Firebase imports
import { doc, getDoc } from "firebase/firestore";

// Hook imports
import { useEffect, useState } from "react";
import { useFirestore } from "../firebase";

// Component imports
import HomePost from "./HomePost";

function HashtagFeed(props) {
  const [posts, setPosts] = useState([]);
  const db = useFirestore();

  useEffect(() => {
    const myQuery = async () => {
      const docRef = doc(db, "Hashtags", `#${props.hashtag}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let postList = docSnap.data().posts;
        let newPosts = [];
        for (let i = 0; i < Math.min(postList.length, 80); i++) {
          let postRef = doc(db, "Posts", postList[i]);
          let postSnap = await getDoc(postRef);
          newPosts.push({
            ...postSnap.data(),
            id: postRef.id,
          });
        }
        newPosts.sort((a, b) => b.datePosted.seconds - a.datePosted.seconds);
        setPosts(newPosts);
      }
    };

    myQuery();
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <HomePost key={post.id} {...post} user={props.user} />
        ))
      ) : (
        <Flex py={12} px={4} alignItems={"center"} justify={"center"}>
          <Heading size={"lg"}>There are no posts with this hashtag</Heading>
        </Flex>
      )}
    </>
  );
}

export default HashtagFeed;
