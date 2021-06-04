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
  Text,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { theme } from "@/utils/theme";

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
      <Box boxShadow="sm" px={4} className="header-boxshadow">
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
            <Box>
              <Text
                textAlign={"center"}
                fontFamily={"heading"}
                fontWeight="bold"
                color={theme.secondaryColor}
              >
                Nweoo Snacks
              </Text>
            </Box>
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
          {/* <HStack spacing={8} alignItems={"center"}>
            <InputGroup size="md"  style={{ flex: 1 }}>
              <Input pr="4.5rem" type="text" placeholder="Enter password" />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm">
                  show
                </Button>
              </InputRightElement>
            </InputGroup>
          </HStack> */}

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
                      shop?.storeProfile
                        ? shop?.storeProfile
                        : "./default/shop-default-profile.png"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as="a"
                    href={`/${shop?._id}/${shop?.shopname
                      ?.replace(/\s/g, "-")
                      .toLowerCase()}`}
                  >
                    Your Shop
                  </MenuItem>
                  <MenuItem as="a" href="/product/new">
                    Create Product
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href={`/${shop && shop._id}/${
                      shop && shop.shopname.replace(/\s/g, "-").toLowerCase()
                    }/setting`}
                  >
                    Store Setting
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
                  bg={theme.secondaryColor}
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
