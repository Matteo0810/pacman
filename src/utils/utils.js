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

const COLORS = {
    RED: "#de0602",
    BLUE: "#09b4da",
    PINK: "#e696c2",
    ORANGE: "#e49601"
}
