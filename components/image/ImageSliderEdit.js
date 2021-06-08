import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
} from "@chakra-ui/react";
import Slider from "react-slick";

const ImageSliderEdit = ({ images, setProductImages, isOpen, onClose }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const onDeleteImage = async (image) => {
    const res = await fetch(`/api/image/delete/n5xxbydeht6tkpur5bkz`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    console.log(res);

    if (res.status === 200) {
      const userObj = await res.json();
      console.log("ans", userObj);
    } else {
     console.log()
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product Images</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Slider {...settings}>
            {images &&
              images.map((image, i) => (
                <div key={i}>
                  <img
                    src={image}
                    style={{
                      width: 150,
                      height: 150,
                      objectFit: "contain",
                      margin: "20px auto",
                    }}
                  />
                  <Center mt="10">
                    <Button onClick={() => onDeleteImage(image)}>Delete</Button>
                  </Center>
                </div>
              ))}
          </Slider>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={images?.length === 1 ? true : false}
            variant="ghost"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageSliderEdit;
