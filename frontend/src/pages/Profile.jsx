// Chakra UI imports
import {
  Grid,
  Flex,
  Text,
  Box,
  Heading,
  Image,
  VStack,
  HStack,
  Icon,
  Button,
  useMediaQuery,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

// Firebase imports
import {
  getDoc,
  doc,
  query,
  getDocs,
  where,
  collection,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

// Hook imports
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useFirestore } from "../firebase";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

// Component imports
import HomeLeftSidebar from "../components/HomeLeftSidebar";
import HomeRightSideBar from "../components/HomeRightSidebar";
import ProfileFeed from "../components/ProfileFeed";

// Icon imports
import { BiCalendarHeart, BiLocationPlus } from "react-icons/bi";

function Profile() {
  const { authUser } = useUser();
  let { username } = useParams();
  const [user, setUser] = useState(null);
  const [myUser, setMyUser] = useState(null);

  const [profileUsername, setProfileUsername] = useState("");
  const [profileDisplayName, setProfileDisplayName] = useState("");
  const [profileLocation, setProfileLocation] = useState("");
  const [saveProfileIsLoading, setSaveProfileIsLoading] = useState(false);

  const [isLargerThan1280W] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan1020W] = useMediaQuery("(min-width: 1020px)");
  const [isLargerThan500W] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan420W] = useMediaQuery("(min-width: 420px)")
  const db = useFirestore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getGridColumns = () => {
    if (isLargerThan1280W) {
      return "repeat(3, 1fr)";
    } else if (isLargerThan1020W) {
      return "minmax(84px, 1fr) minmax(460px, 1fr) minmax(320px, 3fr)";
    } else if (isLargerThan420W) {
      return "minmax(84px, 1fr) minmax(320px, 6fr)";
    } else {
      return "minmax(64px, 1fr) minmax(320px, 6fr)";
    }
  };

  const profileSaveIsDisabled = useMemo(() => {
    return (
      user &&
      profileUsername == user.username &&
      profileDisplayName == user.displayName &&
      profileLocation == user.location
    );
  }, [profileUsername, profileDisplayName, profileLocation, user]);

  const onClickSaveProfile = async () => {
    setSaveProfileIsLoading(true);
    const functions = getFunctions();
    const updateProfile = httpsCallable(functions, "updateProfile");
    const result = await updateProfile({
      username: profileUsername,
      displayName: profileDisplayName,
      location: profileLocation,
    });
    setSaveProfileIsLoading(false);
    onClose();

    if (result.data.username) {
      setUser({ ...user, username: profileUsername });
    }

    if (result.data.displayName) {
      setUser({ ...user, displayName: profileDisplayName });
    }

    if (result.data.location) {
      setUser({ ...user, location: profileDisplayName });
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (username != undefined) {
          const q = query(
            collection(db, "Users"),
            where("username", "==", username)
          );

          const querySnapshot = await getDocs(q);
          // Should only be 1
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setUser(doc.data());
          });

          return;
        }
        const docRefUser = doc(db, "Users", authUser.uid);
        const docSnap = await getDoc(docRefUser);

        if (!docSnap.exists()) {
          return;
        }

        const userData = docSnap.data();
        setUser(userData);

        setProfileUsername(userData.username);
        setProfileDisplayName(userData.displayName);
        setProfileLocation(userData.location);
      } catch (e) {
        console.log("ERROR", e);
      }
    };

    const getAuthData = async () => {
      try {
        const docRefUser = doc(db, "Users", authUser.uid);
        const docSnap = await getDoc(docRefUser);

        if (!docSnap.exists()) {
          return;
        }

        const userData = docSnap.data();
        setMyUser({ ...userData, id: docRefUser.id });
      } catch (e) {
        console.log("ERROR", e);
      }
    };

    if (!authUser) {
      return;
    }

    getData();
    getAuthData();
  }, [authUser]);

  if (!authUser) {
    return <>Loading Home...</>;
  }

  return (
    <>
      <Grid
        templateColumns={getGridColumns()}
        p={0}
        overscrollBehavior={"contain"}
      >
        <HomeLeftSidebar user={user} />
        <Box
          w={"100%"}
          minH={"100vh"}
          borderLeft={"1px solid"}
          borderLeftColor={"gray.300"}
          borderRight={"1px solid"}
          borderRightColor={"gray.300"}
        >
          <Box
            w={"100%"}
            p={4}
            borderBottom={"1px solid"}
            borderBottomColor={"gray.300"}
            bg={"whiteAlpha.500"}
            backdropFilter={"blur(6px)"}
            pos={"sticky"}
            top={0}
            zIndex={2}
          >
            <Heading as={"h1"} size={"md"}>
              {user ? user.displayName : "@" + username}
            </Heading>
            <Text color={"gray.500"}>
              {user ? user.posts.length + " posts" : "0 posts"}
            </Text>
          </Box>
          <Flex
            w={"100%"}
            flexDir={"column"}
            pos={"relative"}
            borderBottom={"1px solid"}
            borderBottomColor={"gray.300"}
          >
            <Box w={"100%"} bg={"gray.200"} h={"190px"}></Box>
            <Box
              w={"100%"}
              bg={"white"}
              h={"190px"}
              display={"flex"}
              justifyContent={"end"}
              pos={"relative"}
            >
              <Flex
                mt={"auto"}
                w={"100%"}
                px={4}
                flexDir={"column"}
                color={"gray.600"}
                py={2}
                pos={"relative"}
              >
                <VStack alignItems={"start"} gap={0}>
                  <Heading as={"h1"} size={"md"} color={"black"}>
                    {user ? user.displayName : "@" + username}
                  </Heading>
                  <Text>{user ? "@" + user.username : null}</Text>
                </VStack>
                {user ? (
                  <HStack gap={4} mt={3}>
                    <HStack gap={1}>
                      <Icon as={BiLocationPlus} boxSize={5} />
                      <Text>{user ? user.location : "Home sweet home"}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={BiCalendarHeart} boxSize={5} />
                      <Text>
                        Joined{" "}
                        {user
                          ? new Date(
                              user.joinDate.toDate().toString()
                            ).toDateString()
                          : "Some time ago..."}
                      </Text>
                    </HStack>
                  </HStack>
                ) : null}
                <HStack gap={5} mt={2}>
                  <HStack gap={1}>
                    <Text color={"black"} fontWeight={"600"}>
                      {user ? user.following.length : 0}
                    </Text>
                    <Text>Following</Text>
                  </HStack>
                  <HStack gap={1}>
                    <Text color={"black"} fontWeight={"600"}>
                      {user ? user.followers.length : 0}
                    </Text>
                    <Text>Followers</Text>
                  </HStack>
                </HStack>
              </Flex>
              {user && user.uid == authUser.uid ? (
                <Button
                  pos={"absolute"}
                  top={4}
                  right={4}
                  justifySelf={"start"}
                  borderRadius={"100px"}
                  variant={"outline"}
                  onClick={onOpen}
                >
                  Edit Profile
                </Button>
              ) : null}
            </Box>
            {user ? (
              <Image
                pos={"absolute"}
                left={4}
                top={isLargerThan500W ? 0 : -14}
                bottom={0}
                my={"auto"}
                boxSize={28}
                borderRadius={"100%"}
                bg={"blue.400"}
                src={user.photoURL}
              />
            ) : (
              <Box
                pos={"absolute"}
                left={4}
                top={0}
                bottom={0}
                my={"auto"}
                boxSize={28}
                borderRadius={"100%"}
                bg={"blue.400"}
              ></Box>
            )}
          </Flex>
          <ProfileFeed user={user} />
        </Box>

        {isLargerThan1020W ? (
          <HomeRightSideBar user={myUser} setUser={setUser} />
        ) : null}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={"700"}>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap={8}>
              {user && !user.usernameChange ? (
                <FormControl variant="floating" id="username-input" isRequired>
                  <Input
                    placeholder=" "
                    value={profileUsername}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (/^[a-zA-Z0-9]+$/.test(newValue)) {
                        setProfileUsername(newValue);
                      }
                    }}
                    maxLength={16}
                  />
                  {/* It is important that the Label comes after the Control due to css selectors */}
                  <FormLabel>Username</FormLabel>
                  <FormErrorMessage>
                    Your username must be letters and numbers
                  </FormErrorMessage>
                  <Text pl={2} color={"red.400"}>
                    Your username can only be changed once
                  </Text>
                </FormControl>
              ) : null}

              <FormControl
                variant="floating"
                id="display-name-input"
                isRequired
              >
                <Input
                  placeholder=" "
                  value={profileDisplayName}
                  maxLength={20}
                  pattern={"/^.{1,20}$/"}
                  onChange={(e) => setProfileDisplayName(e.target.value)}
                />
                {/* It is important that the Label comes after the Control due to css selectors */}
                <FormLabel>Display Name</FormLabel>
              </FormControl>

              <FormControl variant="floating" id="location-input" isRequired>
                <Input
                  placeholder=" "
                  value={profileLocation}
                  maxLength={32}
                  pattern={"/^.{1,32}$/"}
                  onChange={(e) => setProfileLocation(e.target.value)}
                />
                {/* It is important that the Label comes after the Control due to css selectors */}
                <FormLabel>Location</FormLabel>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClickSaveProfile}
              isDisabled={profileSaveIsDisabled}
              isLoading={saveProfileIsLoading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile;
