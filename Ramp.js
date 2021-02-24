class Ramp {
    constructor(x1, y1, len) {
        this.x1 = x1;
        this.y1 = y1;
        this.len = len * 20;
    }

    draw() {
        push();
        strokeWeight(5);
        line(0, 0, this.x1 + this.len, this.y1);
        pop();
    }
}
