class GameElement {

    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = 40;
        this._height = 40;
    }

    draw(context) {}

    getWidth(){
        return this._width
    }

    getHeight() {
        return this._height;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    setX(x) {
        this._x = x;
    }

    setY(y) {
        this._y = y;
    }

}
