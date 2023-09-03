import { Text, Flex, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TextContent(props) {

    const navigate = useNavigate();

  const splitByAtWords = (str) => {
    if (!str) {
      return []
    }
    const regex = /(@\w+)/g;
    return str.split(regex);
  };

  const tagParse = (text, index) => {
    if (text.startsWith("@")) {
      return (
        <Link
          color={"blue.400"}
          display={"inline"}
          key={text + index}
          fontSize={18}
          onClick={() => navigate(`/profile/${text.substring(1)}`)}
        >
          {text}
        </Link>
      );
    } else {
      return (
        <Text display={"inline"} key={text + index} fontSize={18}>
          {text}
        </Text>
      );
    }
  };

  const [splitText] = useState(splitByAtWords(props.text));

  return (
    <Flex gap={"4px"} justifyContent={"start"} w={"100%"}>
      {splitText.map((word, index) => tagParse(word, index))}
    </Flex>
  );
}

export default TextContent;