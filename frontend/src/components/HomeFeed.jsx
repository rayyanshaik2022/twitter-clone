import { Heading } from "@chakra-ui/react";
import HomePost from "./HomePost";

import { collection, getDocs } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore } from "../firebase";

function HomeFeed() {
  const [posts, setPosts] = useState([]);
  const db = useFirestore();

  useEffect(() => {
    const myQuery = async () => {
      const postsRef = collection(db, "Posts");
      const q = query(postsRef, orderBy("datePosted"), limit(20));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });

      console.log(q);
    };

    myQuery();
  }, []);

  return (
    <>
      <HomePost />

      <HomePost />
      <HomePost />
      <HomePost />
      <HomePost />
      <HomePost />
      <HomePost />
    </>
  );
}

export default HomeFeed;
