import React from "react";
import { HStack } from "@chakra-ui/react";

import { useRef } from "react";

const MultipleFileUpload = ({
  productImages,
  setProductImages,
  setProductImageLoading,
}) => {
  const inputRef = useRef();

  const onProductImagesUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (inputRef.current.files[0]) {
      formData.append("productImage", inputRef.current.files[0]);
      setProductImageLoading(true);
      const res = await fetch("/api/productImage", {
        method: "PATCH",
        body: formData,
      });
      if (res.status === 200) {
        const data = await res.json();
        setProductImageLoading(false);
        setProductImages([...productImages, data.image]);
        // setMsg({ message: 'Profile updated' });
      } else {
        // setMsg({ message: await res.text(), isError: true });
        setProductImageLoading(false);
      }
    }
  };

  return (
    <HStack>
      
        <label htmlFor="productImage">
          <input
            type="file"
            id="productImage"
            name="productImage"
            accept="image/png, image/jpeg, image/jpg"
            disabled={productImages && productImages.length >= 5 ? true : false}
            ref={inputRef}
            onChange={onProductImagesUpload}
          />
        </label>   
    </HStack>
  );
};

export default MultipleFileUpload;
