import React from "react";
import Slider from "react-slick";

const ProductDetailImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
      <Slider {...settings}>
        {images &&
          images.map((image, i) => (
            <div key={i}>
              <img src={image} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default ProductDetailImageSlider;
