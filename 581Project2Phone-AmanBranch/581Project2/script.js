// Dice identifiers
const redDice = 'R';
const blueDice = 'B';
const greenDice = 'G';

// Define the correct PIN sequence
const correctSequence = ['R', 'B', 'G'];
let userSequence = []; // Store user's current sequence
let shakeEnabled = true; // Control variable to manage shaking

// HTML elements for drag and drop
const mixCup = document.getElementById('mixCup');
const dragItems = document.querySelectorAll('.drag-item');

// Once item is clicked
dragItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

mixCup.addEventListener('dragover', dragOver);
mixCup.addEventListener('drop', dropItem);

// Function to handle drag start
function dragStart(e) {
  // Enable shaking when starting a new attempt
  shakeEnabled = true;
  const itemId = e.currentTarget.id;
  console.log(`Dragging item with ID: ${itemId}`);
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
  userSequence.push(action);
  console.log(`Action recorded: ${action}, Current sequence: ${userSequence}`);
  checkSequence();
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
