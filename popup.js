document.getElementById('enableSelection').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'enableSelectionMode' }, (response) => {
      console.log(response.status);
    });
  });
});
