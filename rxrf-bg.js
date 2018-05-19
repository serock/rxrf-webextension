"use strict";

const regExps = {
  hosts:   new RegExp("^$"),
  tpHosts: new RegExp("^$")
};

function beforeRequestListener(details) {
  var url;
  try {
    url = new URL(details.url);
  } catch (e) {
    console.error("[X]: " + details.url);
    return {cancel: true};
  }
  if (url.protocol == "https:") {
    if (regExps.hosts.test(url.hostname) || regExps.tpHosts.test(url.hostname)) {
      //console.info(url.hostname);
      return {cancel: false};
    } else {
      console.info("[X]: " + url.href);
    }
  } else {
    console.warn("[X]: " + url.href);
  }
  return {cancel: true};
}

browser.webRequest.onBeforeRequest.addListener(
  beforeRequestListener,
  {urls: ["<all_urls>"]},
  ["blocking"]
);

