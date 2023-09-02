import { useEffect, useState } from "react";
import { useFirestore } from "../firebase";
import { query, where, getDocs, collection, limit } from "firebase/firestore";

import PostComment from "./PostComment";

function CommentFeed(props) {
  const [comments, setComments] = useState([]);
  const db = useFirestore();

  useEffect(() => {
    if (!props.post) {
      console.log(props.post);
      return;
    }
    const myQuery = async () => {
      const q = query(
        collection(db, "Comments"),
        where("postId", "==", props.post.id),
        limit(30)
      );
      const querySnapshot = await getDocs(q);
      let newComments = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        newComments.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      newComments.sort((a, b) => b.datePosted.seconds - a.datePosted.seconds);
      setComments(newComments);
    };

    myQuery();
  }, [props.post]);
  return (
    <>
      {comments.map((comm) => (
        <PostComment comment={comm} key={comm.id} />
      ))}
    </>
  );
}

export default CommentFeed;
