import { Text, Flex, Link, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TextContent(props) {
  const navigate = useNavigate();
  const [isLargerThan420W] = useMediaQuery("(min-width: 420px)");

  const splitBoth = (str) => {
    if (!str) {
      return [];
    }
    const regex = /(@\w+|#\w+)|(\S+)/g;
    return str.split(regex);
  };

  const tagParse = (text, index) => {
    if (!text) {
      return;
    }
    if (text.startsWith("@")) {
      return (
        <Link
          className="no-redirect"
          color={"blue.400"}
          display={"inline"}
          key={text + index}
          fontSize={isLargerThan420W ? 18 : 16}
          onClick={() => {
            navigate(`/profile/${text.substring(1)}`);
            window.location.reload();
          }}
        >
          {text}
        </Link>
      );
    } else if (text.startsWith("#")) {
      return (
        <Link
          className="no-redirect"
          color={"blue.400"}
          fontWeight={"500"}
          display={"inline"}
          key={text + index}
          fontSize={isLargerThan420W ? 18 : 16}
          onClick={() => {
            navigate(`/hashtag/${text.substring(1)}`);
            window.location.reload();
          }}
        >
          {text}
        </Link>
      );
    } else {
      return (
        <Text
          display={"inline"}
          key={text + index}
          fontSize={isLargerThan420W ? 18 : 16}
          wordBreak={"break-all"}
        >
          {text}
        </Text>
      );
    }
  };

  const [splitText] = useState(splitBoth(props.text));

  return (
    <Flex gap={"3px"} justifyContent={"start"} w={"100%"} flexWrap={"wrap"}>
      {splitText.map((word, index) => tagParse(word, index))}
    </Flex>
  );
}

export default TextContent;
