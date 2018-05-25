"use strict";

const okHost   = new RegExp("^$");
const okTpHost = new RegExp("^$");
const badPath  = new RegExp("$");

function beforeHttpsRequestListener(details) {
  var url;
  try {
    url = new URL(details.url);
  } catch (e) {
    console.error("[X]: " + details.url);
    return {cancel: true};
  }
  if (okHost.test(url.hostname) || okTpHost.test(url.hostname)) {
    if (!badPath.test(url.pathname)) {
      return {cancel: false};
    }
  }
  console.info("[X]: " + url.href);
  return {cancel: true};
}

function beforeNonHttpsRequestListener(details) {
  var url;
  try {
    url = new URL(details.url);
  } catch (e) {
    console.error("[X]: " + details.url);
    return {cancel: true};
  }
  console.warn("[X]: " + url.href);
  return {cancel: true};
}

browser.webRequest.onBeforeRequest.addListener(
  beforeHttpsRequestListener,
  {urls: ["https://*/*"]},
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  beforeNonHttpsRequestListener,
  {urls: ["http://*/*","ftp://*/*","file://*/*"]},
  ["blocking"]
);
