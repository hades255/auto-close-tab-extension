let RUN = false;
let CLOSE_TIME = 12;
let SITE_URL = "upwork.com";
let TIMER = null;
let SECONDS = 0;

function check() {
  if (SECONDS <= 0) {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url.includes(SITE_URL)) {
          console.log(`Found tab with ID: ${tab.id} and URL: ${tab.url}`);
          chrome.tabs.remove(tab.id);
        }
      });
    });
    RUN = false;
    clearInterval(TIMER);
    console.log("end timer");
    return;
  }
  SECONDS--;
  chrome.tabs.query({}, (tabs) => {});
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setTimer") {
    const time = message.time;
    if (time) CLOSE_TIME = time;
    const url = message.url;
    if (url) SITE_URL = url;
  }
  if (message.action === "getVariable") {
    sendResponse({ CLOSE_TIME, SECONDS, SITE_URL, RUN });
  }
  if (message.action === "runService") {
    if (TIMER) clearInterval(TIMER);
    RUN = !RUN;
    if (RUN) {
      SECONDS = CLOSE_TIME * 60;
      TIMER = setInterval(check, 1000);
      console.log("start timer");
    } else SECONDS = 0;

    sendResponse({ RUN, SECONDS });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("keepAlive", { periodInMinutes: 0.5 });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create("keepAlive", { periodInMinutes: 0.5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "keepAlive") {
    chrome.storage.local.set({ keepAlive: new Date().toISOString() });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "keepAlive") {
    console.log("Service worker is alive");
  }
});
