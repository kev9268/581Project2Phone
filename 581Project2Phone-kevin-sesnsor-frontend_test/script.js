// Dice identifiers
const redDice = 'R';
const blueDice = 'B';
const greenDice = 'G';
let digit = '';
let curr_Item = 'item0';
// Define the correct PIN sequence
const correctSequence = ['RRlow', 'Bmoderate', 'Glow'];
let userSequence = []; // Store user's current sequence
let shakeEnabled = true; // Control variable to manage shaking

document.getElementById('touch').innerHTML = curr_Item;

// HTML elements for drag and drop
const mixCup = document.getElementById('mixCup');
const dragItems = document.querySelectorAll('.drag-item');

// Function to request sensor permissions on iOS
function requestSensorPermission() {
  if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          // Add event listeners for motion and orientation
          window.addEventListener('deviceorientation', handleOrientation);
          window.addEventListener('devicemotion', handleMotion);
          alert("Sensors enabled! Move your device to interact.");
        } else {
          alert("Permission denied. Sensors won't be available.");
        }
      })
      .catch(console.error);
  } else {
    // Non-iOS or no permission required; add listeners directly
    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('devicemotion', handleMotion);
  }
}

// Add event listener to the "Enable Sensors" button
document.getElementById('enableSensorsButton').addEventListener('click', requestSensorPermission);

// Once item is clicked
dragItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('touchstart', clickStart);
  item.addEventListener('touchend', clickEnd);
});

mixCup.addEventListener('dragover', dragOver);
mixCup.addEventListener('drop', dropItem);

// Function to handle drag start
function clickStart(e) { // Copied logic for drag but changed the event handler
  e.preventDefault();
  shakeEnabled = true;
  const itemId = e.currentTarget.id;
  console.log(`Dragging item with ID: ${itemId}`);
  check_touch = true;
  document.getElementById('touch').innerHTML = check_touch;
  e.dataTransfer.setData('text', itemId);
}

function clickEnd(e) { // Copied logic for drag but changed the event handler
  check_touch = false;
  document.getElementById('touch').innerHTML = JSON.stringify(e);
  const itemId = JSON.stringify(e);
  recordAction(itemId); // Add the dice type to sequence

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

function dragStart(e) {
  // Enable shaking when starting a new attempt
  shakeEnabled = true;
  const itemId = e.currentTarget.id;
  console.log(`Dragging item with ID: ${itemId}`);
  check_touch = true;
  document.getElementById('touch').innerHTML = check_touch;
  e.dataTransfer.setData('text', itemId);
}

function dragOver(e) {
  e.preventDefault();
  console.log('Dragging over the mixCup.');
}

// Function to handle item drop into mixCup
function dropItem(e) {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text');
  const item = document.getElementById(itemId);
  check_touch = false;
  document.getElementById('touch').innerHTML = check_touch;

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

  setTimeout(() => {
    clonedItem.remove();
    // Only call shake if shaking is enabled
    if (shakeEnabled) {
      shakeMixer('moderate'); // Call shake animation as a test
    }
  }, 1000);
}

// Function to record each action in the sequence
function recordAction(action) {
  digit = digit + action;
  console.log('Digit is ' + digit);
  console.log(`Action recorded: ${action}, Current sequence: ${userSequence}`);
}

// Function to check if user's input matches the correct PIN sequence
function checkSequence() {
  if (userSequence.length === correctSequence.length) {
    if (userSequence.every((action, i) => action === correctSequence[i])) {
      displayUnlockedMessage(); // Correct sequence
    } else {
      displayIncorrectPinMessage(); // Incorrect sequence
    }
    stopShaking(); // Stop shaking after result
    shakeEnabled = false; // Disable further shaking until next attempt
    userSequence = []; // Reset sequence for the next attempt
  }
}

// Function to display success message
function displayUnlockedMessage() {
  const status = document.getElementById('shake_notification');
  status.innerText = "Unlocked! Welcome!";
  status.classList.add('open');
  setTimeout(() => status.classList.remove('open'), 2000);
}

// Function to display incorrect PIN message
function displayIncorrectPinMessage() {
  const status = document.getElementById('shake_notification');
  status.innerText = "Incorrect PIN. Try again.";
  status.classList.add('open');
  setTimeout(() => status.classList.remove('open'), 2000);
}

// Function to stop shaking animations
function stopShaking() {
  mixCup.classList.remove('shake-low', 'shake-moderate', 'shake-extreme');
}

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

// SENSOR STUFF STARTS HERE

let check_touch = false;
let event_count = 0;
let average_accel = 0;
let total_accel = 0;
let classify = 'slow';

document.getElementById('touch').innerHTML = check_touch;

mixCup.addEventListener('touchend', function(event) { // Button that checks end of shake for touching cup
  event.preventDefault();
  check_touch = false;
  average_accel = total_accel / event_count;

  // classify low, moderate, extreme shake level
  if (average_accel <= 20) {
    classify = "low";
  } else if (average_accel < 30) {
    classify = "moderate";
  } else {
    classify = "extreme";
  }
  digit = digit + classify; // Update the pin according to shake level
  userSequence.push(digit); // Pushing sequence
  checkSequence();

  // Resetting sensor values for next input
  average_accel = 0;
  event_count = 0;
  total_accel = 0;
  digit = '';
});

mixCup.addEventListener('touchstart', function(event) { // Start shake detection
  event.preventDefault();
  check_touch = true;
});

// Function to handle motion events for shaking
function handleMotion(event) {
  if (check_touch) {
    total_accel = Math.abs(event.acceleration.x) + Math.abs(event.acceleration.y) + total_accel;
    event_count++;
  }
}

// Function to reset input if device orientation changes significantly
function reset_input() {
  average_accel = 0;
  event_count = 0;
  total_accel = 0;
  userSequence = [];
  digit = '';
}

// Function to handle orientation events for resetting input on significant tilt
function handleOrientation(event) {
  if ((event.beta < 0 && event.gamma > 50) || (event.beta < 0 && event.gamma < -50)) {
    reset_input();
  }
}

// Add event listeners for device motion and orientation
window.addEventListener('deviceorientation', function(event) {
  handleOrientation(event);
});

window.addEventListener('devicemotion', function(event) {
  handleMotion(event);
});