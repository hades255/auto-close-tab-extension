let RUN = true;
let CLOSE_TIME = 0;
let SITE_URL = "google";

const set_CLOSE_TIME = (param) => (CLOSE_TIME = param);
const set_SITE_URL = (param) => (SITE_URL = param);
const set_RUN = (param) => (RUN = param);

function check_() {
  if (!RUN) return;
  const now = new Date();
  const hour = now.getHours();
  if (Number(hour) !== Number(CLOSE_TIME)) return;
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url.includes(SITE_URL)) {
        console.log(`Found tab with ID: ${tab.id} and URL: ${tab.url}`);
        chrome.tabs.remove(tab.id);
      }
    });
  });
}

async function initVariables() {
  console.log(Date.now());
  await chrome.storage.sync.get(["CLOSE_TIME"]).then(({ CLOSE_TIME }) => {
    console.log("init CLOSE_TIME", CLOSE_TIME || 0);
    set_CLOSE_TIME(CLOSE_TIME || 0);
  });
  await chrome.storage.sync.get(["SITE_URL"]).then(({ SITE_URL }) => {
    console.log("init SITE_URL", SITE_URL || "google");
    set_SITE_URL(SITE_URL || "google");
  });
  await chrome.storage.sync.get(["RUN"]).then(({ RUN }) => {
    console.log("init RUN", RUN || false);
    set_RUN(RUN || false);
  });
  console.log(Date.now());
}

function init() {
  chrome.alarms.create("keepAlive", { periodInMinutes: 10 });
  initVariables();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "server?") {
    initVariables();
  }
  if (message.action === "setTimer") {
    const time = message.time;
    if (time) CLOSE_TIME = time;
    const url = message.url;
    if (url) SITE_URL = url;
    chrome.storage.sync.set({ CLOSE_TIME, SITE_URL, RUN });
  }
  if (message.action === "getVariable") {
    sendResponse({ CLOSE_TIME, SITE_URL, RUN });
  }
  if (message.action === "runService") {
    console.log("start timer");
    set_RUN(!RUN);
    chrome.storage.sync.set({ CLOSE_TIME, SITE_URL, RUN });
    sendResponse({ RUN });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  init();
});

chrome.runtime.onStartup.addListener(() => {});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "keepAlive") {
    console.log("60 min alarm listener");
    (async () => {
      await initVariables();
      if (RUN) check_();
    })();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "keepAlive") {
    console.log("Service worker is alive");
  }
});
