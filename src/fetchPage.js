import fetch from "node-fetch";

const ASIN = '';
const CONTENT_VERSION = '';
const FORMAT_VERSION = '';
const KINDLE_SESSION_ID = '';
const COOKIE = '';
const X_ADP_SESSION_TOKEN = '';

const fetchPageOptons = (cookie = COOKIE, asin = ASIN, sessionToken = X_ADP_SESSION_TOKEN) => ({
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "cookie": cookie,
        "device-memory": "8",
        "downlink": "1.45",
        "dpr": "1",
        "ect": "3g",
        "pragma": "no-cache",
        "rtt": "450",
        "sec-ch-device-memory": "8",
        "sec-ch-dpr": "1",
        "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-ch-viewport-width": "1164",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "viewport-width": "1164",
        "x-adp-session-token": sessionToken
    },
    "referrer": `https://read.amazon.co.jp/?asin=${asin}`,
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
});

export async function fetchPage(resourceId, asin = ASIN, contentVersion = CONTENT_VERSION, formatVersion = FORMAT_VERSION, kindleSessionId = KINDLE_SESSION_ID) {
    return fetch(
        `https://read.amazon.co.jp/service/mobile/reader/getFileUrl?`
        + `resourceIds=${resourceId}`
        + `&asin=${asin}`
        + `&contentVersion=${contentVersion}`
        + `&formatVersion=${formatVersion}`
        + `&kindleSessionId=${kindleSessionId}`
        + `&isSample=undefined`,
        fetchPageOptons()
    )
}
