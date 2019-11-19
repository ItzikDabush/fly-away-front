const sizes = {
  xs: "0px",
  sm: "600px",
  md: "960px",
  lg: "1280px",
  xl: "1920px"
};

export default {
  minWidth(size) {
    return `@media (min-width: ${sizes[size]})`;
  },
  maxWidth(size) {
    return `@media (max-width: ${sizes[size]})`;
  }
};
