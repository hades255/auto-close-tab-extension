let timer = null;

function ensureUrlFormat(inputString) {
  try {
    new URL(inputString);
    return inputString;
  } catch (e) {
    return `https://${encodeURIComponent(inputString)}.com`;
  }
}

function displayTimerFunc(startTime) {
  let i = 0;
  timer = setInterval(() => {
    i++;
    if (startTime <= i) {
      stopDisplay();
      return;
    }
    document.getElementById("timer").innerText = startTime - i;
  }, 1000);
  document.getElementById("timer").innerText = startTime - i;
}

function stopDisplay() {
  if (timer) clearInterval(timer);
  document.getElementById("title").innerText = "STOPED";
  document.getElementById("timer").innerText = "";
  document.getElementById("runButton").innerText = "Run";
}

document.getElementById("closeButton").addEventListener("click", () => {
  const url = document.getElementById("url").value;
  const time = document.getElementById("time").value;
  chrome.runtime.sendMessage({ action: "setTimer", url, time });
  document.getElementById("timer").innerText = "Set success";
  setTimeout(() => {
    document.getElementById("timer").innerText = "";
  }, 2000);
});

document.getElementById("openButton").addEventListener("click", () => {
  const url = document.getElementById("url").value;
  chrome.tabs.create({ url: ensureUrlFormat(url) }, (newTab) => {});
});

document.getElementById("runButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "runService" }, (response) => {
    if (response) {
      if (response.RUN) {
        document.getElementById("title").innerText = "WORKING";
        document.getElementById("runButton").innerText = "Stop";
        // if (response.SECONDS) displayTimerFunc(response.SECONDS);
      } else stopDisplay();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "server?" });
  setTimeout(() => {
    chrome.runtime.sendMessage({ action: "getVariable" }, (response) => {
      if (response) {
        if (response.SITE_URL)
          document.getElementById("url").value = response.SITE_URL;
        if (response.CLOSE_TIME)
          document.getElementById("time").value = response.CLOSE_TIME;
        if (response && response.RUN) {
          document.getElementById("title").innerText = "WORKING";
          document.getElementById("runButton").innerText = "Stop";
          // if (response.SECONDS) displayTimerFunc(response.SECONDS);
        } else stopDisplay();
      }
    });
  }, 100);
});
