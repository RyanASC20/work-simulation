class EnergyBar {
    constructor(x, y, h, color) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = 60;
        this.color = color;
    }

    update(d) {
        this.h = -d / 50;
    }

    draw() {
        push();
        strokeWeight(0);
        fill(this.color)
        rect(this.x, this.y, this.w, this.h)
        pop();
    }
}