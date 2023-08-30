import {
  Grid,
  Flex,
  Icon,
  Heading,
  Text,
  Button,
  Center,
  Link,
} from "@chakra-ui/react";

import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <>
      <Flex flexDir={"column"} alignItems={"center"} py={20}>
        <Flex flexDir={"column"} gap={6} border={"1px solid"} borderColor={"gray.200"} borderRadius={"50px"} px={20} py={32}>
          <Icon as={FaTwitter} boxSize={14} color={"blue.300"} />
          <Heading>Log in to Twitter</Heading>
          <Button
            mt={6}
            w={"320px"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
            borderRadius={"100px"}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
