// Chakra UI imports
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useMediaQuery,
} from "@chakra-ui/react";

// Icon imports
import { BiSearch } from "react-icons/bi";

// Component imports
import TrendsPanel from "./TrendsPanel";
import SuggestFollowPanel from "./SuggestFollowPanel";

function HomeRightSideBar(props) {
  const [isLargerThan1280W] = useMediaQuery("(min-width: 1280px)");
  return (
    <Flex
      ml={isLargerThan1280W ? "40px" : "16%"}
      mr={"auto"}
      w={"320px"}
      h={14}
      gap={4}
      flexDir={"column"}
      pt={6}
      pb={2}
      pos={"sticky"}
      top={0}
    >
      {/* <InputGroup >
        <InputLeftElement pointerEvents="none" mt={"9px"} ml={"5px"}>
          <BiSearch color="gray.300" size={20} />
        </InputLeftElement>
        <Input type="tel" placeholder="Search Twitter" _placeholder={{}} borderRadius={"100px"} h={14} />
      </InputGroup> */}
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          mt={"4px"}
          ml={"6px"}
          color="gray.600"
        >
          <BiSearch fontSize={"22px"} />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Search Twitter"
          _placeholder={{ color: "gray.500" }}
          borderRadius={"100px"}
          size={"lg"}
          bg={"gray.100"}
          focusBorderColor="blue.300"
          pos={"sticky"}
          top={0}
        />
      </InputGroup>
      <TrendsPanel />
      <SuggestFollowPanel user={props.user} setUser={props.setUser} />
    </Flex>
  );
}

export default HomeRightSideBar;
