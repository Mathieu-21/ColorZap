function enableSelectionMode() {
  document.body.style.cursor = 'crosshair';
  document.addEventListener('click', function(event) {
    event.preventDefault();
    let element = event.target;
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    element.style.backgroundColor = randomColor;
    document.body.style.cursor = 'default';
  }, { once: true });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableSelectionMode') {
    enableSelectionMode();
    sendResponse({ status: 'selection mode enabled' });
  }
});
