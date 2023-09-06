// Chakra UI imports
import { Flex, VStack, Heading, Text } from "@chakra-ui/react";

// Firebase imports
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

// Hook imports
import { useEffect, useState } from "react";
import { useFirestore } from "../firebase";
import { useNavigate } from "react-router-dom";

function TrendsPanel() {
  const [hashtags, setHashtags] = useState([]);
  const db = useFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "Hashtags"),
        orderBy("postCount", "desc"),
        limit(4)
      );

      const querySnapshot = await getDocs(q);

      let newHashtags = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        newHashtags.push(doc.data());
      });

      setHashtags(newHashtags);
    };

    getData();
  }, []);

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
        {"What's Happening"}
      </Heading>

      {hashtags.map((hashtag, index) =>
        hashtag.postCount && index < 3 ? (
          <VStack alignItems={"start"} gap={0} key={hashtag.hashtag}>
            <Text fontSize={"sm"} color={"gray.500"}>
              Trending
            </Text>
            <Heading
              as={"h2"}
              fontSize={"lg"}
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                navigate(`/hashtag/${hashtag.hashtag.substring(1)}`);
                window.location.reload();
              }}
            >
              {hashtag.hashtag}
            </Heading>
            <Text fontSize={"sm"} color={"gray.500"}>
              {hashtag.postCount} Tweets
            </Text>
          </VStack>
        ) : null
      )}
    </Flex>
  );
}
export default TrendsPanel;
