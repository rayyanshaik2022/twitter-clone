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
import { useMediaQuery } from "@chakra-ui/react";

import { auth, provider } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const onClickSignUp = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...'
        navigate("/home");
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  const [isLargerThan880] = useMediaQuery('(min-height: 800px)')

  return (
    <>
      <Grid gridTemplateColumns={{ base: "1fr", lg: "5.8fr 4.2fr" }}>
        <Flex
          w={"100%"}
          h={"100vh"}
          bg={"blue.300"}
          justifyContent={"center"}
          alignItems={"center"}
          display={{ base: "none", lg: "flex" }}
        >
          <Icon as={FaTwitter} boxSize={80} color={"white"} />
        </Flex>
        <Flex
          flexDir={"column"}
          px={8}
          py={isLargerThan880 ? 48 : 12}
          gap={8}
          align={{ base: "center", lg: "initial" }}
        >
          <Icon as={FaTwitter} boxSize={10} color={"blue.300"} />
          <Heading as={"h1"} size={"3xl"}>
            Happening Now
          </Heading>
          <Heading as={"h2"}>Join Twitter today</Heading>
          <Button
            mt={6}
            w={"320px"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
            borderRadius={"100px"}
            onClick={onClickSignUp}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
          <Text mt={-2} fontSize={"sm"} w={"300px"}>
            This website is a mockup of twitter and is intended to be used as a
            personal project
          </Text>
          <Text mt={-4}>
            Already have an account?{" "}
            <Link href="/log-in" color={"blue.400"}>
              Log in
            </Link>
          </Text>
        </Flex>
      </Grid>
    </>
  );
}

export default Signup;
