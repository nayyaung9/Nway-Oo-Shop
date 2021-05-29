import React from "react";
import Slider from "react-slick";
import ProductItemCard from "./ProductItemCard";
import { Heading } from "@chakra-ui/react";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button className={className} style={{ ...style }} onClick={onClick}>
      Next
    </button>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

const ProductHorizontalList = ({ title, products }) => {
  var settings = {
    speed: 700,
    infinite: true,
    slidesToShow: 3,
    swipeToSlide: true,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <React.Fragment>
      <Heading as="h5" size="sm">
        {title || "Products"}
      </Heading>
      <Slider {...settings}>
        {products &&
          products.map((product, i) => (
            <ProductItemCard key={i} product={product} />
          ))}
      </Slider>
    </React.Fragment>
  );
};

export default ProductHorizontalList;
