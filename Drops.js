class Particle{
  constructor(x = random(window.innerWidth),y = window.innerHeigh){
    //Creates Position Varible for droplet
    this.pos = createVector(x,y);
    this.umbrella = 100; //Desired distance from mouse position
    //Velocity
    this.vels = createVector(0,random(10,13)); //Velocity for slower drops
    this.velf = createVector(0,random(13,15)); //Velocity for faster drops
    this.moveForce = 100;
    //Random droplet Size
    this.pSize = random(4,8);
    this.pLength = this.pSize*4;
    //Set Color for drops
    this.alpha = random(50,150);
    this.color = [255,0,255,this.alpha];
  }
  //Updates Position of RainDrops
  update(){
    //Smaller Drops are slower than bigger or brighter ones
    if(this.pSize <= 6 || this.alpha < 100){
      this.pos.y += this.vels.y;
    }else{
      this.pos.y += this.velf.y;
    }
  }

  shield(){
    //Calculates the distance from mouse to raindrop
    this.distance = sqrt(sq(this.pos.x-mouseX)+sq(this.pos.y-mouseY));
    //If the droplet is within range of "umbrella," the droplet will move out of the way
    if(this.distance <= this.umbrella && mouseX > 5){
      if(this.pos.x < mouseX){
        this.pos.x -= this.moveForce;
      }else{
        this.pos.x += this.moveForce;
      }
    }
  }

  //Display Fucntion for drops in the sketch
  show(){
    noStroke();
    fill(this.color,255);
    ellipse(this.pos.x,this.pos.y,this.pSize,this.pLength);
  }
  //Returns true if droplet passes the bottom of the window
  isGone(){
    return this.pos.y > window.innerHeight;
  }
}
