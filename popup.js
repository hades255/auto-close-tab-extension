function ensureUrlFormat(inputString) {
  try {
    new URL(inputString);
    return inputString;
  } catch (e) {
    return `https://${encodeURIComponent(inputString)}.com`;
  }
}

function dateDiffInSeconds(date1, date2) {
  const diffInTime = Math.abs(date2 - date1);
  const diffInSeconds = Math.floor(diffInTime / 1000);
  return diffInSeconds;
}

function displayTimerFunc(startTime) {
  let i = 0;
  let timer = null;
  timer = setInterval(() => {
    i++;
    if (startTime <= i) {
      stopDisplay();
      clearTimeout(timer);
    } else document.getElementById("timer").innerText = startTime - i;
  }, 1000);
  document.getElementById("timer").innerText = startTime - i;
}

function stopDisplay() {
  document.getElementById("title").innerText = "STOPED";
  document.getElementById("timer").innerText = "";
  document.getElementById("runButton").innerText = "Run";
}

document.getElementById("closeButton").addEventListener("click", () => {
  const url = document.getElementById("url").value;
  const time = document.getElementById("time").value;
  chrome.runtime.sendMessage({ action: "setTimer", url, time });
});

document.getElementById("openButton").addEventListener("click", () => {
  const url = document.getElementById("url").value;
  chrome.tabs.create({ url: ensureUrlFormat(url) }, (newTab) => {});
});

document.getElementById("runButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "runService" }, (response) => {
    if (response) {
      if (response.RUN) {
        document.getElementById("title").innerText = "WORKING:";
        document.getElementById("runButton").innerText = "Stop";
        if (response.CLOSE_TIME) displayTimerFunc(response.CLOSE_TIME * 60);
      } else stopDisplay();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "getVariable" }, (response) => {
    if (response) {
      if (response.SITE_URL)
        document.getElementById("url").value = response.SITE_URL;
      if (response.CLOSE_TIME)
        document.getElementById("time").value = response.CLOSE_TIME;
      if (response && response.RUN) {
        document.getElementById("title").innerText = "WORKING:";
        document.getElementById("runButton").innerText = "Stop";
        if (response.START_TIME) {
          const diff = dateDiffInSeconds(
            new Date(response.START_TIME),
            new Date()
          );
          if (response.CLOSE_TIME)
            displayTimerFunc(response.CLOSE_TIME * 60 - diff);
        }
      } else stopDisplay();
    }
  });
});
