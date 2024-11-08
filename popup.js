function ensureUrlFormat(inputString) {
  try {
    new URL(inputString);
    return inputString;
  } catch (e) {
    return `https://${encodeURIComponent(inputString)}.com`;
  }
}

document.getElementById("closeButton").addEventListener("click", () => {
  const url = document.getElementById("url").value;
  const time = document.getElementById("time").value;
  chrome.runtime.sendMessage({ action: "setTimer", url, time });
});

document.getElementById("openButton").addEventListener("click", () => {
  const url = document.getElementById("url").value;
  chrome.tabs.create({ url: ensureUrlFormat(url) }, (newTab) => {
    // chrome.tabs.remove(newTab.id);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "getVariable" }, (response) => {
    if (response) {
      if (response.SITE_URL)
        document.getElementById("url").value = response.SITE_URL;
      if (response.CLOSE_TIME)
        document.getElementById("time").value = response.CLOSE_TIME;
    }
  });
});
