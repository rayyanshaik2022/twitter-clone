import {
  Flex,
  Icon,
  Heading,
  Text,
  Button,
  Center,
  Link,
} from "@chakra-ui/react";

import { auth, provider } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const onClickLogin = (e) => {
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

        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        console.log(error);
      });
  };
  return (
    <>
      <Flex flexDir={"column"} alignItems={"center"} py={20}>
        <Flex
          pos={"relative"}
          flexDir={"column"}
          gap={6}
          border={"1px solid"}
          borderColor={"gray.200"}
          borderRadius={"50px"}
          px={20}
          py={32}
        >
          <Icon as={FaTwitter} boxSize={14} color={"blue.300"} />
          <Heading>Log in to Twitter</Heading>
          <Button
            mt={6}
            w={"320px"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
            borderRadius={"100px"}
            onClick={onClickLogin}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
          <Text pos={"absolute"} bottom={6} right={20}>
            <Link href="/sign-up" color={"blue.400"}>
              Sign up to Twitter
            </Link>
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
