const DIRECTION_LEFT = "left";
const DIRECTION_RIGHT = "right";
const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";

class Ghost extends Player {

    constructor(x, y, color) {
        super(x, y, "ghost");
        this._color = color;

        this._lastDirection = DIRECTION_UP;
        this._vulnerable = false;
    }

    setVulnerable(vulnerable) {
        this._vulnerable = vulnerable;
    }

    isVulnerable() {
        return this._vulnerable;
    }

    goToHome() {
        // TODO les faire revenir au point de départ
    }

    getCollisions() {
        const collisions = [];
        const VELOCITY = this.getSpeed();

        boundaries.forEach(boundary => {
            if (!collisions.includes("right") && boundary.collideWith(this, [VELOCITY, 0]))
                collisions.push("right");
            if (!collisions.includes("left") && boundary.collideWith(this, [-VELOCITY, 0]))
                collisions.push("left");
            if (!collisions.includes("down") && boundary.collideWith(this, [0, VELOCITY]))
                collisions.push("down");
            if (!collisions.includes("up") && boundary.collideWith(this, [0, -VELOCITY]))
                collisions.push("up");
        });
        return collisions;
    }


    getRandomDirection() {
        const directions = [DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN];
        const randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }

    getOppositeDirection(direction) {
        switch (direction) {
            case DIRECTION_LEFT:
                return DIRECTION_RIGHT;
            case DIRECTION_RIGHT:
                return DIRECTION_LEFT;
            case DIRECTION_UP:
                return DIRECTION_DOWN;
            case DIRECTION_DOWN:
                return DIRECTION_UP;
            default:
                return "";
        }
    }

    getGhostMove() {
        const collisions = this.getCollisions();
        let direction = this.getRandomDirection();

        if(!collisions.includes(this._lastDirection))
            direction = this._lastDirection;

        while (collisions.includes(direction)) {
            let availableDirections = [DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN].filter((dir) => !collisions.includes(dir));
            availableDirections = availableDirections.filter((dir) => dir !== this.getOppositeDirection(this._lastDirection));
            if (availableDirections.length > 0)
                direction = availableDirections[Math.floor(Math.random() * availableDirections.length)];
            else
                direction = this.getOppositeDirection(this._lastDirection);
        }

        return direction;
    }

    move() {
        const VELOCITY = this.getSpeed();
        const direction = this.getGhostMove();
        switch(direction) {
            case "left":
                this.setVelocityY(0);
                this.setVelocityX(-VELOCITY);
                break;
            case "right":
                this.setVelocityY(0);
                this.setVelocityX(VELOCITY);
                break;
            case "up":
                this.setVelocityY(-VELOCITY);
                this.setVelocityX(0);
                break;
            case "down":
                this.setVelocityY(VELOCITY);
                this.setVelocityX(0);
                break;
        }
        this._lastDirection = direction;
    }

    collideWith(player) {
        if(player.getType() === "pacman") {
            const x = player.getX();
            const y = player.getY();
            const radius = player.getRadius();
            return y - radius <= this.getY()+this.getRadius() &&
                x + radius >= this.getX() &&
                y + radius >= this.getY() &&
                x - radius <= this.getX() + this.getRadius();
        }
        return false;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.getX(), this.getY(), this.getRadius(), 0, Math.PI*2);
        screen.useColor(this._color);
        context.fill();
        context.closePath();
    }

}
