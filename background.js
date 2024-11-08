let RUN = false;
let CLOSE_TIME = 12;
let START_TIME = null;
let SITE_URL = "upwork.com";
let timer = null;

function check() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url.includes(SITE_URL)) {
        console.log(`Found tab with ID: ${tab.id} and URL: ${tab.url}`);
        chrome.tabs.remove(tab.id);
      }
    });
  });
  RUN = false;
  START_TIME = null;
  clearTimeout(timer);
  console.log("end timer");
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setTimer") {
    const time = message.time;
    if (time) CLOSE_TIME = time;
    const url = message.url;
    if (url) SITE_URL = url;
  }
  if (message.action === "getVariable") {
    sendResponse({ CLOSE_TIME, SITE_URL, RUN, START_TIME });
  }
  if (message.action === "runService") {
    if (timer) clearTimeout(timer);
    RUN = !RUN;
    if (RUN) {
      timer = setTimeout(check, CLOSE_TIME * 60 * 1000);
      console.log("start timer");
      START_TIME = new Date();
    } else {
      START_TIME = null;
    }
    sendResponse({ RUN, CLOSE_TIME });
  }
});

/** precent service worker inactive */
let intervalId;

chrome.runtime.onInstalled.addListener(() => {
  intervalId = setInterval(() => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        console.log("onInstalled");
      });
    });
  }, 30000);
});

chrome.runtime.onStartup.addListener(() => {
  intervalId = setInterval(() => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        console.log("onStartup");
      });
    });
  }, 30000);
});
