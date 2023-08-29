import {
  Grid,
  Flex,
  Icon,
  Heading,
  Text,
  Button,
  Center,
  Link
} from "@chakra-ui/react";

import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  return (
    <>
      <Grid gridTemplateColumns={"5.8fr 4.2fr"}>
        <Flex
          w={"100%"}
          h={"100vh"}
          bg={"blue.300"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Icon as={FaTwitter} boxSize={80} color={"white"} />
        </Flex>
        <Flex flexDir={"column"} px={8} py={48} gap={8}>
          <Icon as={FaTwitter} boxSize={10} color={"blue.300"} />
          <Heading as={"h1"} size={"3xl"}>
            Happening Now
          </Heading>
          <Heading as={"h2"}>Join Twitter today</Heading>
          <Button mt={6} w={"320px"} variant={"outline"} leftIcon={<FcGoogle />} borderRadius={"100px"}>
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
          <Text mt={-2} fontSize={"sm"} w={"300px"}>This website is a mockup of twitter and is intended to be used as a personal project</Text>
          <Text mt={-4}>Already have an account? <Link href="/" color={"blue.400"}>Log in</Link></Text>
        </Flex>
      </Grid>
    </>
  );
}

export default Signup;
