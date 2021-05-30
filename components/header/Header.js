import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const Links = ["About Us", "Delivery"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Header({ isAuth, shop }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const onLogout = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      console.log("done");
      router.push("/");
    } else {
      // setErrorMsg("Incorrect username or password. Try again!");
    }
  };

  return (
    <>
      <Box bg="#f8b735" boxShadow="sm" px={4} className="header-boxshadow">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            style={{ background: "transparent" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Nweoo Snacks</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {isAuth ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as="a"
                    href={`${shop?._id}/${shop?.shopname
                      ?.replace(/\s/g, "-")
                      .toLowerCase()}`}
                  >
                    Your Shop
                  </MenuItem>
                  <MenuItem as="a" href="/product/new">
                    Create Product
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={6}
              >
                <Button
                  as={"a"}
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  href="/login"
                >
                  Sign In
                </Button>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"pink.400"}
                  as="a"
                  href="/register"
                  _hover={{
                    bg: "pink.300",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
