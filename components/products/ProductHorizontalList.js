import React from "react";
import Slider from "react-slick";
import ProductItemCard from "./ProductItemCard";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const ProductHorizontalList = () => {
  var settings = {
    speed: 500,
    infinite: true,
    slidesToShow: 3,
    // slidesToScroll: 3,
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

  var items = [
    "https://askbootstrap.com/preview/swiggiweb/img/popular4.png",
    "https://askbootstrap.com/preview/swiggiweb/img/trending1.png",
    "https://askbootstrap.com/preview/swiggiweb/img/trending2.png",
    "https://askbootstrap.com/preview/swiggiweb/img/popular1.png",
    "https://askbootstrap.com/preview/swiggiweb/img/popular2.png",
    "https://askbootstrap.com/preview/swiggiweb/img/popular3.png",
    "https://askbootstrap.com/preview/swiggiweb/img/popular4.png",
    "https://askbootstrap.com/preview/swiggiweb/img/popular5.png",
    "https://askbootstrap.com/preview/swiggiweb/img/popular6.png",
  ];
  return (
    <div>
      <Slider {...settings}>
        {items &&
          items.map((item, i) => <ProductItemCard key={i} id={i + 1} image={item} />)}
      </Slider>
    </div>
  );
};

export default ProductHorizontalList;
