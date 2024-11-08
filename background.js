let CLOSE_TIME = 12;
let SITE_URL = "upwork.com";

const checkTime = () => {
  const now = new Date();
  const newYorkTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    hour12: false,
  }).format(now);

  return newYorkTime === CLOSE_TIME.toString();
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.url.includes(SITE_URL)) {
    const timerFunc = () => {
      setTimeout(timerFunc, 60000);
      if (checkTime()) chrome.tabs.remove(tabId);
    };
    setTimeout(timerFunc, 60000);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setTimer") {
    const time = message.time;
    if (time) CLOSE_TIME = time;
    const url = message.url;
    if (url) SITE_URL = url;
    // chrome.tabs.create({ url: url }, (newTab) => {
    //   setTimeout(() => {
    //     chrome.tabs.remove(newTab.id);
    //   }, 60000); // Close the tab after 60 seconds
    // });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getVariable") {
    sendResponse({ CLOSE_TIME, SITE_URL });
  }
});
