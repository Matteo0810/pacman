function createImage(url) {
    const image = new Image();
    image.src = url;
    return image;
}

const DIRECTION_LEFT = "left";
const DIRECTION_RIGHT = "right";
const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";
const DIRECTIONS = [DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN];

const COLOR = {
    YELLOW: "#FFF17D",
    ORANGE: "#F85548",
    BLUE: "#4CAFF7",
    PINK: "#e696c2",
    GREEN: "#339F76",
    DARK_STYLE: "#1d1635",
    GREY: "#D9E1EF"
}
