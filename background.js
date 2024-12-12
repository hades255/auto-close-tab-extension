let RUN = true;
let CLOSE_TIME = 0;
let SITE_URL = "upwork.com";

let REFRESH_RUN = false;
let REFRESH_SITE_URL =
  "https://www.upwork.com/nx/search/jobs/?nbs=1&payment_verified=1&per_page=50&proposals=0-4,5-9,10-14&sort=recency&page=1";
let REFRESH_PERIOD = 1;
let REFRESH_TIMER = null;
let REFRESHED_TIME = null;

const set_CLOSE_TIME = (param) => (CLOSE_TIME = param);
const set_SITE_URL = (param) => (SITE_URL = param);
const set_RUN = (param) => (RUN = param);

const set_REFRESH_RUN = (param) => (REFRESH_RUN = param);
const set_REFRESH_SITE_URL = (param) => (REFRESH_SITE_URL = param);
const set_REFRESH_PERIOD = (param) => (REFRESH_PERIOD = param);

const draw = (ctx, color = "#000", text = "#FFF") => {
  ctx.save();
  ctx.strokeStyle = "rgba(0,0,0,0)";
  ctx.miterLimit = 4;
  ctx.font = "15px ''";
  ctx.font = "15px ''";
  ctx.scale(0.6510416666666666, 0.6510416666666666);
  ctx.scale(0.6510416666666667, 0.6510416666666667);
  ctx.save();
  ctx.restore();
  ctx.save();
  ctx.font = "15px ''";
  ctx.save();
  ctx.fillStyle = color; //"#6FDA44";
  ctx.font = "15px ''";
  ctx.beginPath();
  ctx.moveTo(18.43, 0);
  ctx.lineTo(104.44999999999999, 0);
  ctx.bezierCurveTo(114.63, 0, 122.88, 8.25, 122.88, 18.43);
  ctx.lineTo(122.88, 104.44999999999999);
  ctx.bezierCurveTo(122.88, 114.63, 114.63, 122.88, 104.44999999999999, 122.88);
  ctx.lineTo(18.43, 122.88);
  ctx.bezierCurveTo(8.25, 122.88, 0, 114.63, 0, 104.45);
  ctx.lineTo(0, 18.430000000000007);
  ctx.bezierCurveTo(0, 8.25, 8.25, 0, 18.43, 0);
  ctx.lineTo(18.43, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.fillStyle = text;
  ctx.font = "15px ''";
  ctx.beginPath();
  ctx.moveTo(85.73, 71.26);
  ctx.bezierCurveTo(81.65, 71.26, 77.81, 69.53, 74.35000000000001, 66.72);
  ctx.lineTo(75.19000000000001, 62.74);
  ctx.lineTo(75.21000000000001, 62.6);
  ctx.bezierCurveTo(
    75.98,
    58.38,
    78.35000000000001,
    51.27,
    85.72000000000001,
    51.27
  );
  ctx.bezierCurveTo(
    91.24000000000001,
    51.27,
    95.73000000000002,
    55.760000000000005,
    95.73000000000002,
    61.28
  );
  ctx.bezierCurveTo(95.74, 66.79, 91.25, 71.26, 85.73, 71.26);
  ctx.lineTo(85.73, 71.26);
  ctx.lineTo(85.73, 71.26);
  ctx.closePath();
  ctx.moveTo(85.73, 41.14);
  ctx.bezierCurveTo(
    76.32000000000001,
    41.14,
    69.05000000000001,
    47.24,
    66.07000000000001,
    57.29
  );
  ctx.bezierCurveTo(
    61.56000000000001,
    50.5,
    58.13000000000001,
    42.36,
    56.13000000000001,
    35.5
  );
  ctx.lineTo(46.01, 35.5);
  ctx.lineTo(46.01, 61.83);
  ctx.bezierCurveTo(
    46.01,
    67.03999999999999,
    41.79,
    71.25999999999999,
    36.58,
    71.25999999999999
  );
  ctx.bezierCurveTo(
    31.369999999999997,
    71.25999999999999,
    27.15,
    67.03999999999999,
    27.15,
    61.82999999999999
  );
  ctx.lineTo(27.15, 35.47);
  ctx.lineTo(17.049999999999997, 35.47);
  ctx.lineTo(17.049999999999997, 61.8);
  ctx.bezierCurveTo(
    17.049999999999997,
    72.58,
    25.809999999999995,
    81.42999999999999,
    36.589999999999996,
    81.42999999999999
  );
  ctx.bezierCurveTo(
    47.37,
    81.42999999999999,
    56.129999999999995,
    72.57,
    56.129999999999995,
    61.8
  );
  ctx.lineTo(56.129999999999995, 57.379999999999995);
  ctx.bezierCurveTo(
    58.099999999999994,
    61.48,
    60.49999999999999,
    65.64,
    63.42999999999999,
    69.28
  );
  ctx.lineTo(57.239999999999995, 98.42);
  ctx.lineTo(67.58, 98.42);
  ctx.lineTo(72.07, 77.3);
  ctx.bezierCurveTo(
    76.00999999999999,
    79.82,
    80.52,
    81.39999999999999,
    85.69999999999999,
    81.39999999999999
  );
  ctx.bezierCurveTo(
    96.78999999999999,
    81.39999999999999,
    105.80999999999999,
    72.32999999999998,
    105.80999999999999,
    61.21999999999999
  );
  ctx.bezierCurveTo(105.82, 50.16, 96.82, 41.14, 85.73, 41.14);
  ctx.lineTo(85.73, 41.14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.restore();
  ctx.restore();
};

const updateIcon = () => {
  const canvas = new OffscreenCanvas(48, 48);
  const context = canvas.getContext("2d");
  draw(context, REFRESH_RUN ? "#F7931E" : "#6FDA44", RUN ? "#0F0" : "#FFF");
  const imageData = context.getImageData(0, 0, 48, 48);

  chrome.action.setIcon({ imageData }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      console.log("Icon updated successfully.");
    }
  });
};

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
  await chrome.storage.sync.get(["REFRESH_RUN"]).then(({ REFRESH_RUN }) => {
    set_REFRESH_RUN(REFRESH_RUN || false);
  });
  await chrome.storage.sync
    .get(["REFRESH_PERIOD"])
    .then(({ REFRESH_PERIOD }) => {
      set_REFRESH_PERIOD(REFRESH_PERIOD || 1);
    });
  await chrome.storage.sync
    .get(["REFRESH_SITE_URL"])
    .then(({ REFRESH_SITE_URL }) => {
      set_REFRESH_SITE_URL(
        REFRESH_SITE_URL ||
          "https://www.upwork.com/nx/search/jobs/?nbs=1&payment_verified=1&per_page=50&proposals=0-4,5-9,10-14&sort=recency&page=1"
      );
    });
}

const refreshOrOpenUrl = () => {
  const formattedUrl = REFRESH_SITE_URL;
  chrome.tabs.query({}, function (tabs) {
    for (let tab of tabs) {
      if (tab.url.includes(formattedUrl)) {
        chrome.tabs.remove(tab.id);
        break;
      }
    }

    chrome.tabs.create({ url: formattedUrl }, (newTab) => {});
  });
};

async function init() {
  console.log("init");
  await initVariables();
  chrome.alarms.get("keepAlive", (alarm) => {
    if (alarm) {
      console.log("Alarm 'keepAlive' is running.");
      console.log("Next scheduled time:", new Date(alarm.scheduledTime));
    } else {
      console.log("Alarm 'keepAlive' is not running.");
      chrome.alarms.create("keepAlive", { periodInMinutes: 30 });
    }
  });
  chrome.alarms.get("refresh-site", (alarm) => {
    if (alarm) {
      if (!REFRESH_RUN) {
        chrome.alarms.clear("refresh-site");
      }
    } else {
      if (REFRESH_RUN) {
        chrome.alarms.create("refresh-site", {
          periodInMinutes: Number(REFRESH_PERIOD),
        });
        refreshOrOpenUrl();
      }
    }
  });
  if (REFRESH_RUN) updateIcon();
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
    updateIcon();
    sendResponse({ RUN });
  }
  if (message.action === "getREFRESH_SITE_URL") {
    sendResponse({ REFRESH_SITE_URL });
  }
  if (message.action === "refreshRun") {
    if (message.url && message.period) {
      set_REFRESH_RUN(!REFRESH_RUN);
      set_REFRESH_SITE_URL(message.url);
      set_REFRESH_PERIOD(message.period);
      sendResponse({ REFRESH_RUN });
      chrome.storage.sync.set({
        REFRESH_RUN,
        REFRESH_SITE_URL,
        REFRESH_PERIOD,
      });
      chrome.alarms.clear("refresh-site", () => {
        updateIcon();
        if (REFRESH_RUN) {
          chrome.alarms.create("refresh-site", {
            periodInMinutes: Number(REFRESH_PERIOD),
          });
          refreshOrOpenUrl();
        }
      });
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
  if (alarm.name === "refresh-site") {
    (async () => {
      await initVariables();
      if (REFRESH_RUN) refreshOrOpenUrl();
    })();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "keepAlive") {
    console.log("Service worker is alive");
  }
});
