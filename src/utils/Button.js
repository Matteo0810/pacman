class Button {

    constructor(text, color, width, height) {
        this._text = text;
        this._color = color;
        this._width = width;
        this._height = height;
        this._stroke = false;
    }

    click(canvas, callback) {
        canvas.addEventListener('click', event => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX-rect.left;
            const y = event.clientY-rect.top;

            if (y > this._y && y < this._y + this._height
                && x > this._x && x < this._x + this._width) {
                callback();
            }
        });
        return this;
    }

    setStroke(stroke) {
        this._stroke = stroke;
        return this;
    }

    setPosition(x, y) {
        this._x = x;
        this._y = y;
        return this;
    }

    centerElement(canvas) {
        const {width, height} = canvas;

        const x = width/2 - this._width/2;
        const y = height/2 - this._height/2;
        this._x = x;
        this._y = y;
        return this;
    }

    draw(screen) {
        if(this._stroke) {
            const context = screen.getContext();
            context.beginPath();
            context.rect(this._x, this._y, this._width, this._height);
            context.fillStyle = "black";
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = this._color;
            context.stroke();
            context.closePath();
        }

        screen.drawText(
            this._text, 15,
            this._color,
            this._x+(this._width/2)-55,
            this._y+(this._height/2)+8
        );
    }

}
