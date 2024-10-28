//Dice identifiers
const redDice = 'R';
const blueDice = 'B';
const greenDice = 'G';
let digit = ''; 
let curr_Item = 'item0';
// Define the correct PIN sequence
const correctSequence = ['RRlow', 'Bmoderate', 'Glow'];
let userSequence = []; // Store user's current sequence
let shakeEnabled = true; // Control variable to manage shaking
let check_touch = false
let event_count = 0
let average_accel = 0;

let total_accel = 0;
let classify = 'slow';
let sum = 0;
let numOfDice = 0;
let house_sum = 0;
let dice_touch = false;

document.getElementById('touch').innerHTML = curr_Item
document.getElementById('shake_touch').innerHTML = check_touch


// HTML elements for drag and drop
const mixCup = document.getElementById('mixCup');
const dragItems = document.querySelectorAll('.drag-item');

// Once item is clicked
dragItems.forEach(item => {
  
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('touchstart',clickStart);
  item.addEventListener('touchend',clickEnd);
});

mixCup.addEventListener('dragover', dragOver);
mixCup.addEventListener('drop', dropItem);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example: Get a random integer between 1 and 10
//----------------------------------------------------------------------------------------------------
// Function to handle drag start
function clickStart(e){ // copied logic for drag but changed the event handler
  e.preventDefault();
  shakeEnabled = true;
  itemId = e.currentTarget.id;
  console.log(`Dragging item with ID: ${itemId}`);
  dice_touch = true  
  document.getElementById('touch').innerHTML = dice_touch
}
//----------------------------------------------------------------------------------------------------

function clickEnd(e){ // copied logic for drag but changed the event handler
  dice_touch = false  
  numOfDice = getRandomInt(1, 6);
  sum += numOfDice;
  
  document.getElementById('dice').innerHTML = numOfDice;
  document.getElementById('touch').innerHTML = dice_touch;
  
  
  document.getElementById('touch').innerHTML = JSON.stringify(e);
  //let itemId = JSON.stringify(e); 
  //recordAction(itemId); //putting which dice into dice sequence, this is done because the if statements for itemId do not work

  const item = document.getElementById(itemId); 
  
  if (!item) {
    console.error(`Item with ID ${itemId} not found.`);
    return;
  }
  

  // Map dragged item to corresponding dice and update the sequence
  if (itemId === 'item1') {
    recordAction(redDice);
  } else if (itemId === 'item2') {
    recordAction(blueDice);
  } else if (itemId === 'item3') {
    recordAction(greenDice);
  }
  
  // Clone and animate item
  const clonedItem = item.cloneNode(true);
  clonedItem.classList.add('merging');
  const mixCupRect = mixCup.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  clonedItem.style.position = 'absolute';
  clonedItem.style.top = `${mixCupRect.top - itemRect.height / 2}px`;
  document.body.appendChild(clonedItem);
  
}
//----------------------------------------------------------------------------------------------------

function dragStart(e) {
  // Enable shaking when starting a new attempt

  shakeEnabled = true;
  const itemId = e.currentTarget.id;
  console.log(`Dragging item with ID: ${itemId}`);
  check_touch = true  
  document.getElementById('touch').innerHTML = check_touch
  
  e.dataTransfer.setData('text', itemId);
}
//----------------------------------------------------------------------------------------------------

function dragOver(e) {
  e.preventDefault();
  
  console.log('Dragging over the mixCup.');
}
//----------------------------------------------------------------------------------------------------

// Function to handle item drop into mixCup
function dropItem(e) {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text');
  const item = document.getElementById(itemId);
  check_touch = false  
  document.getElementById('touch').innerHTML = check_touch
  if (!item) {
    console.error(`Item with ID ${itemId} not found.`);
    return;
  }

  // Map dragged item to corresponding dice and update the sequence
  if (itemId === 'item1') {
    recordAction(redDice);
  } else if (itemId === 'item2') {
    recordAction(blueDice);
  } else if (itemId === 'item3') {
    recordAction(greenDice);
  }

  // Clone and animate item
  const clonedItem = item.cloneNode(true);
  clonedItem.classList.add('merging');
  const mixCupRect = mixCup.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  clonedItem.style.position = 'absolute';
  clonedItem.style.left = `${mixCupRect.left + mixCupRect.width / 2 - itemRect.width / 2}px`;

  clonedItem.style.top = `${mixCupRect.top - itemRect.height / 2}px`;
  document.body.appendChild(clonedItem);
  

  setTimeout(() => {
    clonedItem.remove();
    // Only call shake if shaking is enabled
    if (shakeEnabled) {
    }
  }, 1000);
}
//----------------------------------------------------------------------------------------------------

// Function to record each action in the sequence
function recordAction(action) {
  digit = digit + action;
  console.log('Digit is ' + digit );
  console.log(`Action recorded: ${action}, Current sequence: ${userSequence}`);
  
}
//----------------------------------------------------------------------------------------------------
// Function to check if user's input matches the correct PIN sequence
function checkSequence() {
  if (userSequence.length === correctSequence.length) {
    if (userSequence.every((action, i) => action === correctSequence[i])) {
      house_sum = sum - getRandomInt(1,6);
      document.getElementById('house_sum').innerHTML = house_sum;
      displayUnlockedMessage(); // Correct sequence
    } else {
      house_sum = sum + getRandomInt(1,6);
      document.getElementById('house_sum').innerHTML = house_sum;
      displayIncorrectPinMessage(); // Incorrect sequence
    }
    stopShaking(); // Stop shaking after result
    shakeEnabled = false; // Disable further shaking until next attempt
    userSequence = []; // Reset sequence for the next attempt
    
  }
}
//----------------------------------------------------------------------------------------------------

function showHouse(){
  const houseSumText = document.getElementById('house_sum');
  houseSumText.classList.remove('house-sum'); 
  houseSumText.classList.add('house-sum-open'); 
}

function closeHouse(){
  const houseSumText = document.getElementById('house_sum');
  houseSumText.classList.remove('open'); 
  houseSumText.classList.remove('house-sum'); 
}

// Function to display success message
function displayUnlockedMessage() {
  const houseSumText = document.getElementById('house');
  houseSumText.classList.remove('house-sum-open');
  setTimeout(() => houseSumText.classList.add('house-sum-open'), 2000);
  setTimeout(() => {
    const fullScreenImage = document.createElement('img');
    fullScreenImage.src = 'https://cdn.glitch.global/a47ecec9-f00e-403c-b8f4-2681583e8ea4/homeScreen.png?v=1729705120980';
    fullScreenImage.style.position = 'fixed';
    fullScreenImage.style.top = '0';
    fullScreenImage.style.left = '0';
    fullScreenImage.style.width = '100%';
    fullScreenImage.style.height = '100%';
    fullScreenImage.style.zIndex = '1000'; // Ensure it's on top
    fullScreenImage.style.objectFit = 'cover'; // Ensures the image covers the screen without distortion
    fullScreenImage.id = 'fullScreenImage';
    
    // Add the image to the document body
    document.body.appendChild(fullScreenImage);
  }, 3000); // 2-second delay to show the image
}
//----------------------------------------------------------------------------------------------------


// Function to display incorrect PIN message
function displayIncorrectPinMessage() {
  const houseSumText = document.getElementById('house');
  houseSumText.classList.add('house-sum-open');
  // showHouse();
  document.getElementById('sum').innerHTML = sum;  //update usm after dice shake 
  const status = document.getElementById('shake_notification');
  status.innerText = "Incorrect PIN. Try again.";
  status.classList.add('open');
  setTimeout(() => status.classList.remove('open'), 4000);
  setTimeout(() => houseSumText.classList.remove('house-sum-open'), 4000);
  setTimeout(() => {mixCup.classList.remove('shake-low', 'shake-moderate', 'shake-extreme');
  document.getElementById('sum').innerHTML = sum; }, 4000);
  
  setTimeout(() => {average_accel = 0;
  event_count = 0;
  total_accel = 0;
  userSequence = []; 
  digit = '';
  sum = 0;document.getElementById('AverageAccel').innerHTML = average_accel;
  document.getElementById('TotalAccel').innerHTML = total_accel;
  document.getElementById('EventCount').innerHTML = event_count;
  document.getElementById('sum').innerHTML = sum;}, 4000);
    //update usm after dice shake 

  
}


//----------------------------------------------------------------------------------------------------

// Function to stop shaking animations
//----------------------------------------------------------------------------------------------------

// Function to trigger shake animation based on intensity (already defined)
function shakeMixer(intensity) {
  // Only shake if shaking is enabled
  if (!shakeEnabled) return;

  stopShaking(); // Remove any existing shake class
  if (intensity === 'low') {
    mixCup.classList.add('shake-low');
  } else if (intensity === 'moderate') {
    mixCup.classList.add('shake-moderate');
  } else if (intensity === 'extreme') {
    mixCup.classList.add('shake-extreme');
  }
}


shake_space.addEventListener("touchstart", function(e) {
  check_touch = true;
  document.getElementById('shake_touch').innerHTML = check_touch;
  e.preventDefault();
})
//----------------------------------------------------------------------------------------------------

                        
shake_space.addEventListener("touchend", function(e) {
  check_touch = false;
  document.getElementById('shake_touch').innerHTML = check_touch;
  average_accel = total_accel / event_count;
  document.getElementById('AverageAccel').innerHTML = average_accel;
  document.getElementById('TotalAccel').innerHTML = total_accel;
  document.getElementById('EventCount').innerHTML = event_count;

  // classify low moderate extreme shake level
  if (average_accel<=10) {
    classify = "low";
    mixCup.classList.add('shake-low');
  } else if (average_accel<32){
    classify = "moderate";
    mixCup.classList.add('shake-moderate');
  } else {
    classify = "extreme";
    mixCup.classList.add('shake-extreme');
  }
  digit = digit + classify // update the pin according to shake level
  userSequence.push(digit); // pushing sequence
  checkSequence();
  document.getElementById('Classify').innerHTML = classify;

  //resetting sensor values for next input
  average_accel = 0;
  event_count = 0;
  total_accel = 0;
  digit = '';
  setTimeout(() => {mixCup.classList.remove('shake-low', 'shake-moderate', 'shake-extreme');
  document.getElementById('sum').innerHTML = sum; }, 2000);
  e.preventDefault();
})
//----------------------------------------------------------------------------------------------------
     
function updateFieldIfNotNull(fieldName, value, precision=10){
  if (value != null)
    document.getElementById(fieldName).innerHTML = value.toFixed(precision);
}


//----------------------------------------------------------------------------------------------------

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
//---------------------------------------------------------------------------------------------------
function reset_input(){ // reset input when phone is tilted
  average_accel = 0;
  event_count = 0;
  total_accel = 0;
  userSequence = []; 
  digit = '';
  sum = 0;
  document.getElementById('AverageAccel').innerHTML = average_accel;
  document.getElementById('TotalAccel').innerHTML = total_accel;
  document.getElementById('EventCount').innerHTML = event_count;
  
  mixCup.classList.add('reset-Animation');
  setTimeout(() => mixCup.classList.remove('reset-Animation'), 1000);
  document.getElementById('sum').innerHTML = sum;  //update usm after dice shake 

  
}
//----------------------------------------------------------------------------------------------------
function handleOrientation(event) {
  updateFieldIfNotNull('Orientation_a', event.alpha);
  updateFieldIfNotNull('Orientation_b', event.beta);
  updateFieldIfNotNull('Orientation_g', event.gamma);
  // console.log("X: " +  event.alpha);
  // console.log("Y: " +  event.beta);
  // console.log("Z: " +  event.gamma);
  if ((event.beta < 0 && event.gamma>50) || (event.beta < 0 && event.gamma<-50)){
    reset_input();
  
  }

  // incrementEventCount();
}
//----------------------------------------------------------------------------------------------------
window.addEventListener('deviceorientation', function(event) {
  handleOrientation(event);
});

window.addEventListener('devicemotion', function(event) {
  handleMotion(event);

});
//----------------------------------------------------------------------------------------------------
