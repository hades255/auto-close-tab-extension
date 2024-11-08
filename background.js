chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.url.includes("devdocs.io")) {
    setTimeout(() => {
      chrome.tabs.remove(tabId);
    }, 60000); // Close the tab after 60 seconds
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setTimer') {
      const url = message.url;
      chrome.tabs.create({ url: url }, (newTab) => {
        setTimeout(() => {
          chrome.tabs.remove(newTab.id);
        }, 60000); // Close the tab after 60 seconds
      });
    }
  });
  