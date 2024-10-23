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

function dropItem(e) {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text');
  const item = document.getElementById(itemId);
  const clonedItem = item.cloneNode(true);
  clonedItem.classList.remove('drag-item'); // remove drag capabilities after adding
  glass.appendChild(clonedItem); // Add the dragged item to the glass

  //TODO shaking handling 
  //after item is added add function to handle state 
  alert('Shake your phone to mix the drink!');
}


//TODO shaking function 
//gyroscope data handiling for intinsity identifier 



//TODO Reset function 
//pour out the drink
