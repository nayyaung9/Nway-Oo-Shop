import Link from "next/link";
import {
  Box,
  Flex,
  Avatar,
  HStack,
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { theme } from "@/utils/theme";
import SearchInput from "../search/SearchInput";
import { IoPersonOutline, IoSearch } from "react-icons/io5";
import React from "react";

export default function Header({ isAuth, shop }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const onLogout = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log("res", res);
    if (res.status === 204) {
      router.reload();
    } else {
      // setErrorMsg("Incorrect username or password. Try again!");
    }
  };

  return (
    <header className="nweoo-snacks-header">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          style={{ background: "transparent" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack
          as="nav"
          pl="15"
          pr="15"
          alignItems={"center"}
          display={{ base: "center", md: "flex" }}
        >
          <Box>
            <Link href="/">
              <img src="/default/nweoo-logo.png" style={{ width: 160 }} />
            </Link>
          </Box>
        </HStack>
        <Box
          width="full"
          display={{ base: "none", md: "flex" }}
          style={{ justifyContent: "center" }}
        >
          <SearchInput />
        </Box>

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
            >
              {/* <IconButton
                aria-label="Person_SignIn"
                icon={<IoSearch />}
                display={{ base: "flex", md: "none" }}
              /> */}

              <Link href="/login">
                <Button leftIcon={<IoPersonOutline />} variant="solid">
                  Account
                </Button>
              </Link>
            </Stack>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Drawer onClose={onClose} isOpen={isOpen} size="full">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{`drawer contents`}</DrawerHeader>
            <DrawerBody>Menu will come here</DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : null}
    </header>
  );
}
