import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  Divider,
  Link,
} from "@chakra-ui/react";
import Router from "next/router";
import { useCurrentUser } from "@/hooks/index";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://askbootstrap.com/preview/swiggiweb/img/popular4.png",
  },
  {
    name: "Segun Adebayo",
    url: "https://askbootstrap.com/preview/swiggiweb/img/trending1.png",
  },
  {
    name: "Kent Dodds",
    url: "https://askbootstrap.com/preview/swiggiweb/img/trending2.png",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://askbootstrap.com/preview/swiggiweb/img/popular1.png",
  },
  {
    name: "Christian Nwamba",
    url: "https://askbootstrap.com/preview/swiggiweb/img/popular2.png",
  },
];

export default function Register() {
  const [state, setState] = useState({
    shopname: "",
    email: "",
    fullname: "",
    password: "",
    phoneNumber: "",
  });
  const [user, { mutate }] = useCurrentUser();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace("/");
  }, [user]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { shopname, email, fullname, password, phoneNumber } = state;
    const userPayload = {
      email,
      fullname,
      password,
    };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userPayload),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      const shopPayload = {
        shopname,
        phoneNumber,
        shopOwnerId: userObj?.user?._id,
      };

      const createShop = await fetch("/api/shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shopPayload),
      });

      if (createShop.status === 201) {
        mutate(userObj);
      }
    } else {
      setErrorMsg(await res.text());
    }
  };
  return (
    <Box position={"relative"}>
      <Head>
        <title>Register | Nweoo Snacks</title>
      </Head>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Our Hero CDMers's Snacks{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Homemade Bread
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              width={useBreakpointValue({ base: "44px", md: "60px" })}
              height={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Create Virtual Store
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              We’re looking for CDMers's Homemade Bread
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Shop name"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                value={state.shopname}
                onChange={(e) =>
                  setState({ ...state, shopname: e.target.value })
                }
              />
              <Input
                placeholder="Your full name"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                value={state.fullname}
                onChange={(e) =>
                  setState({ ...state, fullname: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
              <Input
                placeholder="Shop Contact Number"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                value={state.phoneNumber}
                onChange={(e) =>
                  setState({ ...state, phoneNumber: e.target.value })
                }
              />

              <Input
                placeholder="Password"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />

              <Divider />

              <Input
                placeholder="Facebook Page Link"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />
            </Stack>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
              mt="4"
            >
              <Link color={"blue.400"} as="a" href="/login">
                Already member?
              </Link>
            </Stack>
            <Button
              type="button"
              onClick={onFormSubmit}
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Create Store
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};