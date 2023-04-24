const COLORS = {
  white_100: "white",
  black_100: "black",
};

const SHADOWS = {
  s: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  m: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  l: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
};

const TYPOGRAPHY = {
  xl: {
    fontFamily: "EduSABeginner-Regular",
    fontWeight: 700,
    fontSize: 50,
  },
  lg: {
    fontFamily: "EduSABeginner-Regular",
    fontWeight: 700,
    fontSize: 40,
  },
  m: {
    fontFamily: "EduSABeginner-Regular",
    fontWeight: 600,
    fontSize: 30,
  },
  sm: {
    fontFamily: "EduSABeginner-Regular",
    fontWeight: 500,
    fontSize: 25,
  },
  xs: {
    fontFamily: "EduSABeginner-Regular",
    fontWeight: 500,
    fontSize: 20,
  },
};

export { TYPOGRAPHY, SHADOWS, COLORS };
