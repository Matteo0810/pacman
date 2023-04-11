let startX, startY, endX, endY;
class Pacman extends Player {

    constructor(x, y) {
        super(x, y, "pacman");
        this.setControllers();

        this._action = DIRECTION_RIGHT;
        this._radians = .75;
        this._openRate = .12;
        this._rotation = 0;
    }

    setControllers() {
        window.addEventListener("touchstart", event => {
            startX = event.touches[0].pageX;
            startY = event.touches[0].pageY;
        }, false);
        window.addEventListener("touchend", event => {
            endX = event.changedTouches[0].pageX;
            endY = event.changedTouches[0].pageY;

            const distanceX = endX - startX;
            const distanceY = endY - startY;

            if (Math.abs(distanceX) > Math.abs(distanceY)) {
                if (distanceX > 0)
                    this._action = DIRECTION_RIGHT;
                else
                    this._action = DIRECTION_LEFT;
            } else {
                if (distanceY > 0)
                    this._action = DIRECTION_DOWN;
                else
                    this._action = DIRECTION_UP;
            }
        }, false);
        window.addEventListener("keydown", ({ key }) => {
            if(key === "z" || key === "ArrowUp") {
                this._action = DIRECTION_UP;
            } else if(key === "q" || key === "ArrowLeft") {
                this._action = DIRECTION_LEFT;
            } else if(key === "s" || key === "ArrowDown") {
                this._action = DIRECTION_DOWN;
            } else if(key === "d" || key === "ArrowRight") {
                this._action = DIRECTION_RIGHT;
            }
        }, false);
    }

    update(context) {
        if(this.getVelocityX() > 0)
            this._rotation = 0;
        else if(this.getVelocityY() > 0)
            this._rotation = Math.PI/2;
        else if(this.getVelocityX() < 0)
            this._rotation = Math.PI;
        else if(this.getVelocityY() < 0)
            this._rotation = Math.PI*1.5;

        super.update(context);
        if(this._radians < 0 || this._radians > .75)
            this._openRate = -this._openRate;
        this._radians += this._openRate;
    }

    move() {
        this.setVelocityY(0);
        this.setVelocityX(0);
        const VELOCITY = this.getSpeed();

        if(this._action === DIRECTION_RIGHT) {
            for(const boundary of boundaries) {
                if(boundary.collideWith(this, [VELOCITY, 0])) {
                    this.setVelocityX(0);
                    break;
                } else
                    this.setVelocityX(VELOCITY);
            }
        } else if(this._action === DIRECTION_LEFT) {
            for(const boundary of boundaries) {
                if(boundary.collideWith(this, [-VELOCITY, 0])) {
                    this.setVelocityX(0);
                    break;
                } else
                    this.setVelocityX(-VELOCITY);
            }
        } else if(this._action === DIRECTION_DOWN) {
            for(const boundary of boundaries) {
                if(boundary.collideWith(this, [0, VELOCITY])) {
                    this.setVelocityY(0);
                    break;
                } else
                    this.setVelocityY(VELOCITY);
            }
        } else if(this._action === DIRECTION_UP) {
            for(const boundary of boundaries) {
                if(boundary.collideWith(this, [0, -VELOCITY])) {
                    this.setVelocityY(0);
                    break;
                } else
                    this.setVelocityY(-VELOCITY);
            }
        }
    }

    draw(context) {
        context.save();
        context.translate(this.getX(), this.getY());
        context.rotate(this._rotation);
        context.translate(-this.getX(), -this.getY());
        context.beginPath();
        context.arc(
            this.getX(),
            this.getY(),
            this.getRadius(),
            this._radians,
            Math.PI * 2 - this._radians
        )
        context.lineTo(this.getX(), this.getY());
        screen.useColor("yellow");
        context.fill();
        context.closePath();
        context.restore();
    }

}
