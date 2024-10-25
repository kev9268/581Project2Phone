const glass = document.getElementById('glass');
const dragItems = document.querySelectorAll('.drag-item');

dragItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

glass.addEventListener('dragover', dragOver);
glass.addEventListener('drop', dropItem);

function dragStart(e) {
  e.dataTransfer.setData('text', e.target.id);
}

function dragOver(e) {
  e.preventDefault();
}

//function to handle item drop into drink
function dropItem(e) {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text');
  const item = document.getElementById(itemId);
  
  // Clone the item to keep it in its original position too
  const clonedItem = item.cloneNode(true);
  clonedItem.classList.add('merging'); // Add the merging class for animation
  
  // Get the position of the soda to position the item correctly
  const glassRect = glass.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  
  // Set absolute position of the cloned on top of the soda 
  clonedItem.style.top = `${glassRect.top - itemRect.height / 2}px`;
  
  // Add the cloned item to the body so it overlays the soda
  document.body.appendChild(clonedItem);
  
  // Remove the cloned item after the animation completes
  setTimeout(() => {
    clonedItem.remove();
    notifyShake();
  }, 1000); // 1 second matches the animation duration
  


}

//TODO shaking function 
//gyroscope data handiling for intinsity identifier (this can be another separate func )
function shakeItem(){

}

//TODO Reset function 
//pour out the drink



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