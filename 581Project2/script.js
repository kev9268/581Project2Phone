const redDice = 'R';
const blueDice = 'B';
const greenDice = 'G'

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
  }, 1000);
}


//TODO shaking function 
//gyroscope data handiling for intinsity identifier (this can be another separate func )
function shakeItem(){

}

//shake text functions --------------------
const shakeText =  document.getElementById("shake_notification") 
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