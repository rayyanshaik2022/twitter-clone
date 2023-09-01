import {
  collectionGroup,
  query,
  where,
  getDocs,
  collection,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore } from "../firebase";

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
        where("country", "in", props.user.posts),
        limit(20)
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
      setPosts(newPosts);
    };

    myQuery();
  }, [props.user]);

  return (
    <>
      {posts.map((post) => (
        <HomePost key={post.id} {...post} />
      ))}
    </>
  );
}

export default ProfileFeed;
