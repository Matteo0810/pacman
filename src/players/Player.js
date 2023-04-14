class Player {

    constructor(x, y, type) {
        this._width = 40;
        this._height = 40;
        this._type = type;

        this._x = x*this._width + this._width/2;
        this._y = y*this._height + this._height/2;

        this._initialX = this._x;
        this._initialY = this._y;

        this._speed = 3;
        this._velocityX = 0;
        this._velocityY = 0;

        this._radius = 14;
    }

    setToInitialPosition() {
        this.setX(this.getInitialX());
        this.setY(this.getInitialY());
    }

    getType() {
        return this._type;
    }

    getRadius() {
        return this._radius;
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    getSpeed() {
        return this._speed;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    getInitialX() {
        return this._initialX;
    }

    getInitialY() {
        return this._initialY;
    }

    setX(x) {
        this._x = x;
    }

    setY(y) {
        this._y = y;
    }

    getVelocityX() {
        return this._velocityX;
    }

    getVelocityY() {
        return this._velocityY;
    }

    setVelocityX(velocityX) {
        this._velocityX = velocityX;
    }

    setVelocityY(velocityY) {
        this._velocityY = velocityY;
    }

    update(context) {
        this.move();
        this.draw(context);

        this.setX(this.getX()+this.getVelocityX());
        this.setY(this.getY()+this.getVelocityY());
    }

    detectTeleportation() {
        if(this.getX() < 20)
            this.setX(screen.getCanvas().width-20);
        else if(this.getX() >= screen.getCanvas().width-20)
            this.setX(20);
    }

    move() {}

    draw(context) {}

}
