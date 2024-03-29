"use strict";
var DD = {
        generatedId: 1,
        genId: function() { return this.generatedId++ },
        requestConfig: { os: "pc", vid: "pc" },
        extend: function() {
            for (var e = arguments, t = e[0], r = 1; r < e.length; r++)
                if ("object" == typeof e[r]) { var i = DD.clone(e[r]); for (var n in i) "object" == typeof i[n] && "object" == typeof t[n] ? t[n] = DD.merge(t[n], i[n]) : t[n] = i[n] }
            return t
        },
        merge: function(e, t, r) {
            if ("object" != typeof e) throw DD.Error.handle("invoke", "DD.merge", 0, "object");
            if ("object" != typeof t) throw DD.Error.handle("invoke", "DD.merge", 1, "object");
            var o = [];
            return function i(n, e) {
                if (-1 !== o.indexOf(e)) return e;
                o.push(e);
                if (DD.isArray(n) && DD.isArray(e)) e.forEach(function(e, t) { DD.isArray(e) ? n[t] = i([], e) : DD.isObject(e) ? n[t] = i({}, e) : n[t] = e });
                else
                    for (var a in e) DD.isObject(e[a]) ? (DD.isObject(n[a]) || (n[a] = {}), i(n[a], e[a])) : DD.isArray(e[a]) ? (DD.isArray(n[a]) || (n[a] = []), e[a].forEach(function(e, t) {
                        var r;
                        r = DD.isObject(e) ? i({}, e) : DD.isArray(e) ? i([], e) : e, n[a][t] = r
                    })) : void 0 !== e[a] && (n[a] = e[a]);
                return n
            }(e, t), e
        },
        clone: function(r) { var i; return DD.isObject(r) ? (i = {}, DD.getOwnProps(r).forEach(function(e, t) { "$" !== e[0] && (DD.isObject(r[e]) || DD.isArray(r[e]) ? i[e] = DD.clone(r[e]) : i[e] = r[e]) })) : DD.isArray(r) && (i = [], r.forEach(function(e, t) { DD.isObject(e) || DD.isArray(e) ? i[t] = DD.clone(e) : i[t] = e })), i },
        assign: function(t, r) { return Object.assign ? Object.assign(t, r) : DD.getOwnProps(r).forEach(function(e) { t[e] = r[e] }), t },
        getOwnProps: function(e) { return e ? Object.getOwnPropertyNames(e) : [] },
        isFunction: function(e) { return null != e && e.constructor === Function },
        isArray: function(e) { return null != e && e.constructor === Array },
        isObject: function(e) { return null != e && e.constructor === Object },
        isInt: function(e) { return Number.isInteger(e) },
        isNumber: function(e) { return "number" == typeof e },
        isBoolean: function(e) { return "boolean" == typeof e },
        isString: function(e) { return "string" == typeof e },
        isEmpty: function(e) { if (null == e) return !0; var t = typeof e; if (DD.isObject(e)) { var r = Object.keys(e); if (void 0 !== r) return 0 === r.length } else if ("string" === t) return "" === e; return !1 },
        get: function(e, t, r) { return r = r || document, !0 === t ? r.querySelectorAll(e) : r.querySelector(e) },
        append: function(e, t) {
            if (DD.isNode(t)) e.appendChild(t);
            else if (DD.isString(t)) {
                var r = DD.newEl("div");
                r.innerHTML = t, DD.transChildren(r, e)
            }
        },
        isEl: function(e) { return null != e && e.nodeType === Node.ELEMENT_NODE },
        isNode: function(e) { return null != e && (e.nodeType === Node.TEXT_NODE || e.nodeType === Node.ELEMENT_NODE || e.nodeType === Node.DOCUMENT_FRAGMENT_NODE) },
        cloneNode: function(e) { if (!DD.isNode(e)) throw DD.Error.handle("invoke", "DD.cloneNode", 0, "Node"); var t = e.cloneNode(!0); return DD.copyProp(t, e), t },
        copyProp: function(i, n) {
            var a = {};
            if (i && n) {
                var o = ["$model", "$module", "$events"];
                DD.getOwnProps(n).forEach(function(e) {
                    if ("$" === e[0]) {
                        for (var t = !1, r = 0; r < o.length; r++)
                            if (e === o[r]) { t = !0; break }
                        t || (a[e] = n[e])
                    }
                }), DD.merge(i, a), i.$module = n.$module, i.$events = {}, n.$model && (i.$model = {}, DD.getOwnProps(n.$model).forEach(function(e) { i.$model[e] = n.$model[e] })), DD.isEmpty(n.$events) || DD.getOwnProps(n.$events).forEach(function(e) {
                    var t = n.$events[e];
                    if (t instanceof DD.Event) {
                        t.module;
                        t.view = i, delete t.module;
                        var r = DD.merge({}, t);
                        new DD.Event(r)
                    }
                });
                for (var e = 0; e < i.childNodes.length; e++) DD.copyProp(i.childNodes[e], n.childNodes[e])
            }
        },
        getAttrs: function(e, t) {
            if (!DD.isEl(e)) throw DD.Error.handle("invoke", "DD.getAtrs", 0, "element");
            for (var r = [], i = 0; i < e.attributes.length; i++) {
                var n = e.attributes[i];
                t.test(n.name) && r.push(n)
            }
            return r
        },
        getAttrsByValue: function(e, t) {
            if (!DD.isEl(e)) throw DD.Error.handle("invoke", "DD.getAttrsByValue", 0, "element");
            if (!t instanceof RegExp) throw DD.Error.handle("invoke", "DD.getAttrsByValue", 1, "RegExp");
            for (var r = [], i = 0; i < e.attributes.length; i++) {
                var n = e.attributes[i];
                t.test(n.value) && r.push(n)
            }
            return r
        },
        copyAttrs: function(e, t) {
            if (!DD.isEl(e)) throw DD.Error.handle("invoke", "DD.copyAttrs", 0, "element");
            if (!DD.isEl(t)) throw DD.Error.handle("invoke", "DD.copyAttrs", 1, "element");
            for (var r = 0; r < e.attributes.length; r++) {
                var i = e.attributes[r];
                t.setAttribute(i.name, i.value)
            }
        },
        newEl: function(e, t, r) { if (!DD.isString(e) || DD.isEmpty(e)) throw DD.Error.handle("invoke", "DD.newEl", 0, "string"); var i = document.createElement(e); return DD.isObject(t) ? DD.attr(i, t) : DD.isString(r) && (i.innerHTML = r), i },
        newSvgEl: function(e) { return document.createElementNS("http://www.w3.org/2000/svg", e) },
        replaceNode: function(t, e, r) {
            if (!DD.isNode(t)) throw DD.Error.handle("invoke", "DD.replaceNode", 0, "Node");
            if (!DD.isNode(e) && !DD.isArray(e)) throw DD.Error.handle("invoke1", "DD.replaceNode", 1, "Node", "Node Array");
            var i = t.parentNode,
                n = t.nextSibling;
            null !== i && (i.removeChild(t), DD.isArray(e) || (e = [e]), e.forEach(function(e) { null == n ? i.appendChild(e) : i.insertBefore(e, n), !1 !== r && (r = !0), r && t.$isView && DD.copyProp(e, t) }))
        },
        insertAfter: function(e, t, r) {
            var i = this;
            if (!DD.isNode(e)) throw DD.Error.handle("invoke", "DD.insertAfter", 0, "Node");
            if (!DD.isNode(t) && !DD.isNode(r)) throw DD.Error.handle("invoke2", "DD.insertAfter", 1, 2, "Node");
            var n = null;
            n = null == t ? r.firstChild : (r = t.parentNode, t.nextSibling), DD.isNode(r) && (null === n ? DD.isArray(e) ? e.forEach(function(e) { i.isEl(e) && r.appendChild(e) }) : r.appendChild(e) : DD.isArray(e) ? e.forEach(function(e) { i.isEl(e) && r.insertBefore(e, n) }) : r.insertBefore(e, n))
        },
        empty: function(e) { if (!this.isEl(e)) throw DD.Error.handle("invoke", "DD.empty", 0, "Element"); for (var t = e.childNodes, r = t.length - 1; 0 <= r; r--) e.removeChild(t[r]) },
        remove: function(e) {
            if (!this.isNode(e)) throw DD.Error.handle("invoke", "DD.remove", 0, "Node");
            null !== e.parentNode && e.parentNode.removeChild(e)
        },
        copyChildren: function(e) { if (!this.isEl(e)) throw DD.Error.handle("invoke", "DD.copyChildren", 0, "Element"); for (var t = e.childNodes, r = [], i = t.length - 1; 0 <= i; i--) r.push(t[i]); return r },
        transChildren: function(e, t) {
            if (!this.isEl(e)) throw DD.Error.handle("invoke", "DD.copyChildren", 0, "Element");
            if (!this.isEl(t)) throw DD.Error.handle("invoke", "DD.copyChildren", 1, "Element");
            for (var r = document.createDocumentFragment(); 0 < e.childNodes.length;) r.appendChild(e.childNodes[0]);
            t.appendChild(r)
        },
        attr: function(t, r, e) {
            if (!this.isEl(t)) throw DD.Error.handle("invoke", "DD.attr", 0, "Element");
            if (DD.isEmpty(r)) throw DD.Error.handle("invoke", "DD.attr", 1, "string", "object");
            if (null == e) {
                if (DD.isObject(r)) DD.getOwnProps(r).forEach(function(e) { "value" === e ? t[e] = r[e] : t.setAttribute(e, r[e]) });
                else if (DD.isString(r)) return "value" === r ? r.value : t.getAttribute(r)
            } else "value" === r ? t[r] = e : t.setAttribute(r, e)
        },
        css: function(r, i, t) {
            var e;
            if (!this.isEl(r)) throw DD.Error.handle("invoke", "DD.css", 0, "Element");
            if (DD.isEmpty(i)) throw DD.Error.handle("invoke1", "DD.css", 1, "string", "object");
            if (window.getComputedStyle && (e = window.getComputedStyle(r, null)), e)
                if (null == t) {
                    if (!DD.isObject(i)) return e[i];
                    DD.getOwnProps(i).forEach(function(t) { void 0 !== DD.cssconfig && void 0 !== DD.cssconfig[t] ? DD.cssconfig[t].forEach(function(e) { r.style[e] = i[t] }) : r.style[t] = i[t] })
                } else void 0 !== DD.$cssconfig && void 0 !== DD.$cssconfig[i] ? DD.$cssconfig[i].forEach(function(e) { r.style[e] = t }) : r.style[i] = t
        },
        width: function(e, t) {
            if (!DD.isEl(e)) throw DD.Error.handle("invoke", "DD.width", 0, "Element");
            if (!DD.isNumber(t)) { var r; if (window.getComputedStyle && (r = window.getComputedStyle(e, null)), !r) return null; var i = parseInt(r.width); if (!0 === t) i -= parseInt(r.paddingLeft) + parseInt(r.paddingRight); return i }
            e.style.width = t + "px"
        },
        height: function(e, t) {
            if (!DD.isEl(e)) throw DD.Error.handle("invoke", "DD.height", 0, "Element");
            if (!DD.isNumber(t)) { var r; if (window.getComputedStyle && (r = window.getComputedStyle(e, null)), !r) return null; var i = parseInt(r.height); if (!0 === t) i -= parseInt(r.paddingTop) + parseInt(r["paddingBotto,"]); return i }
            e.style.height = t + "px"
        },
        addClass: function(e, t) {
            if (!DD.isEl(e)) throw DD.Error.handle("invoke", "DD.addClass", 0, "Element");
            if (DD.isEmpty(t)) throw DD.Error.handle("invoke", "DD.addClass", 1, "string");
            var r = e.className.trim();
            if (DD.isEmpty(r)) e.className = t;
            else {
                for (var i = r.split(/\s+/), n = 0; n < i.length; n++)
                    if (i[n] === t) return;
                i.push(t), e.className = i.join(" ")
            }
        },
        removeClass: function(e, t) {
            if (!DD.isEl(e)) throw DD.Error.handle("invoke", "DD.removeClass", 0, "Element");
            if (DD.isEmpty(t)) throw DD.Error.handle("invoke", "DD.removeClass", 1, "string");
            var r = e.className.trim();
            if (!DD.isEmpty(r))
                for (var i = r.split(/\s+/), n = 0; n < i.length; n++)
                    if (i[n] === t) return i.splice(n, 1), void(e.className = i.join(" "))
        },
        formatDate: function(e, t) {
            if (DD.isString(e) && null !== new RegExp(/^\d+$/).exec(e)) try { e = parseInt(e) } catch (e) {}
            e = new Date(e);
            if (isNaN(e.getDay())) return "";
            var r = { "M+": e.getMonth() + 1, "d+": e.getDate(), "h+": e.getHours() % 12 == 0 ? 12 : e.getHours() % 12, "H+": e.getHours(), "m+": e.getMinutes(), "s+": e.getSeconds(), "q+": Math.floor((e.getMonth() + 3) / 3), S: e.getMilliseconds() };
            return /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), DD.getOwnProps(r).forEach(function(e) { new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[e] : ("00" + r[e]).substr(("" + r[e]).length))) }), /(E+)/.test(t) && (t = t.replace(RegExp.$1, (1 < RegExp.$1.length ? 2 < RegExp.$1.length ? "/u661f/u671f" : "/u5468" : "") + { 0: "日", 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六" } [e.getDay() + ""])), t
        },
        toDate: function(e) {
            var t;
            try { t = new Date(Date.parse(e)) } catch (e) {}
            if (!t) throw DD.Error.handle("invoke", "DD.toDate", 0, "date string");
            return (isNaN(t) || isNaN(t.getDay())) && (14 === e.length ? (e = e.substr(0, 4) + "/" + e.substr(4, 2) + "/" + e.substr(6, 2) + " " + e.substr(8, 2) + ":" + e.substr(10, 2) + ":" + e.substr(12), t = new Date(Date.parse(e))) : 8 === e.length && (e = e.substr(0, 4) + "/" + e.substr(4, 2) + "/" + e.substr(6, 2), t = new Date(Date.parse(e)))), t
        },
        compileStr: function(e) {
            for (var t, r = new RegExp(/\{.+?\}/), i = arguments; null !== (t = r.exec(e));) {
                var n, a = t[0].substr(1, t[0].length - 2),
                    o = parseInt(a) + 1;
                n = void 0 !== i[o] ? i[o] : "", e = e.replace(r, n)
            }
            return e
        },
        parseJson: function(e) {
            var t = (e = e.trim()).substr(1, e.length - 2).split(","),
                a = {},
                o = new RegExp(/\'/g);
            new RegExp(/\"/g);
            return t.forEach(function(e) {
                var t = e.split(":");
                if ('"' !== t[0] && "'" !== t[0] || '"' !== t[t.length - 1] && "'" !== t[t.length - 1]) {
                    var r = t[0].replace(o, "\\'"),
                        i = t[1],
                        n = i.length;
                    2 < n && ('"' === i[0] && '"' === i[n - 1] || '"' === i[0] && '"' === i[n - 1]) && (i = i.substr(1, n - 2)), a[r] = i
                }
            }), a
        },
        load: function(e, t, r, i) {
            var n = DD.get("head");
            switch (null === n && (n = document.body), e) {
                case "css":
                    if (null !== DD.get("link[href='" + t + "']")) return;
                    var a = DD.newEl("link");
                    a.type = "text/css", a.rel = "stylesheet", a.href = t, n.appendChild(a), DD.isFunction(r) && r();
                    break;
                case "js":
                    if (null !== DD.get("script[dsrc='" + t + "']")) return void(DD.isFunction(r) && r());
                    var o = DD.newEl("script");
                    n.appendChild(o), o.setAttribute("dsrc", t), DD.request({
                        url: t,
                        type: "js",
                        successFunc: function(e) {
                            var t = DD.newEl("script");
                            i && (e = i + "=" + e), t.innerHTML = e, n.appendChild(t), t.innerHTML = "", n.removeChild(t), DD.isFunction(r) && r()
                        }
                    })
            }
        },
        request: function(r) {
            var i = new XMLHttpRequest;
            console.log(r);
            if (r && window.localStorage.getItem(r.url) && r.url.endsWith(".html")) {
                r.successFunc && r.successFunc.call(i, window.localStorage.getItem(r.url));
                return;
            }
            if (DD.isEmpty(r.url)) throw DD.Error.handle("invoke", "DD.request", "config.url", "string");
            if (r.params && !DD.isObject(r.params)) throw DD.Error.handle("invoke", "DD.request", "config.params", "object");
            if (window.MX && 0 !== r.url.indexOf("http://") && 0 !== r.url.indexOf("https://")) MX.invoke("MXFileSystem", "readAssetFile", { fileName: r.url }, function(e) { e = e.result, "json" === r.type && (e = JSON.parse(e)), DD.isFunction(r.successFunc) && r.successFunc(e) });
            else {
                if (-1 !== r.url.indexOf(".action")) {
                    if ("false" == localStorage.getItem("isConnectNetwork")) return void(DD.Router.current && DD.Router.current.module.send("mLoading", { show: !1 }));
                    r.params = r.params || {}, DD.extend(r.params, DD.requestConfig), r.params.$rand = Math.random()
                }
                r.async;
                switch (!0, r.type || "text") {
                    case "html":
                        i.overrideMimeType("text/html;charset=utf-8");
                        break;
                    case "json":
                    case "js":
                        i.overrideMimeType("text/javascript;charset=utf-8");
                        break;
                    case "xml":
                        i.overrideMimeType("text/xml;charset=utf-8");
                        break;
                    default:
                        i.overrideMimeType("text/plain;charset=utf-8")
                }
                "function" == typeof r.successFunc && (i.onload = function(e) {
                    switch (i.status) {
                        case 200:
                            var t = i.responseText;
                            switch (r.type) {
                                case "json":
                                    try { t = JSON.parse(t); } catch (e) { t = { success: !1, result: { errmsg: "未知错误" } } }
                            }
                            void 0 !== t.success && !1 === t.success && Dialog.showErrmsg(t.result.errmsg), r.successFunc.call(i, t), r.url.endsWith(".html") && window.localStorage.setItem(r.url, t);
                            break;
                        default:
                            DD.isFunction(r.errorFunc) && r.errorFunc.call(i, i.status)
                    }
                }), DD.isFunction(r.errorFunc) && (i.onerror = r.errorFunc), DD.isFunction(r.timeoutFunc) && (i.ontimeout = r.timeoutFunc);
                var e = r.reqType || "GET",
                    t = r.url;
                switch (r.timeout = r.timeout || 6e4, e) {
                    case "GET":
                        var n;
                        if (DD.isObject(r.params)) {
                            var a = [];
                            DD.getOwnProps(r.params).forEach(function(e) { a.push(e + "=" + r.params[e]) }), n = a.join("&")
                        }
                        void 0 !== n && (-1 !== t.indexOf("?") ? t += "&" + n : t += "?" + n), i.open(e, t, !0, r.user, r.pwd), i.timeout = r.timeout, i.send(null);
                        break;
                    case "POST":
                        var o = new FormData;
                        for (var s in r.params) o.append(s, r.params[s]);
                        i.open(e, t, !0, r.user, r.pwd), i.timeout = r.timeout, i.send(o)
                }
            }
        }
    },
    flag1, flag2;

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) { if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } }
    return flag;
}
DD.config = { renderTick: 200, appPath: "", deviceType: IsPC() === false ? 1 : 2 },
    function() {
        var n = function(e) {
            var t = this;
            t.events = [], t.view = e.view, t.handler = e.handler, t.eventName = e.eventName, t.delg = e.delg || !1, t.nopopo = e.nopopo || !1, t.once = e.once || !1, t.capture = e.capture || !1, t.view.$events = t.view.$events || {}, "click" === t.eventName && 1 === DD.config.deviceType && (t.eventName = "tap"), t.delg ? t.delegate() : t.bind()
        };
        n.prototype.fire = function(r) {
            var i = this;

            function e() {
                for (var e = 0; e < i.events.length; e++) { var t = i.events[e]; if (t.view.contains(r.target)) { if (t.nopopo && r.stopPropagation(), t.handler.call(i.view.$module.model, r, t.view.$getData().data, t.view), t.once && i.events.splice(e--, 1), t.nopopo) return !1; break } }
                return !0
            }

            function t() { DD.isFunction(i.handler) && (i.nopopo && r.stopPropagation(), i.handler.call(i.view.$module.model, r, i.view.$getData().data, i.view), i.once && delete i.handler) }
            void 0 !== i.view && null === DD.attr(i.view, "disabled") && (i.capture ? (t(), e()) : e() && t(), 0 === i.events.length && void 0 === i.handler && (DD.Event.TouchEvents[i.eventName] ? DD.Event.unregist(i) : i.view.removeEventListener(i.eventName, i.handleEvent)))
        }, n.prototype.bind = function(e) {
            var t = this;
            t.view.$events[t.eventName] || (DD.Event.TouchEvents[t.eventName] ? DD.Event.regist(t) : (t.handleEvent = function(e) { t.fire(e) }, t.view.addEventListener(t.eventName, t.handleEvent)), t.view.$events[t.eventName] = t)
        }, n.prototype.unbind = function() {
            var e = this;
            if (DD.Event.TouchEvents[e.eventName]) DD.Event.unregist(e);
            else if (e.parent) { var t = e.parent.events.indexOf(e); - 1 !== t && e.parent.events.splice(t) } else e.view.removeEventListener(e.eventName, e.handleEvent)
        }, n.prototype.delegate = function(e) {
            var t, r = this,
                i = r.view.parentNode;
            i || (i = document.body), i.$events[r.eventName] ? t = i.$events[r.eventName] : (t = new n({ eventName: r.eventName, view: i })).bind(), -1 === t.events.indexOf(r) && t.events.push(r)
        }, DD.Event = n, DD.Event.TouchEvents = {
            tap: {
                touchstart: function(e, t) {
                    var r = e.touches[0];
                    t.extParams = { pos: { sx: r.pageX, sy: r.pageY, t: Date.now() } }
                },
                touchmove: function(e, t) {
                    var r = t.extParams.pos,
                        i = e.touches[0],
                        n = i.pageX - r.sx,
                        a = i.pageY - r.sy;
                    (5 < Math.abs(n) || 5 < Math.abs(a)) && (r.move = !0)
                },
                touchend: function(e, t) {
                    var r = t.extParams.pos,
                        i = Date.now() - r.t;
                    !0 === r.move || 200 < i || t.fire(e)
                }
            },
            swipe: {
                touchstart: function(e, t) {
                    var r = e.touches[0],
                        i = Date.now();
                    t.extParams = { swipe: { oldTime: [i, i], speedLoc: [{ x: r.pageX, y: r.pageY }, { x: r.pageX, y: r.pageY }], oldLoc: { x: r.pageX, y: r.pageY } } }
                },
                touchmove: function(e, t) {
                    var r = Date.now(),
                        i = e.touches[0],
                        n = t.extParams.swipe;
                    50 < r - n.oldTime && (n.speedLoc[0] = { x: n.speedLoc[1].x, y: n.speedLoc[1].y }, n.speedLoc[1] = { x: i.pageX, y: i.pageY }, n.oldTime[0] = n.oldTime[1], n.oldTime[1] = r), n.oldLoc = { x: i.pageX, y: i.pageY }
                },
                touchend: function(e, t) {
                    var r = t.extParams.swipe,
                        i = Date.now(),
                        n = i - r.oldTime[1] < 30 ? 0 : 1,
                        a = r.oldLoc.x - r.speedLoc[n].x,
                        o = r.oldLoc.y - r.speedLoc[n].y,
                        s = Math.sqrt(a * a + o * o),
                        l = i - r.oldTime[n];
                    if (!(300 < l || s < 10)) {
                        var D = s / l;
                        if (.05 < D) {
                            var d = "";
                            a < 0 && Math.abs(o / a) < 1 && (e.v0 = D, d = "swipeleft"), 0 < a && Math.abs(o / a) < 1 && (e.v0 = D, d = "swiperight"), 0 < o && Math.abs(a / o) < 1 && (e.v0 = D, d = "swipedown"), o < 0 && Math.abs(a / o) < 1 && (e.v0 = D, d = "swipeup"), t.eventName === d && t.fire(e)
                        }
                    }
                }
            }
        }, DD.Event.TouchEvents.swipeleft = DD.Event.TouchEvents.swipe, DD.Event.TouchEvents.swiperight = DD.Event.TouchEvents.swipe, DD.Event.TouchEvents.swipeup = DD.Event.TouchEvents.swipe, DD.Event.TouchEvents.swipedown = DD.Event.TouchEvents.swipe, DD.Event.regist = function(r) {
            var i = DD.Event.TouchEvents[r.eventName];
            DD.isEmpty(r.touchListeners) || DD.Event.unregist(r), r.touchListeners = {}, i && DD.getOwnProps(i).forEach(function(t) { r.touchListeners[t] = function(e) { i[t](e, r) }, r.view.addEventListener(t, r.touchListeners[t]) })
        }, DD.Event.unregist = function(t) { DD.Event.TouchEvents[t.eventName] && DD.getOwnProps(t.touchListeners).forEach(function(e) { t.view.removeEventListener(e, t.touchListeners[e]) }) }
    }(),
    function() {
        DD.Expression = {
            keywords: ["var", "object", "typeof", "function", "undefined", "null"],
            handle: function(r, e, i) {
                var n = this;
                if (DD.isArray(e)) {
                    var a = !1,
                        o = (e.length, "");
                    return e.forEach(function(e) {
                        if ("string" === e.type) o += e.src;
                        else { var t = n.cacExpr(r, e.src, i);!a && t[0] && (a = !0), o += t[1] }
                    }), [a, o]
                }
            },
            initExpr: function(e) {
                for (var t, r = new RegExp(/\{\{.+?\}\}/g), i = [], n = 0; null !== (t = r.exec(e));) {
                    if (t.index > n) {
                        var a = e.substring(n, t.index);
                        DD.isEmpty(a) || i.push({ type: "string", src: a })
                    }
                    i.push({ type: "expr", src: this.initOne(t[0].substring(2, t[0].length - 2)) }), n = t.index + t[0].length
                }
                if (n < e.length) {
                    a = e.substr(n);
                    DD.isEmpty(a) || i.push({ type: "string", src: a })
                }
                if (1 === i.length && 1 === i[0].src[0].length) { var o = i[0].src[0][0].type; if ("string" === o || "number" === o || "bool" === o || "blank" === o) return i[0].src[0][0].src }
                return i
            },
            initOne: function(exprStr) {
                for (var me = this, cacSign = ["(", ")", "!", "|", "*", "/", "+", "-", ">", "<", ">=", "<=", "==", "===", "&&", "||", "%"], regFun = new RegExp(/[\w$][\w$\d\.]*\(.*?\)/), regStr = new RegExp(/(\'.+?\')|(\".+?\")/), funPrev = "$DDfun_rep_", strPrev = "$DDstr_rep_", funArr = [], strArr = [], repIndex = 0, r; null !== (r = regStr.exec(exprStr));) exprStr = exprStr.replace(r[0], strPrev + repIndex++), strArr.push(r[0]);
                for (repIndex = 0; null !== (r = regFun.exec(exprStr));) exprStr = exprStr.replace(r[0], funPrev + repIndex++), funArr.push(r[0]);
                var stacks = genStack(exprStr),
                    stack1 = [];
                return stacks[0].forEach(function(item, ii) {
                    for (var i = 0; i < funArr.length; i++)
                        if (-1 !== item.indexOf(funPrev + i)) {
                            var ind1 = funArr[i].indexOf("("),
                                fn = funArr[i].substr(0, ind1).trim(),
                                pm = getParams(funArr[i]);
                            return void stack1.push({ type: "function", fn: fn, params: pm })
                        }
                    for (var i = 0; i < strArr.length; i++)
                        if (-1 !== item.indexOf(strPrev + i)) return void stack1.push({ type: "string", src: item.replace(strPrev + i, strArr[i]) });
                    "" === item ? stack1.push({ type: "blank", src: item }) : isNaN(item) ? "true" === item || "false" === item ? stack1.push({ type: "bool", src: eval(item) }) : -1 !== me.keywords.indexOf(item.trim()) ? stack1.push({ type: "string", src: item }) : stack1.push({ type: "field", src: item.trim() }) : stack1.push({ type: "number", src: eval(item) })
                }), stacks[0] = stack1, initFilter(), stacks;

                function genStack(e) {
                    for (var t = [], r = [], i = 0, n = 0; n < e.length; n++)
                        for (var a = cacSign.length - 1; 0 <= a; a--) { var o = cacSign[a].length; if (e.substr(n, o) === cacSign[a]) { t.push(e.substr(i, n - i).trim()), r.push(cacSign[a]), i = (n += o - 1) + 1; break } }
                    return i < e.length && t.push(e.substr(i)), [t, r]
                }

                function getParams(e) {
                    var i = [],
                        t = e.substring(e.indexOf("(") + 1, e.lastIndexOf(")"));
                    "" !== t && "" !== (t = t.trim()) && t.split(",").forEach(function(e) {
                        e = e.trim();
                        for (var t = 0; t < strArr.length; t++)
                            if (strPrev + t === e) return void i.push({ type: "string", src: strArr[t] });
                        var r;
                        r = isNaN(e) ? { type: "field", src: e.trim() } : { type: "number", src: e }, i.push(r)
                    });
                    return i
                }

                function initFilter() {
                    for (var e = 0; e < stacks[1].length; e++)
                        if ("|" === stacks[1][e]) {
                            var t = { type: "filter", exprs: [stacks[0][e], stacks[0][e + 1]], signs: [] },
                                r = e,
                                i = stacks[1][e - 1],
                                n = 0;
                            if (")" === i) {
                                n++, t.exprs[0] = stacks[0][e - 1], stacks[0].splice(e);
                                for (var a = e - 2; 0 <= a; a--)
                                    if (")" === stacks[1][a]) n++;
                                    else if ("(" === stacks[1][a] && 0 == --n) { r = a; break }
                                t.signs.unshift(i);
                                for (a = e - 2; r <= a; a--) t.exprs.unshift(stacks[0][a]), t.signs.unshift(stacks[1][a])
                            }
                            stacks[0].splice(r, e - r + 2, t), stacks[1].splice(r, e - r + 1), e = r
                        }
                }
            },
            cacExpr: function(module, stacks, model) {
                for (var expr = "", hasCac = !1, i = 0; i < stacks[1].length; i++)
                    if ("" !== stacks[1][i]) { hasCac = !0; break }
                var isChange = !1;
                if (stacks[0].forEach(function(e, t) {
                        var r = cacOne(e);
                        !isChange && r[0] && (isChange = !0);
                        var i = r[1],
                            n = "";
                        t < stacks[1].length && (n = stacks[1][t]), expr += i + n
                    }), hasCac) try { "" !== expr && (expr = eval(expr)) } catch (e) {}
                return "undefined" === expr && (expr = ""), [isChange, expr];

                function invoke(funObj) {
                    var foo, isSystem = !1;
                    if (-1 === funObj.fn.indexOf(".")) { if (foo = module.methodFactory.get(funObj.fn), void 0 === foo) throw DD.Error.handle("notexist1", DD.words.module + DD.words.method, funObj.fn) } else isSystem = !0, foo = eval(funObj.fn);
                    var pa = [],
                        change = !1;
                    return funObj.params.forEach(function(p) {
                        switch (p.type) {
                            case "field":
                                var v = getValue(module, p.src, model);
                                if (v[0] && (change = !0), v = v[1], null == v) throw DD.Error.handle("notexist1", DD.words.dataItem, p.src);
                                pa.push(v);
                                break;
                            case "number":
                                pa.push(eval(p.src));
                                break;
                            default:
                                pa.push(p.src)
                        }
                    }), isSystem ? [change, foo.apply(null, pa)] : [change, foo.apply(module.model, pa)]
                }

                function filter(filterObj) {
                    for (var exprs = filterObj.exprs, signs = filterObj.signs, src, r = "", change = !1, i = 0; i < exprs.length - 1; i++) {
                        var r1 = cacOne(exprs[i]);
                        r1[0] && (change = !0), r += r1[1], i < signs.length && (r += signs[i])
                    }
                    if (0 < signs.length) try { r = eval(r) } catch (e) {}
                    return [change, DD.Filter.handle(module, r, exprs[i].src)]
                }

                function cacOne(e) {
                    switch (e.type) {
                        case "field":
                            return [(t = getValue(module, e.src, model))[0], r(t[1])];
                        case "function":
                            return [(t = invoke(e))[0], r(t[1])];
                        case "filter":
                            var t;
                            return [(t = filter(e))[0], r(t[1])];
                        default:
                            return [!1, e.src]
                    }

                    function r(e) {
                        if (!hasCac) return e;
                        if (void 0 === e || !0 === e || !1 === e || null === e) return e;
                        if (DD.isString(e)) { var t = e.indexOf("'"); - 1 !== t ? 0 < t && (e = '"' + e + '"') : (0 < (t = e.indexOf('"')) || -1 === t) && (e = "'" + e + "'") }
                        return e
                    }
                }

                function getValue(e, t, r) { var i = r.data; return null == i ? [!1, ""] : DD.isFunction(i.$get) ? i.$get(t) : [!1, ""] }
            }
        }
    }(),
    function() {
        function initmodel(e) {
            if (!e) throw DD.Error.handle("paramException", "x-model");
            if (e = e.trim(), DD.isEmpty(e)) throw DD.Error.handle("paramException", "x-model");
            this.$getDirective("model").value = e
        }

        function initrepeat(e) {
            var t, r, i;
            if (!e) throw DD.Error.handle("paramException", "x-repeat");
            if (e = e.trim(), DD.isEmpty(e)) throw DD.Error.handle("paramException", "x-repeat"); - 1 !== (r = e.indexOf("|")) ? (t = e.substr(0, r).trim(), i = e.substr(r + 1).trim()) : t = e;
            var n = this.$getDirective("repeat");
            n.value = t, n.filter = i, n.done = !1;
            var a = document.createTextNode("");
            DD.replaceNode(this, a), a.$savedDoms.repeat = this, DD.Directive.initViewDirective(a, [{ name: "model", value: t }]), this.$removeDirective("repeat")
        }

        function initif(e) {
            var t = this,
                r = t.nextElementSibling || t.nextSibling,
                i = t.$getDirective("if");
            i.value = DD.Expression.initExpr("{{" + i.value + "}}");
            var n = [t];
            DD.isEl(r) && r.hasAttribute("x-else") ? (i.hasElse = !0, n.push(r)) : i.hasElse = !1;
            var a = document.createTextNode("");
            DD.replaceNode(t, a), t.$removeDirective("if"), a.$savedDoms.if = n
        }

        function initelse(e) { this.$removeDirective("else"), DD.remove(this) }

        function initshow(e) {
            var t = this.$getDirective("show");
            t.value = DD.Expression.initExpr("{{" + t.value + "}}")
        }

        function initclass(value) {
            var view = this,
                d = view.$getDirective("class"),
                obj = eval("(" + value + ")");
            if (DD.isObject(obj)) {
                var robj = {};
                DD.getOwnProps(obj).forEach(function(e) { DD.isString(obj[e]) ? robj[e] = DD.Expression.initExpr("{{" + obj[e] + "}}", view.$module) : robj[e] = obj[e] }), d.value = robj
            }
        }

        function initfield() {
            var e, i, t = this,
                r = t.$getDirective("field").value;
            i = -1 !== (e = r.indexOf("|")) ? r.substr(0, e) : r;
            var n = "input";
            "input" !== t.tagName.toLowerCase() || "checkbox" !== t.type && "radio" !== t.type || (n = "change"), "radio" !== t.type && (t.$attrs.value = DD.Expression.initExpr("{{" + r + "}}", t)), new DD.Event({ view: t, eventName: n, handler: function(e, t, r) { "checkbox" === r.type && (DD.attr(r, "yes-value") === r.value ? r.value = DD.attr(r, "no-value") : r.value = DD.attr(r, "yes-value")), t[i] = r.value } })
        }

        function domodel(e, t) { t || (this.$model.data = null, this.$model = this.$getData()) }

        function dorepeat(e, t) {
            var i = this;
            DD.isEmpty(e) && (e = i.$getDirective("repeat")), t || (t = i.$getData());
            for (var n = [], r = i.nextElementSibling || i.nextSibling; r && r.$fromNode === i;) n.push(r), r = r.nextElementSibling || r.nextSibling;
            if (void 0 !== t.data && DD.isArray(t.data) && 0 !== t.data.length) {
                var a = [];
                a = e.filter ? DD.Filter.handle(i.$module, t.data, e.filter) : t.data;
                var o = i;
                for (s = n.length - 1; s >= a.length; s--) DD.remove(n[s]);
                a.forEach(function(e, t) {
                    var r;
                    t < n.length ? r = n[t] : ((r = DD.cloneNode(i.$savedDoms.repeat)).$fromNode = i, DD.insertAfter(r, o)), e.$index !== t && (e.$set("$index", t), r.$forceRender = !0), (i.$forceRender || r.$forceRender) && r.$setForceRender(!0), r.$model.data = e, o = r
                })
            } else
                for (var s = n.length - 1; 0 <= s; s--) DD.remove(n[s])
        }

        function doif(directive, model) {
            var view = this;
            DD.isEmpty(directive) && (directive = view.$getDirective("if")), model || (model = view.$getData());
            var fr = view.$forceRender || view.$module.forceRender,
                node;
            if (DD.isArray(directive.value)) var re = DD.Expression.handle(view.$module, directive.value, model),
                r = re[1];
            else r = directive.value;
            if (DD.isString(r) && (r = eval(r)), r) {
                if (!0 === directive.yes) return;
                node = view.$savedDoms.if[0]
            } else if (directive.hasElse) {
                if (!1 === directive.yes) return;
                node = view.$savedDoms.if[1]
            }
            if (directive.yes = r, view.nextSibling && view.nextSibling.$fromNode === view && DD.remove(view.nextSibling), void 0 !== node) {
                var n = DD.cloneNode(node);
                DD.insertAfter(n, view), n.$fromNode = view, n.$setForceRender(!0)
            }
        }

        function doclass(e, i) {
            var n = this;
            if (n.nodeType === Node.ELEMENT_NODE) {
                DD.isEmpty(e) && (e = n.$getDirective("class"));
                var a = e.value;
                i || (i = n.$getData());
                var o = n.$forceRender || n.$module.forceRender;
                DD.getOwnProps(a).forEach(function(e) {
                    var t = a[e];
                    if (DD.isArray(a[e])) {
                        var r = DD.Expression.handle(n.$module, a[e], i);
                        if (!r[0] && !o) return;
                        t = r[1]
                    }(t = !(!t || "false" === t)) ? DD.addClass(n, e): DD.removeClass(n, e)
                })
            }
        }

        function doshow(r, i) {
            var n = this;
            DD.isEmpty(r) && (r = n.$getDirective("show")), i || (i = n.$getData());
            var t = function() {
                var e = !0;
                if (DD.isArray(r.value)) {
                    var t = DD.Expression.handle(n.$module, r.value, i);
                    if (!t[0] && !n.$forceRender && !n.$module.forceRender) return !1;
                    e = t[1]
                } else e = r.value;
                e = !(!e || "false" === e);
                if (e) { if (!0 === r.yes) return !1 } else if (!1 === r.yes) return !1;
                return r.yes = e, !0
            }();

            function a() { r.yes ? (DD.css(n, "display", r.display), n.$setForceRender(!0)) : DD.css(n, "display", "none") }
            r.display ? t && a() : setTimeout(function() {
                if (void 0 === r.display) { var e = DD.css(n, "display"); "" !== e && "none" !== e || (e = "inline"), r.display = e }
                t && a()
            }, 0)
        }

        function dofield(e, t) {
            var r = this,
                i = r.type,
                n = r.tagName.toLowerCase();
            if ("radio" === i || "checkbox" === i || "select" === n) {
                t || (t = r.$getData());
                var a = r.$forceRender || r.$module.forceRender,
                    o = t.data.$get(e.value);
                if (o[0] || a) {
                    var s = o[1];
                    if ("radio" === i) {
                        var l = r.value;
                        s == l ? DD.attr(r, "checked", "checked") : r.removeAttribute("checked")
                    } else if ("checkbox" === i) {
                        var D = DD.attr(r, "yes-value");
                        r.value = s + "" == D ? (DD.attr(r, "checked", "checked"), D) : (r.removeAttribute("checked"), DD.attr(r, "no-value"))
                    } else "select" === n && setTimeout(function() { r.value = s }, 0)
                }
            }
        }
        DD.Directive = {
            directives: { model: { preOrder: 1, once: !1, sys: !0, init: initmodel, handler: domodel }, repeat: { preOrder: 2, once: !1, sys: !0, init: initrepeat, handler: dorepeat }, class: { preOrder: 5, once: !1, sys: !0, init: initclass, handler: doclass }, if: { preOrder: 5, once: !1, sys: !0, init: initif, handler: doif }, else: { preOrder: 5, once: !1, sys: !0, init: initelse }, show: { preOrder: 5, sys: !0, init: initshow, handler: doshow }, field: { preOrder: 5, init: initfield, handler: dofield } },
            create: function(e) {
                if (!DD.isObject(e) || DD.isEmpty(e)) throw DD.Error.handle("invoke", "createDirective", 1, "object");
                if (DD.isEmpty(e.name)) throw DD.Error.handle("invoke", "createDirective", "name", "string");
                if (DD.Directive.directives[e.name]) throw DD.Error.handle("exist1", DD.words.directive, e.name);
                if (e.init && !DD.isFunction(e.init)) throw DD.Error.handle("invoke", "createDirective", "init", "function");
                if (e.handler && !DD.isFunction(e.handler)) throw DD.Error.handle("invoke", "createDirective", "handler", "function");
                (void 0 === e.preOrder || e.preOrder < 10) && (e.preOrder = 10), e.once = e.once || !1, this.directives[e.name] = e
            },
            remove: function(e) {
                var t = DD.Directive.directives[name];
                if (t && t.sys) throw DD.Error.handle("notremove1", DD.words.directive, name);
                delete this.directives[e]
            },
            get: function(e) { return this.directives[e] },
            sortDirectives: function(e) {
                var o = this,
                    t = e.$directives;
                1 < t.length && t.sort(function(e, t) {
                    var r = e.name,
                        i = t.name,
                        n = o.directives[r],
                        a = o.directives[i];
                    return n.preOrder - a.preOrder
                })
            },
            initViewDirectives: function(i) {
                var n = this,
                    e = DD.getAttrs(i, /^x-/);
                e.forEach(function(e) { i.removeAttribute(e.name) }), e.forEach(function(e) {
                    var t = e.name.substr(2),
                        r = e.value;
                    i.$directives.push({ name: t, value: r }), void 0 !== n.directives[t] && DD.isFunction(n.directives[t].init) && n.directives[t].init.call(i, r)
                }), n.sortDirectives(i)
            },
            initViewDirective: function(t, e) {
                var r = this;
                e.forEach(function(e) {
                    t.$hasDirective(e.name) || t.$directives.push(e);
                    e.value;
                    void 0 !== r.directives[e.name] && DD.isFunction(r.directives[e.name].init) && r.directives[e.name].init.call(t, e.value)
                }), r.sortDirectives(t)
            },
            handle: function(i, n) {
                var a = this,
                    o = [];
                if (i.$directives.forEach(function(e) {
                        var t = e.name,
                            r = a.directives[t];
                        void 0 !== r && DD.isFunction(r.handler) && (r.handler.call(i, e, n), !0 === r.once && o.push(i.$directives.indexOf(e)))
                    }), 0 < o.length)
                    for (var e = o.length - 1; 0 <= e; e--) i.$directives.splice(o[e], 1)
            }
        }
    }(),
    function() {
        DD.Filter = {
            cantEditFilters: ["date", "currency", "number", "tolowercase", "touppercase", "orderBy", "filter"],
            filters: {
                date: function(e, t) { if (DD.isEmpty(e)) return ""; if (!DD.isArray(t)) throw DD.Error.handle("paramException", DD.words.filter, "date"); var r = t[0]; return r = r.substr(1, r.length - 2), DD.formatDate(e, r) },
                currency: function(e, t) { var r; return DD.isArray(t) && (r = t[0]), isNaN(e) ? "" : ("string" == typeof e && (e = parseFloat(e)), DD.isEmpty(r) && (r = "¥"), r + DD.Filter.filters.number(e, [2])) },
                number: function(e, t) { if (!DD.isArray(t)) throw DD.Error.handle("paramException", DD.words.filter, "number"); var r = t[0] || 0; if (isNaN(e) || r < 0) return ""; "string" == typeof e && (e = parseFloat(e)); for (var i = 1, n = 0; n < r; n++) i *= 10; return (Math.round(e * i) / i).toFixed(r) },
                tolowercase: function(e) { if (DD.isEmpty(e)) return ""; if (!DD.isString(e) || DD.isEmpty(e)) throw DD.Error.handle("invoke1", DD.words.filter + " tolowercase", 0, "string"); return e.toLowerCase() },
                touppercase: function(e) { if (DD.isEmpty(e)) return ""; if (!DD.isString(e) || DD.isEmpty(e)) throw DD.Error.handle("invoke1", DD.words.filter + " touppercase", 0, "string"); return e.toUpperCase() },
                orderBy: function(e, t) {
                    if (!DD.isArray(t)) throw DD.Error.handle("invoke1", DD.words.filter + " orderBy", 0, "array");
                    var r = t[0],
                        i = t[1] || "asc",
                        n = e.concat([]);
                    return n.sort(function(e, t) { return "asc" === i ? e[r] > t[r] : e[r] < t[r] }), n
                },
                select: function(array, pa) {
                    var me = this;
                    if (!DD.isArray(array)) throw DD.Error.handle("invoke1", DD.words.filter + " filter", 0, "array");
                    if (DD.isEmpty(pa)) throw DD.Error.handle("invoke3", DD.words.filter + " filter", 0, "array");
                    var handler = {
                            odd: function(e) { for (var t = [], r = 0; r < e.length; r++) r % 2 == 1 && t.push(e[r]); return t },
                            even: function(e) { for (var t = [], r = 0; r < e.length; r++) r % 2 == 0 && t.push(e[r]); return t },
                            range: function(e, t) { var r, i; if (isNaN(t[0])) throw DD.Error.handle("paramException", DD.words.filter, "filter range"); if (r = parseInt(t[0]), isNaN(t[1])) throw DD.Error.handle("paramException", DD.words.filter, "filter range"); if ((i = parseInt(t[1])) < r) throw DD.Error.handle("paramException", DD.words.filter, "filter range"); return e.slice(r, i + 1) },
                            index: function(t, e) {
                                if (!DD.isArray(t) || !DD.isArray(e)) throw DD.Error.handle("paramException", DD.words.filter, "filter index");
                                var r = [],
                                    i = t.length;
                                return 0 < e.length && e.forEach(function(e) { isNaN(e) || (parseInt(e), 0 <= e && e < i && r.push(t[e])) }), r
                            },
                            func: function(e, t) { if (!DD.isArray(e) || DD.isEmpty(t)) throw DD.Error.handle("paramException", DD.words.filter, "filter func"); var r = me.methodFactory.get(t[0]); return DD.isFunction(r) ? r(e) : e },
                            value: function(arr, param) {
                                if (!DD.isArray(array) || DD.isEmpty(param)) throw DD.Error.handle("paramException", DD.words.filter, "filter value");
                                var ret = [];
                                if ("{" === param[0] && "}" === param[param.length - 1] && (param = eval("(" + param + ")")), DD.isObject(param)) {
                                    var keys = DD.getOwnProps(param);
                                    return arr.filter(function(e) {
                                        for (var t = 0; t < keys.length; t++) {
                                            var r = e[keys[t]],
                                                i = param[keys[t]];
                                            if ("string" == typeof r && -1 !== r.indexOf(i) || r === i) return !0
                                        }
                                        return !1
                                    })
                                }
                                return arr.filter(function(e) { for (var t = DD.getOwnProps(e), r = 0; r < t.length; r++) { var i = e[t[r]]; if (DD.isString(i) && -1 !== i.indexOf(param)) return e } })
                            }
                        },
                        type = pa[0].trim();
                    if (handler.hasOwnProperty(type) || (type = "value"), "range" !== type && "index" !== type && "func" !== type) return "value" === type ? handler[type].call(me, array, pa[0]) : handler[type].call(me, array);
                    if (pa.length < 2) throw DD.Error.handle("paramException", Dd.words.filter);
                    return handler[type].call(me, array, pa.slice(1))
                }
            },
            handle: function(o, s, e) {
                var l = this;
                if (DD.isEmpty(s)) return "";
                if (DD.isEmpty(e)) return s;
                for (var t, D = "$DD_rparam_", r = new RegExp(/(\{.+?\})|(".+?")|('.+?')/g), d = [], i = 0; null !== (t = r.exec(e));) d.push(t[0]), e = e.replace(t[0], D + i++);
                return e.split("|").forEach(function(e) {
                    if (!DD.isEmpty(e.trim())) {
                        for (var t = e.split(":"), r = 0; r < t.length; r++) t[r] = t[r].trim();
                        var i = t[0];
                        if (0 < d.length)
                            for (var n = 1; n < t.length; n++) { r = 0; for (var a = d.length; r < a; r++) t[n] = t[n].trim().replace(D + r, d[r]) }
                        DD.isFunction(l.filters[i]) && (s = l.filters[i].call(o, s, t.slice(1)))
                    }
                }), s
            },
            add: function(e, t) {
                if (-1 !== this.cantEditFilters.indexOf(e)) throw DD.error.handle("notupd", DD.words.system + DD.words.filter, e);
                if (void 0 !== this.filters[e]) throw DD.Error.handle("exist1", DD.words.filter, e);
                this.filters[e] = t
            },
            remove: function(e) {
                if (-1 !== this.cantEditFilters.indexOf(e)) throw DD.Error.handle("notupd", DD.words.system + DD.words.filter, e);
                if (void 0 === this.filters[e]) throw DD.Error.handle("notexist1", DD.words.filter, e);
                delete this.filters[e]
            }
        }
    }(),
    function() {
        var e = function() { this.methods = {} };
        e.prototype = {
            add: function(e, t) {
                if (DD.isEmpty(e)) throw DD.Error.handle("invoke", "DD.MethodFactory.add", 0, "string");
                if (!DD.isFunction(t)) throw DD.Error.handle("invoke", "DD.MethodFactory.add", 0, "function");
                if (DD.isFunction(this.methods[e])) throw DD.Error.handle("exist1", DD.words.method, e);
                this.methods[e] = t
            },
            remove: function(e) {
                if (DD.isEmpty(e)) throw DD.Error.handle("invoke", "DD.MethodFactory.remove", 0, "string");
                if (void 0 === this.methods[e]) throw DD.Error.handle("notexist1", DD.words.method, e);
                delete this.methods[e]
            },
            get: function(e) { return this.methods[e] }
        }, DD.MethodFactory = e
    }(),
    function() {
        var e = function(e) {
                var t = this,
                    r = e.data;
                return t.init = !0, t.module = e.module, DD.isObject(r) ? t.createObjectModel(r) : DD.isArray(r) && t.createArrayModel(r), ((t.data = r).$model = t).change(r), delete t.init, t.module.model = t
            },
            o = {
                $fields: void 0,
                $set: function(t, e) {
                    var r = this;
                    (DD.isObject(e) || DD.isArray(e)) && (e = DD.clone(e));
                    for (var i, n = t.split("."), a = 0; a < n.length - 1; a++)
                        if (i = n[a], !(r = r[i])) throw DD.Error.handle("notexist1", DD.words.dataItem, i);
                    i = n[a], void 0 === r[i] && (r.$model.init = !0, Object.defineProperty(r, t, { set: function(e) { r.$model.setProp(r, t, e) }, get: function() { return r.$model.getProp(r, t) } })), r[i] = e, delete r.$model.init
                },
                $get: function(e) {
                    for (var t, r = this, i = e.split("."), n = 0; n < i.length && r; n++)
                        if (i[n].lastIndexOf("]") === i[n].length - 1) {
                            var a = i[n].split("[");
                            r = r[a[0]], a.shift(), a.forEach(function(e) {
                                var t = e.substr(0, e.length - 1);
                                r = r[parseInt(t)]
                            })
                        } else r.$fields && (t = r.$fields["$old_" + i[n]], r = r[i[n]]);
                    r === this && (r = void 0);
                    var o = !1;
                    return void 0 === t && void 0 !== r || (o = !0), [o, r]
                },
                $isChanged: function(e) {
                    return e ? !!this.$changed || function e(t) {
                        if (DD.isObject(t))
                            for (var r = DD.getOwnProps(t), i = 0; i < r.length; i++) { var n = t[r[i]]; if (DD.isObject(n) || DD.isArray(n)) return !!n.$changed || e(n) } else if (DD.isArray(t))
                                for (var i = 0; i < t.length; i++) { var n = t[i]; if (DD.isObject(n) || DD.isArray(n)) return !!n.$changed || e(n) }
                        return !1
                    }(this) : this.$changed || !1
                },
                $up: function(r) {
                    var e = this.$model.data,
                        s = [];
                    if (function e(t, r) {
                            if ("object" != typeof r || DD.isEmpty(r)) return !1;
                            s.push(r);
                            var i = !1;
                            if (DD.isArray(r)) {
                                for (var n = 0; n < r.length; n++)
                                    if ("object" == typeof r[n]) { if (t === r[n]) return !0; if (i = e(t, r[n])) return !0 }
                            } else
                                for (var a = DD.getOwnProps(r), n = 0; n < a.length; n++)
                                    if (0 !== a[n].indexOf("$")) { var o = r[a[n]]; if ("object" != typeof o) continue; if (o === t) return !0; if (i = e(t, o)) return !0 }
                            i || s.pop();
                            return !1
                        }(this, e), DD.isNumber(r)) { if (s.length > r) return s[s.length - r] } else { var i = -1; if (s.forEach(function(e, t) { e.hasOwnProperty(r) && (i = t) }), -1 != i) return s[i] }
                    return e
                },
                $clone: function(e) { return DD.clone(this) }
            };
        e.prototype.setProp = function(e, t, r) {
            var i = this;
            t && "$" === t.indexOf(0) || (e.$model = i, void 0 === e.$fields && (e.$fields = {}), e.$fields[t] !== r && (DD.isObject(r) ? (i.init = !0, i.createObjectModel(r)) : DD.isArray(r) ? i.createArrayModel(r) : i.init ? e.$fields["$old_" + t] = null : e.$fields["$old_" + t] = e.$fields[t], e.$fields[t] = r, i.change(e)))
        }, e.prototype.getProp = function(e, t) { if (e.$fields) return e.$fields[t] }, e.prototype.change = function(e) { e && (e.$changed = !0, DD.Renderer.add(this.module)) }, e.prototype.clean = function(t) {
            var r = this;
            delete(t = t || r.data).$changed, DD.isObject(t) ? DD.getOwnProps(t).forEach(function(e) { "$" === e[0] || DD.isFunction(t[e]) || (DD.isObject(t[e]) || DD.isArray(t[e]) ? r.clean(t[e]) : t.$fields && delete t.$fields["$old_" + e]) }) : DD.isArray(t) && t.forEach(function(e) { DD.isObject(e) && r.clean(e) })
        }, e.prototype.setDefault = function(t) {
            var r = this;
            t = t || r.data, DD.isObject(t) ? DD.getOwnProps(t).forEach(function(e) { "$" === e[0] || DD.isFunction(t[e]) || (DD.isObject(t[e]) || DD.isArray(t[e]) ? r.setDefault(t[e]) : t.$fields["$old_" + e] = null) }) : DD.isArray(t) && t.forEach(function(e) { DD.isObject(e) && r.setDefault(e) })
        }, e.prototype.createObjectModel = function(r) {
            var i = this;
            DD.assign(r, o), r.$model = i, r.$changed = !0, i.init = !0, DD.getOwnProps(r).forEach(function(t) {
                if ("$" !== t[0] && !DD.isFunction(r[t])) {
                    var e = r[t];
                    Object.defineProperty(r, t, { set: function(e) { i.setProp(r, t, e) }, get: function() { return i.getProp(r, t) } }), r[t] = e
                }
            })
        }, e.prototype.createArrayModel = function(n) {
            var a = this;
            n.$model = a, DD.assign(n, o), n.$changed = !0;
            for (var e = 0; e < n.length; e++) {
                var t = n[e];
                DD.isObject(t) && a.createObjectModel(t), DD.isArray(t) && a.createArrayModel(t)
            } ["push", "unshift", "splice", "pop", "shift", "reverse", "sort"].forEach(function(i) {
                n[i] = function() {
                    Array.prototype[i].apply(n, arguments);
                    var e = [];
                    switch (i) {
                        case "push":
                        case "unshift":
                            e = arguments;
                            break;
                        case "splice":
                            if (2 < arguments.length)
                                for (var t = 2; t < arguments.length; t++) e.push(arguments[t])
                    }
                    for (t = 0; t < e.length; t++) {
                        var r = e[t];
                        DD.isObject(r) && a.createObjectModel(r), DD.isArray(r) && a.createArrayModel(r)
                    }
                    a.change(n)
                }
            })
        }, DD.Model = e
    }(),
    function() {
        var e = function(t) { var r = this; return t.onStart && t.onStart(t), r.name = t.name || "DDModule_" + DD.genId(), r.methodFactory = new DD.MethodFactory, r.modules = [], r.compiled = !1, r.inited = !1, r.onReceive = t.onReceive, r.onInit = t.onInit, r.fromModules = t.fromModules, r.onBeforeFirstRender = t.onBeforeFirstRender, r.onBeforeRender = t.onBeforeRender, r.onRender = t.onRender, r.onFirstRender = t.onFirstRender, r.initConfig = DD.merge({ delayInit: !1 }, t), r.el = r.initConfig.el, DD.isEmpty(t.methods) || DD.getOwnProps(t.methods).forEach(function(e) { r.methodFactory.add(e, t.methods[e]) }), r.initConfig.delayInit || r.init(t), !0 === t.root && (DD.App = r), r };
        e.prototype.init = function(i) {
            var e, t, n = this,
                a = n.initConfig;
            if (n.parent = a.parent, n.virtualDom = DD.newEl("div"), n.parent) {
                if (DD.isString(n.parent)) { var r = n.parent; if (n.parent = DD.Module.get(r), !n.parent) throw DD.Error.handle("notexist1", DD.words.module, r) }
                n.parent.modules.push(n), e = n.parent.rendered ? n.parent.view : n.parent.virtualDom
            } else e = document.body;
            (t = DD.get(a.el, !1, e)) && t.childNodes && DD.transChildren(t, n.virtualDom), n.load(function(e, t) {
                if (!DD.isEmpty(t)) {
                    var r = DD.newEl("div");
                    r.innerHTML = t, DD.transChildren(r, n.virtualDom)
                }
                n.compile(), e = e || {}, new DD.Model({ data: e, module: n }), DD.isArray(a.modules) && a.modules.forEach(function(e) { n.addModule(e) }), DD.isFunction(a.onInit) && a.onInit.call(n.model), DD.isFunction(i) && i(n), delete n.initConfig, DD.Renderer.add(n)
            }), n.inited = !0
        }, e.prototype.load = function(e) {
            var t, r, i = this,
                n = i.initConfig,
                a = 0;

            function o() { DD.isFunction(e) && 0 === a && e(t, r) }

            function s() {
                if (DD.isObject(n.data) ? t = n.data : DD.isEmpty(n.dataUrl) || (i.setData({}), a++, DD.request({ url: n.dataUrl, type: "json", successFunc: function(e) { t = e, 0 == --a && o() } })), DD.isEmpty(n.template)) {
                    if (!DD.isEmpty(n.templateUrl)) {
                        var e = n.templateUrl;
                        DD.config && !DD.isEmpty(DD.config.appPath) && (e = DD.config.appPath + "/" + e), a++, DD.request({ url: e, successFunc: function(e) { r = e, 0 == --a && o() } })
                    }
                } else r = n.template;
                0 === a && o()
            }
            DD.isArray(n.requires) && 0 < n.requires.length ? (n.requires.forEach(function(e, t) {
                var r, i, n = "js";
                switch (DD.isObject(e) ? (i = e.path, n = e.type || n, e.obj && (r = e.obj)) : "string" == typeof e && (i = e), n) {
                    case "css":
                        DD.load("css", i);
                        break;
                    default:
                        a++, DD.load("js", i, function() { 0 == --a && s() }, r)
                }
            }), 0 === a && s()) : s()
        }, e.prototype.compile = function(e) {
            var t, r, i = this;
            i.className && void 0 !== (t = DD.Module.getClass(i.className)) && t.virtualDom ? i.virtualDom = t.virtualDom : (r = DD.Compiler.compile(i.virtualDom, i), t && (t.virtualDom = r)), i.compiled = !0
        }, e.prototype.render = function(e, t) {
            var r = this;
            if (r.compiled && (!r.parent || r.parent.rendered) && (function e(t) { t.view || (t.parent ? (t.parent.view || e(t.parent), t.parent.view && (t.view = DD.get(t.el, !1, t.parent.view))) : t.view = DD.get(t.el, !1, document.body)); return t.view }(r), r.view && (r.view.$isView || (DD.merge(r.view, DD.extendElementConfig), r.view.$isView = !0), !r.needData || r.model))) {
                if (0 === r.view.childNodes.length) {
                    DD.isFunction(r.onBeforeFirstRender) && r.onBeforeFirstRender.call(r.model);
                    var i = DD.cloneNode(r.virtualDom);
                    DD.Renderer.renderView(i, r), DD.transChildren(i, r.view), r.view.$containModule = r, DD.isFunction(r.onFirstRender) && setTimeout(function() { r.onFirstRender.call(r.model) }, 0), r.renderChildren = !0
                } else DD.isFunction(r.onBeforeRender) && r.onBeforeRender.call(r.model), DD.Renderer.renderView(r.view, r), DD.isFunction(r.onRender) && setTimeout(function() { r.onRender.call(r.model) }, 0);
                r.rendered = !0, r.model && r.model.clean(), r.renderChildren && r.modules.forEach(function(e) { e.renderChildren = !0, e.render() }), delete r.renderChildren, delete r.forceRender, DD.Router && setTimeout(function() { DD.Router.setRouteFinish(r), DD.Router.linkLoad() }, 0)
            }
        }, e.prototype.destroy = function() { delete DD.Module.moduleFactory[this.name], DD.Renderer.remove(this) }, e.prototype.addModule = function(e) { if (!DD.isObject(e)) throw DD.Error.handle("invoke1", "addModule", 0, "object"); return e.parent = this, DD.Module.create(e) }, e.prototype.setData = function(t) {
            var r = this;
            (DD.isObject(t) || DD.isArray(t)) && (t = DD.clone(t), r.model && !DD.isEmpty(r.model.data) && DD.getOwnProps(r.model.data).forEach(function(e) { "$" === e[0] && (t[e] = r.model.data[e]) }), new DD.Model({ data: t, module: r }))
        }, e.prototype.broadcast = function(t) {
            var r = this,
                i = r.name,
                e = [];

            function n(e) { e.rendered ? e.onReceive.call(e.model, r.name, t) : setTimeout(n, 20) }
            r.parent && (e.push(r.parent), e = e.concat(r.parent.modules)), (e = e.concat(r.modules)).forEach(function(e) {
                if (e !== r && DD.isFunction(e.onReceive)) {
                    var t = !0;
                    DD.isArray(e.fromModules) && 0 !== e.fromModules.length && -1 === e.fromModules.indexOf(i) && (t = !1), t && n(e)
                }
            })
        }, e.prototype.send = function(e, t) {
            var r = this;
            if (!DD.isString(e)) throw DD.Error.handle("invoke", "send", "moduleName", "string");
            if (void 0 === t) throw DD.Error.handle("invoke", "send", "moduleName", "not null");
            var i = DD.Module.get(e);
            if (!i) throw DD.Error.handle("notexist1", DD.words.module, e);
            DD.isFunction(i.onReceive) && function e() { i.rendered ? i.onReceive.call(i.model, r.name, t) : setTimeout(e, 20) }()
        }, e.prototype.setForceRender = function(t) { this.forceRender = t, this.modules.forEach(function(e) { e.setForceRender(t) }) }, e.prototype.getScroller = function(e) {
            if (this.view) {
                if (!e) return function e(t) { if (t.$hasDirective("scroller")) return t; for (var r = 0; r < t.children.length; r++) { var i = e(t.children[r]); if (i) return i } }(this.view);
                for (var t = this.view.querySelectorAll(e), r = 0; r < t.length; r++)
                    if (t[r].$hasDirective("scroller")) return t[r]
            }
        }, DD.assign(e, {
            classFactory: {},
            moduleFactory: {},
            define: function(e) { var t = e.className; if (!t) throw DD.Error.handle("invoke", "define", "className", "string"); if (this.classFactory[t]) throw DD.Error.handle("exist1", DD.words.moduleClass, t); return this.classFactory[t] = DD.merge({ virtualDom: null }, e), this.classFactory[t] },
            getClass: function(e) { return this.classFactory[e] },
            create: function(e) {
                var t;
                if (e.name && this.get(e.name)) throw DD.Error.handle("exist1", DD.words.module, e.name);
                if (DD.isEmpty(e.className)) t = e;
                else {
                    var r = this.getClass(e.className);
                    void 0 !== r && (t = DD.assign({}, r), t = DD.assign(t, e))
                }
                var i = new DD.Module(t);
                return this.moduleFactory[i.name] = i
            },
            get: function(e) { return this.moduleFactory[e] }
        }), DD.assign(DD, {
            createModule: function(e) {
                if (!DD.isArray(e)) return DD.Module.create(e);
                e.forEach(function(e) { DD.Module.create(e) })
            },
            defineModule: function(e) { return DD.Module.define(e) }
        }), DD.Module = e
    }(), DD.extendElementConfig = {
        $module: null,
        $containModule: null,
        $isRouterView: !1,
        $directives: [],
        $savedDoms: {},
        $model: {},
        $attrs: {},
        $exprs: [],
        $isView: !0,
        $events: {},
        $routeConfig: {},
        $forceRender: !1,
        $hasDirective: function(e) {
            var t = this.$directives;
            if (DD.isArray(t))
                for (var r = 0; r < t.length; r++)
                    if (t[r].name === e) return !0;
            return !1
        },
        $getDirective: function(e) {
            var t = this.$directives;
            if (DD.isArray(t))
                for (var r = 0; r < t.length; r++)
                    if (t[r].name === e) return t[r];
            return null
        },
        $removeDirective: function(e) {
            var t = this.$directives;
            if (DD.isArray(t))
                for (var r = 0; r < t.length; r++)
                    if (t[r].name === e) { t.splice(r); break }
        },
        $getData: function() {
            var e, t = this;
            if (!t.$isView) return null;
            if (t.$containModule) e = t.$containModule.model.data;
            else if (t.$model && t.$model.data) e = t.$model.data, t.$model.index, t.$model.oldIndex;
            else if (t.$module && t.$module.model && t.$module.model.data) {
                for (var r = t; r && r.$isView && r !== t.$module.view; r = r.parentNode)
                    if (r.$model && r.$model.data) { r.$model.index, e = r.$model.data, r.$model.oldIndex; break }
                if (t.$hasDirective("model")) {
                    var i = t.$getDirective("model").value;
                    e ? DD.isObject(e) && (DD.isEmpty(i) || (e = e.$get(i)[1])) : e = t.$module.model.data.$get(i)[1]
                }
                e || t.$hasDirective("model") || (e = t.$module.model.data)
            }
            return { data: e }
        },
        $setForceRender: function(e) {
            if (this.$forceRender = e, this.childNodes)
                for (var t = 0; t < this.childNodes.length; t++) {
                    var r = this.childNodes[t];
                    r.$isView && r.$setForceRender(e)
                }
        }
    }, DD.Renderer = {
        waitList: [],
        add: function(e) {
            if (-1 === this.waitList.indexOf(e)) {
                if (void 0 === e.prio)
                    for (var t = 1, r = e.parent; void 0 !== r;) t++, r = r.parent;
                e.prio = t, this.waitList.push(e), this.waitList.sort(function(e, t) { return e.prio - t.prio })
            }
        },
        remove: function(e) { var t; - 1 !== (t = me.waitList.indexOf(e)) && me.waitList.splice(t, 1) },
        render: function() {
            if (0 !== this.waitList.length)
                for (var e = 0; e < this.waitList.length; e++) {
                    var t = this.waitList[e];
                    this.waitList.splice(e--, 1), t.render()
                }
        },
        renderView: function(e, v, p) {
            ! function e(i, t) {
                if (t || (i.$module = v), !i.$containModule || t) {
                    if (i.$isView) {
                        !i.$rendered && DD.isEl(i) && (h = i, 0 < (f = DD.getAttrs(h, /^e-/)).length && f.forEach(function(e) {
                            var t = e.value.split(":"),
                                r = v.methodFactory.get(t[0]);
                            if (r) {
                                var i = e.name.substr(2),
                                    n = { view: h, eventName: i, handler: r };
                                if (1 < t.length)
                                    for (var a = 1; a < t.length; a++) n[t[a]] = !0;
                                new DD.Event(n), h.removeAttribute(e.name)
                            }
                        })), i.$hasDirective("model") && DD.Directive.directives.model.handler.call(i, null);
                        var n = i.$getData();
                        if (p && (i.$model ? i.$model.data = rendererData : i.$model = { data: rendererData }, i.$setForceRender(!0)), void 0 === n.data || n.data.$isChanged && n.data.$isChanged(!0) || i.$forceRender || v.forceRender) {
                            if (DD.isEl(i)) {
                                var a = [];
                                DD.getOwnProps(i.$attrs).forEach(function(e) { var t = DD.Expression.handle(v, i.$attrs[e], n); if (t[0] || i.$forceRender || v.forceRender) { var r = t[1]; "x-" === e.substr(0, 2) ? a.push({ name: e.substr(2), value: r }) : DD.attr(i, e, r) } }), 0 < a.length && DD.Directive.initViewDirective(i, a)
                            }
                            0 < i.$directives.length && DD.Directive.handle(i, n)
                        } else i.$hasDirective("plugin") && DD.Directive.directives.plugin.handler.call(i);
                        var r = i.$getDirective("show");
                        if ((!r || r.yes) && i.childNodes)
                            for (var o = 0; o < i.childNodes.length; o++)(i.$isView || n.data.$changed) && e(i.childNodes[o]);
                        i.$rendered = !0, delete i.$forceRender
                    } else if (v.model && v.model.data && i.nodeType === Node.TEXT_NODE && i.$exprs) {
                        var n = i.parentNode.$getData();
                        if (n.data && n.data.$isChanged(!0) || i.parentNode.$forceRender || v.forceRender) {
                            var s = DD.Expression.handle(v, i.$exprs, n);
                            if (!s[0] && !i.parentNode.$forceRender && !v.forceRender) return;
                            for (var l = i.nextSibling; l && l.$genNode;) {
                                var D = l.nextSibling;
                                DD.remove(l), l = D
                            }
                            var d = /\<.+?\/?\>/.test(s[1]);
                            if (d) {
                                var c = document.createElement("div");
                                c.innerHTML = s[1], DD.Compiler.compile(c, v);
                                for (var u = document.createDocumentFragment(), o = 0; o < c.childNodes.length;) {
                                    var D = c.childNodes[o];
                                    D.$genNode = !0, u.appendChild(c.childNodes[o])
                                }
                                DD.insertAfter(u, i)
                            } else i.textContent = s[1]
                        }
                    }
                    var h, f;
                    return i
                }
            }(e, !0)
        }
    },
    function e() { DD.Renderer.render(), requestAnimationFrame ? requestAnimationFrame(e) : setTimeout(e, DD.config.renderTick) }(), DD.Compiler = {
        compile: function(e, a) {
            return function e(t) {
                DD.merge(t, DD.extendElementConfig), t.$module = a, DD.getAttrsByValue(t, /\{\{.+?\}\}/).forEach(function(e) { a.needData = !0, t.$attrs[e.name] = DD.Expression.initExpr(e.value, t), t.removeAttribute(e.name) }), DD.Directive.initViewDirectives(t), a && t.$hasDirective("model") && (a.needData = !0);
                for (var r = t.childNodes, i = 0; i < r.length; i++) {
                    var n = r[i];
                    switch (n.nodeType) {
                        case Node.TEXT_NODE:
                            "" !== n.textContent && /\{\{.+\}\}?/.test(n.textContent) && (a && (a.needData = !0), n.$exprs = DD.Expression.initExpr(n.textContent), n.textContent = "");
                            break;
                        case Node.COMMENT_NODE:
                            t.removeChild(n), i--;
                            break;
                        default:
                            e(n)
                    }
                }
                return t
            }(e)
        }
    }, DD.Error = { handle: function(e) { new RegExp(/\{.+?\}/); var t = DD.ErrorMsgs[e]; if (void 0 === t) return "未知错误"; for (var r = [t], i = 1; i < arguments.length; i++) r.push(arguments[i]); return DD.compileStr.apply(DD, r) } },
    function() {
        DD.Router = {
            routes: [],
            links: [],
            root: "",
            currentLinks: [],
            donop: !1,
            loading: !1,
            switching: !1,
            switch: { style: "none", time: .5 },
            currentState: null,
            history: 0,
            histories: [],
            currentPath: void 0,
            addRoute: function(e) { e.parent || this.routes.push(e) },
            removeRoute: function(e) {
                var t;
                (t = e.parent ? e.parent.routes : this.routes).splice(t.indexOf(e), 1)
            },
            setRouteFinish: function(e) { this.current && this.current.module === e && (this.current.loading = !1) },
            linkLoad: function() {
                var e = this;
                e.current && e.current.loading || (0 < e.links.length ? e.links.shift().start() : e.loading = !1)
            },
            find: function(e) { var t = this.getRouteLink(e); return 0 < t.length ? t[t.length - 1] : null },
            getRouteLink: function(e) {
                var c = [];
                return function e(t, r) {
                    if (!DD.isArray(t) || DD.isEmpty(r)) return null;
                    var i;
                    for (var n = 0; n < t.length; n++) {
                        var a = t[n];
                        if (a.path === r) return c.push(a), a;
                        0 === r.indexOf(a.path + "/") && (!i || i.path.length < a.path.length) && (i = a)
                    }
                    if (i) {
                        c.push(i);
                        var o, s = r.substr(i.path.length),
                            l = s.substr(1).split("/");
                        if (DD.isArray(i.routes) && (o = e(i.routes, s)), null !== o) return o;
                        if ("param" === i.type) { for (var D = l.length <= i.paramNames.length ? l.length : i.paramNames.length, d = {}, n = 0; n < D; n++) d[i.paramNames[n]] = l[n]; if (i.newData = d, l.length <= i.paramNames.length) return i; if (l.splice(0, i.paramNames.length), s = "/" + l.join("/"), DD.isArray(i.routes)) return e(i.routes, s) }
                    }
                    return null
                }(this.routes, e), c
            },
            start: function(e, t, r) {
                var i = this;
                if (e = e.trim(), !DD.isEmpty(e)) {
                    if (i.currentPath === e) return !0;
                    !1 !== t && (t = !0), i.links = [];
                    var n = i.getRouteLink(e),
                        a = !1,
                        o = null;
                    if (0 < i.currentLinks.length) {
                        for (var s = -1, l = n.length > i.currentLinks.length ? n.length : i.currentLinks.length, D = (s = l, 0); D < l; D++)
                            if (i.currentLinks[D] !== n[D]) { s = D; break }
                        s === n.length && i.currentLinks.length >= n.length ? s-- : s === i.currentLinks.length && (a = !0), o = n[s], n.splice(0, s);
                        for (D = i.currentLinks.length - 1; s <= D; D--) {
                            var d = i.currentLinks[D];
                            if (!d) break;
                            v(d.module), DD.isFunction(d.onLeave) && d.onLeave(d.module.model), i.currentLinks.pop()
                        }
                        i.currentLinks = i.currentLinks.concat(n)
                    } else i.currentLinks = [].concat(n);
                    if (i.loading || "none" !== i.switch.style && i.switching)
                        if (a) i.links = i.links.concat(n);
                        else if (i.setRouteFinish(i.current.module), o) { var c = i.links.indexOf(o); - 1 !== c && i.links.splice(c + 1, i.links.length), i.links = i.links.concat(n) } else i.links = n;
                    else i.links = n;
                    for (D = 0; D < i.links.length; D++) i.links[D].data = i.links[D].newData, delete i.links[D].newData;
                    if (i.currentPath = e, 0 === i.links.length) throw DD.Error.handle("notexist1", DD.words.route, e);
                    var u, h = i.links[i.links.length - 1].getShowPath();
                    if (h !== i.showPath && !0 !== i.links[0].replace || (r = !0), i.showPath = h, t) {
                        var f = (u = h, DD.Router.root + u);
                        r ? (i.currentState.path = e, history.replaceState(i.currentState, "", f), 0 < i.histories.length && (i.histories[i.histories.length - 1] = e)) : (i.currentState = { path: e, index: i.history++, forward: !0 }, history.pushState(i.currentState, "", f), i.histories.push(e)), i.backward = !1
                    }
                    return i.loading = !0, i.linkLoad(), !0
                }

                function v(e) { null !== e && "object" == typeof e && (e.view = null, DD.isArray(e.modules) && e.modules.forEach(function(e) { v(e) })) }
            },
            go: function(e, t) {
                if (DD.isEmpty(e)) throw DD.Error.handle("DD.Router.back", "path", 0, "string");
                t = t || 0;
                var r = this.histories.indexOf(e);
                if (-1 === r) this.start(e, !0);
                else {
                    var i = r - this.currentState.index;
                    console.log(i), history.go(i), this.jump = !0
                }
            },
            clearHistory: function(t) {
                var r = this,
                    i = [];
                r.histories.length;
                t = t || 0, setTimeout(function() {
                    var e = r.histories.pop();
                    t && 0 < t && r.histories.length > t && (i = r.histories.slice(0, t)), i.push(e), r.histories = i, r.history = i.length, r.currentState = { path: r.histories[r.history - 1], index: r.history, forward: !0 }
                }, 20)
            }
        }, window.addEventListener("popstate", function(e) {
            var t = DD.Router,
                r = history.state;
            if (r) {
                if (r.path != t.histories[t.history - 2]) return history.go(-1), void(t.backward = !0);
                if (r) {
                    t.histories.pop(), t.history--;
                    var i = !(t.currentState && r.index < t.currentState.index);
                    t.backward = !i, t.start(r.path, !1) && (t.currentState = r, t.currentState.fw = i)
                }
            }
        });
        var r = function(e) {
            var t = this;
            if (DD.isEmpty(e) || !DD.isObject(e)) throw DD.Error.handle("invoke", "route", 0, "object");
            if (DD.isEmpty(e.module) && !e.module instanceof DD.module) throw DD.Error.handle("invoke2", "route", "module", DD.words.module, "string");
            if (DD.assign(t, e), t.module = e.module, t.routes = [], t.type = "string", -1 !== t.path.indexOf("/:")) {
                t.type = "param";
                var r = t.path.split("/:");
                t.path = r[0], t.paramNames = r.slice(1)
            }
            t.parent && t.parent.routes.push(t), DD.Router.addRoute(t), e.routes && e.routes.forEach(function(e) { t.add(e) })
        };

        function a(e) {
            if ("activeroute" !== DD.attr(e, "role")) {
                var t, r, i;
                for (r = e.parentNode; !t && r; r = r.parentNode) {
                    for (var n = DD.get("[path]", !0, r), a = 0; a < n.length; a++) { var o = n[a]; if (o !== e && (o && o.$routeConfig.active)) { var s = o.$getData().data; if (s && s[o.$routeConfig.active]) { t = o; break } } }
                    if (r === e.$module.view) break
                }
                if (t)
                    if (t.removeAttribute("role"), i = t.$routeConfig.active) {
                        var l = t.$getData().data;
                        l && l.$set(i, !1)
                    }
                if (i = e.$routeConfig.active) {
                    var D = e.$getData();
                    D.data && D.data.$set(i, !0), DD.attr(e, "role", "activeroute")
                }
            }
        }
        r.prototype.getFullPath = function() {
            for (var e = "", t = this; t; t = t.parent) {
                var r = "";
                t.paramNames && t.paramNames.forEach(function(e) { t.data && void 0 !== t.data[e] && (r += "/" + t.data[e]) }), e = (r = t.path + r) + e
            }
            return e
        }, r.prototype.getShowPath = function() { return this.useParentPath && this.parent ? this.parent.getShowPath() : this.getFullPath() }, r.prototype.start = function() {
            var e, f = this,
                v = DD.Router;
            if ((v.current = f).loading = !0, DD.isString(f.module)) { var t = f.module; if (f.module = DD.Module.get(t), void 0 === f.module) throw DD.Error.handle("notexist1", DD.words.module, t) }
            e = f.parent ? f.parent.module.view : DD.App.view;
            var r = DD.get("[path='" + f.getFullPath() + "']", !1, e);

            function i(e) {
                var t, r, i;
                if (f.module.model || new DD.Model({ data: {}, module: f.module }), window.$route = { path: f.getFullPath(), data: f.data }, f.module.model.data.$set("$route", window.$route), f.module.setForceRender(!0), DD.isFunction(f.onEnter) && f.onEnter(f.module.model), t = f.parent ? f.parent.module.routerView : DD.App.routerView, f.switch && (f.switch.style && (r = f.switch.style), f.switch.time && (i = f.switch.time)), r || v.switch && v.switch.style && (r = v.switch.style), i || v.switch && v.switch.time && (i = v.switch.time), "slide" === r) {
                    t.children;
                    var n, a = DD.width(t, !0),
                        o = DD.css(t, "overflowX");
                    if (0 === t.children.length) D = t;
                    else {
                        n = DD.newEl("div"), DD.css(t, { overflowX: "hidden" }), DD.css(n, { boxSizing: "border-box", width: 2 * a + "px", padding: 0, margin: 0, transition: "transform " + i + "s ease-out", transform: "translate3d(0,0,0)", transformStyle: "preserve-3d", overflowX: "hidden" }), DD.merge(n, DD.extendElementConfig), n.$module = t.$module;
                        var s = new DD.Event({ view: n, eventName: "transitionend", handler: function() { s.unbind(), DD.css(t, "overflowX", o), 1 < n.children.length && (DD.remove(n), DD.transChildren(D, t), f.module.view = t, v.switching = !1, setTimeout(function() { DD.css(n, "transition", "transform " + i + "s ease-out") }, 50)) } }),
                            l = DD.newEl("div"),
                            D = DD.newEl("div");
                        DD.css(l, { width: a + "px", float: "left", overflowX: o }), DD.css(D, { width: a + "px", float: "left", overflowX: o }), v.switching = !0, DD.merge(D, DD.extendElementConfig), DD.transChildren(t, l), n.appendChild(l), t.appendChild(n), !(DD.Router.currentState && !DD.Router.currentState.forward) ? (n.appendChild(D), setTimeout(function() { DD.css(n, "transform", "translate3d(-" + a + "px,0,0)") }, 50)) : (DD.css(n, { transition: "", transform: "translate3d(-" + a + "px,0,0)" }), n.insertBefore(D, l), setTimeout(function() { DD.css(n, { transition: "transform " + i + "s ease-out", transform: "translate3d(0,0,0)" }) }, 50))
                    }
                    f.module.view = D
                } else if ("fade" === r) {
                    v.switching = !0;
                    a = DD.width(t, !0), l = DD.newEl("div"), D = DD.newEl("div");
                    var d = i / 2;
                    if (0 === t.children.length) f.module.view = t;
                    else {
                        DD.transChildren(t, l), t.appendChild(l), t.appendChild(D), DD.merge(D, DD.extendElementConfig), DD.merge(l, DD.extendElementConfig), D.$module = t.$module, l.$module = t.$module;
                        var c = new DD.Event({
                                view: l,
                                eventName: "transitionend",
                                handler: function() {
                                    try { t.removeChild(l) } catch (e) {}
                                    DD.css(D, "opacity", 1), c.unbind()
                                }
                            }),
                            u = new DD.Event({ view: D, eventName: "transitionend", handler: function() { DD.transChildren(D, t), (f.module.view = t).removeChild(D), v.switching = !1, u.unbind() } });
                        DD.css(l, "opacity", 1), DD.css(D, "opacity", 0);
                        var h = { transition: "opacity " + d + "s ease" };
                        DD.css(l, h), DD.css(D, h), f.module.view = D, setTimeout(function() { DD.css(l, "opacity", 0) }, 50)
                    }
                } else {
                    if (!t) throw DD.Error.handle("notexist", DD.words.routeView);
                    f.module.view = t, DD.empty(f.module.view)
                }
                f.module.renderChildren = !0, DD.Renderer.add(f.module)
            }
            r && r.$routeConfig && r.$routeConfig.active && a(r), f.module.inited ? i() : f.module.init(function() { i() })
        }, r.prototype.add = function(e) { e.parent = this; var t = e; return e instanceof DD.Route || (t = new r(e)), t }, DD.Route = r, DD.createRoute = function(e) {
            if (DD.isArray(e)) e.forEach(function(e) { new DD.Route(e) });
            else if (DD.isObject(e)) return new DD.Route(e)
        }, DD.Directive.create({
            name: "route",
            preOrder: 10,
            init: function(e) {
                var i = this;
                e && (e = e.trim(), DD.isEmpty(e) || e && "{{" === e.substr(0, 2) && "}}" === e.substr(e.length - 2, 2) || (DD.attr(i, "path", e), i.$routeConfig = { path: e, active: DD.attr(i, "active") }, i.removeAttribute("active"), new DD.Event({ view: i, eventName: "click", handler: function(e, t, r) { r.$routeConfig && r.$routeConfig.active ? a(r) : DD.Router.start(i.$routeConfig.path) } })))
            },
            handler: function() {
                var e = this,
                    t = e.$routeConfig.path,
                    r = e.$routeConfig.active;
                if (!(0 < DD.Router.links.length)) {
                    var i;
                    if (r) {
                        var n = e.$getData().data;
                        n && !0 === n[r] && (i = !0)
                    }
                    if (i) {
                        if (a(e), DD.Router.current && t === DD.Router.current.getFullPath()) return;
                        setTimeout(function() { 0 === t.indexOf(DD.Router.currentPath) ? DD.Router.start(e.$routeConfig.path, !0, !0) : DD.Router.start(e.$routeConfig.path), DD.Router.start(e.$routeConfig.path) }, 0)
                    }
                }
            }
        }), DD.Directive.create({ name: "router", preOrder: 10, init: function(e) { this.$isRouterView = !0 }, handler: function() { this.$module.routerView = this } })
    }(), DD.Directive.create({
        name: "validity",
        preOrder: 5,
        init: function(e) {
            var t, r, i = this,
                n = e; - 1 !== (t = e.indexOf("|")) && (n = e.substr(0, t), r = e.substr(t + 1)), i.$validity = { fn: n, tips: {}, method: r };
            for (var a = i.children, o = 0; o < a.length; o++) {
                var s = a[o].getAttribute("rel");
                i.$validity.tips[s] = a[o]
            }
            i.$savedDoms.validity = i, DD.empty(i);
            var l = document.createTextNode("");
            DD.replaceNode(i, l)
        },
        handler: function(e) {
            var t = this;
            if (DD.isEmpty(e) && (e = t.$getDirective("validity")), t.$validity && t.$rendered) {
                var r = function(e, t) { for (var r, i = e.parentNode; i; i = i.parentNode) "FORM" === i.tagName && (r = i); return r ? [r.querySelector("[name='" + t + "']"), r] : null }(t, t.$validity.fn);
                if (r) {
                    var i = r[0],
                        n = r[1];
                    if (DD.$validity.form !== n && (DD.$validity.valid = !0, DD.$validity.form = n), t.nextSibling.$fromNode === t && DD.remove(t.nextSibling), null !== i) {
                        var a = [];
                        if (t.$validity.method) {
                            var o = t.$module.methodFactory.get(t.$validity.method);
                            if (DD.isFunction(o)) {
                                var s = o.call(t.$module, i.value);
                                s || a.push("custum")
                            }
                        }
                        var l = i.validity;
                        if (!l.valid)
                            for (var D in l) !0 === l[D] && a.push(D);
                        if (0 < a.length) {
                            DD.$validity.valid = !1;
                            var d = function(e) {
                                    for (var t = 0; t < e.length; t++) switch (e[t]) {
                                        case "valueMissing":
                                            return "required";
                                        case "typeMismatch":
                                            return "type";
                                        case "tooLong":
                                            return "maxLength";
                                        case "tooShort":
                                            return "minLength";
                                        case "rangeUnderflow":
                                            return "min";
                                        case "rangeOverflow":
                                            return "max";
                                        case "patternMismatch":
                                            return "pattern"
                                    }
                                }(a),
                                c = t.$validity.tips,
                                u = t.$savedDoms.validity.cloneNode(!1);
                            if (u.$fromNode = t, DD.isEl(c[d])) u.appendChild(c[d]);
                            else {
                                var h = document.createTextNode(DD.compileStr(DD.FormMsgs[d], DD.attr(i, d)));
                                u.appendChild(h)
                            }
                            DD.insertAfter(u, t)
                        }
                    }
                }
            }
        }
    }), DD.$validity = { valid: !0, form: null, check: function() { return DD.$validity.valid } },
    function() {
        var c = { dir: 0, v0: 0, a: -.004, loc: [0, 0, 0], t0: 0, t1: 0, moving: !1, backFlag: !1, sideHeight: 100, overHeight: 0 },
            d = {},
            u = { draging: !1, loc: [] };

        function s(e, t, r) { i(r, 0) }

        function l(e, t, r) { i(r, 2) }

        function D(e) {}

        function h(e) {}

        function i(e, t) {
            if (w(e)) {
                var r = Math.abs(event.v0),
                    i = c.a,
                    n = Math.abs(r / i),
                    a = r * n - i * n * n / 2 | 0;
                0 === t && (a = -a), c.dir = t, d.y.style.transition = "opacity 5s linear", d.y.style.opacity = "0.5", d.x.style.opacity = "0.5", a = f(e, a), c.backFlag && (n = Math.abs(2 * a / r));
                var o = "transform " + n / 1e3 + "s cubic-bezier(0.333333,0.666667,0.666667,1)";
                DD.css(e, "transition", o), DD.css(d.y, "transition", o), c.t0 = Date.now(), c.t1 = c.t0 + n, c.moving = !0, c.v0 = r;
                for (var s = g(e), l = 0; l < s.length; l++) c.loc[l] = s[l];
                var D = function(e, t, r) {
                    var i = 0;
                    if (0 === c.dir || 2 === c.dir) {
                        var n = e.parentNode.offsetHeight,
                            a = e.offsetHeight,
                            o = n * n / a | 0;
                        DD.height(d.y, o), i = Math.abs(r) * n / a | 0
                    }
                    return [0, i]
                }(e, 0, s[1] + a);
                s[0] = s[0] + "px", s[1] = s[1] + a + "px", s[2] = s[2] + "px", DD.css(e, "transform", "translate3d(" + s.join(",") + ")"), d.y.style.transform = "translate3d(0px," + D[1] + "px,0px)"
            }
        }

        function f(e, t) {
            var r = g(e),
                i = DD.height(e.parentNode),
                n = DD.height(e),
                a = c.sideHeight;
            switch (c.dir) {
                case 0:
                    r[1] + t + n < i && (c.backFlag = !0, 0 != t && t + r[1] + n < i + a && (t = i - a - n - r[1])), c.overHeight = -(t + n + r[1] - i), n < i && (c.overHeight = 0);
                    break;
                case 1:
                    break;
                case 2:
                    0 < r[1] + t && (c.backFlag = !0), r[1] + t > a && 0 != t && (t = a - r[1]), c.overHeight = t - r[1], n < i && (c.overHeight = 0)
            }
            return t
        }

        function v(e) {
            if (c.backFlag) {
                var t = g(e),
                    r = t[0],
                    i = t[1],
                    n = e.parentNode.$events;
                DD.height(e);
                switch (c.dir) {
                    case 0:
                        n.scrolltobottom instanceof DD.Event && n.scrolltobottom.fire(), i = t[1] + c.overHeight;
                        break;
                    case 1:
                        break;
                    case 2:
                        i = 0, n.scrolltotop instanceof DD.Event && n.scrolltotop.fire()
                }
                c.backFlag = !1, DD.css(e, "transition", "transform 0.5s ease-out"), DD.css(e, "transform", "translate3d(" + r + "px," + i + "px,0px)")
            }
        }

        function p(e) { c = { dir: 0, v0: 0, a: .001, loc: [0, 0, 0], t0: 0, t1: 0, moving: !1, backFlag: !1, sideHeight: 100, overHeight: 0 }, d.x.style.opacity = "0", d.y.style.opacity = "0" }

        function g(e) {
            var t, r = e.style.transform;
            if (r) {
                t = [];
                var i = r.substring(r.indexOf("(") + 1, r.indexOf(")") - 1);
                i = i.split(",");
                for (var n = 0; n < i.length; n++) t.push(parseInt(i[n]))
            }
            return t || [0, 0, 0]
        }

        function m(e, t, r) {
            u.draging = !1;
            var i = r.parentNode.$events;
            w(r) && (0 < g(r)[1] && i.topfree && i.topfree instanceof DD.Event && (i.topfree.fire(), c.dir = 2), u.hasMove && (f(r, 0), c.backFlag && v(r)), u.hasMove = !1)
        }

        function w(e) { return !(DD.height(e) < DD.height(e.parentNode) && 0 === c.dir || 1 === c.dir) }
        DD.Directive.create({
            name: "scroller",
            proOrder: 1,
            init: function(e) {
                var t, r, i = this,
                    n = DD.newEl("div"),
                    a = DD.newEl("div"),
                    o = DD.newEl("div");
                DD.attr(a, "role", "scrollbar"), DD.attr(o, "role", "scrollbar"), DD.assign(i, {
                    $scrollTo: function(e, t) {
                        var r = this.children[0],
                            i = { transition: "" },
                            n = .5,
                            a = g(r),
                            o = 0,
                            s = 0,
                            l = DD.width(r),
                            D = DD.height(r),
                            d = DD.width(this),
                            c = DD.height(this);
                        if (DD.isString(t)) switch (t) {
                            case "top":
                                n = Math.abs(a[1]) / 1e3;
                                break;
                            case "bottom":
                                n = (o = c - D) / 1e3;
                                break;
                            case "left":
                            case "right":
                                break;
                            default:
                                var u = r.querySelector(t);
                                if (!u) return;
                                o = a[1] + Math.abs(a[1]) - u.offsetTop, s = a[0] + Math.abs(a[0]) - u.offsetLeft
                        }
                        e && (2 < n && (n = 2), i.transition = "transform " + n + "s ease-out"), c < D ? o < c - D && (o = c - D) : o = 0, d < l ? s < d - l && (s = d - l) : s = 0, i.transform = "translate3d(" + s + "px," + o + "px,0)", DD.css(r, i)
                    },
                    $getLoc: function() { return g(this.children[0]) },
                    $reLoc: function() {
                        var e = this.children[0];
                        setTimeout(function() { f(e, 0), v(e) }, 50)
                    }
                }), DD.transChildren(i, n), i.appendChild(n), i.appendChild(a), i.appendChild(o);
                new DD.Event({ view: n, eventName: "transitionend", handler: function(e, t, r) { v(r), p(r) } }), new DD.Event({
                    view: n,
                    eventName: "touchstart",
                    handler: function(e, t, r) {
                        var i;
                        ! function(e, t, r) {
                            if (!c.moving) return;
                            DD.css(r, "transition", "");
                            var i = Date.now(),
                                n = DD.height(r),
                                a = DD.height(r.parentNode);
                            if (i < c.t1) {
                                i -= c.t0;
                                g(r);
                                var o = c.v0 * i - c.a * i * i / 2 | 0,
                                    s = c.loc,
                                    l = s[0],
                                    D = s[1],
                                    d = s[2];
                                switch (c.dir) {
                                    case 0:
                                        (D -= o) < a - n && (D = a - n);
                                        break;
                                    case 1:
                                        break;
                                    case 2:
                                        0 < (D += o) && (D = 0)
                                }
                                DD.css(r, "transform", "translate3d(" + l + "px," + D + "px," + d + "px)")
                            }
                            p(r)
                        }(0, 0, r), i = e, u.draging = !0, u.loc = [i.touches[0].clientX, i.touches[0].clientY]
                    }
                }), new DD.Event({
                    view: n,
                    eventName: "touchmove",
                    handler: function(e, t, r) {
                        e.preventDefault(),
                            function(e, t, r) {
                                if (!u.draging) return;
                                var i = r.parentNode.$events,
                                    n = DD.height(r.parentNode),
                                    a = DD.height(r),
                                    o = e.touches[0],
                                    s = o.clientX - u.loc[0],
                                    l = o.clientY - u.loc[1],
                                    D = g(r),
                                    d = (D[0], D[1]);
                                0 < g(r)[1] && i.topdrag && i.topdrag instanceof DD.Event && i.topdrag.fire();
                                switch (c.dir = 0 < l ? 2 : 0, c.dir) {
                                    case 0:
                                        d + l + a > n - c.sideHeight && (d += l);
                                        break;
                                    case 1:
                                        s;
                                        break;
                                    case 2:
                                        d + l < c.sideHeight && (d += l);
                                        break;
                                    default:
                                        s
                                }
                                DD.css(r, { transition: "", transform: "translate3d(" + D[0] + "px," + d + "px,0px)" }), u.loc = [o.clientX, o.clientY], u.hasMove = !0
                            }(e, 0, r)
                    }
                }), new DD.Event({ view: n, eventName: "touchend", handler: function(e, t, r) { m(e, t, r) } }), new DD.Event({ view: n, eventName: "moveout", handler: function(e, t, r) { m(e, t, r) } }), "horizontal" === e ? (t = { "overflow-x": "hidden" }, r = { "overflow-x": "auto", "overflow-y": "inherit" }, new DD.Event({ view: n, eventName: "swipeleft", handler: D }), new DD.Event({ view: n, eventName: "swiperight", handler: h })) : "verticle" === e ? (t = { "overflow-y": "hidden" }, r = { "overflow-y": "visible", "overflow-x": "inherit" }, new DD.Event({ view: n, eventName: "swipeup", handler: s }), new DD.Event({ view: n, eventName: "swipedown", handler: l })) : (t = { overflow: "hidden" }, r = { overflow: "auto" }), DD.css(i, t), DD.css(n, r), DD.css(o, { width: "0.3rem", opacity: 0, display: "block", borderRadius: "1px", background: "#333", zIndex: 10, position: "absolute", right: "1px", transition: "opacity 5s linear", top: 0 })
            },
            handler: function() {
                if (!d.y) {
                    var e = DD.get("[role='scrollbar']", !0, this);
                    d.x = e[0], d.y = e[1]
                }
            }
        })
    }(), DD.Directive.create({
        name: "plugin",
        proOrder: 10,
        init: function(e) {
            var t = DD.Plugin.plugins[e];
            if (!DD.isFunction(t)) throw DD.Error.handle("notexist1", DD.words.plugin, e);
            this.$plugin = new t(this), this.$plugin.init(this)
        },
        handler: function() {
            var e = this,
                t = e.$getData();
            (e.$forceRender || e.$module.forceRender || t && t.data && t.data.$isChanged(!0)) && e.$plugin.render(e)
        }
    }), DD.Plugin = {
        plugins: {},
        all: 0,
        create: function(e, t) {
            if (this.plugins[e]) throw DD.Error.handle("exist1", DD.words.plugin, e);
            this.plugins[e] = t, this.all += 1
        },
        remove: function(e) { delete this.plugins[e] }
    }, DD.words = { system: "系统", module: "模块", moduleClass: "模块类", model: "模型", directive: "指令", expression: "表达式", event: "事件", method: "方法", filter: "过滤器", data: "数据", dataItem: "数据项", route: "路由", routeView: "路由容器", plugin: "插件" }, DD.ErrorMsgs = { unknown: "未知错误", paramException: "{0} {1}方法参数错误，请参考api", invoke: "{0}方法调用参数{1}必须为{2}", invoke1: "{0}方法调用参数{1}必须为{2}或{3}", invoke2: "{0}方法调用参数{1}或{2}必须为{3}", invoke3: "{0}方法调用参数{1}不能为空", exist: "{0}已存在", exist1: "{0} {1}已存在", notexist: "{0}不存在", notexist1: "{0} {1}不存在", notupd: "{0}不可修改", notremove: "{0}不可删除", notremove1: "{0}{1}不可删除" }, DD.FormMsgs = { type: "请输入有效的{0}", unknown: "输入错误", required: "不能为空", min: "最小输入值为{0}", max: "最大输入值为{0}" },
    function() {
        var LEGENDWORDLEN = 12,
            WORDLEN = 10,
            TITLEWORDLEN = 18,
            TITLEHEIGHT = 30,
            SPACELEN = 30,
            DrawArea = { left: 0, top: 0 },
            DEFAULTS = { type: "line", dataName: void 0, width: 400, symbolSize: 10, radarName: void 0, height: 600, bgColor: "#fff", margins: [40, 40, 20, 20], category: ["number", "number"], title: void 0, xTitle: void 0, yTitle: void 0, legend: void 0, titleColor: "#000", colors: void 0, fixedCnt: [0, 0], marker: !1, showPercent: !1, showText: !1, gridLine: 0, gridLineColor: "#ccc" };

        function Chart() {}

        function getColor(e, t) {
            var r, i, n, a = [
                [179, 33, 38],
                [36, 53, 66],
                [80, 142, 150],
                [200, 109, 82],
                [129, 188, 158]
            ];
            if (e.colors && e.colors.length > t) return e.colors[t];
            if (t < 5) { r = (o = a[t])[0], i = o[1], n = o[2] } else {
                var o, s = t / 5 | 0;
                255 < (r = (o = a[t % 5])[0] + 30 * s) && (r %= 255), 255 < (i = o[1] + 30 * s) && (i %= 255), 255 < (n = o[2] + 30 * s) && (n = i % 255)
            }
            return "rgb(" + r + "," + i + "," + n + ")"
        }

        function getConfig(el, obj) {
            var arrs = ["margins", "colors", "fixedCnt", "category"],
                numbers = ["margins", "width", "height", "gridLine", "fixedCnt"],
                obj1 = {};
            return DD.getOwnProps(obj).forEach(function(pn) {
                var attr = DD.attr(el, pn.toLowerCase());
                if (attr) {
                    if (!attr) return;
                    var pv = attr.trim(),
                        isArr = !1;
                    if (-1 !== arrs.indexOf(pn) && (pv = pv.split(","), isArr = !0), -1 !== numbers.indexOf(pn))
                        if (isArr) pv.forEach(function(v, i) { try { pv[i] = eval(v) } catch (e) {} });
                        else try { pv = eval(pv) } catch (e) {}
                    "true" !== pv && "false" !== pv || (pv = eval(pv)), obj1[pn] = pv
                }
            }), obj1
        }

        function initDefs(e, t) {
            var r = DD.newSvgEl("defs");
            e.appendChild(r);
            var i = DD.newSvgEl("marker");
            DD.attr(i, { id: "$chart_arrow", viewBox: "0 0 10 10", refX: 1, refY: 5, markerWidth: 6, markerHeight: 6, orient: "auto" });
            var n = DD.newSvgEl("path");
            if (DD.attr(n, { d: "M 0 0 L 10 5 L 0 10 z" }), i.appendChild(n), r.appendChild(i), t) {
                var a = DD.newSvgEl("marker");
                DD.attr(a, { id: "$chart_circle", refX: 3, refY: 3, markerWidth: 8, markerHeight: 8, orient: "auto" });
                var o = DD.newSvgEl("circle");
                DD.attr(o, { cx: 3, cy: 3, r: 1.5 }), a.appendChild(o), r.appendChild(a);
                var s = DD.newSvgEl("marker");
                DD.attr(s, { id: "$chart_tri", viewBox: [0, 0, 20, 20], refX: 5, refY: 6, markerWidth: 9, markerHeight: 9, orient: "auto" });
                o = DD.newSvgEl("polygon");
                DD.attr(o, { points: "0,10 5,3 10,10" }), s.appendChild(o), r.appendChild(s);
                var l = DD.newSvgEl("marker");
                DD.attr(l, { id: "$chart_rect", refX: 2, refY: 2, markerWidth: 5, markerHeight: 5, orient: "auto" });
                var D = DD.newSvgEl("rect");
                DD.attr(D, { x: 0, y: 0, width: 3, height: 3 }), l.appendChild(D), r.appendChild(l);
                var d = DD.newSvgEl("marker");
                DD.attr(d, { id: "$chart_cross", viewBox: [0, 0, 10, 10], refX: 3, refY: 3, markerWidth: 6, markerHeight: 6, orient: "auto", stroke: "black" });
                var c = DD.newSvgEl("path");
                DD.attr(c, { d: "M0 0 L6 6 M0 6 L6 0 Z", "stroke-width": 2, fill: "none" }), d.appendChild(c), r.appendChild(d);
                var u = DD.newSvgEl("marker");
                DD.attr(u, { id: "$chart_star", viewBox: [0, 0, 35, 35], refX: 7, refY: 7, markerWidth: 15, markerHeight: 15, orient: "auto", stroke: "black" });
                c = DD.newSvgEl("path");
                DD.attr(c, { d: "m0.75,5.385069l4.20154,0l1.29846,-4.201666l1.29846,4.201666l4.20154,0l-3.399233,2.596676l1.298462,4.201661l-3.399229,-2.596801l-3.399227,2.596801l1.29846,-4.201661l-3.399233,-2.596676l0,0z", "stroke-width": 1 }), u.appendChild(c), r.appendChild(u);
                var h = [];
                return h.push({ id: "$chart_circle", m: a }), h.push({ id: "$chart_tri", m: s }), h.push({ id: "$chart_rect", m: l }), h.push({ id: "$chart_star", m: u }), h.push({ id: "$chart_cross", m: d }), h
            }
        }
        Chart.prototype.init = function(e) {
            var t = this;
            t.view = e, t.svg = DD.newSvgEl("svg"), e.appendChild(t.svg), DD.attr(t.svg, { width: "100%", height: "100%" }), DD.css(t.svg, { fontSize: 12, background: t.bgColor })
        }, Chart.prototype.render = function(e) {
            var t = this,
                r = getConfig(e, DEFAULTS);
            if (!r.width || !r.height) {
                var i = DD.width(e);
                if (!i) return void setTimeout(function() { t.render(e) }, 50);
                r.width = i, r.height = DD.height(e)
            }
            DD.extend(t, DEFAULTS, r), t.view = e, t.svg = t.view.children[0], DD.attr(t.svg, { width: t.width, height: t.height }), DD.empty(t.svg);
            var n = e.$getData();
            if (t.data = n.data, t.dataName && (t.data = t.data[t.dataName]), t.data) switch (DrawArea = { top: t.margins[0], left: t.margins[3], width: t.width - t.margins[1] - t.margins[3], height: t.height - t.margins[0] - t.margins[2] }, t.type) {
                case "line":
                    t.drawLine();
                    break;
                case "histogram":
                    t.drawHistogram();
                    break;
                case "pie":
                    t.drawPie();
                    break;
                case "scatter":
                    t.drawScatter();
                    break;
                case "radar":
                    t.drawRadar()
            }
        }, Chart.prototype.initData = function() {
            for (var e, t, r, i, n = this, a = [], o = [], s = 0; s < n.data.length; s++) {
                var l = n.data[s];
                l.datas.sort(function(e, t) { return e.x - t.x }), l.title || (l.title = "数据" + s);
                for (var D = 0; D < l.datas.length; D++) { var d = l.datas[D]; "number" === n.category[0] ? ((!e || d.x < e) && (e = d.x), (!t || d.x > t) && (t = d.x)) : -1 === a.indexOf(d.x) && a.push(d.x), "number" === n.category[1] ? ((!r || d.y < r) && (r = d.y), (!i || d.y > i) && (i = d.y)) : (d.y += "", -1 === o.indexOf(d.y) && o.push(d.y)) }
            }
            0 < a.length && a.sort(), 0 < o.length && o.sort(), n.dataArea = { minx: e, maxx: t, miny: r, maxy: i, xValues: a, yValues: o }
        }, Chart.prototype.drawTitle = function() {
            var e = this;
            if (e.title) {
                var t = e.title,
                    r = t.length * TITLEWORDLEN,
                    i = (DrawArea.width - r) / 2,
                    n = e.margins[0],
                    a = DD.newSvgEl("text");
                a.innerHTML = t, DD.attr(a, { transform: "translate(" + i + "," + n + ")", fill: e.titleColor, "font-size": 18, textLength: r }), e.svg.appendChild(a), DrawArea.top += TITLEHEIGHT, DrawArea.height -= TITLEHEIGHT
            }
        }, Chart.prototype.drawLegend = function() {
            var e = this;
            if ("top" === e.legend || "bottom" === e.legend || "right" === e.legend) {
                for (var t = 0, r = 0; r < e.data.length; r++) e.data[r].title.length > t && (t = e.data[r].title.length);
                var i, n, a, o, s = 50 + t * WORDLEN,
                    l = e.data.length,
                    D = DrawArea.width;
                switch (e.legend) {
                    case "top":
                        if (n = DrawArea.top, D < l * s) a = D, i = DrawArea.left, o = 40 * Math.ceil(l * s / D);
                        else a = l * s, o = 40, i = (DrawArea.width - a) / 2 + DrawArea.left;
                        DrawArea.top += o, DrawArea.height -= o;
                        break;
                    case "right":
                        a = s - 25, o = 40 * l, n = DrawArea.top, i = DrawArea.left + DrawArea.width - a, DrawArea.width -= a;
                        break;
                    case "bottom":
                        if (D < l * s) a = D, i = DrawArea.left, o = 40 * Math.ceil(l * s / D);
                        else a = l * s, o = 40, i = (DrawArea.width - a) / 2 + DrawArea.left;
                        n = DrawArea.top + DrawArea.height - o, DrawArea.height -= o
                }
                var d = DD.newSvgEl("g");
                DD.attr(d, { transform: "translate(" + i + "," + n + ")" });
                var c = 0,
                    u = 10;
                for (r = 0; r < e.data.length; r++) {
                    var h = getColor(e, r),
                        f = DD.newSvgEl("rect");
                    DD.attr(f, { x: c, y: u, rx: 5, ry: 5, fill: h, width: 30, height: 15 }), d.appendChild(f);
                    var v = e.data[r].title,
                        p = DD.newSvgEl("text");
                    p.innerHTML = v, DD.attr(p, { x: c + 35, y: u + 12, fill: h }), DD.css(p, "fontSize", 14), d.appendChild(p), c + 2 * s <= a ? c += s : (c = 0, u += 40)
                }
                e.svg.appendChild(d)
            }
        }, Chart.prototype.drawAxes = function(p) {
            var g = this,
                m = "number" === g.category[1] ? (g.dataArea.maxy + "").length : g.dataArea.yValues[0].length;
            m = m * WORDLEN + 20;
            var e = (g.yTitle ? 10 : 0) + m;
            DrawArea.top += SPACELEN, DrawArea.height -= SPACELEN + (g.xTitle ? 25 : 0) + 30, DrawArea.width -= e + SPACELEN + 5, DrawArea.left += e;
            var t = DrawArea.width,
                r = DrawArea.height,
                i = "number" === g.category[0] ? s(g.dataArea.minx, g.dataArea.maxx) : g.dataArea.xValues,
                n = "number" === g.category[1] ? s(g.dataArea.miny, g.dataArea.maxy) : g.dataArea.yValues,
                a = i.length,
                o = n.length;
            0 === i[0] && a--, 0 === n[0] && o--, g.scaleValues = { x: { values: i, px: t / a }, y: { values: n, px: r / o } };
            var w = DD.newSvgEl("g");

            function s(e, t) {
                var r = 1,
                    i = 1,
                    n = t - e;
                if (100 < n)
                    for (; 100 < n;) n /= 10, r *= 10;
                n < 10 && (n *= 10, r /= 10);
                var a = 1;
                for (20 <= n && (n /= 5, a = 5); 7 < n; n /= 2, i *= 2);
                var o, s = a * i * r,
                    l = [],
                    D = Math.ceil((t - e) / s);
                0 === e ? (o = 1, D--) : e < 0 ? (o = Math.floor(e / s), t % s && (D += 1)) : o = Math.floor(e / s);
                var d = o;
                for (D = D + o; d <= D; d++) l.push(s * d);
                return l
            }
            DD.attr(w, { transform: "translate(" + DrawArea.left + "," + DrawArea.top + ")" }), g.svg.appendChild(w),
                function() {
                    for (var e = "", t = 0, r = DrawArea.height, i = g.scaleValues.x.values, n = g.scaleValues.x.px, a = 0 === i[0] ? i.length - 1 : i.length, o = 0; o <= a; o++, t += n) {
                        if (t % 1 && (t = parseFloat(t.toFixed(g.fixedCnt))), e += t + "," + r + " ", 0 < o && (e += t + "," + (r - 5) + " " + t + "," + r + " ", 2 === g.gridLine || 3 === g.gridLine)) {
                            var s = DD.newSvgEl("path");
                            DD.attr(s, { d: "M" + t + " " + r + " V 0", stroke: g.gridLineColor, "stroke-width": 1 }), w.appendChild(s)
                        }
                        if (0 < o) {
                            var l, D = DD.newSvgEl("text"),
                                d = (i[o - 1] + "").length * WORDLEN;
                            l = 1 === p && "string" === g.category[0] ? (n - d) / 2 + (o - 1) * n : t - d / 2, DD.attr(D, { x: l, y: r + 20 }), DD.css(D, { fill: g.titleColor, strokeWidth: 0 });
                            var c = 0 === i[0] ? o : o - 1;
                            D.innerHTML = i[c], w.appendChild(D)
                        }
                    }
                    if (e += t - n + SPACELEN + "," + r, g.xTitle) {
                        var u = DD.newSvgEl("text");
                        u.innerHTML = g.xTitle, w.appendChild(u), DD.attr(u, { x: (DrawArea.width - 12 * g.xTitle.length) / 2, y: r + 50 }), DD.css(u, { fill: g.titleColor, fontSize: 14 })
                    }
                    var h = DD.newSvgEl("polyline");
                    DD.attr(h, { points: e, stroke: g.titleColor, "stroke-width": 1, "marker-end": "url(#$chart_arrow)" }), w.appendChild(h), t = 0, r = DrawArea.height, i = g.scaleValues.y.values, n = g.scaleValues.y.px, e = "";
                    for (var a = 0 === i[0] ? i.length - 1 : i.length, o = 0; o <= a; o++, r -= n) {
                        if (r % 1 && (r = parseFloat(r.toFixed(g.fixedCnt[0]))), e += t + "," + r + " ", 0 < o && (e += t + 5 + "," + r + " " + t + "," + r + " ", 1 === g.gridLine || 3 === g.gridLine)) {
                            var s = DD.newSvgEl("path");
                            DD.attr(s, { d: "M" + t + " " + r + " H " + DrawArea.width, stroke: g.gridLineColor, "stroke-width": 1 }), w.appendChild(s)
                        }
                        if (0 < o) {
                            var D = DD.newSvgEl("text");
                            DD.attr(D, { x: t - (i[o - 1] + "").length * WORDLEN - 10, y: r + 4 }), DD.css(D, { fill: g.titleColor, strokeWidth: 0 });
                            var c = 0 === i[0] ? o : o - 1;
                            D.innerHTML = i[c], w.appendChild(D)
                        }
                    }
                    if (e += t + "," + (r + n - SPACELEN), g.yTitle) {
                        var u = DD.newSvgEl("text");
                        u.innerHTML = g.yTitle;
                        var f = 12 * g.yTitle.length,
                            v = (DrawArea.height - f) / 2 - 20;
                        DD.attr(u, { transform: "rotate(90) translate(" + v + "," + (m + 15) + ")", textLength: f }), DD.css(u, { fill: g.titleColor, fontSize: 14 }), w.appendChild(u)
                    }
                    h = DD.newSvgEl("polyline"), DD.attr(h, { points: e, stroke: g.titleColor, "stroke-width": 1, "marker-end": "url(#$chart_arrow)" }), w.appendChild(h)
                }()
        }, Chart.prototype.drawLine = function() {
            var o = this;
            o.initData(), o.title && o.drawTitle(), o.legend && o.drawLegend(), o.markers = initDefs(o.svg, !0), o.drawAxes();
            var e = DD.newSvgEl("g");
            DD.attr(e, { transform: "translate(" + DrawArea.left + "," + DrawArea.top + ")" }), o.svg.appendChild(e);
            DrawArea.width;
            var t, r, i = DrawArea.height,
                n = o.scaleValues.x.px,
                a = o.scaleValues.y.px,
                s = 0,
                l = 2,
                D = 2,
                d = o.scaleValues.x.values[0],
                c = o.scaleValues.y.values[0];
            "number" === o.category[0] && (s = (u = o.scaleValues.x.values)[u.length - 1] - u[0], t = n * (u.length - 1) / s, l = 1);
            var u, h = 0;
            "number" === o.category[1] && (h = (u = o.scaleValues.y.values)[u.length - 1] - u[0], r = a * (u.length - 1) / h, D = 1);
            var f = 0;
            for (v = 0; v < o.data.length; v++) o.data[v].datas.length > f && (f = o.data[v].datas.length);
            for (var v = 0; v < o.data.length; v++) {
                var p = o.data[v].datas,
                    g = DD.newSvgEl("path");
                e.appendChild(g);
                var m = getColor(o, v);
                DD.attr(g, { stroke: m, "stroke-width": 2, fill: "none" });
                for (var w = "", y = 0; y < p.length; y++) {
                    var E = p[y];
                    if (E) {
                        var x, b;
                        if (1 === l) x = (E.x - d) * t, 0 !== o.scaleValues.x.values[0] && (x += n);
                        else {
                            var $ = o.scaleValues.x.values.indexOf(E.x);
                            if (-1 === $) continue;
                            x = $ * n + n
                        }
                        1 === D ? (b = i - (E.y - c) * r, 0 !== c && (b -= a)) : b = o.scaleValues.y.values.indexOf(E.y) * a - a, w += 0 === y ? "M" + x + " " + b : " L" + x + " " + b
                    }
                }
                var k = { d: w };
                if (o.marker) {
                    var N = "url('#" + C(v, m) + "')";
                    k = { d: w, "marker-start": N, "marker-mid": N, "marker-end": N }
                }
                DD.attr(g, k)
            }

            function C(e, t) {
                var r = o.markers[e % o.markers.length];
                if (e >= o.markers.length) {
                    var i = r.m.cloneNode(!0),
                        n = r.id + "1";
                    o.svg.querySelector("defs").appendChild(i), DD.attr(i, { id: n });
                    var a = { id: n, m: i };
                    o.markers.push(a), r = a
                }
                return DD.attr(r.m, { fill: t, stroke: t }), r.id
            }
        }, Chart.prototype.drawHistogram = function() {
            var e = this;
            initDefs(e.svg, !1), e.initData(), e.title && e.drawTitle(), e.legend && e.drawLegend(), e.drawAxes(1);
            var t = DD.newSvgEl("g");
            DD.attr(t, { transform: "translate(" + DrawArea.left + "," + DrawArea.top + ")" }), e.svg.appendChild(t);
            DrawArea.width;
            var r = DrawArea.height,
                i = e.scaleValues.x.px,
                n = e.scaleValues.y.px,
                a = i,
                o = (a - 10) / e.data.length,
                s = 5;
            40 < o && (s = (a - (o = 40) * e.data.length) / 2 + 5);
            var l, D = 0,
                d = e.scaleValues.x.values[0],
                c = e.scaleValues.y.values[0],
                u = e.scaleValues.x.values[e.scaleValues.x.values.length - 1],
                h = e.scaleValues.y.values[e.scaleValues.y.values.length - 1],
                f = 0;
            "number" === e.category[0] && (f = u - d, e.scaleValues.x.values.length);
            var v = 0;
            "number" === e.category[1] && (v = h - c, l = n * (e.scaleValues.y.values.length - 1) / v, D = 1);
            for (var p = 0; p < e.data.length; p++)
                for (var g = getColor(e.svg, p), m = e.data[p].datas, w = 0; w < m.length; w++) {
                    var y = m[w],
                        E = w;
                    if (y.x !== e.scaleValues.x.values[w]) { E = -1; for (var x = 0; x < e.scaleValues.x.values.length; x++) y.x === e.scaleValues.x.values[x] && (E = x); if (-1 === E) continue }
                    if (y) {
                        var b, $;
                        if (b = o * p + s + E * a, 1 === D) $ = DrawArea.height - (y.y - c) * l, 0 !== c && ($ -= n);
                        else {
                            var k = e.scaleValues.y.values.indexOf(y.y);
                            if (-1 === k) continue;
                            $ = k * n - n
                        }
                        r = DrawArea.height - $;
                        var N = DD.newSvgEl("rect");
                        t.appendChild(N), DD.attr(N, { fill: g, x: b, y: $, width: o, height: r })
                    }
                }
        }, Chart.prototype.drawPie = function() {
            var e = this;
            e.title && e.drawTitle(), e.legend && e.drawLegend();
            for (var t, r = 0, i = 0; i < e.data.length; i++) e.data[i].title.length > r && (r = e.data[i].title.length);
            r *= WORDLEN;
            var n, a, o = DrawArea.width,
                s = DrawArea.height;
            if (e.showText) {
                var l = 50 + 2 * r;
                s - 60 <= o - l ? (t = (s - 60) / 2, DrawArea.left += o / 2 - t, DrawArea.top += 30) : (t = (o - l) / 2, DrawArea.top += s / 2 - t, DrawArea.left += l / 2)
            } else s < o ? (t = s / 2, DrawArea.left += o / 2 - t) : (t = o / 2, DrawArea.top += s / 2 - t);
            a = n = t, DrawArea.height = 2 * t, DrawArea.width = 2 * t;
            var D = DD.newSvgEl("g");
            DD.attr(D, { transform: "translate(" + DrawArea.left + "," + DrawArea.top + ")" }), e.svg.appendChild(D);
            var d = 0;
            for (i = 0; i < e.data.length; i++) { d += (u = e.data[i]).value }
            var c = 0;
            for (i = 0; i < e.data.length; i++) {
                var u;
                h(D, n, a, t, c, c += (u = e.data[i]).value / d * Math.PI * 2, getColor(e.svg, i), u.title, e.showPercent, e.showText)
            }

            function h(e, t, r, i, n, a, o, s, l, D) {
                var d = t + i * Math.cos(n),
                    c = r - i * Math.sin(n),
                    u = t + i * Math.cos(a),
                    h = r - i * Math.sin(a),
                    f = "M " + d + " " + c + " A " + i + " " + i + " ,1,0,0, " + u + " " + h + " L " + t + " " + r + " Z",
                    v = DD.newSvgEl("path");
                DD.attr(v, { d: f, fill: o }), e.appendChild(v);
                var p = n + (a - n) / 2;
                if (l) {
                    var g = 180 * p / Math.PI,
                        m = DD.newSvgEl("text");
                    m.innerHTML = Math.abs(100 * (a - n) / (2 * Math.PI)).toFixed(2) + "%";
                    var w = t + i - 30 - s.length * WORDLEN,
                        y = r + 5,
                        E = t,
                        x = r;
                    90 < g && g < 270 && (w = t - i + 30, y = r + 5, g -= 180), DD.attr(m, { x: w, y: y, fill: "#fff", transform: "rotate(" + -g + "," + E + "," + x + ")" }), e.appendChild(m)
                }
                if (D && s) {
                    d = t + i * Math.cos(p), c = r - i * Math.sin(p), u = t + (i + 20) * Math.cos(p), h = r - (i + 20) * Math.sin(p);
                    var b, $ = u,
                        k = s.length * WORDLEN;
                    b = $ < t ? ($ -= 10) - k - 5 : ($ += 10) + 5;
                    v = DD.newSvgEl("path");
                    DD.attr(v, { d: "M" + d + " " + c + " L " + u + " " + h + " H " + $, stroke: o, "stroke-width": 1, fill: "none" }), e.appendChild(v);
                    var N = DD.newSvgEl("text");
                    N.innerHTML = s, DD.attr(N, { x: b, y: h + 5, fill: o }), e.appendChild(N)
                }
            }
        }, Chart.prototype.drawScatter = function() {
            var e = this;
            initDefs(e.svg, !1), e.initData(), e.title && e.drawTitle(), e.legend && e.drawLegend(), e.drawAxes();
            var t = DD.newSvgEl("g");
            DD.attr(t, { transform: "translate(" + DrawArea.left + "," + DrawArea.top + ")" }), e.svg.appendChild(t);
            DrawArea.width;
            var r, i, n = DrawArea.height,
                a = e.scaleValues.x.px,
                o = e.scaleValues.y.px,
                s = 0,
                l = e.scaleValues.x.values[0],
                D = e.scaleValues.y.values[0];
            "number" === e.category[0] && (s = (d = e.scaleValues.x.values)[d.length - 1] - d[0], r = a * (d.length - 1) / s);
            var d, c = 0;
            "number" === e.category[1] && (c = (d = e.scaleValues.y.values)[d.length - 1] - d[0], i = o * (d.length - 1) / c);
            for (var u = 0, h = e.data.length; u < h; u++)
                for (var f = e.data[u].datas, v = getColor(e, u), p = 0, g = f.length; p < g; p++) {
                    var m = DD.newSvgEl("circle");
                    t.appendChild(m);
                    var w = (f[p].x - l) * r,
                        y = n - (f[p].y - D) * i;
                    0 !== l && (w += a), 0 !== D && (y -= o), DD.attr(m, { cx: w, cy: y, r: e.symbolSize, fill: v })
                }
        }, Chart.prototype.drawRadar = function() {
            var R = this,
                e = R.view.$getData();
            R.radarName && (R.radarData = e.data[R.radarName]), R.title && R.drawTitle(), R.legend && R.drawLegend();
            var h, f = R.radarData.titles.length,
                v = function(e) { for (var t = [], r = 0, i = e.length; r < i; r++) t.push(Math.max.apply(null, e[r].datas)); var n = Math.max.apply(null, t); return 10 * Math.ceil(n / 10) }(R.data),
                t = function(e) { for (var t = 0, r = 0, i = e.length; r < i; r++) t = e[r].length > t ? e[r].length : t; return t * WORDLEN }(R.radarData.titles),
                r = DrawArea.width,
                i = DrawArea.height,
                n = 50 + 2 * t;
            i - 60 <= r - n ? (h = (i - 60) / 2, DrawArea.left += r / 2 - h, DrawArea.top += 30) : (h = (r - n) / 2, DrawArea.top += i / 2 - h, DrawArea.left += n / 2), DrawArea.height = 2 * h, DrawArea.width = 2 * h;
            var L = DD.newSvgEl("g");
            DD.attr(L, { transform: "translate(" + DrawArea.left + "," + DrawArea.top + ")" }), R.svg.appendChild(L);
            var p = h,
                g = h,
                M = [];
            ! function(e, t, r, i) {
                var n, a = e.length,
                    o = [],
                    s = R.radarData.lineColor;
                for (n = 0; n < a; n++) {
                    var l = 2 * Math.PI * n / a - Math.PI / 2,
                        D = Math.cos(l),
                        d = Math.sin(l),
                        c = D * i + t,
                        u = d * i + r;
                    M.push([D, d]), o.push([c, u])
                }
                for (n = 5; 1 <= n; n--) {
                    var h = DD.newSvgEl("polygon");
                    L.appendChild(h);
                    for (var f = [], v = 0, p = M.length; v < p; v++) {
                        var g = n / 5,
                            m = M[v],
                            w = m[0] * i * g + t,
                            y = m[1] * i * g + r;
                        f.push(w + "," + y)
                    }
                    DD.attr(h, { points: f.join(" "), fill: (E = R.radarData.colors, x = n, void 0, b = E.length, E[x % b]), stroke: s, "stroke-width": 1 })
                }
                var E, x, b;
                for (n = 0; n < a; n++) {
                    var $, k, N = DD.newSvgEl("line"),
                        C = DD.newSvgEl("text"),
                        A = o[n],
                        O = e[n],
                        S = O.length * WORDLEN;
                    C.innerHTML = O, L.appendChild(N), L.appendChild(C), DD.attr(N, { x1: t, y1: r, x2: A[0], y2: A[1], stroke: s, "stroke-width": 1 }), $ = A[0] === t ? A[0] - S / 2 : A[0] < t ? A[0] - S : A[0], A[1] > r ? k = A[1] + 2 * WORDLEN : A[1] < r && (k = A[1] - 2 * WORDLEN), DD.attr(C, { x: $, y: k, fill: "#000" })
                }
            }(R.radarData.titles, p, g, h),
            function(e) {
                for (var t = 0, r = e.length; t < r; t++) {
                    var i = e[t].datas,
                        n = [],
                        a = getColor(R, t),
                        o = DD.newSvgEl("polygon");
                    L.appendChild(o);
                    for (var s = 0; s < f; s++) {
                        var l = i[s] || 0,
                            D = l / v,
                            d = M[s],
                            c = d[0] * h * D + p,
                            u = d[1] * h * D + g;
                        n.push(c + "," + u)
                    }
                    DD.attr(o, { points: n.join(" "), fill: "transparent", stroke: a, strokeWidth: 1 })
                }
            }(R.data)
        }, DD && DD.Plugin ? DD.Plugin.create("Chart", Chart) : console.error("使用此插件应先加载nodom框架")
    }(),
    function() {
        var e = function() {};
        e.prototype.init = function(e) {
            DD.addClass(e, "nd-plugin-msgbox");
            var t = DD.attr(e, "showItem") || "show";
            this.dataName = DD.attr(e, "dataName"), DD.attr(e, "x-show", t), e.$showItem = t, e.removeAttribute("showItem"), e.removeAttribute("dataName"), e.innerHTML = "<div class='nd-plugin-msgbox-mb'></div><div class='nd-plugin-msgbox-box'><div class='nd-plugin-msgbox-title'>{{title}}</div><div class='nd-plugin-msgbox-content'>{{content}}</div><div class='nd-plugin-msgbox-btnct'><a class='nd-plugin-msgbox-btn' x-repeat='buttons'>{{text}}</a></div></div></div>", DD.Compiler.compile(e, e.$module)
        }, e.prototype.render = function(l) {
            var D = l.$getData().data;
            if (D) {
                if (!D.buttons || !D.buttons.length) throw DD.Error.handle("invoke", "msgbox", "buttons", "array");
                var d;
                D.buttons && 3 <= D.buttons.length && D.buttons.splice(3, D.buttons.length), (d = D.module ? D.module : l.$module) && setTimeout(function() {
                    for (var o = l.querySelectorAll(".nd-plugin-msgbox-btn"), e = 100 / D.buttons.length | 0, s = D.callbacks, t = 0; t < o.length; t++) {
                        var r;
                        if (DD.css(o[t], "width", e + "%"), DD.getOwnProps(o[t].$events).forEach(function(e) { o[t].$events[e].unbind() }), o[t].$events = {}, s && s[t]) {
                            s[t];
                            r = function(e, t, r) {
                                D[l.$showItem] = !1;
                                for (var i = 0, n = 0; n < o.length; n++)
                                    if (o[n] === e.target) { i = n; break }
                                var a = d.methodFactory.get(s[i]);
                                DD.isFunction(a) && a.call(d.model, e, t, r)
                            }
                        } else r = function(e, t, r) { D[l.$showItem] = !1 };
                        new DD.Event({ eventName: "click", view: o[t], handler: r })
                    }
                }, 0)
            }
        }, DD.Plugin.create("msgbox", e)
    }();