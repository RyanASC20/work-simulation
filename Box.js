class Box {
    constructor(startX, startY, mass, theta, uk, rampLength) {
        this.moving = true;
        this.startX = startX;
        this.startY = startY;
        this.g = 9.81;
        this.pos = createVector(0, 0);
        this.mass = mass;
        this.size = 50;
        this.theta = theta;
        this.acceleration = this.g * sin(theta);
        this.velocity = 0;
        this.h = (rampLength) * sin(theta);
        this.PE = this.mass * this.g * this.h;
        this.ME = this.PE;
        this.KE = 0;
        this.friction =
            Math.abs(uk * this.g * cos(this.theta)) < this.acceleration
                ? uk * this.g * cos(this.theta)
                : this.acceleration;
    }

    distTraveled() {
        return dist(this.startX, this.startY, this.pos.x, this.pos.y);
    }

    calculateEnergies() {
        this.PE = this.mass * this.g * this.h;
        this.KE = this.ME - this.PE;
    }

    draw() {
        square(this.pos.x, this.pos.y - this.size, this.size);
    }

    update() {
        if (this.h > 0) {
            this.calculateEnergies();
            this.h = (rampLength - this.distTraveled()) * sin(theta);

            this.velocity += (this.acceleration - this.friction) / 60;
            // console.log(this.acceleration, this.friction)
            this.pos.x += this.velocity;
        } else {
            this.h = 0;
            this.calculateEnergies();
            this.moving = false;
        }
    }
}
