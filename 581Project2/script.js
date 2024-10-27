const redDice = 'R';
const blueDice = 'B';
const greenDice = 'G';



const mixCup = document.getElementById('mixCup');
const dragItems = document.querySelectorAll('.drag-item');

//once item is clicked 
dragItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

mixCup.addEventListener('dragover', dragOver);
mixCup.addEventListener('drop', dropItem);

function dragStart(e) {
  const itemId = e.currentTarget.id;  // Use e.currentTarget.id to get the div's ID
  console.log(`Dragging item with ID: ${itemId}`);  //debugging
  e.dataTransfer.setData('text', itemId);
}

function dragOver(e) {
  e.preventDefault();
  console.log('Dragging over the mixCup.'); //debug
}

function dropItem(e) {
  notifyShake();
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text'); //get id of dragged item
  console.log(`Dropping item with ID: ${itemId}`); // debug
  
  const item = document.getElementById(itemId); //store the item id
  
  //debugging
  if (!item) {
    console.error(`Item with ID ${itemId} not found.`);
    return;
  }
  
  // Continue with cloning and positioning the item
  const clonedItem = item.cloneNode(true);  //create clone 
  clonedItem.classList.add('merging'); // Add the merging class for animation
  
  const mixCupRect = mixCup.getBoundingClientRect();  //get properties the mixcup 
  const itemRect = item.getBoundingClientRect();  //get properties of item 
  
  clonedItem.style.position = 'absolute'; //set cloned item absolute 
  clonedItem.style.top = `${mixCupRect.top - itemRect.height / 2}px`; //align item above the mixup 
  
  document.body.appendChild(clonedItem);  //add the cloned item on screen for animation 
  
  setTimeout(() => {
    clonedItem.remove();  //remove the cloned item 
    shakeMixer('moderate'); //this funtion should only be called when user start to shake, added this for testing
  }, 1000);
}


//TODO shaking function 
//gyroscope data handiling for intinsity identifier (this can be another separate func )
function shakeItem(){

}

//shake text functions --------------------
const shakeText =  document.getElementById("shake_notification") 
//notification to shake
function notifyShake(){
setTimeout( () => {
shakeText.classList.add('open');
}, 1000);
}

//remove once user starts shaking phone
function removeShake(){
  shakeText.classList.remove('open');

}
//------------------------------------------
//function to trigger shake animation based on intensity 
function shakeMixer(intensity) {
  const mixCup = document.getElementById('mixCup');
  
  // Remove any existing shake class
  mixCup.classList.remove('shake-low', 'shake-moderate', 'shake-extreme');
  
  // Apply the appropriate shake class based on intensity
  if (intensity === 'low') {
    mixCup.classList.add('shake-low');
  } else if (intensity === 'moderate') {
    mixCup.classList.add('shake-moderate');
  } else if (intensity === 'extreme') {
    mixCup.classList.add('shake-extreme');
  }
}
//-------------------------------------------------------------
 
let check_touch = false
let event_count = 0
let average_accel = 0;
let total_accel = 0;
let classify = 0;

document.getElementById('touch').innerHTML = check_touch

window.addEventListener('touchend', function(event) {
  check_touch = false
  document.getElementById('touch').innerHTML = check_touch
  average_accel = total_accel / event_count
  document.getElementById('AverageAccel').innerHTML = average_accel;
  document.getElementById('TotalAccel').innerHTML = total_accel;
  document.getElementById('EventCount').innerHTML = event_count;
  if (average_accel<=20) {
    classify = 0;
    
  } else if (average_accel<30){
    classify = 1;
  } else {
    classify = 2;
  }
  document.getElementById('Classify').innerHTML = classify;
  average_accel = 0;
  event_count = 0;
  total_accel = 0;
  
});

window.addEventListener('touchstart', function(event) {
  check_touch = true
  document.getElementById('touch').innerHTML = check_touch
});



function updateFieldIfNotNull(fieldName, value, precision=10){
  if (value != null)
    document.getElementById(fieldName).innerHTML = value.toFixed(precision);
}



function handleMotion(event) {
  updateFieldIfNotNull('Accelerometer_gx', event.acceleration.x);
  updateFieldIfNotNull('Accelerometer_gy', event.acceleration.y);
  updateFieldIfNotNull('Accelerometer_gz', event.acceleration.z);

  // updateFieldIfNotNull('Accelerometer_x',);
  // updateFieldIfNotNull('Accelerometer_y', );
  // updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);
  if (check_touch) {
    total_accel = Math.abs(event.acceleration.x) + Math.abs(event.acceleration.y) + total_accel;
    // console.log("X: " +  event.acceleration.x);
    // console.log("Y: " +  event.acceleration.y);
    // console.log("Z: " +  event.acceleration.z);
    event_count ++ ; 
  }
}

function reset_input(){
  average_accel = 0;
  event_count = 0;
  total_accel = 0;
  document.getElementById('AverageAccel').innerHTML = average_accel;
  document.getElementById('TotalAccel').innerHTML = total_accel;
  document.getElementById('EventCount').innerHTML = event_count;
}

function handleOrientation(event) {
  updateFieldIfNotNull('Orientation_a', event.alpha);
  updateFieldIfNotNull('Orientation_b', event.beta);
  updateFieldIfNotNull('Orientation_g', event.gamma);
  // console.log("X: " +  event.alpha);
  // console.log("Y: " +  event.beta);
  // console.log("Z: " +  event.gamma);
  if ((event.beta < 0 && event.gamma>50) || (event.beta < 0 && event.gamma<-50)){
    reset_input()
  }
  // incrementEventCount();
}

window.addEventListener('deviceorientation', function(event) {
  handleOrientation(event);
});

window.addEventListener('devicemotion', function(event) {
  handleMotion(event);

});

