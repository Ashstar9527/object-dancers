/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new AshleyDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class AshleyDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.t = 0;
    this.starPhases = [0, PI, PI * 0.5, PI * 1.5, PI * 2, PI * 2.5];
    this.starX = [80, 80, 70, 70, 60, 60];
    this.starY = [26, 26, 20, 20, 14, 14];
    this.starSize = [7, 6, 5, 4, 3, 2];
    this.starSpd = [1, 1, 1.6, 1.6, 2, 2];
  }

  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.t += 0.03;
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    // Ghost dancer body
    let t = this.t;
    let rise = sin(t) * 7;
    let rott = sin(t) * 10;
    
    push();
      translate(0, rise);
      rotate(radians(rott));

      // Body
      fill(120, 75, 220);
      beginShape();
      vertex(0, -30);
      vertex(16, -4);
      vertex(0, 22);
      vertex(-16, -4);
      endShape(CLOSE);

      // Torso
      noStroke();
      fill(75, 35, 160, 230);
      beginShape();
      vertex(0, -40);
      vertex(30, 10);
      vertex(0, 62);
      vertex(-30, 10);
      endShape(CLOSE);

      // Head
      fill(200, 180, 255);
      beginShape();
      vertex(0, -80);
      vertex(16, -60);
      vertex(0, -40);
      vertex(-16, -60);
      endShape(CLOSE);

      // Eyes
      fill(50, 20, 90);
      let blink = sin(t * 3) ;
      if (blink > 0.94) {
        ellipse(-5, -60, 4, 1);
        ellipse(5, -60, 4, 1);
      } else {
        ellipse(-5, -60, 4, 4);
        ellipse(5, -60, 4, 4);
      }

      // Arms
      let wave = sin(t * 2) * 18;
      fill(100, 55, 190);
      push();
        translate(-30, -10 + wave);
        rotate(radians(-30 + wave));
        beginShape()
        vertex(0, -18);
        vertex(6, 0);
        vertex(0, 18);
        vertex(-6, 0);
        endShape(CLOSE);
      pop()

      push();
        translate(30, -10 - wave);
        rotate(radians(30 - wave));
        beginShape()
        vertex(0, -18);
        vertex(6, 0);
        vertex(0, 18);
        vertex(-6, 0);
        endShape(CLOSE);
      pop()

      // Orbit stars
      for (let i = 0; i < 6; i++) {
        let angle = t * this.starSpd[i] + this.starPhases[i];
        let sx = cos(angle) * this.starX[i];
        let sy = sin(angle) * this.starY[i];
        let depth = sin(angle);
        let sz = this.starSize[i] * map(depth, -1, 1, 0.6, 1);
        let alpha = map(depth, -1, 1, 60, 220);

        fill(255, 215, 90, alpha);
        noStroke();
        push();
        translate(sx, sy);
        rotate(angle * 1.5);
        beginShape()
        vertex(0, -sz * 1.5);
        vertex(sz, 0);
        vertex(0, sz * 1.5);
        vertex(-sz, 0);
        endShape(CLOSE);
        pop();
      }
    pop();
    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/