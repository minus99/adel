/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {
    
    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        
        value = String(value);
        
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};


// MOBILE DETECT
var mobile=function(){return{detect:function(){var uagent=navigator.userAgent.toLowerCase();var list=this.mobiles;var ismobile=false;for(var d=0;d<list.length;d+=1)if(uagent.indexOf(list[d])!=-1)ismobile=true;return ismobile},mobiles:["midp","240x320","blackberry","netfront","nokia","panasonic","portalmmm","sharp","sie-","sonyericsson","symbian","windows ce","benq","mda","mot-","opera mini","philips","pocket pc","sagem","samsung","sda","sgh-","vodafone","xda","palm","iphone","ipod","android","ipad"]}}();

// URL READ
var minusLoc = {
    put: function(type, param, prop) {
        var hash = window.location.hash,
            path = window.location.pathname,
            query = window.location.search,
            host = window.location.host,
            url = window.location.href;
        if (type == "#") window.location.hash = this.encoder(param);
        else if (type == "?") {
            var a, b = false;
            a = query.substring(query.indexOf("?") + 1, query.length).split("&");
            for (var i = 0; i < a.length; i++)
                if (a[i].indexOf(prop + "=") != -1) b = a[i];
            if (b != false) url = url.replace(b, prop + "=" + param);
            else if (query != "") url = "http://" + host + path + query + "&" + prop +
                "=" + param + hash;
            else url = "http://" + host + path + "?" + prop + "=" + param + hash;
           // window.location.replace(url)
		   
		   return url;
        }
    },
    get: function(type, param, href) {
        var str, got = false;
        if (type == "#") str = window.location.hash.replace(/^#/, "");
        else if (type == "?") {
            str = href != undefined ? href : window.location.search;
            str = str.substring(str.indexOf("?") + 1, str.length).split("&");
            for (var i = 0; i < str.length; i++)
                if (str[i].indexOf(param + "=") != -1) {
                    str = str[i].replace(param + "=", "");
                    got = true
                }
            if (!got) str = ""
        }
        try {
            return $.browser.mozilla ? str : decodeURIComponent(str)
        } catch (error) {
            return str
        }
    },
    string: function(string, param) {
        var str;
        if (param == undefined) str = string.substring(string.indexOf("#") + 1, string.length);
        else {
            str = string.substring(string.indexOf("?") + 1, string.length).split("&");
            for (var i = 0; i < str.length; i++)
                if (str[i].indexOf(param + "=") != -1) str = str[i].replace(param + "=", "")
        }
        try {
            return $.browser.mozilla ? str : decodeURIComponent(str)
        } catch (error) {
            return str
        }
    },
    encoder: encodeURIComponent,
    remove: function(type, prop) {
        var query = window.location.search,
            url = window.location.href;
        if (type == "#") window.location.hash =
            "";
        else if (type == "?") {
            var a, b = false;
            a = query.substring(query.indexOf("?") + 1, query.length).split("&");
            for (var i = 0; i < a.length; i++)
                if (a[i].indexOf(prop + "=") != -1) b = a[i];
            if (b != false)
                if (url.substr(url.indexOf(prop) - 1, 1) == "&") url = url.replace("&" + b, "");
                else if (url.indexOf("&") != -1) url = url.replace(b + "&", "");
            else url = url.replace("?" + b, "");
            
			//window.location.replace(url)
			
			
			return url;
        }
    }
};

/**
 * Swiper 3.4.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: October 16, 2016
 */
(function(){function P(l){l.fn.swiper=function(k){var d;l(this).each(function(){var e=new z(this,k);d||(d=e)});return d}}var m,z=function(l,k){function d(){var b=a.params.autoplay,c=a.slides.eq(a.activeIndex);c.attr("data-swiper-autoplay")&&(b=c.attr("data-swiper-autoplay")||a.params.autoplay);a.autoplayTimeoutId=setTimeout(function(){a.params.loop?(a.fixLoop(),a._slideNext(),a.emit("onAutoplay",a)):a.isEnd?k.autoplayStopOnLast?a.stopAutoplay():(a._slideTo(0),a.emit("onAutoplay",a)):(a._slideNext(),
a.emit("onAutoplay",a))},b)}function e(a,c){var b=m(a.target);if(!b.is(c))if("string"===typeof c)b=b.parents(c);else if(c.nodeType){var u;b.parents().each(function(a,b){b===c&&(u=c)});if(u)return c;return}if(0!==b.length)return b[0]}function f(b,c){c=c||{};var g=new (window.MutationObserver||window.WebkitMutationObserver)(function(b){b.forEach(function(b){a.onResize(!0);a.emit("onObserverUpdate",a,b)})});g.observe(b,{attributes:"undefined"===typeof c.attributes?!0:c.attributes,childList:"undefined"===
typeof c.childList?!0:c.childList,characterData:"undefined"===typeof c.characterData?!0:c.characterData});a.observers.push(g)}function h(b){b.originalEvent&&(b=b.originalEvent);var c=b.keyCode||b.charCode;if(!a.params.allowSwipeToNext&&(a.isHorizontal()&&39===c||!a.isHorizontal()&&40===c)||!a.params.allowSwipeToPrev&&(a.isHorizontal()&&37===c||!a.isHorizontal()&&38===c))return!1;if(!(b.shiftKey||b.altKey||b.ctrlKey||b.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||
"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===c||39===c||38===c||40===c){var g=!1;if(0<a.container.parents("."+a.params.slideClass).length&&0===a.container.parents("."+a.params.slideActiveClass).length)return;var u=window.pageXOffset,d=window.pageYOffset,e=window.innerWidth,f=window.innerHeight,n=a.container.offset();a.rtl&&(n.left-=a.container[0].scrollLeft);for(var n=[[n.left,n.top],[n.left+a.width,n.top],[n.left,n.top+a.height],[n.left+a.width,n.top+a.height]],h=0;h<n.length;h++){var k=
n[h];k[0]>=u&&k[0]<=u+e&&k[1]>=d&&k[1]<=d+f&&(g=!0)}if(!g)return}if(a.isHorizontal()){if(37===c||39===c)b.preventDefault?b.preventDefault():b.returnValue=!1;(39===c&&!a.rtl||37===c&&a.rtl)&&a.slideNext();(37===c&&!a.rtl||39===c&&a.rtl)&&a.slidePrev()}else{if(38===c||40===c)b.preventDefault?b.preventDefault():b.returnValue=!1;40===c&&a.slideNext();38===c&&a.slidePrev()}}}function q(){var a="onwheel"in document;a||(a=document.createElement("div"),a.setAttribute("onwheel","return;"),a="function"===typeof a.onwheel);
!a&&document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("","")&&(a=document.implementation.hasFeature("Events.wheel","3.0"));return a}function r(b){b.originalEvent&&(b=b.originalEvent);var c=0,c=a.rtl?-1:1,g=p(b);if(a.params.mousewheelForceToAxis)if(a.isHorizontal())if(Math.abs(g.pixelX)>Math.abs(g.pixelY))c*=g.pixelX;else return;else if(Math.abs(g.pixelY)>Math.abs(g.pixelX))c=g.pixelY;else return;else c=Math.abs(g.pixelX)>Math.abs(g.pixelY)?-g.pixelX*
c:-g.pixelY;if(0!==c){a.params.mousewheelInvert&&(c=-c);if(a.params.freeMode){var c=a.getWrapperTranslate()+c*a.params.mousewheelSensitivity,g=a.isBeginning,u=a.isEnd;c>=a.minTranslate()&&(c=a.minTranslate());c<=a.maxTranslate()&&(c=a.maxTranslate());a.setWrapperTransition(0);a.setWrapperTranslate(c);a.updateProgress();a.updateActiveIndex();(!g&&a.isBeginning||!u&&a.isEnd)&&a.updateClasses();a.params.freeModeSticky?(clearTimeout(a.mousewheel.timeout),a.mousewheel.timeout=setTimeout(function(){a.slideReset()},
300)):a.params.lazyLoading&&a.lazy&&a.lazy.load();a.emit("onScroll",a,b);a.params.autoplay&&a.params.autoplayDisableOnInteraction&&a.stopAutoplay();if(0===c||c===a.maxTranslate())return}else{if(60<(new window.Date).getTime()-a.mousewheel.lastScrollTime)if(0>c)if((!a.isEnd||a.params.loop)&&!a.animating)a.slideNext(),a.emit("onScroll",a,b);else{if(a.params.mousewheelReleaseOnEdges)return!0}else if((!a.isBeginning||a.params.loop)&&!a.animating)a.slidePrev(),a.emit("onScroll",a,b);else if(a.params.mousewheelReleaseOnEdges)return!0;
a.mousewheel.lastScrollTime=(new window.Date).getTime()}b.preventDefault?b.preventDefault():b.returnValue=!1;return!1}}function p(a){var b=0,g=0,u,d;"detail"in a&&(g=a.detail);"wheelDelta"in a&&(g=-a.wheelDelta/120);"wheelDeltaY"in a&&(g=-a.wheelDeltaY/120);"wheelDeltaX"in a&&(b=-a.wheelDeltaX/120);"axis"in a&&a.axis===a.HORIZONTAL_AXIS&&(b=g,g=0);u=10*b;d=10*g;"deltaY"in a&&(d=a.deltaY);"deltaX"in a&&(u=a.deltaX);(u||d)&&a.deltaMode&&(1===a.deltaMode?(u*=40,d*=40):(u*=800,d*=800));u&&!b&&(b=1>u?
-1:1);d&&!g&&(g=1>d?-1:1);return{spinX:b,spinY:g,pixelX:u,pixelY:d}}function v(b,c){b=m(b);var g,d,e,f=a.rtl?-1:1;g=b.attr("data-swiper-parallax")||"0";d=b.attr("data-swiper-parallax-x");e=b.attr("data-swiper-parallax-y");d||e?(d=d||"0",e=e||"0"):a.isHorizontal()?(d=g,e="0"):(e=g,d="0");d=0<=d.indexOf("%")?parseInt(d,10)*c*f+"%":d*c*f+"px";e=0<=e.indexOf("%")?parseInt(e,10)*c+"%":e*c+"px";b.transform("translate3d("+d+", "+e+",0px)")}function Q(a){0!==a.indexOf("on")&&(a=a[0]!==a[0].toUpperCase()?
"on"+a[0].toUpperCase()+a.substring(1):"on"+a);return a}if(!(this instanceof z))return new z(l,k);var B={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,iOSEdgeSwipeDetection:!1,iOSEdgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,
setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},flip:{slideShadows:!0,limitRotation:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,zoom:!1,zoomMax:3,zoomMin:1,zoomToggle:!0,scrollbar:null,scrollbarHide:!0,scrollbarDraggable:!1,scrollbarSnapOnRelease:!1,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,mousewheelSensitivity:1,
mousewheelEventsTarged:"container",hashnav:!1,hashnavWatchState:!1,history:!1,replaceState:!1,breakpoints:void 0,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,touchReleaseOnEdges:!1,uniqueNavElements:!0,
pagination:null,paginationElement:"span",paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,paginationProgressRender:null,paginationFractionRender:null,paginationCustomRender:null,paginationType:"bullets",resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingInPrevNextAmount:1,lazyLoadingOnTransitionStart:!1,
preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,controlBy:"slide",normalizeSlideIndex:!0,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",passiveListeners:!0,containerModifierClass:"swiper-container-",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",
slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationCurrentClass:"swiper-pagination-current",paginationTotalClass:"swiper-pagination-total",paginationHiddenClass:"swiper-pagination-hidden",paginationProgressbarClass:"swiper-pagination-progressbar",
paginationClickableClass:"swiper-pagination-clickable",paginationModifierClass:"swiper-pagination-",lazyLoadingClass:"swiper-lazy",lazyStatusLoadingClass:"swiper-lazy-loading",lazyStatusLoadedClass:"swiper-lazy-loaded",lazyPreloaderClass:"swiper-lazy-preloader",notificationClass:"swiper-notification",preloaderClass:"preloader",zoomContainerClass:"swiper-zoom-container",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",
lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",runCallbacksOnInit:!0},P=k&&k.virtualTranslate;k=k||{};var I={},w;for(w in k)if("object"!==typeof k[w]||null===k[w]||k[w].nodeType||k[w]===window||k[w]===document||"undefined"!==typeof C&&k[w]instanceof C||"undefined"!==typeof jQuery&&k[w]instanceof jQuery)I[w]=k[w];else{I[w]={};for(var T in k[w])I[w][T]=k[w][T]}for(var D in B)if("undefined"===typeof k[D])k[D]=B[D];else if("object"===typeof k[D])for(var R in B[D])"undefined"===
typeof k[D][R]&&(k[D][R]=B[D][R]);var a=this;a.params=k;a.originalParams=I;a.classNames=[];"undefined"!==typeof m&&"undefined"!==typeof C&&(m=C);if("undefined"===typeof m&&(m="undefined"===typeof C?window.Dom7||window.Zepto||window.jQuery:C,!m))return;a.$=m;a.currentBreakpoint=void 0;a.getActiveBreakpoint=function(){if(!a.params.breakpoints)return!1;var b=!1,c=[],g;for(g in a.params.breakpoints)a.params.breakpoints.hasOwnProperty(g)&&c.push(g);c.sort(function(a,b){return parseInt(a,10)>parseInt(b,
10)});for(var d=0;d<c.length;d++)g=c[d],g>=window.innerWidth&&!b&&(b=g);return b||"max"};a.setBreakpoint=function(){var b=a.getActiveBreakpoint();if(b&&a.currentBreakpoint!==b){var c=b in a.params.breakpoints?a.params.breakpoints[b]:a.originalParams,g=a.params.loop&&c.slidesPerView!==a.params.slidesPerView,d;for(d in c)a.params[d]=c[d];a.currentBreakpoint=b;g&&a.destroyLoop&&a.reLoop(!0)}};a.params.breakpoints&&a.setBreakpoint();a.container=m(l);if(0!==a.container.length){if(1<a.container.length){var U=
[];a.container.each(function(){U.push(new z(this,k))});return U}a.container[0].swiper=a;a.container.data("swiper",a);a.classNames.push(a.params.containerModifierClass+a.params.direction);a.params.freeMode&&a.classNames.push(a.params.containerModifierClass+"free-mode");a.support.flexbox||(a.classNames.push(a.params.containerModifierClass+"no-flexbox"),a.params.slidesPerColumn=1);a.params.autoHeight&&a.classNames.push(a.params.containerModifierClass+"autoheight");if(a.params.parallax||a.params.watchSlidesVisibility)a.params.watchSlidesProgress=
!0;a.params.touchReleaseOnEdges&&(a.params.resistanceRatio=0);0<=["cube","coverflow","flip"].indexOf(a.params.effect)&&(a.support.transforms3d?(a.params.watchSlidesProgress=!0,a.classNames.push(a.params.containerModifierClass+"3d")):a.params.effect="slide");"slide"!==a.params.effect&&a.classNames.push(a.params.containerModifierClass+a.params.effect);"cube"===a.params.effect&&(a.params.resistanceRatio=0,a.params.slidesPerView=1,a.params.slidesPerColumn=1,a.params.slidesPerGroup=1,a.params.centeredSlides=
!1,a.params.spaceBetween=0,a.params.virtualTranslate=!0,a.params.setWrapperSize=!1);if("fade"===a.params.effect||"flip"===a.params.effect)a.params.slidesPerView=1,a.params.slidesPerColumn=1,a.params.slidesPerGroup=1,a.params.watchSlidesProgress=!0,a.params.spaceBetween=0,a.params.setWrapperSize=!1,"undefined"===typeof P&&(a.params.virtualTranslate=!0);a.params.grabCursor&&a.support.touch&&(a.params.grabCursor=!1);a.wrapper=a.container.children("."+a.params.wrapperClass);a.params.pagination&&(a.paginationContainer=
m(a.params.pagination),a.params.uniqueNavElements&&"string"===typeof a.params.pagination&&1<a.paginationContainer.length&&1===a.container.find(a.params.pagination).length&&(a.paginationContainer=a.container.find(a.params.pagination)),"bullets"===a.params.paginationType&&a.params.paginationClickable?a.paginationContainer.addClass(a.params.paginationModifierClass+"clickable"):a.params.paginationClickable=!1,a.paginationContainer.addClass(a.params.paginationModifierClass+a.params.paginationType));if(a.params.nextButton||
a.params.prevButton)a.params.nextButton&&(a.nextButton=m(a.params.nextButton),a.params.uniqueNavElements&&"string"===typeof a.params.nextButton&&1<a.nextButton.length&&1===a.container.find(a.params.nextButton).length&&(a.nextButton=a.container.find(a.params.nextButton))),a.params.prevButton&&(a.prevButton=m(a.params.prevButton),a.params.uniqueNavElements&&"string"===typeof a.params.prevButton&&1<a.prevButton.length&&1===a.container.find(a.params.prevButton).length&&(a.prevButton=a.container.find(a.params.prevButton)));
a.isHorizontal=function(){return"horizontal"===a.params.direction};a.rtl=a.isHorizontal()&&("rtl"===a.container[0].dir.toLowerCase()||"rtl"===a.container.css("direction"));a.rtl&&a.classNames.push(a.params.containerModifierClass+"rtl");a.rtl&&(a.wrongRTL="-webkit-box"===a.wrapper.css("display"));1<a.params.slidesPerColumn&&a.classNames.push(a.params.containerModifierClass+"multirow");a.device.android&&a.classNames.push(a.params.containerModifierClass+"android");a.container.addClass(a.classNames.join(" "));
a.translate=0;a.progress=0;a.velocity=0;a.lockSwipeToNext=function(){a.params.allowSwipeToNext=!1;!1===a.params.allowSwipeToPrev&&a.params.grabCursor&&a.unsetGrabCursor()};a.lockSwipeToPrev=function(){a.params.allowSwipeToPrev=!1;!1===a.params.allowSwipeToNext&&a.params.grabCursor&&a.unsetGrabCursor()};a.lockSwipes=function(){a.params.allowSwipeToNext=a.params.allowSwipeToPrev=!1;a.params.grabCursor&&a.unsetGrabCursor()};a.unlockSwipeToNext=function(){a.params.allowSwipeToNext=!0;!0===a.params.allowSwipeToPrev&&
a.params.grabCursor&&a.setGrabCursor()};a.unlockSwipeToPrev=function(){a.params.allowSwipeToPrev=!0;!0===a.params.allowSwipeToNext&&a.params.grabCursor&&a.setGrabCursor()};a.unlockSwipes=function(){a.params.allowSwipeToNext=a.params.allowSwipeToPrev=!0;a.params.grabCursor&&a.setGrabCursor()};a.setGrabCursor=function(b){a.container[0].style.cursor="move";a.container[0].style.cursor=b?"-webkit-grabbing":"-webkit-grab";a.container[0].style.cursor=b?"-moz-grabbin":"-moz-grab";a.container[0].style.cursor=
b?"grabbing":"grab"};a.unsetGrabCursor=function(){a.container[0].style.cursor=""};a.params.grabCursor&&a.setGrabCursor();a.imagesToLoad=[];a.imagesLoaded=0;a.loadImage=function(a,c,g,d,e,f){function b(){f&&f()}a.complete&&e?b():c?(a=new window.Image,a.onload=b,a.onerror=b,d&&(a.sizes=d),g&&(a.srcset=g),c&&(a.src=c)):b()};a.preloadImages=function(){function b(){"undefined"!==typeof a&&null!==a&&(void 0!==a.imagesLoaded&&a.imagesLoaded++,a.imagesLoaded===a.imagesToLoad.length&&(a.params.updateOnImagesReady&&
a.update(),a.emit("onImagesReady",a)))}a.imagesToLoad=a.container.find("img");for(var c=0;c<a.imagesToLoad.length;c++)a.loadImage(a.imagesToLoad[c],a.imagesToLoad[c].currentSrc||a.imagesToLoad[c].getAttribute("src"),a.imagesToLoad[c].srcset||a.imagesToLoad[c].getAttribute("srcset"),a.imagesToLoad[c].sizes||a.imagesToLoad[c].getAttribute("sizes"),!0,b)};a.autoplayTimeoutId=void 0;a.autoplaying=!1;a.autoplayPaused=!1;a.startAutoplay=function(){if("undefined"!==typeof a.autoplayTimeoutId||!a.params.autoplay||
a.autoplaying)return!1;a.autoplaying=!0;a.emit("onAutoplayStart",a);d()};a.stopAutoplay=function(b){a.autoplayTimeoutId&&(a.autoplayTimeoutId&&clearTimeout(a.autoplayTimeoutId),a.autoplaying=!1,a.autoplayTimeoutId=void 0,a.emit("onAutoplayStop",a))};a.pauseAutoplay=function(b){a.autoplayPaused||(a.autoplayTimeoutId&&clearTimeout(a.autoplayTimeoutId),a.autoplayPaused=!0,0===b?(a.autoplayPaused=!1,d()):a.wrapper.transitionEnd(function(){a&&(a.autoplayPaused=!1,a.autoplaying?d():a.stopAutoplay())}))};
a.minTranslate=function(){return-a.snapGrid[0]};a.maxTranslate=function(){return-a.snapGrid[a.snapGrid.length-1]};a.updateAutoHeight=function(){var b=[],c=0;if("auto"!==a.params.slidesPerView&&1<a.params.slidesPerView)for(x=0;x<Math.ceil(a.params.slidesPerView);x++){var g=a.activeIndex+x;if(g>a.slides.length)break;b.push(a.slides.eq(g)[0])}else b.push(a.slides.eq(a.activeIndex)[0]);for(x=0;x<b.length;x++)"undefined"!==typeof b[x]&&(g=b[x].offsetHeight,c=g>c?g:c);c&&a.wrapper.css("height",c+"px")};
a.updateContainerSize=function(){var b,c;b="undefined"!==typeof a.params.width?a.params.width:a.container[0].clientWidth;c="undefined"!==typeof a.params.height?a.params.height:a.container[0].clientHeight;0===b&&a.isHorizontal()||0===c&&!a.isHorizontal()||(b=b-parseInt(a.container.css("padding-left"),10)-parseInt(a.container.css("padding-right"),10),c=c-parseInt(a.container.css("padding-top"),10)-parseInt(a.container.css("padding-bottom"),10),a.width=b,a.height=c,a.size=a.isHorizontal()?a.width:a.height)};
a.updateSlidesSize=function(){a.slides=a.wrapper.children("."+a.params.slideClass);a.snapGrid=[];a.slidesGrid=[];a.slidesSizesGrid=[];var b=a.params.spaceBetween,c=-a.params.slidesOffsetBefore,g,d=0,e=0;if("undefined"!==typeof a.size){"string"===typeof b&&0<=b.indexOf("%")&&(b=parseFloat(b.replace("%",""))/100*a.size);a.virtualSize=-b;a.rtl?a.slides.css({marginLeft:"",marginTop:""}):a.slides.css({marginRight:"",marginBottom:""});var f;1<a.params.slidesPerColumn&&(f=Math.floor(a.slides.length/a.params.slidesPerColumn)===
a.slides.length/a.params.slidesPerColumn?a.slides.length:Math.ceil(a.slides.length/a.params.slidesPerColumn)*a.params.slidesPerColumn,"auto"!==a.params.slidesPerView&&"row"===a.params.slidesPerColumnFill&&(f=Math.max(f,a.params.slidesPerView*a.params.slidesPerColumn)));var h,n=a.params.slidesPerColumn,k=f/n,l=k-(a.params.slidesPerColumn*k-a.slides.length);for(g=0;g<a.slides.length;g++){h=0;var m=a.slides.eq(g);if(1<a.params.slidesPerColumn){var q,r,p;"column"===a.params.slidesPerColumnFill?(r=Math.floor(g/
n),p=g-r*n,(r>l||r===l&&p===n-1)&&++p>=n&&(p=0,r++),q=r+p*f/n,m.css({"-webkit-box-ordinal-group":q,"-moz-box-ordinal-group":q,"-ms-flex-order":q,"-webkit-order":q,order:q})):(p=Math.floor(g/k),r=g-p*k);m.css("margin-"+(a.isHorizontal()?"top":"left"),0!==p&&a.params.spaceBetween&&a.params.spaceBetween+"px").attr("data-swiper-column",r).attr("data-swiper-row",p)}"none"!==m.css("display")&&("auto"===a.params.slidesPerView?(h=a.isHorizontal()?m.outerWidth(!0):m.outerHeight(!0),a.params.roundLengths&&
(h=Math.floor(h))):(h=(a.size-(a.params.slidesPerView-1)*b)/a.params.slidesPerView,a.params.roundLengths&&(h=Math.floor(h)),a.isHorizontal()?a.slides[g].style.width=h+"px":a.slides[g].style.height=h+"px"),a.slides[g].swiperSlideSize=h,a.slidesSizesGrid.push(h),a.params.centeredSlides?(c=c+h/2+d/2+b,0===g&&(c=c-a.size/2-b),.001>Math.abs(c)&&(c=0),0===e%a.params.slidesPerGroup&&a.snapGrid.push(c),a.slidesGrid.push(c)):(0===e%a.params.slidesPerGroup&&a.snapGrid.push(c),a.slidesGrid.push(c),c=c+h+b),
a.virtualSize+=h+b,d=h,e++)}a.virtualSize=Math.max(a.virtualSize,a.size)+a.params.slidesOffsetAfter;a.rtl&&a.wrongRTL&&("slide"===a.params.effect||"coverflow"===a.params.effect)&&a.wrapper.css({width:a.virtualSize+a.params.spaceBetween+"px"});if(!a.support.flexbox||a.params.setWrapperSize)a.isHorizontal()?a.wrapper.css({width:a.virtualSize+a.params.spaceBetween+"px"}):a.wrapper.css({height:a.virtualSize+a.params.spaceBetween+"px"});if(1<a.params.slidesPerColumn&&(a.virtualSize=(h+a.params.spaceBetween)*
f,a.virtualSize=Math.ceil(a.virtualSize/a.params.slidesPerColumn)-a.params.spaceBetween,a.isHorizontal()?a.wrapper.css({width:a.virtualSize+a.params.spaceBetween+"px"}):a.wrapper.css({height:a.virtualSize+a.params.spaceBetween+"px"}),a.params.centeredSlides)){c=[];for(g=0;g<a.snapGrid.length;g++)a.snapGrid[g]<a.virtualSize+a.snapGrid[0]&&c.push(a.snapGrid[g]);a.snapGrid=c}if(!a.params.centeredSlides){c=[];for(g=0;g<a.snapGrid.length;g++)a.snapGrid[g]<=a.virtualSize-a.size&&c.push(a.snapGrid[g]);a.snapGrid=
c;1<Math.floor(a.virtualSize-a.size)-Math.floor(a.snapGrid[a.snapGrid.length-1])&&a.snapGrid.push(a.virtualSize-a.size)}0===a.snapGrid.length&&(a.snapGrid=[0]);0!==a.params.spaceBetween&&(a.isHorizontal()?a.rtl?a.slides.css({marginLeft:b+"px"}):a.slides.css({marginRight:b+"px"}):a.slides.css({marginBottom:b+"px"}));a.params.watchSlidesProgress&&a.updateSlidesOffset()}};a.updateSlidesOffset=function(){for(var b=0;b<a.slides.length;b++)a.slides[b].swiperSlideOffset=a.isHorizontal()?a.slides[b].offsetLeft:
a.slides[b].offsetTop};a.updateSlidesProgress=function(b){"undefined"===typeof b&&(b=a.translate||0);if(0!==a.slides.length){"undefined"===typeof a.slides[0].swiperSlideOffset&&a.updateSlidesOffset();var c=-b;a.rtl&&(c=b);a.slides.removeClass(a.params.slideVisibleClass);for(b=0;b<a.slides.length;b++){var g=a.slides[b],d=(c+(a.params.centeredSlides?a.minTranslate():0)-g.swiperSlideOffset)/(g.swiperSlideSize+a.params.spaceBetween);if(a.params.watchSlidesVisibility){var e=-(c-g.swiperSlideOffset),f=
e+a.slidesSizesGrid[b];(0<=e&&e<a.size||0<f&&f<=a.size||0>=e&&f>=a.size)&&a.slides.eq(b).addClass(a.params.slideVisibleClass)}g.progress=a.rtl?-d:d}}};a.updateProgress=function(b){"undefined"===typeof b&&(b=a.translate||0);var c=a.maxTranslate()-a.minTranslate(),g=a.isBeginning,d=a.isEnd;0===c?(a.progress=0,a.isBeginning=a.isEnd=!0):(a.progress=(b-a.minTranslate())/c,a.isBeginning=0>=a.progress,a.isEnd=1<=a.progress);a.isBeginning&&!g&&a.emit("onReachBeginning",a);a.isEnd&&!d&&a.emit("onReachEnd",
a);a.params.watchSlidesProgress&&a.updateSlidesProgress(b);a.emit("onProgress",a,a.progress)};a.updateActiveIndex=function(){var b=a.rtl?a.translate:-a.translate,c,g;for(g=0;g<a.slidesGrid.length;g++)"undefined"!==typeof a.slidesGrid[g+1]?b>=a.slidesGrid[g]&&b<a.slidesGrid[g+1]-(a.slidesGrid[g+1]-a.slidesGrid[g])/2?c=g:b>=a.slidesGrid[g]&&b<a.slidesGrid[g+1]&&(c=g+1):b>=a.slidesGrid[g]&&(c=g);a.params.normalizeSlideIndex&&(0>c||"undefined"===typeof c)&&(c=0);b=Math.floor(c/a.params.slidesPerGroup);
b>=a.snapGrid.length&&(b=a.snapGrid.length-1);c!==a.activeIndex&&(a.snapIndex=b,a.previousIndex=a.activeIndex,a.activeIndex=c,a.updateClasses(),a.updateRealIndex())};a.updateRealIndex=function(){a.realIndex=a.slides.eq(a.activeIndex).attr("data-swiper-slide-index")||a.activeIndex};a.updateClasses=function(){a.slides.removeClass(a.params.slideActiveClass+" "+a.params.slideNextClass+" "+a.params.slidePrevClass+" "+a.params.slideDuplicateActiveClass+" "+a.params.slideDuplicateNextClass+" "+a.params.slideDuplicatePrevClass);
var b=a.slides.eq(a.activeIndex);b.addClass(a.params.slideActiveClass);k.loop&&(b.hasClass(a.params.slideDuplicateClass)?a.wrapper.children("."+a.params.slideClass+":not(."+a.params.slideDuplicateClass+')[data-swiper-slide-index="'+a.realIndex+'"]').addClass(a.params.slideDuplicateActiveClass):a.wrapper.children("."+a.params.slideClass+"."+a.params.slideDuplicateClass+'[data-swiper-slide-index="'+a.realIndex+'"]').addClass(a.params.slideDuplicateActiveClass));var c=b.next("."+a.params.slideClass).addClass(a.params.slideNextClass);
a.params.loop&&0===c.length&&(c=a.slides.eq(0),c.addClass(a.params.slideNextClass));b=b.prev("."+a.params.slideClass).addClass(a.params.slidePrevClass);a.params.loop&&0===b.length&&(b=a.slides.eq(-1),b.addClass(a.params.slidePrevClass));k.loop&&(c.hasClass(a.params.slideDuplicateClass)?a.wrapper.children("."+a.params.slideClass+":not(."+a.params.slideDuplicateClass+')[data-swiper-slide-index="'+c.attr("data-swiper-slide-index")+'"]').addClass(a.params.slideDuplicateNextClass):a.wrapper.children("."+
a.params.slideClass+"."+a.params.slideDuplicateClass+'[data-swiper-slide-index="'+c.attr("data-swiper-slide-index")+'"]').addClass(a.params.slideDuplicateNextClass),b.hasClass(a.params.slideDuplicateClass)?a.wrapper.children("."+a.params.slideClass+":not(."+a.params.slideDuplicateClass+')[data-swiper-slide-index="'+b.attr("data-swiper-slide-index")+'"]').addClass(a.params.slideDuplicatePrevClass):a.wrapper.children("."+a.params.slideClass+"."+a.params.slideDuplicateClass+'[data-swiper-slide-index="'+
b.attr("data-swiper-slide-index")+'"]').addClass(a.params.slideDuplicatePrevClass));if(a.paginationContainer&&0<a.paginationContainer.length){var g,c=a.params.loop?Math.ceil((a.slides.length-2*a.loopedSlides)/a.params.slidesPerGroup):a.snapGrid.length;a.params.loop?(g=Math.ceil((a.activeIndex-a.loopedSlides)/a.params.slidesPerGroup),g>a.slides.length-1-2*a.loopedSlides&&(g-=a.slides.length-2*a.loopedSlides),g>c-1&&(g-=c),0>g&&"bullets"!==a.params.paginationType&&(g=c+g)):g="undefined"!==typeof a.snapIndex?
a.snapIndex:a.activeIndex||0;"bullets"===a.params.paginationType&&a.bullets&&0<a.bullets.length&&(a.bullets.removeClass(a.params.bulletActiveClass),1<a.paginationContainer.length?a.bullets.each(function(){m(this).index()===g&&m(this).addClass(a.params.bulletActiveClass)}):a.bullets.eq(g).addClass(a.params.bulletActiveClass));"fraction"===a.params.paginationType&&(a.paginationContainer.find("."+a.params.paginationCurrentClass).text(g+1),a.paginationContainer.find("."+a.params.paginationTotalClass).text(c));
if("progress"===a.params.paginationType){var d=b=(g+1)/c,e=1;a.isHorizontal()||(e=b,d=1);a.paginationContainer.find("."+a.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX("+d+") scaleY("+e+")").transition(a.params.speed)}"custom"===a.params.paginationType&&a.params.paginationCustomRender&&(a.paginationContainer.html(a.params.paginationCustomRender(a,g+1,c)),a.emit("onPaginationRendered",a,a.paginationContainer[0]))}a.params.loop||(a.params.prevButton&&a.prevButton&&0<a.prevButton.length&&
(a.isBeginning?(a.prevButton.addClass(a.params.buttonDisabledClass),a.params.a11y&&a.a11y&&a.a11y.disable(a.prevButton)):(a.prevButton.removeClass(a.params.buttonDisabledClass),a.params.a11y&&a.a11y&&a.a11y.enable(a.prevButton))),a.params.nextButton&&a.nextButton&&0<a.nextButton.length&&(a.isEnd?(a.nextButton.addClass(a.params.buttonDisabledClass),a.params.a11y&&a.a11y&&a.a11y.disable(a.nextButton)):(a.nextButton.removeClass(a.params.buttonDisabledClass),a.params.a11y&&a.a11y&&a.a11y.enable(a.nextButton))))};
a.updatePagination=function(){if(a.params.pagination&&a.paginationContainer&&0<a.paginationContainer.length){var b="";if("bullets"===a.params.paginationType){for(var c=a.params.loop?Math.ceil((a.slides.length-2*a.loopedSlides)/a.params.slidesPerGroup):a.snapGrid.length,g=0;g<c;g++)b=a.params.paginationBulletRender?b+a.params.paginationBulletRender(a,g,a.params.bulletClass):b+("<"+a.params.paginationElement+' class="'+a.params.bulletClass+'"></'+a.params.paginationElement+">");a.paginationContainer.html(b);
a.bullets=a.paginationContainer.find("."+a.params.bulletClass);a.params.paginationClickable&&a.params.a11y&&a.a11y&&a.a11y.initPagination()}"fraction"===a.params.paginationType&&(b=a.params.paginationFractionRender?a.params.paginationFractionRender(a,a.params.paginationCurrentClass,a.params.paginationTotalClass):'<span class="'+a.params.paginationCurrentClass+'"></span> / <span class="'+a.params.paginationTotalClass+'"></span>',a.paginationContainer.html(b));"progress"===a.params.paginationType&&
(b=a.params.paginationProgressRender?a.params.paginationProgressRender(a,a.params.paginationProgressbarClass):'<span class="'+a.params.paginationProgressbarClass+'"></span>',a.paginationContainer.html(b));"custom"!==a.params.paginationType&&a.emit("onPaginationRendered",a,a.paginationContainer[0])}};a.update=function(b){function c(){g=Math.min(Math.max(a.translate,a.maxTranslate()),a.minTranslate());a.setWrapperTranslate(g);a.updateActiveIndex();a.updateClasses()}a.updateContainerSize();a.updateSlidesSize();
a.updateProgress();a.updatePagination();a.updateClasses();a.params.scrollbar&&a.scrollbar&&a.scrollbar.set();if(b){var g;a.controller&&a.controller.spline&&(a.controller.spline=void 0);a.params.freeMode?(c(),a.params.autoHeight&&a.updateAutoHeight()):(b=("auto"===a.params.slidesPerView||1<a.params.slidesPerView)&&a.isEnd&&!a.params.centeredSlides?a.slideTo(a.slides.length-1,0,!1,!0):a.slideTo(a.activeIndex,0,!1,!0))||c()}else a.params.autoHeight&&a.updateAutoHeight()};a.onResize=function(b){a.params.breakpoints&&
a.setBreakpoint();var c=a.params.allowSwipeToPrev,g=a.params.allowSwipeToNext;a.params.allowSwipeToPrev=a.params.allowSwipeToNext=!0;a.updateContainerSize();a.updateSlidesSize();("auto"===a.params.slidesPerView||a.params.freeMode||b)&&a.updatePagination();a.params.scrollbar&&a.scrollbar&&a.scrollbar.set();a.controller&&a.controller.spline&&(a.controller.spline=void 0);b=!1;if(a.params.freeMode){var d=Math.min(Math.max(a.translate,a.maxTranslate()),a.minTranslate());a.setWrapperTranslate(d);a.updateActiveIndex();
a.updateClasses();a.params.autoHeight&&a.updateAutoHeight()}else a.updateClasses(),b=("auto"===a.params.slidesPerView||1<a.params.slidesPerView)&&a.isEnd&&!a.params.centeredSlides?a.slideTo(a.slides.length-1,0,!1,!0):a.slideTo(a.activeIndex,0,!1,!0);a.params.lazyLoading&&!b&&a.lazy&&a.lazy.load();a.params.allowSwipeToPrev=c;a.params.allowSwipeToNext=g};a.touchEventsDesktop={start:"mousedown",move:"mousemove",end:"mouseup"};window.navigator.pointerEnabled?a.touchEventsDesktop={start:"pointerdown",
move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled&&(a.touchEventsDesktop={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"});a.touchEvents={start:a.support.touch||!a.params.simulateTouch?"touchstart":a.touchEventsDesktop.start,move:a.support.touch||!a.params.simulateTouch?"touchmove":a.touchEventsDesktop.move,end:a.support.touch||!a.params.simulateTouch?"touchend":a.touchEventsDesktop.end};(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===
a.params.touchEventsTarget?a.container:a.wrapper).addClass("swiper-wp8-"+a.params.direction);a.initEvents=function(b){var c=b?"off":"on";b=b?"removeEventListener":"addEventListener";var g="container"===a.params.touchEventsTarget?a.container[0]:a.wrapper[0],d=a.support.touch?g:document,e=a.params.nested?!0:!1;if(a.browser.ie)g[b](a.touchEvents.start,a.onTouchStart,!1),d[b](a.touchEvents.move,a.onTouchMove,e),d[b](a.touchEvents.end,a.onTouchEnd,!1);else if(a.support.touch&&(d="touchstart"===a.touchEvents.start&&
a.support.passiveListener&&a.params.passiveListeners?{passive:!0,capture:!1}:!1,g[b](a.touchEvents.start,a.onTouchStart,d),g[b](a.touchEvents.move,a.onTouchMove,e),g[b](a.touchEvents.end,a.onTouchEnd,d)),k.simulateTouch&&!a.device.ios&&!a.device.android||k.simulateTouch&&!a.support.touch&&a.device.ios)g[b]("mousedown",a.onTouchStart,!1),document[b]("mousemove",a.onTouchMove,e),document[b]("mouseup",a.onTouchEnd,!1);window[b]("resize",a.onResize);if(a.params.nextButton&&a.nextButton&&0<a.nextButton.length&&
(a.nextButton[c]("click",a.onClickNext),a.params.a11y&&a.a11y))a.nextButton[c]("keydown",a.a11y.onEnterKey);if(a.params.prevButton&&a.prevButton&&0<a.prevButton.length&&(a.prevButton[c]("click",a.onClickPrev),a.params.a11y&&a.a11y))a.prevButton[c]("keydown",a.a11y.onEnterKey);if(a.params.pagination&&a.params.paginationClickable&&(a.paginationContainer[c]("click","."+a.params.bulletClass,a.onClickIndex),a.params.a11y&&a.a11y))a.paginationContainer[c]("keydown","."+a.params.bulletClass,a.a11y.onEnterKey);
if(a.params.preventClicks||a.params.preventClicksPropagation)g[b]("click",a.preventClicks,!0)};a.attachEvents=function(){a.initEvents()};a.detachEvents=function(){a.initEvents(!0)};a.allowClick=!0;a.preventClicks=function(b){a.allowClick||(a.params.preventClicks&&b.preventDefault(),a.params.preventClicksPropagation&&a.animating&&(b.stopPropagation(),b.stopImmediatePropagation()))};a.onClickNext=function(b){b.preventDefault();a.isEnd&&!a.params.loop||a.slideNext()};a.onClickPrev=function(b){b.preventDefault();
a.isBeginning&&!a.params.loop||a.slidePrev()};a.onClickIndex=function(b){b.preventDefault();b=m(this).index()*a.params.slidesPerGroup;a.params.loop&&(b+=a.loopedSlides);a.slideTo(b)};a.updateClickedSlide=function(b){b=e(b,"."+a.params.slideClass);var c=!1;if(b)for(var g=0;g<a.slides.length;g++)a.slides[g]===b&&(c=!0);if(b&&c){if(a.clickedSlide=b,a.clickedIndex=m(b).index(),a.params.slideToClickedSlide&&void 0!==a.clickedIndex&&a.clickedIndex!==a.activeIndex){var d=a.clickedIndex;a.params.loop?a.animating||
(b=m(a.clickedSlide).attr("data-swiper-slide-index"),a.params.centeredSlides?d<a.loopedSlides-a.params.slidesPerView/2||d>a.slides.length-a.loopedSlides+a.params.slidesPerView/2?(a.fixLoop(),d=a.wrapper.children("."+a.params.slideClass+'[data-swiper-slide-index="'+b+'"]:not(.'+a.params.slideDuplicateClass+")").eq(0).index(),setTimeout(function(){a.slideTo(d)},0)):a.slideTo(d):d>a.slides.length-a.params.slidesPerView?(a.fixLoop(),d=a.wrapper.children("."+a.params.slideClass+'[data-swiper-slide-index="'+
b+'"]:not(.'+a.params.slideDuplicateClass+")").eq(0).index(),setTimeout(function(){a.slideTo(d)},0)):a.slideTo(d)):a.slideTo(d)}}else a.clickedSlide=void 0,a.clickedIndex=void 0};var A,E,J,K,G,t,y,L,S=Date.now(),H,F=[],M;a.animating=!1;a.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var N,O;a.onTouchStart=function(b){b.originalEvent&&(b=b.originalEvent);if((N="touchstart"===b.type)||!("which"in b)||3!==b.which)if(a.params.noSwiping&&e(b,"."+a.params.noSwipingClass))a.allowClick=!0;else if(!a.params.swipeHandler||
e(b,a.params.swipeHandler)){var c=a.touches.currentX="touchstart"===b.type?b.targetTouches[0].pageX:b.pageX,g=a.touches.currentY="touchstart"===b.type?b.targetTouches[0].pageY:b.pageY;a.device.ios&&a.params.iOSEdgeSwipeDetection&&c<=a.params.iOSEdgeSwipeThreshold||(A=!0,E=!1,J=!0,O=G=void 0,a.touches.startX=c,a.touches.startY=g,K=Date.now(),a.allowClick=!0,a.updateContainerSize(),a.swipeDirection=void 0,0<a.params.threshold&&(L=!1),"touchstart"!==b.type&&(c=!0,m(b.target).is("input, select, textarea, button, video")&&
(c=!1),document.activeElement&&m(document.activeElement).is("input, select, textarea, button, video")&&document.activeElement.blur(),c&&b.preventDefault()),a.emit("onTouchStart",a,b))}};a.onTouchMove=function(b){b.originalEvent&&(b=b.originalEvent);if(!N||"mousemove"!==b.type)if(b.preventedByNestedSwiper)a.touches.startX="touchmove"===b.type?b.targetTouches[0].pageX:b.pageX,a.touches.startY="touchmove"===b.type?b.targetTouches[0].pageY:b.pageY;else if(a.params.onlyExternal)a.allowClick=!1,A&&(a.touches.startX=
a.touches.currentX="touchmove"===b.type?b.targetTouches[0].pageX:b.pageX,a.touches.startY=a.touches.currentY="touchmove"===b.type?b.targetTouches[0].pageY:b.pageY,K=Date.now());else{if(N&&a.params.touchReleaseOnEdges&&!a.params.loop)if(!a.isHorizontal()){if(a.touches.currentY<a.touches.startY&&a.translate<=a.maxTranslate()||a.touches.currentY>a.touches.startY&&a.translate>=a.minTranslate())return}else if(a.touches.currentX<a.touches.startX&&a.translate<=a.maxTranslate()||a.touches.currentX>a.touches.startX&&
a.translate>=a.minTranslate())return;if(N&&document.activeElement&&b.target===document.activeElement&&m(b.target).is("input, select, textarea, button, video"))E=!0,a.allowClick=!1;else if(J&&a.emit("onTouchMove",a,b),!(b.targetTouches&&1<b.targetTouches.length)){a.touches.currentX="touchmove"===b.type?b.targetTouches[0].pageX:b.pageX;a.touches.currentY="touchmove"===b.type?b.targetTouches[0].pageY:b.pageY;if("undefined"===typeof G){var c;a.isHorizontal()&&a.touches.currentY===a.touches.startY||!a.isHorizontal()&&
a.touches.currentX!==a.touches.startX?G=!1:(c=180*Math.atan2(Math.abs(a.touches.currentY-a.touches.startY),Math.abs(a.touches.currentX-a.touches.startX))/Math.PI,G=a.isHorizontal()?c>a.params.touchAngle:90-c>a.params.touchAngle)}G&&a.emit("onTouchMoveOpposite",a,b);"undefined"!==typeof O||!a.browser.ieTouch||a.touches.currentX===a.touches.startX&&a.touches.currentY===a.touches.startY||(O=!0);if(A)if(G)A=!1;else if(O||!a.browser.ieTouch){a.allowClick=!1;a.emit("onSliderMove",a,b);b.preventDefault();
a.params.touchMoveStopPropagation&&!a.params.nested&&b.stopPropagation();E||(k.loop&&a.fixLoop(),y=a.getWrapperTranslate(),a.setWrapperTransition(0),a.animating&&a.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),a.params.autoplay&&a.autoplaying&&(a.params.autoplayDisableOnInteraction?a.stopAutoplay():a.pauseAutoplay()),M=!1,!a.params.grabCursor||!0!==a.params.allowSwipeToNext&&!0!==a.params.allowSwipeToPrev||a.setGrabCursor(!0));E=!0;c=a.touches.diff=
a.isHorizontal()?a.touches.currentX-a.touches.startX:a.touches.currentY-a.touches.startY;c*=a.params.touchRatio;a.rtl&&(c=-c);a.swipeDirection=0<c?"prev":"next";t=c+y;a.emit("onDiff",{diff:c,startTranslate:y});var g=!0;0<c&&t>a.minTranslate()?(g=!1,a.params.resistance&&(t=a.minTranslate()-1+Math.pow(-a.minTranslate()+y+c,a.params.resistanceRatio))):0>c&&t<a.maxTranslate()&&(g=!1,a.params.resistance&&(t=a.maxTranslate()+1-Math.pow(a.maxTranslate()-y-c,a.params.resistanceRatio)));g&&(b.preventedByNestedSwiper=
!0);!a.params.allowSwipeToNext&&"next"===a.swipeDirection&&t<y&&(t=y);!a.params.allowSwipeToPrev&&"prev"===a.swipeDirection&&t>y&&(t=y);if(0<a.params.threshold)if(Math.abs(c)>a.params.threshold||L){if(!L){L=!0;a.touches.startX=a.touches.currentX;a.touches.startY=a.touches.currentY;t=y;a.touches.diff=a.isHorizontal()?a.touches.currentX-a.touches.startX:a.touches.currentY-a.touches.startY;return}}else{t=y;return}a.params.followFinger&&((a.params.freeMode||a.params.watchSlidesProgress)&&a.updateActiveIndex(),
a.params.freeMode&&(0===F.length&&F.push({position:a.touches[a.isHorizontal()?"startX":"startY"],time:K}),F.push({position:a.touches[a.isHorizontal()?"currentX":"currentY"],time:(new window.Date).getTime()})),a.updateProgress(t),a.setWrapperTranslate(t))}}}};a.onTouchEnd=function(b){b.originalEvent&&(b=b.originalEvent);J&&a.emit("onTouchEnd",a,b);J=!1;if(A){a.params.grabCursor&&E&&A&&(!0===a.params.allowSwipeToNext||!0===a.params.allowSwipeToPrev)&&a.setGrabCursor(!1);var c=Date.now(),g=c-K;a.allowClick&&
(a.updateClickedSlide(b),a.emit("onTap",a,b),300>g&&300<c-S&&(H&&clearTimeout(H),H=setTimeout(function(){a&&(a.params.paginationHide&&0<a.paginationContainer.length&&!m(b.target).hasClass(a.params.bulletClass)&&a.paginationContainer.toggleClass(a.params.paginationHiddenClass),a.emit("onClick",a,b))},300)),300>g&&300>c-S&&(H&&clearTimeout(H),a.emit("onDoubleTap",a,b)));S=Date.now();setTimeout(function(){a&&(a.allowClick=!0)},0);if(A&&E&&a.swipeDirection&&0!==a.touches.diff&&t!==y)if(A=E=!1,c=a.params.followFinger?
a.rtl?a.translate:-a.translate:-t,a.params.freeMode)if(c<-a.minTranslate())a.slideTo(a.activeIndex);else if(c>-a.maxTranslate())a.slides.length<a.snapGrid.length?a.slideTo(a.snapGrid.length-1):a.slideTo(a.slides.length-1);else{if(a.params.freeModeMomentum){if(1<F.length){var c=F.pop(),d=F.pop(),e=c.time-d.time;a.velocity=(c.position-d.position)/e;a.velocity/=2;Math.abs(a.velocity)<a.params.freeModeMinimumVelocity&&(a.velocity=0);if(150<e||300<(new window.Date).getTime()-c.time)a.velocity=0}else a.velocity=
0;a.velocity*=a.params.freeModeMomentumVelocityRatio;F.length=0;c=1E3*a.params.freeModeMomentumRatio;d=a.translate+a.velocity*c;a.rtl&&(d=-d);var e=!1,f,h=20*Math.abs(a.velocity)*a.params.freeModeMomentumBounceRatio;if(d<a.maxTranslate())a.params.freeModeMomentumBounce?(d+a.maxTranslate()<-h&&(d=a.maxTranslate()-h),f=a.maxTranslate(),M=e=!0):d=a.maxTranslate();else if(d>a.minTranslate())a.params.freeModeMomentumBounce?(d-a.minTranslate()>h&&(d=a.minTranslate()+h),f=a.minTranslate(),M=e=!0):d=a.minTranslate();
else if(a.params.freeModeSticky){for(var h=0,n,h=0;h<a.snapGrid.length;h+=1)if(a.snapGrid[h]>-d){n=h;break}d=Math.abs(a.snapGrid[n]-d)<Math.abs(a.snapGrid[n-1]-d)||"next"===a.swipeDirection?a.snapGrid[n]:a.snapGrid[n-1];a.rtl||(d=-d)}if(0!==a.velocity)c=a.rtl?Math.abs((-d-a.translate)/a.velocity):Math.abs((d-a.translate)/a.velocity);else if(a.params.freeModeSticky){a.slideReset();return}a.params.freeModeMomentumBounce&&e?(a.updateProgress(f),a.setWrapperTransition(c),a.setWrapperTranslate(d),a.onTransitionStart(),
a.animating=!0,a.wrapper.transitionEnd(function(){a&&M&&(a.emit("onMomentumBounce",a),a.setWrapperTransition(a.params.speed),a.setWrapperTranslate(f),a.wrapper.transitionEnd(function(){if(a)a.onTransitionEnd()}))})):a.velocity?(a.updateProgress(d),a.setWrapperTransition(c),a.setWrapperTranslate(d),a.onTransitionStart(),a.animating||(a.animating=!0,a.wrapper.transitionEnd(function(){if(a)a.onTransitionEnd()}))):a.updateProgress(d);a.updateActiveIndex()}if(!a.params.freeModeMomentum||g>=a.params.longSwipesMs)a.updateProgress(),
a.updateActiveIndex()}else{n=0;e=a.slidesSizesGrid[0];for(d=0;d<a.slidesGrid.length;d+=a.params.slidesPerGroup)"undefined"!==typeof a.slidesGrid[d+a.params.slidesPerGroup]?c>=a.slidesGrid[d]&&c<a.slidesGrid[d+a.params.slidesPerGroup]&&(n=d,e=a.slidesGrid[d+a.params.slidesPerGroup]-a.slidesGrid[d]):c>=a.slidesGrid[d]&&(n=d,e=a.slidesGrid[a.slidesGrid.length-1]-a.slidesGrid[a.slidesGrid.length-2]);c=(c-a.slidesGrid[n])/e;g>a.params.longSwipesMs?a.params.longSwipes?("next"===a.swipeDirection&&(c>=a.params.longSwipesRatio?
a.slideTo(n+a.params.slidesPerGroup):a.slideTo(n)),"prev"===a.swipeDirection&&(c>1-a.params.longSwipesRatio?a.slideTo(n+a.params.slidesPerGroup):a.slideTo(n))):a.slideTo(a.activeIndex):a.params.shortSwipes?("next"===a.swipeDirection&&a.slideTo(n+a.params.slidesPerGroup),"prev"===a.swipeDirection&&a.slideTo(n)):a.slideTo(a.activeIndex)}else A=E=!1}};a._slideTo=function(b,c){return a.slideTo(b,c,!0,!0)};a.slideTo=function(b,c,g,d){"undefined"===typeof g&&(g=!0);"undefined"===typeof b&&(b=0);0>b&&(b=
0);a.snapIndex=Math.floor(b/a.params.slidesPerGroup);a.snapIndex>=a.snapGrid.length&&(a.snapIndex=a.snapGrid.length-1);var e=-a.snapGrid[a.snapIndex];a.params.autoplay&&a.autoplaying&&(d||!a.params.autoplayDisableOnInteraction?a.pauseAutoplay(c):a.stopAutoplay());a.updateProgress(e);if(a.params.normalizeSlideIndex)for(d=0;d<a.slidesGrid.length;d++)-Math.floor(100*e)>=Math.floor(100*a.slidesGrid[d])&&(b=d);if(!a.params.allowSwipeToNext&&e<a.translate&&e<a.minTranslate()||!a.params.allowSwipeToPrev&&
e>a.translate&&e>a.maxTranslate()&&(a.activeIndex||0)!==b)return!1;"undefined"===typeof c&&(c=a.params.speed);a.previousIndex=a.activeIndex||0;a.activeIndex=b;a.updateRealIndex();if(a.rtl&&-e===a.translate||!a.rtl&&e===a.translate)return a.params.autoHeight&&a.updateAutoHeight(),a.updateClasses(),"slide"!==a.params.effect&&a.setWrapperTranslate(e),!1;a.updateClasses();a.onTransitionStart(g);0===c||a.browser.lteIE9?(a.setWrapperTranslate(e),a.setWrapperTransition(0),a.onTransitionEnd(g)):(a.setWrapperTranslate(e),
a.setWrapperTransition(c),a.animating||(a.animating=!0,a.wrapper.transitionEnd(function(){if(a)a.onTransitionEnd(g)})));return!0};a.onTransitionStart=function(b){"undefined"===typeof b&&(b=!0);a.params.autoHeight&&a.updateAutoHeight();if(a.lazy)a.lazy.onTransitionStart();b&&(a.emit("onTransitionStart",a),a.activeIndex!==a.previousIndex&&(a.emit("onSlideChangeStart",a),a.activeIndex>a.previousIndex?a.emit("onSlideNextStart",a):a.emit("onSlidePrevStart",a)))};a.onTransitionEnd=function(b){a.animating=
!1;a.setWrapperTransition(0);"undefined"===typeof b&&(b=!0);if(a.lazy)a.lazy.onTransitionEnd();b&&(a.emit("onTransitionEnd",a),a.activeIndex!==a.previousIndex&&(a.emit("onSlideChangeEnd",a),a.activeIndex>a.previousIndex?a.emit("onSlideNextEnd",a):a.emit("onSlidePrevEnd",a)));a.params.history&&a.history&&a.history.setHistory(a.params.history,a.activeIndex);a.params.hashnav&&a.hashnav&&a.hashnav.setHash()};a.slideNext=function(b,c,g){if(a.params.loop){if(a.animating)return!1;a.fixLoop()}return a.slideTo(a.activeIndex+
a.params.slidesPerGroup,c,b,g)};a._slideNext=function(b){return a.slideNext(!0,b,!0)};a.slidePrev=function(b,c,g){if(a.params.loop){if(a.animating)return!1;a.fixLoop()}return a.slideTo(a.activeIndex-1,c,b,g)};a._slidePrev=function(b){return a.slidePrev(!0,b,!0)};a.slideReset=function(b,c,g){return a.slideTo(a.activeIndex,c,b)};a.disableTouchControl=function(){return a.params.onlyExternal=!0};a.enableTouchControl=function(){a.params.onlyExternal=!1;return!0};a.setWrapperTransition=function(b,c){a.wrapper.transition(b);
"slide"!==a.params.effect&&a.effects[a.params.effect]&&a.effects[a.params.effect].setTransition(b);a.params.parallax&&a.parallax&&a.parallax.setTransition(b);a.params.scrollbar&&a.scrollbar&&a.scrollbar.setTransition(b);a.params.control&&a.controller&&a.controller.setTransition(b,c);a.emit("onSetTransition",a,b)};a.setWrapperTranslate=function(b,c,g){var d=0,e=0;a.isHorizontal()?d=a.rtl?-b:b:e=b;a.params.roundLengths&&(d=Math.floor(d),e=Math.floor(e));a.params.virtualTranslate||(a.support.transforms3d?
a.wrapper.transform("translate3d("+d+"px, "+e+"px, 0px)"):a.wrapper.transform("translate("+d+"px, "+e+"px)"));a.translate=a.isHorizontal()?d:e;d=a.maxTranslate()-a.minTranslate();(0===d?0:(b-a.minTranslate())/d)!==a.progress&&a.updateProgress(b);c&&a.updateActiveIndex();"slide"!==a.params.effect&&a.effects[a.params.effect]&&a.effects[a.params.effect].setTranslate(a.translate);a.params.parallax&&a.parallax&&a.parallax.setTranslate(a.translate);a.params.scrollbar&&a.scrollbar&&a.scrollbar.setTranslate(a.translate);
a.params.control&&a.controller&&a.controller.setTranslate(a.translate,g);a.emit("onSetTranslate",a,a.translate)};a.getTranslate=function(b,c){var g,d,e;"undefined"===typeof c&&(c="x");if(a.params.virtualTranslate)return a.rtl?-a.translate:a.translate;e=window.getComputedStyle(b,null);window.WebKitCSSMatrix?(d=e.transform||e.webkitTransform,6<d.split(",").length&&(d=d.split(", ").map(function(a){return a.replace(",",".")}).join(", ")),e=new window.WebKitCSSMatrix("none"===d?"":d)):(e=e.MozTransform||
e.OTransform||e.MsTransform||e.msTransform||e.transform||e.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),g=e.toString().split(","));"x"===c&&(d=window.WebKitCSSMatrix?e.m41:16===g.length?parseFloat(g[12]):parseFloat(g[4]));"y"===c&&(d=window.WebKitCSSMatrix?e.m42:16===g.length?parseFloat(g[13]):parseFloat(g[5]));a.rtl&&d&&(d=-d);return d||0};a.getWrapperTranslate=function(b){"undefined"===typeof b&&(b=a.isHorizontal()?"x":"y");return a.getTranslate(a.wrapper[0],b)};a.observers=
[];a.initObservers=function(){if(a.params.observeParents)for(var b=a.container.parents(),c=0;c<b.length;c++)f(b[c]);f(a.container[0],{childList:!1});f(a.wrapper[0],{attributes:!1})};a.disconnectObservers=function(){for(var b=0;b<a.observers.length;b++)a.observers[b].disconnect();a.observers=[]};a.createLoop=function(){a.wrapper.children("."+a.params.slideClass+"."+a.params.slideDuplicateClass).remove();var b=a.wrapper.children("."+a.params.slideClass);"auto"!==a.params.slidesPerView||a.params.loopedSlides||
(a.params.loopedSlides=b.length);a.loopedSlides=parseInt(a.params.loopedSlides||a.params.slidesPerView,10);a.loopedSlides+=a.params.loopAdditionalSlides;a.loopedSlides>b.length&&(a.loopedSlides=b.length);var c=[],d=[],e;b.each(function(g,e){var f=m(this);g<a.loopedSlides&&d.push(e);g<b.length&&g>=b.length-a.loopedSlides&&c.push(e);f.attr("data-swiper-slide-index",g)});for(e=0;e<d.length;e++)a.wrapper.append(m(d[e].cloneNode(!0)).addClass(a.params.slideDuplicateClass));for(e=c.length-1;0<=e;e--)a.wrapper.prepend(m(c[e].cloneNode(!0)).addClass(a.params.slideDuplicateClass))};
a.destroyLoop=function(){a.wrapper.children("."+a.params.slideClass+"."+a.params.slideDuplicateClass).remove();a.slides.removeAttr("data-swiper-slide-index")};a.reLoop=function(b){var c=a.activeIndex-a.loopedSlides;a.destroyLoop();a.createLoop();a.updateSlidesSize();b&&a.slideTo(c+a.loopedSlides,0,!1)};a.fixLoop=function(){var b;if(a.activeIndex<a.loopedSlides)b=a.slides.length-3*a.loopedSlides+a.activeIndex,b+=a.loopedSlides,a.slideTo(b,0,!1,!0);else if("auto"===a.params.slidesPerView&&a.activeIndex>=
2*a.loopedSlides||a.activeIndex>a.slides.length-2*a.params.slidesPerView)b=-a.slides.length+a.activeIndex+a.loopedSlides,b+=a.loopedSlides,a.slideTo(b,0,!1,!0)};a.appendSlide=function(b){a.params.loop&&a.destroyLoop();if("object"===typeof b&&b.length)for(var c=0;c<b.length;c++)b[c]&&a.wrapper.append(b[c]);else a.wrapper.append(b);a.params.loop&&a.createLoop();a.params.observer&&a.support.observer||a.update(!0)};a.prependSlide=function(b){a.params.loop&&a.destroyLoop();var c=a.activeIndex+1;if("object"===
typeof b&&b.length){for(c=0;c<b.length;c++)b[c]&&a.wrapper.prepend(b[c]);c=a.activeIndex+b.length}else a.wrapper.prepend(b);a.params.loop&&a.createLoop();a.params.observer&&a.support.observer||a.update(!0);a.slideTo(c,0,!1)};a.removeSlide=function(b){a.params.loop&&(a.destroyLoop(),a.slides=a.wrapper.children("."+a.params.slideClass));var c=a.activeIndex,d;if("object"===typeof b&&b.length)for(var e=0;e<b.length;e++)d=b[e],a.slides[d]&&a.slides.eq(d).remove(),d<c&&c--;else d=b,a.slides[d]&&a.slides.eq(d).remove(),
d<c&&c--;c=Math.max(c,0);a.params.loop&&a.createLoop();a.params.observer&&a.support.observer||a.update(!0);a.params.loop?a.slideTo(c+a.loopedSlides,0,!1):a.slideTo(c,0,!1)};a.removeAllSlides=function(){for(var b=[],c=0;c<a.slides.length;c++)b.push(c);a.removeSlide(b)};a.effects={fade:{setTranslate:function(){for(var b=0;b<a.slides.length;b++){var c=a.slides.eq(b),d=-c[0].swiperSlideOffset;a.params.virtualTranslate||(d-=a.translate);var e=0;a.isHorizontal()||(e=d,d=0);c.css({opacity:a.params.fade.crossFade?
Math.max(1-Math.abs(c[0].progress),0):1+Math.min(Math.max(c[0].progress,-1),0)}).transform("translate3d("+d+"px, "+e+"px, 0px)")}},setTransition:function(b){a.slides.transition(b);if(a.params.virtualTranslate&&0!==b){var c=!1;a.slides.transitionEnd(function(){if(!c&&a){c=!0;a.animating=!1;for(var b=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],d=0;d<b.length;d++)a.wrapper.trigger(b[d])}})}}},flip:{setTranslate:function(){for(var b=0;b<a.slides.length;b++){var c=
a.slides.eq(b),d=c[0].progress;a.params.flip.limitRotation&&(d=Math.max(Math.min(c[0].progress,1),-1));var e=-180*d,f=0,h=-c[0].swiperSlideOffset,k=0;a.isHorizontal()?a.rtl&&(e=-e):(k=h,h=0,f=-e,e=0);c[0].style.zIndex=-Math.abs(Math.round(d))+a.slides.length;if(a.params.flip.slideShadows){var n=a.isHorizontal()?c.find(".swiper-slide-shadow-left"):c.find(".swiper-slide-shadow-top"),l=a.isHorizontal()?c.find(".swiper-slide-shadow-right"):c.find(".swiper-slide-shadow-bottom");0===n.length&&(n=m('<div class="swiper-slide-shadow-'+
(a.isHorizontal()?"left":"top")+'"></div>'),c.append(n));0===l.length&&(l=m('<div class="swiper-slide-shadow-'+(a.isHorizontal()?"right":"bottom")+'"></div>'),c.append(l));n.length&&(n[0].style.opacity=Math.max(-d,0));l.length&&(l[0].style.opacity=Math.max(d,0))}c.transform("translate3d("+h+"px, "+k+"px, 0px) rotateX("+f+"deg) rotateY("+e+"deg)")}},setTransition:function(b){a.slides.transition(b).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(b);
if(a.params.virtualTranslate&&0!==b){var c=!1;a.slides.eq(a.activeIndex).transitionEnd(function(){if(!c&&a&&m(this).hasClass(a.params.slideActiveClass)){c=!0;a.animating=!1;for(var b=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],d=0;d<b.length;d++)a.wrapper.trigger(b[d])}})}}},cube:{setTranslate:function(){var b=0,c;a.params.cube.shadow&&(a.isHorizontal()?(c=a.wrapper.find(".swiper-cube-shadow"),0===c.length&&(c=m('<div class="swiper-cube-shadow"></div>'),
a.wrapper.append(c)),c.css({height:a.width+"px"})):(c=a.container.find(".swiper-cube-shadow"),0===c.length&&(c=m('<div class="swiper-cube-shadow"></div>'),a.container.append(c))));for(var d=0;d<a.slides.length;d++){var e=a.slides.eq(d),f=90*d,h=Math.floor(f/360);a.rtl&&(f=-f,h=Math.floor(-f/360));var k=Math.max(Math.min(e[0].progress,1),-1),n=0,l=0,q=0;0===d%4?(n=4*-h*a.size,q=0):0===(d-1)%4?(n=0,q=4*-h*a.size):0===(d-2)%4?(n=a.size+4*h*a.size,q=a.size):0===(d-3)%4&&(n=-a.size,q=3*a.size+4*a.size*
h);a.rtl&&(n=-n);a.isHorizontal()||(l=n,n=0);f="rotateX("+(a.isHorizontal()?0:-f)+"deg) rotateY("+(a.isHorizontal()?f:0)+"deg) translate3d("+n+"px, "+l+"px, "+q+"px)";1>=k&&-1<k&&(b=90*d+90*k,a.rtl&&(b=90*-d-90*k));e.transform(f);a.params.cube.slideShadows&&(f=a.isHorizontal()?e.find(".swiper-slide-shadow-left"):e.find(".swiper-slide-shadow-top"),h=a.isHorizontal()?e.find(".swiper-slide-shadow-right"):e.find(".swiper-slide-shadow-bottom"),0===f.length&&(f=m('<div class="swiper-slide-shadow-'+(a.isHorizontal()?
"left":"top")+'"></div>'),e.append(f)),0===h.length&&(h=m('<div class="swiper-slide-shadow-'+(a.isHorizontal()?"right":"bottom")+'"></div>'),e.append(h)),f.length&&(f[0].style.opacity=Math.max(-k,0)),h.length&&(h[0].style.opacity=Math.max(k,0)))}a.wrapper.css({"-webkit-transform-origin":"50% 50% -"+a.size/2+"px","-moz-transform-origin":"50% 50% -"+a.size/2+"px","-ms-transform-origin":"50% 50% -"+a.size/2+"px","transform-origin":"50% 50% -"+a.size/2+"px"});a.params.cube.shadow&&(a.isHorizontal()?c.transform("translate3d(0px, "+
(a.width/2+a.params.cube.shadowOffset)+"px, "+-a.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+a.params.cube.shadowScale+")"):(d=Math.abs(b)-90*Math.floor(Math.abs(b)/90),d=a.params.cube.shadowScale/(1.5-(Math.sin(2*d*Math.PI/360)/2+Math.cos(2*d*Math.PI/360)/2)),c.transform("scale3d("+a.params.cube.shadowScale+", 1, "+d+") translate3d(0px, "+(a.height/2+a.params.cube.shadowOffset)+"px, "+-a.height/2/d+"px) rotateX(-90deg)")));a.wrapper.transform("translate3d(0px,0,"+(a.isSafari||a.isUiWebView?
-a.size/2:0)+"px) rotateX("+(a.isHorizontal()?0:b)+"deg) rotateY("+(a.isHorizontal()?-b:0)+"deg)")},setTransition:function(b){a.slides.transition(b).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(b);a.params.cube.shadow&&!a.isHorizontal()&&a.container.find(".swiper-cube-shadow").transition(b)}},coverflow:{setTranslate:function(){for(var b=a.translate,b=a.isHorizontal()?-b+a.width/2:-b+a.height/2,c=a.isHorizontal()?a.params.coverflow.rotate:
-a.params.coverflow.rotate,d=a.params.coverflow.depth,e=0,f=a.slides.length;e<f;e++){var h=a.slides.eq(e),k=a.slidesSizesGrid[e],k=(b-h[0].swiperSlideOffset-k/2)/k*a.params.coverflow.modifier,n=a.isHorizontal()?c*k:0,l=a.isHorizontal()?0:c*k,q=-d*Math.abs(k),r=a.isHorizontal()?0:a.params.coverflow.stretch*k,p=a.isHorizontal()?a.params.coverflow.stretch*k:0;.001>Math.abs(p)&&(p=0);.001>Math.abs(r)&&(r=0);.001>Math.abs(q)&&(q=0);.001>Math.abs(n)&&(n=0);.001>Math.abs(l)&&(l=0);h.transform("translate3d("+
p+"px,"+r+"px,"+q+"px)  rotateX("+l+"deg) rotateY("+n+"deg)");h[0].style.zIndex=-Math.abs(Math.round(k))+1;a.params.coverflow.slideShadows&&(n=a.isHorizontal()?h.find(".swiper-slide-shadow-left"):h.find(".swiper-slide-shadow-top"),l=a.isHorizontal()?h.find(".swiper-slide-shadow-right"):h.find(".swiper-slide-shadow-bottom"),0===n.length&&(n=m('<div class="swiper-slide-shadow-'+(a.isHorizontal()?"left":"top")+'"></div>'),h.append(n)),0===l.length&&(l=m('<div class="swiper-slide-shadow-'+(a.isHorizontal()?
"right":"bottom")+'"></div>'),h.append(l)),n.length&&(n[0].style.opacity=0<k?k:0),l.length&&(l[0].style.opacity=0<-k?-k:0))}a.browser.ie&&(a.wrapper[0].style.perspectiveOrigin=b+"px 50%")},setTransition:function(b){a.slides.transition(b).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(b)}}};a.lazy={initialImageLoaded:!1,loadImageInSlide:function(b,c){if("undefined"!==typeof b&&("undefined"===typeof c&&(c=!0),0!==a.slides.length)){var d=
a.slides.eq(b),e=d.find("."+a.params.lazyLoadingClass+":not(."+a.params.lazyStatusLoadedClass+"):not(."+a.params.lazyStatusLoadingClass+")");!d.hasClass(a.params.lazyLoadingClass)||d.hasClass(a.params.lazyStatusLoadedClass)||d.hasClass(a.params.lazyStatusLoadingClass)||(e=e.add(d[0]));0!==e.length&&e.each(function(){var b=m(this);b.addClass(a.params.lazyStatusLoadingClass);var g=b.attr("data-background"),e=b.attr("data-src"),f=b.attr("data-srcset"),h=b.attr("data-sizes");a.loadImage(b[0],e||g,f,h,
!1,function(){g?(b.css("background-image",'url("'+g+'")'),b.removeAttr("data-background")):(f&&(b.attr("srcset",f),b.removeAttr("data-srcset")),h&&(b.attr("sizes",h),b.removeAttr("data-sizes")),e&&(b.attr("src",e),b.removeAttr("data-src")));b.addClass(a.params.lazyStatusLoadedClass).removeClass(a.params.lazyStatusLoadingClass);d.find("."+a.params.lazyPreloaderClass+", ."+a.params.preloaderClass).remove();if(a.params.loop&&c){var k=d.attr("data-swiper-slide-index"),k=d.hasClass(a.params.slideDuplicateClass)?
a.wrapper.children('[data-swiper-slide-index="'+k+'"]:not(.'+a.params.slideDuplicateClass+")"):a.wrapper.children("."+a.params.slideDuplicateClass+'[data-swiper-slide-index="'+k+'"]');a.lazy.loadImageInSlide(k.index(),!1)}a.emit("onLazyImageReady",a,d[0],b[0])});a.emit("onLazyImageLoad",a,d[0],b[0])})}},load:function(){var b,c=a.params.slidesPerView;"auto"===c&&(c=0);a.lazy.initialImageLoaded||(a.lazy.initialImageLoaded=!0);if(a.params.watchSlidesVisibility)a.wrapper.children("."+a.params.slideVisibleClass).each(function(){a.lazy.loadImageInSlide(m(this).index())});
else if(1<c)for(b=a.activeIndex;b<a.activeIndex+c;b++)a.slides[b]&&a.lazy.loadImageInSlide(b);else a.lazy.loadImageInSlide(a.activeIndex);if(a.params.lazyLoadingInPrevNext)if(1<c||a.params.lazyLoadingInPrevNextAmount&&1<a.params.lazyLoadingInPrevNextAmount){b=a.params.lazyLoadingInPrevNextAmount;var d=c,e=Math.min(a.activeIndex+d+Math.max(b,d),a.slides.length),d=Math.max(a.activeIndex-Math.max(d,b),0);for(b=a.activeIndex+c;b<e;b++)a.slides[b]&&a.lazy.loadImageInSlide(b);for(b=d;b<a.activeIndex;b++)a.slides[b]&&
a.lazy.loadImageInSlide(b)}else c=a.wrapper.children("."+a.params.slideNextClass),0<c.length&&a.lazy.loadImageInSlide(c.index()),c=a.wrapper.children("."+a.params.slidePrevClass),0<c.length&&a.lazy.loadImageInSlide(c.index())},onTransitionStart:function(){a.params.lazyLoading&&(a.params.lazyLoadingOnTransitionStart||!a.params.lazyLoadingOnTransitionStart&&!a.lazy.initialImageLoaded)&&a.lazy.load()},onTransitionEnd:function(){a.params.lazyLoading&&!a.params.lazyLoadingOnTransitionStart&&a.lazy.load()}};
B=!1!==a.params.simulateTouch||a.support.touch?a.touchEvents:a.touchEventsDesktop;a.scrollbar={isTouched:!1,setDragPosition:function(b){var c=a.scrollbar;b=(a.isHorizontal()?"touchstart"===b.type||"touchmove"===b.type?b.targetTouches[0].pageX:b.pageX||b.clientX:"touchstart"===b.type||"touchmove"===b.type?b.targetTouches[0].pageY:b.pageY||b.clientY)-c.track.offset()[a.isHorizontal()?"left":"top"]-c.dragSize/2;var d=-a.minTranslate()*c.moveDivider,e=-a.maxTranslate()*c.moveDivider;b<d?b=d:b>e&&(b=e);
b=-b/c.moveDivider;a.updateProgress(b);a.setWrapperTranslate(b,!0)},dragStart:function(b){var c=a.scrollbar;c.isTouched=!0;b.preventDefault();b.stopPropagation();c.setDragPosition(b);clearTimeout(c.dragTimeout);c.track.transition(0);a.params.scrollbarHide&&c.track.css("opacity",1);a.wrapper.transition(100);c.drag.transition(100);a.emit("onScrollbarDragStart",a)},dragMove:function(b){var c=a.scrollbar;c.isTouched&&(b.preventDefault?b.preventDefault():b.returnValue=!1,c.setDragPosition(b),a.wrapper.transition(0),
c.track.transition(0),c.drag.transition(0),a.emit("onScrollbarDragMove",a))},dragEnd:function(b){var c=a.scrollbar;c.isTouched&&(c.isTouched=!1,a.params.scrollbarHide&&(clearTimeout(c.dragTimeout),c.dragTimeout=setTimeout(function(){c.track.css("opacity",0);c.track.transition(400)},1E3)),a.emit("onScrollbarDragEnd",a),a.params.scrollbarSnapOnRelease&&a.slideReset())},draggableEvents:B,enableDraggable:function(){var b=a.scrollbar,c=a.support.touch?b.track:document;m(b.track).on(b.draggableEvents.start,
b.dragStart);m(c).on(b.draggableEvents.move,b.dragMove);m(c).on(b.draggableEvents.end,b.dragEnd)},disableDraggable:function(){var b=a.scrollbar,c=a.support.touch?b.track:document;m(b.track).off(a.draggableEvents.start,b.dragStart);m(c).off(a.draggableEvents.move,b.dragMove);m(c).off(a.draggableEvents.end,b.dragEnd)},set:function(){if(a.params.scrollbar){var b=a.scrollbar;b.track=m(a.params.scrollbar);a.params.uniqueNavElements&&"string"===typeof a.params.scrollbar&&1<b.track.length&&1===a.container.find(a.params.scrollbar).length&&
(b.track=a.container.find(a.params.scrollbar));b.drag=b.track.find(".swiper-scrollbar-drag");0===b.drag.length&&(b.drag=m('<div class="swiper-scrollbar-drag"></div>'),b.track.append(b.drag));b.drag[0].style.width="";b.drag[0].style.height="";b.trackSize=a.isHorizontal()?b.track[0].offsetWidth:b.track[0].offsetHeight;b.divider=a.size/a.virtualSize;b.moveDivider=b.trackSize/a.size*b.divider;b.dragSize=b.trackSize*b.divider;a.isHorizontal()?b.drag[0].style.width=b.dragSize+"px":b.drag[0].style.height=
b.dragSize+"px";b.track[0].style.display=1<=b.divider?"none":"";a.params.scrollbarHide&&(b.track[0].style.opacity=0)}},setTranslate:function(){if(a.params.scrollbar){var b=a.scrollbar,c,d=b.dragSize;c=(b.trackSize-b.dragSize)*a.progress;a.rtl&&a.isHorizontal()?(c=-c,0<c?(d=b.dragSize-c,c=0):-c+b.dragSize>b.trackSize&&(d=b.trackSize+c)):0>c?(d=b.dragSize+c,c=0):c+b.dragSize>b.trackSize&&(d=b.trackSize-c);a.isHorizontal()?(a.support.transforms3d?b.drag.transform("translate3d("+c+"px, 0, 0)"):b.drag.transform("translateX("+
c+"px)"),b.drag[0].style.width=d+"px"):(a.support.transforms3d?b.drag.transform("translate3d(0px, "+c+"px, 0)"):b.drag.transform("translateY("+c+"px)"),b.drag[0].style.height=d+"px");a.params.scrollbarHide&&(clearTimeout(b.timeout),b.track[0].style.opacity=1,b.timeout=setTimeout(function(){b.track[0].style.opacity=0;b.track.transition(400)},1E3))}},setTransition:function(b){a.params.scrollbar&&a.scrollbar.drag.transition(b)}};a.controller={LinearSpline:function(a,c){this.x=a;this.y=c;this.lastIndex=
a.length-1;var b,d;this.interpolate=function(a){if(!a)return 0;d=e(this.x,a);b=d-1;return(a-this.x[b])*(this.y[d]-this.y[b])/(this.x[d]-this.x[b])+this.y[b]};var e=function(){var a,b,c;return function(d,e){b=-1;for(a=d.length;1<a-b;)d[c=a+b>>1]<=e?b=c:a=c;return a}}()},getInterpolateFunction:function(b){a.controller.spline||(a.controller.spline=a.params.loop?new a.controller.LinearSpline(a.slidesGrid,b.slidesGrid):new a.controller.LinearSpline(a.snapGrid,b.snapGrid))},setTranslate:function(b,c){function d(c){b=
c.rtl&&"horizontal"===c.params.direction?-a.translate:a.translate;"slide"===a.params.controlBy&&(a.controller.getInterpolateFunction(c),h=-a.controller.spline.interpolate(-b));h&&"container"!==a.params.controlBy||(f=(c.maxTranslate()-c.minTranslate())/(a.maxTranslate()-a.minTranslate()),h=(b-a.minTranslate())*f+c.minTranslate());a.params.controlInverse&&(h=c.maxTranslate()-h);c.updateProgress(h);c.setWrapperTranslate(h,!1,a);c.updateActiveIndex()}var e=a.params.control,f,h;if(a.isArray(e))for(var k=
0;k<e.length;k++)e[k]!==c&&e[k]instanceof z&&d(e[k]);else e instanceof z&&c!==e&&d(e)},setTransition:function(b,c){function d(c){c.setWrapperTransition(b,a);0!==b&&(c.onTransitionStart(),c.wrapper.transitionEnd(function(){e&&(c.params.loop&&"slide"===a.params.controlBy&&c.fixLoop(),c.onTransitionEnd())}))}var e=a.params.control,f;if(a.isArray(e))for(f=0;f<e.length;f++)e[f]!==c&&e[f]instanceof z&&d(e[f]);else e instanceof z&&c!==e&&d(e)}};a.hashnav={onHashCange:function(b,c){var d=document.location.hash.replace("#",
""),e=a.slides.eq(a.activeIndex).attr("data-hash");d!==e&&a.slideTo(a.wrapper.children("."+a.params.slideClass+'[data-hash="'+d+'"]').index())},attachEvents:function(b){b=b?"off":"on";m(window)[b]("hashchange",a.hashnav.onHashCange)},setHash:function(){if(a.hashnav.initialized&&a.params.hashnav)if(a.params.replaceState&&window.history&&window.history.replaceState)window.history.replaceState(null,null,"#"+a.slides.eq(a.activeIndex).attr("data-hash")||"");else{var b=a.slides.eq(a.activeIndex),b=b.attr("data-hash")||
b.attr("data-history");document.location.hash=b||""}},init:function(){if(a.params.hashnav&&!a.params.history){a.hashnav.initialized=!0;var b=document.location.hash.replace("#","");if(b){for(var c=0,d=a.slides.length;c<d;c++){var e=a.slides.eq(c);(e.attr("data-hash")||e.attr("data-history"))!==b||e.hasClass(a.params.slideDuplicateClass)||(e=e.index(),a.slideTo(e,0,a.params.runCallbacksOnInit,!0))}a.params.hashnavWatchState&&a.hashnav.attachEvents()}}},destroy:function(){a.params.hashnavWatchState&&
a.hashnav.attachEvents(!0)}};a.history={init:function(){if(a.params.history)if(window.history&&window.history.pushState){if(a.history.initialized=!0,this.paths=this.getPathValues(),this.paths.key||this.paths.value)this.scrollToSlide(0,this.paths.value,a.params.runCallbacksOnInit),a.params.replaceState||window.addEventListener("popstate",this.setHistoryPopState)}else a.params.history=!1,a.params.hashnav=!0},setHistoryPopState:function(){a.history.paths=a.history.getPathValues();a.history.scrollToSlide(a.params.speed,
a.history.paths.value,!1)},getPathValues:function(){var a=window.location.pathname.slice(1).split("/"),c=a.length;return{key:a[c-2],value:a[c-1]}},setHistory:function(b,c){if(a.history.initialized&&a.params.history){var d=a.slides.eq(c),d=this.slugify(d.attr("data-history"));window.location.pathname.includes(b)||(d=b+"/"+d);a.params.replaceState?window.history.replaceState(null,null,d):window.history.pushState(null,null,d)}},slugify:function(a){return a.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,
"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")},scrollToSlide:function(b,c,d){if(c)for(var e=0,g=a.slides.length;e<g;e++){var f=a.slides.eq(e);this.slugify(f.attr("data-history"))!==c||f.hasClass(a.params.slideDuplicateClass)||(f=f.index(),a.slideTo(f,b,d))}else a.slideTo(0,b,d)}};a.disableKeyboardControl=function(){a.params.keyboardControl=!1;m(document).off("keydown",h)};a.enableKeyboardControl=function(){a.params.keyboardControl=!0;m(document).on("keydown",h)};a.mousewheel={event:!1,
lastScrollTime:(new window.Date).getTime()};a.params.mousewheelControl&&(a.mousewheel.event=-1<navigator.userAgent.indexOf("firefox")?"DOMMouseScroll":q()?"wheel":"mousewheel");a.disableMousewheelControl=function(){if(!a.mousewheel.event)return!1;var b=a.container;"container"!==a.params.mousewheelEventsTarged&&(b=m(a.params.mousewheelEventsTarged));b.off(a.mousewheel.event,r);return!0};a.enableMousewheelControl=function(){if(!a.mousewheel.event)return!1;var b=a.container;"container"!==a.params.mousewheelEventsTarged&&
(b=m(a.params.mousewheelEventsTarged));b.on(a.mousewheel.event,r);return!0};a.parallax={setTranslate:function(){a.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){v(this,a.progress)});a.slides.each(function(){var a=m(this);a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){v(this,Math.min(Math.max(a[0].progress,-1),1))})})},setTransition:function(b){"undefined"===typeof b&&(b=a.params.speed);
a.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=m(this),d=parseInt(a.attr("data-swiper-parallax-duration"),10)||b;0===b&&(d=0);a.transition(d)})}};a.zoom={scale:1,currentScale:1,isScaling:!1,gesture:{slide:void 0,slideWidth:void 0,slideHeight:void 0,image:void 0,imageWrap:void 0,zoomMax:a.params.zoomMax},image:{isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,
height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},velocity:{x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0},getDistanceBetweenTouches:function(a){return 2>a.targetTouches.length?1:Math.sqrt(Math.pow(a.targetTouches[1].pageX-a.targetTouches[0].pageX,2)+Math.pow(a.targetTouches[1].pageY-a.targetTouches[0].pageY,2))},onGestureStart:function(b){var c=a.zoom;if(!a.support.gestures){if("touchstart"!==b.type||"touchstart"===b.type&&2>b.targetTouches.length)return;
c.gesture.scaleStart=c.getDistanceBetweenTouches(b)}if(!c.gesture.slide||!c.gesture.slide.length)if(c.gesture.slide=m(this),0===c.gesture.slide.length&&(c.gesture.slide=a.slides.eq(a.activeIndex)),c.gesture.image=c.gesture.slide.find("img, svg, canvas"),c.gesture.imageWrap=c.gesture.image.parent("."+a.params.zoomContainerClass),c.gesture.zoomMax=c.gesture.imageWrap.attr("data-swiper-zoom")||a.params.zoomMax,0===c.gesture.imageWrap.length){c.gesture.image=void 0;return}c.gesture.image.transition(0);
c.isScaling=!0},onGestureChange:function(b){var c=a.zoom;if(!a.support.gestures){if("touchmove"!==b.type||"touchmove"===b.type&&2>b.targetTouches.length)return;c.gesture.scaleMove=c.getDistanceBetweenTouches(b)}c.gesture.image&&0!==c.gesture.image.length&&(c.scale=a.support.gestures?b.scale*c.currentScale:c.gesture.scaleMove/c.gesture.scaleStart*c.currentScale,c.scale>c.gesture.zoomMax&&(c.scale=c.gesture.zoomMax-1+Math.pow(c.scale-c.gesture.zoomMax+1,.5)),c.scale<a.params.zoomMin&&(c.scale=a.params.zoomMin+
1-Math.pow(a.params.zoomMin-c.scale+1,.5)),c.gesture.image.transform("translate3d(0,0,0) scale("+c.scale+")"))},onGestureEnd:function(b){var c=a.zoom;!a.support.gestures&&("touchend"!==b.type||"touchend"===b.type&&2>b.changedTouches.length)||!c.gesture.image||0===c.gesture.image.length||(c.scale=Math.max(Math.min(c.scale,c.gesture.zoomMax),a.params.zoomMin),c.gesture.image.transition(a.params.speed).transform("translate3d(0,0,0) scale("+c.scale+")"),c.currentScale=c.scale,c.isScaling=!1,1===c.scale&&
(c.gesture.slide=void 0))},onTouchStart:function(a,c){var b=a.zoom;b.gesture.image&&0!==b.gesture.image.length&&!b.image.isTouched&&("android"===a.device.os&&c.preventDefault(),b.image.isTouched=!0,b.image.touchesStart.x="touchstart"===c.type?c.targetTouches[0].pageX:c.pageX,b.image.touchesStart.y="touchstart"===c.type?c.targetTouches[0].pageY:c.pageY)},onTouchMove:function(b){var c=a.zoom;if(c.gesture.image&&0!==c.gesture.image.length&&(a.allowClick=!1,c.image.isTouched&&c.gesture.slide)){c.image.isMoved||
(c.image.width=c.gesture.image[0].offsetWidth,c.image.height=c.gesture.image[0].offsetHeight,c.image.startX=a.getTranslate(c.gesture.imageWrap[0],"x")||0,c.image.startY=a.getTranslate(c.gesture.imageWrap[0],"y")||0,c.gesture.slideWidth=c.gesture.slide[0].offsetWidth,c.gesture.slideHeight=c.gesture.slide[0].offsetHeight,c.gesture.imageWrap.transition(0));var d=c.image.width*c.scale,e=c.image.height*c.scale;if(!(d<c.gesture.slideWidth&&e<c.gesture.slideHeight)){c.image.minX=Math.min(c.gesture.slideWidth/
2-d/2,0);c.image.maxX=-c.image.minX;c.image.minY=Math.min(c.gesture.slideHeight/2-e/2,0);c.image.maxY=-c.image.minY;c.image.touchesCurrent.x="touchmove"===b.type?b.targetTouches[0].pageX:b.pageX;c.image.touchesCurrent.y="touchmove"===b.type?b.targetTouches[0].pageY:b.pageY;if(!c.image.isMoved&&!c.isScaling){if(a.isHorizontal()&&Math.floor(c.image.minX)===Math.floor(c.image.startX)&&c.image.touchesCurrent.x<c.image.touchesStart.x||Math.floor(c.image.maxX)===Math.floor(c.image.startX)&&c.image.touchesCurrent.x>
c.image.touchesStart.x){c.image.isTouched=!1;return}if(!a.isHorizontal()&&Math.floor(c.image.minY)===Math.floor(c.image.startY)&&c.image.touchesCurrent.y<c.image.touchesStart.y||Math.floor(c.image.maxY)===Math.floor(c.image.startY)&&c.image.touchesCurrent.y>c.image.touchesStart.y){c.image.isTouched=!1;return}}b.preventDefault();b.stopPropagation();c.image.isMoved=!0;c.image.currentX=c.image.touchesCurrent.x-c.image.touchesStart.x+c.image.startX;c.image.currentY=c.image.touchesCurrent.y-c.image.touchesStart.y+
c.image.startY;c.image.currentX<c.image.minX&&(c.image.currentX=c.image.minX+1-Math.pow(c.image.minX-c.image.currentX+1,.8));c.image.currentX>c.image.maxX&&(c.image.currentX=c.image.maxX-1+Math.pow(c.image.currentX-c.image.maxX+1,.8));c.image.currentY<c.image.minY&&(c.image.currentY=c.image.minY+1-Math.pow(c.image.minY-c.image.currentY+1,.8));c.image.currentY>c.image.maxY&&(c.image.currentY=c.image.maxY-1+Math.pow(c.image.currentY-c.image.maxY+1,.8));c.velocity.prevPositionX||(c.velocity.prevPositionX=
c.image.touchesCurrent.x);c.velocity.prevPositionY||(c.velocity.prevPositionY=c.image.touchesCurrent.y);c.velocity.prevTime||(c.velocity.prevTime=Date.now());c.velocity.x=(c.image.touchesCurrent.x-c.velocity.prevPositionX)/(Date.now()-c.velocity.prevTime)/2;c.velocity.y=(c.image.touchesCurrent.y-c.velocity.prevPositionY)/(Date.now()-c.velocity.prevTime)/2;2>Math.abs(c.image.touchesCurrent.x-c.velocity.prevPositionX)&&(c.velocity.x=0);2>Math.abs(c.image.touchesCurrent.y-c.velocity.prevPositionY)&&
(c.velocity.y=0);c.velocity.prevPositionX=c.image.touchesCurrent.x;c.velocity.prevPositionY=c.image.touchesCurrent.y;c.velocity.prevTime=Date.now();c.gesture.imageWrap.transform("translate3d("+c.image.currentX+"px, "+c.image.currentY+"px,0)")}}},onTouchEnd:function(a,c){var b=a.zoom;if(b.gesture.image&&0!==b.gesture.image.length)if(b.image.isTouched&&b.image.isMoved){b.image.isTouched=!1;b.image.isMoved=!1;var d=300,e=300,f=b.image.currentX+b.velocity.x*d,h=b.image.currentY+b.velocity.y*e;0!==b.velocity.x&&
(d=Math.abs((f-b.image.currentX)/b.velocity.x));0!==b.velocity.y&&(e=Math.abs((h-b.image.currentY)/b.velocity.y));d=Math.max(d,e);b.image.currentX=f;b.image.currentY=h;f=b.image.height*b.scale;b.image.minX=Math.min(b.gesture.slideWidth/2-b.image.width*b.scale/2,0);b.image.maxX=-b.image.minX;b.image.minY=Math.min(b.gesture.slideHeight/2-f/2,0);b.image.maxY=-b.image.minY;b.image.currentX=Math.max(Math.min(b.image.currentX,b.image.maxX),b.image.minX);b.image.currentY=Math.max(Math.min(b.image.currentY,
b.image.maxY),b.image.minY);b.gesture.imageWrap.transition(d).transform("translate3d("+b.image.currentX+"px, "+b.image.currentY+"px,0)")}else b.image.isTouched=!1,b.image.isMoved=!1},onTransitionEnd:function(a){var b=a.zoom;b.gesture.slide&&a.previousIndex!==a.activeIndex&&(b.gesture.image.transform("translate3d(0,0,0) scale(1)"),b.gesture.imageWrap.transform("translate3d(0,0,0)"),b.gesture.slide=b.gesture.image=b.gesture.imageWrap=void 0,b.scale=b.currentScale=1)},toggleZoom:function(a,c){var b=
a.zoom;b.gesture.slide||(b.gesture.slide=a.clickedSlide?m(a.clickedSlide):a.slides.eq(a.activeIndex),b.gesture.image=b.gesture.slide.find("img, svg, canvas"),b.gesture.imageWrap=b.gesture.image.parent("."+a.params.zoomContainerClass));if(b.gesture.image&&0!==b.gesture.image.length){var d,e,f,h,k,l,q,r,p,t;"undefined"===typeof b.image.touchesStart.x&&c?(d="touchend"===c.type?c.changedTouches[0].pageX:c.pageX,e="touchend"===c.type?c.changedTouches[0].pageY:c.pageY):(d=b.image.touchesStart.x,e=b.image.touchesStart.y);
b.scale&&1!==b.scale?(b.scale=b.currentScale=1,b.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"),b.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"),b.gesture.slide=void 0):(b.scale=b.currentScale=b.gesture.imageWrap.attr("data-swiper-zoom")||a.params.zoomMax,c?(p=b.gesture.slide[0].offsetWidth,t=b.gesture.slide[0].offsetHeight,f=b.gesture.slide.offset().left,h=b.gesture.slide.offset().top,k=b.gesture.image[0].offsetWidth,l=b.gesture.image[0].offsetHeight,k*=
b.scale,q=l*b.scale,l=Math.min(p/2-k/2,0),k=Math.min(t/2-q/2,0),q=-l,r=-k,d=(f+p/2-d)*b.scale,e=(h+t/2-e)*b.scale,d<l&&(d=l),d>q&&(d=q),e<k&&(e=k),e>r&&(e=r)):e=d=0,b.gesture.imageWrap.transition(300).transform("translate3d("+d+"px, "+e+"px,0)"),b.gesture.image.transition(300).transform("translate3d(0,0,0) scale("+b.scale+")"))}},attachEvents:function(b){var c=b?"off":"on";if(a.params.zoom&&(b="touchstart"===a.touchEvents.start&&a.support.passiveListener&&a.params.passiveListeners?{passive:!0,capture:!1}:
!1,a.support.gestures?(a.slides[c]("gesturestart",a.zoom.onGestureStart,b),a.slides[c]("gesturechange",a.zoom.onGestureChange,b),a.slides[c]("gestureend",a.zoom.onGestureEnd,b)):"touchstart"===a.touchEvents.start&&(a.slides[c](a.touchEvents.start,a.zoom.onGestureStart,b),a.slides[c](a.touchEvents.move,a.zoom.onGestureChange,b),a.slides[c](a.touchEvents.end,a.zoom.onGestureEnd,b)),a[c]("touchStart",a.zoom.onTouchStart),a.slides.each(function(b,d){if(0<m(d).find("."+a.params.zoomContainerClass).length)m(d)[c](a.touchEvents.move,
a.zoom.onTouchMove)}),a[c]("touchEnd",a.zoom.onTouchEnd),a[c]("transitionEnd",a.zoom.onTransitionEnd),a.params.zoomToggle))a.on("doubleTap",a.zoom.toggleZoom)},init:function(){a.zoom.attachEvents()},destroy:function(){a.zoom.attachEvents(!0)}};a._plugins=[];for(var V in a.plugins)(B=a.plugins[V](a,a.params[V]))&&a._plugins.push(B);a.callPlugins=function(b,c,d,e,f,h){for(var g=0;g<a._plugins.length;g++)if(b in a._plugins[g])a._plugins[g][b](c,d,e,f,h)};a.emitterEventListeners={};a.emit=function(b,
c,d,e,f,h){if(a.params[b])a.params[b](c,d,e,f,h);var g;if(a.emitterEventListeners[b])for(g=0;g<a.emitterEventListeners[b].length;g++)a.emitterEventListeners[b][g](c,d,e,f,h);a.callPlugins&&a.callPlugins(b,c,d,e,f,h)};a.on=function(b,c){b=Q(b);a.emitterEventListeners[b]||(a.emitterEventListeners[b]=[]);a.emitterEventListeners[b].push(c);return a};a.off=function(b,c){var d;b=Q(b);if("undefined"===typeof c)return a.emitterEventListeners[b]=[],a;if(a.emitterEventListeners[b]&&0!==a.emitterEventListeners[b].length){for(d=
0;d<a.emitterEventListeners[b].length;d++)a.emitterEventListeners[b][d]===c&&a.emitterEventListeners[b].splice(d,1);return a}};a.once=function(b,c){b=Q(b);var d=function(e,f,g,h,k){c(e,f,g,h,k);a.off(b,d)};a.on(b,d);return a};a.a11y={makeFocusable:function(a){a.attr("tabIndex","0");return a},addRole:function(a,c){a.attr("role",c);return a},addLabel:function(a,c){a.attr("aria-label",c);return a},disable:function(a){a.attr("aria-disabled",!0);return a},enable:function(a){a.attr("aria-disabled",!1);
return a},onEnterKey:function(b){13===b.keyCode&&(m(b.target).is(a.params.nextButton)?(a.onClickNext(b),a.isEnd?a.a11y.notify(a.params.lastSlideMessage):a.a11y.notify(a.params.nextSlideMessage)):m(b.target).is(a.params.prevButton)&&(a.onClickPrev(b),a.isBeginning?a.a11y.notify(a.params.firstSlideMessage):a.a11y.notify(a.params.prevSlideMessage)),m(b.target).is("."+a.params.bulletClass)&&m(b.target)[0].click())},liveRegion:m('<span class="'+a.params.notificationClass+'" aria-live="assertive" aria-atomic="true"></span>'),
notify:function(b){var c=a.a11y.liveRegion;0!==c.length&&(c.html(""),c.html(b))},init:function(){a.params.nextButton&&a.nextButton&&0<a.nextButton.length&&(a.a11y.makeFocusable(a.nextButton),a.a11y.addRole(a.nextButton,"button"),a.a11y.addLabel(a.nextButton,a.params.nextSlideMessage));a.params.prevButton&&a.prevButton&&0<a.prevButton.length&&(a.a11y.makeFocusable(a.prevButton),a.a11y.addRole(a.prevButton,"button"),a.a11y.addLabel(a.prevButton,a.params.prevSlideMessage));m(a.container).append(a.a11y.liveRegion)},
initPagination:function(){a.params.pagination&&a.params.paginationClickable&&a.bullets&&a.bullets.length&&a.bullets.each(function(){var b=m(this);a.a11y.makeFocusable(b);a.a11y.addRole(b,"button");a.a11y.addLabel(b,a.params.paginationBulletMessage.replace(/{{index}}/,b.index()+1))})},destroy:function(){a.a11y.liveRegion&&0<a.a11y.liveRegion.length&&a.a11y.liveRegion.remove()}};a.init=function(){a.params.loop&&a.createLoop();a.updateContainerSize();a.updateSlidesSize();a.updatePagination();a.params.scrollbar&&
a.scrollbar&&(a.scrollbar.set(),a.params.scrollbarDraggable&&a.scrollbar.enableDraggable());"slide"!==a.params.effect&&a.effects[a.params.effect]&&(a.params.loop||a.updateProgress(),a.effects[a.params.effect].setTranslate());a.params.loop?a.slideTo(a.params.initialSlide+a.loopedSlides,0,a.params.runCallbacksOnInit):(a.slideTo(a.params.initialSlide,0,a.params.runCallbacksOnInit),0===a.params.initialSlide&&(a.parallax&&a.params.parallax&&a.parallax.setTranslate(),a.lazy&&a.params.lazyLoading&&(a.lazy.load(),
a.lazy.initialImageLoaded=!0)));a.attachEvents();a.params.observer&&a.support.observer&&a.initObservers();a.params.preloadImages&&!a.params.lazyLoading&&a.preloadImages();a.params.zoom&&a.zoom&&a.zoom.init();a.params.autoplay&&a.startAutoplay();a.params.keyboardControl&&a.enableKeyboardControl&&a.enableKeyboardControl();a.params.mousewheelControl&&a.enableMousewheelControl&&a.enableMousewheelControl();a.params.hashnavReplaceState&&(a.params.replaceState=a.params.hashnavReplaceState);a.params.history&&
a.history&&a.history.init();a.params.hashnav&&a.hashnav&&a.hashnav.init();a.params.a11y&&a.a11y&&a.a11y.init();a.emit("onInit",a)};a.cleanupStyles=function(){a.container.removeClass(a.classNames.join(" ")).removeAttr("style");a.wrapper.removeAttr("style");a.slides&&a.slides.length&&a.slides.removeClass([a.params.slideVisibleClass,a.params.slideActiveClass,a.params.slideNextClass,a.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row");
a.paginationContainer&&a.paginationContainer.length&&a.paginationContainer.removeClass(a.params.paginationHiddenClass);a.bullets&&a.bullets.length&&a.bullets.removeClass(a.params.bulletActiveClass);a.params.prevButton&&m(a.params.prevButton).removeClass(a.params.buttonDisabledClass);a.params.nextButton&&m(a.params.nextButton).removeClass(a.params.buttonDisabledClass);a.params.scrollbar&&a.scrollbar&&(a.scrollbar.track&&a.scrollbar.track.length&&a.scrollbar.track.removeAttr("style"),a.scrollbar.drag&&
a.scrollbar.drag.length&&a.scrollbar.drag.removeAttr("style"))};a.destroy=function(b,c){a.detachEvents();a.stopAutoplay();a.params.scrollbar&&a.scrollbar&&a.params.scrollbarDraggable&&a.scrollbar.disableDraggable();a.params.loop&&a.destroyLoop();c&&a.cleanupStyles();a.disconnectObservers();a.params.zoom&&a.zoom&&a.zoom.destroy();a.params.keyboardControl&&a.disableKeyboardControl&&a.disableKeyboardControl();a.params.mousewheelControl&&a.disableMousewheelControl&&a.disableMousewheelControl();a.params.a11y&&
a.a11y&&a.a11y.destroy();a.params.history&&!a.params.replaceState&&window.removeEventListener("popstate",a.history.setHistoryPopState);a.params.hashnav&&a.hashnav&&a.hashnav.destroy();a.emit("onDestroy");!1!==b&&(a=null)};a.init();return a}};z.prototype={isSafari:function(){var l=navigator.userAgent.toLowerCase();return 0<=l.indexOf("safari")&&0>l.indexOf("chrome")&&0>l.indexOf("android")}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(l){return"[object Array]"===
Object.prototype.toString.apply(l)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&1<window.navigator.msMaxTouchPoints||window.navigator.pointerEnabled&&1<window.navigator.maxTouchPoints,lteIE9:function(){var l=document.createElement("div");l.innerHTML="\x3c!--[if lte IE 9]><i></i><![endif]--\x3e";return 1===l.getElementsByTagName("i").length}()},device:function(){var l=navigator.userAgent,k=l.match(/(Android);?[\s\/]+([\d.]+)?/),
d=l.match(/(iPad).*OS\s([\d_]+)/),e=l.match(/(iPod)(.*OS\s([\d_]+))?/),l=!d&&l.match(/(iPhone\sOS)\s([\d_]+)/);return{ios:d||l||e,android:k}}(),support:{touch:window.Modernizr&&!0===Modernizr.touch||!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch),transforms3d:window.Modernizr&&!0===Modernizr.csstransforms3d||function(){var l=document.createElement("div").style;return"webkitPerspective"in l||"MozPerspective"in l||"OPerspective"in l||"MsPerspective"in l||"perspective"in
l}(),flexbox:function(){for(var l=document.createElement("div").style,k="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),d=0;d<k.length;d++)if(k[d]in l)return!0}(),observer:"MutationObserver"in window||"WebkitMutationObserver"in window,passiveListener:function(){var l=!1;try{var k=Object.defineProperty({},"passive",{get:function(){l=!0}});window.addEventListener("testPassiveListener",
null,k)}catch(d){}return l}(),gestures:"ongesturestart"in window},plugins:{}};var C=function(){var l=function(d){var e;for(e=0;e<d.length;e++)this[e]=d[e];this.length=d.length;return this},k=function(d,e){var f=[],h;if(d&&!e&&d instanceof l)return d;if(d)if("string"===typeof d){var k;h=d.trim();if(0<=h.indexOf("<")&&0<=h.indexOf(">")){k="div";0===h.indexOf("<li")&&(k="ul");0===h.indexOf("<tr")&&(k="tbody");if(0===h.indexOf("<td")||0===h.indexOf("<th"))k="tr";0===h.indexOf("<tbody")&&(k="table");0===
h.indexOf("<option")&&(k="select");k=document.createElement(k);k.innerHTML=d;for(h=0;h<k.childNodes.length;h++)f.push(k.childNodes[h])}else for(k=e||"#"!==d[0]||d.match(/[ .<>:~]/)?(e||document).querySelectorAll(d):[document.getElementById(d.split("#")[1])],h=0;h<k.length;h++)k[h]&&f.push(k[h])}else if(d.nodeType||d===window||d===document)f.push(d);else if(0<d.length&&d[0].nodeType)for(h=0;h<d.length;h++)f.push(d[h]);return new l(f)};l.prototype={addClass:function(d){if("undefined"===typeof d)return this;
d=d.split(" ");for(var e=0;e<d.length;e++)for(var f=0;f<this.length;f++)this[f].classList.add(d[e]);return this},removeClass:function(d){d=d.split(" ");for(var e=0;e<d.length;e++)for(var f=0;f<this.length;f++)this[f].classList.remove(d[e]);return this},hasClass:function(d){return this[0]?this[0].classList.contains(d):!1},toggleClass:function(d){d=d.split(" ");for(var e=0;e<d.length;e++)for(var f=0;f<this.length;f++)this[f].classList.toggle(d[e]);return this},attr:function(d,e){if(1===arguments.length&&
"string"===typeof d){if(this[0])return this[0].getAttribute(d)}else{for(var f=0;f<this.length;f++)if(2===arguments.length)this[f].setAttribute(d,e);else for(var h in d)this[f][h]=d[h],this[f].setAttribute(h,d[h]);return this}},removeAttr:function(d){for(var e=0;e<this.length;e++)this[e].removeAttribute(d);return this},data:function(d,e){if("undefined"===typeof e){if(this[0]){var f=this[0].getAttribute("data-"+d);if(f)return f;if(this[0].dom7ElementDataStorage&&d in this[0].dom7ElementDataStorage)return this[0].dom7ElementDataStorage[d]}}else{for(f=
0;f<this.length;f++){var h=this[f];h.dom7ElementDataStorage||(h.dom7ElementDataStorage={});h.dom7ElementDataStorage[d]=e}return this}},transform:function(d){for(var e=0;e<this.length;e++){var f=this[e].style;f.webkitTransform=f.MsTransform=f.msTransform=f.MozTransform=f.OTransform=f.transform=d}return this},transition:function(d){"string"!==typeof d&&(d+="ms");for(var e=0;e<this.length;e++){var f=this[e].style;f.webkitTransitionDuration=f.MsTransitionDuration=f.msTransitionDuration=f.MozTransitionDuration=
f.OTransitionDuration=f.transitionDuration=d}return this},on:function(d,e,f,h){function l(d){var h=d.target;if(k(h).is(e))f.call(h,d);else for(var h=k(h).parents(),l=0;l<h.length;l++)k(h[l]).is(e)&&f.call(h[l],d)}d=d.split(" ");var m,p;for(m=0;m<this.length;m++)if("function"===typeof e||!1===e)for("function"===typeof e&&(h=(f=e)||!1),p=0;p<d.length;p++)this[m].addEventListener(d[p],f,h);else for(p=0;p<d.length;p++)this[m].dom7LiveListeners||(this[m].dom7LiveListeners=[]),this[m].dom7LiveListeners.push({listener:f,
liveListener:l}),this[m].addEventListener(d[p],l,h);return this},off:function(d,e,f,h){d=d.split(" ");for(var k=0;k<d.length;k++)for(var l=0;l<this.length;l++)if("function"===typeof e||!1===e)"function"===typeof e&&(h=(f=e)||!1),this[l].removeEventListener(d[k],f,h);else if(this[l].dom7LiveListeners)for(var m=0;m<this[l].dom7LiveListeners.length;m++)this[l].dom7LiveListeners[m].listener===f&&this[l].removeEventListener(d[k],this[l].dom7LiveListeners[m].liveListener,h);return this},once:function(d,
e,f,h){function k(m){f(m);l.off(d,e,k,h)}var l=this;"function"===typeof e&&(h=f=e=!1);l.on(d,e,k,h)},trigger:function(d,e){for(var f=0;f<this.length;f++){var h;try{h=new window.CustomEvent(d,{detail:e,bubbles:!0,cancelable:!0})}catch(q){h=document.createEvent("Event"),h.initEvent(d,!0,!0),h.detail=e}this[f].dispatchEvent(h)}return this},transitionEnd:function(d){function e(l){if(l.target===this)for(d.call(this,l),h=0;h<f.length;h++)k.off(f[h],e)}var f=["webkitTransitionEnd","transitionend","oTransitionEnd",
"MSTransitionEnd","msTransitionEnd"],h,k=this;if(d)for(h=0;h<f.length;h++)k.on(f[h],e);return this},width:function(){return this[0]===window?window.innerWidth:0<this.length?parseFloat(this.css("width")):null},outerWidth:function(d){return 0<this.length?d?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null},height:function(){return this[0]===window?window.innerHeight:0<this.length?parseFloat(this.css("height")):null},outerHeight:function(d){return 0<
this.length?d?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null},offset:function(){if(0<this.length){var d=this[0],e=d.getBoundingClientRect(),f=document.body;return{top:e.top+(window.pageYOffset||d.scrollTop)-(d.clientTop||f.clientTop||0),left:e.left+(window.pageXOffset||d.scrollLeft)-(d.clientLeft||f.clientLeft||0)}}return null},css:function(d,e){var f;if(1===arguments.length)if("string"===typeof d){if(this[0])return window.getComputedStyle(this[0],
null).getPropertyValue(d)}else{for(f=0;f<this.length;f++)for(var h in d)this[f].style[h]=d[h];return this}if(2===arguments.length&&"string"===typeof d)for(f=0;f<this.length;f++)this[f].style[d]=e;return this},each:function(d){for(var e=0;e<this.length;e++)d.call(this[e],e,this[e]);return this},html:function(d){if("undefined"===typeof d)return this[0]?this[0].innerHTML:void 0;for(var e=0;e<this.length;e++)this[e].innerHTML=d;return this},text:function(d){if("undefined"===typeof d)return this[0]?this[0].textContent.trim():
null;for(var e=0;e<this.length;e++)this[e].textContent=d;return this},is:function(d){if(!this[0])return!1;var e;if("string"===typeof d){e=this[0];if(e===document)return d===document;if(e===window)return d===window;if(e.matches)return e.matches(d);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(d);if(e.mozMatchesSelector)return e.mozMatchesSelector(d);if(e.msMatchesSelector)return e.msMatchesSelector(d);d=k(d);for(e=0;e<d.length;e++)if(d[e]===this[0])return!0;return!1}if(d===document)return this[0]===
document;if(d===window)return this[0]===window;if(d.nodeType||d instanceof l)for(d=d.nodeType?[d]:d,e=0;e<d.length;e++)if(d[e]===this[0])return!0;return!1},index:function(){if(this[0]){for(var d=this[0],e=0;null!==(d=d.previousSibling);)1===d.nodeType&&e++;return e}},eq:function(d){if("undefined"===typeof d)return this;var e=this.length;return d>e-1?new l([]):0>d?(d=e+d,0>d?new l([]):new l([this[d]])):new l([this[d]])},append:function(d){var e,f;for(e=0;e<this.length;e++)if("string"===typeof d)for(f=
document.createElement("div"),f.innerHTML=d;f.firstChild;)this[e].appendChild(f.firstChild);else if(d instanceof l)for(f=0;f<d.length;f++)this[e].appendChild(d[f]);else this[e].appendChild(d);return this},prepend:function(d){var e,f;for(e=0;e<this.length;e++)if("string"===typeof d){var h=document.createElement("div");h.innerHTML=d;for(f=h.childNodes.length-1;0<=f;f--)this[e].insertBefore(h.childNodes[f],this[e].childNodes[0])}else if(d instanceof l)for(f=0;f<d.length;f++)this[e].insertBefore(d[f],
this[e].childNodes[0]);else this[e].insertBefore(d,this[e].childNodes[0]);return this},insertBefore:function(d){d=k(d);for(var e=0;e<this.length;e++)if(1===d.length)d[0].parentNode.insertBefore(this[e],d[0]);else if(1<d.length)for(var f=0;f<d.length;f++)d[f].parentNode.insertBefore(this[e].cloneNode(!0),d[f])},insertAfter:function(d){d=k(d);for(var e=0;e<this.length;e++)if(1===d.length)d[0].parentNode.insertBefore(this[e],d[0].nextSibling);else if(1<d.length)for(var f=0;f<d.length;f++)d[f].parentNode.insertBefore(this[e].cloneNode(!0),
d[f].nextSibling)},next:function(d){return 0<this.length?d?this[0].nextElementSibling&&k(this[0].nextElementSibling).is(d)?new l([this[0].nextElementSibling]):new l([]):this[0].nextElementSibling?new l([this[0].nextElementSibling]):new l([]):new l([])},nextAll:function(d){var e=[],f=this[0];if(!f)return new l([]);for(;f.nextElementSibling;)f=f.nextElementSibling,d?k(f).is(d)&&e.push(f):e.push(f);return new l(e)},prev:function(d){return 0<this.length?d?this[0].previousElementSibling&&k(this[0].previousElementSibling).is(d)?
new l([this[0].previousElementSibling]):new l([]):this[0].previousElementSibling?new l([this[0].previousElementSibling]):new l([]):new l([])},prevAll:function(d){var e=[],f=this[0];if(!f)return new l([]);for(;f.previousElementSibling;)f=f.previousElementSibling,d?k(f).is(d)&&e.push(f):e.push(f);return new l(e)},parent:function(d){for(var e=[],f=0;f<this.length;f++)d?k(this[f].parentNode).is(d)&&e.push(this[f].parentNode):e.push(this[f].parentNode);return k(k.unique(e))},parents:function(d){for(var e=
[],f=0;f<this.length;f++)for(var h=this[f].parentNode;h;)d?k(h).is(d)&&e.push(h):e.push(h),h=h.parentNode;return k(k.unique(e))},find:function(d){for(var e=[],f=0;f<this.length;f++)for(var h=this[f].querySelectorAll(d),k=0;k<h.length;k++)e.push(h[k]);return new l(e)},children:function(d){for(var e=[],f=0;f<this.length;f++)for(var h=this[f].childNodes,m=0;m<h.length;m++)d?1===h[m].nodeType&&k(h[m]).is(d)&&e.push(h[m]):1===h[m].nodeType&&e.push(h[m]);return new l(k.unique(e))},remove:function(){for(var d=
0;d<this.length;d++)this[d].parentNode&&this[d].parentNode.removeChild(this[d]);return this},add:function(){var d,e;for(d=0;d<arguments.length;d++){var f=k(arguments[d]);for(e=0;e<f.length;e++)this[this.length]=f[e],this.length++}return this}};k.fn=l.prototype;k.unique=function(d){for(var e=[],f=0;f<d.length;f++)-1===e.indexOf(d[f])&&e.push(d[f]);return e};return k}(),v=["jQuery","Zepto","Dom7"],x=0;for(;x<v.length;x++)window[v[x]]&&P(window[v[x]]);if(v="undefined"===typeof C?window.Dom7||window.Zepto||
window.jQuery:C)"transitionEnd"in v.fn||(v.fn.transitionEnd=function(l){function k(h){if(h.target===this)for(l.call(this,h),e=0;e<d.length;e++)f.off(d[e],k)}var d=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],e,f=this;if(l)for(e=0;e<d.length;e++)f.on(d[e],k);return this}),"transform"in v.fn||(v.fn.transform=function(l){for(var k=0;k<this.length;k++){var d=this[k].style;d.webkitTransform=d.MsTransform=d.msTransform=d.MozTransform=d.OTransform=d.transform=
l}return this}),"transition"in v.fn||(v.fn.transition=function(l){"string"!==typeof l&&(l+="ms");for(var k=0;k<this.length;k++){var d=this[k].style;d.webkitTransitionDuration=d.MsTransitionDuration=d.msTransitionDuration=d.MozTransitionDuration=d.OTransitionDuration=d.transitionDuration=l}return this}),"outerWidth"in v.fn||(v.fn.outerWidth=function(l){return 0<this.length?l?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null});window.Swiper=
z})();"undefined"!==typeof module?module.exports=window.Swiper:"function"===typeof define&&define.amd&&define([],function(){return window.Swiper});

// EASING PLUGIN
jQuery.easing["jswing"]=jQuery.easing["swing"];
jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d)},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*(--t*(t-2)-1)+b},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/
2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b},easeInSine:function(x,
t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b},easeInExpo:function(x,t,b,c,d){return t==0?b:c*Math.pow(2,10*(t/d-1))+b},easeOutExpo:function(x,t,b,c,d){return t==d?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b},
easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*0.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*
Math.PI)/p))+b},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*0.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(0.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-0.5*(a*Math.pow(2,
10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=1.525)+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+b},easeInBounce:function(x,t,
b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b},easeOutBounce:function(x,t,b,c,d){if((t/=d)<1/2.75)return c*(7.5625*t*t)+b;else if(t<2/2.75)return c*(7.5625*(t-=1.5/2.75)*t+0.75)+b;else if(t<2.5/2.75)return c*(7.5625*(t-=2.25/2.75)*t+0.9375)+b;else return c*(7.5625*(t-=2.625/2.75)*t+0.984375)+b},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*0.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*0.5+c*0.5+b}});

// MINUS MENU
(function($) {
    $.fn.extend({
        minusMenu: function(options, callback) {
            var defaults = {
				closeElem: '',
				items: '> ul > li',
				siblings: 'li',
				controls: '> ul, > div',
				customClass: 'selected',
				openedDelay: 200,
				closedDelay: 555,
				eventType: 'hover',
				clickedElem: '> a',
				bdyClicked: false,
				isVisible: '',
				setPos: false,
				overlay: false,
				bdyCls: ''
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var o = options,
					el = $( this ),
					items = el.find( o.items ),
                    main = {
						cls: { selected: 'selected', hidden: 'hidden' },
						stm: null,
						clearTm: function(){
							var _t = this;
							if( _t.stm != null )
								clearTimeout( _t.stm );
						},
						detectEl: function( ID ){ return ID.length > 0 ? true : false; },
						isVisible: function(){
							var _t = this, b = false;
							if( o.isVisible !== '' ){
								var e = $( o.isVisible );
								if( _t.detectEl( e ) )
									if( e.is(':visible') )
										b = true;	
							}
							return b;
						},
						overlayControls: function( k ){
							var _t = this;
							if( o.overlay ){
								/*if( k == 'opened' ) bdy.addClass( o.bdyCls );
								else{ 
									var e = el.find( o.items + '.' + o.customClass );
									if( !_t.detectEl( e ) ) 
										bdy.removeClass( o.bdyCls );
								}*/
								if( k == 'opened' ){
									if( _t.detectEl( el.find( '> ul > li.' + o.customClass ).find( o.controls ) ) )
										bdy.addClass( o.bdyCls );
									else
										bdy.removeClass( o.bdyCls );	
								}else{ 
									var e = el.find( o.items + '.' + o.customClass );
									if( !_t.detectEl( e ) ) 
										bdy.removeClass( o.bdyCls );
								}
							}
						},
						setPos: function( ID ){
							if( o.setPos ){
								var _t = this, k = $(o.controls, ID);
								if( _t.detectEl( k ) ){
									var e = $('.site-header-inner-top');
									if( uty.detectEl( e ) ){
										/* bu kısım site bazlı değişebilir */
										var x1 = ID.offset().left + 810, x2 = e.width() + e.offset().left;
										if( x1 >= x2 ) k.css({ 'left': x2 - x1 });
									}
								}
							}
						},
						closeElem: function(){
							if( o.closeElem != '' )
								$( o.closeElem ).each(function(){
									var ths = $( this ).get( 0 );
									if( typeof ths.closed !== 'undefined' )	
										ths.closed();
								});
						},
						events: {
							onMouseEnter: function(){
								var _t = main, ths = $( this );
								
								if( _t.isVisible() ) return false;
								
								//if( _t.detectEl( $(o.controls, ths) ) ){
									_t.clearTm();
									_t.stm = setTimeout(function(){
										_t.closeElem();
										ths.addClass( o.customClass ).siblings( o.siblings ).removeClass( o.customClass );
										_t.setPos( ths );
										_t.overlayControls('opened');
									}, o.openedDelay);
								//}
							},
							onMouseLeave: function(){
								var _t = main, ths = $( this );
									if( _t.isVisible() ) return false;
									_t.clearTm();
									_t.stm = setTimeout(function(){
										ths.add( ths.siblings( o.siblings ) ).removeClass( o.customClass );
										_t.overlayControls('closed');
									}, o.closedDelay);
							},
							onConMouseLeave: function(){
								var _t = main, ths = $( this );
									if( _t.isVisible() ) return false;
									_t.clearTm();
									_t.stm = setTimeout(function(){
										el.find('.' + o.customClass).removeClass( o.customClass );
										bdy.removeClass( o.bdyCls );

									}, o.closedDelay);
							},	
							onClick: function( e ){
								var _t = main, ths = $( this ).parent( o.siblings );
								if( _t.detectEl( $(o.controls, ths) ) && !_t.isVisible() ){
									e.preventDefault();
									if( ths.hasClass( o.customClass ) ){
										ths.removeClass( o.customClass ).siblings( o.siblings ).removeClass( o.customClass );
										_t.overlayControls('closed');
									}else{
										ths.addClass( o.customClass ).siblings( o.siblings ).removeClass( o.customClass );
										_t.setPos( ths );
										_t.overlayControls('opened');
									}
								}
							},
							bdyClicked: function( e ){
								var _t = main;
								if( !el.is( e.target ) && el.has( e.target ).length === 0 && !_t.isVisible() ){
									$('.' + o.customClass, el).removeClass( o.customClass );
									_t.overlayControls('closed');
								}
							}
						},
						addEvent: function(){
							var _t = this;
							
							if( o.eventType == 'hover' ){
								items.bind('mouseenter', _t.events.onMouseEnter).bind('mouseleave', _t.events.onMouseLeave);
								el.bind('mouseleave', _t.events.onConMouseLeave);
							}else if( o.eventType == 'click' )
								$(o.clickedElem, items).bind('click', _t.events.onClick);		
							
							if( o.bdyClicked )
								$('body, html').bind('click touchstart', _t.events.bdyClicked);
						},
						destroy: function(){
							var _t = this;
							$('.' + o.customClass, el).removeClass( o.customClass );
							_t.overlayControls('closed');
						},
						add: function(){
							var _t = this;
							el
							.find( o.items )
							.each(function(){
								var ths = $( this );
								if( _t.detectEl( $(o.controls, ths) ) )
									ths.addClass('sub-menu').prepend('<i></i>');
							});

							el
							.find('.sub-menu > i')
							.bind('click', function(){
								var ths = $( this ), prts = ths.parents('li').eq( 0 );
								if( _t.isVisible() ){
									if( prts.hasClass( _t.cls['selected'] ) )
										prts.add( prts.siblings('li') ).removeClass( _t.cls['hidden'] ).removeClass( _t.cls['selected'] );
									else
										prts.addClass( _t.cls['selected'] ).removeClass( _t.cls['hidden'] ).find('li').removeClass( _t.cls['selected'] ).removeClass( _t.cls['hidden'] ).end().siblings('li').addClass( _t.cls['hidden'] );		
								}
									
							});	

						},
						init: function(){
							var _t = this;
								_t.add();
								_t.addEvent();
						}
					};  
				
				
				this.closed = function() {
                    if( main.stm != null ) clearTimeout( main.stm );
                    main.destroy()
                };
				
				main.init();              
            })
        }
    })
})(jQuery, window);

// MINUS ZOOM
(function($) {
    $.fn.extend({
        minusZoomGallery: function(options, callback) {
            var defaults = {

            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var opt = options,
					bdy = $('body'),
                    win = $( window ),
                    ID = $( this ),
					uty = {
						detectEl: function( ID ){ return ID.length > 0 ? true : false; }
					},
                    main = {
                        el: { con: '.zoom-gallery' },
                        cls: { active: 'active', ready: 'gallery-ready' },
                        gallery: null,
                        thumbs: null,
                        template: {
                            wrp: '<div class="zoom-gallery"><div class="zoom-gallery-inner"><div class="zoom-gallery-header"><span class="title">{{title}}</span><a href="javascript:void(0);" class="close-btn"><i></i><span>close</span></a></div>{{large}}{{thumbs}}<div class="zoom-gallery-footer"></div></div></div>',
                            large: '<div class="large-wrapper"><ul class="swiper-wrapper">{{li}}</ul><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div>',
                            largeLi: '<li data-order="{{order}}" class="swiper-slide"><div class="swiper-zoom-container"><img data-src="{{src}}" class="swiper-lazy"></div><div class="swiper-lazy-preloader"></div></li>',
                            thumbs: '<div class="thumbs-wrapper"><ul class="swiper-wrapper">{{li}}</ul></div>',
                            thumbsLi: '<li data-order="{{order}}" class="swiper-slide"><span><img src="{{src}}" border="0" /></span></li>'
                        },
                        getTemplate: function(){
                            var _t = this, htm = { large: '', thumbs: '' };

                            ID
                            .find('[data-large]')
                            .each(function( i ){
                                var ths = $( this ), large = ths.attr('data-large') || '', thumbs = ths.attr('data-thumbs') || '';
                                    ths.attr('data-order', i);

                                if( large != '' )
                                    htm['large'] += _t.template['largeLi'].replace(/{{order}}/g, i).replace(/{{src}}/g, large); 

                                if( thumbs != '' )
                                    htm['thumbs'] += _t.template['thumbsLi'].replace(/{{order}}/g, i).replace(/{{src}}/g, thumbs);
                            });

                            htm['large'] = _t.template['large'].replace(/{{li}}/g, htm['large']);
                            htm['thumbs'] = _t.template['thumbs'].replace(/{{li}}/g, htm['thumbs']);
console.log( ID,  ID.attr('data-title') || '');
                            htm = _t.template['wrp'].replace(/{{large}}/g, htm['large']).replace(/{{thumbs}}/g, htm['thumbs']).replace(/{{title}}/g, ID.attr('data-title') || '');

                            return htm;
                        },
						add: function(){
                            var _t = this;
                            ID.after( _t.getTemplate() );
                        },
                        initPlugins: function(){
                            var _t = this;
                            _t.gallery = new Swiper('.zoom-gallery .large-wrapper', {
                                zoom: true,
                                slidesPerView: 1,
                                slidesPerGroup: 1,
                                preloadImages: false,
                                lazyLoading: true,
								nextButton: '.swiper-button-next',
                                prevButton: '.swiper-button-prev',
                                onSlideChangeStart: function( s ){
                                    var k = s.activeIndex;    
                                    $('.zoom-gallery .thumbs-wrapper li').eq( k ).addClass( _t.cls['active'] ).siblings().removeClass( _t.cls['active'] );                 
                                    k = k - 1;
                                    if( k <= 0 ) k = 0;
                                    _t.thumbs.slideTo( k, 333 );
                                }
                            });

                            var n = $('.zoom-gallery .thumbs-wrapper li').length;
                            _t.thumbs = new Swiper('.zoom-gallery .thumbs-wrapper', {
                                slideToClickedSlide: true,
                                slidesPerView: n > 4 ? 4 : n,
                                slidesPerGroup: 1,
                                onlyExternal: true,
                                spaceBetween: 20,
                                breakpoints: {
                                    640: {
                                        slidesPerGroup: 1,	
                                        slidesPerView: 'auto'
                                    }
                                }
                            });

                        },
                        addEvents: function(){
                            var _t = this, con = $( _t.el.con );
                            
                            con
                            .find('.thumbs-wrapper li')
                            .bind('click', function(){
                                var ths = $( this ), n = ths.attr('data-order') || 0;
                                _t.gallery.slideTo( n, 333 );
                            
                            });

                            ID
                            .find('[data-large]')
                            .bind('click', function(){
                                var ths = $( this ), n = ths.attr('data-order') || 0;
                                con.addClass( _t.cls['ready'] );
                                setTimeout(function(){ 
                                    _t.gallery.onResize();
                                     _t.thumbs.onResize();
                                    _t.gallery.slideTo( n, 333 ); 
                                }, 10);
                            });

                            con
                            .find('.close-btn')
                            .bind('click', function(){
                                con.removeClass( _t.cls['ready'] );
                            });                            
                        },
						init: function(){
							var _t = this;
								_t.add();
                                _t.initPlugins();
                                _t.addEvents();
								
						}
					};
				main.init();    
				
				///////// PUBLIC FUNC
				this.adjust = function( o ){
					  
				};            
            })
        }
    })
})(jQuery, window);

/* CUSTOM DROPDOWN */
(function($) {
    $.fn.extend({
        minusCustomDropDown: function(options, callback) {
            var defaults = { 
				typ: 'text', 
				fnd: '',
				items: '> ul li' 
			};
            var options = $.extend(defaults, options);
            return this.each(function() {
                var o = options,
					el = $( this ),
					clickedElem = el.find('> span'),
					items = el.find( o.items ),
					uty = {
						detectEl: function( ID ){ return ID.length > 0 ? true : false; }
					},
                    main = {
						drp: '.dropdown, .dropdown-mobi',
						cls: { opened: 'opened', selected: 'selected' },
						addEvent: function(){
							var _t = this, drp = $( _t.drp ), opCls = _t['cls']['opened'], sCls = _t['cls']['selected'];
							
							clickedElem
							.bind('click', function(){
								var ths = $( this ).parent();
								if( ths.hasClass( opCls ) ) 
									drp.removeClass( opCls );
								else{
									drp.removeClass( opCls );
									ths.addClass( opCls );
								}
							});
							
							items
							.bind('click', function(){
								var ths = $( this ), k = ths.text(), prts = ths.parents( _t.drp ).eq( 0 ), prop = prts.attr('data-uk-drp') || '';
								
								if( o.fnd != '' && o.typ == 'html' )
									k = ths.find( o.fnd ).html();
								
								if( prop != '' ){
									prop = prop.replace(/\'/g, '"');
									prop = JSON.parse( prop );
									var e = ths.find( prop['fnd'] || '' );
									if( e.length > 0 ){
										if( prop['typ'] == 'html' )
											k = e.html() || '';
										else	
											k = e.text() || '';
									}
								}

								ths.addClass( sCls ).siblings('li').removeClass( sCls ).parents( _t.drp ).find('> span').html( k );
								drp.removeClass( opCls );
							});
							
							var e = el.find('> ul li.selected');
							if( uty.detectEl( e ) )
								e.click();
						},
						init: function(){
							var _t = this;
							if( uty.detectEl( clickedElem ) && uty.detectEl( items ) )
								_t.addEvent();
						}
					};
				main.init();                
            })
        }
    })
})(jQuery, window);


/* CUSTOM COUNTER */
(function($) {
    $.fn.extend({
        minusCounter: function(options, callback) {
            var defaults = {};
            var options = $.extend(defaults, options);
            return this.each(function() {
                var el = $( this ),
					_min = el.attr('min') || 1,
					_max = el.attr('max') || 0,
                    o = options,
					uty = {
						cleanText: function( k ){ return k.replace(/\s+/g, ''); },
						cleanChar: function( k ){ return k.replace(/[^0-9]/g, ''); }
					},
					main = {
						template: {
							bottom: '<a class="counter-btn bottom-btn" rel="dec" href="javascript:void(0);"><span><i class="icon-arrow-down"></i></span></a>',
							top: '<a class="counter-btn top-btn" rel="inc" href="javascript:void(0);"><span><i class="icon-arrow-up"></i></span></a>'
						},
						check: function(){
							var _t = main, ths = $( this ), rel = ths.attr('rel') || '', val = parseFloat( uty.cleanChar( uty.cleanText( el.val() ) ) );
								
							if( isNaN( val ) ) val = _min;
							
							if( rel == 'inc' ) val++;
							else if( rel == 'dec' ) val--;
							
							if( _max != 0 )
								if( val >= _max ) val = _max;
								
							if( val <= _min ) val = _min;	
							
							el.val( val );
						},
						addEvent: function(){
							var _t = this;
							el
							.siblings('.counter-btn')
							.bind('click', _t.check);
							
							el
							.bind('blur', _t.check);
						},
						add: function(){
							var _t = this;
							el
							.before( _t.template.top )
							.after( _t.template.bottom );
						},
						init: function(){
							var _t = this;
								_t.add();
								_t.addEvent();
						}
					};
					
				main.init();
            })
        }
    })
})(jQuery, window);