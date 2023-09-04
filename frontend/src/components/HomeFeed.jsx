// Firebase imports
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

// Hook imports
import { useEffect, useState } from "react";
import { useFirestore } from "../firebase";

// Compoent imports
import HomePost from "./HomePost";

function HomeFeed(props) {
  const [posts, setPosts] = useState([]);
  const db = useFirestore();

  useEffect(() => {
    const myQuery = async () => {
      const postsRef = collection(db, "Posts");
      const q = query(postsRef, orderBy("datePosted", "desc"), limit(80));

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
  }, []);

  useEffect(() => {
    if (!props.pushPost) {
      return;
    }

    setPosts([props.pushPost, ...posts]);
    props.setPushPost(null);
  }, [props.pushPost]);

  return (
    <>
      {posts.map((post) =>
        post.id ? (
          <HomePost key={post.id} {...post} user={props.user} />
        ) : (
          <HomePost key={post.id} {...post} user={props.user} />
        )
      )}
    </>
  );
}

export default HomeFeed;
