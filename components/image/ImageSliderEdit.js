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

  const onDeleteImage = image => {
    console.log('omg', image);
  }

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
                    <Button
                      disabled={images?.length === 1 ? true : false}
                      onClick={() => onDeleteImage(image)}
                    >
                      Delete
                    </Button>
                  </Center>
                </div>
              ))}
          </Slider>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageSliderEdit;
