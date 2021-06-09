import {
  HStack,
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

const ProductSkeleton = () => {
  return (
    <Box padding="6" bg="white">
      <HStack>
        <Box>
          <Skeleton height="120px" width="120px" />
        </Box>
        <Box flex="1">
          <SkeletonText noOfLines="3" />
        </Box>
      </HStack>
    </Box>
  );
};

export default ProductSkeleton;
