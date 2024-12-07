let RUN = true;
let CLOSE_TIME = 0;
let SITE_URL = "google";

let REFRESH_RUN = false;
let REFRESH_SITE_URL =
  "https://www.upwork.com/nx/search/jobs/?nbs=1&payment_verified=1&per_page=50&proposals=0-4,5-9,10-14&sort=recency&page=1";
let REFRESH_PERIOD = 60;
let REFRESH_TIMER = null;

const set_CLOSE_TIME = (param) => (CLOSE_TIME = param);
const set_SITE_URL = (param) => (SITE_URL = param);
const set_RUN = (param) => (RUN = param);

const set_REFRESH_RUN = (param) => (REFRESH_RUN = param);
const set_REFRESH_SITE_URL = (param) => (REFRESH_SITE_URL = param);
const set_REFRESH_PERIOD = (param) => (REFRESH_PERIOD = param);

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
  await chrome.storage.sync.get(["CLOSE_TIME"]).then(({ CLOSE_TIME }) => {
    set_CLOSE_TIME(CLOSE_TIME || 0);
  });
  await chrome.storage.sync.get(["SITE_URL"]).then(({ SITE_URL }) => {
    set_SITE_URL(SITE_URL || "google");
  });
  await chrome.storage.sync.get(["RUN"]).then(({ RUN }) => {
    set_RUN(RUN || false);
  });
  await chrome.storage.sync.get(["RUN"]).then(({ REFRESH_RUN }) => {
    set_REFRESH_RUN(REFRESH_RUN || false);
  });
  await chrome.storage.sync.get(["RUN"]).then(({ REFRESH_SITE_URL }) => {
    set_REFRESH_SITE_URL(
      REFRESH_SITE_URL ||
        "https://www.upwork.com/nx/search/jobs/?nbs=1&payment_verified=1&per_page=50&proposals=0-4,5-9,10-14&sort=recency&page=1"
    );
  });
}
const refreshOrOpenUrl = () => {
  const formattedUrl = REFRESH_SITE_URL;

  chrome.tabs.query({}, function (tabs) {
    let tabFound = false;

    for (let tab of tabs) {
      if (tab.url.includes(formattedUrl)) {
        tabFound = true;

        chrome.tabs.reload(tab.id);

        REFRESH_TIMER = setInterval(() => {
          console.log("timer");
          chrome.tabs.reload(tab.id);
        }, REFRESH_PERIOD * 1000);
        break;
      }
    }

    if (!tabFound) {
      chrome.tabs.create({ url: formattedUrl }, (newTab) => {
        REFRESH_TIMER = setInterval(() => {
          console.log("timer");
          chrome.tabs.reload(newTab.id);
        }, REFRESH_PERIOD * 1000);
      });
    }
  });
};

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
    sendResponse({
      CLOSE_TIME,
      SITE_URL,
      RUN,
      REFRESH_RUN,
      REFRESH_SITE_URL,
      REFRESH_PERIOD,
    });
  }
  if (message.action === "runService") {
    console.log("start timer");
    set_RUN(!RUN);
    chrome.storage.sync.set({ CLOSE_TIME, SITE_URL, RUN });
    sendResponse({ RUN });
  }
  if (message.action === "getREFRESH_SITE_URL") {
    sendResponse({ REFRESH_SITE_URL });
  }
  if (message.action === "refreshRun") {
    if (message.url && message.period) {
      if (REFRESH_TIMER) clearInterval(REFRESH_TIMER);
      set_REFRESH_RUN(!REFRESH_RUN);
      set_REFRESH_SITE_URL(message.url);
      set_REFRESH_PERIOD(message.period);
      chrome.storage.sync.set({
        REFRESH_RUN,
        REFRESH_SITE_URL,
        REFRESH_PERIOD,
      });
      sendResponse({ REFRESH_RUN });
      if (REFRESH_RUN) {
        refreshOrOpenUrl();
      }
    }
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
