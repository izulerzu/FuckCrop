// ==UserScript==
// @name          FuckChirp
// @version       1.deeznuts.1
// @description   gets rid of twitter's new font
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
// @updateURL     https://github.com/Bl4Cc4t/Genvara/raw/master/twitter.fuckchirp.user.js
// @downloadURL   https://github.com/Bl4Cc4t/Genvara/raw/master/twitter.fuckchirp.user.js
// ==/UserScript==

document.cookie="ab_decider=responsive_web_chirp_font_enabled=false"
document.cookie="ab_decider=responsive_web_chirp_font_enabled=false&responsive_web_nav_visual_refresh_enabled=false"

function getAllElementsWithAttribute(attribute) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null)
        {
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}

var style = document.getElementsByTagName("style")[0];
style.innerHTML += "@keyframes paddingBottomToHundred { from { padding-bottom: 56.25%; } to { padding-bottom: 100%; } }"


var observer = new MutationObserver(function(mutations) {
    if (window.location.href == "https://twitter.com/compose/tweet"
    || window.location.href.includes("https://twitter.com/messages"))
        return;

    mutations.forEach(function(mutation) {
        if (!mutation.addedNodes) return;
        try {
            if (mutation.addedNodes[0].className == "css-1dbjc4n r-13awgt0"
                || mutation.addedNodes[0].className == "css-9pa8cd"
                || mutation.addedNodes[0].className == "css-1dbjc4n r-1d2f490 r-105ug2t r-u8s1d r-zchlnj r-ipm5af"
                || mutation.addedNodes[0].className == "css-1dbjc4n r-12vffkv"
                || mutation.addedNodes[0].className == "css-18t94o4 css-1dbjc4n r-1niwhzg r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-crgep1 r-1vuscfd r-53xb7h r-1ny4l3l r-mk0yit r-o7ynqc r-6416eg r-lrvibr"
                || mutation.addedNodes[0].className == "css-901oao css-16my406 r-1qd0xha r-n6v787 r-1sf4r6n r-1j6idkz r-utggzx r-u8s1d r-d3hbe1 r-1wgg2b2 r-axxi2z r-qvutc0"
                || mutation.addedNodes[0].className == "css-18t94o4 css-1dbjc4n r-1niwhzg r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vuscfd r-53xb7h r-1ny4l3l r-mk0yit r-o7ynqc r-6416eg r-lrvibr"
                || mutation.addedNodes[0].className == "r-8akbif r-orgf3d r-1udh08x r-u8s1d r-xjis5s r-1wyyakw"
                || mutation.addedNodes[0].className == "css-1dbjc4n r-1pz39u2 r-16y2uox r-1wbh5a2") return;
            //console.log(mutation.addedNodes[0].className);
        } catch (e){
            return;
        }

        var elementsWithSrc = getAllElementsWithAttribute("src");
        for (var i = 0; i<elementsWithSrc.length; i++) {
            if (elementsWithSrc[i].src.includes("/media/")
                && elementsWithSrc[i].getBoundingClientRect().top + (document.documentElement.scrollTop || document.body.scrollTop)
                                                > (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientHeight/2) {

                if (elementsWithSrc[i].naturalWidth == 0) continue;

                var marginsNode = elementsWithSrc[i].parentNode
                                                .parentNode
                                                .firstChild;
                marginsNode.setAttribute("style", "margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0;");


                var thatNode = elementsWithSrc[i].parentNode
                                            .parentNode
                                            .parentNode
                                            .firstChild;

                //console.log(elementsWithSrc[i].src+"   "+elementsWithSrc[i].naturalWidth+"x"+elementsWithSrc[i].naturalHeight);
                var imgSizeRatio = elementsWithSrc[i].naturalWidth / elementsWithSrc[i].naturalHeight;
                var newPadding = 507 / imgSizeRatio;

                if (thatNode.getAttribute("style") == "padding-bottom: 56.25%;") {
                    thatNode.setAttribute("style", "padding-bottom: "+newPadding+"px; animation: paddingBottomToHundred; animation-duration: .3s;");
                }
            }
        }
    })
})

observer.observe(document.body, {
    childList: true
    , subtree: true
    , attributes: false
    , characterData: false
})
