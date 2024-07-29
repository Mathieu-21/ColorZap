let activated = false;

const setSelectionMode = (tabs, mode) => {
  const action = mode ? 'enableSelectionMode' : 'disableSelectionMode';
  chrome.tabs.sendMessage(tabs[0].id, { action }, () => {
    if (chrome.runtime.lastError) {
      console.error(`Chrome Runtime Error: ${chrome.runtime.lastError}`);
      return;
    }
    const isActive = mode ? 'true' : 'false';
    document.getElementById('enableSelection').setAttribute('data-active', isActive);
    document.body.setAttribute('data-active', isActive);
    chrome.storage.local.set({ activated: mode }, () => {
      if (chrome.runtime.lastError) {
        console.error(`Chrome Storage Error: ${chrome.runtime.lastError}`);
      }
    });
  });
};


// Handles the click event on the popup button
document.getElementById('enableSelection').addEventListener('click', () => {
  activated = !activated;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (chrome.runtime.lastError) {
      console.error(`Chrome Runtime Error: ${chrome.runtime.lastError}`);
      return;
    }
    setSelectionMode(tabs, activated);
  });
});


// Initializes the popup UI based on stored settings
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['activated'], (result) => {
    if (chrome.runtime.lastError) {
      console.error(`Chrome Storage Error: ${chrome.runtime.lastError}`);
      return;
    }
    activated = result.activated || false;
    document.getElementById('enableSelection').setAttribute('data-active', activated ? 'true' : 'false');
    document.body.setAttribute('data-active', activated ? 'true' : 'false');
  });
});
