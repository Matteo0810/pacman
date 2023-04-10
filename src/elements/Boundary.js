class Boundary extends GameElement {

    constructor(x, y, image) {
        super(x, y);
        this.setX(this.getX()*this.getWidth());
        this.setY(this.getY()*this.getHeight());
        this._image = image;
    }

    collideWith(player, velocity) {
        const [vX, vY] = velocity;
        const margin = 1;
        const x = player.getX();
        const y = player.getY();
        const radius = player.getRadius();

        const rectWidth = this.getWidth()+ margin*2;
        const rectHeight = this.getHeight() + margin*2;

        if(player.getType() === "ghost" && this.getType() === "verticalSpawn")
            return false;

        let distX = Math.abs(x - this.getX() + vX -rectWidth / 2);
        let distY = Math.abs(y - this.getY() + vY - rectHeight / 2);

        if (distX > rectWidth / 2 + radius || distY > rectHeight / 2 + radius) {
            return false;
        }

        if (distX <= rectWidth / 2 || distY <= rectHeight / 2) {
            return true;
        }

        let dx = distX - rectWidth / 2;
        let dy = distY - rectHeight / 2;
        return dx * dx + dy * dy <= radius * radius;
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
