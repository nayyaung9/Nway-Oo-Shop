import React from "react";
import { FormControl, FormLabel, InputGroup } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

import { useRef } from "react";

const MultipleFileUpload = ({ productImages, setProductImages }) => {
  const inputRef = useRef();

  const onProductImagesUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (inputRef.current.files[0]) {
      formData.append("productImage", inputRef.current.files[0]);

      const res = await fetch("/api/productImage", {
        method: "PATCH",
        body: formData,
      });
      if (res.status === 200) {
        const data = await res.json();
        console.log("data", data.image);
        setProductImages([...productImages, data.image]);
        // setMsg({ message: 'Profile updated' });
      } else {
        // setMsg({ message: await res.text(), isError: true });
      }
    }
  };

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="writeUpFile">Product Images</FormLabel>
      <InputGroup>
        <label htmlFor="productImage">
          <input
            type="file"
            id="productImage"
            name="productImage"
            accept="image/png, image/jpeg, image/jpg"
            ref={inputRef}
            onChange={onProductImagesUpload}
          />
        </label>
      </InputGroup>
      {/* <FormErrorMessage>
        {invalid}
      </FormErrorMessage> */}
    </FormControl>
  );
};

export default MultipleFileUpload;
