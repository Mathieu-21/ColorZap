// Enable selection mode
function enableSelectionMode() {
  document.body.style.cursor = 'crosshair';
  document.addEventListener('click', onElementClick, { once: true }); // remove event listener after one click
}

// Disable selection mode
function disableSelectionMode() {
  document.body.style.cursor = 'default';
  document.removeEventListener('click', onElementClick);
}

// Handle element click event
function onElementClick(event) {
  event.preventDefault(); // prevent from opening the link
  let element = event.target;
  var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  element.style.backgroundColor = randomColor;
  enableSelectionMode(); // re-enable selection mode
}

// Listens for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableSelectionMode') {
    enableSelectionMode();
    sendResponse({ status: 'selection mode enabled' });
  } else if (request.action === 'disableSelectionMode') {
    disableSelectionMode();
    sendResponse({ status: 'selection mode disabled' });
  }
});