const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 1999, min: 1200 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1199, min: 600 },
    items: 3,
  },
  mobile2: {
    breakpoint: { max: 599, min: 421 },
    items: 2,
  },
  mobile1: {
    breakpoint: { max: 420, min: 0 },
    items: 1,
  },
};

export const carouselOptions = {
  responsive: responsive,
  swipeable: false,
  draggable: false,
  keyBoardControl: true,
  itemClass: "carousel-item-padding-40-px",
};
