class Cat {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 10;
    this.maxspeed = 8;
    this.maxforce = 2.5;
  }
  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  arrive(target) {
    var desired = p5.Vector.sub(target, this.position);
    // A vector pointing from the location to the target
    let d = desired.mag();

    if (d < 100) {
      let m = map(d, 0, 100, 0, maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(maxspeed);
    }

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    // Limit to maximum steering force

    this.applyForce(steer);
  }

  eat(list) {
    let record = Infinity;
    let closest = -1;
    for (let i = 0; i < list.length; i++) {
      //let d = this.position.dist(list[i]);
      let d = dist(this.position.x, this.position.y, list[i].x, list[i].y); 
      //same as the line above
      if (d < record) {
        record = d;
        closest = i;
      }
    }
    if (record < 10) {
      //this.maxspeed = 3;
      list.splice(closest, 1);//if you are close to the mouse, then remove it from the array
    } else if (closest > -1) {
      this.seek(list[closest]);//else seek for another one
    }
  }

  findClosest(list) {
    //trying to manipulate with the speed to round up to 3s but I did not
    //manage to do that
    var d;
    for (let i = 0; i < list.length; i++) {
      d = dist(this.position.x, this.position.y, list[i].x, list[i].y);
      if (d < 10) {
        this.maspeed = 6;
      } else if (d < 30) {
        this.maxspeed = 4;
      } else if (d < 50) {
        this.maspeed = 2;
      } else {
        this.maxspeed = 8;
      }
    }
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
  }

  display() {
    // Draw a triangle rotated in the direction of velocity
    // let theta = this.velocity.heading() + PI / 2;
    // fill(125,0,0);
    // stroke(200);
    // strokeWeight(1);
    push();
    imageMode(CENTER);
    image(catPng, this.position.x, this.position.y);
    translate(this.position.x, this.position.y);
    // rotate(theta);
    // beginShape();
    // vertex(0, -this.r * 2);
    // vertex(-this.r, this.r * 2);
    // vertex(this.r, this.r * 2);
    // endShape(CLOSE);
    pop();
  }

  boundaries() {
    let desired = null;
    let d = 10;

    if (this.position.x < d) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }
}
