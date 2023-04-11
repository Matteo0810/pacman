class Ghost extends Player {

    constructor(x, y, color) {
        super(x, y, "ghost");
        this._color = color;

        this._lastDirection = DIRECTION_RIGHT;
        this._isGoingOut = false;
        this._vulnerable = false;

        this.goOut();
    }

    setVulnerable(vulnerable) {
        this._vulnerable = vulnerable;
    }

    isVulnerable() {
        return this._vulnerable && !ghostKilled.includes(this);
    }

    goToHome() {
        this.setToInitialPosition();
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.goOut();
    }

    goOut() {
        this._isGoingOut = true;
        if(this._color === COLORS.RED ||this._color === COLORS.ORANGE) {
            this.setVelocityY(-this.getSpeed());
            setTimeout(() => {
                this.setVelocityY(0);
                this._isGoingOut = false;
            }, 420);
        } else if(this._color === COLORS.PINK) {
            this.setVelocityX(-this.getSpeed());
            setTimeout(() => {
                this.setVelocityX(0);
                this.setVelocityY(-this.getSpeed());
                setTimeout(() => {
                    this.setVelocityY(0);
                    this._isGoingOut = false;
                }, 420);
            }, 300);
        } else if(this._color === COLORS.BLUE) {
            this.setVelocityX(this.getSpeed());
            setTimeout(() => {
                this.setVelocityX(0);
                this.setVelocityY(-this.getSpeed());
                setTimeout(() => {
                    this.setVelocityY(0);
                    this._isGoingOut = false;
                }, 420);
            }, 300);
        }
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
        const randomIndex = Math.floor(Math.random() * DIRECTIONS.length);
        return DIRECTIONS[randomIndex];
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

        if (!collisions.includes(this._lastDirection))
            direction = this._lastDirection;
        while (collisions.includes(direction)) {
            let availableDirections = DIRECTIONS.filter((dir) => !collisions.includes(dir));
            availableDirections = availableDirections.filter((dir) => dir !== this.getOppositeDirection(this._lastDirection));
            if (availableDirections.length > 0)
                direction = availableDirections[Math.floor(Math.random() * availableDirections.length)];
            else
                direction = this.getOppositeDirection(this._lastDirection);
        }

        return direction;
    }

    move() {
        if(this._isGoingOut)
            return;
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
        screen.useColor(this.isVulnerable() ? "#2121ff" : this._color);
        context.fill();
        context.closePath();
    }

}
