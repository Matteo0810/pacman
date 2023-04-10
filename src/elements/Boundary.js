class Boundary extends GameElement {

    constructor(x, y, image) {
        super(x, y);
        this.setX(this.getX()*this.getWidth());
        this.setY(this.getY()*this.getHeight());
        this._image = image;
    }

    collideWith(player, velocity) {
        const padding = 3;
        const [vX, vY] = velocity;
        const x = player.getX();
        const y = player.getY();
        const radius = player.getRadius()+padding;

        if(player.getType() === "ghost" && this.getType() === "verticalSpawn")
            return false;

        let distX = Math.abs(x + vX - this.getX() - this.getWidth() / 2);
        let distY = Math.abs(y + vY - this.getY() - this.getHeight() / 2);

        if (distX > (this.getWidth() / 2 + radius)) {
            return false;
        }
        if (distY > (this.getHeight() / 2 + radius)) {
            return false;
        }

        if (distX <= (this.getWidth() / 2)) {
            return true;
        }
        if (distY <= (this.getHeight() / 2)) {
            return true;
        }

        let dx = distX - this.getWidth() / 2;
        let dy = distY - this.getHeight() / 2;
        return (dx * dx + dy * dy <= (radius * radius));
    }

    getType() {
        const image = this._image.src.split("/").pop();
        return image.split(".")[0];
    }

    draw(context) {
        context.drawImage(
            this._image,
            this.getX(),
            this.getY(),
            this.getWidth(),
            this.getHeight()
        );
    }

}
