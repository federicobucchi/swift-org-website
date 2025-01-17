function isTouchAvailable() {
  return !!(
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch)
  );
}
function isStoreLink(d) {
  var c = new RegExp(
    /^(https?:\/\/www.apple.com)?(\/[a-z\-_]*)?\/shop(\/.*)?$/i,
  );
  if (typeof d !== "string") {
    return false;
  }
  return c.test(d);
}
if (
  typeof AC === "object" &&
  typeof AC.onDOMReady === "function" &&
  typeof AC.Element === "object" &&
  typeof AC.Storage === "object"
) {
  AC.onDOMReady(function () {
    function l(a, e) {
      var f = a.getAttribute("data-analytics-title");
      var d = a.href ? a.getAttribute("href") : "";
      var c;
      if (f) {
        c = f;
      } else {
        c =
          typeof a.innerText === "string"
            ? a.innerText.trim()
            : a.textContent.trim();
      }
      function g(z, w, A) {
        var x = {
          region: w,
          pageName: s.pageName,
          linkText: z,
          eVar1: s.pageName + " | " + w + " | " + z,
        };
        var y = JSON.stringify ? JSON.stringify(x) : "";
        if (y) {
          if (isStoreLink(A) === false) {
            AC.Storage.setItem("ac-storage-apple_Metrics", y, "0");
          } else {
            if (window.localStorage !== undefined) {
              window.localStorage.setItem("apple_Metrics", y);
            }
          }
        }
      }
      if (isTouchAvailable() === true) {
        var b;
        AC.Element.addEventListener(a, "touchstart", function (v) {
          b = false;
          function w(q) {
            b = true;
          }
          function u(q) {
            AC.Element.removeEventListener(a, "touchmove", w);
            AC.Element.removeEventListener(a, "touchend", u);
            if (!b) {
              g(c, e, d);
            }
          }
          AC.Element.addEventListener(a, "touchmove", w);
          AC.Element.addEventListener(a, "touchend", u);
        });
      } else {
        AC.Element.addEventListener(a, "mouseup", function () {
          g(c, e, d);
        });
      }
    }
    var n = AC.Element.selectAll("#ac-globalnav a");
    n = n.concat(AC.Element.selectAll("#globalheader a"));
    n.forEach(function (a) {
      l(a, "global nav");
    });
    var o = AC.Element.selectAll(".localnav a");
    o = o.concat(AC.Element.selectAll("#productheader a"));
    o.forEach(function (a) {
      l(a, "product nav");
    });
    var m = AC.Element.selectAll(".ac-gf-buystrip a");
    m = m.concat(AC.Element.selectAll(".buystrip a"));
    m = m.concat(AC.Element.selectAll("#buystrip a"));
    m.forEach(function (a) {
      l(a, "buy strip");
    });
    var p = AC.Element.selectAll("#ac-globalfooter a");
    p = p.concat(AC.Element.selectAll("#globalfooter a"));
    p.forEach(function (a) {
      l(a, "global footer");
    });
    var k = AC.Element.selectAll("#ac-familybrowser a");
    k = k.concat(AC.Element.selectAll(".productbrowser ul li a"));
    k.forEach(function (a) {
      l(a, "product browser");
    });
    var h = AC.Element.selectAll('[data-analytics-region="learn more"] a');
    h.forEach(function (a) {
      l(a, "learn more");
    });
  });
}
if (document.location.search && s_account) {
  var dls = document.location.search;
  if (dls.indexOf("?cid=AOS-") > -1 || dls.indexOf("&cid=AOS-") > -1) {
    s_account += ",applestoreWW";
  }
}
(function () {
  function c() {
    var a = document.getElementsByTagName("meta");
    var b = a.length;
    for (i = 0; i < b; i++) {
      if (a[i].getAttribute("property") === "analytics-s-bucket-store") {
        return a[i].getAttribute("content");
      }
    }
    return "";
  }
  var d = c();
  if (d) {
    s_account += "," + d;
  }
})();
var s = s_gi(s_account);
if (navigator && navigator.loadPurpose && navigator.loadPurpose == "preview") {
  s.t = new Function("return ''");
}
s._isSafari = false;
if (s.u.toLowerCase().indexOf("webkit") > -1) {
  if (
    s.u.toLowerCase().indexOf("safari") > -1 &&
    s.u.toLowerCase().indexOf("chrome") < 0
  ) {
    s._isSafari = true;
  }
}
function safariHandler(b) {
  if (s.lt(b.href)) {
    b.addEventListener(
      "mouseup",
      function (f) {
        if ((f.which && f.which == 1) || (f.button && f.button == 1)) {
          var e = f.currentTarget.href,
            a = s.lt(e);
          if (a == "d") {
            if (e.match(/\.rss|\.xml/)) {
              s.eVar16 = s.prop16 = "sign ups";
            } else {
              s.eVar11 =
                AC.Tracking.pageName() +
                " - " +
                e.substring(e.lastIndexOf("/") + 1, e.length);
              s.eVar11 = s.eVar11.toLowerCase();
              s.eVar16 = s.prop16 = "Downloads";
              s.events = s.apl(s.events, "event5", ",", 1);
            }
            s.linkTrackVars = "prop16,eVar16,eVar11,events";
            s.linkTrackEvents = "event5";
          }
          s.linkTrackVars = "None";
          s.linkTrackEvents = "None";
        }
      },
      false,
    );
  }
}
s.currencyCode = "USD";
if (window.location.hostname.indexOf(".com.cn") > -1) {
  s.fpCookieDomainPeriods = "3";
}
s.trackDownloadLinks = true;
s.trackExternalLinks = true;
s.trackInlineStats = true;
s.useForcedLinkTracking = true;
s.forcedLinkTrackingTimeout = 100;
s.linkDownloadFileTypes =
  "zip,wav,mp3,doc,pdf,xls,dmg,sit,pkg,exe,mov,m4a,rss,xml,extz,safariextz";
s.linkInternalFilters = "javascript:,apple.com";
s.linkLeaveQueryString = false;
s.linkTrackVars = "campaign";
s.linkTrackEvents = "None";
s.loadModule("Media");
s.Media.autoTrack = false;
s.Media.trackVars = "prop13,hier1";
s.Media.trackEvents = "None";
s.Media.trackWhilePlaying = true;
s.Media.trackMilestones = "10,50,90";
s.Media.monitor = function (q, n) {
  if (n.event == "CLOSE") {
    if (n.percent >= "99") {
      q.Media.trackVars = "prop13,prop16,eVar16";
      q.prop13 = "v@e: " + n.name;
      q.eVar16 = q.prop16 = "video ends";
      q.Media.track(n.name);
      q.prop13 = q.prop16 = q.eVar16 = "";
    }
    if (n.percent < "99") {
      var k = q.events,
        l = q.prop13,
        m = q.prop16,
        o = q.prop4,
        r = q.Media.trackVars,
        p = q.Media.trackEvents;
      q.events = q.prop13 = q.prop16 = q.eVar16 = q.prop4 = "";
      q.Media.trackVars = q.Media.trackEvents = "";
      q.Media.track(n.name);
      q.events = k;
      q.prop13 = l;
      q.prop16 = q.eVar16 = m;
      q.prop4 = o;
      q.Media.trackVars = r;
      q.Media.trackEvents = p;
    }
  }
};
s.eVar54 = document.location.href;
s.eVar49 = document.referrer;
var s_vi_vnum = s.c_r("s_vnum_n2_us");
if (s_vi_vnum) {
  var date = new Date();
  date.setTime(date.getTime() + 63072000000);
  var expires = "; expires=" + date.toGMTString();
  document.cookie =
    "s_vnum_n2_us=" + s_vi_vnum + expires + "; domain=apple.com; path=/";
}
var s_vi = s.c_r("s_vi");
if (s_vi) {
  var date = new Date();
  date.setTime(date.getTime() + 63072000000);
  var expires = "; expires=" + date.toGMTString();
  document.cookie = "s_vi=" + s_vi + expires + "; domain=apple.com; path=/";
}
var s_pv = s.c_r("s_pv");
if (s_pv) {
  var expires = ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  document.cookie = "s_pv=" + s_pv + expires + "; domain=apple.com; path=/";
}
function s_getObjectID(c) {
  var d = c.href;
  return d;
}
s.getObjectID = s_getObjectID;
function QTCheck() {
  if (
    AC &&
    typeof AC.Detector != "undefined" &&
    typeof AC.Detector.getQTVersion != "undefined"
  ) {
    return AC.Detector.isMobile() || AC.Detector.isiPad()
      ? "mobile"
      : AC.Detector.getQTVersion() == "0"
        ? "no quicktime"
        : "quicktime " + AC.Detector.getQTVersion().split(/\./)[0] + ".x";
  }
  return "quicktime not detected";
}
if (typeof iTunesDetected === "function") {
  var activeX = document.createElement("object");
  activeX.setAttribute("width", 1);
  activeX.setAttribute("height", 1);
  activeX.id = "iTunesDetectorIE";
  activeX.setAttribute("classid", "clsid:D719897A-B07A-4C0C-AEA9-9B663A28DFCB");
  document.getElementsByTagName("head")[0].appendChild(activeX);
  s.prop12 = iTunesDetected() ? "itunes" : "no itunes";
}
if (typeof AC == "undefined") {
  AC = {};
}
if (!AC.Tracking) {
  AC.Tracking = {};
}
AC.Tracking._pageName = null;
AC.Tracking.pageName = function () {
  if (AC.Tracking._pageName) {
    return AC.Tracking._pageName;
  }
  var f = document.getElementsByTagName("meta");
  for (var e = 0, d; (d = f[e]); e++) {
    if ("omni_page" === d.getAttribute("name")) {
      AC.Tracking._pageName = d.getAttribute("content").toLowerCase();
      return AC.Tracking._pageName;
    }
  }
  return AC.Tracking._pageNameForTitle_atHost_andPath(
    document.title,
    window.location.hostname,
    window.location.pathname,
  );
};
AC.Tracking._pageNameForTitle_atHost_andPath = function (g, h, e) {
  var f = g.toLowerCase();
  if (/\s-\s/.test(f)) {
    f = f.replace(
      /\s*-?\s*(apple|アップル|애플컴퓨터코리아|蘋果|蘋果電腦|apple中国|苹果中国)\s+[^-]*-?\s*/,
      "",
    );
  }
  if (!e.match(/^\/(ws|pr|g5|go|ta|wm)\//)) {
    e = e.replace(/^\/(\w{2}|befr|benl|chfr|chde|asia|lae)(?=\/)/, "");
  }
  if (
    e.match(/\//g).length <= 2 &&
    !e.match(/support/) &&
    !h.match(/support/) &&
    !h.match(/selfsolve/) &&
    (!!e.match(/index\.html/) || !e.match(/\.html/))
  ) {
    f += " - index";
  }
  if (/\/pr\//.test(e)) {
    f = "pr - " + f;
  }
  return f;
};
s.usePlugins = true;
function s_doPlugins(Q) {
  Q.tcall = typeof Q.linkType == "undefined" ? true : false;
  if (Q.pageName) {
    var ac = escape(Q.pageName);
    ac = ac.replace(/(%u2018|%u2019|%u02BC|%u02BD)/g, "%27");
    ac = ac.replace(/(%u201C|%u201D|%E2%80%9C|%E2%80%9D)/g, "%22");
    ac = ac.replace(/(%09|%0A|%0D)/g, "");
    Q.pageName = unescape(ac);
  }
  if (
    !Q.d.URL.match(
      /(apple.com\/retail\/.+\/map\/|apple.com\/buy\/locator\/|discussions.apple.com|discussionsjapan.apple.com)/g,
    )
  ) {
    Q.setupDynamicObjectIDs();
  }
  if (window.devicePixelRatio >= 2) {
    Q.prop5 = navigator.platform + " 2x";
  } else {
    Q.prop5 = navigator.platform;
  }
  tempVar1 = Q.getQueryParam("ref");
  if (tempVar1 && Q.tcall) {
    Q.referrer = tempVar1;
  } else {
    if (tempVar1 && !Q.tcall) {
      Q.referrer = "";
    }
  }
  Q.server = Q.getQueryParam("alias");
  if (!Q.server) {
    Q.server = "new approach legacy";
  }
  if (!Q.campaign) {
    Q.campaign = Q.getQueryParam("cid");
    Q.setClickMapEmail("Email_PageName,Email_OID", "Email_OT");
    if (Q.campaign.match(/OAS-.+?-DOMAINS-/i)) {
      var ad = "http://" + Q.campaign.replace(/OAS-.+?-DOMAINS-/i, "");
      Q.referrer = Q.tcall ? ad : "";
    }
  }
  Q.campaign = Q.getValOnce(Q.campaign, "s_campaign", 0);
  Q.prop6 = !Q.prop6
    ? 'D="' + Q.getQueryParam("cp").toLowerCase() + ': "+pageName'
    : Q.prop6;
  Q.prop11 = Q.getQueryParam("sr");
  if (!Q.d.URL.match(/\/channel\//) && !Q.prop11 && Q.c_r("s_3p")) {
    Q.prop11 = Q.c_r("s_3p");
    Q.c_w("s_3p", "", -1);
  }
  Q.eVar7 = !Q.eVar7 ? Q.getQueryParam("aid") : "";
  Q.eVar7 = Q.getValOnce(Q.eVar7, "s_var_7", 0);
  if (Q.eVar2) {
    Q.events = Q.apl(Q.events, "event6", ",", 1);
  }
  if (
    !Q.d.URL.match(
      /apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search\//,
    ) &&
    !Q.d.URL.match(/apple.com\/search\//) &&
    (Q.d.referrer.match(
      /apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search\//,
    ) ||
      Q.d.referrer.match(/apple.com\/search\//))
  ) {
    Q.eVar2 = Q.d.referrer.match(/\/support\//)
      ? "acs: "
      : Q.d.referrer.match(/\/store\//)
        ? "aos: "
        : "www: ";
    if (
      Q.d.referrer.match(
        /apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search/,
      )
    ) {
      Q.eVar2 += Q.getQueryParam("q", "", Q.d.referrer).replace(/\+/g, " ");
      var K = Q.d.referrer.match(/\/(\w{2}|befr|benl|chfr|chde|asia|lae)\//i);
      Q.eVar2 += " (" + K[0].replace(/\//g, "") + ")";
    } else {
      Q.eVar2 +=
        Q.getQueryParam("q", "", Q.d.referrer).replace(/\+/g, " ") + " (us)";
    }
  }
  if (Q.prop11 == "em" && Q.tcall) {
    Q.referrer = "imap://chatterbox.com";
  }
  if (Q.prop11 == "app" && Q.tcall) {
    Q.referrer = "file://fromApp";
  }
  if (
    document.referrer &&
    document.referrer.indexOf("apple.com/startpage/") > -1 &&
    Q.tcall
  ) {
    Q.referrer = "news://startpage.com";
    Q._1_referrer = 1;
  }
  if (!Q.prop17) {
    var ag = Q.getPercentPageViewed(Q.pageName);
    if (ag && ag.length >= 5 && typeof ag[1] != "undefined") {
      Q.prop14 = ag[0];
      Q.prop17 = ag[1] + ":" + ag[2];
      Q.prop28 = Math.round(ag[3] / 10) * 10;
      Q.eVar17 = Q.eVar18 = "";
      if (ag[4]) {
        var G = ag[4].split(/\|/g),
          I = "";
        for (var e = 0; e < G.length; e++) {
          if (e != G.length - 1) {
            var V = G[e + 1].split(/:/)[0] - G[e].split(/:/)[0];
            if (V > 100) {
              I += G[e].split(/:/)[1];
              var P = V / 100;
              while (P > 1) {
                I += "0";
                P--;
              }
            } else {
              I += G[e].split(/:/)[1];
            }
          } else {
            I += G[e].split(/:/)[1];
          }
        }
        if (I.length > 254) {
          Q.eVar17 = I.substring(0, 254);
          Q.eVar18 = I.substring(255, I.length);
        } else {
          Q.eVar17 = I;
        }
      }
      if (!Q.tcall) {
        Q.linkTrackVars = "prop17,prop28";
      }
    }
  }
  Q.prop38 = Q.tcall ? Q.deviceOrientationChanges(true) : "";
  Q.prop32 = Q.eVar32 = Q.getQueryParam("psid");
  if (Q.prop32 || Q.c_r("s_sid")) {
    var S = new Date(),
      aa = S.getTime();
    S.setTime(aa + 630720000);
    Q.prop32
      ? Q.c_w("s_psid", Q.prop32, S)
      : Q.c_w("s_psid", Q.c_r("s_sid"), S);
    Q.c_w("s_sid", "", -1);
  }
  if (!Q.prop32 && !Q.c_r("s_pathLength")) {
    Q.prop32 = Q.c_r("s_psid");
  }
  Q.linkLeaveQueryString = true;
  var Z = Q.downloadLinkHandler();
  if (Z) {
    if (Z.match(/\.rss|\.xml/)) {
      Q.eVar16 = Q.prop16 = "sign ups";
    } else {
      Q.eVar11 =
        AC.Tracking.pageName() +
        " - " +
        Z.substring(Z.lastIndexOf("/") + 1, Z.length);
      Q.eVar16 = Q.prop16 = "downloads";
      Q.events = Q.apl(Q.events, "event5", ",", 1);
    }
    Q.linkTrackVars = "prop16,eVar16,eVar11,events";
    Q.linkTrackEvents = "event5";
  }
  Q.linkLeaveQueryString = false;
  if (typeof Media != "undefined" && Q.tcall) {
    Q.prop18 = QTCheck();
  }
  function O() {
    if (Q.u.match(/windows/i)) {
      Q.prop9 = "windows";
      return;
    }
    if (Q.u.match(/(kindle|silk-accelerated)/i)) {
      if (Q.u.match(/(kindle fire|silk-accelerated)/i)) {
        Q.prop9 = "kindle fire";
      } else {
        Q.prop9 = "kindle";
      }
      return;
    }
    if (Q.u.match(/(iphone|ipod|ipad)/i)) {
      var b = Q.u.match(/OS [0-9_]+/i);
      Q.prop9 = "i" + b[0].replace(/_/g, ".");
      return;
    }
    if (Q.u.match(/android/i)) {
      Q.prop9 = Q.u.match(/android [0-9]\.?[0-9]?\.?[0-9]?/i);
      return;
    }
    if (Q.u.match(/webos\/[0-9\.]+/i)) {
      var b = Q.u.match(/webos\/[0-9]\.?[0-9]?\.?[0-9]?/i);
      Q.prop9 = b[0].replace(/webos\//i, "web os ");
      return;
    }
    if (Q.u.match(/rim tablet os [0-9\.]+/i)) {
      var b = Q.u.match(/rim tablet os [0-9]\.?[0-9]?\.?[0-9]?/i);
      Q.prop9 = b[0].replace(/rim tablet os/i, "rim os ");
      return;
    }
    if (
      (Q.u.match(/firefox\/(\d{2}||[3-9])/i) || Q.u.match(/AppleWebKit\//)) &&
      Q.u.match(/Mac OS X [0-9_\.]+/)
    ) {
      var a = Q.u.match(/[0-9_\.]+/g);
      a = a[1].split(/_|\./);
      Q.prop9 = a[0] + "." + a[1] + ".x";
      return;
    }
    var c =
      Q.u.match(/AppleWebKit\/\d*/i) &&
      Q.u
        .match(/AppleWebKit\/\d*/i)
        .toString()
        .replace(/AppleWebKit\//i, "");
    if (c > 522) {
      Q.prop9 = "10.5.x";
    } else {
      if (c > 400) {
        Q.prop9 = "10.4.x";
      } else {
        if (c > 99) {
          Q.prop9 = "10.3.x";
        } else {
          if (c > 80) {
            Q.prop9 = "10.2.x";
          } else {
            Q.prop9 = "mac unknown or non-safari";
          }
        }
      }
    }
  }
  O();
  if (Q.pageName && Q.pageName.match(/feedback - thank you/)) {
    Q.prop16 = Q.eVar16 = "feedback";
  }
  if (Q.prop13 && (Q.tcall || Q.linkType == "o" || Q.linkType == "")) {
    if (Q.pageName && !Q.pageName.match(/movie trailers -/)) {
      if (Q.prop13.match(/(v@s|v@r)/i)) {
        Q.prop16 = Q.eVar16 = "video plays";
        Q.events = "event2";
        if (!Q.tcall) {
          Q.linkTrackEvents += ",event2";
          Q.linkTrackVars += ",events,prop16,eVar16";
        }
      }
      if (Q.prop13.match(/v@e/i)) {
        Q.prop16 = Q.eVar16 = "video ends";
        if (!Q.tcall) {
          Q.linkTrackEvents = "";
          Q.linkTrackVars += ",prop16,eVar16";
        }
      }
    }
  }
  Q.linkLeaveQueryString = true;
  var U = Q.linkHandler("itms.apple.com|itunes.apple.com", "e");
  var Z = Q.linkHandler(
    "ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/|rss.support.apple.com",
    "o",
  );
  if (Z) {
    Q.eVar16 = Q.prop16 = "sign ups";
    Q.linkTrackVars = "eVar16,prop16";
  }
  Q.linkLeaveQueryString = false;
  if (Q.tcall) {
    var N,
      L = window.location.pathname,
      R = false,
      H = true;
    if (Q.c_r("iTunesPresent") || (Q.prop12 && Q.prop12 == "iTunes")) {
      N = N ? N + "it," : "it,";
    }
    if (Q.c_r("hasMobileMe")) {
      N = N ? N + "mm," : "mm,";
    }
    if (
      Q.c_r("DefaultAppleID") ||
      (Q.pageName && Q.pageName.match(/iforgot - cr or email option/))
    ) {
      N = N ? N + "aid," : "aid,";
    }
    if (Q.c_r("trackStartpage")) {
      N = N ? N + "sp," : "sp,";
    }
    if (Q.prop11) {
      if (Q.prop11.match("3p")) {
        N = N ? N + "3p," : "3p,";
      }
    }
    if (Q.pageName) {
      if (Q.pageName.match(/one to one - index/)) {
        N = N ? N + "o2o," : "o2o,";
      }
    }
    if (L.match("/welcomescreen/")) {
      var T;
      if ((T = L.match("ilife.*"))) {
        T = "il" + T.toString().match("[0-9]+") + ",";
        N = N ? N + T : T;
      } else {
        if ((T = L.match("iwork.*"))) {
          T = "iwk" + T.toString().match("[0-9]+") + ",";
          N = N ? N + T : T;
        } else {
          if ((T = L.match("itunes.*"))) {
            T = "it" + T.toString().match("[0-9]+") + ",";
            N = N ? N + T : T;
          } else {
            if ((T = L.match("aperture.*"))) {
              T = "ap" + T.toString().match("[0-9]+") + ",";
              N = N ? N + T : T;
            }
          }
        }
      }
    }
    if (Q.getQueryParam("sr") && Q.getQueryParam("vr")) {
      var ab = Q.getQueryParam("vr");
      ab = ab.substring(0, ab.indexOf("-")) + ",";
      N = N ? N + ab : ab;
    }
    if (typeof N != "undefined") {
      N = N.substring(0, N.length - 1).toLowerCase();
      N = N.split(",");
      if (Q.c_r("s_membership")) {
        var J = Q.c_r("s_membership").split(/:/);
        J.splice(0, 1);
        for (e = 0; e < N.length; e++) {
          for (j = 0; j < J.length; j++) {
            if (J[j] == N[e]) {
              H = false;
            }
          }
          if (H) {
            J[J.length] = N[e];
            R = true;
          }
          H = true;
        }
        if (R) {
          N = J.length + ":" + J.toString().replace(/,/g, ":");
          var S = new Date(),
            aa = S.getTime();
          S.setTime(aa + 63072000);
          Q.c_w("s_membership", N, S);
          Q.prop31 = N;
        }
      } else {
        N = N.length + ":" + N.toString().replace(/,/g, ":");
        var S = new Date(),
          aa = S.getTime();
        S.setTime(aa + 63072000);
        Q.c_w("s_membership", N, S);
        Q.prop31 = N;
      }
    }
    if (!Q.prop31 && !Q.c_r("s_pathLength")) {
      Q.prop31 = Q.c_r("s_membership");
    }
  }
  (function ae() {
    function f() {
      var g = window.location.host;
      var h = document.referrer;
      var k = "";
      if (!h) {
        k = "direct entry";
      } else {
        if (h.split("?")[0].indexOf(g) === -1) {
          k = "third party";
        }
      }
      return k;
    }
    var a = f();
    if (a && a !== "") {
      Q.prop25 = a;
    }
    if (Q.tcall && !Q.prop25) {
      var b;
      if (isStoreLink() === true) {
        if (window.localStorage !== undefined) {
          b = window.localStorage.getItem("apple_Metrics");
          window.localStorage.removeItem("apple_Metrics");
        }
      } else {
        if (AC && typeof AC.Storage === "object") {
          b = AC.Storage.getItem("ac-storage-apple_Metrics");
          AC.Storage.removeItem("ac-storage-apple_Metrics");
        }
      }
      if (b) {
        var d;
        try {
          d = JSON.parse(b);
        } catch (c) {}
        Q.prop25 = d.region ? d.region : null;
        Q.eVar1 = d.eVar1 ? d.eVar1 : null;
        if (d.pageName) {
          Q.prop14 = d.pageName;
        }
        if (d.events) {
          if (!Q.events) {
            Q.events = d.events;
          } else {
            Q.events += "," + d.events;
          }
        }
      }
    }
    if (Q.tcall) {
      if (
        document.referrer.match(/(downloads|epp|store|storeint)\.apple\.com/)
      ) {
        Q.prop25 = "aos nav";
      }
    }
    if (!Q.prop25) {
      Q.prop25 = "other nav or none";
    }
  })();
  if (
    ((Q.pageName &&
      Q.prop14 &&
      Q.pageName.toLowerCase() != Q.prop14.toLowerCase()) ||
      !Q.prop14) &&
    Q.tcall
  ) {
    var W,
      Y = Q.c_r("s_pathLength"),
      af = Y.indexOf(",") > -1 ? Y.split(",") : [],
      S = new Date(),
      aa = S.getTime();
    S.setTime(aa + 30 * 60 * 1000);
    if (Q.channel) {
      W = Q.channel.substring(Q.channel.indexOf(".") + 1, Q.channel.length);
      W = W.substring(W.indexOf(".") + 1, W.length);
    } else {
      W = "no channel";
    }
    if (af.length != 0 && af.toString().indexOf(W + "=") > -1) {
      for (e = 0; e < af.length; e++) {
        if (af[e].toString().indexOf(W + "=") > -1) {
          var X = af[e].split("=");
          ++X[1];
          af[e] = X[0] + "=" + X[1];
          Q.prop48 = X[1];
        }
      }
      Q.c_w("s_pathLength", af, S);
    } else {
      var X = Y + W + "=" + 1 + ",";
      Q.c_w("s_pathLength", X, S);
      Q.prop48 = "1";
    }
  }
  if (Q.tcall) {
    Q.prop50 = Q.getVisitNumPerChannel();
  }
  var M = Q.getQueryParam ? Q.getQueryParam("afid") : null;
  if (M) {
    Q.eVar10 = Q.getValOnce ? Q.getValOnce(M, "s_afc") : null;
  }
  (function () {
    var a = document.getElementById("top");
    var b = a ? a.getAttribute("data-analytics-locale") : "";
    if (b) {
      Q.prop20 = "aos: " + b;
      Q.prop19 = Q.prop20 + (Q.pageName ? ": " + Q.pageName : "");
      Q.eVar3 = Q.prop20 || "";
    }
  })();
  Q.hier1 = Q.channel ? Q.channel : "";
  Q.linkTrackVars = Q.apl(Q.linkTrackVars, "hier1", ",", 1);
  Q.prop49 = "D=s_vi";
  Q.prop4 = Q.prop4 ? Q.prop4 : "D=g";
  Q.manageVars(
    "lowercaseVars",
    "purchaseID,pageType,events,products,transactionID",
    2,
  );
}
s.doPlugins = s_doPlugins;
s.getVisitNumPerChannel = function () {
  var L = this,
    e = new Date(),
    T,
    U,
    D = 0,
    V = false,
    R = false,
    N = "no channel",
    W = e.getTime(),
    S = W + 30 * 60 * 1000,
    J = W + 1825 * 24 * 60 * 60 * 1000,
    E = L.wd.location.pathname,
    O = "us",
    P = "",
    K = new Array(
      "no channel",
      "aos",
      "homepage",
      "support",
      "itunes",
      "myappleid.iforgot",
      "trailers",
      "ip",
      "discussions",
      "myappleid",
      "quicktime",
      "ipad",
      "ipadmini",
      "legal",
      "mac",
      "macosx",
      "safari",
      "ipod",
      "developer",
      "retailstore",
      "macbookair",
      "retail.concierge",
      "macosx.downloads",
      "ipodtouch",
      "ios",
      "macbookpro",
      "webapps",
      "search",
      "retail.onetoone",
      "icloud",
      "imac",
      "macmini",
      "ilife",
      "other",
      "findouthow",
      "jobs",
      "mobileme",
      "whymac",
      "macappstore",
      "hotnews",
      "redirects",
      "ipodnano",
      "education",
      "iwork",
      "ipodclassic",
      "macpro",
      "contact",
      "appletv",
      "finalcutstudio",
      "pr",
      "productpromotions",
      "ipodshuffle",
      "airportexpress",
      "environment",
      "aperture",
      "batteries",
      "mac.facetime",
      "productpromotions.rebate",
      "timecapsule",
      "displays",
      "airportextreme",
      "logicstudio",
      "buy",
      "about",
      "accessibility",
      "mightymouse",
      "thunderbolt",
      "html5",
      "remotedesktop",
      "magictrackpad",
      "keyboard",
      "business",
      "retail.jointventure",
      "itunesappstore",
      "pro",
      "science",
      "logicexpress",
      "channelprograms",
      "startpage",
      "advertising",
      "financialservices",
      "giftcards",
      "xsan",
      "server",
      "battery",
      "companystore",
      "ali",
      "supplier",
      "beatles",
      "usergroups",
      "webbadges",
      "procurement",
      "802.11n",
      "retail",
      "itunesnews",
      "ibooks-author",
      "osx",
      "apple-events",
    );
  if (L.wd.location.hostname.match(/apple.com.cn/)) {
    O = "cn";
  } else {
    if (!E.match(/^\/(ws|pr|g5|go|ta|wm|kb)\//)) {
      if (E.match(/^\/(\w{2}|befr|benl|chfr|chde|asia|lae)(?=\/)/)) {
        O = E.split("/")[1].toLowerCase();
      }
    }
  }
  var c = "s_vnum_n2_" + O,
    H = "s_invisit_n2_" + O;
  if (L.channel) {
    N = L.channel.substring(L.channel.indexOf(".") + 1, L.channel.length);
    N = N.substring(N.indexOf(".") + 1, N.length);
  }
  function M(a) {
    for (var b = 0; b <= K.length; b++) {
      if (a == K[b]) {
        return b + 1;
      }
    }
  }
  P = M(N);
  if (!P) {
    P = "0";
  }
  L.c_w("s_vnum_" + O, "", 63072000);
  L.c_w("s_invisit_" + O, "", 63072000);
  L.c_w("s_invisit_n_" + O, "", 63072000);
  L.c_w("s_vnum_n_" + O, "", 63072000);
  T = L.c_r(c);
  U = L.c_r(H);
  if (P) {
    if (U) {
      var C = U.split(/,/);
      for (var F = 0, I; (I = C[F]); F++) {
        if (P.toString() == I) {
          V = true;
          break;
        }
      }
    }
    if (!V) {
      var Q = T.split(/,/);
      for (var F = 0, I; (I = Q[F]); F++) {
        var G = I.split(/\|/);
        if (P.toString() == G[0]) {
          D = parseInt(G[1]) + 1;
          Q[F] = G[0] + "|" + D;
          R = true;
          break;
        }
      }
      e.setTime(S);
      L.c_w(H, U ? U + "," + P : P, e);
      e.setTime(J);
      if (R) {
        L.c_w(c, Q.toString(), e);
        return N + "=" + D;
      } else {
        Q.toString() ? Q.push(P + "|" + 1) : (Q = P + "|" + 1);
        L.c_w(c, Q.toString(), e);
        return N + "=" + 1;
      }
    }
  }
};
s.handlePPVevents = new Function(
  "",
  "if(!s.getPPVid)return;var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,pv=Math.min(Math.round(vh/dh*100),100),c=s.c_r('s_ppv'),a=(c.indexOf(',')>-1)?c.split(',',5):[],id=(a.length>0)?(a[0]):escape(s.getPPVid),cv=(a.length>1)?parseInt(a[1]):(0),p0=(a.length>2)?parseInt(a[2]):(pv),cy=(a.length>3)?parseInt(a[3]):(0),pt=s._ct,ph=s._ch,t=new Date;t.setTime(t.getTime()+1800000);s._ct=new Date().getTime();s._ch=vh;var sa='',td=Math.round((s._ct-pt)/1000),hd=Math.abs(s._ch-ph),lowerBound,upperBound;if(hd&&td){lowerBound=Math.ceil(st/100)*100;upperBound=Math.ceil(s._ch/100)*100;while(lowerBound<=upperBound){if(lowerBound!=0){var value=lowerBound+':'+(td>10?'>':td);if(s.pxViewedArray.length==0){s.pxViewedArray.push(value);}else if(s.pxViewedArray.toString().indexOf(lowerBound)==-1){s.pxViewedArray.push(value);}else{for(i=0;i<s.pxViewedArray.length;i++){var av=s.pxViewedArray[i].split(':');if(lowerBound==av[0]){if(av[1]!='>'){var totalTime=Math.floor((Number(av[1])+Number(td))*100)/100;if(totalTime>10){totalTime='>';}s.pxViewedArray[i]=av[0]+':'+totalTime;}break;}}}}lowerBound=lowerBound+100;s.pxViewedArray.sort(function(a,b){return parseInt(a)-parseInt(b)});}}sa=s.pxViewedArray.toString().replace(/,/g,'|');cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy)?vh:cy)+','+((sa)?sa:'')):'';s.c_w('s_ppv',cn,t);",
);
s.getPercentPageViewed = new Function(
  "pid",
  "pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false,t=new Date;t.setTime(t.getTime()+1800000);if(typeof(s.linkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'),a=(v.indexOf(',')>-1)?v.split(',',5):[];if(a.length<5){for(var i=4;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape(a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid),t);s.pxViewedArray=[];if(ist){s.getPPVid=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('s_ppv',escape(s.getPPVid),0);if(s.wd.addEventListener){s.wd.addEventListener('load',s.handlePPVevents,false);s.wd.addEventListener('scroll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handlePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onload',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevents);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-')?(a):(a[1]);",
);
s.p_oc = new Function(
  "evt",
  "var o=s.wd.orientation,ot=(Math.abs(o)==90)?'l':'p',cv,v;s.lc=(evt.type=='load')?s.lc+1:s.lc;if(s.lc==0)return;if(typeof(o)!='undefined'){ot=(evt.type=='load')?ot:ot+':'+s.c_r('s_orientationHeight');cv=s.c_r('s_orientation');v=cv?cv+=','+ot:ot;s.c_w('s_orientation',v)}",
);
s.p_och = new Function(
  "",
  "var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clientHeight));vph=s.wd.innerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph;s.c_w('s_orientationHeight',vh);",
);
s.deviceOrientationChanges = new Function(
  "ext",
  "var s=this,v;s.lc=0;if(typeof(s.linkType)!='undefined'&&s.linkType!='e')return'';var cv=s.c_r('s_orientation'),cva=(cv.indexOf(',')>-1)?cv.split(','):'';if(cv){if(cva){if(!ext){for(i=1;i<cva.length;i++){cva[i]=cva[i].split(':')[0];}}cva[0]+='@s';cva.push(cva[cva.length-1].split(':')[0]+'@e');v=cva.toString();}else{v=cv+'@s,'+cv+'@e';}}s.c_w('s_orientation','');if(s.wd.addEventListener){s.wd.addEventListener('orientationchange',s.p_oc,false);s.wd.addEventListener('load',s.p_oc,false);s.wd.addEventListener('load',s.p_och,false);s.wd.addEventListener('scroll',s.p_och,false);}return v;",
);
s.detectRIA = new Function(
  "cn",
  "fp",
  "sp",
  "mfv",
  "msv",
  "sf",
  "cn=cn?cn:'s_ria';msv=msv?msv:2;mfv=mfv?mfv:10;var s=this,sv='',fv=-1,dwi=0,fr='',sr='',w,mt=s.n.mimeTypes,uk=s.c_r(cn),k=s.c_w('s_cc','true',0)?'Y':'N';fk=uk.substring(0,uk.indexOf('|'));sk=uk.substring(uk.indexOf('|')+1,uk.length);if(k=='Y'&&s.p_fo('detectRIA')){if(uk&&!sf){if(fp){s[fp]=fk;}if(sp){s[sp]=sk;}return false;}if(!fk&&fp){if(s.pl&&s.pl.length){if(s.pl['Shockwave Flash 2.0'])fv=2;x=s.pl['Shockwave Flash'];if(x){fv=0;z=x.description;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(navigator.plugins&&navigator.plugins.length){x=navigator.plugins['Shockwave Flash'];if(x){fv=0;z=x.description;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt&&mt.length){x=mt['application/x-shockwave-flash'];if(x&&x.enabledPlugin)fv=0;}if(fv<=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.isie&&w&&execScript){result=false;for(var i=mfv;i>=3&&result!=true;i--){execScript('on error resume next: result = IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}fr=fv==-1?'Flash Not Detected':fv==0?'Flash Enabled (No Version)':'Flash '+fv;}if(!sk&&sp&&s.apv>=4.1){var tc='try{x=new ActiveXObject(\"AgControl.A'+'gControl\");for(var i=msv;i>0;i--){for(var j=9;j>=0;j--){if(x.is'+'VersionSupported(i+\".\"+j)){sv=i+\".\"+j;break;}}if(sv){break;}'+'}}catch(e){try{x=navigator.plugins[\"Silverlight Plug-In\"];sv=x'+'.description.substring(0,x.description.indexOf(\".\")+2);}catch('+'e){}}';eval(tc);sr=sv==''?'Silverlight Not Detected':'Silverlight '+sv;}if((fr&&fp)||(sr&&sp)){s.c_w(cn,fr+'|'+sr,0);if(fr)s[fp]=fr;if(sr)s[sp]=sr;}}",
);
s.downloadLinkHandler = new Function(
  "p",
  "var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkType&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;",
);
s.linkHandler = new Function(
  "p",
  "t",
  "var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkName)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkName=l=='[['?'':l;s.linkType=t;return h;}return '';",
);
s.p_gn = new Function(
  "t",
  "h",
  "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x=t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}return 0;",
);
s.getPreviousValue = new Function(
  "v",
  "c",
  "el",
  "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}",
);
s.setupDynamicObjectIDs = new Function(
  "var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,false);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semaphore=1}",
);
s.setOIDs = new Function(
  "e",
  "var s=s_c_il[" +
    s._in +
    "],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i,a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links){for(i=0;i<s.d.links.length;i++){l=s.d.links[i];if(s._isSafari){safariHandler(l);}c=l[o]?''+l[o]:'';b=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.repl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0)x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this.s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o]=new Function('e',x)}}}s.wd.s_semaphore=0;return true",
);
s.getQueryParam = new Function(
  "p",
  "d",
  "u",
  "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.location);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i==p.length?i:i+1)}return v",
);
s.p_gpv = new Function(
  "k",
  "u",
  "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,'&','p_gvf',k)}return v",
);
s.p_gvf = new Function(
  "t",
  "k",
  "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'True':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s.epa(v)}return ''",
);
s.getValOnce = new Function(
  "v",
  "c",
  "e",
  "var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v",
);
s.setClickMapEmail = new Function(
  "qp",
  "ot",
  "var s=this,v=s.getQueryParam(qp,'~'),d,pn,oid,ot=s.getQueryParam(ot),ot=ot?ot:'A',cv;d=v.indexOf('~');if(!v)return '';if(d>-1){pn=v.substring(0,d);oid=v.substring(d+1);}cv='&pid='+s.ape(s.fl(pn,255))+'&pidt=1&oid='+s.ape(s.fl(oid,100))+'&oidt=1&ot='+ot+'&oi=1';s.sq(cv);",
);
s.getAndPersistValue = new Function(
  "v",
  "c",
  "e",
  "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if(v)s.c_w(c,v,e?a:0);return s.c_r(c);",
);
s.__se = new Function(
  "var l={'~':'tl:[\\'','^': 'kw:[\\'','%': 'ahoo','|': '\\'],','>': '\\']}','*': '.com','$': 'search',';':'query','#':'land','`':'oogle','+':'http://www','<':'keyword'};var f=this.___se+'';var g='';for(var i=0;i<f.length;i++){if(l[f.substring(i,i+1)]&&typeof l[f.substring(i,i+1)]!='undefined'){g+=l[f.substring(i,i+1)];}else{g+=f.substring(i,i+1);}}return eval('('+g+')');",
);
s.___se = "{}";
s.isEntry = new Function(
  "var s=this;var l=s.linkInternalFilters,r=s.referrer||typeof s.referrer!='undefined'?s.referrer:document.referrer,p=l.indexOf(','),b=0,v='';if(!r){return 1;}while(p=l.indexOf(',')){v=p>-1?l.substring(b,p):l;if(v=='.'||r.indexOf(v)>-1){return 0;}if(p==-1){break;}b=p+1;l=l.substring(b,l.length);}return 1;",
);
s.p_fo = new Function(
  "n",
  "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=new Object;return 1;}else {return 0;}",
);
s.manageVars = new Function(
  "c",
  "l",
  "f",
  "var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pageName,purchaseID,channel,server,pageType,campaign,state,zip,events,products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.split(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(la[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0);return true;}else{return false;}",
);
s.clearVars = new Function("t", "var s=this;s[t]='';");
s.lowercaseVars = new Function(
  "t",
  "var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].indexOf('D=')!=0){s[t]=s[t].toLowerCase();}}",
);
s.join = new Function(
  "v",
  "p",
  "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back:'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0;x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);else str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;",
);
s.p_fo = new Function(
  "n",
  "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=new Object;return 1;}else {return 0;}",
);
s.p_gh = new Function(
  "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot(o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s.ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';",
);
s.apl = new Function(
  "L",
  "v",
  "d",
  "u",
  "var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!m)L=L?L+d+v:v;return L",
);
s.repl = new Function(
  "x",
  "o",
  "n",
  "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x.substring(i+o.length);i=x.indexOf(o,i+l)}return x",
);
s.split = new Function(
  "l",
  "d",
  "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a",
);
s.vpr = new Function(
  "vs",
  "v",
  "if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}",
);
s.trackingServer = "metrics.apple.com";
s.trackingServerSecure = "securemetrics.apple.com";
s.dc = 112;
s.m_Media_c =
  "var m=s.m_i('Media');m.cn=function(n){var m=this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);l=parseInt(l);if(!l)l=1;if(n&&p){if(!m.l)m.l=new Object;if(m.l[n])m.close(n);if(b&&b.id)a=b.id;for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.p=m.cn(p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm.getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;m.l[n]=i}};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o){var m=this,i;i=m.e(n,1,o);i.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.mt=setTimeout(i.m,5000)}}');i.m()};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){var m=this;if (m.trackWhilePlaying) {m.e(n,4,-1)}};m.e=function(n,x,o){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),ti=m.trackSeconds,tp=m.trackMilestones,z=new Array,j,d='--**--',t=1,b,v=m.trackVars,e=m.trackEvents,pe='media',pev3,w=new Object,vo=new Object;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){w.name=n;w.length=i.l;w.playerName=i.p;if(i.to<0)w.event=\"OPEN\";else w.event=(x==1?\"PLAY\":(x==2?\"STOP\":(x==3?\"MONITOR\":\"CLOSE\")));w.openTime=new Date();w.openTime.setTime(i.s*1000);if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {b=\"Media.\"+name;pev3 = m.s.ape(i.n)+d+i.l+d+m.s.ape(i.p)+d;if(x){if(o<0&&i.lt>0){o=(ts-i.lt)+i.lo;o=o<i.l?o:i.l-1}o=Math.floor(o);if(x>=2&&i.lo<o){i.t+=o-i.lo;i.ts+=o-i.lo;}if(x<=2){i.e+=(x==1?'S':'E')+o;i.lx=x;}else if(i.lx!=1)m.e(n,1,o);i.lt=ts;i.lo=o;pev3+=i.t+d+i.s+d+(m.trackWhilePlaying&&i.to>=0?'L'+i.to:'')+i.e+(x!=2?(m.trackWhilePlaying?'L':'E')+o:'');if(m.trackWhilePlaying){b=0;pe='m_o';if(x!=4){w.offset=o;w.percent=((w.offset+1)/w.length)*100;w.percent=w.percent>100?100:Math.floor(w.percent);w.timePlayed=i.t;if(m.monitor)m.monitor(m.s,w)}if(i.to<0)pe='m_s';else if(x==4)pe='m_i';else{t=0;v=e='None';ti=ti?parseInt(ti):0;z=tp?m.s.sp(tp,','):0;if(ti&&i.ts>=ti)t=1;else if(z){if(o<i.to)i.to=o;else{for(j=0;j<z.length;j++){ti=z[j]?parseInt(z[j]):0;if(ti&&((i.to+1)/i.l<ti/100)&&((o+1)/i.l>=ti/100)){t=1;j=z.length}}}}}}}else{m.e(n,2,-1);if(m.trackWhilePlaying){w.offset=i.lo;w.percent=((w.offset+1)/w.length)*100;w.percent=w.percent>100?100:Math.floor(w.percent);w.timePlayed=i.t;if(m.monitor)m.monitor(m.s,w)}m.l[n]=0;if(i.e){pev3+=i.t+d+i.s+d+(m.trackWhilePlaying&&i.to>=0?'L'+i.to:'')+i.e;if(m.trackWhilePlaying){v=e='None';pe='m_o'}else{t=0;m.s.fbr(b)}}else t=0;b=0}if(t){vo.linkTrackVars=v;vo.linkTrackEvents=e;vo.pe=pe;vo.pev3=pev3;m.s.t(vo,b);if(m.trackWhilePlaying){i.ts=0;i.to=o;i.e=''}}}}return i};m.ae=function(n,l,p,x,o,b){if(n&&p){var m=this;if(!m.l||!m.l[n])m.open(n,l,p,b);m.e(n,x,o)}};m.a=function(o,t){var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p='Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8)x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x.type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p==2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTimeScale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,o);m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c);o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetLength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}if(n==3&&(o.'+f7+'>=10||!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd.addEventListener)s.wd.addEventListener('load',m.as,false)";
s.m_i("Media");
var s_code = "",
  s_objectID;
function s_gi(v, n, c) {
  var e =
      "s.version='H.27';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent(x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketingCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._audienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.visitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (!s.marketingCloudVisitorID) {s._waitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (!s.analyticsVisitorID) {s._waitingForAnalyticsVisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (!s.audienceManagerLocationHint) {s._waitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (!s.audienceManagerBlob) {s._waitingForAudienceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)          && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo.callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWhenReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReadyToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();callbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}setVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTrack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if ((!s.supplementalDataID) && (s.visitor) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='supplementalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
    G = window,
    D = G.s_c_il,
    H = navigator,
    u = H.userAgent,
    F = H.appVersion,
    m = F.indexOf("MSIE "),
    E = u.indexOf("Netscape6/"),
    I,
    w,
    x,
    a,
    l;
  if (v) {
    v = v.toLowerCase();
    if (D) {
      for (x = 0; x < 2; x++) {
        for (w = 0; w < D.length; w++) {
          l = D[w];
          a = l._c;
          if (
            (!a || a == "s_c" || (x > 0 && a == "s_l")) &&
            (l.oun == v || (l.fs && l.sa && l.fs(l.oun, v)))
          ) {
            if (l.sa) {
              l.sa(v);
            }
            if (a == "s_c") {
              return l;
            }
          } else {
            l = 0;
          }
        }
      }
    }
  }
  G.s_an = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  G.s_sp = new Function(
    "x",
    "d",
    "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a",
  );
  G.s_jn = new Function(
    "a",
    "d",
    "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x",
  );
  G.s_rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)");
  G.s_d = new Function(
    "x",
    "var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x",
  );
  G.s_fe = new Function(
    "c",
    "return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")",
  );
  G.s_fa = new Function(
    "f",
    "var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a",
  );
  G.s_ft = new Function(
    "c",
    "c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;",
  );
  e = s_d(e);
  if (m > 0) {
    I = parseInt((w = F.substring(m + 5)));
    if (I > 3) {
      I = parseFloat(w);
    }
  } else {
    if (E > 0) {
      I = parseFloat(u.substring(E + 10));
    } else {
      I = parseFloat(F);
    }
  }
  if (I < 5 || F.indexOf("Opera") >= 0 || u.indexOf("Opera") >= 0) {
    e = s_ft(e);
  }
  if (!l) {
    l = new Object();
    if (!G.s_c_in) {
      G.s_c_il = new Array();
      G.s_c_in = 0;
    }
    l._il = G.s_c_il;
    l._in = G.s_c_in;
    l._il[l._in] = l;
    G.s_c_in++;
  }
  l._c = "s_c";
  new Function("s", "un", "pg", "ss", e)(l, v, n, c);
  return l;
}
function s_giqf() {
  var g = window,
    h = g.s_giq,
    l,
    f,
    k;
  if (h) {
    for (l = 0; l < h.length; l++) {
      f = h[l];
      k = s_gi(f.oun);
      k.sa(f.un);
      k.setTagContainer(f.tagContainerName);
    }
  }
  g.s_giq = 0;
}
s_giqf();
