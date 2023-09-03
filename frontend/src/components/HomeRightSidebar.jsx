import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import { BiSearch } from "react-icons/bi";

import TrendsPanel from "./TrendsPanel";
import SuggestFollowPanel from "./SuggestFollowPanel";

function HomeRightSideBar(props) {
  return (
    <Flex
      ml={"40px"}
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
          pos={"sticky"} top={0}
        />
      </InputGroup>
      <TrendsPanel  />
      <SuggestFollowPanel user={props.user}/>
    </Flex>
  );
}

export default HomeRightSideBar;
