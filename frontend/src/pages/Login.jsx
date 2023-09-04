// Chakra UI imports
import {
  Flex,
  Icon,
  Heading,
  Text,
  Button,
  Center,
  Link,
} from "@chakra-ui/react";

// Firebase imports
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

// Icon imports
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// Hook imports
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const onClickLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
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
          px={{ base: 8, lg: 20 }}
          py={{ base: 20, lg: 32 }}
        >
          <Icon as={FaTwitter} boxSize={14} color={"blue.300"} />
          <Heading>Log in to Twitter</Heading>
          <Button
            mt={6}
            w={{ base: "240px", lg: "320px" }}
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
