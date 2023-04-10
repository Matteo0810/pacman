class CanvasScreen {

    constructor() {
        this._canvas = document.getElementById("frame");
        this._context = this._canvas.getContext("2d");
    }

    getCanvas() {
        return this._canvas;
    }

    getContext() {
        return this._context;
    }

    useColor(color) {
        this._context.fillStyle = color;
    }

    clear() {
        const {width, height} = this._canvas;
        this._context.clearRect(0, 0, width, height);
    }

    setBackground(color) {
        const {width, height} = this._canvas;
        this.drawRect(color, 0, 0, width, height);
    }

    drawRect(color, x, y, width, height) {
        this.useColor(color);
        this._context.fillRect(x, y, width, height);
    }

    drawText(text, size, color, x, y) {
        this._context.font = `${size}px pacfont`;
        this.useColor(color);
        this._context.fillText(text, x, y);
    }

}
