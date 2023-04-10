class Dot extends GameElement {

    constructor(x, y) {
        super(x, y);
        this.setX(this.getX()*this.getWidth() + this.getWidth()/2);
        this.setY(this.getY()*this.getHeight() + this.getHeight()/2);
        this._radius = 5;
    }

    setRadius(radius) {
        this._radius = radius;
    }

    getRadius() {
        return this._radius;
    }

    getType() {
        return "normal";
    }

    collideWith(pacman) {
        const x = pacman.getX();
        const y = pacman.getY();
        const radius = pacman.getRadius();

        return y - radius <= this.getY()+this.getRadius() &&
            x + radius >= this.getX() &&
            y + radius >= this.getY() &&
            x - radius <= this.getX() + this.getRadius()
    }

    draw(context) {
        screen.drawRect("#FFB7AE", this.getX(), this.getY(), this.getRadius(), this.getRadius());
    }

}
