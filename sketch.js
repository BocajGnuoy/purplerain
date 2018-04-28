let particles = []; //Stores all RainDrops
let distance; //Varible for Distance
let slider; //RainCount
let sliderWidth;//RainWidth
let dropAmt = 250;
let windowW = window.innerWidth;
let windowH = window.innerHeight;
let hWidth = windowW/2;
let onOffSwitch;
let amtPressed = 0;

//Runs first
function setup() {
  //New Canvas
  createCanvas(1280,1024);
  //Sliders for Rain settings & optimizations
  slider = createSlider(0,1000,dropAmt,10);
  slider.position(10,30);
  sliderWidth = createSlider(0,windowW/2,windowW/2,7);
  sliderWidth.position(10,80);
}
//Interval function loop
function draw() {
  background(0);
  purpleRain();
  fill(255);
  textSize(16);
  text("RainDrops: "+particles.length,12,25);
  text("RainWidth: "+sliderWidth.value(),12,75);
}
//Setup for displaying and running Purple Rain
function purpleRain(){
  let lightSwitch = document.getElementById("lightSwitch");
  var state = true;
  rainDisplay();
  giveOrTake();
}

function rainDisplay(){
  for(let i = particles.length-1; i > 0; i--){
    particles[i].shield();
    particles[i].update();
    particles[i].show();
    if(particles[i].isGone()){
      particles[i].pos.y = -particles[i].pSize;
      particles[i].pos.x = random(hWidth-sliderWidth.value(),hWidth+sliderWidth.value());
    }
  }
}

function giveOrTake(){
  if(lightSwitchAlg()){
    if(particles.length < slider.value()){
      for(let i = 0; i < slider.value() - particles.length; i++){
        let part1 = new Particle(random(hWidth-sliderWidth.value(),(windowW/2)+sliderWidth.value()),windowH/2);
        let part2 = new Particle(random(hWidth-sliderWidth.value(),(windowW/2)+sliderWidth.value()),windowH/2);
        let part3 = new Particle(random(hWidth-sliderWidth.value(),(windowW/2)+sliderWidth.value()),10);
        particles.push(part1);
        particles.push(part2);
        particles.push(part3);
      }
    }
    if(particles.length > slider.value()){
      particles.splice(slider.value());
    }
  }else{
    particles.splice(0);
  }
}

function lightSwitchAlg(){
  dropAmt = slider.value();
  if(amtPressed%2 === 0){
    lightSwitch.innerHTML = "Rain On";
    state = true;
  }else{
    lightSwitch.innerHTML = "Rain Off";
    state = false;
  }
  return state;
}

function increase(){
  amtPressed++;
}
