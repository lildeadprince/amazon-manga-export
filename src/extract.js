import fetch from 'node-fetch';
import fs from "fs";
import util from "util";
import mime from "mime";
import delay from 'delay';
import {fetchPage} from "./fetchPage.js";

await run(3, 230, 2500);

async function run(startPage, endPage, delayMs = 2500, delaySpreadMs = 500) {
    for (let page = 3; page <= 230; page++) {
        const pageResourceId = page * 2 + 1;
        console.log('page', page);
        await downloadImage(pageResourceId, `saved-${page}`);

        console.log('sleep...\n');
        await delay(delayMs + Math.random() * delaySpreadMs);
    }
}

async function downloadImage(id, filename) {
    const res = await fetchPage(id);

    console.log('Resource', res.status, res.statusText);
    if (res.ok) {
        // Get signedUrl for the resource
        const {resourceUrls: [{signedUrl}]} = await res.json();
        console.log(util.format('url %s', signedUrl));

        // Get actual image data
        const responseData = await fetch(signedUrl);
        console.log('Data', responseData.status, responseData.statusText);
        console.log(responseData.headers.get('content-type'));
        console.log(responseData.headers.get('content-length'), 'bytes');

        // Pipe image data directly into the file
        const extension = mime.getExtension(responseData.headers.get('content-type')) || '';
        const fileOutputStream = fs.createWriteStream(`./${filename}.${extension}`);
        responseData.body.pipe(fileOutputStream);
    } else {
        console.log(await res.text());
    }
}
