/*
  This is your site JavaScript code - you can add interactivity!
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎");

/* 
Make the "Click me!" button move when the visitor clicks it:
- First add the button to the page by following the steps in the TODO 🚧
*/
const btn = document.querySelector("button"); // Get the button from the page
if (btn) { // Detect clicks on the button
  btn.onclick = function () {
    // The 'dipped' class in style.css changes the appearance on click
    btn.classList.toggle("dipped");
  };
}


// ----- GLITCH STARTER PROJECT HELPER CODE -----

// Open file when the link in the preview is clicked
let goto = (file, line) => {
  window.parent.postMessage(
    { type: "glitch/go-to-line", payload: { filePath: file, line: line } }, "*"
  );
};
// Get the file opening button from its class name
const filer = document.querySelectorAll(".fileopener");
filer.forEach((f) => {
  f.onclick = () => { goto(f.dataset.file, f.dataset.line); };
});



// -------------------------------------------------------------------------------------

  //motion event
// DeviceMotionEvent.requestPermission()
// .then(response => {
//   if (response == 'granted') {
//     window.addEventListener('devicemotion', handleMotion, true);
//   }
// })
// .catch(console.error)
let check_touch = false
let average_accel = 0;

touchArea.addEventListener('touchend', function(event) {
  check_touch = false
});

touchArea.addEventListener('touchstart', function(event) {
  check_touch = true
});

function incrementEventCount(event){
  let counterElement = document.getElementById("num-observed-events")
  let eventCount = parseInt(counterElement.innerHTML)
  counterElement.innerHTML = eventCount + 1;
  average_accel = event.acceleration.x + event.acceleration.y + event.acceleration.z

}

function handleMotion(event) {
  // updateFieldIfNotNull('Accelerometer_gx', event.accelerationIncludingGravity.x);
  // updateFieldIfNotNull('Accelerometer_gy', event.accelerationIncludingGravity.y);
  // updateFieldIfNotNull('Accelerometer_gz', event.accelerationIncludingGravity.z);

  // updateFieldIfNotNull('Accelerometer_x',);
  // updateFieldIfNotNull('Accelerometer_y', );
  // updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);
  if (check_touch) {
    console.log("X: " +  event.acceleration.x);
    console.log("Y: " +  event.acceleration.y);
    console.log("Z: " +  event.acceleration.z);
    incrementEventCount(event);

    
  }
  
  return 0;



  // updateFieldIfNotNull('Accelerometer_i', event.interval, 2);

  // updateFieldIfNotNull('Gyroscope_z', event.rotationRate.alpha);
  // updateFieldIfNotNull('Gyroscope_x', event.rotationRate.beta);
  // updateFieldIfNotNull('Gyroscope_y', event.rotationRate.gamma);
  
}

function reset_input(){

}

function handleOrientation(event) {
  // updateFieldIfNotNull('Orientation_a', event.alpha);
  // updateFieldIfNotNull('Orientation_b', event.beta);
  // updateFieldIfNotNull('Orientation_g', event.gamma);
  console.log("X: " +  event.alpha);
  console.log("Y: " +  event.beta);
  console.log("Z: " +  event.gamma);
  if (event.alpha == 90){
    reset_input()
  }
  // incrementEventCount();
}

window.addEventListener('deviceorientation', function(event) {
  //console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
  handleOrientation(event);
});

window.addEventListener('devicemotion', function(event) {
  //console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
  if (check_touch){
    handleMotion(event);
  } else {

  }
});

