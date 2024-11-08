document.getElementById("closeButton").addEventListener("click", () => {
  const url = document.getElementById("url").value;
  chrome.runtime.sendMessage({ action: "setTimer", url: url });
});
