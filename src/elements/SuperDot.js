class SuperDot extends Dot {

    constructor(x, y) {
        super(x, y);
        this.setRadius(15);
    }

    getType() {
        return "power-up";
    }

}
