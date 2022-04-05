// ==UserScript==
// @name          FuckCrop
// @version       unprofessional_version
// @description   gets rid of twitter's dumb crop
// @author        Genvara
// @license       MIT
// @match         https://twitter.com/*
// @exclude       https://twitter.com/i/cards/*
// @grant         GM_deleteValue
// @grant         GM_getResourceText
// @grant         GM_getResourceURL
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_info
// @grant         GM_xmlhttpRequest
// @connect       api.twitter.com
// @updateURL     https://github.com/Genvara/FuckCrop/raw/main/twitter.fuckcrop.user.js
// @downloadURL   https://github.com/Genvara/FuckCrop/raw/main/twitter.fuckcrop.user.js
// ==/UserScript==

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let classNamesBlacklist = ["css-1dbjc4n r-13awgt0",
                        "css-9pa8cd",
                        "css-1dbjc4n r-1d2f490 r-105ug2t r-u8s1d r-zchlnj r-ipm5af",
                        "css-1dbjc4n r-12vffkv",
                        "css-18t94o4 css-1dbjc4n r-1niwhzg r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-crgep1 r-1vuscfd r-53xb7h r-1ny4l3l r-mk0yit r-o7ynqc r-6416eg r-lrvibr",
                        "css-901oao css-16my406 r-1qd0xha r-n6v787 r-1sf4r6n r-1j6idkz r-utggzx r-u8s1d r-d3hbe1 r-1wgg2b2 r-axxi2z r-qvutc0",
                        "css-18t94o4 css-1dbjc4n r-1niwhzg r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vuscfd r-53xb7h r-1ny4l3l r-mk0yit r-o7ynqc r-6416eg r-lrvibr",
                        "r-8akbif r-orgf3d r-1udh08x r-u8s1d r-xjis5s r-1wyyakw",
                        "css-1dbjc4n r-1pz39u2 r-16y2uox r-1wbh5a2"]


var observer = new MutationObserver(async function(mutations) {
    if (window.location.href == "https://twitter.com/compose/tweet"
    || window.location.href.includes("https://twitter.com/messages"))
        return;

    await sleep(500);

    for (const mutation of mutations) {
        if (!mutation.addedNodes) continue;

        var image = mutation.addedNodes[0];
        try {
            if (image.className !== "css-9pa8cd" || !(image.getAttribute("src").includes("/media/")))
                continue;
        } catch (e) {
            continue;
        }

        if (image.naturalWidth == 0) continue;

        var marginsNode = image.parentNode
                                        .parentNode
                                        .firstChild;
        marginsNode.setAttribute("style", "margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0;");


        var thatNode = image.parentNode
                                    .parentNode
                                    .parentNode
                                    .firstChild;
        var thatAnotherNode = image.parentNode
                                    .parentNode
                                    .parentNode;


        try {
            if (thatAnotherNode.getAttribute("style").includes("height: 510px")) {
                thatAnotherNode.setAttribute("style", "height: " + (504 * (image.naturalHeight / image.naturalWidth)) + "px; width: 504px");
            }
            if (thatNode.getAttribute("style") == "padding-bottom: 133.333%;") {
                var intrinsicRatio = image.naturalHeight / image.naturalWidth;
                thatNode.setAttribute("style", "padding-bottom: "+(504 * intrinsicRatio)+"px;");
            }
        } catch (e) {
            // console.log(e);
        }
    }
})

observer.observe(document.body, {
    childList: true, 
    subtree: true
})

