import Link from "next/link";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function StoreListBanner() {
  return (
    <Flex
      w={"full"}
      h={"40vh"}
      backgroundImage={
        "url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            Nweoo Shop's Official Stores
          </Text>
          <Stack direction={"row"}>
            <Link href="/register">
              <Button
                bg="#fed700"
                rounded={"full"}
                color={"black"}
                _hover={{ bg: "#f2d638" }}
              >
                Become Seller
              </Button>
            </Link>
            <Button
              bg={"whiteAlpha.300"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500" }}
            >
              Contact Us
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
