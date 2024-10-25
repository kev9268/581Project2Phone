const mixCup = document.getElementById('mixCup');
const dragItems = document.querySelectorAll('.drag-item');

dragItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

mixCup.addEventListener('dragover', dragOver);
mixCup.addEventListener('drop', dropItem);

function dragStart(e) {
  const itemId = e.currentTarget.id;  // Use e.currentTarget.id to get the div's ID
  console.log(`Dragging item with ID: ${itemId}`);
  e.dataTransfer.setData('text/plain', itemId);
}

function dragOver(e) {
  e.preventDefault();
  console.log('Dragging over the mixCup.');
}

function dropItem(e) {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text/plain');
  console.log(`Dropping item with ID: ${itemId}`);
  
  const item = document.getElementById(itemId);
  
  if (!item) {
    console.error(`Item with ID ${itemId} not found.`);
    return;
  }
  
  // Continue with cloning and positioning the item
  const clonedItem = item.cloneNode(true);
  clonedItem.classList.add('merging'); // Add the merging class for animation
  
  const mixCupRect = mixCup.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  
  clonedItem.style.position = 'absolute';
  clonedItem.style.top = `${mixCupRect.top - itemRect.height / 2}px`;
  
  document.body.appendChild(clonedItem);
  
  setTimeout(() => {
    clonedItem.remove();
  }, 1000);
}


//TODO shaking function 
//gyroscope data handiling for intinsity identifier (this can be another separate func )
function shakeItem(){

}

//shake text functions --------------------
const shakeText =  document.getElementById("shake_notification") 
function notifyShake(){
shakeText.classList.add('open');
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