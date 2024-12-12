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
      } else stopDisplay();
      document.getElementById("url").disabled = response.RUN;
      document.getElementById("time").disabled = response.RUN;
      document.getElementById("closeButton").disabled = response.RUN;
      document.getElementById("openButton").disabled = response.RUN;
    }
  });
});

document.getElementById("refreshRun").addEventListener("click", () => {
  const url = document.getElementById("refreshSiteUrl").value;
  const period = document.getElementById("refreshPeriod").value;
  if (url && period) {
    chrome.runtime.sendMessage(
      { action: "refreshRun", url, period },
      (response) => {
        if (response) {
          document.getElementById("refreshRun").innerText = response.REFRESH_RUN
            ? "STOP"
            : "RUN";
          document.getElementById("refreshSiteUrl").disabled =
            response.REFRESH_RUN;
          document.getElementById("refreshPeriod").disabled =
            response.REFRESH_RUN;
        }
      }
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "server?" });
  setTimeout(() => {
    chrome.runtime.sendMessage({ action: "getVariable" }, (response) => {
      if (response) {
        console.log(response);
        if (response.SITE_URL)
          document.getElementById("url").value = response.SITE_URL;
        if (response.CLOSE_TIME >= 0)
          document.getElementById("time").value = response.CLOSE_TIME;
        if (response.REFRESH_RUN) {
          document.getElementById("refreshRun").innerText = "STOP";
          document.getElementById("refreshSiteUrl").disabled = true;
          document.getElementById("refreshPeriod").disabled = true;
        }
        if (response.REFRESH_SITE_URL)
          document.getElementById("refreshSiteUrl").value =
            response.REFRESH_SITE_URL;
        if (response.REFRESH_PERIOD >= 0)
          document.getElementById("refreshPeriod").value =
            response.REFRESH_PERIOD;
        if (response.RUN) {
          document.getElementById("title").innerText = "WORKING";
          document.getElementById("runButton").innerText = "Stop";
          document.getElementById("url").disabled = true;
          document.getElementById("time").disabled = true;
        } else stopDisplay();
      }
    });
  }, 100);
});
