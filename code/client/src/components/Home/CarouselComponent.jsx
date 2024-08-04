// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './Home.css';
// import CarouselImageData from './CarouselImageData';

// export default function ImageCarousel() {
//   const settings = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//   };

//   const blockStyles = {
//     display: 'block',
//     width: '100%',
//     maxHeight: '45vh',
//     boxSizing: "border-box",
//   };

//   return (
//     <div className='carousel-section'>
//       <Slider {...settings} className="carousel">
//         {CarouselImageData.map((image) => (
//           <div key={image.id} className="carousel-item">
//             <img style={blockStyles} src={image.src} alt={image.alt} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }
