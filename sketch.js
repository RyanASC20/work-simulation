const height = window.innerHeight;
const width = window.innerWidth * 0.8;
const startX = 100;
const startY = 250;
let running = false;
let b1,
    r1,
    KE,
    PE,
    boxMass,
    theta,
    rampLength,
    angleInput,
    massInput,
    kFrictionInput,
    rampLengthInput,
    submit,
    time;

function displayData(PE, KE, v) {
    text(`PE: ${Math.round(PE)}N`, width - 270, height - 100);
    text(`KE: ${Math.round(KE)}N`, width - 270, height - 120);
    text(
        `Speed: ${Math.round(Math.sqrt((2 * b1.KE) / b1.mass))} m/s`,
        width - 270,
        height - 80
    );

    // text(`Time: ${Math.round(time / 60)}s`, width - 270, height - 60);s
}

function setValues() {
    theta = (parseFloat(angleInput.value()) * PI) / 180;
    boxMass = parseFloat(massInput.value());
    rampLength = rampLengthInput.value()
    r1 = new Ramp(0, 0, rampLength);
    b1 = new Box(0, 0, boxMass, theta, kFrictionInput.value(), rampLength);
    KE = new EnergyBar(width - 200, height - 180, 300, "green");
    PE = new EnergyBar(width - 270, height - 180, 300, "red");
}

function controls() {
    const anglePrompt = createElement("h4", "Angle of ramp: ");
    anglePrompt.position(20, 5);

    angleInput = createSlider(0, 90, 30, 1);
    angleInput.position(anglePrompt.x + 160, anglePrompt.y + 20);
    angleInput.changed(setValues);

    const massPrompt = createElement("h4", "Mass of Box: ");
    massPrompt.position(20, 40);

    massInput = createInput(10, "number");
    massInput.position(massPrompt.x + 160, massPrompt.y + 20);
    massInput.size(40, 20);
    massInput.changed(setValues);


    const kFrictionPrompt = createElement("h4", "μk: ");
    kFrictionPrompt.position(20, 75);

    kFrictionInput = createInput(0, "number");
    kFrictionInput.size(40, 20);
    kFrictionInput.position(kFrictionPrompt.x + 160, kFrictionPrompt.y + 20);
    kFrictionInput.changed(setValues);

    const rampLengthPrompt = createElement("h4", "Length: ")
    rampLengthPrompt.position(20, 110);

    rampLengthInput = createInput(0.83 * height, "number");
    rampLengthInput.size(40, 20);
    rampLengthInput.position(rampLengthPrompt.x + 160, rampLengthPrompt.y + 20);
    rampLengthInput.changed(setValues);

    submit = createButton("Run");
    submit.position(rampLengthPrompt.x, rampLengthPrompt.y + 60);
    submit.size(60, 26);
    submit.mousePressed(function () {
        running = true;
        time = 0;
    });

    const resetButton = createButton("Reset");
    resetButton.position(submit.x + 70, submit.y);
    resetButton.size(60, 26);
    resetButton.mousePressed(reset);

    const stopButton = createButton("Stop");
    stopButton.position(resetButton.x + 70, resetButton.y);
    stopButton.size(60, 26);
    stopButton.mousePressed(function() { running = false });
}

function reset() {
    running = false;
    // theta = (parseFloat(angleInput.value()) * PI) / 180;
    // boxMass = parseFloat(massInput.value());
    // r1 = new Ramp(0, 0, rampLength);
    // b1 = new Box(0, 0, boxMass, theta, kFrictionInput.value(), rampLength);
    // KE = new EnergyBar(width - 200, 180, 300, "green");
    // PE = new EnergyBar(width - 270, 180, 300, "red");
    setValues();
}

function setup() {
    createCanvas(width, height);
    controls();
    setValues();
    const KELabel = createElement("h4", "KE");
    KELabel.position(KE.x + 5, KE.y + 5);

    const PELabel = createElement("h4", "PE");
    PELabel.position(PE.x + 5, PE.y + 5);


    
}

function draw() {
    background(255);
    text(angleInput.value(), angleInput.x + 130, angleInput.y + 5);

    push();

    translate(startX, startY);
    rotate(theta);

    b1.draw();
    r1.draw();
    if (running) {
        b1.update();
        // time++;
    }
    pop();

    KE.update(b1.KE);
    KE.draw();
    PE.update(b1.PE);
    PE.draw();
    displayData(b1.PE, b1.KE, b1.velocity);

    if (b1.moving) {
        time++;
    } else {
        running = false;
    }
}
