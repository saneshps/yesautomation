
/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function() {
    if (!window.CKEDITOR || !window.CKEDITOR.dom) {
        window.CKEDITOR || (window.CKEDITOR = function() {
            var a = {
                    timestamp: "C7LG",
                    version: "4.0 Beta",
                    revision: "84696441e9",
                    rnd: Math.floor(900 * Math.random()) + 100,
                    _: {
                        pending: []
                    },
                    status: "unloaded",
                    basePath: function() {
                        var a = window.CKEDITOR_BASEPATH || "";
                        if (!a)
                            for (var c = document.getElementsByTagName("script"), b = 0; b < c.length; b++) {
                                var f = c[b].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
                                if (f) {
                                    a = f[1];
                                    break
                                }
                            } - 1 == a.indexOf(":/") && (a = 0 === a.indexOf("/") ?
                                location.href.match(/^.*?:\/\/[^\/]*/)[0] + a : location.href.match(/^[^\?]*\/(?:)/)[0] + a);
                        if (!a) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                        return a
                    }(),
                    getUrl: function(a) {
                        -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                        this.timestamp && ("/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a)) && (a += (0 <= a.indexOf("?") ? "&" : "?") + "t=" + this.timestamp);
                        return a
                    },
                    domReady: function() {
                        function a() {
                            try {
                                document.addEventListener ?
                                    (document.removeEventListener("DOMContentLoaded", a, !1), c()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), c())
                            } catch (b) {}
                        }

                        function c() {
                            for (var a; a = b.shift();) a()
                        }
                        var b = [];
                        return function(c) {
                            b.push(c);
                            "complete" === document.readyState && setTimeout(a, 1);
                            if (1 == b.length)
                                if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1);
                                else if (document.attachEvent) {
                                document.attachEvent("onreadystatechange",
                                    a);
                                window.attachEvent("onload", a);
                                c = !1;
                                try {
                                    c = !window.frameElement
                                } catch (e) {}
                                if (document.documentElement.doScroll && c) {
                                    var g = function() {
                                        try {
                                            document.documentElement.doScroll("left")
                                        } catch (j) {
                                            setTimeout(g, 1);
                                            return
                                        }
                                        a()
                                    };
                                    g()
                                }
                            }
                        }
                    }()
                },
                b = window.CKEDITOR_GETURL;
            if (b) {
                var c = a.url;
                a.url = function(h) {
                    return b.call(a, h) || c.call(a, h)
                }
            }
            return a
        }());
        CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(a) {
                var b = CKEDITOR.event.prototype,
                    c;
                for (c in b) a[c] == void 0 && (a[c] = b[c])
            }, CKEDITOR.event.prototype =
            function() {
                function a(a) {
                    var d = b(this);
                    return d[a] || (d[a] = new c(a))
                }
                var b = function(a) {
                        a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
                        return a.events || (a.events = {})
                    },
                    c = function(a) {
                        this.name = a;
                        this.listeners = []
                    };
                c.prototype = {
                    getListenerIndex: function(a) {
                        for (var c = 0, b = this.listeners; c < b.length; c++)
                            if (b[c].fn == a) return c;
                        return -1
                    }
                };
                return {
                    define: function(c, b) {
                        var i = a.call(this, c);
                        CKEDITOR.tools.extend(i, b, true)
                    },
                    on: function(c, b, i, f, e) {
                        function g(a, e, g, k) {
                            a = {
                                name: c,
                                sender: this,
                                editor: a,
                                data: e,
                                listenerData: f,
                                stop: g,
                                cancel: k,
                                removeListener: j
                            };
                            return b.call(i, a) === false ? false : a.data
                        }

                        function j() {
                            q.removeListener(c, b)
                        }
                        var k = a.call(this, c);
                        if (k.getListenerIndex(b) < 0) {
                            k = k.listeners;
                            i || (i = this);
                            isNaN(e) && (e = 10);
                            var q = this;
                            g.fn = b;
                            g.priority = e;
                            for (var l = k.length - 1; l >= 0; l--)
                                if (k[l].priority <= e) {
                                    k.splice(l + 1, 0, g);
                                    return {
                                        removeListener: j
                                    }
                                }
                            k.unshift(g)
                        }
                        return {
                            removeListener: j
                        }
                    },
                    once: function() {
                        var a = arguments[1];
                        arguments[1] = function(c) {
                            c.removeListener();
                            return a.apply(this, arguments)
                        };
                        return this.on.apply(this,
                            arguments)
                    },
                    capture: function() {
                        CKEDITOR.event.useCapture = 1;
                        var a = this.on.apply(this, arguments);
                        CKEDITOR.event.useCapture = 0;
                        return a
                    },
                    fire: function() {
                        var a = 0,
                            c = function() {
                                a = 1
                            },
                            i = 0,
                            f = function() {
                                i = 1
                            };
                        return function(e, g, j) {
                            var k = b(this)[e],
                                e = a,
                                q = i;
                            a = i = 0;
                            if (k) {
                                var l = k.listeners;
                                if (l.length)
                                    for (var l = l.slice(0), n, o = 0; o < l.length; o++) {
                                        if (k.errorProof) try {
                                            n = l[o].call(this, j, g, c, f)
                                        } catch (m) {} else n = l[o].call(this, j, g, c, f);
                                        n === false ? i = 1 : typeof n != "undefined" && (g = n);
                                        if (a || i) break
                                    }
                            }
                            g = i ? false : typeof g == "undefined" ?
                                true : g;
                            a = e;
                            i = q;
                            return g
                        }
                    }(),
                    fireOnce: function(a, c, i) {
                        c = this.fire(a, c, i);
                        delete b(this)[a];
                        return c
                    },
                    removeListener: function(a, c) {
                        var i = b(this)[a];
                        if (i) {
                            var f = i.getListenerIndex(c);
                            f >= 0 && i.listeners.splice(f, 1)
                        }
                    },
                    removeAllListeners: function() {
                        var a = b(this),
                            c;
                        for (c in a) delete a[c]
                    },
                    hasListeners: function(a) {
                        return (a = b(this)[a]) && a.listeners.length > 0
                    }
                }
            }());
        CKEDITOR.editor || (CKEDITOR.editor = function() {
                CKEDITOR._.pending.push([this, arguments]);
                CKEDITOR.event.call(this)
            }, CKEDITOR.editor.prototype.fire =
            function(a, b) {
                a in {
                    instanceReady: 1,
                    loaded: 1
                } && (this[a] = true);
                return CKEDITOR.event.prototype.fire.call(this, a, b, this)
            }, CKEDITOR.editor.prototype.fireOnce = function(a, b) {
                a in {
                    instanceReady: 1,
                    loaded: 1
                } && (this[a] = true);
                return CKEDITOR.event.prototype.fireOnce.call(this, a, b, this)
            }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype, !0));
        CKEDITOR.env || (CKEDITOR.env = function() {
            var a = navigator.userAgent.toLowerCase(),
                b = window.opera,
                c = {
                    ie: eval("/*@cc_on!@*/false"),
                    opera: !!b && b.version,
                    webkit: a.indexOf(" applewebkit/") >
                        -1,
                    air: a.indexOf(" adobeair/") > -1,
                    mac: a.indexOf("macintosh") > -1,
                    quirks: document.compatMode == "BackCompat",
                    mobile: a.indexOf("mobile") > -1,
                    iOS: /(ipad|iphone|ipod)/.test(a),
                    isCustomDomain: function() {
                        if (!this.ie) return false;
                        var a = document.domain,
                            c = window.location.hostname;
                        return a != c && a != "[" + c + "]"
                    },
                    secure: location.protocol == "https:"
                };
            c.gecko = navigator.product == "Gecko" && !c.webkit && !c.opera;
            if (c.webkit) a.indexOf("chrome") > -1 ? c.chrome = true : c.safari = true;
            var h = 0;
            if (c.ie) {
                h = c.quirks || !document.documentMode ?
                    parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode;
                c.ie9Compat = h == 9;
                c.ie8Compat = h == 8;
                c.ie7Compat = h == 7;
                c.ie6Compat = h < 7 || c.quirks
            }
            if (c.gecko) {
                var d = a.match(/rv:([\d\.]+)/);
                if (d) {
                    d = d[1].split(".");
                    h = d[0] * 1E4 + (d[1] || 0) * 100 + (d[2] || 0) * 1
                }
            }
            c.opera && (h = parseFloat(b.version()));
            c.air && (h = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
            c.webkit && (h = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
            c.version = h;
            c.isCompatible = c.iOS && h >= 534 || !c.mobile && (c.ie && h > 6 || c.gecko && h >= 10801 || c.opera && h >= 9.5 || c.air && h >=
                1 || c.webkit && h >= 522 || false);
            c.cssClass = "cke_browser_" + (c.ie ? "ie" : c.gecko ? "gecko" : c.opera ? "opera" : c.webkit ? "webkit" : "unknown");
            if (c.quirks) c.cssClass = c.cssClass + " cke_browser_quirks";
            if (c.ie) {
                c.cssClass = c.cssClass + (" cke_browser_ie" + (c.quirks || c.version < 7 ? "6" : c.version));
                if (c.quirks) c.cssClass = c.cssClass + " cke_browser_iequirks"
            }
            if (c.gecko && h < 10900) c.cssClass = c.cssClass + " cke_browser_gecko18";
            if (c.air) c.cssClass = c.cssClass + " cke_browser_air";
            return c
        }());
        "unloaded" == CKEDITOR.status && function() {
            CKEDITOR.event.implementOn(CKEDITOR);
            CKEDITOR.loadFullCore = function() {
                if (CKEDITOR.status != "basic_ready") CKEDITOR.loadFullCore._load = 1;
                else {
                    delete CKEDITOR.loadFullCore;
                    var a = document.createElement("script");
                    a.type = "text/javascript";
                    a.src = CKEDITOR.basePath + "ckeditor.js";
                    document.getElementsByTagName("head")[0].appendChild(a)
                }
            };
            CKEDITOR.loadFullCoreTimeout = 0;
            CKEDITOR.add = function(a) {
                (this._.pending || (this._.pending = [])).push(a)
            };
            (function() {
                CKEDITOR.domReady(function() {
                    var a = CKEDITOR.loadFullCore,
                        b = CKEDITOR.loadFullCoreTimeout;
                    if (a) {
                        CKEDITOR.status =
                            "basic_ready";
                        a && a._load ? a() : b && setTimeout(function() {
                            CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
                        }, b * 1E3)
                    }
                })
            })();
            CKEDITOR.status = "basic_loaded"
        }();
        CKEDITOR.dom = {};
        (function() {
            var a = [],
                b = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.opera ? "-o-" : CKEDITOR.env.ie ? "-ms-" : "";
            CKEDITOR.on("reset", function() {
                a = []
            });
            CKEDITOR.tools = {
                arrayCompare: function(a, b) {
                    if (!a && !b) return true;
                    if (!a || !b || a.length != b.length) return false;
                    for (var d = 0; d < a.length; d++)
                        if (a[d] != b[d]) return false;
                    return true
                },
                clone: function(a) {
                    var b;
                    if (a && a instanceof Array) {
                        b = [];
                        for (var d = 0; d < a.length; d++) b[d] = this.clone(a[d]);
                        return b
                    }
                    if (a === null || typeof a != "object" || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp) return a;
                    b = new a.constructor;
                    for (d in a) b[d] = this.clone(a[d]);
                    return b
                },
                capitalize: function(a) {
                    return a.charAt(0).toUpperCase() + a.substring(1).toLowerCase()
                },
                extend: function(a) {
                    var b = arguments.length,
                        d, i;
                    if (typeof(d = arguments[b - 1]) == "boolean") b--;
                    else if (typeof(d =
                            arguments[b - 2]) == "boolean") {
                        i = arguments[b - 1];
                        b = b - 2
                    }
                    for (var f = 1; f < b; f++) {
                        var e = arguments[f],
                            g;
                        for (g in e)
                            if (d === true || a[g] == void 0)
                                if (!i || g in i) a[g] = e[g]
                    }
                    return a
                },
                prototypedCopy: function(a) {
                    var b = function() {};
                    b.prototype = a;
                    return new b
                },
                isArray: function(a) {
                    return !!a && a instanceof Array
                },
                isEmpty: function(a) {
                    for (var b in a)
                        if (a.hasOwnProperty(b)) return false;
                    return true
                },
                cssVendorPrefix: function(a, h, d) {
                    if (d) return b + a + ":" + h + ";" + a + ":" + h;
                    d = {};
                    d[a] = h;
                    d[b + a] = h;
                    return d
                },
                cssStyleToDomStyle: function() {
                    var a =
                        document.createElement("div").style,
                        b = typeof a.cssFloat != "undefined" ? "cssFloat" : typeof a.styleFloat != "undefined" ? "styleFloat" : "float";
                    return function(a) {
                        return a == "float" ? b : a.replace(/-./g, function(a) {
                            return a.substr(1).toUpperCase()
                        })
                    }
                }(),
                buildStyleHtml: function(a) {
                    for (var a = [].concat(a), b, d = [], i = 0; i < a.length; i++)
                        if (b = a[i]) /@import|[{}]/.test(b) ? d.push("<style>" + b + "</style>") : d.push('<link type="text/css" rel=stylesheet href="' + b + '">');
                    return d.join("")
                },
                htmlEncode: function(a) {
                    return ("" + a).replace(/&/g,
                        "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;")
                },
                htmlEncodeAttr: function(a) {
                    return a.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                },
                getNextNumber: function() {
                    var a = 0;
                    return function() {
                        return ++a
                    }
                }(),
                getNextId: function() {
                    return "cke_" + this.getNextNumber()
                },
                override: function(a, b) {
                    var d = b(a);
                    d.prototype = a.prototype;
                    return d
                },
                setTimeout: function(a, b, d, i, f) {
                    f || (f = window);
                    d || (d = f);
                    return f.setTimeout(function() {
                        i ? a.apply(d, [].concat(i)) : a.apply(d)
                    }, b || 0)
                },
                trim: function() {
                    var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                    return function(b) {
                        return b.replace(a, "")
                    }
                }(),
                ltrim: function() {
                    var a = /^[ \t\n\r]+/g;
                    return function(b) {
                        return b.replace(a, "")
                    }
                }(),
                rtrim: function() {
                    var a = /[ \t\n\r]+$/g;
                    return function(b) {
                        return b.replace(a, "")
                    }
                }(),
                indexOf: function(a, b) {
                    if (typeof b == "function")
                        for (var d = 0, i = a.length; d < i; d++) {
                            if (b(a[d])) return d
                        } else {
                            if (a.indexOf) return a.indexOf(b);
                            d = 0;
                            for (i = a.length; d < i; d++)
                                if (a[d] === b) return d
                        }
                    return -1
                },
                search: function(a, b) {
                    var d = CKEDITOR.tools.indexOf(a, b);
                    return d >= 0 ? a[d] : null
                },
                bind: function(a,
                    b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                createClass: function(a) {
                    var b = a.$,
                        d = a.base,
                        i = a.privates || a._,
                        f = a.proto,
                        a = a.statics;
                    !b && (b = function() {
                        d && this.base.apply(this, arguments)
                    });
                    if (i) var e = b,
                        b = function() {
                            var a = this._ || (this._ = {}),
                                j;
                            for (j in i) {
                                var b = i[j];
                                a[j] = typeof b == "function" ? CKEDITOR.tools.bind(b, this) : b
                            }
                            e.apply(this, arguments)
                        };
                    if (d) {
                        b.prototype = this.prototypedCopy(d.prototype);
                        b.prototype.constructor = b;
                        b.base = d;
                        b.baseProto = d.prototype;
                        b.prototype.base = function() {
                            this.base = d.prototype.base;
                            d.apply(this, arguments);
                            this.base = arguments.callee
                        }
                    }
                    f && this.extend(b.prototype, f, true);
                    a && this.extend(b, a, true);
                    return b
                },
                addFunction: function(b, h) {
                    return a.push(function() {
                        return b.apply(h || this, arguments)
                    }) - 1
                },
                removeFunction: function(b) {
                    a[b] = null
                },
                callFunction: function(b) {
                    var h = a[b];
                    return h && h.apply(window, Array.prototype.slice.call(arguments, 1))
                },
                cssLength: function() {
                    var a = /^-?\d+\.?\d*px$/,
                        b;
                    return function(d) {
                        b = CKEDITOR.tools.trim(d + "") + "px";
                        return a.test(b) ? b : d || ""
                    }
                }(),
                convertToPx: function() {
                    var a;
                    return function(b) {
                        if (!a) {
                            a = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document);
                            CKEDITOR.document.getBody().append(a)
                        }
                        if (!/%$/.test(b)) {
                            a.setStyle("width", b);
                            return a.$.clientWidth
                        }
                        return b
                    }
                }(),
                repeat: function(a, b) {
                    return Array(b + 1).join(a)
                },
                tryThese: function() {
                    for (var a, b = 0, d = arguments.length; b < d; b++) {
                        var i = arguments[b];
                        try {
                            a = i();
                            break
                        } catch (f) {}
                    }
                    return a
                },
                genKey: function() {
                    return Array.prototype.slice.call(arguments).join("-")
                },
                defer: function(a) {
                    return function() {
                        var b = arguments,
                            d = this;
                        window.setTimeout(function() {
                            a.apply(d, b)
                        }, 0)
                    }
                },
                normalizeCssText: function(a, b) {
                    var d = [],
                        i, f = CKEDITOR.tools.parseCssText(a, true, b);
                    for (i in f) d.push(i + ":" + f[i]);
                    d.sort();
                    return d.length ? d.join(";") + ";" : ""
                },
                convertRgbToHex: function(a) {
                    return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, b, c, f) {
                        a = [b, c, f];
                        for (b = 0; b < 3; b++) a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
                        return "#" + a.join("")
                    })
                },
                parseCssText: function(a,
                    b, d) {
                    var i = {};
                    if (d) {
                        d = new CKEDITOR.dom.element("span");
                        d.setAttribute("style", a);
                        a = CKEDITOR.tools.convertRgbToHex(d.getAttribute("style") || "")
                    }
                    if (!a || a == ";") return i;
                    a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, g) {
                        if (b) {
                            c = c.toLowerCase();
                            c == "font-family" && (g = g.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ","));
                            g = CKEDITOR.tools.trim(g)
                        }
                        i[c] = g
                    });
                    return i
                }
            }
        })();
        CKEDITOR.dtd = function() {
            var a = CKEDITOR.tools.extend,
                b = {
                    isindex: 1,
                    fieldset: 1
                },
                c = {
                    input: 1,
                    button: 1,
                    select: 1,
                    textarea: 1,
                    label: 1
                },
                h = a({
                    a: 1
                }, c),
                d = a({
                    iframe: 1
                }, h),
                i = {
                    hr: 1,
                    ul: 1,
                    menu: 1,
                    div: 1,
                    section: 1,
                    header: 1,
                    footer: 1,
                    nav: 1,
                    article: 1,
                    aside: 1,
                    figure: 1,
                    dialog: 1,
                    hgroup: 1,
                    mark: 1,
                    time: 1,
                    meter: 1,
                    command: 1,
                    keygen: 1,
                    output: 1,
                    progress: 1,
                    audio: 1,
                    video: 1,
                    details: 1,
                    datagrid: 1,
                    datalist: 1,
                    blockquote: 1,
                    noscript: 1,
                    table: 1,
                    center: 1,
                    address: 1,
                    dir: 1,
                    pre: 1,
                    h5: 1,
                    dl: 1,
                    h4: 1,
                    noframes: 1,
                    h6: 1,
                    ol: 1,
                    h1: 1,
                    h3: 1,
                    h2: 1
                },
                f = {
                    ins: 1,
                    del: 1,
                    script: 1,
                    style: 1
                },
                e = a({
                    b: 1,
                    acronym: 1,
                    bdo: 1,
                    "var": 1,
                    "#": 1,
                    abbr: 1,
                    code: 1,
                    br: 1,
                    i: 1,
                    cite: 1,
                    kbd: 1,
                    u: 1,
                    strike: 1,
                    s: 1,
                    tt: 1,
                    strong: 1,
                    q: 1,
                    samp: 1,
                    em: 1,
                    dfn: 1,
                    span: 1,
                    wbr: 1
                }, f),
                g = a({
                    sub: 1,
                    img: 1,
                    object: 1,
                    sup: 1,
                    basefont: 1,
                    map: 1,
                    applet: 1,
                    font: 1,
                    big: 1,
                    small: 1,
                    mark: 1
                }, e),
                j = a({
                    p: 1
                }, g),
                c = a({
                    iframe: 1
                }, g, c),
                g = {
                    img: 1,
                    noscript: 1,
                    br: 1,
                    kbd: 1,
                    center: 1,
                    button: 1,
                    basefont: 1,
                    h5: 1,
                    h4: 1,
                    samp: 1,
                    h6: 1,
                    ol: 1,
                    h1: 1,
                    h3: 1,
                    h2: 1,
                    form: 1,
                    font: 1,
                    "#": 1,
                    select: 1,
                    menu: 1,
                    ins: 1,
                    abbr: 1,
                    label: 1,
                    code: 1,
                    table: 1,
                    script: 1,
                    cite: 1,
                    input: 1,
                    iframe: 1,
                    strong: 1,
                    textarea: 1,
                    noframes: 1,
                    big: 1,
                    small: 1,
                    span: 1,
                    hr: 1,
                    sub: 1,
                    bdo: 1,
                    "var": 1,
                    div: 1,
                    section: 1,
                    header: 1,
                    footer: 1,
                    nav: 1,
                    article: 1,
                    aside: 1,
                    figure: 1,
                    dialog: 1,
                    hgroup: 1,
                    mark: 1,
                    time: 1,
                    meter: 1,
                    menu: 1,
                    command: 1,
                    keygen: 1,
                    output: 1,
                    progress: 1,
                    audio: 1,
                    video: 1,
                    details: 1,
                    datagrid: 1,
                    datalist: 1,
                    object: 1,
                    sup: 1,
                    strike: 1,
                    dir: 1,
                    map: 1,
                    dl: 1,
                    applet: 1,
                    del: 1,
                    isindex: 1,
                    fieldset: 1,
                    ul: 1,
                    b: 1,
                    acronym: 1,
                    a: 1,
                    blockquote: 1,
                    i: 1,
                    u: 1,
                    s: 1,
                    tt: 1,
                    address: 1,
                    q: 1,
                    pre: 1,
                    p: 1,
                    em: 1,
                    dfn: 1
                },
                k = a({
                    a: 1
                }, c),
                q = {
                    tr: 1
                },
                l = {
                    "#": 1
                },
                n = a({
                    param: 1
                }, g),
                o = a({
                    form: 1
                }, b, d, i, j),
                m = {
                    li: 1
                },
                p = {
                    base: 1,
                    link: 1,
                    meta: 1,
                    title: 1
                },
                s = a(p, {
                    style: 1,
                    script: 1
                }),
                r = {
                    head: 1,
                    body: 1
                },
                t = {
                    address: 1,
                    blockquote: 1,
                    center: 1,
                    dir: 1,
                    div: 1,
                    section: 1,
                    header: 1,
                    footer: 1,
                    nav: 1,
                    article: 1,
                    aside: 1,
                    figure: 1,
                    dialog: 1,
                    hgroup: 1,
                    meter: 1,
                    menu: 1,
                    command: 1,
                    keygen: 1,
                    output: 1,
                    progress: 1,
                    audio: 1,
                    video: 1,
                    details: 1,
                    datagrid: 1,
                    datalist: 1,
                    dl: 1,
                    fieldset: 1,
                    form: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    hr: 1,
                    isindex: 1,
                    noframes: 1,
                    ol: 1,
                    p: 1,
                    pre: 1,
                    table: 1,
                    ul: 1,
                    li: 1,
                    dt: 1,
                    dd: 1
                };
            return {
                $nonBodyContent: a({
                    html: 1
                }, r, p),
                $block: t,
                $blockLimit: {
                    body: 1,
                    div: 1,
                    section: 1,
                    header: 1,
                    footer: 1,
                    nav: 1,
                    article: 1,
                    aside: 1,
                    figure: 1,
                    dialog: 1,
                    hgroup: 1,
                    meter: 1,
                    menu: 1,
                    command: 1,
                    keygen: 1,
                    output: 1,
                    progress: 1,
                    audio: 1,
                    video: 1,
                    details: 1,
                    datagrid: 1,
                    datalist: 1,
                    td: 1,
                    th: 1,
                    caption: 1,
                    form: 1,
                    table: 1,
                    ul: 1,
                    dl: 1,
                    ol: 1,
                    tr: 1,
                    dir: 1,
                    fieldset: 1
                },
                $inline: k,
                $object: {
                    img: 1,
                    table: 1,
                    hr: 1,
                    iframe: 1,
                    input: 1,
                    textarea: 1,
                    select: 1,
                    applet: 1,
                    button: 1,
                    object: 1,
                    audio: 1,
                    video: 1
                },
                $body: a({
                    script: 1,
                    style: 1
                }, t),
                $cdata: {
                    script: 1,
                    style: 1
                },
                $editable: {
                    address: 1,
                    article: 1,
                    aside: 1,
                    blockquote: 1,
                    body: 1,
                    details: 1,
                    div: 1,
                    fieldset: 1,
                    footer: 1,
                    form: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    header: 1,
                    hgroup: 1,
                    nav: 1,
                    p: 1,
                    pre: 1,
                    section: 1
                },
                $empty: {
                    area: 1,
                    base: 1,
                    br: 1,
                    col: 1,
                    hr: 1,
                    img: 1,
                    input: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    wbr: 1
                },
                $listItem: {
                    dd: 1,
                    dt: 1,
                    li: 1
                },
                $list: {
                    ul: 1,
                    ol: 1,
                    dl: 1
                },
                $nonEditable: {
                    applet: 1,
                    button: 1,
                    embed: 1,
                    iframe: 1,
                    map: 1,
                    object: 1,
                    option: 1,
                    script: 1,
                    textarea: 1,
                    param: 1,
                    audio: 1,
                    video: 1
                },
                $removeEmpty: {
                    abbr: 1,
                    acronym: 1,
                    address: 1,
                    b: 1,
                    bdo: 1,
                    big: 1,
                    cite: 1,
                    code: 1,
                    del: 1,
                    dfn: 1,
                    em: 1,
                    font: 1,
                    i: 1,
                    ins: 1,
                    label: 1,
                    kbd: 1,
                    q: 1,
                    s: 1,
                    samp: 1,
                    small: 1,
                    span: 1,
                    strike: 1,
                    strong: 1,
                    sub: 1,
                    sup: 1,
                    tt: 1,
                    u: 1,
                    "var": 1,
                    mark: 1
                },
                $tabIndex: {
                    a: 1,
                    area: 1,
                    button: 1,
                    input: 1,
                    object: 1,
                    select: 1,
                    textarea: 1
                },
                $tableContent: {
                    caption: 1,
                    col: 1,
                    colgroup: 1,
                    tbody: 1,
                    td: 1,
                    tfoot: 1,
                    th: 1,
                    thead: 1,
                    tr: 1
                },
                html: r,
                head: s,
                style: l,
                script: l,
                body: o,
                base: {},
                link: {},
                meta: {},
                title: l,
                col: {},
                tr: {
                    td: 1,
                    th: 1
                },
                img: {},
                colgroup: {
                    col: 1
                },
                noscript: o,
                td: o,
                br: {},
                wbr: {},
                th: o,
                center: o,
                kbd: k,
                button: a(j, i),
                basefont: {},
                h5: k,
                h4: k,
                samp: k,
                h6: k,
                ol: m,
                h1: k,
                h3: k,
                option: l,
                h2: k,
                form: a(b, d, i, j),
                select: {
                    optgroup: 1,
                    option: 1
                },
                font: k,
                ins: k,
                menu: m,
                abbr: k,
                label: k,
                table: {
                    thead: 1,
                    col: 1,
                    tbody: 1,
                    tr: 1,
                    colgroup: 1,
                    caption: 1,
                    tfoot: 1
                },
                code: k,
                tfoot: q,
                cite: k,
                li: o,
                input: {},
                iframe: o,
                strong: k,
                textarea: l,
                noframes: o,
                big: k,
                small: k,
                span: k,
                hr: {},
                dt: k,
                sub: k,
                optgroup: {
                    option: 1
                },
                param: {},
                bdo: k,
                "var": k,
                div: o,
                object: n,
                sup: k,
                dd: o,
                strike: k,
                area: {},
                dir: m,
                map: a({
                    area: 1,
                    form: 1,
                    p: 1
                }, b, f, i),
                applet: n,
                dl: {
                    dt: 1,
                    dd: 1
                },
                del: k,
                isindex: {},
                fieldset: a({
                    legend: 1
                }, g),
                thead: q,
                ul: m,
                acronym: k,
                b: k,
                a: c,
                blockquote: o,
                caption: k,
                i: k,
                u: k,
                tbody: q,
                s: k,
                address: a(d, j),
                tt: k,
                legend: k,
                q: k,
                pre: a(e, h),
                p: k,
                em: k,
                dfn: k,
                section: o,
                header: o,
                footer: o,
                nav: o,
                article: o,
                aside: o,
                figure: o,
                dialog: o,
                hgroup: o,
                mark: k,
                time: k,
                meter: k,
                menu: k,
                command: k,
                keygen: k,
                output: k,
                progress: n,
                audio: n,
                video: n,
                details: n,
                datagrid: n,
                datalist: n
            }
        }();
        CKEDITOR.dom.event = function(a) {
            this.$ = a
        };
        CKEDITOR.dom.event.prototype = {
            getKey: function() {
                return this.$.keyCode || this.$.which
            },
            getKeystroke: function() {
                var a = this.getKey();
                if (this.$.ctrlKey || this.$.metaKey) a = a + CKEDITOR.CTRL;
                this.$.shiftKey && (a = a + CKEDITOR.SHIFT);
                this.$.altKey && (a = a + CKEDITOR.ALT);
                return a
            },
            preventDefault: function(a) {
                var b = this.$;
                b.preventDefault ? b.preventDefault() :
                    b.returnValue = false;
                a && this.stopPropagation()
            },
            stopPropagation: function() {
                var a = this.$;
                a.stopPropagation ? a.stopPropagation() : a.cancelBubble = true
            },
            getTarget: function() {
                var a = this.$.target || this.$.srcElement;
                return a ? new CKEDITOR.dom.node(a) : null
            }
        };
        CKEDITOR.CTRL = 1114112;
        CKEDITOR.SHIFT = 2228224;
        CKEDITOR.ALT = 4456448;
        CKEDITOR.dom.domObject = function(a) {
            if (a) this.$ = a
        };
        CKEDITOR.dom.domObject.prototype = function() {
            var a = function(a, c) {
                return function(h) {
                    typeof CKEDITOR != "undefined" && a.fire(c, new CKEDITOR.dom.event(h))
                }
            };
            return {
                getPrivate: function() {
                    var a;
                    if (!(a = this.getCustomData("_"))) this.setCustomData("_", a = {});
                    return a
                },
                on: function(b) {
                    var c = this.getCustomData("_cke_nativeListeners");
                    if (!c) {
                        c = {};
                        this.setCustomData("_cke_nativeListeners", c)
                    }
                    if (!c[b]) {
                        c = c[b] = a(this, b);
                        this.$.addEventListener ? this.$.addEventListener(b, c, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + b, c)
                    }
                    return CKEDITOR.event.prototype.on.apply(this, arguments)
                },
                removeListener: function(a) {
                    CKEDITOR.event.prototype.removeListener.apply(this,
                        arguments);
                    if (!this.hasListeners(a)) {
                        var c = this.getCustomData("_cke_nativeListeners"),
                            h = c && c[a];
                        if (h) {
                            this.$.removeEventListener ? this.$.removeEventListener(a, h, false) : this.$.detachEvent && this.$.detachEvent("on" + a, h);
                            delete c[a]
                        }
                    }
                },
                removeAllListeners: function() {
                    var a = this.getCustomData("_cke_nativeListeners"),
                        c;
                    for (c in a) {
                        var h = a[c];
                        this.$.detachEvent ? this.$.detachEvent("on" + c, h) : this.$.removeEventListener && this.$.removeEventListener(c, h, false);
                        delete a[c]
                    }
                }
            }
        }();
        (function(a) {
            var b = {};
            CKEDITOR.on("reset",
                function() {
                    b = {}
                });
            a.equals = function(a) {
                try {
                    return a && a.$ === this.$
                } catch (b) {
                    return false
                }
            };
            a.setCustomData = function(a, h) {
                var d = this.getUniqueId();
                (b[d] || (b[d] = {}))[a] = h;
                return this
            };
            a.getCustomData = function(a) {
                var h = this.$["data-cke-expando"];
                return (h = h && b[h]) && a in h ? h[a] : null
            };
            a.removeCustomData = function(a) {
                var h = this.$["data-cke-expando"],
                    h = h && b[h],
                    d, i;
                if (h) {
                    d = h[a];
                    i = a in h;
                    delete h[a]
                }
                return i ? d : null
            };
            a.clearCustomData = function() {
                this.removeAllListeners();
                var a = this.$["data-cke-expando"];
                a && delete b[a]
            };
            a.getUniqueId = function() {
                return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
            };
            CKEDITOR.event.implementOn(a)
        })(CKEDITOR.dom.domObject.prototype);
        CKEDITOR.dom.node = function(a) {
            return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this
        };
        CKEDITOR.dom.node.prototype =
            new CKEDITOR.dom.domObject;
        CKEDITOR.NODE_ELEMENT = 1;
        CKEDITOR.NODE_DOCUMENT = 9;
        CKEDITOR.NODE_TEXT = 3;
        CKEDITOR.NODE_COMMENT = 8;
        CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11;
        CKEDITOR.POSITION_IDENTICAL = 0;
        CKEDITOR.POSITION_DISCONNECTED = 1;
        CKEDITOR.POSITION_FOLLOWING = 2;
        CKEDITOR.POSITION_PRECEDING = 4;
        CKEDITOR.POSITION_IS_CONTAINED = 8;
        CKEDITOR.POSITION_CONTAINS = 16;
        CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
            appendTo: function(a, b) {
                a.append(this, b);
                return a
            },
            clone: function(a, b) {
                var c = this.$.cloneNode(a),
                    h = function(c) {
                        c["data-cke-expando"] &&
                            (c["data-cke-expando"] = false);
                        if (c.nodeType == CKEDITOR.NODE_ELEMENT) {
                            b || c.removeAttribute("id", false);
                            if (a)
                                for (var c = c.childNodes, i = 0; i < c.length; i++) h(c[i])
                        }
                    };
                h(c);
                return new CKEDITOR.dom.node(c)
            },
            hasPrevious: function() {
                return !!this.$.previousSibling
            },
            hasNext: function() {
                return !!this.$.nextSibling
            },
            insertAfter: function(a) {
                a.$.parentNode.insertBefore(this.$, a.$.nextSibling);
                return a
            },
            insertBefore: function(a) {
                a.$.parentNode.insertBefore(this.$, a.$);
                return a
            },
            insertBeforeMe: function(a) {
                this.$.parentNode.insertBefore(a.$,
                    this.$);
                return a
            },
            getAddress: function(a) {
                for (var b = [], c = this.getDocument().$.documentElement, h = this.$; h && h != c;) {
                    var d = h.parentNode;
                    d && b.unshift(this.getIndex.call({
                        $: h
                    }, a));
                    h = d
                }
                return b
            },
            getDocument: function() {
                return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
            },
            getIndex: function(a) {
                var b = this.$,
                    c = -1,
                    h;
                if (!this.$.parentNode) return c;
                do
                    if (!a || !(b != this.$ && b.nodeType == CKEDITOR.NODE_TEXT && (h || !b.nodeValue))) {
                        c++;
                        h = b.nodeType == CKEDITOR.NODE_TEXT
                    }
                while (b = b.previousSibling);
                return c
            },
            getNextSourceNode: function(a, b, c) {
                if (c && !c.call) var h = c,
                    c = function(a) {
                        return !a.equals(h)
                    };
                var a = !a && this.getFirst && this.getFirst(),
                    d;
                if (!a) {
                    if (this.type == CKEDITOR.NODE_ELEMENT && c && c(this, true) === false) return null;
                    a = this.getNext()
                }
                for (; !a && (d = (d || this).getParent());) {
                    if (c && c(d, true) === false) return null;
                    a = d.getNext()
                }
                return !a || c && c(a) === false ? null : b && b != a.type ? a.getNextSourceNode(false, b, c) : a
            },
            getPreviousSourceNode: function(a, b, c) {
                if (c && !c.call) var h = c,
                    c = function(a) {
                        return !a.equals(h)
                    };
                var a = !a && this.getLast && this.getLast(),
                    d;
                if (!a) {
                    if (this.type == CKEDITOR.NODE_ELEMENT && c && c(this, true) === false) return null;
                    a = this.getPrevious()
                }
                for (; !a && (d = (d || this).getParent());) {
                    if (c && c(d, true) === false) return null;
                    a = d.getPrevious()
                }
                return !a || c && c(a) === false ? null : b && a.type != b ? a.getPreviousSourceNode(false, b, c) : a
            },
            getPrevious: function(a) {
                var b = this.$,
                    c;
                do c = (b = b.previousSibling) && b.nodeType != 10 && new CKEDITOR.dom.node(b); while (c && a && !a(c));
                return c
            },
            getNext: function(a) {
                var b = this.$,
                    c;
                do c = (b = b.nextSibling) &&
                    new CKEDITOR.dom.node(b); while (c && a && !a(c));
                return c
            },
            getParent: function(a) {
                var b = this.$.parentNode;
                return b && (b.nodeType == CKEDITOR.NODE_ELEMENT || a && b.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(b) : null
            },
            getParents: function(a) {
                var b = this,
                    c = [];
                do c[a ? "push" : "unshift"](b); while (b = b.getParent());
                return c
            },
            getCommonAncestor: function(a) {
                if (a.equals(this)) return this;
                if (a.contains && a.contains(this)) return a;
                var b = this.contains ? this : this.getParent();
                do
                    if (b.contains(a)) return b;
                while (b =
                    b.getParent());
                return null
            },
            getPosition: function(a) {
                var b = this.$,
                    c = a.$;
                if (b.compareDocumentPosition) return b.compareDocumentPosition(c);
                if (b == c) return CKEDITOR.POSITION_IDENTICAL;
                if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
                    if (b.contains) {
                        if (b.contains(c)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
                        if (c.contains(b)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                    }
                    if ("sourceIndex" in b) return b.sourceIndex < 0 || c.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED :
                        b.sourceIndex < c.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
                }
                for (var b = this.getAddress(), a = a.getAddress(), c = Math.min(b.length, a.length), h = 0; h <= c - 1; h++)
                    if (b[h] != a[h]) {
                        if (h < c) return b[h] < a[h] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
                        break
                    }
                return b.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
            },
            getAscendant: function(a, b) {
                var c = this.$,
                    h;
                if (!b) c = c.parentNode;
                for (; c;) {
                    if (c.nodeName &&
                        (h = c.nodeName.toLowerCase(), typeof a == "string" ? h == a : h in a)) return new CKEDITOR.dom.node(c);
                    c = c.parentNode
                }
                return null
            },
            hasAscendant: function(a, b) {
                var c = this.$;
                if (!b) c = c.parentNode;
                for (; c;) {
                    if (c.nodeName && c.nodeName.toLowerCase() == a) return true;
                    c = c.parentNode
                }
                return false
            },
            move: function(a, b) {
                a.append(this.remove(), b)
            },
            remove: function(a) {
                var b = this.$,
                    c = b.parentNode;
                if (c) {
                    if (a)
                        for (; a = b.firstChild;) c.insertBefore(b.removeChild(a), b);
                    c.removeChild(b)
                }
                return this
            },
            replace: function(a) {
                this.insertBefore(a);
                a.remove()
            },
            trim: function() {
                this.ltrim();
                this.rtrim()
            },
            ltrim: function() {
                for (var a; this.getFirst && (a = this.getFirst());) {
                    if (a.type == CKEDITOR.NODE_TEXT) {
                        var b = CKEDITOR.tools.ltrim(a.getText()),
                            c = a.getLength();
                        if (b) {
                            if (b.length < c) {
                                a.split(c - b.length);
                                this.$.removeChild(this.$.firstChild)
                            }
                        } else {
                            a.remove();
                            continue
                        }
                    }
                    break
                }
            },
            rtrim: function() {
                for (var a; this.getLast && (a = this.getLast());) {
                    if (a.type == CKEDITOR.NODE_TEXT) {
                        var b = CKEDITOR.tools.rtrim(a.getText()),
                            c = a.getLength();
                        if (b) {
                            if (b.length < c) {
                                a.split(b.length);
                                this.$.lastChild.parentNode.removeChild(this.$.lastChild)
                            }
                        } else {
                            a.remove();
                            continue
                        }
                    }
                    break
                }
                if (!CKEDITOR.env.ie && !CKEDITOR.env.opera)(a = this.$.lastChild) && (a.type == 1 && a.nodeName.toLowerCase() == "br") && a.parentNode.removeChild(a)
            },
            isReadOnly: function() {
                var a = this;
                this.type != CKEDITOR.NODE_ELEMENT && (a = this.getParent());
                if (a && typeof a.$.isContentEditable != "undefined") return !(a.$.isContentEditable || a.data("cke-editable"));
                for (; a;) {
                    if (a.data("cke-editable")) break;
                    if (a.getAttribute("contentEditable") == "false") return true;
                    if (a.getAttribute("contentEditable") == "true") break;
                    a = a.getParent()
                }
                return !a
            }
        });
        CKEDITOR.dom.window = function(a) {
            CKEDITOR.dom.domObject.call(this, a)
        };
        CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject;
        CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
            focus: function() {
                this.$.focus()
            },
            getViewPaneSize: function() {
                var a = this.$.document,
                    b = a.compatMode == "CSS1Compat";
                return {
                    width: (b ? a.documentElement.clientWidth : a.body.clientWidth) || 0,
                    height: (b ? a.documentElement.clientHeight : a.body.clientHeight) ||
                        0
                }
            },
            getScrollPosition: function() {
                var a = this.$;
                if ("pageXOffset" in a) return {
                    x: a.pageXOffset || 0,
                    y: a.pageYOffset || 0
                };
                a = a.document;
                return {
                    x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
                    y: a.documentElement.scrollTop || a.body.scrollTop || 0
                }
            },
            getFrame: function() {
                var a = this.$.frameElement;
                return a ? new CKEDITOR.dom.element.get(a) : null
            }
        });
        CKEDITOR.dom.document = function(a) {
            CKEDITOR.dom.domObject.call(this, a)
        };
        CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject;
        CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
            type: CKEDITOR.NODE_DOCUMENT,
            appendStyleSheet: function(a) {
                if (this.$.createStyleSheet) this.$.createStyleSheet(a);
                else {
                    var b = new CKEDITOR.dom.element("link");
                    b.setAttributes({
                        rel: "stylesheet",
                        type: "text/css",
                        href: a
                    });
                    this.getHead().append(b)
                }
            },
            appendStyleText: function(a) {
                if (this.$.createStyleSheet) {
                    var b = this.$.createStyleSheet("");
                    b.cssText = a
                } else {
                    var c = new CKEDITOR.dom.element("style", this);
                    c.append(new CKEDITOR.dom.text(a, this));
                    this.getHead().append(c)
                }
                return b || c.$.sheet
            },
            createElement: function(a,
                b) {
                var c = new CKEDITOR.dom.element(a, this);
                if (b) {
                    b.attributes && c.setAttributes(b.attributes);
                    b.styles && c.setStyles(b.styles)
                }
                return c
            },
            createText: function(a) {
                return new CKEDITOR.dom.text(a, this)
            },
            focus: function() {
                this.getWindow().focus()
            },
            getActive: function() {
                return new CKEDITOR.dom.element(this.$.activeElement)
            },
            getById: function(a) {
                return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null
            },
            getByAddress: function(a, b) {
                for (var c = this.$.documentElement, h = 0; c && h < a.length; h++) {
                    var d = a[h];
                    if (b)
                        for (var i = -1, f = 0; f < c.childNodes.length; f++) {
                            var e = c.childNodes[f];
                            if (!(b === true && e.nodeType == 3 && e.previousSibling && e.previousSibling.nodeType == 3)) {
                                i++;
                                if (i == d) {
                                    c = e;
                                    break
                                }
                            }
                        } else c = c.childNodes[d]
                }
                return c ? new CKEDITOR.dom.node(c) : null
            },
            getElementsByTag: function(a, b) {
                if ((!CKEDITOR.env.ie || document.documentMode > 8) && b) a = b + ":" + a;
                return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))
            },
            getHead: function() {
                var a = this.$.getElementsByTagName("head")[0];
                return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"),
                    true)
            },
            getBody: function() {
                return new CKEDITOR.dom.element(this.$.body)
            },
            getDocumentElement: function() {
                return new CKEDITOR.dom.element(this.$.documentElement)
            },
            getWindow: function() {
                var a = new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView);
                return (this.getWindow = function() {
                    return a
                })()
            },
            write: function(a) {
                this.$.open("text/html", "replace");
                CKEDITOR.env.isCustomDomain() && (this.$.domain = document.domain);
                this.$.write(a);
                this.$.close()
            }
        });
        CKEDITOR.dom.nodeList = function(a) {
            this.$ = a
        };
        CKEDITOR.dom.nodeList.prototype = {
            count: function() {
                return this.$.length
            },
            getItem: function(a) {
                if (a < 0 || a >= this.$.length) return null;
                return (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null
            }
        };
        CKEDITOR.dom.element = function(a, b) {
            typeof a == "string" && (a = (b ? b.$ : document).createElement(a));
            CKEDITOR.dom.domObject.call(this, a)
        };
        CKEDITOR.dom.element.get = function(a) {
            return (a = typeof a == "string" ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a))
        };
        CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node;
        CKEDITOR.dom.element.createFromHtml =
            function(a, b) {
                var c = new CKEDITOR.dom.element("div", b);
                c.setHtml(a);
                return c.getFirst().remove()
            };
        CKEDITOR.dom.element.setMarker = function(a, b, c, h) {
            var d = b.getCustomData("list_marker_id") || b.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
                i = b.getCustomData("list_marker_names") || b.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
            a[d] = b;
            i[c] = 1;
            return b.setCustomData(c, h)
        };
        CKEDITOR.dom.element.clearAllMarkers = function(a) {
            for (var b in a) CKEDITOR.dom.element.clearMarkers(a,
                a[b], 1)
        };
        CKEDITOR.dom.element.clearMarkers = function(a, b, c) {
            var h = b.getCustomData("list_marker_names"),
                d = b.getCustomData("list_marker_id"),
                i;
            for (i in h) b.removeCustomData(i);
            b.removeCustomData("list_marker_names");
            if (c) {
                b.removeCustomData("list_marker_id");
                delete a[d]
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT,
            addClass: function(a) {
                var b = this.$.className;
                b && (RegExp("(?:^|\\s)" + a + "(?:\\s|$)", "").test(b) || (b = b + (" " + a)));
                this.$.className = b || a
            },
            removeClass: function(a) {
                var b =
                    this.getAttribute("class");
                if (b) {
                    a = RegExp("(?:^|\\s+)" + a + "(?=\\s|$)", "i");
                    if (a.test(b))(b = b.replace(a, "").replace(/^\s+/, "")) ? this.setAttribute("class", b) : this.removeAttribute("class")
                }
            },
            hasClass: function(a) {
                return RegExp("(?:^|\\s+)" + a + "(?=\\s|$)", "").test(this.getAttribute("class"))
            },
            append: function(a, b) {
                typeof a == "string" && (a = this.getDocument().createElement(a));
                b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
                return a
            },
            appendHtml: function(a) {
                if (this.$.childNodes.length) {
                    var b =
                        new CKEDITOR.dom.element("div", this.getDocument());
                    b.setHtml(a);
                    b.moveChildren(this)
                } else this.setHtml(a)
            },
            appendText: function(a) {
                this.$.text != void 0 ? this.$.text = this.$.text + a : this.append(new CKEDITOR.dom.text(a))
            },
            appendBogus: function() {
                for (var a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());) a = a.getPrevious();
                if (!a || !a.is || !a.is("br")) {
                    a = CKEDITOR.env.opera ? this.getDocument().createText("") : this.getDocument().createElement("br");
                    CKEDITOR.env.gecko && a.setAttribute("type",
                        "_moz");
                    this.append(a)
                }
            },
            breakParent: function(a) {
                var b = new CKEDITOR.dom.range(this.getDocument());
                b.setStartAfter(this);
                b.setEndAfter(a);
                a = b.extractContents();
                b.insertNode(this.remove());
                a.insertAfterNode(this)
            },
            contains: CKEDITOR.env.ie || CKEDITOR.env.webkit ? function(a) {
                var b = this.$;
                return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$)
            } : function(a) {
                return !!(this.$.compareDocumentPosition(a.$) & 16)
            },
            focus: function() {
                function a() {
                    try {
                        this.$.focus()
                    } catch (a) {}
                }
                return function(b) {
                    b ?
                        CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this)
                }
            }(),
            getHtml: function() {
                var a = this.$.innerHTML;
                return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a
            },
            getOuterHtml: function() {
                if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                var a = this.$.ownerDocument.createElement("div");
                a.appendChild(this.$.cloneNode(true));
                return a.innerHTML
            },
            getClientRect: function() {
                var a = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                !a.width && (a.width = a.right - a.left);
                !a.height && (a.height = a.bottom -
                    a.top);
                return a
            },
            setHtml: function() {
                var a = function(a) {
                    return this.$.innerHTML = a
                };
                return CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function(a) {
                    try {
                        return this.$.innerHTML = a
                    } catch (c) {
                        this.$.innerHTML = "";
                        var h = new CKEDITOR.dom.element("body", this.getDocument());
                        h.$.innerHTML = a;
                        for (h = h.getChildren(); h.count();) this.append(h.getItem(0));
                        return a
                    }
                } : a
            }(),
            setText: function(a) {
                CKEDITOR.dom.element.prototype.setText = this.$.innerText != void 0 ? function(a) {
                    return this.$.innerText = a
                } : function(a) {
                    return this.$.textContent =
                        a
                };
                return this.setText(a)
            },
            getAttribute: function() {
                var a = function(a) {
                    return this.$.getAttribute(a, 2)
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(a) {
                    switch (a) {
                        case "class":
                            a = "className";
                            break;
                        case "http-equiv":
                            a = "httpEquiv";
                            break;
                        case "name":
                            return this.$.name;
                        case "tabindex":
                            a = this.$.getAttribute(a, 2);
                            a !== 0 && this.$.tabIndex === 0 && (a = null);
                            return a;
                        case "checked":
                            a = this.$.attributes.getNamedItem(a);
                            return (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
                        case "hspace":
                        case "value":
                            return this.$[a];
                        case "style":
                            return this.$.style.cssText;
                        case "contenteditable":
                        case "contentEditable":
                            return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                    }
                    return this.$.getAttribute(a, 2)
                } : a
            }(),
            getChildren: function() {
                return new CKEDITOR.dom.nodeList(this.$.childNodes)
            },
            getComputedStyle: CKEDITOR.env.ie ? function(a) {
                return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]
            } : function(a) {
                return this.getWindow().$.getComputedStyle(this.$,
                    "").getPropertyValue(a)
            },
            getDtd: function() {
                var a = CKEDITOR.dtd[this.getName()];
                this.getDtd = function() {
                    return a
                };
                return a
            },
            getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
            getTabIndex: CKEDITOR.env.ie ? function() {
                var a = this.$.tabIndex;
                a === 0 && (!CKEDITOR.dtd.$tabIndex[this.getName()] && parseInt(this.getAttribute("tabindex"), 10) !== 0) && (a = -1);
                return a
            } : CKEDITOR.env.webkit ? function() {
                var a = this.$.tabIndex;
                if (a == void 0) {
                    a = parseInt(this.getAttribute("tabindex"), 10);
                    isNaN(a) && (a = -1)
                }
                return a
            } : function() {
                return this.$.tabIndex
            },
            getText: function() {
                return this.$.textContent || this.$.innerText || ""
            },
            getWindow: function() {
                return this.getDocument().getWindow()
            },
            getId: function() {
                return this.$.id || null
            },
            getNameAtt: function() {
                return this.$.name || null
            },
            getName: function() {
                var a = this.$.nodeName.toLowerCase();
                if (CKEDITOR.env.ie && !(document.documentMode > 8)) {
                    var b = this.$.scopeName;
                    b != "HTML" && (a = b.toLowerCase() + ":" + a)
                }
                return (this.getName = function() {
                    return a
                })()
            },
            getValue: function() {
                return this.$.value
            },
            getFirst: function(a) {
                var b = this.$.firstChild;
                (b = b && new CKEDITOR.dom.node(b)) && (a && !a(b)) && (b = b.getNext(a));
                return b
            },
            getLast: function(a) {
                var b = this.$.lastChild;
                (b = b && new CKEDITOR.dom.node(b)) && (a && !a(b)) && (b = b.getPrevious(a));
                return b
            },
            getStyle: function(a) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]
            },
            is: function() {
                var a = this.getName();
                if (typeof arguments[0] == "object") return !!arguments[0][a];
                for (var b = 0; b < arguments.length; b++)
                    if (arguments[b] == a) return true;
                return false
            },
            isEditable: function(a) {
                var b =
                    this.getName();
                if (this.isReadOnly() || this.getComputedStyle("display") == "none" || this.getComputedStyle("visibility") == "hidden" || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount()) return false;
                if (a !== false) {
                    a = CKEDITOR.dtd[b] || CKEDITOR.dtd.span;
                    return !(!a || !a["#"])
                }
                return true
            },
            isIdentical: function(a) {
                var b = this.clone(0, 1),
                    a = a.clone(0, 1);
                b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href",
                    "data-cke-saved-name"
                ]);
                a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                if (b.$.isEqualNode) {
                    b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText);
                    a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText);
                    return b.$.isEqualNode(a.$)
                }
                b = b.getOuterHtml();
                a = a.getOuterHtml();
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
                    var c = this.getParent();
                    if (c.type == CKEDITOR.NODE_ELEMENT) {
                        c = c.clone();
                        c.setHtml(b);
                        b = c.getHtml();
                        c.setHtml(a);
                        a = c.getHtml()
                    }
                }
                return b == a
            },
            isVisible: function() {
                var a = (this.$.offsetHeight || this.$.offsetWidth) && this.getComputedStyle("visibility") != "hidden",
                    b, c;
                if (a && (CKEDITOR.env.webkit || CKEDITOR.env.opera)) {
                    b = this.getWindow();
                    if (!b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement)) a = (new CKEDITOR.dom.element(c)).isVisible()
                }
                return !!a
            },
            isEmptyInlineRemoveable: function() {
                if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return false;
                for (var a = this.getChildren(), b = 0, c = a.count(); b < c; b++) {
                    var h = a.getItem(b);
                    if (!(h.type == CKEDITOR.NODE_ELEMENT && h.data("cke-bookmark")) && (h.type == CKEDITOR.NODE_ELEMENT && !h.isEmptyInlineRemoveable() || h.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(h.getText()))) return false
                }
                return true
            },
            hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function() {
                for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                    var c = a[b];
                    switch (c.nodeName) {
                        case "class":
                            if (this.getAttribute("class")) return true;
                        case "data-cke-expando":
                            continue;
                        default:
                            if (c.specified) return true
                    }
                }
                return false
            } : function() {
                var a = this.$.attributes,
                    b = a.length,
                    c = {
                        "data-cke-expando": 1,
                        _moz_dirty: 1
                    };
                return b > 0 && (b > 2 || !c[a[0].nodeName] || b == 2 && !c[a[1].nodeName])
            },
            hasAttribute: function() {
                function a(a) {
                    a = this.$.attributes.getNamedItem(a);
                    return !(!a || !a.specified)
                }
                return CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? function(b) {
                    return b == "name" ? !!this.$.name : a.call(this, b)
                } : a
            }(),
            hide: function() {
                this.setStyle("display", "none")
            },
            moveChildren: function(a, b) {
                var c = this.$,
                    a = a.$;
                if (c != a) {
                    var h;
                    if (b)
                        for (; h = c.lastChild;) a.insertBefore(c.removeChild(h),
                            a.firstChild);
                    else
                        for (; h = c.firstChild;) a.appendChild(c.removeChild(h))
                }
            },
            mergeSiblings: function() {
                function a(a, c, h) {
                    if (c && c.type == CKEDITOR.NODE_ELEMENT) {
                        for (var d = []; c.data("cke-bookmark") || c.isEmptyInlineRemoveable();) {
                            d.push(c);
                            c = h ? c.getNext() : c.getPrevious();
                            if (!c || c.type != CKEDITOR.NODE_ELEMENT) return
                        }
                        if (a.isIdentical(c)) {
                            for (var i = h ? a.getLast() : a.getFirst(); d.length;) d.shift().move(a, !h);
                            c.moveChildren(a, !h);
                            c.remove();
                            i && i.type == CKEDITOR.NODE_ELEMENT && i.mergeSiblings()
                        }
                    }
                }
                return function(b) {
                    if (b ===
                        false || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) {
                        a(this, this.getNext(), true);
                        a(this, this.getPrevious())
                    }
                }
            }(),
            show: function() {
                this.setStyles({
                    display: "",
                    visibility: ""
                })
            },
            setAttribute: function() {
                var a = function(a, c) {
                    this.$.setAttribute(a, c);
                    return this
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(b, c) {
                    b == "class" ? this.$.className = c : b == "style" ? this.$.style.cssText = c : b == "tabindex" ? this.$.tabIndex = c : b == "checked" ? this.$.checked = c : b == "contenteditable" ? a.call(this,
                        "contentEditable", c) : a.apply(this, arguments);
                    return this
                } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(b, c) {
                    if (b == "src" && c.match(/^http:\/\//)) try {
                        a.apply(this, arguments)
                    } catch (h) {} else a.apply(this, arguments);
                    return this
                } : a
            }(),
            setAttributes: function(a) {
                for (var b in a) this.setAttribute(b, a[b]);
                return this
            },
            setValue: function(a) {
                this.$.value = a;
                return this
            },
            removeAttribute: function() {
                var a = function(a) {
                    this.$.removeAttribute(a)
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ?
                    function(a) {
                        a == "class" ? a = "className" : a == "tabindex" ? a = "tabIndex" : a == "contenteditable" && (a = "contentEditable");
                        this.$.removeAttribute(a)
                    } : a
            }(),
            removeAttributes: function(a) {
                if (CKEDITOR.tools.isArray(a))
                    for (var b = 0; b < a.length; b++) this.removeAttribute(a[b]);
                else
                    for (b in a) a.hasOwnProperty(b) && this.removeAttribute(b)
            },
            removeStyle: function(a) {
                var b = this.$.style;
                b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a));
                this.$.style.cssText || this.removeAttribute("style")
            },
            setStyle: function(a, b) {
                this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
                return this
            },
            setStyles: function(a) {
                for (var b in a) this.setStyle(b, a[b]);
                return this
            },
            setOpacity: function(a) {
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
                    a = Math.round(a * 100);
                    this.setStyle("filter", a >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + a + ")")
                } else this.setStyle("opacity", a)
            },
            unselectable: function() {
                this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none"));
                if (CKEDITOR.env.ie || CKEDITOR.env.opera) {
                    this.setAttribute("unselectable",
                        "on");
                    for (var a, b = this.getElementsByTag("*"), c = 0, h = b.count(); c < h; c++) {
                        a = b.getItem(c);
                        a.setAttribute("unselectable", "on")
                    }
                }
            },
            getPositionedAncestor: function() {
                for (var a = this; a.getName() != "html";) {
                    if (a.getComputedStyle("position") != "static") return a;
                    a = a.getParent()
                }
                return null
            },
            getDocumentPosition: function(a) {
                var b = 0,
                    c = 0,
                    h = this.getDocument(),
                    d = h.getBody(),
                    i = h.$.compatMode == "BackCompat";
                if (document.documentElement.getBoundingClientRect) {
                    var f = this.$.getBoundingClientRect(),
                        e = h.$.documentElement,
                        g = e.clientTop ||
                        d.$.clientTop || 0,
                        j = e.clientLeft || d.$.clientLeft || 0,
                        k = true;
                    if (CKEDITOR.env.ie) {
                        k = h.getDocumentElement().contains(this);
                        h = h.getBody().contains(this);
                        k = i && h || !i && k
                    }
                    if (k) {
                        b = f.left + (!i && e.scrollLeft || d.$.scrollLeft);
                        b = b - j;
                        c = f.top + (!i && e.scrollTop || d.$.scrollTop);
                        c = c - g
                    }
                } else {
                    d = this;
                    for (h = null; d && !(d.getName() == "body" || d.getName() == "html");) {
                        b = b + (d.$.offsetLeft - d.$.scrollLeft);
                        c = c + (d.$.offsetTop - d.$.scrollTop);
                        if (!d.equals(this)) {
                            b = b + (d.$.clientLeft || 0);
                            c = c + (d.$.clientTop || 0)
                        }
                        for (; h && !h.equals(d);) {
                            b = b -
                                h.$.scrollLeft;
                            c = c - h.$.scrollTop;
                            h = h.getParent()
                        }
                        h = d;
                        d = (f = d.$.offsetParent) ? new CKEDITOR.dom.element(f) : null
                    }
                }
                if (a) {
                    d = this.getWindow();
                    h = a.getWindow();
                    if (!d.equals(h) && d.$.frameElement) {
                        a = (new CKEDITOR.dom.element(d.$.frameElement)).getDocumentPosition(a);
                        b = b + a.x;
                        c = c + a.y
                    }
                }
                if (!document.documentElement.getBoundingClientRect && CKEDITOR.env.gecko && !i) {
                    b = b + (this.$.clientLeft ? 1 : 0);
                    c = c + (this.$.clientTop ? 1 : 0)
                }
                return {
                    x: b,
                    y: c
                }
            },
            scrollIntoView: function(a) {
                var b = this.getParent();
                if (b) {
                    do {
                        (b.$.clientWidth && b.$.clientWidth <
                            b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && this.scrollIntoParent(b, a, 1);
                        if (b.is("html")) {
                            var c = b.getWindow();
                            try {
                                var h = c.$.frameElement;
                                h && (b = new CKEDITOR.dom.element(h))
                            } catch (d) {}
                        }
                    } while (b = b.getParent())
                }
            },
            scrollIntoParent: function(a, b, c) {
                var h, d, i, f;

                function e(j, b) {
                    if (/body|html/.test(a.getName())) a.getWindow().$.scrollBy(j, b);
                    else {
                        a.$.scrollLeft = a.$.scrollLeft + j;
                        a.$.scrollTop = a.$.scrollTop + b
                    }
                }

                function g(a, j) {
                    var b = {
                        x: 0,
                        y: 0
                    };
                    if (!a.is(k ? "body" : "html")) {
                        var c = a.$.getBoundingClientRect();
                        b.x = c.left;
                        b.y = c.top
                    }
                    c = a.getWindow();
                    if (!c.equals(j)) {
                        c = g(CKEDITOR.dom.element.get(c.$.frameElement), j);
                        b.x = b.x + c.x;
                        b.y = b.y + c.y
                    }
                    return b
                }

                function j(a, j) {
                    return parseInt(a.getComputedStyle("margin-" + j) || 0, 10) || 0
                }!a && (a = this.getWindow());
                i = a.getDocument();
                var k = i.$.compatMode == "BackCompat";
                a instanceof CKEDITOR.dom.window && (a = k ? i.getBody() : i.getDocumentElement());
                i = a.getWindow();
                d = g(this, i);
                var q = g(a, i),
                    l = this.$.offsetHeight;
                h = this.$.offsetWidth;
                var n = a.$.clientHeight,
                    o = a.$.clientWidth;
                i = d.x - j(this,
                    "left") - q.x || 0;
                f = d.y - j(this, "top") - q.y || 0;
                h = d.x + h + j(this, "right") - (q.x + o) || 0;
                d = d.y + l + j(this, "bottom") - (q.y + n) || 0;
                if (f < 0 || d > 0) e(0, b === true ? f : b === false ? d : f < 0 ? f : d);
                if (c && (i < 0 || h > 0)) e(i < 0 ? i : h, 0)
            },
            setState: function(a, b, c) {
                b = b || "cke";
                switch (a) {
                    case CKEDITOR.TRISTATE_ON:
                        this.addClass(b + "_on");
                        this.removeClass(b + "_off");
                        this.removeClass(b + "_disabled");
                        c && this.setAttribute("aria-pressed", true);
                        c && this.removeAttribute("aria-disabled");
                        break;
                    case CKEDITOR.TRISTATE_DISABLED:
                        this.addClass(b + "_disabled");
                        this.removeClass(b +
                            "_off");
                        this.removeClass(b + "_on");
                        c && this.setAttribute("aria-disabled", true);
                        c && this.removeAttribute("aria-pressed");
                        break;
                    default:
                        this.addClass(b + "_off");
                        this.removeClass(b + "_on");
                        this.removeClass(b + "_disabled");
                        c && this.removeAttribute("aria-pressed");
                        c && this.removeAttribute("aria-disabled")
                }
            },
            getFrameDocument: function() {
                var a = this.$;
                try {
                    a.contentWindow.document
                } catch (b) {
                    a.src = a.src;
                    CKEDITOR.env.ie && CKEDITOR.env.version < 7 && window.showModalDialog('javascript:document.write("<script>window.setTimeout(function(){window.close();},50);<\/script>")')
                }
                return a &&
                    new CKEDITOR.dom.document(a.contentWindow.document)
            },
            copyAttributes: function(a, b) {
                for (var c = this.$.attributes, b = b || {}, h = 0; h < c.length; h++) {
                    var d = c[h],
                        i = d.nodeName.toLowerCase(),
                        f;
                    if (!(i in b))
                        if (i == "checked" && (f = this.getAttribute(i))) a.setAttribute(i, f);
                        else if (d.specified || CKEDITOR.env.ie && d.nodeValue && i == "value") {
                        f = this.getAttribute(i);
                        if (f === null) f = d.nodeValue;
                        a.setAttribute(i, f)
                    }
                }
                if (this.$.style.cssText !== "") a.$.style.cssText = this.$.style.cssText
            },
            renameNode: function(a) {
                if (this.getName() != a) {
                    var b =
                        this.getDocument(),
                        a = new CKEDITOR.dom.element(a, b);
                    this.copyAttributes(a);
                    this.moveChildren(a);
                    this.getParent() && this.$.parentNode.replaceChild(a.$, this.$);
                    a.$["data-cke-expando"] = this.$["data-cke-expando"];
                    this.$ = a.$
                }
            },
            getChild: function() {
                function a(a, c) {
                    var h = a.childNodes;
                    if (c >= 0 && c < h.length) return h[c]
                }
                return function(b) {
                    var c = this.$;
                    if (b.slice)
                        for (; b.length > 0 && c;) c = a(c, b.shift());
                    else c = a(c, b);
                    return c ? new CKEDITOR.dom.node(c) : null
                }
            }(),
            getChildCount: function() {
                return this.$.childNodes.length
            },
            disableContextMenu: function() {
                this.on("contextmenu", function(a) {
                    a.data.getTarget().hasClass("cke_enable_context_menu") || a.data.preventDefault()
                })
            },
            getDirection: function(a) {
                return a ? this.getComputedStyle("direction") || this.getDirection() || this.getDocument().$.dir || this.getDocument().getBody().getDirection(1) : this.getStyle("direction") || this.getAttribute("dir")
            },
            data: function(a, b) {
                a = "data-" + a;
                if (b === void 0) return this.getAttribute(a);
                b === false ? this.removeAttribute(a) : this.setAttribute(a, b);
                return null
            },
            getEditor: function() {
                var a = CKEDITOR.instances,
                    b, c;
                for (b in a) {
                    c = a[b];
                    if (c.element.equals(this) && c.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) return c
                }
                return null
            }
        });
        (function() {
            function a(a) {
                for (var h = 0, d = 0, i = b[a].length; d < i; d++) h = h + (parseInt(this.getComputedStyle(b[a][d]) || 0, 10) || 0);
                return h
            }
            var b = {
                width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
                height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
            };
            CKEDITOR.dom.element.prototype.setSize =
                function(b, h, d) {
                    if (typeof h == "number") {
                        if (d && (!CKEDITOR.env.ie || !CKEDITOR.env.quirks)) h = h - a.call(this, b);
                        this.setStyle(b, h + "px")
                    }
                };
            CKEDITOR.dom.element.prototype.getSize = function(b, h) {
                var d = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(b)], this.$["client" + CKEDITOR.tools.capitalize(b)]) || 0;
                h && (d = d - a.call(this, b));
                return d
            }
        })();
        CKEDITOR.dom.documentFragment = function(a) {
            a = a || CKEDITOR.document;
            this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a
        };
        CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
            CKEDITOR.dom.element.prototype, {
                type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
                insertAfterNode: function(a) {
                    a = a.$;
                    a.parentNode.insertBefore(this.$, a.nextSibling)
                }
            }, !0, {
                append: 1,
                appendBogus: 1,
                getFirst: 1,
                getLast: 1,
                getParent: 1,
                getNext: 1,
                getPrevious: 1,
                appendTo: 1,
                moveChildren: 1,
                insertBefore: 1,
                insertAfterNode: 1,
                replace: 1,
                trim: 1,
                type: 1,
                ltrim: 1,
                rtrim: 1,
                getDocument: 1,
                getChildCount: 1,
                getChild: 1,
                getChildren: 1
            });
        (function() {
            function a(a, b) {
                var c = this.range;
                if (this._.end) return null;
                if (!this._.start) {
                    this._.start = 1;
                    if (c.collapsed) {
                        this.end();
                        return null
                    }
                    c.optimize()
                }
                var j, k = c.startContainer;
                j = c.endContainer;
                var h = c.startOffset,
                    d = c.endOffset,
                    i, o = this.guard,
                    m = this.type,
                    p = a ? "getPreviousSourceNode" : "getNextSourceNode";
                if (!a && !this._.guardLTR) {
                    var s = j.type == CKEDITOR.NODE_ELEMENT ? j : j.getParent(),
                        r = j.type == CKEDITOR.NODE_ELEMENT ? j.getChild(d) : j.getNext();
                    this._.guardLTR = function(a, j) {
                        return (!j || !s.equals(a)) && (!r || !a.equals(r)) && (a.type != CKEDITOR.NODE_ELEMENT || !j || !a.equals(c.root))
                    }
                }
                if (a && !this._.guardRTL) {
                    var t = k.type == CKEDITOR.NODE_ELEMENT ?
                        k : k.getParent(),
                        u = k.type == CKEDITOR.NODE_ELEMENT ? h ? k.getChild(h - 1) : null : k.getPrevious();
                    this._.guardRTL = function(a, j) {
                        return (!j || !t.equals(a)) && (!u || !a.equals(u)) && (a.type != CKEDITOR.NODE_ELEMENT || !j || !a.equals(c.root))
                    }
                }
                var v = a ? this._.guardRTL : this._.guardLTR;
                i = o ? function(a, j) {
                    return v(a, j) === false ? false : o(a, j)
                } : v;
                if (this.current) j = this.current[p](false, m, i);
                else {
                    if (a) j.type == CKEDITOR.NODE_ELEMENT && (j = d > 0 ? j.getChild(d - 1) : i(j, true) === false ? null : j.getPreviousSourceNode(true, m, i));
                    else {
                        j = k;
                        if (j.type ==
                            CKEDITOR.NODE_ELEMENT && !(j = j.getChild(h))) j = i(k, true) === false ? null : k.getNextSourceNode(true, m, i)
                    }
                    j && i(j) === false && (j = null)
                }
                for (; j && !this._.end;) {
                    this.current = j;
                    if (!this.evaluator || this.evaluator(j) !== false) {
                        if (!b) return j
                    } else if (b && this.evaluator) return false;
                    j = j[p](false, m, i)
                }
                this.end();
                return this.current = null
            }

            function b(b) {
                for (var c, g = null; c = a.call(this, b);) g = c;
                return g
            }
            CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
                $: function(a) {
                    this.range = a;
                    this._ = {}
                },
                proto: {
                    end: function() {
                        this._.end = 1
                    },
                    next: function() {
                        return a.call(this)
                    },
                    previous: function() {
                        return a.call(this, 1)
                    },
                    checkForward: function() {
                        return a.call(this, 0, 1) !== false
                    },
                    checkBackward: function() {
                        return a.call(this, 1, 1) !== false
                    },
                    lastForward: function() {
                        return b.call(this)
                    },
                    lastBackward: function() {
                        return b.call(this, 1)
                    },
                    reset: function() {
                        delete this.current;
                        this._ = {}
                    }
                }
            });
            var c = {
                block: 1,
                "list-item": 1,
                table: 1,
                "table-row-group": 1,
                "table-header-group": 1,
                "table-footer-group": 1,
                "table-row": 1,
                "table-column-group": 1,
                "table-column": 1,
                "table-cell": 1,
                "table-caption": 1
            };
            CKEDITOR.dom.element.prototype.isBlockBoundary =
                function(a) {
                    a = a ? CKEDITOR.tools.extend({}, CKEDITOR.dtd.$block, a || {}) : CKEDITOR.dtd.$block;
                    return this.getComputedStyle("float") == "none" && c[this.getComputedStyle("display")] || a[this.getName()]
                };
            CKEDITOR.dom.walker.blockBoundary = function(a) {
                return function(b) {
                    return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a))
                }
            };
            CKEDITOR.dom.walker.listItemBoundary = function() {
                return this.blockBoundary({
                    br: 1
                })
            };
            CKEDITOR.dom.walker.bookmark = function(a, b) {
                function c(a) {
                    return a && a.getName && a.getName() == "span" &&
                        a.data("cke-bookmark")
                }
                return function(j) {
                    var k, h;
                    k = j && !j.getName && (h = j.getParent()) && c(h);
                    k = a ? k : k || c(j);
                    return !!(b ^ k)
                }
            };
            CKEDITOR.dom.walker.whitespaces = function(a) {
                return function(b) {
                    b = b && b.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(b.getText());
                    return !!(a ^ b)
                }
            };
            CKEDITOR.dom.walker.invisible = function(a) {
                var b = CKEDITOR.dom.walker.whitespaces();
                return function(c) {
                    c = b(c) || c.is && !c.$.offsetHeight;
                    return !!(a ^ c)
                }
            };
            CKEDITOR.dom.walker.nodeType = function(a, b) {
                return function(c) {
                    return !!(b ^ c.type == a)
                }
            };
            CKEDITOR.dom.walker.bogus = function(a) {
                function b(a) {
                    return !d(a) && !i(a)
                }
                return function(c) {
                    var j = !CKEDITOR.env.ie ? c.is && c.is("br") : c.getText && h.test(c.getText());
                    if (j) {
                        j = c.getParent();
                        c = c.getNext(b);
                        j = j.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())
                    }
                    return !!(a ^ j)
                }
            };
            var h = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
                d = CKEDITOR.dom.walker.whitespaces(),
                i = CKEDITOR.dom.walker.bookmark();
            CKEDITOR.dom.element.prototype.getBogus = function() {
                var a = this;
                do a = a.getPreviousSourceNode(); while (i(a) ||
                    d(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty));
                return a && (!CKEDITOR.env.ie ? a.is && a.is("br") : a.getText && h.test(a.getText())) ? a : false
            }
        })();
        CKEDITOR.dom.range = function(a) {
            this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
            this.collapsed = true;
            var b = a instanceof CKEDITOR.dom.document;
            this.document = b ? a : a.getDocument();
            this.root = b ? a.getBody() : a
        };
        (function() {
            function a(a) {
                var b = false,
                    c = CKEDITOR.dom.walker.bookmark(true),
                    e = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/;
                return function(g) {
                    if (c(g)) return true;
                    if (g.type == CKEDITOR.NODE_TEXT)
                        if (CKEDITOR.env.ie && e.test(g.getText()) && !b && (!a || !g.getNext())) b = true;
                        else {
                            if (g.hasAscendant("pre") || CKEDITOR.tools.trim(g.getText()).length) return false
                        } else if (g.type == CKEDITOR.NODE_ELEMENT && !i[g.getName()])
                        if (!CKEDITOR.env.ie && g.is("br") && !b && (!a || !g.getNext())) b = true;
                        else return false;
                    return true
                }
            }

            function b(a) {
                return function(b) {
                    return !a && f(b) || (b.type == CKEDITOR.NODE_TEXT ? !CKEDITOR.tools.trim(b.getText()) ||
                        !!b.getParent().data("cke-bookmark") : b.getName() in CKEDITOR.dtd.$removeEmpty)
                }
            }

            function c(a) {
                return !e(a) && !g(a)
            }
            var h = function(a) {
                    a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset
                },
                d = function(a, b, c, e) {
                    a.optimizeBookmark();
                    var g = a.startContainer,
                        f = a.endContainer,
                        h = a.startOffset,
                        d = a.endOffset,
                        i, r;
                    if (f.type == CKEDITOR.NODE_TEXT) f = f.split(d);
                    else if (f.getChildCount() > 0)
                        if (d >= f.getChildCount()) {
                            f = f.append(a.document.createText(""));
                            r = true
                        } else f =
                            f.getChild(d);
                    if (g.type == CKEDITOR.NODE_TEXT) {
                        g.split(h);
                        g.equals(f) && (f = g.getNext())
                    } else if (h)
                        if (h >= g.getChildCount()) {
                            g = g.append(a.document.createText(""));
                            i = true
                        } else g = g.getChild(h).getPrevious();
                    else {
                        g = g.append(a.document.createText(""), 1);
                        i = true
                    }
                    var h = g.getParents(),
                        d = f.getParents(),
                        t, u, v;
                    for (t = 0; t < h.length; t++) {
                        u = h[t];
                        v = d[t];
                        if (!u.equals(v)) break
                    }
                    for (var w = c, x, y, z, D = t; D < h.length; D++) {
                        x = h[D];
                        w && !x.equals(g) && (y = w.append(x.clone()));
                        for (x = x.getNext(); x;) {
                            if (x.equals(d[D]) || x.equals(f)) break;
                            z = x.getNext();
                            if (b == 2) w.append(x.clone(true));
                            else {
                                x.remove();
                                b == 1 && w.append(x)
                            }
                            x = z
                        }
                        w && (w = y)
                    }
                    w = c;
                    for (c = t; c < d.length; c++) {
                        x = d[c];
                        b > 0 && !x.equals(f) && (y = w.append(x.clone()));
                        if (!h[c] || x.$.parentNode != h[c].$.parentNode)
                            for (x = x.getPrevious(); x;) {
                                if (x.equals(h[c]) || x.equals(g)) break;
                                z = x.getPrevious();
                                if (b == 2) w.$.insertBefore(x.$.cloneNode(true), w.$.firstChild);
                                else {
                                    x.remove();
                                    b == 1 && w.$.insertBefore(x.$, w.$.firstChild)
                                }
                                x = z
                            }
                        w && (w = y)
                    }
                    if (b == 2) {
                        u = a.startContainer;
                        if (u.type == CKEDITOR.NODE_TEXT) {
                            u.$.data = u.$.data +
                                u.$.nextSibling.data;
                            u.$.parentNode.removeChild(u.$.nextSibling)
                        }
                        a = a.endContainer;
                        if (a.type == CKEDITOR.NODE_TEXT && a.$.nextSibling) {
                            a.$.data = a.$.data + a.$.nextSibling.data;
                            a.$.parentNode.removeChild(a.$.nextSibling)
                        }
                    } else {
                        if (u && v && (g.$.parentNode != u.$.parentNode || f.$.parentNode != v.$.parentNode)) {
                            b = v.getIndex();
                            i && v.$.parentNode == g.$.parentNode && b--;
                            if (e && u.type == CKEDITOR.NODE_ELEMENT) {
                                e = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', a.document);
                                e.insertAfter(u);
                                u.mergeSiblings(false);
                                a.moveToBookmark({
                                    startNode: e
                                })
                            } else a.setStart(v.getParent(), b)
                        }
                        a.collapse(true)
                    }
                    i && g.remove();
                    r && f.$.parentNode && f.remove()
                },
                i = {
                    abbr: 1,
                    acronym: 1,
                    b: 1,
                    bdo: 1,
                    big: 1,
                    cite: 1,
                    code: 1,
                    del: 1,
                    dfn: 1,
                    em: 1,
                    font: 1,
                    i: 1,
                    ins: 1,
                    label: 1,
                    kbd: 1,
                    q: 1,
                    samp: 1,
                    small: 1,
                    span: 1,
                    strike: 1,
                    strong: 1,
                    sub: 1,
                    sup: 1,
                    tt: 1,
                    u: 1,
                    "var": 1
                },
                f = CKEDITOR.dom.walker.bogus(),
                e = new CKEDITOR.dom.walker.whitespaces,
                g = new CKEDITOR.dom.walker.bookmark;
            CKEDITOR.dom.range.prototype = {
                clone: function() {
                    var a = new CKEDITOR.dom.range(this.root);
                    a.startContainer = this.startContainer;
                    a.startOffset = this.startOffset;
                    a.endContainer = this.endContainer;
                    a.endOffset = this.endOffset;
                    a.collapsed = this.collapsed;
                    return a
                },
                collapse: function(a) {
                    if (a) {
                        this.endContainer = this.startContainer;
                        this.endOffset = this.startOffset
                    } else {
                        this.startContainer = this.endContainer;
                        this.startOffset = this.endOffset
                    }
                    this.collapsed = true
                },
                cloneContents: function() {
                    var a = new CKEDITOR.dom.documentFragment(this.document);
                    this.collapsed || d(this, 2, a);
                    return a
                },
                deleteContents: function(a) {
                    this.collapsed ||
                        d(this, 0, null, a)
                },
                extractContents: function(a) {
                    var b = new CKEDITOR.dom.documentFragment(this.document);
                    this.collapsed || d(this, 1, b, a);
                    return b
                },
                createBookmark: function(a) {
                    var b, c, e, g, f = this.collapsed;
                    b = this.document.createElement("span");
                    b.data("cke-bookmark", 1);
                    b.setStyle("display", "none");
                    b.setHtml("&nbsp;");
                    if (a) {
                        e = "cke_bm_" + CKEDITOR.tools.getNextNumber();
                        b.setAttribute("id", e + (f ? "C" : "S"))
                    }
                    if (!f) {
                        c = b.clone();
                        c.setHtml("&nbsp;");
                        a && c.setAttribute("id", e + "E");
                        g = this.clone();
                        g.collapse();
                        g.insertNode(c)
                    }
                    g =
                        this.clone();
                    g.collapse(true);
                    g.insertNode(b);
                    if (c) {
                        this.setStartAfter(b);
                        this.setEndBefore(c)
                    } else this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                    return {
                        startNode: a ? e + (f ? "C" : "S") : b,
                        endNode: a ? e + "E" : c,
                        serializable: a,
                        collapsed: f
                    }
                },
                createBookmark2: function(a) {
                    var b = this.startContainer,
                        c = this.endContainer,
                        e = this.startOffset,
                        g = this.endOffset,
                        f = this.collapsed,
                        h, d;
                    if (!b || !c) return {
                        start: 0,
                        end: 0
                    };
                    if (a) {
                        if (b.type == CKEDITOR.NODE_ELEMENT) {
                            if ((h = b.getChild(e)) && h.type == CKEDITOR.NODE_TEXT && e > 0 && h.getPrevious().type ==
                                CKEDITOR.NODE_TEXT) {
                                b = h;
                                e = 0
                            }
                            h && h.type == CKEDITOR.NODE_ELEMENT && (e = h.getIndex(1))
                        }
                        for (; b.type == CKEDITOR.NODE_TEXT && (d = b.getPrevious()) && d.type == CKEDITOR.NODE_TEXT;) {
                            b = d;
                            e = e + d.getLength()
                        }
                        if (!f) {
                            if (c.type == CKEDITOR.NODE_ELEMENT) {
                                if ((h = c.getChild(g)) && h.type == CKEDITOR.NODE_TEXT && g > 0 && h.getPrevious().type == CKEDITOR.NODE_TEXT) {
                                    c = h;
                                    g = 0
                                }
                                h && h.type == CKEDITOR.NODE_ELEMENT && (g = h.getIndex(1))
                            }
                            for (; c.type == CKEDITOR.NODE_TEXT && (d = c.getPrevious()) && d.type == CKEDITOR.NODE_TEXT;) {
                                c = d;
                                g = g + d.getLength()
                            }
                        }
                    }
                    return {
                        start: b.getAddress(a),
                        end: f ? null : c.getAddress(a),
                        startOffset: e,
                        endOffset: g,
                        normalized: a,
                        collapsed: f,
                        is2: true
                    }
                },
                moveToBookmark: function(a) {
                    if (a.is2) {
                        var b = this.document.getByAddress(a.start, a.normalized),
                            c = a.startOffset,
                            e = a.end && this.document.getByAddress(a.end, a.normalized),
                            a = a.endOffset;
                        this.setStart(b, c);
                        e ? this.setEnd(e, a) : this.collapse(true)
                    } else {
                        b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode;
                        a = c ? this.document.getById(a.endNode) : a.endNode;
                        this.setStartBefore(b);
                        b.remove();
                        if (a) {
                            this.setEndBefore(a);
                            a.remove()
                        } else this.collapse(true)
                    }
                },
                getBoundaryNodes: function() {
                    var a = this.startContainer,
                        b = this.endContainer,
                        c = this.startOffset,
                        e = this.endOffset,
                        g;
                    if (a.type == CKEDITOR.NODE_ELEMENT) {
                        g = a.getChildCount();
                        if (g > c) a = a.getChild(c);
                        else if (g < 1) a = a.getPreviousSourceNode();
                        else {
                            for (a = a.$; a.lastChild;) a = a.lastChild;
                            a = new CKEDITOR.dom.node(a);
                            a = a.getNextSourceNode() || a
                        }
                    }
                    if (b.type == CKEDITOR.NODE_ELEMENT) {
                        g = b.getChildCount();
                        if (g > e) b = b.getChild(e).getPreviousSourceNode(true);
                        else if (g < 1) b = b.getPreviousSourceNode();
                        else {
                            for (b = b.$; b.lastChild;) b = b.lastChild;
                            b = new CKEDITOR.dom.node(b)
                        }
                    }
                    a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
                    return {
                        startNode: a,
                        endNode: b
                    }
                },
                getCommonAncestor: function(a, b) {
                    var c = this.startContainer,
                        e = this.endContainer,
                        c = c.equals(e) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(e);
                    return b && !c.is ? c.getParent() : c
                },
                optimize: function() {
                    var a = this.startContainer,
                        b = this.startOffset;
                    a.type != CKEDITOR.NODE_ELEMENT && (b ? b >=
                        a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
                    a = this.endContainer;
                    b = this.endOffset;
                    a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
                },
                optimizeBookmark: function() {
                    var a = this.startContainer,
                        b = this.endContainer;
                    a.is && (a.is("span") && a.data("cke-bookmark")) && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                    b && (b.is && b.is("span") && b.data("cke-bookmark")) && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
                },
                trim: function(a, b) {
                    var c = this.startContainer,
                        e = this.startOffset,
                        g = this.collapsed;
                    if ((!a || g) && c && c.type == CKEDITOR.NODE_TEXT) {
                        if (e)
                            if (e >= c.getLength()) {
                                e = c.getIndex() + 1;
                                c = c.getParent()
                            } else {
                                var f = c.split(e),
                                    e = c.getIndex() + 1,
                                    c = c.getParent();
                                if (this.startContainer.equals(this.endContainer)) this.setEnd(f, this.endOffset - this.startOffset);
                                else if (c.equals(this.endContainer)) this.endOffset = this.endOffset + 1
                            } else {
                            e = c.getIndex();
                            c = c.getParent()
                        }
                        this.setStart(c, e);
                        if (g) {
                            this.collapse(true);
                            return
                        }
                    }
                    c = this.endContainer;
                    e = this.endOffset;
                    if (!b && !g && c && c.type ==
                        CKEDITOR.NODE_TEXT) {
                        if (e) {
                            e >= c.getLength() || c.split(e);
                            e = c.getIndex() + 1
                        } else e = c.getIndex();
                        c = c.getParent();
                        this.setEnd(c, e)
                    }
                },
                enlarge: function(a, b) {
                    switch (a) {
                        case CKEDITOR.ENLARGE_INLINE:
                            var c = 1;
                        case CKEDITOR.ENLARGE_ELEMENT:
                            if (this.collapsed) break;
                            var e = this.getCommonAncestor(),
                                g = this.root,
                                f, h, d, i, r, t = false,
                                u, v;
                            u = this.startContainer;
                            v = this.startOffset;
                            if (u.type == CKEDITOR.NODE_TEXT) {
                                if (v) {
                                    u = !CKEDITOR.tools.trim(u.substring(0, v)).length && u;
                                    t = !!u
                                }
                                if (u && !(i = u.getPrevious())) d = u.getParent()
                            } else {
                                v &&
                                    (i = u.getChild(v - 1) || u.getLast());
                                i || (d = u)
                            }
                            for (; d || i;) {
                                if (d && !i) {
                                    !r && d.equals(e) && (r = true);
                                    if (c ? d.isBlockBoundary() : !g.contains(d)) break;
                                    if (!t || d.getComputedStyle("display") != "inline") {
                                        t = false;
                                        r ? f = d : this.setStartBefore(d)
                                    }
                                    i = d.getPrevious()
                                }
                                for (; i;) {
                                    u = false;
                                    if (i.type == CKEDITOR.NODE_COMMENT) i = i.getPrevious();
                                    else {
                                        if (i.type == CKEDITOR.NODE_TEXT) {
                                            v = i.getText();
                                            /[^\s\ufeff]/.test(v) && (i = null);
                                            u = /[\s\ufeff]$/.test(v)
                                        } else if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark"))
                                            if (t && CKEDITOR.dtd.$removeEmpty[i.getName()]) {
                                                v =
                                                    i.getText();
                                                if (/[^\s\ufeff]/.test(v)) i = null;
                                                else
                                                    for (var w = i.$.getElementsByTagName("*"), x = 0, y; y = w[x++];)
                                                        if (!CKEDITOR.dtd.$removeEmpty[y.nodeName.toLowerCase()]) {
                                                            i = null;
                                                            break
                                                        }
                                                i && (u = !!v.length)
                                            } else i = null;
                                        u && (t ? r ? f = d : d && this.setStartBefore(d) : t = true);
                                        if (i) {
                                            u = i.getPrevious();
                                            if (!d && !u) {
                                                d = i;
                                                i = null;
                                                break
                                            }
                                            i = u
                                        } else d = null
                                    }
                                }
                                d && (d = d.getParent())
                            }
                            u = this.endContainer;
                            v = this.endOffset;
                            d = i = null;
                            r = t = false;
                            if (u.type == CKEDITOR.NODE_TEXT) {
                                u = !CKEDITOR.tools.trim(u.substring(v)).length && u;
                                t = !(u && u.getLength());
                                if (u &&
                                    !(i = u.getNext())) d = u.getParent()
                            } else(i = u.getChild(v)) || (d = u);
                            for (; d || i;) {
                                if (d && !i) {
                                    !r && d.equals(e) && (r = true);
                                    if (c ? d.isBlockBoundary() : !g.contains(d)) break;
                                    if (!t || d.getComputedStyle("display") != "inline") {
                                        t = false;
                                        r ? h = d : d && this.setEndAfter(d)
                                    }
                                    i = d.getNext()
                                }
                                for (; i;) {
                                    u = false;
                                    if (i.type == CKEDITOR.NODE_TEXT) {
                                        v = i.getText();
                                        /[^\s\ufeff]/.test(v) && (i = null);
                                        u = /^[\s\ufeff]/.test(v)
                                    } else if (i.type == CKEDITOR.NODE_ELEMENT) {
                                        if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark"))
                                            if (t && CKEDITOR.dtd.$removeEmpty[i.getName()]) {
                                                v =
                                                    i.getText();
                                                if (/[^\s\ufeff]/.test(v)) i = null;
                                                else {
                                                    w = i.$.getElementsByTagName("*");
                                                    for (x = 0; y = w[x++];)
                                                        if (!CKEDITOR.dtd.$removeEmpty[y.nodeName.toLowerCase()]) {
                                                            i = null;
                                                            break
                                                        }
                                                }
                                                i && (u = !!v.length)
                                            } else i = null
                                    } else u = 1;
                                    u && t && (r ? h = d : this.setEndAfter(d));
                                    if (i) {
                                        u = i.getNext();
                                        if (!d && !u) {
                                            d = i;
                                            i = null;
                                            break
                                        }
                                        i = u
                                    } else d = null
                                }
                                d && (d = d.getParent())
                            }
                            if (f && h) {
                                e = f.contains(h) ? h : f;
                                this.setStartBefore(e);
                                this.setEndAfter(e)
                            }
                            break;
                        case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                        case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                            d = new CKEDITOR.dom.range(this.root);
                            g = this.root;
                            d.setStartAt(g, CKEDITOR.POSITION_AFTER_START);
                            d.setEnd(this.startContainer, this.startOffset);
                            d = new CKEDITOR.dom.walker(d);
                            var z, D, J = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
                                    br: 1
                                } : null),
                                B = function(a) {
                                    var b = J(a);
                                    b || (z = a);
                                    return b
                                },
                                c = function(a) {
                                    var b = B(a);
                                    !b && (a.is && a.is("br")) && (D = a);
                                    return b
                                };
                            d.guard = B;
                            d = d.lastBackward();
                            z = z || g;
                            this.setStartAt(z, !z.is("br") && (!d && this.checkStartOfBlock() || d && z.contains(d)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
                            if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                                d = this.clone();
                                d = new CKEDITOR.dom.walker(d);
                                var F = CKEDITOR.dom.walker.whitespaces(),
                                    E = CKEDITOR.dom.walker.bookmark();
                                d.evaluator = function(a) {
                                    return !F(a) && !E(a)
                                };
                                if ((d = d.previous()) && d.type == CKEDITOR.NODE_ELEMENT && d.is("br")) break
                            }
                            d = this.clone();
                            d.collapse();
                            d.setEndAt(g, CKEDITOR.POSITION_BEFORE_END);
                            d = new CKEDITOR.dom.walker(d);
                            d.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? c : B;
                            z = null;
                            d = d.lastForward();
                            z = z || g;
                            this.setEndAt(z, !d && this.checkEndOfBlock() || d &&
                                z.contains(d) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
                            D && this.setEndAfter(D)
                    }
                },
                shrink: function(a, b, c) {
                    if (!this.collapsed) {
                        var a = a || CKEDITOR.SHRINK_TEXT,
                            e = this.clone(),
                            g = this.startContainer,
                            f = this.endContainer,
                            h = this.startOffset,
                            d = this.endOffset,
                            i = 1,
                            r = 1;
                        if (g && g.type == CKEDITOR.NODE_TEXT)
                            if (h)
                                if (h >= g.getLength()) e.setStartAfter(g);
                                else {
                                    e.setStartBefore(g);
                                    i = 0
                                } else e.setStartBefore(g);
                        if (f && f.type == CKEDITOR.NODE_TEXT)
                            if (d)
                                if (d >= f.getLength()) e.setEndAfter(f);
                                else {
                                    e.setEndAfter(f);
                                    r = 0
                                } else e.setEndBefore(f);
                        var e = new CKEDITOR.dom.walker(e),
                            t = CKEDITOR.dom.walker.bookmark();
                        e.evaluator = function(b) {
                            return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
                        };
                        var u;
                        e.guard = function(b, e) {
                            if (t(b)) return true;
                            if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || e && b.equals(u) || c === false && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary()) return false;
                            !e && b.type == CKEDITOR.NODE_ELEMENT && (u = b);
                            return true
                        };
                        if (i)(g = e[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" :
                            "next"]()) && this.setStartAt(g, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
                        if (r) {
                            e.reset();
                            (e = e[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(e, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)
                        }
                        return !(!i && !r)
                    }
                },
                insertNode: function(a) {
                    this.optimizeBookmark();
                    this.trim(false, true);
                    var b = this.startContainer,
                        c = b.getChild(this.startOffset);
                    c ? a.insertBefore(c) : b.append(a);
                    a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
                    this.setStartBefore(a)
                },
                moveToPosition: function(a, b) {
                    this.setStartAt(a, b);
                    this.collapse(true)
                },
                moveToRange: function(a) {
                    this.setStart(a.startContainer, a.startOffset);
                    this.setEnd(a.endContainer, a.endOffset)
                },
                selectNodeContents: function(a) {
                    this.setStart(a, 0);
                    this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
                },
                setStart: function(a, b) {
                    if (a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()]) {
                        b = a.getIndex();
                        a = a.getParent()
                    }
                    this.startContainer = a;
                    this.startOffset = b;
                    if (!this.endContainer) {
                        this.endContainer =
                            a;
                        this.endOffset = b
                    }
                    h(this)
                },
                setEnd: function(a, b) {
                    if (a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()]) {
                        b = a.getIndex() + 1;
                        a = a.getParent()
                    }
                    this.endContainer = a;
                    this.endOffset = b;
                    if (!this.startContainer) {
                        this.startContainer = a;
                        this.startOffset = b
                    }
                    h(this)
                },
                setStartAfter: function(a) {
                    this.setStart(a.getParent(), a.getIndex() + 1)
                },
                setStartBefore: function(a) {
                    this.setStart(a.getParent(), a.getIndex())
                },
                setEndAfter: function(a) {
                    this.setEnd(a.getParent(), a.getIndex() + 1)
                },
                setEndBefore: function(a) {
                    this.setEnd(a.getParent(),
                        a.getIndex())
                },
                setStartAt: function(a, b) {
                    switch (b) {
                        case CKEDITOR.POSITION_AFTER_START:
                            this.setStart(a, 0);
                            break;
                        case CKEDITOR.POSITION_BEFORE_END:
                            a.type == CKEDITOR.NODE_TEXT ? this.setStart(a, a.getLength()) : this.setStart(a, a.getChildCount());
                            break;
                        case CKEDITOR.POSITION_BEFORE_START:
                            this.setStartBefore(a);
                            break;
                        case CKEDITOR.POSITION_AFTER_END:
                            this.setStartAfter(a)
                    }
                    h(this)
                },
                setEndAt: function(a, b) {
                    switch (b) {
                        case CKEDITOR.POSITION_AFTER_START:
                            this.setEnd(a, 0);
                            break;
                        case CKEDITOR.POSITION_BEFORE_END:
                            a.type ==
                                CKEDITOR.NODE_TEXT ? this.setEnd(a, a.getLength()) : this.setEnd(a, a.getChildCount());
                            break;
                        case CKEDITOR.POSITION_BEFORE_START:
                            this.setEndBefore(a);
                            break;
                        case CKEDITOR.POSITION_AFTER_END:
                            this.setEndAfter(a)
                    }
                    h(this)
                },
                fixBlock: function(a, b) {
                    var c = this.createBookmark(),
                        e = this.document.createElement(b);
                    this.collapse(a);
                    this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    this.extractContents().appendTo(e);
                    e.trim();
                    CKEDITOR.env.ie || e.appendBogus();
                    this.insertNode(e);
                    this.moveToBookmark(c);
                    return e
                },
                splitBlock: function(a) {
                    var b =
                        new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                        c = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
                        e = b.block,
                        g = c.block,
                        f = null;
                    if (!b.blockLimit.equals(c.blockLimit)) return null;
                    if (a != "br") {
                        if (!e) {
                            e = this.fixBlock(true, a);
                            g = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block
                        }
                        g || (g = this.fixBlock(false, a))
                    }
                    a = e && this.checkStartOfBlock();
                    b = g && this.checkEndOfBlock();
                    this.deleteContents();
                    if (e && e.equals(g))
                        if (b) {
                            f = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                            this.moveToPosition(g, CKEDITOR.POSITION_AFTER_END);
                            g = null
                        } else if (a) {
                        f = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                        this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START);
                        e = null
                    } else {
                        g = this.splitElement(e);
                        !CKEDITOR.env.ie && !e.is("ul", "ol") && e.appendBogus()
                    }
                    return {
                        previousBlock: e,
                        nextBlock: g,
                        wasStartOfBlock: a,
                        wasEndOfBlock: b,
                        elementPath: f
                    }
                },
                splitElement: function(a) {
                    if (!this.collapsed) return null;
                    this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                    var b = this.extractContents(),
                        c = a.clone(false);
                    b.appendTo(c);
                    c.insertAfter(a);
                    this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
                    return c
                },
                removeEmptyBlocksAtEnd: function() {
                    function a(e) {
                        return function(a) {
                            return b(a) || (c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable()) || e.is("table") && a.is("caption") ? false : true
                        }
                    }
                    var b = CKEDITOR.dom.walker.whitespaces(),
                        c = CKEDITOR.dom.walker.bookmark(false);
                    return function(b) {
                        for (var c = this.createBookmark(), e = this[b ? "endPath" : "startPath"](), g = e.block || e.blockLimit, f; g && !g.equals(e.root) && !g.getFirst(a(g));) {
                            f =
                                g.getParent();
                            this[b ? "setEndAt" : "setStartAt"](g, CKEDITOR.POSITION_AFTER_END);
                            g.remove(1);
                            g = f
                        }
                        this.moveToBookmark(c)
                    }
                }(),
                startPath: function() {
                    return new CKEDITOR.dom.elementPath(this.startContainer, this.root)
                },
                endPath: function() {
                    return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
                },
                checkBoundaryOfElement: function(a, c) {
                    var e = c == CKEDITOR.START,
                        g = this.clone();
                    g.collapse(e);
                    g[e ? "setStartAt" : "setEndAt"](a, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
                    g = new CKEDITOR.dom.walker(g);
                    g.evaluator = b(e);
                    return g[e ? "checkBackward" : "checkForward"]()
                },
                checkStartOfBlock: function() {
                    var b = this.startContainer,
                        c = this.startOffset;
                    if (c && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.ltrim(b.substring(0, c)).length) return false;
                    this.trim();
                    b = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                    c = this.clone();
                    c.collapse(true);
                    c.setStartAt(b.block || b.blockLimit, CKEDITOR.POSITION_AFTER_START);
                    b = new CKEDITOR.dom.walker(c);
                    b.evaluator = a(true);
                    return b.checkBackward()
                },
                checkEndOfBlock: function() {
                    var b =
                        this.endContainer,
                        c = this.endOffset;
                    if (b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.rtrim(b.substring(c)).length) return false;
                    this.trim();
                    b = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
                    c = this.clone();
                    c.collapse(false);
                    c.setEndAt(b.block || b.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                    b = new CKEDITOR.dom.walker(c);
                    b.evaluator = a(false);
                    return b.checkForward()
                },
                checkReadOnly: function() {
                    function a(b, c) {
                        for (; b;) {
                            if (b.type == CKEDITOR.NODE_ELEMENT) {
                                if (b.getAttribute("contentEditable") == "false" && !b.data("cke-editable")) return 0;
                                if (b.is("html") || b.getAttribute("contentEditable") == "true" && (b.contains(c) || b.equals(c))) break
                            }
                            b = b.getParent()
                        }
                        return 1
                    }
                    return function() {
                        var b = this.startContainer,
                            c = this.endContainer;
                        return !(a(b, c) && a(c, b))
                    }
                }(),
                moveToElementEditablePosition: function(a, b) {
                    var e = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/;
                    if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(false)) {
                        this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                        return true
                    }
                    for (var g = 0; a;) {
                        if (a.type == CKEDITOR.NODE_TEXT) {
                            b && this.checkEndOfBlock() &&
                                e.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                            g = 1;
                            break
                        }
                        if (a.type == CKEDITOR.NODE_ELEMENT)
                            if (a.isEditable()) {
                                this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START);
                                g = 1
                            } else b && (a.is("br") && this.checkEndOfBlock()) && this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                        var f = a,
                            h = g,
                            d = void 0;
                        f.type == CKEDITOR.NODE_ELEMENT && f.isEditable(false) && (d = f[b ? "getLast" : "getFirst"](c));
                        !h && !d && (d = f[b ? "getPrevious" : "getNext"](c));
                        a = d
                    }
                    return !!g
                },
                moveToElementEditStart: function(a) {
                    return this.moveToElementEditablePosition(a)
                },
                moveToElementEditEnd: function(a) {
                    return this.moveToElementEditablePosition(a, true)
                },
                getEnclosedNode: function() {
                    var a = this.clone();
                    a.optimize();
                    if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
                    var b = new CKEDITOR.dom.walker(a),
                        c = CKEDITOR.dom.walker.bookmark(true),
                        e = CKEDITOR.dom.walker.whitespaces(true);
                    a.evaluator =
                        function(a) {
                            return e(a) && c(a)
                        };
                    a = b.next();
                    b.reset();
                    return a && a.equals(b.previous()) ? a : null
                },
                getTouchedStartNode: function() {
                    var a = this.startContainer;
                    return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
                },
                getTouchedEndNode: function() {
                    var a = this.endContainer;
                    return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
                },
                scrollIntoView: function() {
                    var a = new CKEDITOR.dom.element.createFromHtml("<span>?</span>", this.document),
                        b, c, e, g = this.clone();
                    g.optimize();
                    if (e = g.startContainer.type == CKEDITOR.NODE_TEXT) {
                        c = g.startContainer.getText();
                        b = g.startContainer.split(g.startOffset);
                        a.insertAfter(g.startContainer)
                    } else g.insertNode(a);
                    a.scrollIntoView();
                    if (e) {
                        g.startContainer.setText(c);
                        b.remove()
                    }
                    a.remove()
                }
            }
        })();
        CKEDITOR.POSITION_AFTER_START = 1;
        CKEDITOR.POSITION_BEFORE_END = 2;
        CKEDITOR.POSITION_BEFORE_START = 3;
        CKEDITOR.POSITION_AFTER_END = 4;
        CKEDITOR.ENLARGE_ELEMENT = 1;
        CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2;
        CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3;
        CKEDITOR.ENLARGE_INLINE =
            4;
        CKEDITOR.START = 1;
        CKEDITOR.END = 2;
        CKEDITOR.SHRINK_ELEMENT = 1;
        CKEDITOR.SHRINK_TEXT = 2;
        (function() {
            function a(a) {
                if (!(arguments.length < 1)) {
                    this.range = a;
                    this.forceBrBreak = 0;
                    this.enlargeBr = 1;
                    this.enforceRealBlocks = 0;
                    this._ || (this._ = {})
                }
            }

            function b(a, b, c) {
                for (a = a.getNextSourceNode(b, null, c); !h(a);) a = a.getNextSourceNode(b, null, c);
                return a
            }
            var c = /^[\r\n\t ]+$/,
                h = CKEDITOR.dom.walker.bookmark(false, true),
                d = CKEDITOR.dom.walker.whitespaces(true),
                i = function(a) {
                    return h(a) && d(a)
                };
            a.prototype = {
                getNextParagraph: function(a) {
                    a =
                        a || "p";
                    if (!CKEDITOR.dtd[this.range.root.getName()][a]) return null;
                    var e, g, j, d, q, l;
                    if (!this._.started) {
                        g = this.range.clone();
                        g.shrink(CKEDITOR.NODE_ELEMENT, true);
                        d = g.endContainer.hasAscendant("pre", true) || g.startContainer.hasAscendant("pre", true);
                        g.enlarge(this.forceBrBreak && !d || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                        if (!g.collapsed) {
                            d = new CKEDITOR.dom.walker(g.clone());
                            var n = CKEDITOR.dom.walker.bookmark(true, true);
                            d.evaluator = n;
                            this._.nextNode = d.next();
                            d = new CKEDITOR.dom.walker(g.clone());
                            d.evaluator = n;
                            d = d.previous();
                            this._.lastNode = d.getNextSourceNode(true);
                            if (this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary()) {
                                n = this.range.clone();
                                n.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END);
                                if (n.checkEndOfBlock()) {
                                    n = new CKEDITOR.dom.elementPath(n.endContainer, n.root);
                                    this._.lastNode = (n.block || n.blockLimit).getNextSourceNode(true)
                                }
                            }
                            if (!this._.lastNode) {
                                this._.lastNode =
                                    this._.docEndMarker = g.document.createText("");
                                this._.lastNode.insertAfter(d)
                            }
                            g = null
                        }
                        this._.started = 1
                    }
                    n = this._.nextNode;
                    d = this._.lastNode;
                    for (this._.nextNode = null; n;) {
                        var o = 0,
                            m = n.hasAscendant("pre"),
                            p = n.type != CKEDITOR.NODE_ELEMENT,
                            s = 0;
                        if (p) n.type == CKEDITOR.NODE_TEXT && c.test(n.getText()) && (p = 0);
                        else {
                            var r = n.getName();
                            if (n.isBlockBoundary(this.forceBrBreak && !m && {
                                    br: 1
                                })) {
                                if (r == "br") p = 1;
                                else if (!g && !n.getChildCount() && r != "hr") {
                                    e = n;
                                    j = n.equals(d);
                                    break
                                }
                                if (g) {
                                    g.setEndAt(n, CKEDITOR.POSITION_BEFORE_START);
                                    if (r != "br") this._.nextNode = n
                                }
                                o = 1
                            } else {
                                if (n.getFirst()) {
                                    if (!g) {
                                        g = new CKEDITOR.dom.range(this.range.document);
                                        g.setStartAt(n, CKEDITOR.POSITION_BEFORE_START)
                                    }
                                    n = n.getFirst();
                                    continue
                                }
                                p = 1
                            }
                        }
                        if (p && !g) {
                            g = this.range.clone();
                            g.setStartAt(n, CKEDITOR.POSITION_BEFORE_START)
                        }
                        j = (!o || p) && n.equals(d);
                        if (g && !o)
                            for (; !n.getNext(i) && !j;) {
                                r = n.getParent();
                                if (r.isBlockBoundary(this.forceBrBreak && !m && {
                                        br: 1
                                    })) {
                                    o = 1;
                                    p = 0;
                                    j || r.equals(d);
                                    g.setEndAt(r, CKEDITOR.POSITION_BEFORE_END);
                                    break
                                }
                                n = r;
                                p = 1;
                                j = n.equals(d);
                                s = 1
                            }
                        p && g.setEndAt(n,
                            CKEDITOR.POSITION_AFTER_END);
                        n = b(n, s, d);
                        if ((j = !n) || o && g) break
                    }
                    if (!e) {
                        if (!g) {
                            this._.docEndMarker && this._.docEndMarker.remove();
                            return this._.nextNode = null
                        }
                        e = new CKEDITOR.dom.elementPath(g.startContainer, g.root);
                        n = e.blockLimit;
                        o = {
                            div: 1,
                            th: 1,
                            td: 1
                        };
                        e = e.block;
                        if (!e && n && !this.enforceRealBlocks && o[n.getName()] && g.checkStartOfBlock() && g.checkEndOfBlock() && !n.equals(g.root)) e = n;
                        else if (!e || this.enforceRealBlocks && e.getName() == "li") {
                            e = this.range.document.createElement(a);
                            g.extractContents().appendTo(e);
                            e.trim();
                            g.insertNode(e);
                            q = l = true
                        } else if (e.getName() != "li") {
                            if (!g.checkStartOfBlock() || !g.checkEndOfBlock()) {
                                e = e.clone(false);
                                g.extractContents().appendTo(e);
                                e.trim();
                                l = g.splitBlock();
                                q = !l.wasStartOfBlock;
                                l = !l.wasEndOfBlock;
                                g.insertNode(e)
                            }
                        } else if (!j) this._.nextNode = e.equals(d) ? null : b(g.getBoundaryNodes().endNode, 1, d)
                    }
                    if (q)(g = e.getPrevious()) && g.type == CKEDITOR.NODE_ELEMENT && (g.getName() == "br" ? g.remove() : g.getLast() && g.getLast().$.nodeName.toLowerCase() == "br" && g.getLast().remove());
                    if (l)(g = e.getLast()) &&
                        g.type == CKEDITOR.NODE_ELEMENT && g.getName() == "br" && (CKEDITOR.env.ie || g.getPrevious(h) || g.getNext(h)) && g.remove();
                    if (!this._.nextNode) this._.nextNode = j || e.equals(d) || !d ? null : b(e, 1, d);
                    return e
                }
            };
            CKEDITOR.dom.range.prototype.createIterator = function() {
                return new a(this)
            }
        })();
        CKEDITOR.command = function(a, b) {
            this.uiItems = [];
            this.exec = function(c) {
                if (this.state == CKEDITOR.TRISTATE_DISABLED) return false;
                this.editorFocus && a.focus();
                return this.fire("exec") === false ? true : b.exec.call(this, a, c) !== false
            };
            this.refresh =
                function(a, h) {
                    if (!this.readOnly && a.readOnly) return true;
                    if (this.context && !h.isContextFor(this.context)) {
                        this.disable();
                        return true
                    }
                    this.enable();
                    return this.fire("refresh", {
                        editor: a,
                        path: h
                    }) === false ? true : b.refresh && b.refresh.apply(this, arguments) !== false
                };
            CKEDITOR.tools.extend(this, b, {
                modes: {
                    wysiwyg: 1
                },
                editorFocus: 1,
                contextSensitive: !!b.context,
                state: CKEDITOR.TRISTATE_OFF
            });
            CKEDITOR.event.call(this)
        };
        CKEDITOR.command.prototype = {
            enable: function() {
                this.state == CKEDITOR.TRISTATE_DISABLED && this.setState(!this.preserveState ||
                    typeof this.previousState == "undefined" ? CKEDITOR.TRISTATE_OFF : this.previousState)
            },
            disable: function() {
                this.setState(CKEDITOR.TRISTATE_DISABLED)
            },
            setState: function(a) {
                if (this.state == a) return false;
                this.previousState = this.state;
                this.state = a;
                this.fire("state");
                return true
            },
            toggleState: function() {
                this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
            }
        };
        CKEDITOR.event.implementOn(CKEDITOR.command.prototype, !0);
        CKEDITOR.ENTER_P =
            1;
        CKEDITOR.ENTER_BR = 2;
        CKEDITOR.ENTER_DIV = 3;
        CKEDITOR.config = {
            customConfig: "config.js",
            autoUpdateElement: !0,
            language: "",
            defaultLanguage: "en",
            contentsLangDirection: "",
            enterMode: CKEDITOR.ENTER_P,
            forceEnterMode: !1,
            shiftEnterMode: CKEDITOR.ENTER_BR,
            docType: "<!DOCTYPE html>",
            bodyId: "",
            bodyClass: "",
            fullPage: !1,
            height: 200,
            extraPlugins: "",
            removePlugins: "",
            protectedSource: [],
            tabIndex: 0,
            width: "",
            baseFloatZIndex: 1E4,
            blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
        };
        (function() {
            CKEDITOR.focusManager =
                function(a) {
                    if (a.focusManager) return a.focusManager;
                    this.hasFocus = false;
                    this.currentActive = null;
                    this._ = {
                        editor: a
                    };
                    return this
                };
            CKEDITOR.focusManager.prototype = {
                focus: function() {
                    this._.timer && clearTimeout(this._.timer);
                    if (!this.hasFocus && !this._.locked) {
                        var a = CKEDITOR.currentInstance;
                        a && a.focusManager.blur(1);
                        this.hasFocus = true;
                        (a = this._.editor.container) && a.addClass("cke_focus");
                        this._.editor.fire("focus")
                    }
                },
                lock: function() {
                    this._.locked = 1
                },
                unlock: function() {
                    delete this._.locked
                },
                blur: function(a) {
                    function b() {
                        if (this.hasFocus) {
                            this.hasFocus =
                                false;
                            var a = this._.editor.container;
                            a && a.removeClass("cke_focus");
                            this._.editor.fire("blur")
                        }
                    }
                    if (!this._.locked) {
                        this._.timer && clearTimeout(this._.timer);
                        a ? b.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
                            delete this._.timer;
                            b.call(this)
                        }, 200, this)
                    }
                },
                add: function(a, b) {
                    var c = a.getCustomData("focusmanager");
                    if (!c || c != this) {
                        c && c.remove(a);
                        var c = "focus",
                            h = "blur";
                        if (b)
                            if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
                                c = "focusin";
                                h = "focusout"
                            } else CKEDITOR.event.useCapture = 1;
                        var d = {
                            blur: function() {
                                a.equals(this.currentActive) &&
                                    this.blur()
                            },
                            focus: function() {
                                this.currentActive = a;
                                this.focus()
                            }
                        };
                        a.on(c, d.focus, this);
                        a.on(h, d.blur, this);
                        if (b) CKEDITOR.event.useCapture = 0;
                        a.setCustomData("focusmanager", this);
                        a.setCustomData("focusmanager_handlers", d)
                    }
                },
                remove: function(a) {
                    a.removeCustomData("focusmanager");
                    var b = a.removeCustomData("focusmanager_handlers");
                    a.removeListener("blur", b.blur);
                    a.removeListener("focus", b.focus)
                }
            }
        })();
        CKEDITOR.keystrokeHandler = function(a) {
            if (a.keystrokeHandler) return a.keystrokeHandler;
            this.keystrokes = {};
            this.blockedKeystrokes = {};
            this._ = {
                editor: a
            };
            return this
        };
        (function() {
            var a, b = function(b) {
                    var b = b.data,
                        c = b.getKeystroke(),
                        i = this.keystrokes[c],
                        f = this._.editor;
                    a = f.fire("key", {
                        keyCode: c
                    }) === false;
                    if (!a) {
                        i && (a = f.execCommand(i, {
                            from: "keystrokeHandler"
                        }) !== false);
                        a || (a = !!this.blockedKeystrokes[c])
                    }
                    a && b.preventDefault(true);
                    return !a
                },
                c = function(b) {
                    if (a) {
                        a = false;
                        b.data.preventDefault(true)
                    }
                };
            CKEDITOR.keystrokeHandler.prototype = {
                attach: function(a) {
                    a.on("keydown", b, this);
                    if (CKEDITOR.env.opera || CKEDITOR.env.gecko &&
                        CKEDITOR.env.mac) a.on("keypress", c, this)
                }
            }
        })();
        (function() {
            CKEDITOR.lang = {
                languages: {
                    af: 1,
                    ar: 1,
                    bg: 1,
                    bn: 1,
                    bs: 1,
                    ca: 1,
                    cs: 1,
                    cy: 1,
                    da: 1,
                    de: 1,
                    el: 1,
                    "en-au": 1,
                    "en-ca": 1,
                    "en-gb": 1,
                    en: 1,
                    eo: 1,
                    es: 1,
                    et: 1,
                    eu: 1,
                    fa: 1,
                    fi: 1,
                    fo: 1,
                    "fr-ca": 1,
                    fr: 1,
                    gl: 1,
                    gu: 1,
                    he: 1,
                    hi: 1,
                    hr: 1,
                    hu: 1,
                    is: 1,
                    it: 1,
                    ja: 1,
                    ka: 1,
                    km: 1,
                    ko: 1,
                    lt: 1,
                    lv: 1,
                    mn: 1,
                    ms: 1,
                    nb: 1,
                    nl: 1,
                    no: 1,
                    pl: 1,
                    "pt-br": 1,
                    pt: 1,
                    ro: 1,
                    ru: 1,
                    sk: 1,
                    sl: 1,
                    "sr-latn": 1,
                    sr: 1,
                    sv: 1,
                    th: 1,
                    tr: 1,
                    uk: 1,
                    vi: 1,
                    "zh-cn": 1,
                    zh: 1
                },
                load: function(a, b, c) {
                    if (!a || !CKEDITOR.lang.languages[a]) a = this.detect(b, a);
                    this[a] ?
                        c(a, this[a]) : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), function() {
                            c(a, this[a])
                        }, this)
                },
                detect: function(a, b) {
                    var c = this.languages,
                        b = b || navigator.userLanguage || navigator.language || a,
                        h = b.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                        d = h[1],
                        h = h[2];
                    c[d + "-" + h] ? d = d + "-" + h : c[d] || (d = null);
                    CKEDITOR.lang.detect = d ? function() {
                        return d
                    } : function(a) {
                        return a
                    };
                    return d || a
                }
            }
        })();
        CKEDITOR.scriptLoader = function() {
            var a = {},
                b = {};
            return {
                load: function(c, h, d, i) {
                    var f = typeof c == "string";
                    f && (c = [c]);
                    d || (d =
                        CKEDITOR);
                    var e = c.length,
                        g = [],
                        j = [],
                        k = function(a) {
                            h && (f ? h.call(d, a) : h.call(d, g, j))
                        };
                    if (e === 0) k(true);
                    else {
                        var q = function(a, b) {
                                (b ? g : j).push(a);
                                if (--e <= 0) {
                                    i && CKEDITOR.document.getDocumentElement().removeStyle("cursor");
                                    k(b)
                                }
                            },
                            l = function(c, e) {
                                a[c] = 1;
                                var g = b[c];
                                delete b[c];
                                for (var f = 0; f < g.length; f++) g[f](c, e)
                            },
                            n = function(c) {
                                if (a[c]) q(c, true);
                                else {
                                    var e = b[c] || (b[c] = []);
                                    e.push(q);
                                    if (!(e.length > 1)) {
                                        var g = new CKEDITOR.dom.element("script");
                                        g.setAttributes({
                                            type: "text/javascript",
                                            src: c
                                        });
                                        if (h)
                                            if (CKEDITOR.env.ie) g.$.onreadystatechange =
                                                function() {
                                                    if (g.$.readyState == "loaded" || g.$.readyState == "complete") {
                                                        g.$.onreadystatechange = null;
                                                        l(c, true)
                                                    }
                                                };
                                            else {
                                                g.$.onload = function() {
                                                    setTimeout(function() {
                                                        l(c, true)
                                                    }, 0)
                                                };
                                                g.$.onerror = function() {
                                                    l(c, false)
                                                }
                                            }
                                        g.appendTo(CKEDITOR.document.getHead())
                                    }
                                }
                            };
                        i && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                        for (var o = 0; o < e; o++) n(c[o])
                    }
                }
            }
        }();
        CKEDITOR.resourceManager = function(a, b) {
            this.basePath = a;
            this.fileName = b;
            this.registered = {};
            this.loaded = {};
            this.externals = {};
            this._ = {
                waitingList: {}
            }
        };
        CKEDITOR.resourceManager.prototype = {
            add: function(a, b) {
                if (this.registered[a]) throw '[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.';
                var c = this.registered[a] = b || {};
                c.name = a;
                c.path = this.getPath(a);
                CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", c);
                return this.get(a)
            },
            get: function(a) {
                return this.registered[a] || null
            },
            getPath: function(a) {
                var b = this.externals[a];
                return CKEDITOR.getUrl(b && b.dir || this.basePath + a + "/")
            },
            getFilePath: function(a) {
                var b = this.externals[a];
                return CKEDITOR.getUrl(this.getPath(a) +
                    (b && typeof b.file == "string" ? b.file : this.fileName + ".js"))
            },
            addExternal: function(a, b, c) {
                for (var a = a.split(","), h = 0; h < a.length; h++) this.externals[a[h]] = {
                    dir: b,
                    file: c
                }
            },
            load: function(a, b, c) {
                CKEDITOR.tools.isArray(a) || (a = a ? [a] : []);
                for (var h = this.loaded, d = this.registered, i = [], f = {}, e = {}, g = 0; g < a.length; g++) {
                    var j = a[g];
                    if (j)
                        if (!h[j] && !d[j]) {
                            var k = this.getFilePath(j);
                            i.push(k);
                            k in f || (f[k] = []);
                            f[k].push(j)
                        } else e[j] = this.get(j)
                }
                CKEDITOR.scriptLoader.load(i, function(a, g) {
                    if (g.length) throw '[CKEDITOR.resourceManager.load] Resource name "' +
                        f[g[0]].join(",") + '" was not found at "' + g[0] + '".';
                    for (var j = 0; j < a.length; j++)
                        for (var d = f[a[j]], k = 0; k < d.length; k++) {
                            var i = d[k];
                            e[i] = this.get(i);
                            h[i] = 1
                        }
                    b.call(c, e)
                }, this)
            }
        };
        CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin");
        CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(a) {
            var b = {};
            return function(c, h, d) {
                var i = {},
                    f = function(c) {
                        a.call(this, c, function(a) {
                            CKEDITOR.tools.extend(i, a);
                            var c = [],
                                e;
                            for (e in a) {
                                var q = a[e],
                                    l = q && q.requires;
                                if (!b[e]) {
                                    if (q.icons)
                                        for (var n =
                                                q.icons.split(","), o = 0; o < n.length; o++) CKEDITOR.skin.addIcon(n[o], q.path + "icons/" + n[o] + ".png");
                                    b[e] = 1
                                }
                                if (l) {
                                    l.split && (l = l.split(","));
                                    for (q = 0; q < l.length; q++) i[l[q]] || c.push(l[q])
                                }
                            }
                            if (c.length) f.call(this, c);
                            else {
                                for (e in i) {
                                    q = i[e];
                                    if (q.onLoad && !q.onLoad._called) {
                                        q.onLoad() === false && delete i[e];
                                        q.onLoad._called = 1
                                    }
                                }
                                h && h.call(d || window, i)
                            }
                        }, this)
                    };
                f.call(this, c)
            }
        });
        CKEDITOR.plugins.setLang = function(a, b, c) {
            var h = this.get(a),
                a = h.langEntries || (h.langEntries = {}),
                h = h.lang || (h.lang = []);
            h.split && (h = h.split(","));
            CKEDITOR.tools.indexOf(h, b) == -1 && h.push(b);
            a[b] = c
        };
        CKEDITOR.ui = function(a) {
            if (a.ui) return a.ui;
            this.items = {};
            this.instances = {};
            this.editor = a;
            this._ = {
                handlers: {}
            };
            return this
        };
        CKEDITOR.ui.prototype = {
            add: function(a, b, c) {
                c.name = a.toLowerCase();
                var h = this.items[a] = {
                    type: b,
                    command: c.command || null,
                    args: Array.prototype.slice.call(arguments, 2)
                };
                CKEDITOR.tools.extend(h, c)
            },
            get: function(a) {
                return this.instances[a]
            },
            create: function(a) {
                var b = this.items[a],
                    c = b && this._.handlers[b.type],
                    h = b && b.command && this.editor.getCommand(b.command),
                    c = c && c.create.apply(this, b.args);
                this.instances[a] = c;
                h && h.uiItems.push(c);
                if (c && !c.type) c.type = b.type;
                return c
            },
            addHandler: function(a, b) {
                this._.handlers[a] = b
            },
            space: function(a) {
                return CKEDITOR.document.getById(this.spaceId(a))
            },
            spaceId: function(a) {
                return this.editor.id + "_" + a
            }
        };
        CKEDITOR.event.implementOn(CKEDITOR.ui);
        (function() {
            function a(a, e, g) {
                CKEDITOR.event.call(this);
                if (e !== void 0) {
                    if (e instanceof CKEDITOR.dom.element) {
                        if (!g) throw Error("One of the element mode must be specified.");
                    } else throw Error("Expect element of type CKEDITOR.dom.element.");
                    if (CKEDITOR.env.ie && CKEDITOR.env.quirks && g == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
                    if (g == CKEDITOR.ELEMENT_MODE_INLINE && !e.is(CKEDITOR.dtd.$editable) || g == CKEDITOR.ELEMENT_MODE_REPLACE && e.is(CKEDITOR.dtd.$nonBodyContent)) throw Error('The specified element mode is not supported on element: "' + e.getName() + '".');
                    this.element = e;
                    this.elementMode = g;
                    this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (e.getId() || e.getNameAtt())
                } else this.elementMode =
                    CKEDITOR.ELEMENT_MODE_NONE;
                this._ = {};
                this.commands = {};
                this.templates = {};
                this.name = this.name || b();
                this.id = CKEDITOR.tools.getNextId();
                this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
                this.ui = new CKEDITOR.ui(this);
                this.focusManager = new CKEDITOR.focusManager(this);
                this.dataProcessor = new CKEDITOR.htmlDataProcessor(this);
                this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
                this.on("mode", c);
                this.on("readOnly", c);
                this.on("selectionChange", h);
                this.on("instanceReady", function() {
                    this.config.startupFocus &&
                        this.focus()
                });
                CKEDITOR.fire("instanceCreated", null, this);
                CKEDITOR.add(this);
                CKEDITOR.tools.setTimeout(function() {
                    i(this, a)
                }, 0, this)
            }

            function b() {
                do var a = "editor" + ++k; while (CKEDITOR.instances[a]);
                return a
            }

            function c() {
                var a, b = this.commands,
                    c = this.mode;
                if (c)
                    for (var e in b) {
                        a = b[e];
                        a[a.startDisabled ? "disable" : this.readOnly && !a.readOnly ? "disable" : a.modes[c] ? "enable" : "disable"]()
                    }
            }

            function h(a) {
                var b = this.commands,
                    c = a.editor,
                    e = a.data.path,
                    g;
                for (g in b) {
                    a = b[g];
                    a.contextSensitive && a.refresh(c, e)
                }
            }

            function d(a) {
                var b =
                    a.config.customConfig;
                if (!b) return false;
                var b = CKEDITOR.getUrl(b),
                    c = q[b] || (q[b] = {});
                if (c.fn) {
                    c.fn.call(a, a.config);
                    (CKEDITOR.getUrl(a.config.customConfig) == b || !d(a)) && a.fireOnce("customConfigLoaded")
                } else CKEDITOR.scriptLoader.load(b, function() {
                    c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {};
                    d(a)
                });
                return true
            }

            function i(a, b) {
                a.on("customConfigLoaded", function() {
                    if (b) {
                        if (b.on)
                            for (var c in b.on) a.on(c, b.on[c]);
                        CKEDITOR.tools.extend(a.config, b, true);
                        delete a.config.on
                    }
                    a.readOnly = !(!a.config.readOnly &&
                        !(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && a.element.getAttribute("disabled")));
                    a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !CKEDITOR.dtd[a.element.getName()].p;
                    a.tabIndex = a.config.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
                    if (a.config.skin) CKEDITOR.skinName = a.config.skin;
                    a.fireOnce("configLoaded");
                    f(a)
                });
                if (b && b.customConfig != void 0) a.config.customConfig = b.customConfig;
                d(a) || a.fireOnce("customConfigLoaded")
            }

            function f(a) {
                CKEDITOR.skin.loadPart("editor", function() {
                    e(a)
                })
            }

            function e(a) {
                CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b, c) {
                    a.langCode = b;
                    a.lang = CKEDITOR.tools.prototypedCopy(c);
                    if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.lang.dir == "rtl") a.lang.dir = "ltr";
                    if (!a.config.contentsLangDirection) a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir;
                    a.fire("langLoaded");
                    g(a)
                })
            }

            function g(a) {
                var b = a.config,
                    c = b.plugins,
                    e = b.extraPlugins,
                    g = b.removePlugins;
                if (e) var f = RegExp("(?:^|,)(?:" + e.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"),
                    c = c.replace(f, ""),
                    c = c + ("," + e);
                if (g) {
                    f = RegExp("(?:^|,)(?:" + g.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g");
                    c = c.replace(f, "")
                }
                CKEDITOR.env.air && (c = c + ",adobeair");
                CKEDITOR.plugins.load(c.split(","), function(c) {
                    var e = [],
                        g = [],
                        f = [];
                    a.plugins = c;
                    for (var j in c) {
                        var d = c[j],
                            h = d.lang,
                            i = null;
                        if (h && !a.lang[j]) {
                            h.split && (h = h.split(","));
                            i = CKEDITOR.tools.indexOf(h, a.langCode) >= 0 ? a.langCode : h[0];
                            if (!d.langEntries ||
                                !d.langEntries[i]) f.push(CKEDITOR.getUrl(d.path + "lang/" + i + ".js"));
                            else {
                                a.lang[j] = d.langEntries[i];
                                i = null
                            }
                        }
                        g.push(i);
                        e.push(d)
                    }
                    CKEDITOR.scriptLoader.load(f, function() {
                        for (var c = ["beforeInit", "init", "afterInit"], f = 0; f < c.length; f++)
                            for (var j = 0; j < e.length; j++) {
                                var d = e[j];
                                f === 0 && (g[j] && d.lang && d.langEntries) && (a.lang[d.name] = d.langEntries[g[j]]);
                                if (d[c[f]]) d[c[f]](a)
                            }
                        a.fireOnce("pluginsLoaded");
                        b.keystrokes && a.setKeystroke(a.config.keystrokes);
                        for (j = 0; j < a.config.blockedKeystrokes.length; j++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[j]] =
                            1;
                        a.fireOnce("loaded");
                        CKEDITOR.fire("instanceLoaded", null, a)
                    })
                })
            }

            function j() {
                var a = this.element;
                if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                    var b = this.getData();
                    this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
                    a.is("textarea") ? a.setValue(b) : a.setHtml(b);
                    return true
                }
                return false
            }
            a.prototype = CKEDITOR.editor.prototype;
            CKEDITOR.editor = a;
            var k = 0,
                q = {};
            CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                addCommand: function(a, b) {
                    return this.commands[a] = new CKEDITOR.command(this, b)
                },
                destroy: function(a) {
                    this.fire("beforeDestroy");
                    !a && j.call(this);
                    this.editable(null);
                    this.fire("destroy");
                    this.removeAllListeners();
                    CKEDITOR.remove(this);
                    CKEDITOR.fire("instanceDestroyed", null, this)
                },
                elementPath: function(a) {
                    return (a = a || this.getSelection().getStartElement()) ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
                },
                createRange: function() {
                    var a = this.editable();
                    return a ? new CKEDITOR.dom.range(a) : null
                },
                execCommand: function(a, b) {
                    var c = this.getCommand(a),
                        e = {
                            name: a,
                            commandData: b,
                            command: c
                        };
                    if (c &&
                        c.state != CKEDITOR.TRISTATE_DISABLED && this.fire("beforeCommandExec", e) !== true) {
                        e.returnValue = c.exec(e.commandData);
                        if (!c.async && this.fire("afterCommandExec", e) !== true) return e.returnValue
                    }
                    return false
                },
                getCommand: function(a) {
                    return this.commands[a]
                },
                getData: function(a) {
                    !a && this.fire("beforeGetData");
                    var b = this._.data;
                    if (typeof b != "string") b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "";
                    b = {
                        dataValue: b
                    };
                    !a && this.fire("getData", b);
                    return b.dataValue
                },
                getSnapshot: function() {
                    var a = this.fire("getSnapshot");
                    if (typeof a != "string") {
                        var b = this.element;
                        b && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a = b.is("textarea") ? b.getValue() : b.getHtml())
                    }
                    return a
                },
                loadSnapshot: function(a) {
                    this.fire("loadSnapshot", a)
                },
                setData: function(a, b, c) {
                    if (b) this.on("dataReady", function(a) {
                        a.removeListener();
                        b.call(a.editor)
                    });
                    a = {
                        dataValue: a
                    };
                    !c && this.fire("setData", a);
                    this._.data = a.dataValue;
                    !c && this.fire("afterSetData", a)
                },
                setReadOnly: function(a) {
                    a = a == void 0 || a;
                    if (this.readOnly !=
                        a) {
                        this.readOnly = a;
                        this.editable().setReadOnly(a);
                        this.fire("readOnly")
                    }
                },
                insertHtml: function(a, b) {
                    this.fire("insertHtml", {
                        dataValue: a,
                        mode: b
                    })
                },
                insertText: function(a) {
                    this.fire("insertText", a)
                },
                insertElement: function(a) {
                    this.fire("insertElement", a)
                },
                focus: function() {
                    this.fire("beforeFocus")
                },
                checkDirty: function() {
                    return this._.previousValue !== this.getSnapshot()
                },
                resetDirty: function() {
                    this._.previousValue = this.getSnapshot()
                },
                updateElement: function() {
                    return j.call(this)
                },
                setKeystroke: function() {
                    for (var a =
                            this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
                                [].slice.call(arguments, 0)
                            ], c, e, g = b.length; g--;) {
                        c = b[g];
                        e = 0;
                        if (CKEDITOR.tools.isArray(c)) {
                            e = c[1];
                            c = c[0]
                        }
                        e ? a[c] = e : delete a[c]
                    }
                }
            })
        })();
        CKEDITOR.ELEMENT_MODE_NONE = 0;
        CKEDITOR.ELEMENT_MODE_REPLACE = 1;
        CKEDITOR.ELEMENT_MODE_APPENDTO = 2;
        CKEDITOR.ELEMENT_MODE_INLINE = 3;
        CKEDITOR.htmlParser = function() {
            this._ = {
                htmlPartsRegex: RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)--\>)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))",
                    "g")
            }
        };
        (function() {
            var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
                b = {
                    checked: 1,
                    compact: 1,
                    declare: 1,
                    defer: 1,
                    disabled: 1,
                    ismap: 1,
                    multiple: 1,
                    nohref: 1,
                    noresize: 1,
                    noshade: 1,
                    nowrap: 1,
                    readonly: 1,
                    selected: 1
                };
            CKEDITOR.htmlParser.prototype = {
                onTagOpen: function() {},
                onTagClose: function() {},
                onText: function() {},
                onCDATA: function() {},
                onComment: function() {},
                parse: function(c) {
                    for (var h, d, i = 0, f; h = this._.htmlPartsRegex.exec(c);) {
                        d = h.index;
                        if (d > i) {
                            i = c.substring(i, d);
                            if (f) f.push(i);
                            else this.onText(i)
                        }
                        i = this._.htmlPartsRegex.lastIndex;
                        if (d = h[1]) {
                            d = d.toLowerCase();
                            if (f && CKEDITOR.dtd.$cdata[d]) {
                                this.onCDATA(f.join(""));
                                f = null
                            }
                            if (!f) {
                                this.onTagClose(d);
                                continue
                            }
                        }
                        if (f) f.push(h[0]);
                        else if (d = h[3]) {
                            d = d.toLowerCase();
                            if (!/="/.test(d)) {
                                var e = {},
                                    g;
                                h = h[4];
                                var j = !!(h && h.charAt(h.length - 1) == "/");
                                if (h)
                                    for (; g = a.exec(h);) {
                                        var k = g[1].toLowerCase();
                                        g = g[2] || g[3] || g[4] || "";
                                        e[k] = !g && b[k] ? k : g
                                    }
                                this.onTagOpen(d, e, j);
                                !f && CKEDITOR.dtd.$cdata[d] && (f = [])
                            }
                        } else if (d = h[2]) this.onComment(d)
                    }
                    if (c.length >
                        i) this.onText(c.substring(i, c.length))
                }
            }
        })();
        CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
            $: function() {
                this._ = {
                    output: []
                }
            },
            proto: {
                openTag: function(a) {
                    this._.output.push("<", a)
                },
                openTagClose: function(a, b) {
                    b ? this._.output.push(" />") : this._.output.push(">")
                },
                attribute: function(a, b) {
                    typeof b == "string" && (b = CKEDITOR.tools.htmlEncodeAttr(b));
                    this._.output.push(" ", a, '="', b, '"')
                },
                closeTag: function(a) {
                    this._.output.push("</", a, ">")
                },
                text: function(a) {
                    this._.output.push(a)
                },
                comment: function(a) {
                    this._.output.push("<\!--",
                        a, "--\>")
                },
                write: function(a) {
                    this._.output.push(a)
                },
                reset: function() {
                    this._.output = [];
                    this._.indent = false
                },
                getHtml: function(a) {
                    var b = this._.output.join("");
                    a && this.reset();
                    return b
                }
            }
        });
        CKEDITOR.htmlParser.comment = function(a) {
            this.value = a;
            this._ = {
                isBlockLike: false
            }
        };
        CKEDITOR.htmlParser.comment.prototype = {
            type: CKEDITOR.NODE_COMMENT,
            writeHtml: function(a, b) {
                var c = this.value;
                if (b) {
                    if (!(c = b.onComment(c, this))) return;
                    if (typeof c != "string") {
                        c.parent = this.parent;
                        c.writeHtml(a, b);
                        return
                    }
                }
                a.comment(c)
            }
        };
        (function() {
            CKEDITOR.htmlParser.text =
                function(a) {
                    this.value = a;
                    this._ = {
                        isBlockLike: false
                    }
                };
            CKEDITOR.htmlParser.text.prototype = {
                type: CKEDITOR.NODE_TEXT,
                writeHtml: function(a, b) {
                    var c = this.value;
                    (!b || (c = b.onText(c, this))) && a.text(c)
                }
            }
        })();
        (function() {
            CKEDITOR.htmlParser.cdata = function(a) {
                this.value = a
            };
            CKEDITOR.htmlParser.cdata.prototype = {
                type: CKEDITOR.NODE_TEXT,
                writeHtml: function(a) {
                    a.write(this.value)
                }
            }
        })();
        CKEDITOR.htmlParser.fragment = function() {
            this.children = [];
            this.parent = null;
            this._ = {
                isBlockLike: true,
                hasInlineStarted: false
            }
        };
        (function() {
            function a(a) {
                return a.name ==
                    "a" && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
            }
            var b = CKEDITOR.tools.extend({
                    table: 1,
                    ul: 1,
                    ol: 1,
                    dl: 1
                }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
                c = CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? {
                    dd: 1,
                    dt: 1
                } : {},
                h = {
                    ol: 1,
                    ul: 1
                },
                d = CKEDITOR.tools.extend({}, {
                    html: 1
                }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
                    style: 1,
                    script: 1
                });
            CKEDITOR.htmlParser.fragment.fromHtml = function(i, f, e) {
                function g(a) {
                    var b;
                    if (n.length > 0)
                        for (var c = 0; c < n.length; c++) {
                            var e = n[c],
                                g = e.name,
                                f = CKEDITOR.dtd[g],
                                d = m.name && CKEDITOR.dtd[m.name];
                            if ((!d || d[g]) && (!a || !f || f[a] || !CKEDITOR.dtd[a])) {
                                if (!b) {
                                    j();
                                    b = 1
                                }
                                e = e.clone();
                                e.parent = m;
                                m = e;
                                n.splice(c, 1);
                                c--
                            } else if (g == m.name) {
                                k(m, m.parent, 1);
                                c--
                            }
                        }
                }

                function j() {
                    for (; o.length;) k(o.shift(), m)
                }

                function k(b, c, g) {
                    if (b.previous === void 0) {
                        var c = c || m || l,
                            f = m;
                        if (e && c.name == "body") {
                            var j, d;
                            if ((j = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && !(j in CKEDITOR.dtd.$body || j == "body" || b.isOrphan)) {
                                m = c;
                                q.onTagOpen(e, {});
                                b.returnPoint = c = m
                            }
                        }
                        if (b._.isBlockLike &&
                            b.name != "pre" && b.name != "textarea") {
                            j = b.children.length;
                            d = b.children[j - 1];
                            var h;
                            if (d && d.type == CKEDITOR.NODE_TEXT)(h = CKEDITOR.tools.rtrim(d.value)) ? d.value = h : b.children.length = j - 1
                        }(!a(b) || b.children.length) && c.add(b);
                        b.name == "pre" && (s = false);
                        b.name == "textarea" && (p = false);
                        if (b.returnPoint) {
                            m = b.returnPoint;
                            delete b.returnPoint
                        } else m = g ? c : f
                    }
                }
                var q = new CKEDITOR.htmlParser,
                    l = f instanceof CKEDITOR.htmlParser.element ? f : typeof f == "string" ? new CKEDITOR.htmlParser.element(f) : new CKEDITOR.htmlParser.fragment,
                    n = [],
                    o = [],
                    m = l,
                    p = l.name == "textarea",
                    s = l.name == "pre";
                q.onTagOpen = function(e, f, i, l) {
                    f = new CKEDITOR.htmlParser.element(e, f);
                    if (f.isUnknown && i) f.isEmpty = true;
                    f.isOptionalClose = e in c || l;
                    if (a(f)) n.push(f);
                    else {
                        if (e == "pre") s = true;
                        else {
                            if (e == "br" && s) {
                                m.add(new CKEDITOR.htmlParser.text("\n"));
                                return
                            }
                            e == "textarea" && (p = true)
                        }
                        if (e == "br") o.push(f);
                        else {
                            for (;;) {
                                l = (i = m.name) ? CKEDITOR.dtd[i] || (m._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : d;
                                if (!f.isUnknown && !m.isUnknown && !l[e])
                                    if (m.isOptionalClose) q.onTagClose(i);
                                    else if (e in h && i in h) {
                                    i = m.children;
                                    (i = i[i.length - 1]) && i.name == "li" || k(i = new CKEDITOR.htmlParser.element("li"), m);
                                    !f.returnPoint && (f.returnPoint = m);
                                    m = i
                                } else if (e in CKEDITOR.dtd.$listItem && i != e) q.onTagOpen(e == "li" ? "ul" : "dl", {}, 0, 1);
                                else if (i in b && i != e) {
                                    !f.returnPoint && (f.returnPoint = m);
                                    m = m.parent
                                } else {
                                    i in CKEDITOR.dtd.$inline && n.unshift(m);
                                    if (m.parent) k(m, m.parent, 1);
                                    else {
                                        f.isOrphan = 1;
                                        break
                                    }
                                } else break
                            }
                            g(e);
                            j();
                            f.parent = m;
                            f.isEmpty ? k(f) : m = f
                        }
                    }
                };
                q.onTagClose = function(a) {
                    for (var b = n.length - 1; b >= 0; b--)
                        if (a ==
                            n[b].name) {
                            n.splice(b, 1);
                            return
                        }
                    for (var c = [], g = [], f = m; f != l && f.name != a;) {
                        f._.isBlockLike || g.unshift(f);
                        c.push(f);
                        f = f.returnPoint || f.parent
                    }
                    if (f != l) {
                        for (b = 0; b < c.length; b++) {
                            var d = c[b];
                            k(d, d.parent)
                        }
                        m = f;
                        f._.isBlockLike && j();
                        k(f, f.parent);
                        if (f == m) m = m.parent;
                        n = n.concat(g)
                    }
                    a == "body" && (e = false)
                };
                q.onText = function(a) {
                    if ((!m._.hasInlineStarted || o.length) && !s && !p) {
                        a = CKEDITOR.tools.ltrim(a);
                        if (a.length === 0) return
                    }
                    var c = m.name,
                        f = c ? CKEDITOR.dtd[c] || (m._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : d;
                    if (!p &&
                        !f["#"] && c in b) {
                        q.onTagOpen(c in h ? "li" : c == "dl" ? "dd" : c == "table" ? "tr" : c == "tr" ? "td" : "");
                        q.onText(a)
                    } else {
                        j();
                        g();
                        if (e && (!m.type || m.name == "body") && CKEDITOR.tools.trim(a)) this.onTagOpen(e, {}, 0, 1);
                        !s && !p && (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
                        m.add(new CKEDITOR.htmlParser.text(a))
                    }
                };
                q.onCDATA = function(a) {
                    m.add(new CKEDITOR.htmlParser.cdata(a))
                };
                q.onComment = function(a) {
                    j();
                    g();
                    m.add(new CKEDITOR.htmlParser.comment(a))
                };
                q.parse(i);
                for (j(!CKEDITOR.env.ie && 1); m != l;) k(m, m.parent, 1);
                if (!(l instanceof CKEDITOR.htmlParser.fragment)) {
                    i = new CKEDITOR.htmlParser.fragment;
                    for (f = l.children; f.length;) i.add(f.shift());
                    l = i
                }
                return l
            };
            CKEDITOR.htmlParser.fragment.prototype = {
                add: function(a, b) {
                    isNaN(b) && (b = this.children.length);
                    var c = b > 0 ? this.children[b - 1] : null;
                    if (c) {
                        if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT) {
                            c.value = CKEDITOR.tools.rtrim(c.value);
                            if (c.value.length === 0) {
                                this.children.pop();
                                this.add(a);
                                return
                            }
                        }
                        c.next = a
                    }
                    a.previous = c;
                    a.parent = this;
                    this.children.splice(b, 0, a);
                    if (!this._.hasInlineStarted) this._.hasInlineStarted =
                        a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike
                },
                writeHtml: function(a, b) {
                    var c;
                    this.filterChildren = function() {
                        var a = new CKEDITOR.htmlParser.basicWriter;
                        this.writeChildrenHtml.call(this, a, b, true);
                        a = a.getHtml();
                        this.children = (new CKEDITOR.htmlParser.fragment.fromHtml(a)).children;
                        c = 1
                    };
                    !this.name && b && b.onFragment(this);
                    this.writeChildrenHtml(a, c ? null : b)
                },
                writeChildrenHtml: function(a, b) {
                    for (var c = 0; c < this.children.length; c++) this.children[c].writeHtml(a, b)
                }
            }
        })();
        (function() {
            function a(a,
                b) {
                for (var c = 0; a && c < b.length; c++) var g = b[c],
                    a = a.replace(g[0], g[1]);
                return a
            }

            function b(a, b, c) {
                typeof b == "function" && (b = [b]);
                var g, j;
                j = a.length;
                var d = b && b.length;
                if (d) {
                    for (g = 0; g < j && a[g].pri < c; g++);
                    for (j = d - 1; j >= 0; j--)
                        if (d = b[j]) {
                            d.pri = c;
                            a.splice(g, 0, d)
                        }
                }
            }

            function c(a, b, c) {
                if (b)
                    for (var g in b) {
                        var j = a[g];
                        a[g] = h(j, b[g], c);
                        j || a.$length++
                    }
            }

            function h(a, c, e) {
                if (c) {
                    c.pri = e;
                    if (a) {
                        if (a.splice) b(a, c, e);
                        else {
                            a = a.pri > e ? [c, a] : [a, c];
                            a.filter = d
                        }
                        return a
                    }
                    return c.filter = c
                }
            }

            function d(a) {
                for (var b = a.type || a instanceof
                    CKEDITOR.htmlParser.fragment, c = 0; c < this.length; c++) {
                    if (b) var g = a.type,
                        j = a.name;
                    var d = this[c].apply(window, arguments);
                    if (d === false) return d;
                    if (b) {
                        if (d && (d.name != j || d.type != g)) return d
                    } else if (typeof d != "string") return d;
                    d != void 0 && (a = d)
                }
                return a
            }
            CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
                $: function(a) {
                    this._ = {
                        elementNames: [],
                        attributeNames: [],
                        elements: {
                            $length: 0
                        },
                        attributes: {
                            $length: 0
                        }
                    };
                    a && this.addRules(a, 10)
                },
                proto: {
                    addRules: function(a, f) {
                        typeof f != "number" && (f = 10);
                        b(this._.elementNames,
                            a.elementNames, f);
                        b(this._.attributeNames, a.attributeNames, f);
                        c(this._.elements, a.elements, f);
                        c(this._.attributes, a.attributes, f);
                        this._.text = h(this._.text, a.text, f) || this._.text;
                        this._.comment = h(this._.comment, a.comment, f) || this._.comment;
                        this._.root = h(this._.root, a.root, f) || this._.root
                    },
                    onElementName: function(b) {
                        return a(b, this._.elementNames)
                    },
                    onAttributeName: function(b) {
                        return a(b, this._.attributeNames)
                    },
                    onText: function(a) {
                        var b = this._.text;
                        return b ? b.filter(a) : a
                    },
                    onComment: function(a, b) {
                        var c =
                            this._.comment;
                        return c ? c.filter(a, b) : a
                    },
                    onFragment: function(a) {
                        var b = this._.root;
                        return b ? b.filter(a) : a
                    },
                    onElement: function(a) {
                        for (var b = [this._.elements["^"], this._.elements[a.name], this._.elements.$], c, g = 0; g < 3; g++)
                            if (c = b[g]) {
                                c = c.filter(a, this);
                                if (c === false) return null;
                                if (c && c != a) return this.onNode(c);
                                if (a.parent && !a.name) break
                            }
                        return a
                    },
                    onNode: function(a) {
                        var b = a.type;
                        return b == CKEDITOR.NODE_ELEMENT ? this.onElement(a) : b == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a.value)) : b == CKEDITOR.NODE_COMMENT ?
                            new CKEDITOR.htmlParser.comment(this.onComment(a.value)) : null
                    },
                    onAttribute: function(a, b, c) {
                        if (b = this._.attributes[b]) {
                            a = b.filter(c, a, this);
                            if (a === false) return false;
                            if (typeof a != "undefined") return a
                        }
                        return c
                    }
                }
            })
        })();
        (function() {
            function a(a) {
                return a.enterMode != CKEDITOR.ENTER_BR && a.autoParagraph !== false ? a.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false
            }

            function b(a) {
                for (var b = a.children.length - 1, c = a.children[b]; c && (c.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(c.value) || c.type == CKEDITOR.NODE_ELEMENT &&
                        c.attributes["data-cke-bookmark"]);) c = a.children[--b];
                return b
            }

            function c(a, c) {
                var e = a.children,
                    g = b(a),
                    j = e[g];
                j && ((c || !CKEDITOR.env.ie) && j.type == CKEDITOR.NODE_ELEMENT && j.name == "br" ? e.splice(g, 1) : j.type == CKEDITOR.NODE_TEXT && n.test(j.value) && e.splice(g, 1))
            }

            function h(a, e) {
                return function(g) {
                    c(g, !a);
                    var j;
                    j = !a;
                    if (!j && (!e || typeof e == "function" && e(g) === false)) j = false;
                    else if (j && CKEDITOR.env.ie && (document.documentMode > 7 || g.name in CKEDITOR.dtd.tr || g.name in CKEDITOR.dtd.$listItem)) j = false;
                    else {
                        j = b(g);
                        j =
                            g.children[j];
                        j = !j || j && (j.type == CKEDITOR.NODE_ELEMENT && j.name == "br" || g.name == "form" && j.name == "input")
                    }
                    j && (a || CKEDITOR.env.ie ? g.add(new CKEDITOR.htmlParser.text(" ")) : g.add(new CKEDITOR.htmlParser.element("br", {})))
                }
            }

            function d(a) {
                a = a.attributes;
                a.contenteditable != "false" && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
                a.contenteditable = "false"
            }

            function i(a) {
                a = a.attributes;
                switch (a["data-cke-editable"]) {
                    case "true":
                        a.contenteditable = "true";
                        break;
                    case "1":
                        delete a.contenteditable
                }
            }

            function f(a) {
                return a.replace(w,
                    function(a, b, c) {
                        return "<" + b + c.replace(x, function(a, b) {
                            return !/^on/.test(b) && c.indexOf("data-cke-saved-" + b) == -1 ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a
                        }) + ">"
                    })
            }

            function e(a) {
                return a.replace(y, function(a) {
                    return "<cke:encoded>" + encodeURIComponent(a) + "</cke:encoded>"
                })
            }

            function g(a) {
                return a.replace(z, function(a, b) {
                    return decodeURIComponent(b)
                })
            }

            function j(a) {
                return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function(a) {
                    return "<\!--" + o + "{C}" + encodeURIComponent(a).replace(/--/g,
                        "%2D%2D") + "--\>"
                })
            }

            function k(a) {
                return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function(a, b) {
                    return decodeURIComponent(b)
                })
            }

            function q(a, b) {
                var c = b._.dataStore;
                return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) {
                    return decodeURIComponent(b)
                }).replace(/\{cke_protected_(\d+)\}/g, function(a, b) {
                    return c && c[b] || ""
                })
            }

            function l(a, b) {
                for (var c = [], e = b.config.protectedSource, g = b._.dataStore || (b._.dataStore = {
                        id: 1
                    }), j = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, e = [/<script[\s\S]*?<\/script>/gi,
                        /<noscript[\s\S]*?<\/noscript>/gi
                    ].concat(e), a = a.replace(/<\!--[\s\S]*?--\>/g, function(a) {
                        return "<\!--{cke_tempcomment}" + (c.push(a) - 1) + "--\>"
                    }), f = 0; f < e.length; f++) a = a.replace(e[f], function(a) {
                    a = a.replace(j, function(a, b, e) {
                        return c[e]
                    });
                    return /cke_temp(comment)?/.test(a) ? a : "<\!--{cke_temp}" + (c.push(a) - 1) + "--\>"
                });
                a = a.replace(j, function(a, b, e) {
                    return "<\!--" + o + (b ? "{C}" : "") + encodeURIComponent(c[e]).replace(/--/g, "%2D%2D") + "--\>"
                });
                return a.replace(/(['"]).*?\1/g, function(a) {
                    return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g,
                        function(a, b) {
                            g[g.id] = decodeURIComponent(b);
                            return "{cke_protected_" + g.id++ + "}"
                        })
                })
            }
            CKEDITOR.htmlDataProcessor = function(a) {
                var b, c;
                this.editor = a;
                this.dataFilter = b = new CKEDITOR.htmlParser.filter;
                this.htmlFilter = c = new CKEDITOR.htmlParser.filter;
                this.writer = new CKEDITOR.htmlParser.basicWriter;
                b.addRules(t);
                b.addRules(u);
                c.addRules(v);
                b = {
                    elements: {}
                };
                b.root = h(true, false);
                for (r in s) b.elements[r] = h(true, a.config.fillEmptyBlocks);
                c.addRules(b)
            };
            CKEDITOR.htmlDataProcessor.prototype = {
                toHtml: function(b, c,
                    d) {
                    if (typeof c != "string") {
                        d = c;
                        c = ""
                    }
                    var b = l(b, this.editor),
                        b = f(b),
                        b = e(b),
                        b = b.replace(D, "$1cke:$2"),
                        b = b.replace(B, "<cke:$1$2></cke:$1>"),
                        b = b.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
                        h = this.editor.editable(),
                        i, h = c = c || h.getName();
                    if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && h == "pre") {
                        h = "div";
                        b = "<pre>" + b + "</pre>";
                        i = 1
                    }
                    h = this.editor.document.createElement(h);
                    h.setHtml("a" + b);
                    b = h.getHtml().substr(1);
                    b = b.replace(RegExp(" data-cke-" + CKEDITOR.rnd + "-", "ig"), " ");
                    i && (b = b.replace(/^<pre>|<\/pre>$/gi, ""));
                    b =
                        b.replace(J, "$1$2");
                    b = g(b);
                    b = k(b);
                    b = CKEDITOR.htmlParser.fragment.fromHtml(b, c, d === false ? false : a(this.editor.config));
                    c = new CKEDITOR.htmlParser.basicWriter;
                    b.writeHtml(c, this.dataFilter);
                    b = c.getHtml(true);
                    return b = j(b)
                },
                toDataFormat: function(b) {
                    var c = this.editor.editable(),
                        e = this.writer,
                        b = CKEDITOR.htmlParser.fragment.fromHtml(b, c.getName(), a(this.editor.config));
                    e.reset();
                    b.writeHtml(e, this.htmlFilter);
                    e = e.getHtml(true);
                    e = k(e);
                    return e = q(e, this.editor)
                }
            };
            var n = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
                o = "{cke_protected}",
                m = CKEDITOR.dtd,
                p = ["caption", "colgroup", "col", "thead", "tfoot", "tbody"],
                s = CKEDITOR.tools.extend({}, m.$block, m.$listItem, m.$tableContent),
                r;
            for (r in s) "br" in m[r] || delete s[r];
            delete s.pre;
            var t = {
                    elements: {},
                    attributeNames: [
                        [/^on/, "data-cke-pa-on"]
                    ]
                },
                u = {
                    elements: {}
                };
            for (r in s) u.elements[r] = h();
            var v = {
                elementNames: [
                    [/^cke:/, ""],
                    [/^\?xml:namespace$/, ""]
                ],
                attributeNames: [
                    [/^data-cke-(saved|pa)-/, ""],
                    [/^data-cke-.*/, ""],
                    ["hidefocus", ""]
                ],
                elements: {
                    $: function(a) {
                        var b = a.attributes;
                        if (b) {
                            if (b["data-cke-temp"]) return false;
                            for (var c = ["name", "href", "src"], e, g = 0; g < c.length; g++) {
                                e = "data-cke-saved-" + c[g];
                                e in b && delete b[c[g]]
                            }
                        }
                        return a
                    },
                    table: function(a) {
                        a.children.sort(function(a, b) {
                            return a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type ? CKEDITOR.tools.indexOf(p, a.name) > CKEDITOR.tools.indexOf(p, b.name) ? 1 : -1 : 0
                        })
                    },
                    embed: function(a) {
                        var b = a.parent;
                        if (b && b.name == "object") {
                            var c = b.attributes.width,
                                b = b.attributes.height;
                            c && (a.attributes.width = c);
                            b && (a.attributes.height = b)
                        }
                    },
                    param: function(a) {
                        a.children = [];
                        a.isEmpty = true;
                        return a
                    },
                    a: function(a) {
                        if (!a.children.length && !a.attributes.name && !a.attributes["data-cke-saved-name"]) return false
                    },
                    span: function(a) {
                        a.attributes["class"] == "Apple-style-span" && delete a.name
                    },
                    pre: function(a) {
                        CKEDITOR.env.ie && c(a)
                    },
                    html: function(a) {
                        delete a.attributes.contenteditable;
                        delete a.attributes["class"]
                    },
                    body: function(a) {
                        delete a.attributes.spellcheck;
                        delete a.attributes.contenteditable
                    },
                    style: function(a) {
                        var b = a.children[0];
                        b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
                        if (!a.attributes.type) a.attributes.type =
                            "text/css"
                    },
                    title: function(a) {
                        var b = a.children[0];
                        b && (b.value = a.attributes["data-cke-title"] || "")
                    }
                },
                attributes: {
                    "class": function(a) {
                        return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || false
                    }
                }
            };
            if (CKEDITOR.env.ie) v.attributes.style = function(a) {
                return a.replace(/(^|;)([^\:]+)/g, function(a) {
                    return a.toLowerCase()
                })
            };
            for (r in {
                    input: 1,
                    textarea: 1
                }) {
                t.elements[r] = d;
                v.elements[r] = i
            }
            var w = /<(a|area|img|input)\b([^>]*)>/gi,
                x = /\b(on\w+|href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
                y = /(?:<style(?=[ >])[^>]*>[\s\S]*<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
                z = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
                D = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
                J = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
                B = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
        })();
        CKEDITOR.config.fillEmptyBlocks = !0;
        CKEDITOR.htmlParser.element = function(a, b) {
            this.name = a;
            this.attributes = b || {};
            this.children = [];
            var c = a || "",
                h = c.match(/^cke:(.*)/);
            h && (c = h[1]);
            c = !(!CKEDITOR.dtd.$nonBodyContent[c] &&
                !CKEDITOR.dtd.$block[c] && !CKEDITOR.dtd.$listItem[c] && !CKEDITOR.dtd.$tableContent[c] && !(CKEDITOR.dtd.$nonEditable[c] || c == "br"));
            this.isEmpty = !!CKEDITOR.dtd.$empty[a];
            this.isUnknown = !CKEDITOR.dtd[a];
            this._ = {
                isBlockLike: c,
                hasInlineStarted: this.isEmpty || !c
            }
        };
        CKEDITOR.htmlParser.cssStyle = function(a) {
            var b = {};
            ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, h, d) {
                h == "font-family" && (d = d.replace(/["']/g,
                    ""));
                b[h.toLowerCase()] = d
            });
            return {
                rules: b,
                populate: function(a) {
                    var b = this.toString();
                    if (b) a instanceof CKEDITOR.dom.element ? a.setAttribute("style", b) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = b : a.style = b
                },
                toString: function() {
                    var a = [],
                        h;
                    for (h in b) b[h] && a.push(h, ":", b[h], ";");
                    return a.join("")
                }
            }
        };
        (function() {
            var a = function(a, c) {
                a = a[0];
                c = c[0];
                return a < c ? -1 : a > c ? 1 : 0
            };
            CKEDITOR.htmlParser.element.prototype = {
                type: CKEDITOR.NODE_ELEMENT,
                add: CKEDITOR.htmlParser.fragment.prototype.add,
                clone: function() {
                    return new CKEDITOR.htmlParser.element(this.name,
                        this.attributes)
                },
                writeHtml: function(b, c) {
                    var h = this.attributes,
                        d = this,
                        i = d.name,
                        f, e, g, j;
                    d.filterChildren = function() {
                        if (!j) {
                            var a = new CKEDITOR.htmlParser.basicWriter;
                            CKEDITOR.htmlParser.fragment.prototype.writeChildrenHtml.call(d, a, c);
                            d.children = (new CKEDITOR.htmlParser.fragment.fromHtml(a.getHtml(), d.clone(), 0)).children;
                            j = 1
                        }
                    };
                    if (c) {
                        for (;;) {
                            if (!(i = c.onElementName(i))) return;
                            d.name = i;
                            if (!(d = c.onElement(d))) return;
                            d.parent = this.parent;
                            if (d.name == i) break;
                            if (d.type != CKEDITOR.NODE_ELEMENT) {
                                d.writeHtml(b,
                                    c);
                                return
                            }
                            i = d.name;
                            if (!i) {
                                for (var i = 0, k = this.children.length; i < k; i++) this.children[i].parent = d.parent;
                                this.writeChildrenHtml.call(d, b, j ? null : c);
                                return
                            }
                        }
                        h = d.attributes
                    }
                    b.openTag(i, h);
                    for (var k = [], q = 0; q < 2; q++)
                        for (f in h) {
                            e = f;
                            g = h[f];
                            if (q == 1) k.push([f, g]);
                            else if (c) {
                                for (;;)
                                    if (e = c.onAttributeName(f))
                                        if (e != f) {
                                            delete h[f];
                                            f = e
                                        } else break;
                                else {
                                    delete h[f];
                                    break
                                }
                                e && ((g = c.onAttribute(d, e, g)) === false ? delete h[e] : h[e] = g)
                            }
                        }
                    b.sortAttributes && k.sort(a);
                    h = k.length;
                    for (q = 0; q < h; q++) {
                        f = k[q];
                        b.attribute(f[0], f[1])
                    }
                    b.openTagClose(i,
                        d.isEmpty);
                    if (!d.isEmpty) {
                        this.writeChildrenHtml.call(d, b, j ? null : c);
                        b.closeTag(i)
                    }
                },
                writeChildrenHtml: function(a, c) {
                    CKEDITOR.htmlParser.fragment.prototype.writeChildrenHtml.apply(this, arguments)
                }
            }
        })();
        (function() {
            var a = {};
            CKEDITOR.template = function(b) {
                if (a[b]) this.output = a[b];
                else {
                    var c = b.replace(/'/g, "\\'").replace(/{([^}]+)}/g, function(a, b) {
                        return "',data['" + b + "']==undefined?'{" + b + "}':data['" + b + "'],'"
                    });
                    this.output = a[b] = Function("data", "buffer", "return buffer?buffer.push('" + c + "'):['" + c + "'].join('');")
                }
            }
        })();
        delete CKEDITOR.loadFullCore;
        CKEDITOR.instances = {};
        CKEDITOR.document = new CKEDITOR.dom.document(document);
        CKEDITOR.add = function(a) {
            CKEDITOR.instances[a.name] = a;
            a.on("focus", function() {
                if (CKEDITOR.currentInstance != a) {
                    CKEDITOR.currentInstance = a;
                    CKEDITOR.fire("currentInstance")
                }
            });
            a.on("blur", function() {
                if (CKEDITOR.currentInstance == a) {
                    CKEDITOR.currentInstance = null;
                    CKEDITOR.fire("currentInstance")
                }
            });
            CKEDITOR.fire("instance", null, a)
        };
        CKEDITOR.remove = function(a) {
            delete CKEDITOR.instances[a.name]
        };
        (function() {
            var a = {};
            CKEDITOR.addTemplate = function(b, c) {
                var h = a[b];
                if (h) return h;
                h = {
                    name: b,
                    source: c
                };
                CKEDITOR.fire("template", h);
                return a[b] = new CKEDITOR.template(h.source)
            };
            CKEDITOR.getTemplate = function(b) {
                return a[b]
            }
        })();
        (function() {
            var a = [];
            CKEDITOR.addCss = function(b) {
                a.push(b)
            };
            CKEDITOR.getCss = function() {
                return a.join("\n")
            }
        })();
        CKEDITOR.on("instanceDestroyed", function() {
            CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
        });
        CKEDITOR.TRISTATE_ON = 1;
        CKEDITOR.TRISTATE_OFF = 2;
        CKEDITOR.TRISTATE_DISABLED = 0;
        (function() {
            CKEDITOR.inline = function(a, b) {
                if (!CKEDITOR.env.isCompatible) return null;
                a = CKEDITOR.dom.element.get(a);
                if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
                var c = new CKEDITOR.editor(b, a, CKEDITOR.ELEMENT_MODE_INLINE);
                c.setData(a.getHtml(), null, true);
                c.on("loaded", function() {
                    c.fire("uiReady");
                    c.editable(a);
                    c.container = a;
                    c.setData(c.getData(1));
                    c.fire("contentDom");
                    c.mode = "wysiwyg";
                    c.fire("mode");
                    c.fireOnce("instanceReady");
                    CKEDITOR.fire("instanceReady",
                        null, c);
                    c.resetDirty()
                }, null, null, 1E4);
                c.on("destroy", function() {
                    c.element.clearCustomData();
                    delete c.element
                });
                return c
            };
            CKEDITOR.inlineAll = function() {
                var a, b, c;
                for (c in CKEDITOR.dtd.$editable)
                    for (var h = CKEDITOR.document.getElementsByTag(c), d = 0, i = h.count(); d < i; d++) {
                        a = h.getItem(d);
                        if (a.getAttribute("contenteditable") == "true") {
                            b = {
                                element: a,
                                config: {}
                            };
                            CKEDITOR.fire("inline", b) !== false && CKEDITOR.inline(a, b.config)
                        }
                    }
            };
            CKEDITOR.domReady(function() {
                !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
            })
        })();
        CKEDITOR.replaceClass = "ckeditor";
        (function() {
            function a(a, f, e, g) {
                if (!CKEDITOR.env.isCompatible) return null;
                a = CKEDITOR.dom.element.get(a);
                if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
                var j = new CKEDITOR.editor(f, a, g);
                g == CKEDITOR.ELEMENT_MODE_REPLACE && a.setStyle("visibility", "hidden");
                e && j.setData(e, null, true);
                j.on("loaded", function() {
                    c(j);
                    g == CKEDITOR.ELEMENT_MODE_REPLACE && j.config.autoUpdateElement && h(j);
                    j.setMode(j.config.startupMode,
                        function() {
                            j.fireOnce("instanceReady");
                            CKEDITOR.fire("instanceReady", null, j);
                            j.resetDirty()
                        })
                });
                j.on("destroy", b);
                return j
            }

            function b() {
                var a = this.container,
                    b = this.element;
                if (a) {
                    a.clearCustomData();
                    a.remove()
                }
                if (b) {
                    b.clearCustomData();
                    this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && b.show();
                    delete this.element
                }
            }

            function c(a) {
                var b = a.name,
                    c = a.element,
                    g = a.elementMode,
                    j = a.fire("uiSpace", {
                        space: "top",
                        html: ""
                    }).html,
                    h = a.fireOnce("uiSpace", {
                        space: "bottom",
                        html: ""
                    }).html,
                    q = a.config.height;
                isNaN(q) || (q =
                    q + "px");
                var l = "",
                    n = a.config.width;
                isNaN(n) || (l = l + ("width:" + n + "px;"));
                d || (d = CKEDITOR.addTemplate("maincontainer", '<span id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application" aria-labelledby="cke_{name}_arialbl" {style}><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><span class="cke_inner cke_reset" role="presentation"><span id="{topId}" class="cke_top cke_reset_all" role="presentation" style="height:auto">{topHtml}</span><span id="{contentId}" class="cke_contents cke_reset" role="presentation" style="height:{height}"></span><span id="{bottomId}" class="cke_bottom cke_reset_all" role="presentation">{bottomHtml}</span></span></span>'));
                var o = CKEDITOR.dom.element.createFromHtml(d.output({
                    id: a.id,
                    name: b,
                    langDir: a.lang.dir,
                    langCode: a.langCode,
                    voiceLabel: a.lang.editor,
                    style: l ? ' style="' + l + '"' : "",
                    height: q,
                    topId: a.ui.spaceId("top"),
                    topHtml: j || "",
                    contentId: a.ui.spaceId("contents"),
                    bottomId: a.ui.spaceId("bottom"),
                    bottomHtml: h || ""
                }));
                if (g == CKEDITOR.ELEMENT_MODE_REPLACE) {
                    c.hide();
                    o.insertAfter(c)
                } else c.append(o);
                a.container = o;
                a.ui.space("top").unselectable();
                a.ui.space("bottom").unselectable();
                o.disableContextMenu();
                CKEDITOR.env.webkit &&
                    o.on("focus", function() {
                        a.focus()
                    });
                a.on("contentDirChanged", function(b) {
                    b = (a.lang.dir != b.data ? "add" : "remove") + "Class";
                    o.getChild(1)[b]("cke_mixed_dir_content")
                });
                a.fireOnce("uiReady")
            }

            function h(a) {
                var b = a.element;
                if (a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && b.is("textarea")) {
                    var c = b.$.form && new CKEDITOR.dom.element(b.$.form);
                    if (c) {
                        var g = function() {
                            a.updateElement()
                        };
                        c.on("submit", g);
                        if (!c.$.submit.nodeName && !c.$.submit.length) c.$.submit = CKEDITOR.tools.override(c.$.submit, function(b) {
                            return function() {
                                a.updateElement();
                                b.apply ? b.apply(this, arguments) : b()
                            }
                        });
                        a.on("destroy", function() {
                            c.removeListener("submit", g)
                        })
                    }
                }
            }
            CKEDITOR.replace = function(b, c) {
                return a(b, c, null, CKEDITOR.ELEMENT_MODE_REPLACE)
            };
            CKEDITOR.appendTo = function(b, c, e) {
                return a(b, c, e, CKEDITOR.ELEMENT_MODE_APPENDTO)
            };
            CKEDITOR.replaceAll = function() {
                for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
                    var c = null,
                        g = a[b];
                    if (g.name || g.id) {
                        if (typeof arguments[0] == "string") {
                            if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(g.className)) continue
                        } else if (typeof arguments[0] ==
                            "function") {
                            c = {};
                            if (arguments[0](g, c) === false) continue
                        }
                        this.replace(g, c)
                    }
                }
            };
            CKEDITOR.editor.prototype.addMode = function(a, b) {
                (this._.modes || (this._.modes = {}))[a] = b
            };
            CKEDITOR.editor.prototype.setMode = function(a, b) {
                var c = this,
                    g = this._.modes;
                if (!(a == c.mode || !g || !g[a])) {
                    c.fire("beforeSetMode", a);
                    if (c.mode) {
                        var j = c.checkDirty();
                        c._.previousMode = c.mode;
                        c.fire("beforeModeUnload");
                        c.editable(0);
                        c.mode = ""
                    }
                    this._.modes[a](function() {
                        c.mode = a;
                        if (j !== void 0) {
                            c.mayBeDirty = true;
                            !j && c.resetDirty()
                        }
                        setTimeout(function() {
                            c.fire("mode");
                            b && b.call(c)
                        }, 0)
                    })
                }
            };
            CKEDITOR.editor.prototype.resize = function(a, b, c, g) {
                var j = this.container,
                    d = this.ui.space("contents"),
                    h = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement,
                    g = g ? j.getChild(1) : j;
                g.setSize("width", a, true);
                h && (h.style.width = "1%");
                d.setStyle("height", Math.max(b - (c ? 0 : (g.$.offsetHeight || 0) - (d.$.clientHeight || 0)), 0) + "px");
                h && (h.style.width = "100%");
                this.fire("resize")
            };
            CKEDITOR.editor.prototype.getResizable = function(a) {
                return a ? this.ui.space("contents") : this.container
            };
            var d;
            CKEDITOR.domReady(function() {
                CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
            })
        })();
        CKEDITOR.config.startupMode = "wysiwyg";
        (function() {
            function a(a) {
                var b = a.data.getTarget();
                if (b.is("input")) {
                    b = b.getAttribute("type");
                    (b == "submit" || b == "reset") && a.data.preventDefault()
                }
            }

            function b(a) {
                return d(a) && i(a)
            }

            function c(a, b) {
                return function(c) {
                    var f = c.data.getTarget(),
                        d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget,
                        d = d ? CKEDITOR.dom.element.get(d) : null;
                    f.equals(b) && (!d ||
                        !b.contains(d)) && a.call(this, c)
                }
            }
            CKEDITOR.editable = CKEDITOR.tools.createClass({
                base: CKEDITOR.dom.element,
                $: function(a, b) {
                    this.base(b.$ || b);
                    this.editor = a;
                    this.hasFocus = false;
                    this.setup()
                },
                proto: {
                    focus: function() {
                        this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]();
                        CKEDITOR.env.safari && !this.isInline() && (CKEDITOR.document.getActive().equals(this.getWindow().getFrame()) || this.getWindow().focus())
                    },
                    on: function(a, b) {
                        var j = Array.prototype.slice.call(arguments, 0);
                        if (CKEDITOR.env.ie &&
                            /^focus|blur$/.exec(a)) {
                            a = a == "focus" ? "focusin" : "focusout";
                            b = c(b, this);
                            j[0] = a;
                            j[1] = b
                        }
                        return CKEDITOR.dom.element.prototype.on.apply(this, j)
                    },
                    attachListener: function(a, b, c, f, d, h) {
                        !this._.listeners && (this._.listeners = []);
                        var i = Array.prototype.slice.call(arguments, 1);
                        this._.listeners.push(a.on.apply(a, i))
                    },
                    clearListeners: function() {
                        var a = this._.listeners;
                        try {
                            for (; a.length;) a.pop().removeListener()
                        } catch (b) {}
                    },
                    attachClass: function(a) {
                        var b = this.getCustomData("classes");
                        if (!this.hasClass(a)) {
                            !b && (b = []);
                            b.push(a);
                            this.setCustomData("classes", b);
                            this.addClass(a)
                        }
                    },
                    insertHtml: function(a, b) {
                        f(this, b == "text" ? "text" : "html", a)
                    },
                    insertText: function(a) {
                        var b = this.editor,
                            c = b.getSelection().getStartElement().hasAscendant("pre", true) ? CKEDITOR.ENTER_BR : b.config.enterMode,
                            b = c == CKEDITOR.ENTER_BR,
                            d = CKEDITOR.tools,
                            a = d.htmlEncode(a.replace(/\r\n/g, "\n")),
                            a = a.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"),
                            c = c == CKEDITOR.ENTER_P ? "p" : "div";
                        if (!b) {
                            var h = /\n{2}/g;
                            if (h.test(a)) var i = "<" + c + ">",
                                n = "</" + c + ">",
                                a = i + a.replace(h, function() {
                                    return n +
                                        i
                                }) + n
                        }
                        a = a.replace(/\n/g, "<br>");
                        b || (a = a.replace(RegExp("<br>(?=</" + c + ">)"), function(a) {
                            return d.repeat(a, 2)
                        }));
                        a = a.replace(/(>|\s) /g, function(a, b) {
                            return b + "&nbsp;"
                        }).replace(/ (?=<)/g, "&nbsp;");
                        f(this, "text", a)
                    },
                    insertElement: function(a) {
                        this.editor.focus();
                        this.editor.fire("saveSnapshot");
                        for (var c = this.editor, j = c.config.enterMode, f = c.getSelection(), d = f.getRanges(), h = a.getName(), i = CKEDITOR.dtd.$block[h], o, m, p, s = d.length - 1; s >= 0; s--) {
                            o = d[s];
                            if (!o.checkReadOnly()) {
                                o.deleteContents(1);
                                m = !s && a || a.clone(1);
                                var r, t;
                                if (i)
                                    for (;
                                        (r = o.getCommonAncestor(0, 1)) && (t = CKEDITOR.dtd[r.getName()]) && (!t || !t[h]);)
                                        if (r.getName() in CKEDITOR.dtd.span) o.splitElement(r);
                                        else if (o.checkStartOfBlock() && o.checkEndOfBlock()) {
                                    o.setStartBefore(r);
                                    o.collapse(true);
                                    r.remove()
                                } else o.splitBlock(j == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
                                o.insertNode(m);
                                p || (p = m)
                            }
                        }
                        if (p) {
                            o.moveToPosition(p, CKEDITOR.POSITION_AFTER_END);
                            if (i)
                                if ((a = p.getNext(b)) && a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$block)) a.getDtd()["#"] ? o.moveToElementEditStart(a) :
                                    o.moveToElementEditEnd(p);
                                else if (!a && j != CKEDITOR.ENTER_BR) {
                                a = o.fixBlock(true, j == CKEDITOR.ENTER_DIV ? "div" : "p");
                                o.moveToElementEditStart(a)
                            }
                        }
                        f.selectRanges([o]);
                        setTimeout(function() {
                            c.fire("saveSnapshot")
                        }, 0)
                    },
                    setData: function(a, b) {
                        !b && this.editor.dataProcessor && (a = this.editor.dataProcessor.toHtml(a));
                        this.setHtml(a);
                        this.editor.fire("dataReady")
                    },
                    getData: function(a) {
                        var b = this.getHtml();
                        !a && this.editor.dataProcessor && (b = this.editor.dataProcessor.toDataFormat(b));
                        return b
                    },
                    setReadOnly: function(a) {
                        this.setAttribute("contenteditable", !a)
                    },
                    detach: function() {
                        this.removeClass("cke_editable");
                        var a = this.editor;
                        this._.detach();
                        delete a.document;
                        delete a.window
                    },
                    isInline: function() {
                        return this.getDocument().equals(CKEDITOR.document)
                    },
                    setup: function() {
                        var b = this.editor;
                        this.attachListener(b, "beforeGetData", function() {
                            b.setData(this.getData(), null, 1)
                        }, this);
                        this.attachListener(b, "getSnapshot", function(a) {
                            a.data = this.getData(1)
                        }, this);
                        this.attachListener(b, "afterSetData", function() {
                            this.setData(b.getData(1))
                        }, this);
                        this.attachListener(b,
                            "loadSnapshot",
                            function(a) {
                                this.setData(a.data, 1)
                            }, this);
                        this.attachListener(b, "beforeFocus", function() {
                            var a = b.getSelection();
                            (a = a && a.getNative()) && a.type == "Control" || this.focus()
                        }, this);
                        this.attachListener(b, "insertHtml", function(a) {
                            this.insertHtml(a.data.dataValue, a.data.mode)
                        }, this);
                        this.attachListener(b, "insertElement", function(a) {
                            this.insertElement(a.data)
                        }, this);
                        this.attachListener(b, "insertText", function(a) {
                            this.insertText(a.data)
                        }, this);
                        this.setReadOnly(b.readOnly);
                        this.attachClass("cke_editable");
                        this.attachClass("cke_contents_" + b.config.contentsLangDirection);
                        b.keystrokeHandler.blockedKeystrokes[8] = b.readOnly;
                        b.keystrokeHandler.attach(this);
                        this.on("blur", function() {
                            this.hasFocus = false
                        });
                        this.on("focus", function() {
                            this.hasFocus = true
                        });
                        b.focusManager.add(this);
                        if (this.equals(CKEDITOR.document.getActive())) {
                            this.hasFocus = true;
                            b.once("contentDom", function() {
                                b.focusManager.focus()
                            })
                        }
                        if (!this.is("textarea")) {
                            b.document = this.getDocument();
                            b.window = this.getWindow();
                            var c = b.document,
                                j = b.config.contentsLangDirection;
                            if (this.getDirection(1) != j) {
                                this.setCustomData("org_dir_saved", this.getAttribute("dir") || "");
                                this.setAttribute("dir", j)
                            }
                            if (b.document.equals(CKEDITOR.document)) {
                                j = this.getAttribute("tabindex");
                                this.setCustomData("org_tabindex_saved", j);
                                j != b.tabIndex && this.setAttribute("tabIndex", b.tabIndex)
                            }
                            if (j = CKEDITOR.getCss()) {
                                var f = c.getHead();
                                f.getCustomData("stylesheet") || f.setCustomData("stylesheet", c.appendStyleText(j))
                            }
                            j = c.getCustomData("stylesheet_ref") || 0;
                            c.setCustomData("stylesheet_ref", j + 1);
                            this.attachListener(this,
                                "click",
                                function(a) {
                                    var a = a.data,
                                        b = a.getTarget();
                                    b.is("a") && (a.$.button != 2 && b.isReadOnly()) && a.preventDefault()
                                });
                            this.attachListener(this, "keydown", function(a) {
                                if (b.readOnly) return false;
                                var c = a.data.getKeystroke();
                                if (c in {
                                        8: 1,
                                        46: 1
                                    }) {
                                    var g = b.getSelection(),
                                        j = g.getSelectedElement(),
                                        g = g.getRanges()[0],
                                        f = g.startPath(),
                                        h, k, i, c = c == 8;
                                    if (j) {
                                        b.fire("saveSnapshot");
                                        g.moveToPosition(j, CKEDITOR.POSITION_BEFORE_START);
                                        j.remove();
                                        b.fire("saveSnapshot");
                                        a.data.preventDefault()
                                    } else if (g.collapsed)
                                        if ((h = f.block) &&
                                            g[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && (i = h[c ? "getPrevious" : "getNext"](d)) && i.is("table")) {
                                            b.fire("saveSnapshot");
                                            g[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && h.remove();
                                            g["moveToElementEdit" + (c ? "End" : "Start")](i);
                                            g.select();
                                            b.fire("saveSnapshot");
                                            a.data.preventDefault()
                                        } else if (f.blockLimit && f.blockLimit.is("td") && (k = f.blockLimit.getAscendant("table")) && g.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (i = k[c ? "getPrevious" : "getNext"](d))) {
                                        b.fire("saveSnapshot");
                                        g["moveToElementEdit" +
                                            (c ? "End" : "Start")](i);
                                        g.checkStartOfBlock() && g.checkEndOfBlock() ? i.remove() : g.select();
                                        b.fire("saveSnapshot");
                                        a.data.preventDefault()
                                    }
                                }
                                return true
                            });
                            CKEDITOR.env.ie && this.attachListener(this, "click", a);
                            !CKEDITOR.env.ie && !CKEDITOR.env.opera && this.attachListener(this, "mousedown", function(a) {
                                a = a.data.getTarget();
                                a.is("img", "hr", "input", "textarea", "select") && b.getSelection().selectElement(a)
                            });
                            CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(a) {
                                if (a.data.$.button == 2) {
                                    a = a.data.getTarget();
                                    if (!a.getOuterHtml().replace(h, "")) {
                                        var c = b.createRange();
                                        c.moveToElementEditStart(a);
                                        c.select(true)
                                    }
                                }
                            });
                            if (CKEDITOR.env.webkit) {
                                this.attachListener(this, "click", function(a) {
                                    a.data.getTarget().is("input", "select") && a.data.preventDefasult()
                                });
                                this.attachListener(this, "mouseup", function(a) {
                                    a.data.getTarget().is("input", "textarea") && a.data.preventDefault()
                                })
                            }
                        }
                    }
                },
                _: {
                    detach: function() {
                        this.editor.setData(this.editor.getData(), 0, 1);
                        this.clearListeners();
                        var a = this.removeCustomData("org_dir_saved");
                        a !==
                            null && (a ? this.setAttribute("dir", a) : this.removeAttribute("dir"));
                        a = this.removeCustomData("org_tabindex_saved");
                        a !== null ? this.setAttribute("tabIndex", a) : this.removeAttribute("tabIndex");
                        if (a = this.removeCustomData("classes"))
                            for (; a.length;) this.removeClass(a.pop());
                        var a = this.getDocument(),
                            b = a.getHead();
                        if (b.getCustomData("stylesheet")) {
                            var c = a.getCustomData("stylesheet_ref");
                            if (--c) a.setCustomData("stylesheet_ref", c);
                            else {
                                a.removeCustomData("stylesheet_ref");
                                a = b.removeCustomData("stylesheet");
                                a = new CKEDITOR.dom.element(a.ownerNode ||
                                    a.owningElement);
                                a.remove()
                            }
                        }
                        delete this.editor
                    }
                }
            });
            CKEDITOR.editor.prototype.editable = function(a) {
                var b = this._.editable;
                if (b && a) return 0;
                if (arguments.length) b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null);
                return b
            };
            var h = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
                d = CKEDITOR.dom.walker.whitespaces(true),
                i = CKEDITOR.dom.walker.bookmark(false, true);
            CKEDITOR.on("instanceLoaded",
                function(a) {
                    var c = a.editor;
                    c.on("insertElement", function(a) {
                        a = a.data;
                        if (a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea"))) {
                            a.getAttribute("contentEditable") != "false" && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1");
                            a.setAttribute("contentEditable", false)
                        }
                    });
                    c.on("selectionChange", function(a) {
                        if (!c.readOnly) {
                            var e = c.getSelection();
                            if (e && !e.isLocked) {
                                e = c.checkDirty();
                                c.fire("saveSnapshot", {
                                    contentOnly: 1
                                });
                                var f = a.editor,
                                    i = f.editable(),
                                    n = a.data.path,
                                    o = n.blockLimit,
                                    m = a.data.selection.getRanges()[0],
                                    p = f.config.enterMode,
                                    s = 0;
                                if (CKEDITOR.env.gecko) {
                                    var r = n.block || n.blockLimit || n.root,
                                        t = r && r.getLast(b);
                                    if (r && r.isBlockBoundary() && (!t || !(t.type == CKEDITOR.NODE_ELEMENT && t.isBlockBoundary())) && !r.is("pre") && !r.getBogus()) {
                                        r.appendBogus();
                                        s = 1
                                    }
                                }
                                if (f.config.autoParagraph !== false && p != CKEDITOR.ENTER_BR && m.collapsed && i.equals(o) && !n.block) {
                                    f = m.fixBlock(true, f.config.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p");
                                    if (CKEDITOR.env.ie)
                                        if ((i = f.getFirst(b)) && i.type == CKEDITOR.NODE_TEXT &&
                                            CKEDITOR.tools.trim(i.getText()).match(/^(?:&nbsp;|\xa0)$/)) {
                                            i.remove();
                                            s = 1
                                        }
                                    if (f.getOuterHtml().match(h))
                                        if ((i = f.getNext(d)) && i.type == CKEDITOR.NODE_ELEMENT && (!i.isBlockBoundary() || !CKEDITOR.dtd.$empty[i.getName()])) {
                                            m.moveToElementEditStart(i);
                                            f.remove();
                                            s = 1
                                        } else if ((i = f.getPrevious(d)) && i.type == CKEDITOR.NODE_ELEMENT && (!i.isBlockBoundary() || !CKEDITOR.dtd.$empty[i.getName()])) {
                                        m.moveToElementEditEnd(i);
                                        f.remove();
                                        s = 1
                                    }
                                    m.select();
                                    a.cancel()
                                }
                                s && c.fire("updateSnapshot");
                                !e && c.resetDirty()
                            }
                        }
                    })
                });
            var f =
                function() {
                    function a(b, c) {
                        function g() {
                            var a = b.range.document;
                            return CKEDITOR.tools.tryThese(function() {
                                a.$.execCommand("inserthtml", false, c);
                                return 1
                            }, function() {
                                a.$.selection.createRange().pasteHTML(c);
                                return 1
                            })
                        }
                        var e = /<(ol|ul|dl)\b/i.test(c),
                            f = b.range.startPath();
                        return e && (f.block && f.block.is(o.$listItem) || f.lastElement.is(o.$list)) ? g() : 0
                    }

                    function c(a) {
                        var b = a.editor;
                        b.getSelection().scrollIntoView();
                        setTimeout(function() {
                            b.fire("saveSnapshot")
                        }, 0)
                    }

                    function f(a) {
                        return a.type == CKEDITOR.NODE_ELEMENT
                    }

                    function d(a, b) {
                        var c = [],
                            g = a.getChildren(),
                            e = g.count(),
                            h, i = 0,
                            q = o[b],
                            n = !a.is(o.$inline) || a.is("br");
                        for (n && c.push(" "); i < e; i++) {
                            h = g.getItem(i);
                            f(h) && !h.is(q) ? c = c.concat(d(h, b)) : c.push(h)
                        }
                        n && c.push(" ");
                        return c
                    }

                    function h(a) {
                        return a && f(a) && (a.is(o.$removeEmpty) || a.is("a") && !a.isBlockBoundary())
                    }

                    function i(a, b, c, g) {
                        var e = a.clone(),
                            d, h;
                        e.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
                        if ((d = (new CKEDITOR.dom.walker(e)).next()) && f(d) && m[d.getName()] && (h = d.getPrevious()) && f(h) && !h.getParent().equals(a.startContainer) &&
                            c.contains(h) && g.contains(d) && d.isIdentical(h)) {
                            d.moveChildren(h);
                            d.remove();
                            i(a, b, c, g)
                        }
                    }

                    function n(a, b) {
                        function c(a, b) {
                            if (b.isBlock && b.isElement && !b.node.is("br") && f(a) && a.is("br")) {
                                a.remove();
                                return 1
                            }
                        }
                        var g = b.endContainer.getChild(b.endOffset),
                            e = b.endContainer.getChild(b.endOffset - 1);
                        g && c(g, a[a.length - 1]);
                        if (e && c(e, a[0])) {
                            b.setEnd(b.endContainer, b.endOffset - 1);
                            b.collapse()
                        }
                    }
                    var o = CKEDITOR.dtd,
                        m = {
                            p: 1,
                            div: 1,
                            h1: 1,
                            h2: 1,
                            h3: 1,
                            h4: 1,
                            h5: 1,
                            h6: 1,
                            ul: 1,
                            ol: 1,
                            li: 1,
                            pre: 1,
                            dl: 1,
                            blockquote: 1
                        },
                        p = {
                            p: 1,
                            div: 1,
                            h1: 1,
                            h2: 1,
                            h3: 1,
                            h4: 1,
                            h5: 1,
                            h6: 1
                        },
                        s = CKEDITOR.tools.extend({}, o.$inline);
                    delete s.br;
                    return function(m, t, u) {
                        m.editor.focus();
                        m.editor.fire("saveSnapshot");
                        var v = m.editor;
                        m.getDocument();
                        var w = v.getSelection().getRanges()[0];
                        if (!w.checkReadOnly()) {
                            var x = (new CKEDITOR.dom.elementPath(w.startContainer, w.root)).blockLimit || w.root,
                                t = {
                                    type: t,
                                    editable: m,
                                    editor: v,
                                    range: w,
                                    blockLimit: x,
                                    mergeCandidates: [],
                                    zombies: []
                                };
                            if (!a(t, u)) {
                                var v = t.range,
                                    x = t.mergeCandidates,
                                    y, z, D, J, B;
                                if (t.type == "text" && v.shrink(CKEDITOR.SHRINK_ELEMENT,
                                        true, false)) {
                                    z = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", v.document);
                                    v.insertNode(z);
                                    v.setStartAfter(z)
                                }
                                D = new CKEDITOR.dom.elementPath(v.startContainer);
                                t.endPath = J = new CKEDITOR.dom.elementPath(v.endContainer);
                                if (!v.collapsed) {
                                    y = J.block || J.blockLimit;
                                    var F = v.getCommonAncestor();
                                    y && (!y.equals(F) && !y.contains(F) && v.checkEndOfBlock()) && t.zombies.push(y);
                                    v.deleteContents()
                                }
                                for (;
                                    (B = f(v.startContainer) && v.startContainer.getChild(v.startOffset - 1)) && f(B) && B.isBlockBoundary() && D.contains(B);) v.moveToPosition(B,
                                    CKEDITOR.POSITION_BEFORE_END);
                                i(v, t.blockLimit, D, J);
                                if (z) {
                                    v.setEndBefore(z);
                                    v.collapse();
                                    z.remove()
                                }
                                z = v.startPath();
                                if (y = z.contains(h, false, 1)) {
                                    v.splitElement(y);
                                    t.inlineStylesRoot = y;
                                    t.inlineStylesPeak = z.lastElement
                                }
                                z = v.createBookmark();
                                (y = z.startNode.getPrevious(b)) && f(y) && h(y) && x.push(y);
                                (y = z.startNode.getNext(b)) && f(y) && h(y) && x.push(y);
                                for (y = z.startNode;
                                    (y = y.getParent()) && h(y);) x.push(y);
                                v.moveToBookmark(z);
                                if (u) {
                                    B = u;
                                    z = t.range;
                                    if (t.type == "text" && t.inlineStylesRoot) {
                                        u = B;
                                        B = t.inlineStylesPeak;
                                        v = B.getDocument().createText("{cke-peak}");
                                        for (x = t.inlineStylesRoot.getParent(); !B.equals(x);) {
                                            v = v.appendTo(B.clone());
                                            B = B.getParent()
                                        }
                                        B = v.getOuterHtml().replace("{cke-peak}", u)
                                    }
                                    B = t.editor.dataProcessor.toHtml(B, t.blockLimit.getName(), false);
                                    u = z.document.createElement("body");
                                    u.setHtml(B);
                                    if ((z = z.startPath().block) && !(z.getChildCount() == 1 && z.getBogus())) a: {
                                        var E;
                                        if (u.getChildCount() == 1 && f(E = u.getFirst()) && E.is(p)) {
                                            z = E.getElementsByTag("*");
                                            B = 0;
                                            for (x = z.count(); B < x; B++) {
                                                v = z.getItem(B);
                                                if (!v.is(s)) break a
                                            }
                                            E.moveChildren(E.getParent(1));
                                            E.remove()
                                        }
                                    }
                                    t.dataWrapper =
                                        u;
                                    E = t.range;
                                    var u = E.document,
                                        A;
                                    z = t.blockLimit;
                                    var G;
                                    B = 0;
                                    var K, v = [],
                                        L, I;
                                    y = x = 0;
                                    var C, P;
                                    A = E.startContainer;
                                    D = t.endPath.elements[0];
                                    var O;
                                    J = D.getPosition(A);
                                    J = !!D.getCommonAncestor(A) && J != CKEDITOR.POSITION_IDENTICAL && !(J & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                                    var H = t.dataWrapper,
                                        M, Q, F = [];
                                    A = o[A.getName()];
                                    C = 0;
                                    for (var N = H.getChildren(), R = N.count(), S = -1, U = -1, V = 0; C < R; ++C) {
                                        H = N.getItem(C);
                                        if (f(H)) {
                                            M = H.getName();
                                            Q = !!A[M];
                                            if (M == "br" && H.data("cke-eol") && (!C || C == R - 1)) {
                                                V = (G = C ? F[C - 1].node : N.getItem(C +
                                                    1)) && (!f(G) || !G.is("br"));
                                                G = G && f(G) && o.$block[G.getName()]
                                            }
                                            S == -1 && !Q && (S = C);
                                            Q || (U = C);
                                            F.push({
                                                isElement: 1,
                                                isLineBreak: V,
                                                isBlock: H.isBlockBoundary(),
                                                hasBlockSibling: G,
                                                node: H,
                                                name: M,
                                                allowed: Q
                                            });
                                            G = V = 0
                                        } else F.push({
                                            isElement: 0,
                                            node: H,
                                            allowed: 1
                                        })
                                    }
                                    if (S > -1) F[S].firstNotAllowed = 1;
                                    if (U > -1) F[U].lastNotAllowed = 1;
                                    for (n(F, E); B < F.length; B++) {
                                        G = F[B];
                                        if (A = G.isLineBreak) {
                                            A = E;
                                            C = z;
                                            M = H = void 0;
                                            if (G.hasBlockSibling) A = 1;
                                            else {
                                                H = A.startContainer.getAscendant(o.$block, 1);
                                                if (!H || !H.is({
                                                        div: 1,
                                                        p: 1
                                                    })) A = 0;
                                                else {
                                                    M = H.getPosition(C);
                                                    if (M == CKEDITOR.POSITION_IDENTICAL || M == CKEDITOR.POSITION_CONTAINS) A = 0;
                                                    else {
                                                        C = A.splitElement(H);
                                                        A.moveToPosition(C, CKEDITOR.POSITION_AFTER_START);
                                                        A = 1
                                                    }
                                                }
                                            }
                                        }
                                        if (A) y = B > 0;
                                        else {
                                            A = E.startPath();
                                            if (!G.isBlock && (I = t.editor.config.enterMode != CKEDITOR.ENTER_BR && t.editor.config.autoParagraph !== false ? t.editor.config.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false) && !A.block && A.blockLimit && A.blockLimit.equals(E.root)) {
                                                I = u.createElement(I);
                                                !CKEDITOR.env.ie && I.appendBogus();
                                                E.insertNode(I);
                                                !CKEDITOR.env.ie && (K = I.getBogus()) &&
                                                    K.remove();
                                                E.moveToPosition(I, CKEDITOR.POSITION_BEFORE_END)
                                            }
                                            if ((A = E.startPath().block) && !A.equals(L)) {
                                                if (K = A.getBogus()) {
                                                    K.remove();
                                                    v.push(A)
                                                }
                                                L = A
                                            }
                                            G.firstNotAllowed && (x = 1);
                                            if (x && G.isElement) {
                                                A = E.startContainer;
                                                for (C = null; A && !o[A.getName()][G.name];) {
                                                    if (A.equals(z)) {
                                                        A = null;
                                                        break
                                                    }
                                                    C = A;
                                                    A = A.getParent()
                                                }
                                                if (A) {
                                                    if (C) {
                                                        P = E.splitElement(C);
                                                        t.zombies.push(P);
                                                        t.zombies.push(C)
                                                    }
                                                } else {
                                                    C = z.getName();
                                                    O = !B;
                                                    A = B == F.length - 1;
                                                    C = d(G.node, C);
                                                    H = [];
                                                    M = C.length;
                                                    Q = 0;
                                                    N = void 0;
                                                    R = 0;
                                                    for (S = -1; Q < M; Q++) {
                                                        N = C[Q];
                                                        if (N == " ") {
                                                            if (!R && (!O ||
                                                                    Q)) {
                                                                H.push(new CKEDITOR.dom.text(" "));
                                                                S = H.length
                                                            }
                                                            R = 1
                                                        } else {
                                                            H.push(N);
                                                            R = 0
                                                        }
                                                    }
                                                    A && S == H.length && H.pop();
                                                    O = H
                                                }
                                            }
                                            if (O) {
                                                for (; A = O.pop();) E.insertNode(A);
                                                O = 0
                                            } else E.insertNode(G.node);
                                            if (G.lastNotAllowed && B < F.length - 1) {
                                                (P = J ? D : P) && E.setEndAt(P, CKEDITOR.POSITION_AFTER_START);
                                                x = 0
                                            }
                                            E.collapse()
                                        }
                                    }
                                    t.dontMoveCaret = y;
                                    t.bogusNeededBlocks = v
                                }
                                K = t.range;
                                var T;
                                P = t.bogusNeededBlocks;
                                for (O = K.createBookmark(); L = t.zombies.pop();)
                                    if (L.getParent()) {
                                        I = K.clone();
                                        I.moveToPosition(L, CKEDITOR.POSITION_AFTER_START);
                                        I.removeEmptyBlocksAtEnd()
                                    }
                                if (P)
                                    for (; L =
                                        P.pop();) L.append(CKEDITOR.env.ie ? K.document.createText(" ") : K.document.createElement("br"));
                                for (; L = t.mergeCandidates.pop();) L.mergeSiblings();
                                K.moveToBookmark(O);
                                if (!t.dontMoveCaret) {
                                    for (L = f(K.startContainer) && K.startContainer.getChild(K.startOffset - 1); L && f(L) && !L.is(o.$empty);) {
                                        if (L.isBlockBoundary()) K.moveToPosition(L, CKEDITOR.POSITION_BEFORE_END);
                                        else {
                                            if (h(L) && L.getHtml().match(/(\s|&nbsp;)$/g)) {
                                                T = null;
                                                break
                                            }
                                            T = K.clone();
                                            T.moveToPosition(L, CKEDITOR.POSITION_BEFORE_END)
                                        }
                                        L = L.getLast(b)
                                    }
                                    T && K.moveToRange(T)
                                }
                                w.select()
                            }
                            c(m)
                        }
                    }
                }()
        })();
        (function() {
            function a() {
                var a = this.getSelection(1);
                if (a.getType() != CKEDITOR.SELECTION_NONE) {
                    a.lock();
                    this._.lastSelection = a;
                    var b = this.elementPath();
                    if (!b.compare(this._.selectionPreviousPath)) {
                        this._.selectionPreviousPath = b;
                        this.fire("selectionChange", {
                            selection: a,
                            path: b
                        })
                    }
                }
            }

            function b() {
                e = true;
                if (!f) {
                    c.call(this);
                    f = CKEDITOR.tools.setTimeout(c, 200, this)
                }
            }

            function c() {
                f = null;
                if (e) {
                    CKEDITOR.tools.setTimeout(a, 0, this);
                    e = false
                }
            }

            function h(a) {
                function b(a) {
                    return a && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in
                        CKEDITOR.dtd.$removeEmpty
                }

                function c(b) {
                    var g = a.document.getBody();
                    return !b.is("body") && g.getChildCount() == 1
                }
                var g = a.startContainer,
                    e = a.startOffset;
                return g.type == CKEDITOR.NODE_TEXT ? false : !CKEDITOR.tools.trim(g.getHtml()) ? b(g) || c(g) : b(g.getChild(e - 1)) || b(g.getChild(e))
            }

            function d(a) {
                return a.getCustomData("cke-fillingChar")
            }

            function i(a, b) {
                var c = a && a.removeCustomData("cke-fillingChar");
                if (c) {
                    if (b !== false) {
                        var g, e = a.getDocument().getSelection().getNative(),
                            f = e && e.type != "None" && e.getRangeAt(0);
                        if (c.getLength() >
                            1 && f && f.intersectsNode(c.$)) {
                            g = [e.anchorOffset, e.focusOffset];
                            f = e.focusNode == c.$ && e.focusOffset > 0;
                            e.anchorNode == c.$ && e.anchorOffset > 0 && g[0]--;
                            f && g[1]--;
                            var d;
                            f = e;
                            if (!f.isCollapsed) {
                                d = f.getRangeAt(0);
                                d.setStart(f.anchorNode, f.anchorOffset);
                                d.setEnd(f.focusNode, f.focusOffset);
                                d = d.collapsed
                            }
                            d && g.unshift(g.pop())
                        }
                    }
                    c.setText(c.getText().replace(/\u200B/g, ""));
                    if (g) {
                        c = e.getRangeAt(0);
                        c.setStart(c.startContainer, g[0]);
                        c.setEnd(c.startContainer, g[1]);
                        e.removeAllRanges();
                        e.addRange(c)
                    }
                }
            }
            var f, e;
            CKEDITOR.on("instanceCreated",
                function(c) {
                    function g() {
                        var a = e.getSelection();
                        a && a.removeAllRanges()
                    }
                    var e = c.editor;
                    e.define("selectionChange", {
                        errorProof: 1
                    });
                    e.on("contentDom", function() {
                        var c = e.document,
                            g = e.editable(),
                            f = c.getBody(),
                            d = c.getDocumentElement(),
                            j = g.isInline();
                        if (CKEDITOR.env.ie || CKEDITOR.env.opera || j) {
                            var h;
                            g.attachListener(g, "focus", function() {
                                e.unlockSelection(h);
                                h = 0
                            }, null, null, -1);
                            g.attachListener(g, "blur", function() {
                                e.lockSelection();
                                h = 1
                            }, null, null, -1);
                            g.attachListener(g, "mousedown", function() {
                                h = 0
                            })
                        }
                        if (CKEDITOR.env.ie &&
                            !j) {
                            var k;
                            g.attachListener(g, "mousedown", function(a) {
                                a.data.$.button == 2 && e.document.$.selection.type == "None" && (k = e.window.getScrollPosition())
                            });
                            g.attachListener(g, "mouseup", function(a) {
                                if (a.data.$.button == 2 && k) {
                                    e.document.$.documentElement.scrollLeft = k.x;
                                    e.document.$.documentElement.scrollTop = k.y
                                }
                                k = null
                            });
                            if ((CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && c.$.compatMode != "BackCompat") d.on("mousedown", function(a) {
                                function b(a) {
                                    a = a.data.$;
                                    if (c) {
                                        var g = f.$.createTextRange();
                                        try {
                                            g.moveToPoint(a.x, a.y)
                                        } catch (e) {}
                                        c.setEndPoint(c.compareEndPoints("StartToStart",
                                            g) < 0 ? "EndToEnd" : "StartToStart", g);
                                        c.select()
                                    }
                                }
                                a = a.data.$;
                                if (a.y < d.$.clientHeight && a.y > f.$.offsetTop + f.$.clientHeight && a.x < d.$.clientWidth) {
                                    var c = f.$.createTextRange();
                                    try {
                                        c.moveToPoint(a.x, a.y)
                                    } catch (g) {}
                                    d.on("mousemove", b);
                                    d.on("mouseup", function(a) {
                                        d.removeListener("mousemove", b);
                                        a.removeListener();
                                        c.select()
                                    })
                                }
                            });
                            if (CKEDITOR.env.ie && CKEDITOR.env.version > 7) d.on("mouseup", function(a) {
                                if (a.data.getTarget().getName() == "html") {
                                    var a = CKEDITOR.document.$.selection,
                                        b = a.createRange();
                                    a.type != "None" && b.parentElement().ownerDocument ==
                                        c.$ && b.select()
                                }
                            })
                        }
                        g.attachListener(g, "selectionchange", a, e);
                        g.attachListener(g, "mouseup", b, e);
                        g.attachListener(g, "keyup", b, e);
                        g.attachListener(g, "focus", function() {
                            e.forceNextSelectionCheck();
                            e.selectionChange(1)
                        });
                        if (CKEDITOR.env.webkit) c.on("keydown", function(a) {
                            switch (a.data.getKey()) {
                                case 13:
                                case 33:
                                case 34:
                                case 35:
                                case 36:
                                case 37:
                                case 39:
                                case 8:
                                case 45:
                                case 46:
                                    i(e.document)
                            }
                        }, null, null, 10)
                    });
                    e.on("contentDomUnload", e.forceNextSelectionCheck, e);
                    e.on("dataReady", function() {
                        e.selectionChange(1)
                    });
                    CKEDITOR.env.ie9Compat && e.on("beforeDestroy", g, null, null, 9);
                    CKEDITOR.env.webkit && e.on("setData", g)
                });
            CKEDITOR.on("instanceReady", function(a) {
                var b = a.editor,
                    c = b.editable();
                if (CKEDITOR.env.webkit) {
                    b.on("selectionChange", function() {
                        var a = d(c);
                        a && (a.getCustomData("ready") ? i(c) : a.setCustomData("ready", 1))
                    }, null, null, -1);
                    b.on("beforeSetMode", function() {
                        i(c)
                    }, null, null, -1);
                    var g, e, a = function() {
                            var a = b.document,
                                f = d(c);
                            if (f) {
                                a = a.$.defaultView.getSelection();
                                a.type == "Caret" && a.anchorNode == f.$ && (e = 1);
                                g = f.getText();
                                f.setText(g.replace(/\u200B/g, ""))
                            }
                        },
                        f = function() {
                            var a = b.document,
                                f = d(c);
                            if (f) {
                                f.setText(g);
                                if (e) {
                                    a.$.defaultView.getSelection().setPosition(f.$, f.getLength());
                                    e = 0
                                }
                            }
                        };
                    b.on("beforeUndoImage", a);
                    b.on("afterUndoImage", f);
                    b.on("beforeGetData", a, null, null, 0);
                    b.on("getData", f)
                }
            });
            CKEDITOR.editor.prototype.selectionChange = function(c) {
                (c ? a : b).call(this)
            };
            CKEDITOR.editor.prototype.getSelection = function(a) {
                if (this._.savedSelection && !a) return this._.savedSelection;
                return (a = this.editable()) ? new CKEDITOR.dom.selection(a) :
                    null
            };
            CKEDITOR.editor.prototype.lockSelection = function() {
                if (!this._.savedSelection) {
                    var a = this.getSelection(1);
                    if (a = a.getType() == CKEDITOR.SELECTION_NONE ? this._.lastSelection : a) {
                        !a.isLocked && a.lock();
                        this._.savedSelection = a;
                        return true
                    }
                }
                return false
            };
            CKEDITOR.editor.prototype.unlockSelection = function(a) {
                var b = this._.savedSelection;
                if (b) {
                    b.unlock(a);
                    delete this._.savedSelection;
                    return true
                }
                return false
            };
            CKEDITOR.editor.prototype.forceNextSelectionCheck = function() {
                delete this._.selectionPreviousPath
            };
            CKEDITOR.dom.document.prototype.getSelection = function() {
                return new CKEDITOR.dom.selection(this)
            };
            CKEDITOR.dom.range.prototype.select = function() {
                (this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root)).selectRanges([this])
            };
            CKEDITOR.SELECTION_NONE = 1;
            CKEDITOR.SELECTION_TEXT = 2;
            CKEDITOR.SELECTION_ELEMENT = 3;
            CKEDITOR.dom.selection = function(a) {
                var b = a instanceof CKEDITOR.dom.element;
                this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
                this.root =
                    b ? a : this.document.getBody();
                this.isLocked = 0;
                this._ = {
                    cache: {}
                };
                if (CKEDITOR.env.webkit) {
                    a = this.document.getWindow().$.getSelection();
                    if (a.type == "None" && this.document.getActive().equals(this.root) || a.type == "Caret" && a.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) {
                        var c = new CKEDITOR.dom.range(this.root);
                        c.moveToPosition(this.root, CKEDITOR.POSITION_AFTER_START);
                        b = this.document.$.createRange();
                        b.setStart(c.startContainer.$, c.startOffset);
                        b.collapse(1);
                        a.addRange(b)
                    }
                }
                a = this.getNative();
                if (a.getRangeAt) c = (c =
                    a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(c.commonAncestorContainer);
                else {
                    try {
                        c = a.createRange()
                    } catch (g) {}
                    c = c && CKEDITOR.dom.element.get(c.item && c.item(0) || c.parentElement())
                }
                if (!c || !this.root.equals(c) && !this.root.contains(c)) {
                    this._.cache.type = CKEDITOR.SELECTION_NONE;
                    this._.cache.startElement = null;
                    this._.cache.selectedElement = null;
                    this._.cache.selectedText = "";
                    this._.cache.ranges = new CKEDITOR.dom.rangeList
                }
                return this
            };
            var g = {
                img: 1,
                hr: 1,
                li: 1,
                table: 1,
                tr: 1,
                td: 1,
                th: 1,
                embed: 1,
                object: 1,
                ol: 1,
                ul: 1,
                a: 1,
                input: 1,
                form: 1,
                select: 1,
                textarea: 1,
                button: 1,
                fieldset: 1,
                thead: 1,
                tfoot: 1
            };
            CKEDITOR.dom.selection.prototype = {
                getNative: function() {
                    return this._.cache.nativeSel !== void 0 ? this._.cache.nativeSel : this._.cache.nativeSel = this.document.$.selection || this.document.getWindow().$.getSelection()
                },
                getType: CKEDITOR.env.ie ? function() {
                    var a = this._.cache;
                    if (a.type) return a.type;
                    var b = CKEDITOR.SELECTION_NONE;
                    try {
                        var c = this.getNative(),
                            g = c.type;
                        if (g == "Text") b = CKEDITOR.SELECTION_TEXT;
                        if (g == "Control") b = CKEDITOR.SELECTION_ELEMENT;
                        if (c.createRange().parentElement) b = CKEDITOR.SELECTION_TEXT
                    } catch (e) {}
                    return a.type = b
                } : function() {
                    var a = this._.cache;
                    if (a.type) return a.type;
                    var b = CKEDITOR.SELECTION_TEXT,
                        c = this.getNative();
                    if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE;
                    else if (c.rangeCount == 1) {
                        var c = c.getRangeAt(0),
                            e = c.startContainer;
                        if (e == c.endContainer && e.nodeType == 1 && c.endOffset - c.startOffset == 1 && g[e.childNodes[c.startOffset].nodeName.toLowerCase()]) b = CKEDITOR.SELECTION_ELEMENT
                    }
                    return a.type = b
                },
                getRanges: function() {
                    var a = CKEDITOR.env.ie ?
                        function() {
                            function a(b) {
                                return (new CKEDITOR.dom.node(b)).getIndex()
                            }
                            var b = function(b, c) {
                                b = b.duplicate();
                                b.collapse(c);
                                var g = b.parentElement(),
                                    e = g.ownerDocument;
                                if (!g.hasChildNodes()) return {
                                    container: g,
                                    offset: 0
                                };
                                for (var f = g.children, d, h, j = b.duplicate(), i = 0, q = f.length - 1, w = -1, x, y; i <= q;) {
                                    w = Math.floor((i + q) / 2);
                                    d = f[w];
                                    j.moveToElementText(d);
                                    x = j.compareEndPoints("StartToStart", b);
                                    if (x > 0) q = w - 1;
                                    else if (x < 0) i = w + 1;
                                    else {
                                        if (CKEDITOR.env.ie9Compat && d.tagName == "BR") {
                                            f = e.defaultView.getSelection();
                                            return {
                                                container: f[c ?
                                                    "anchorNode" : "focusNode"],
                                                offset: f[c ? "anchorOffset" : "focusOffset"]
                                            }
                                        }
                                        return {
                                            container: g,
                                            offset: a(d)
                                        }
                                    }
                                }
                                if (w == -1 || w == f.length - 1 && x < 0) {
                                    j.moveToElementText(g);
                                    j.setEndPoint("StartToStart", b);
                                    e = j.text.replace(/(\r\n|\r)/g, "\n").length;
                                    f = g.childNodes;
                                    if (!e) {
                                        d = f[f.length - 1];
                                        return d.nodeType != CKEDITOR.NODE_TEXT ? {
                                            container: g,
                                            offset: f.length
                                        } : {
                                            container: d,
                                            offset: d.nodeValue.length
                                        }
                                    }
                                    for (g = f.length; e > 0 && g > 0;) {
                                        h = f[--g];
                                        if (h.nodeType == CKEDITOR.NODE_TEXT) {
                                            y = h;
                                            e = e - h.nodeValue.length
                                        }
                                    }
                                    return {
                                        container: y,
                                        offset: -e
                                    }
                                }
                                j.collapse(x >
                                    0 ? true : false);
                                j.setEndPoint(x > 0 ? "StartToStart" : "EndToStart", b);
                                e = j.text.replace(/(\r\n|\r)/g, "\n").length;
                                if (!e) return {
                                    container: g,
                                    offset: a(d) + (x > 0 ? 0 : 1)
                                };
                                for (; e > 0;) try {
                                    h = d[x > 0 ? "previousSibling" : "nextSibling"];
                                    if (h.nodeType == CKEDITOR.NODE_TEXT) {
                                        e = e - h.nodeValue.length;
                                        y = h
                                    }
                                    d = h
                                } catch (z) {
                                    return {
                                        container: g,
                                        offset: a(d)
                                    }
                                }
                                return {
                                    container: y,
                                    offset: x > 0 ? -e : y.nodeValue.length + e
                                }
                            };
                            return function() {
                                var a = this.getNative(),
                                    c = a && a.createRange(),
                                    g = this.getType();
                                if (!a) return [];
                                if (g == CKEDITOR.SELECTION_TEXT) {
                                    a = new CKEDITOR.dom.range(this.root);
                                    g = b(c, true);
                                    a.setStart(new CKEDITOR.dom.node(g.container), g.offset);
                                    g = b(c);
                                    a.setEnd(new CKEDITOR.dom.node(g.container), g.offset);
                                    a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse();
                                    return [a]
                                }
                                if (g == CKEDITOR.SELECTION_ELEMENT) {
                                    for (var g = [], e = 0; e < c.length; e++) {
                                        for (var f = c.item(e), d = f.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h < d.childNodes.length && d.childNodes[h] != f; h++);
                                        a.setStart(new CKEDITOR.dom.node(d), h);
                                        a.setEnd(new CKEDITOR.dom.node(d),
                                            h + 1);
                                        g.push(a)
                                    }
                                    return g
                                }
                                return []
                            }
                        }() : function() {
                            var a = [],
                                b, c = this.getNative();
                            if (!c) return a;
                            for (var g = 0; g < c.rangeCount; g++) {
                                var e = c.getRangeAt(g);
                                b = new CKEDITOR.dom.range(this.root);
                                b.setStart(new CKEDITOR.dom.node(e.startContainer), e.startOffset);
                                b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset);
                                a.push(b)
                            }
                            return a
                        };
                    return function(b) {
                        var c = this._.cache;
                        if (c.ranges && !b) return c.ranges;
                        if (!c.ranges) c.ranges = new CKEDITOR.dom.rangeList(a.call(this));
                        if (b)
                            for (var g = c.ranges, e = 0; e < g.length; e++) {
                                var f =
                                    g[e];
                                f.getCommonAncestor().isReadOnly() && g.splice(e, 1);
                                if (!f.collapsed) {
                                    if (f.startContainer.isReadOnly())
                                        for (b = f.startContainer; b;) {
                                            if (b.is("body") || !b.isReadOnly()) break;
                                            b.type == CKEDITOR.NODE_ELEMENT && b.getAttribute("contentEditable") == "false" && f.setStartAfter(b);
                                            b = b.getParent()
                                        }
                                    var b = f.startContainer,
                                        d = f.endContainer,
                                        h = f.startOffset,
                                        i = f.endOffset,
                                        r = f.clone();
                                    b && b.type == CKEDITOR.NODE_TEXT && (h >= b.getLength() ? r.setStartAfter(b) : r.setStartBefore(b));
                                    d && d.type == CKEDITOR.NODE_TEXT && (i ? r.setEndAfter(d) :
                                        r.setEndBefore(d));
                                    b = new CKEDITOR.dom.walker(r);
                                    b.evaluator = function(a) {
                                        if (a.type == CKEDITOR.NODE_ELEMENT && a.isReadOnly()) {
                                            var b = f.clone();
                                            f.setEndBefore(a);
                                            f.collapsed && g.splice(e--, 1);
                                            if (!(a.getPosition(r.endContainer) & CKEDITOR.POSITION_CONTAINS)) {
                                                b.setStartAfter(a);
                                                b.collapsed || g.splice(e + 1, 0, b)
                                            }
                                            return true
                                        }
                                        return false
                                    };
                                    b.next()
                                }
                            }
                        return c.ranges
                    }
                }(),
                getStartElement: function() {
                    var a = this._.cache;
                    if (a.startElement !== void 0) return a.startElement;
                    var b;
                    switch (this.getType()) {
                        case CKEDITOR.SELECTION_ELEMENT:
                            return this.getSelectedElement();
                        case CKEDITOR.SELECTION_TEXT:
                            var c = this.getRanges()[0];
                            if (c) {
                                if (c.collapsed) {
                                    b = c.startContainer;
                                    b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent())
                                } else {
                                    for (c.optimize();;) {
                                        b = c.startContainer;
                                        if (c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary()) c.setStartAfter(b);
                                        else break
                                    }
                                    b = c.startContainer;
                                    if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
                                    b = b.getChild(c.startOffset);
                                    if (!b || b.type != CKEDITOR.NODE_ELEMENT) b = c.startContainer;
                                    else
                                        for (c = b.getFirst(); c && c.type ==
                                            CKEDITOR.NODE_ELEMENT;) {
                                            b = c;
                                            c = c.getFirst()
                                        }
                                }
                                b = b.$
                            }
                    }
                    return a.startElement = b ? new CKEDITOR.dom.element(b) : null
                },
                getSelectedElement: function() {
                    var a = this._.cache;
                    if (a.selectedElement !== void 0) return a.selectedElement;
                    var b = this,
                        c = CKEDITOR.tools.tryThese(function() {
                            return b.getNative().createRange().item(0)
                        }, function() {
                            var a, c, g = b.getRanges()[0],
                                e = g.getCommonAncestor(1, 1),
                                f = {
                                    table: 1,
                                    ul: 1,
                                    ol: 1,
                                    dl: 1
                                },
                                d;
                            for (d in f)
                                if (a = e.getAscendant(d, 1)) break;
                            if (a) {
                                e = new CKEDITOR.dom.range(b.root);
                                e.setStartAt(a, CKEDITOR.POSITION_AFTER_START);
                                e.setEnd(g.startContainer, g.startOffset);
                                var h = CKEDITOR.tools.extend(f, CKEDITOR.dtd.$listItem, CKEDITOR.dtd.$tableContent),
                                    f = new CKEDITOR.dom.walker(e);
                                d = function(a, b) {
                                    return function(c, g) {
                                        if (c.type == CKEDITOR.NODE_TEXT && (!CKEDITOR.tools.trim(c.getText()) || c.getParent().data("cke-bookmark"))) return true;
                                        var e;
                                        if (c.type == CKEDITOR.NODE_ELEMENT) {
                                            e = c.getName();
                                            if (e == "br" && b && c.equals(c.getParent().getBogus()) || g && e in h || e in CKEDITOR.dtd.$removeEmpty) return true
                                        }
                                        a.halted = 1;
                                        return false
                                    }
                                };
                                f.guard = d(f);
                                if (f.checkBackward() && !f.halted) {
                                    f = new CKEDITOR.dom.walker(e);
                                    e.setStart(g.endContainer, g.endOffset);
                                    e.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                                    f.guard = d(f, 1);
                                    if (f.checkForward() && !f.halted) c = a.$
                                }
                            }
                            if (!c) throw 0;
                            return c
                        }, function() {
                            for (var a = b.getRanges()[0], c, e, f = 2; f && (!(c = a.getEnclosedNode()) || !(c.type == CKEDITOR.NODE_ELEMENT && g[c.getName()] && (e = c))); f--) a.shrink(CKEDITOR.SHRINK_ELEMENT);
                            return e.$
                        });
                    return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
                },
                getSelectedText: function() {
                    var a = this._.cache;
                    if (a.selectedText !== void 0) return a.selectedText;
                    var b = this.getNative(),
                        b = CKEDITOR.env.ie ? b.type == "Control" ? "" : b.createRange().text : b.toString();
                    return a.selectedText = b
                },
                lock: function() {
                    this.getRanges();
                    this.getStartElement();
                    this.getSelectedElement();
                    this.getSelectedText();
                    this._.cache.nativeSel = null;
                    this.isLocked = 1
                },
                unlock: function(a) {
                    if (this.isLocked) {
                        if (a) var b = this.getSelectedElement(),
                            c = !b && this.getRanges();
                        this.isLocked = 0;
                        this.reset();
                        a && (b ? this.selectElement(b) : this.selectRanges(c))
                    }
                },
                reset: function() {
                    this._.cache = {}
                },
                selectElement: function(a) {
                    var b = new CKEDITOR.dom.range(this.root);
                    b.setStartBefore(a);
                    b.setEndAfter(a);
                    this.selectRanges([b])
                },
                selectRanges: function(a) {
                    if (a.length)
                        if (this.isLocked) {
                            var b = CKEDITOR.document.getActive();
                            this.unlock();
                            this.selectRanges(a);
                            this.lock();
                            !b.equals(this.root) && b.focus()
                        } else {
                            if (CKEDITOR.env.ie) {
                                var c = CKEDITOR.dom.walker.whitespaces(true),
                                    e = /\ufeff|\u00a0/,
                                    f = {
                                        table: 1,
                                        tbody: 1,
                                        tr: 1
                                    };
                                if (a.length > 1) {
                                    b = a[a.length - 1];
                                    a[0].setEnd(b.endContainer, b.endOffset)
                                }
                                var b = a[0],
                                    a = b.collapsed,
                                    d, m, p, s = b.getEnclosedNode();
                                if (s && s.type == CKEDITOR.NODE_ELEMENT && s.getName() in g && (!s.is("a") || !s.getText())) try {
                                    p = s.$.createControlRange();
                                    p.addElement(s.$);
                                    p.select();
                                    return
                                } catch (r) {}(b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in f || b.endContainer.type == CKEDITOR.NODE_ELEMENT && b.endContainer.getName() in f) && b.shrink(CKEDITOR.NODE_ELEMENT, true);
                                p = b.createBookmark();
                                var f = p.startNode,
                                    t;
                                if (!a) t = p.endNode;
                                p = b.document.$.body.createTextRange();
                                p.moveToElementText(f.$);
                                p.moveStart("character",
                                    1);
                                if (t) {
                                    e = b.document.$.body.createTextRange();
                                    e.moveToElementText(t.$);
                                    p.setEndPoint("EndToEnd", e);
                                    p.moveEnd("character", -1)
                                } else {
                                    d = f.getNext(c);
                                    m = f.hasAscendant("pre");
                                    d = !(d && d.getText && d.getText().match(e)) && (m || !f.hasPrevious() || f.getPrevious().is && f.getPrevious().is("br"));
                                    m = b.document.createElement("span");
                                    m.setHtml("&#65279;");
                                    m.insertBefore(f);
                                    d && b.document.createText("?").insertBefore(f)
                                }
                                b.setStartBefore(f);
                                f.remove();
                                if (a) {
                                    if (d) {
                                        p.moveStart("character", -1);
                                        p.select();
                                        b.document.$.selection.clear()
                                    } else p.select();
                                    b.moveToPosition(m, CKEDITOR.POSITION_BEFORE_START);
                                    m.remove()
                                } else {
                                    b.setEndBefore(t);
                                    t.remove();
                                    p.select()
                                }
                            } else {
                                t = this.getNative();
                                if (!t) return;
                                t.removeAllRanges();
                                for (e = 0; e < a.length; e++) {
                                    if (e < a.length - 1) {
                                        b = a[e];
                                        p = a[e + 1];
                                        m = b.clone();
                                        m.setStart(b.endContainer, b.endOffset);
                                        m.setEnd(p.startContainer, p.startOffset);
                                        if (!m.collapsed) {
                                            m.shrink(CKEDITOR.NODE_ELEMENT, true);
                                            d = m.getCommonAncestor();
                                            m = m.getEnclosedNode();
                                            if (d.isReadOnly() || m && m.isReadOnly()) {
                                                p.setStart(b.startContainer, b.startOffset);
                                                a.splice(e--,
                                                    1);
                                                continue
                                            }
                                        }
                                    }
                                    b = a[e];
                                    p = this.document.$.createRange();
                                    d = b.startContainer;
                                    b.collapsed && ((CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) && d.type == CKEDITOR.NODE_ELEMENT && !d.getChildCount()) && d.appendText("");
                                    if (b.collapsed && CKEDITOR.env.webkit && h(b)) {
                                        d = this.root;
                                        i(d, false);
                                        m = d.getDocument().createText("?");
                                        d.setCustomData("cke-fillingChar", m);
                                        b.insertNode(m);
                                        if ((d = m.getNext()) && !m.getPrevious() && d.type == CKEDITOR.NODE_ELEMENT && d.getName() == "br") {
                                            i(this.root);
                                            b.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START)
                                        } else b.moveToPosition(m,
                                            CKEDITOR.POSITION_AFTER_END)
                                    }
                                    p.setStart(b.startContainer.$, b.startOffset);
                                    try {
                                        p.setEnd(b.endContainer.$, b.endOffset)
                                    } catch (u) {
                                        if (u.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) {
                                            b.collapse(1);
                                            p.setEnd(b.endContainer.$, b.endOffset)
                                        } else throw u;
                                    }
                                    t.addRange(p)
                                }
                            }
                            this.root.fire("selectionchange");
                            this.reset()
                        }
                },
                createBookmarks: function(a) {
                    return this.getRanges().createBookmarks(a)
                },
                createBookmarks2: function(a) {
                    return this.getRanges().createBookmarks2(a)
                },
                selectBookmarks: function(a) {
                    for (var b = [], c = 0; c <
                        a.length; c++) {
                        var g = new CKEDITOR.dom.range(this.root);
                        g.moveToBookmark(a[c]);
                        b.push(g)
                    }
                    this.selectRanges(b);
                    return this
                },
                getCommonAncestor: function() {
                    var a = this.getRanges();
                    return a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer)
                },
                scrollIntoView: function() {
                    this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
                },
                removeAllRanges: function() {
                    var a = this.getNative();
                    a && a[a.removeAllRanges ? "removeAllRanges" : "empty"]();
                    this.reset()
                }
            }
        })();
        CKEDITOR.editor.prototype.attachStyleStateChange =
            function(a, b) {
                var c = this._.styleStateChangeCallbacks;
                if (!c) {
                    c = this._.styleStateChangeCallbacks = [];
                    this.on("selectionChange", function(a) {
                        for (var b = 0; b < c.length; b++) {
                            var i = c[b],
                                f = i.style.checkActive(a.data.path) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                            i.fn.call(this, f)
                        }
                    })
                }
                c.push({
                    style: a,
                    fn: b
                })
            };
        CKEDITOR.STYLE_BLOCK = 1;
        CKEDITOR.STYLE_INLINE = 2;
        CKEDITOR.STYLE_OBJECT = 3;
        (function() {
            function a(a, b) {
                for (var c, g; a = a.getParent();) {
                    if (a.equals(b)) break;
                    if (a.getAttribute("data-nostyle")) c = a;
                    else if (!g) {
                        var e =
                            a.getAttribute("contentEditable");
                        e == "false" ? c = a : e == "true" && (g = 1)
                    }
                }
                return c
            }

            function b(b) {
                var c = b.document;
                if (b.collapsed) {
                    c = m(this, c);
                    b.insertNode(c);
                    b.moveToPosition(c, CKEDITOR.POSITION_BEFORE_END)
                } else {
                    var g = this.element,
                        e = this._.definition,
                        f, d = e.ignoreReadonly,
                        h = d || e.includeReadonly;
                    h == void 0 && (h = c.getCustomData("cke_includeReadonly"));
                    var j = CKEDITOR.dtd[g] || (f = true, CKEDITOR.dtd.span);
                    b.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                    b.trim();
                    var i = b.createBookmark(),
                        k = i.startNode,
                        q = i.endNode,
                        n = k,
                        o;
                    if (!d) {
                        var p =
                            b.getCommonAncestor(),
                            d = a(k, p),
                            p = a(q, p);
                        d && (n = d.getNextSourceNode(true));
                        p && (q = p)
                    }
                    for (n.getPosition(q) == CKEDITOR.POSITION_FOLLOWING && (n = 0); n;) {
                        d = false;
                        if (n.equals(q)) {
                            n = null;
                            d = true
                        } else {
                            var u = n.type,
                                s = u == CKEDITOR.NODE_ELEMENT ? n.getName() : null,
                                p = s && n.getAttribute("contentEditable") == "false",
                                r = s && n.getAttribute("data-nostyle");
                            if (s && n.data("cke-bookmark")) {
                                n = n.getNextSourceNode(true);
                                continue
                            }
                            if (!s || j[s] && !r && (!p || h) && (n.getPosition(q) | CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) ==
                                CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED && (!e.childRule || e.childRule(n))) {
                                var x = n.getParent();
                                if (x && ((x.getDtd() || CKEDITOR.dtd.span)[g] || f) && (!e.parentRule || e.parentRule(x))) {
                                    if (!o && (!s || !CKEDITOR.dtd.$removeEmpty[s] || (n.getPosition(q) | CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED)) {
                                        o = b.clone();
                                        o.setStartBefore(n)
                                    }
                                    if (u == CKEDITOR.NODE_TEXT ||
                                        p || u == CKEDITOR.NODE_ELEMENT && !n.getChildCount()) {
                                        for (var u = n, t;
                                            (d = !u.getNext(z)) && (t = u.getParent(), j[t.getName()]) && (t.getPosition(k) | CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_FOLLOWING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED && (!e.childRule || e.childRule(t));) u = t;
                                        o.setEndAfter(u)
                                    }
                                } else d = true
                            } else d = true;
                            n = n.getNextSourceNode(r || p && !h)
                        }
                        if (d && o && !o.collapsed) {
                            for (var d = m(this, c), p = d.hasAttributes(), r = o.getCommonAncestor(),
                                    u = {}, s = {}, x = {}, v = {}, w, y, D; d && r;) {
                                if (r.getName() == g) {
                                    for (w in e.attributes)
                                        if (!v[w] && (D = r.getAttribute(y))) d.getAttribute(w) == D ? s[w] = 1 : v[w] = 1;
                                    for (y in e.styles)
                                        if (!x[y] && (D = r.getStyle(y))) d.getStyle(y) == D ? u[y] = 1 : x[y] = 1
                                }
                                r = r.getParent()
                            }
                            for (w in s) d.removeAttribute(w);
                            for (y in u) d.removeStyle(y);
                            p && !d.hasAttributes() && (d = null);
                            if (d) {
                                o.extractContents().appendTo(d);
                                l.call(this, d);
                                o.insertNode(d);
                                d.mergeSiblings();
                                CKEDITOR.env.ie || d.$.normalize()
                            } else {
                                d = new CKEDITOR.dom.element("span");
                                o.extractContents().appendTo(d);
                                o.insertNode(d);
                                l.call(this, d);
                                d.remove(true)
                            }
                            o = null
                        }
                    }
                    b.moveToBookmark(i);
                    b.shrink(CKEDITOR.SHRINK_TEXT)
                }
            }

            function c(a) {
                a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                var b = a.createBookmark(),
                    c = b.startNode;
                if (a.collapsed) {
                    for (var g = new CKEDITOR.dom.elementPath(c.getParent(), a.root), e, f = 0, d; f < g.elements.length && (d = g.elements[f]); f++) {
                        if (d == g.block || d == g.blockLimit) break;
                        if (this.checkElementRemovable(d)) {
                            var h;
                            if (a.collapsed && (a.checkBoundaryOfElement(d, CKEDITOR.END) || (h = a.checkBoundaryOfElement(d, CKEDITOR.START)))) {
                                e =
                                    d;
                                e.match = h ? "start" : "end"
                            } else {
                                d.mergeSiblings();
                                d.getName() == this.element ? q.call(this, d) : n(d, r(this)[d.getName()])
                            }
                        }
                    }
                    if (e) {
                        d = c;
                        for (f = 0;; f++) {
                            h = g.elements[f];
                            if (h.equals(e)) break;
                            else if (h.match) continue;
                            else h = h.clone();
                            h.append(d);
                            d = h
                        }
                        d[e.match == "start" ? "insertBefore" : "insertAfter"](e)
                    }
                } else {
                    var j = b.endNode,
                        i = this,
                        g = function() {
                            for (var a = new CKEDITOR.dom.elementPath(c.getParent()), b = new CKEDITOR.dom.elementPath(j.getParent()), g = null, e = null, f = 0; f < a.elements.length; f++) {
                                var d = a.elements[f];
                                if (d == a.block ||
                                    d == a.blockLimit) break;
                                i.checkElementRemovable(d) && (g = d)
                            }
                            for (f = 0; f < b.elements.length; f++) {
                                d = b.elements[f];
                                if (d == b.block || d == b.blockLimit) break;
                                i.checkElementRemovable(d) && (e = d)
                            }
                            e && j.breakParent(e);
                            g && c.breakParent(g)
                        };
                    g();
                    for (e = c; !e.equals(j);) {
                        f = e.getNextSourceNode();
                        if (e.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(e)) {
                            e.getName() == this.element ? q.call(this, e) : n(e, r(this)[e.getName()]);
                            if (f.type == CKEDITOR.NODE_ELEMENT && f.contains(c)) {
                                g();
                                f = c.getNext()
                            }
                        }
                        e = f
                    }
                }
                a.moveToBookmark(b)
            }

            function h(a) {
                var b =
                    a.getCommonAncestor(true, true);
                (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && p(a, this)
            }

            function d(a) {
                var b = a.getCommonAncestor(true, true);
                if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                    var b = this._.definition,
                        c = b.attributes;
                    if (c)
                        for (var g in c) a.removeAttribute(g, c[g]);
                    if (b.styles)
                        for (var e in b.styles) b.styles.hasOwnProperty(e) && a.removeStyle(e)
                }
            }

            function i(a) {
                var b = a.createBookmark(true),
                    c = a.createIterator();
                c.enforceRealBlocks =
                    true;
                if (this._.enterMode) c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
                for (var g, f = a.document; g = c.getNextParagraph();)
                    if (!g.isReadOnly()) {
                        var d = m(this, f, g);
                        e(g, d)
                    }
                a.moveToBookmark(b)
            }

            function f(a) {
                var b = a.createBookmark(1),
                    c = a.createIterator();
                c.enforceRealBlocks = true;
                c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
                for (var g; g = c.getNextParagraph();)
                    if (this.checkElementRemovable(g))
                        if (g.is("pre")) {
                            var f = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ?
                                "p" : "div");
                            f && g.copyAttributes(f);
                            e(g, f)
                        } else q.call(this, g);
                a.moveToBookmark(b)
            }

            function e(a, b) {
                var c = !b;
                if (c) {
                    b = a.getDocument().createElement("div");
                    a.copyAttributes(b)
                }
                var e = b && b.is("pre"),
                    f = a.is("pre"),
                    d = !e && f;
                if (e && !f) {
                    f = b;
                    (d = a.getBogus()) && d.remove();
                    d = a.getHtml();
                    d = j(d, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
                    d = d.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
                    d = d.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
                    d = d.replace(/<br\b[^>]*>/gi, "\n");
                    if (CKEDITOR.env.ie) {
                        var h = a.getDocument().createElement("div");
                        h.append(f);
                        f.$.outerHTML = "<pre>" + d + "</pre>";
                        f.copyAttributes(h.getFirst());
                        f = h.getFirst().remove()
                    } else f.setHtml(d);
                    b = f
                } else d ? b = k(c ? [a.getHtml()] : g(a), b) : a.moveChildren(b);
                b.replace(a);
                if (e) {
                    var c = b,
                        i;
                    if ((i = c.getPrevious(D)) && i.is && i.is("pre")) {
                        e = j(i.getHtml(), /\n$/, "") + "\n\n" + j(c.getHtml(), /^\n/, "");
                        CKEDITOR.env.ie ? c.$.outerHTML = "<pre>" + e + "</pre>" : c.setHtml(e);
                        i.remove()
                    }
                } else c && o(b)
            }

            function g(a) {
                a.getName();
                var b = [];
                j(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,
                    function(a, b, c) {
                        return b + "</pre>" + c + "<pre>"
                    }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a, c) {
                    b.push(c)
                });
                return b
            }

            function j(a, b, c) {
                var g = "",
                    e = "",
                    a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) {
                        b && (g = b);
                        c && (e = c);
                        return ""
                    });
                return g + a.replace(b, c) + e
            }

            function k(a, b) {
                var c;
                a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
                for (var g = 0; g < a.length; g++) {
                    var e = a[g],
                        e = e.replace(/(\r\n|\r)/g, "\n"),
                        e = j(e, /^[ \t]*\n/, ""),
                        e = j(e, /\n$/, ""),
                        e = j(e, /^[ \t]+|[ \t]+$/g, function(a, b) {
                            return a.length == 1 ? "&nbsp;" : b ? " " + CKEDITOR.tools.repeat("&nbsp;", a.length - 1) : CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                        }),
                        e = e.replace(/\n/g, "<br>"),
                        e = e.replace(/[ \t]{2,}/g, function(a) {
                            return CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                        });
                    if (c) {
                        var f = b.clone();
                        f.setHtml(e);
                        c.append(f)
                    } else b.setHtml(e)
                }
                return c || b
            }

            function q(a) {
                var b = this._.definition,
                    c = b.attributes,
                    b = b.styles,
                    g = r(this)[a.getName()],
                    e = CKEDITOR.tools.isEmpty(c) && CKEDITOR.tools.isEmpty(b),
                    f;
                for (f in c)
                    if (!((f == "class" || this._.definition.fullMatch) && a.getAttribute(f) != t(f, c[f]))) {
                        e = a.hasAttribute(f);
                        a.removeAttribute(f)
                    }
                for (var d in b)
                    if (!(this._.definition.fullMatch && a.getStyle(d) != t(d, b[d], true))) {
                        e = e || !!a.getStyle(d);
                        a.removeStyle(d)
                    }
                n(a, g, v[a.getName()]);
                e && (this._.definition.alwaysRemoveElement ? o(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? o(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
            }

            function l(a) {
                for (var b =
                        r(this), c = a.getElementsByTag(this.element), g = c.count(); --g >= 0;) q.call(this, c.getItem(g));
                for (var e in b)
                    if (e != this.element) {
                        c = a.getElementsByTag(e);
                        for (g = c.count() - 1; g >= 0; g--) {
                            var f = c.getItem(g);
                            n(f, b[e])
                        }
                    }
            }

            function n(a, b, c) {
                if (b = b && b.attributes)
                    for (var g = 0; g < b.length; g++) {
                        var e = b[g][0],
                            f;
                        if (f = a.getAttribute(e)) {
                            var d = b[g][1];
                            (d === null || d.test && d.test(f) || typeof d == "string" && f == d) && a.removeAttribute(e)
                        }
                    }
                c || o(a)
            }

            function o(a, b) {
                if (!a.hasAttributes() || b)
                    if (CKEDITOR.dtd.$block[a.getName()]) {
                        var c = a.getPrevious(D),
                            g = a.getNext(D);
                        c && (c.type == CKEDITOR.NODE_TEXT || !c.isBlockBoundary({
                            br: 1
                        })) && a.append("br", 1);
                        g && (g.type == CKEDITOR.NODE_TEXT || !g.isBlockBoundary({
                            br: 1
                        })) && a.append("br");
                        a.remove(true)
                    } else {
                        c = a.getFirst();
                        g = a.getLast();
                        a.remove(true);
                        if (c) {
                            c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings();
                            g && (!c.equals(g) && g.type == CKEDITOR.NODE_ELEMENT) && g.mergeSiblings()
                        }
                    }
            }

            function m(a, b, c) {
                var g;
                g = a.element;
                g == "*" && (g = "span");
                g = new CKEDITOR.dom.element(g, b);
                c && c.copyAttributes(g);
                g = p(g, a);
                b.getCustomData("doc_processing_style") &&
                    g.hasAttribute("id") ? g.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
                return g
            }

            function p(a, b) {
                var c = b._.definition,
                    g = c.attributes,
                    c = CKEDITOR.style.getStyleText(c);
                if (g)
                    for (var e in g) a.setAttribute(e, g[e]);
                c && a.setAttribute("style", c);
                return a
            }

            function s(a, b) {
                for (var c in a) a[c] = a[c].replace(y, function(a, c) {
                    return b[c]
                })
            }

            function r(a) {
                if (a._.overrides) return a._.overrides;
                var b = a._.overrides = {},
                    c = a._.definition.overrides;
                if (c) {
                    CKEDITOR.tools.isArray(c) || (c = [c]);
                    for (var g = 0; g < c.length; g++) {
                        var e =
                            c[g],
                            f, d;
                        if (typeof e == "string") f = e.toLowerCase();
                        else {
                            f = e.element ? e.element.toLowerCase() : a.element;
                            d = e.attributes
                        }
                        e = b[f] || (b[f] = {});
                        if (d) {
                            var e = e.attributes = e.attributes || [],
                                h;
                            for (h in d) e.push([h.toLowerCase(), d[h]])
                        }
                    }
                }
                return b
            }

            function t(a, b, c) {
                var g = new CKEDITOR.dom.element("span");
                g[c ? "setStyle" : "setAttribute"](a, b);
                return g[c ? "getStyle" : "getAttribute"](a)
            }

            function u(a, b) {
                for (var c = a.document, g = a.getRanges(), e = b ? this.removeFromRange : this.applyToRange, f, d = g.createIterator(); f = d.getNextRange();) e.call(this,
                    f);
                a.selectRanges(g);
                c.removeCustomData("doc_processing_style")
            }
            var v = {
                    address: 1,
                    div: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    p: 1,
                    pre: 1,
                    section: 1,
                    header: 1,
                    footer: 1,
                    nav: 1,
                    article: 1,
                    aside: 1,
                    figure: 1,
                    dialog: 1,
                    hgroup: 1,
                    time: 1,
                    meter: 1,
                    menu: 1,
                    command: 1,
                    keygen: 1,
                    output: 1,
                    progress: 1,
                    details: 1,
                    datagrid: 1,
                    datalist: 1
                },
                w = {
                    a: 1,
                    embed: 1,
                    hr: 1,
                    img: 1,
                    li: 1,
                    object: 1,
                    ol: 1,
                    table: 1,
                    td: 1,
                    tr: 1,
                    th: 1,
                    ul: 1,
                    dl: 1,
                    dt: 1,
                    dd: 1,
                    form: 1,
                    audio: 1,
                    video: 1
                },
                x = /\s*(?:;\s*|$)/,
                y = /#\((.+?)\)/g,
                z = CKEDITOR.dom.walker.bookmark(0, 1),
                D = CKEDITOR.dom.walker.whitespaces(1);
            CKEDITOR.style = function(a, b) {
                if (b) {
                    a = CKEDITOR.tools.clone(a);
                    s(a.attributes, b);
                    s(a.styles, b)
                }
                var c = this.element = a.element ? typeof a.element == "string" ? a.element.toLowerCase() : a.element : "*";
                this.type = a.type || (v[c] ? CKEDITOR.STYLE_BLOCK : w[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
                if (typeof this.element == "object") this.type = CKEDITOR.STYLE_OBJECT;
                this._ = {
                    definition: a
                }
            };
            CKEDITOR.editor.prototype.applyStyle = function(a) {
                u.call(a, this.getSelection())
            };
            CKEDITOR.editor.prototype.removeStyle = function(a) {
                u.call(a,
                    this.getSelection(), 1)
            };
            CKEDITOR.style.prototype = {
                apply: function(a) {
                    u.call(this, a.getSelection())
                },
                remove: function(a) {
                    u.call(this, a.getSelection(), 1)
                },
                applyToRange: function(a) {
                    return (this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? i : this.type == CKEDITOR.STYLE_OBJECT ? h : null).call(this, a)
                },
                removeFromRange: function(a) {
                    return (this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? f : this.type == CKEDITOR.STYLE_OBJECT ? d : null).call(this,
                        a)
                },
                applyToObject: function(a) {
                    p(a, this)
                },
                checkActive: function(a) {
                    switch (this.type) {
                        case CKEDITOR.STYLE_BLOCK:
                            return this.checkElementRemovable(a.block || a.blockLimit, true);
                        case CKEDITOR.STYLE_OBJECT:
                        case CKEDITOR.STYLE_INLINE:
                            for (var b = a.elements, c = 0, g; c < b.length; c++) {
                                g = b[c];
                                if (!(this.type == CKEDITOR.STYLE_INLINE && (g == a.block || g == a.blockLimit))) {
                                    if (this.type == CKEDITOR.STYLE_OBJECT) {
                                        var e = g.getName();
                                        if (!(typeof this.element == "string" ? e == this.element : e in this.element)) continue
                                    }
                                    if (this.checkElementRemovable(g,
                                            true)) return true
                                }
                            }
                    }
                    return false
                },
                checkApplicable: function(a) {
                    switch (this.type) {
                        case CKEDITOR.STYLE_OBJECT:
                            return a.contains(this.element)
                    }
                    return true
                },
                checkElementMatch: function(a, b) {
                    var c = this._.definition;
                    if (!a || !c.ignoreReadonly && a.isReadOnly()) return false;
                    var g = a.getName();
                    if (typeof this.element == "string" ? g == this.element : g in this.element) {
                        if (!b && !a.hasAttributes()) return true;
                        if (g = c._AC) c = g;
                        else {
                            var g = {},
                                e = 0,
                                f = c.attributes;
                            if (f)
                                for (var d in f) {
                                    e++;
                                    g[d] = f[d]
                                }
                            if (d = CKEDITOR.style.getStyleText(c)) {
                                g.style ||
                                    e++;
                                g.style = d
                            }
                            g._length = e;
                            c = c._AC = g
                        }
                        if (c._length) {
                            for (var h in c)
                                if (h != "_length") {
                                    e = a.getAttribute(h) || "";
                                    if (h == "style") a: {
                                        g = c[h];
                                        typeof g == "string" && (g = CKEDITOR.tools.parseCssText(g));
                                        typeof e == "string" && (e = CKEDITOR.tools.parseCssText(e, true));
                                        d = void 0;
                                        for (d in g)
                                            if (!(d in e && (e[d] == g[d] || g[d] == "inherit" || e[d] == "inherit"))) {
                                                g = false;
                                                break a
                                            }
                                        g = true
                                    } else g = c[h] == e;
                                    if (g) {
                                        if (!b) return true
                                    } else if (b) return false
                                }
                            if (b) return true
                        } else return true
                    }
                    return false
                },
                checkElementRemovable: function(a, b) {
                    if (this.checkElementMatch(a,
                            b)) return true;
                    var c = r(this)[a.getName()];
                    if (c) {
                        var g;
                        if (!(c = c.attributes)) return true;
                        for (var e = 0; e < c.length; e++) {
                            g = c[e][0];
                            if (g = a.getAttribute(g)) {
                                var f = c[e][1];
                                if (f === null || typeof f == "string" && g == f || f.test(g)) return true
                            }
                        }
                    }
                    return false
                },
                buildPreview: function(a) {
                    var b = this._.definition,
                        c = [],
                        g = b.element;
                    g == "bdo" && (g = "span");
                    var c = ["<", g],
                        e = b.attributes;
                    if (e)
                        for (var f in e) c.push(" ", f, '="', e[f], '"');
                    (e = CKEDITOR.style.getStyleText(b)) && c.push(' style="', e, '"');
                    c.push(">", a || b.name, "</", g, ">");
                    return c.join("")
                }
            };
            CKEDITOR.style.getStyleText = function(a) {
                var b = a._ST;
                if (b) return b;
                var b = a.styles,
                    c = a.attributes && a.attributes.style || "",
                    g = "";
                c.length && (c = c.replace(x, ";"));
                for (var e in b) {
                    var f = b[e],
                        d = (e + ":" + f).replace(x, ";");
                    f == "inherit" ? g = g + d : c = c + d
                }
                c.length && (c = CKEDITOR.tools.normalizeCssText(c, true));
                return a._ST = c + g
            }
        })();
        CKEDITOR.styleCommand = function(a) {
            this.style = a
        };
        CKEDITOR.styleCommand.prototype.exec = function(a) {
            a.focus();
            this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON &&
                a.removeStyle(this.style)
        };
        CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet");
        CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet);
        CKEDITOR.loadStylesSet = function(a, b, c) {
            CKEDITOR.stylesSet.addExternal(a, b, "");
            CKEDITOR.stylesSet.load(a, c)
        };
        CKEDITOR.editor.prototype.getStylesSet = function(a) {
            if (this._.stylesDefinitions) a(this._.stylesDefinitions);
            else {
                var b = this,
                    c = b.config.stylesCombo_stylesSet || b.config.stylesSet || "default";
                if (c instanceof Array) {
                    b._.stylesDefinitions =
                        c;
                    a(c)
                } else {
                    var c = c.split(":"),
                        h = c[0];
                    CKEDITOR.stylesSet.addExternal(h, c[1] ? c.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
                    CKEDITOR.stylesSet.load(h, function(c) {
                        b._.stylesDefinitions = c[h];
                        a(b._.stylesDefinitions)
                    })
                }
            }
        };
        CKEDITOR.dom.comment = function(a, b) {
            typeof a == "string" && (a = (b ? b.$ : document).createComment(a));
            CKEDITOR.dom.domObject.call(this, a)
        };
        CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node;
        CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
            type: CKEDITOR.NODE_COMMENT,
            getOuterHtml: function() {
                return "<\!--" +
                    this.$.nodeValue + "--\>"
            }
        });
        (function() {
            var a = {},
                b;
            for (b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1);
            var c = {};
            for (b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (c[b] = 1);
            CKEDITOR.dom.elementPath = function(b, d) {
                var i = null,
                    f = null,
                    e = [],
                    d = d || b.getDocument().getBody(),
                    g = b;
                do
                    if (g.type == CKEDITOR.NODE_ELEMENT) {
                        e.push(g);
                        if (!this.lastElement) {
                            this.lastElement = g;
                            if (g.is(CKEDITOR.dtd.$object)) continue
                        }
                        var j = g.getName();
                        if (!f) {
                            !i && c[j] && (i = g);
                            if (a[j]) {
                                var k;
                                if (k = !i) {
                                    if (j = j == "div") {
                                        a: {
                                            j = g.getChildren();
                                            k = 0;
                                            for (var q = j.count(); k < q; k++) {
                                                var l = j.getItem(k);
                                                if (l.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[l.getName()]) {
                                                    j = true;
                                                    break a
                                                }
                                            }
                                            j = false
                                        }
                                        j = !j && !g.equals(d)
                                    }
                                    k = j
                                }
                                k ? i = g : f = g
                            }
                        }
                        if (g.equals(d)) break
                    }
                while (g = g.getParent());
                this.block = i;
                this.blockLimit = f;
                this.root = d;
                this.elements = e
            }
        })();
        CKEDITOR.dom.elementPath.prototype = {
            compare: function(a) {
                var b = this.elements,
                    a = a && a.elements;
                if (!a || b.length != a.length) return false;
                for (var c = 0; c < b.length; c++)
                    if (!b[c].equals(a[c])) return false;
                return true
            },
            contains: function(a, b, c) {
                var h;
                typeof a == "string" && (h = function(b) {
                    return b.getName() == a
                });
                a instanceof CKEDITOR.dom.element ? h = function(b) {
                    return b.equals(a)
                } : CKEDITOR.tools.isArray(a) ? h = function(b) {
                    a.indexOf(b.getName()) > -1
                } : typeof a == "function" ? h = a : typeof a == "object" && (h = function(b) {
                    return b.getName() in a
                });
                var d = this.elements,
                    i = d.length;
                b && i--;
                if (c) {
                    d = Array.prototype.slice.call(d, 0);
                    d.reverse()
                }
                for (b = 0; b < i; b++)
                    if (h(d[b])) return d[b];
                return null
            },
            isContextFor: function(a) {
                var b;
                if (a in
                    CKEDITOR.dtd.$block) {
                    b = this.root.equals(this.block) && this.block || this.blockLimit;
                    return !!b.getDtd()[a]
                }
                return true
            }
        };
        CKEDITOR.dom.text = function(a, b) {
            typeof a == "string" && (a = (b ? b.$ : document).createTextNode(a));
            this.$ = a
        };
        CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node;
        CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
            type: CKEDITOR.NODE_TEXT,
            getLength: function() {
                return this.$.nodeValue.length
            },
            getText: function() {
                return this.$.nodeValue
            },
            setText: function(a) {
                this.$.nodeValue = a
            },
            split: function(a) {
                var b =
                    this.$.parentNode,
                    c = b.childNodes.length,
                    h = this.getLength(),
                    d = this.getDocument(),
                    i = new CKEDITOR.dom.text(this.$.splitText(a), d);
                if (b.childNodes.length == c)
                    if (a >= h) {
                        i = d.createText("");
                        i.insertAfter(this)
                    } else {
                        a = d.createText("");
                        a.insertAfter(i);
                        a.remove()
                    }
                return i
            },
            substring: function(a, b) {
                return typeof b != "number" ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, b)
            }
        });
        (function() {
            function a(a, b, d) {
                var i = a.serializable,
                    f = b[d ? "endContainer" : "startContainer"],
                    e = d ? "endOffset" : "startOffset",
                    g = i ? b.document.getById(a.startNode) :
                    a.startNode,
                    a = i ? b.document.getById(a.endNode) : a.endNode;
                if (f.equals(g.getPrevious())) {
                    b.startOffset = b.startOffset - f.getLength() - a.getPrevious().getLength();
                    f = a.getNext()
                } else if (f.equals(a.getPrevious())) {
                    b.startOffset = b.startOffset - f.getLength();
                    f = a.getNext()
                }
                f.equals(g.getParent()) && b[e]++;
                f.equals(a.getParent()) && b[e]++;
                b[d ? "endContainer" : "startContainer"] = f;
                return b
            }
            CKEDITOR.dom.rangeList = function(a) {
                if (a instanceof CKEDITOR.dom.rangeList) return a;
                a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
                return CKEDITOR.tools.extend(a, b)
            };
            var b = {
                createIterator: function() {
                    var a = this,
                        b = CKEDITOR.dom.walker.bookmark(),
                        d = [],
                        i;
                    return {
                        getNextRange: function(f) {
                            i = i == void 0 ? 0 : i + 1;
                            var e = a[i];
                            if (e && a.length > 1) {
                                if (!i)
                                    for (var g = a.length - 1; g >= 0; g--) d.unshift(a[g].createBookmark(true));
                                if (f)
                                    for (var j = 0; a[i + j + 1];) {
                                        for (var k = e.document, f = 0, g = k.getById(d[j].endNode), k = k.getById(d[j + 1].startNode);;) {
                                            g = g.getNextSourceNode(false);
                                            if (k.equals(g)) f = 1;
                                            else if (b(g) || g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) continue;
                                            break
                                        }
                                        if (!f) break;
                                        j++
                                    }
                                for (e.moveToBookmark(d.shift()); j--;) {
                                    g = a[++i];
                                    g.moveToBookmark(d.shift());
                                    e.setEnd(g.endContainer, g.endOffset)
                                }
                            }
                            return e
                        }
                    }
                },
                createBookmarks: function(b) {
                    for (var h = [], d, i = 0; i < this.length; i++) {
                        h.push(d = this[i].createBookmark(b, true));
                        for (var f = i + 1; f < this.length; f++) {
                            this[f] = a(d, this[f]);
                            this[f] = a(d, this[f], true)
                        }
                    }
                    return h
                },
                createBookmarks2: function(a) {
                    for (var b = [], d = 0; d < this.length; d++) b.push(this[d].createBookmark2(a));
                    return b
                },
                moveToBookmarks: function(a) {
                    for (var b = 0; b < this.length; b++) this[b].moveToBookmark(a[b])
                }
            }
        })();
        (function() {
            function a() {
                return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
            }

            function b(b) {
                var c = CKEDITOR.skin["ua_" + b],
                    g = CKEDITOR.env;
                if (c)
                    for (var c = c.split(",").sort(function(a, b) {
                            return a > b ? -1 : 1
                        }), e = 0, f; e < c.length; e++) {
                        f = c[e];
                        if (g.ie && (f.replace(/^ie/, "") == g.version || g.quirks && f == "iequirks")) f = "ie";
                        if (g[f]) {
                            b = b + ("_" + c[e]);
                            break
                        }
                    }
                return CKEDITOR.getUrl(a() + b + ".css")
            }

            function c(a, c) {
                if (!i[a]) {
                    CKEDITOR.document.appendStyleSheet(b(a));
                    i[a] = 1
                }
                c && c()
            }

            function h(a) {
                var b = a.getById(f);
                if (!b) {
                    b = a.getHead().append("style");
                    b.setAttribute("id", f);
                    b.setAttribute("type", "text/css")
                }
                return b
            }

            function d(a, b, c) {
                var g, e, f;
                if (CKEDITOR.env.webkit) {
                    b = b.split("}").slice(0, -1);
                    for (e = 0; e < b.length; e++) b[e] = b[e].split("{")
                }
                for (var d = 0; d < a.length; d++)
                    if (CKEDITOR.env.webkit)
                        for (e = 0; e < b.length; e++) {
                            f = b[e][1];
                            for (g = 0; g < c.length; g++) f = f.replace(c[g][0], c[g][1]);
                            a[d].$.sheet.addRule(b[e][0], f)
                        } else {
                            f = b;
                            for (g = 0; g < c.length; g++) f = f.replace(c[g][0], c[g][1]);
                            CKEDITOR.env.ie ?
                                a[d].$.styleSheet.cssText = a[d].$.styleSheet.cssText + f : a[d].$.innerHTML = a[d].$.innerHTML + f
                        }
            }
            var i = {};
            CKEDITOR.skin = {
                path: a,
                loadPart: function(b, g) {
                    CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function() {
                        c(b, g)
                    }) : c(b, g)
                },
                getPath: function(a) {
                    return CKEDITOR.getUrl(b(a))
                },
                icons: {},
                addIcon: function(a, b, c) {
                    a = a.toLowerCase();
                    this.icons[a] || (this.icons[a] = {
                        path: b,
                        offset: c || 0
                    })
                },
                getIconStyle: function(a, b, c, g) {
                    var e;
                    if (a) {
                        a = a.toLowerCase();
                        b &&
                            (e = this.icons[a + "-rtl"]);
                        e || (e = this.icons[a])
                    }
                    a = c || e && e.path || "";
                    g = g || e && e.offset;
                    return a && "background-image:url(" + CKEDITOR.getUrl(a) + ");background-position:0 " + g + "px;"
                }
            };
            CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                getUiColor: function() {
                    return this.uiColor
                },
                setUiColor: function(a) {
                    var b = h(CKEDITOR.document);
                    return (this.setUiColor = function(a) {
                        var c = CKEDITOR.skin.chameleon,
                            f = [
                                [g, a]
                            ];
                        this.uiColor = a;
                        d([b], c(this, "editor"), f);
                        d(e, c(this, "panel"), f)
                    }).call(this, a)
                }
            });
            var f = "cke_ui_color",
                e = [],
                g = /\$color/g;
            CKEDITOR.on("instanceLoaded", function(a) {
                if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                    var b = a.editor;
                    b.on("menuShow", function(a) {
                        a = a.data[0].element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                        if (!a.getById("cke_ui_color")) {
                            a = h(a);
                            e.push(a);
                            var c = b.getUiColor();
                            c && d([a], CKEDITOR.skin.chameleon(b, "panel"), [
                                [g, c]
                            ])
                        }
                    });
                    b.config.uiColor && b.setUiColor(b.config.uiColor)
                }
            })
        })();
        (function() {
            if (CKEDITOR.env.webkit) CKEDITOR.env.hc = false;
            else {
                var a = CKEDITOR.dom.element.createFromHtml('<div style="width:0px;height:0px;position:absolute;left:-10000px;border: 1px solid;border-color: red blue;"></div>',
                    CKEDITOR.document);
                a.appendTo(CKEDITOR.document.getHead());
                try {
                    CKEDITOR.env.hc = a.getComputedStyle("border-top-color") == a.getComputedStyle("border-right-color")
                } catch (b) {
                    CKEDITOR.env.hc = false
                }
                a.remove()
            }
            if (CKEDITOR.env.hc) CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc";
            CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
            CKEDITOR.status = "loaded";
            CKEDITOR.fireOnce("loaded");
            if (a = CKEDITOR._.pending) {
                delete CKEDITOR._.pending;
                for (var c = 0; c < a.length; c++) {
                    CKEDITOR.editor.prototype.constructor.apply(a[c][0],
                        a[c][1]);
                    CKEDITOR.add(a[c][0])
                }
            }
        })();
        if (CKEDITOR.env.ie) try {
            document.execCommand("BackgroundImageCache", !1, !0)
        } catch (W) {}
        CKEDITOR.skin.name = "kama";
        CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8";
        CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8,opera";
        CKEDITOR.skin.chameleon = function(a, b) {
            function c(a) {
                return "background:-moz-linear-gradient(" + a + ");background:-webkit-linear-gradient(" + a + ");background:-o-linear-gradient(" + a + ");background:-ms-linear-gradient(" + a + ");background:linear-gradient(" + a + ");"
            }
            var h,
                d = "." + a.id;
            b == "editor" ? h = d + " .cke_inner," + d + " .cke_dialog_tab{background-color:$color;background:-webkit-gradient(linear,0 -15,0 40,from(#fff),to($color));" + c("top,#fff -15px,$color 40px") + "}" + d + " .cke_toolgroup{background:-webkit-gradient(linear,0 0,0 100,from(#fff),to($color));" + c("top,#fff,$color 100px") + "}" + d + " .cke_combo_button{background:-webkit-gradient(linear, left bottom, left -100, from(#fff), to($color));" + c("bottom,#fff,$color 100px") + "}" + d + " .cke_dialog_contents," + d + " .cke_dialog_footer{background-color:$color !important;}" +
                d + " .cke_dialog_tab:hover," + d + " .cke_dialog_tab:active," + d + " .cke_dialog_tab:focus," + d + " .cke_dialog_tab_selected{background-color:$color;background-image:none;}" : b == "panel" && (h = ".cke_menubutton_icon{background-color:$color !important;border-color:$color !important;}.cke_menubutton:hover .cke_menubutton_icon,.cke_menubutton:focus .cke_menubutton_icon,.cke_menubutton:active .cke_menubutton_icon{background-color:$color !important;border-color:$color !important;}.cke_menubutton:hover .cke_menubutton_label,.cke_menubutton:focus .cke_menubutton_label,.cke_menubutton:active .cke_menubutton_label{background-color:$color !important;}.cke_menubutton_disabled:hover .cke_menubutton_label,.cke_menubutton_disabled:focus .cke_menubutton_label,.cke_menubutton_disabled:active .cke_menubutton_label{background-color: transparent !important;}.cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon{background-color:$color !important;border-color:$color !important;}.cke_menubutton_disabled .cke_menubutton_icon{background-color:$color !important;border-color:$color !important;}.cke_menuseparator{background-color:$color !important;}.cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active{background-color:$color !important;}");
            return h
        };
        CKEDITOR.plugins.add("dialogui", {
            onLoad: function() {
                var a = function(a) {
                        this._ || (this._ = {});
                        this._["default"] = this._.initValue = a["default"] || "";
                        this._.required = a.required || false;
                        for (var b = [this._], c = 1; c < arguments.length; c++) b.push(arguments[c]);
                        b.push(true);
                        CKEDITOR.tools.extend.apply(CKEDITOR.tools, b);
                        return this._
                    },
                    b = {
                        build: function(a, b, c) {
                            return new CKEDITOR.ui.dialog.textInput(a, b, c)
                        }
                    },
                    c = {
                        build: function(a, b, c) {
                            return new CKEDITOR.ui.dialog[b.type](a, b, c)
                        }
                    },
                    h = {
                        isChanged: function() {
                            return this.getValue() !=
                                this.getInitValue()
                        },
                        reset: function(a) {
                            this.setValue(this.getInitValue(), a)
                        },
                        setInitValue: function() {
                            this._.initValue = this.getValue()
                        },
                        resetInitValue: function() {
                            this._.initValue = this._["default"]
                        },
                        getInitValue: function() {
                            return this._.initValue
                        }
                    },
                    d = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                        onChange: function(a, b) {
                            if (!this._.domOnChangeRegistered) {
                                a.on("load", function() {
                                    this.getInputElement().on("change", function() {
                                        a.parts.dialog.isVisible() && this.fire("change", {
                                            value: this.getValue()
                                        })
                                    }, this)
                                }, this);
                                this._.domOnChangeRegistered = true
                            }
                            this.on("change", b)
                        }
                    }, true),
                    i = /^on([A-Z]\w+)/,
                    f = function(a) {
                        for (var b in a)(i.test(b) || b == "title" || b == "type") && delete a[b];
                        return a
                    };
                CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                    labeledElement: function(b, c, f, d) {
                        if (!(arguments.length < 4)) {
                            var h = a.call(this, c);
                            h.labelId = CKEDITOR.tools.getNextId() + "_label";
                            this._.children = [];
                            CKEDITOR.ui.dialog.uiElement.call(this, b, c, f, "div", null, {
                                role: "presentation"
                            }, function() {
                                var a = [],
                                    f = c.required ?
                                    " cke_required" : "";
                                if (c.labelLayout != "horizontal") a.push('<label class="cke_dialog_ui_labeled_label' + f + '" ', ' id="' + h.labelId + '"', h.inputId ? ' for="' + h.inputId + '"' : "", (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">", c.label, "</label>", '<div class="cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style="' + c.controlStyle + '"' : "") + ' role="presentation">', d.call(this, b, c), "</div>");
                                else {
                                    f = {
                                        type: "hbox",
                                        widths: c.widths,
                                        padding: 0,
                                        children: [{
                                            type: "html",
                                            html: '<label class="cke_dialog_ui_labeled_label' + f +
                                                '" id="' + h.labelId + '" for="' + h.inputId + '"' + (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(c.label) + "</span>"
                                        }, {
                                            type: "html",
                                            html: '<span class="cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style="' + c.controlStyle + '"' : "") + ">" + d.call(this, b, c) + "</span>"
                                        }]
                                    };
                                    CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, f, a)
                                }
                                return a.join("")
                            })
                        }
                    },
                    textInput: function(b, c, f) {
                        if (!(arguments.length < 3)) {
                            a.call(this, c);
                            var d = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                                h = {
                                    "class": "cke_dialog_ui_input_" +
                                        c.type,
                                    id: d,
                                    type: c.type
                                };
                            if (c.validate) this.validate = c.validate;
                            if (c.maxLength) h.maxlength = c.maxLength;
                            if (c.size) h.size = c.size;
                            if (c.inputStyle) h.style = c.inputStyle;
                            var i = this,
                                n = false;
                            b.on("load", function() {
                                i.getInputElement().on("keydown", function(a) {
                                    a.data.getKeystroke() == 13 && (n = true)
                                });
                                i.getInputElement().on("keyup", function(a) {
                                    if (a.data.getKeystroke() == 13 && n) {
                                        b.getButton("ok") && setTimeout(function() {
                                            b.getButton("ok").click()
                                        }, 0);
                                        n = false
                                    }
                                }, null, null, 1E3)
                            });
                            CKEDITOR.ui.dialog.labeledElement.call(this,
                                b, c, f,
                                function() {
                                    var a = ['<div class="cke_dialog_ui_input_', c.type, '" role="presentation"'];
                                    c.width && a.push('style="width:' + c.width + '" ');
                                    a.push("><input ");
                                    h["aria-labelledby"] = this._.labelId;
                                    this._.required && (h["aria-required"] = this._.required);
                                    for (var b in h) a.push(b + '="' + h[b] + '" ');
                                    a.push(" /></div>");
                                    return a.join("")
                                })
                        }
                    },
                    textarea: function(b, c, f) {
                        if (!(arguments.length < 3)) {
                            a.call(this, c);
                            var d = this,
                                h = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
                                i = {};
                            if (c.validate) this.validate = c.validate;
                            i.rows = c.rows || 5;
                            i.cols = c.cols || 20;
                            if (typeof c.inputStyle != "undefined") i.style = c.inputStyle;
                            CKEDITOR.ui.dialog.labeledElement.call(this, b, c, f, function() {
                                i["aria-labelledby"] = this._.labelId;
                                this._.required && (i["aria-required"] = this._.required);
                                var a = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea class="cke_dialog_ui_input_textarea" id="', h, '" '],
                                    b;
                                for (b in i) a.push(b + '="' + CKEDITOR.tools.htmlEncode(i[b]) + '" ');
                                a.push(">", CKEDITOR.tools.htmlEncode(d._["default"]), "</textarea></div>");
                                return a.join("")
                            })
                        }
                    },
                    checkbox: function(b, c, d) {
                        if (!(arguments.length < 3)) {
                            var h = a.call(this, c, {
                                "default": !!c["default"]
                            });
                            if (c.validate) this.validate = c.validate;
                            CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "span", null, null, function() {
                                var a = CKEDITOR.tools.extend({}, c, {
                                        id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"
                                    }, true),
                                    d = [],
                                    j = CKEDITOR.tools.getNextId() + "_label",
                                    i = {
                                        "class": "cke_dialog_ui_checkbox_input",
                                        type: "checkbox",
                                        "aria-labelledby": j
                                    };
                                f(a);
                                if (c["default"]) i.checked = "checked";
                                if (typeof a.inputStyle != "undefined") a.style = a.inputStyle;
                                h.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, d, "input", null, i);
                                d.push(' <label id="', j, '" for="', i.id, '"' + (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(c.label), "</label>");
                                return d.join("")
                            })
                        }
                    },
                    radio: function(b, c, d) {
                        if (!(arguments.length < 3)) {
                            a.call(this, c);
                            if (!this._["default"]) this._["default"] = this._.initValue = c.items[0][1];
                            if (c.validate) this.validate = c.valdiate;
                            var h = [],
                                i = this;
                            CKEDITOR.ui.dialog.labeledElement.call(this,
                                b, c, d,
                                function() {
                                    for (var a = [], d = [], j = c.id ? c.id + "_radio" : CKEDITOR.tools.getNextId() + "_radio", m = 0; m < c.items.length; m++) {
                                        var p = c.items[m],
                                            s = p[2] !== void 0 ? p[2] : p[0],
                                            r = p[1] !== void 0 ? p[1] : p[0],
                                            t = CKEDITOR.tools.getNextId() + "_radio_input",
                                            u = t + "_label",
                                            t = CKEDITOR.tools.extend({}, c, {
                                                id: t,
                                                title: null,
                                                type: null
                                            }, true),
                                            s = CKEDITOR.tools.extend({}, t, {
                                                title: s
                                            }, true),
                                            v = {
                                                type: "radio",
                                                "class": "cke_dialog_ui_radio_input",
                                                name: j,
                                                value: r,
                                                "aria-labelledby": u
                                            },
                                            w = [];
                                        if (i._["default"] == r) v.checked = "checked";
                                        f(t);
                                        f(s);
                                        if (typeof t.inputStyle !=
                                            "undefined") t.style = t.inputStyle;
                                        h.push(new CKEDITOR.ui.dialog.uiElement(b, t, w, "input", null, v));
                                        w.push(" ");
                                        new CKEDITOR.ui.dialog.uiElement(b, s, w, "label", null, {
                                            id: u,
                                            "for": v.id
                                        }, p[0]);
                                        a.push(w.join(""))
                                    }
                                    new CKEDITOR.ui.dialog.hbox(b, h, a, d);
                                    return d.join("")
                                });
                            this._.children = h
                        }
                    },
                    button: function(b, c, f) {
                        if (arguments.length) {
                            typeof c == "function" && (c = c(b.getParentEditor()));
                            a.call(this, c, {
                                disabled: c.disabled || false
                            });
                            CKEDITOR.event.implementOn(this);
                            var d = this;
                            b.on("load", function() {
                                var a = this.getElement();
                                (function() {
                                    a.on("click", function(a) {
                                        d.fire("click", {
                                            dialog: d.getDialog()
                                        });
                                        a.data.preventDefault()
                                    });
                                    a.on("keydown", function(a) {
                                        if (a.data.getKeystroke() in {
                                                32: 1
                                            }) {
                                            d.click();
                                            a.data.preventDefault()
                                        }
                                    })
                                })();
                                a.unselectable()
                            }, this);
                            var h = CKEDITOR.tools.extend({}, c);
                            delete h.style;
                            var i = CKEDITOR.tools.getNextId() + "_label";
                            CKEDITOR.ui.dialog.uiElement.call(this, b, h, f, "a", null, {
                                    style: c.style,
                                    href: "javascript:void(0)",
                                    title: c.label,
                                    hidefocus: "true",
                                    "class": c["class"],
                                    role: "button",
                                    "aria-labelledby": i
                                }, '<span id="' +
                                i + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(c.label) + "</span>")
                        }
                    },
                    select: function(b, c, d) {
                        if (!(arguments.length < 3)) {
                            var h = a.call(this, c);
                            if (c.validate) this.validate = c.validate;
                            h.inputId = CKEDITOR.tools.getNextId() + "_select";
                            CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
                                var a = CKEDITOR.tools.extend({}, c, {
                                        id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select"
                                    }, true),
                                    d = [],
                                    j = [],
                                    i = {
                                        id: h.inputId,
                                        "class": "cke_dialog_ui_input_select",
                                        "aria-labelledby": this._.labelId
                                    };
                                if (c.size !=
                                    void 0) i.size = c.size;
                                if (c.multiple != void 0) i.multiple = c.multiple;
                                f(a);
                                for (var m = 0, p; m < c.items.length && (p = c.items[m]); m++) j.push('<option value="', CKEDITOR.tools.htmlEncode(p[1] !== void 0 ? p[1] : p[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(p[0]));
                                if (typeof a.inputStyle != "undefined") a.style = a.inputStyle;
                                h.select = new CKEDITOR.ui.dialog.uiElement(b, a, d, "select", null, i, j.join(""));
                                return d.join("")
                            })
                        }
                    },
                    file: function(b, c, f) {
                        if (!(arguments.length < 3)) {
                            c["default"] === void 0 && (c["default"] = "");
                            var d = CKEDITOR.tools.extend(a.call(this, c), {
                                definition: c,
                                buttons: []
                            });
                            if (c.validate) this.validate = c.validate;
                            b.on("load", function() {
                                CKEDITOR.document.getById(d.frameId).getParent().addClass("cke_dialog_ui_input_file")
                            });
                            CKEDITOR.ui.dialog.labeledElement.call(this, b, c, f, function() {
                                d.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                                var a = CKEDITOR.env.isCustomDomain(),
                                    b = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', d.frameId, '" title="', c.label,
                                        '" src="javascript:void('
                                    ];
                                b.push(a ? "(function(){document.open();document.domain='" + document.domain + "';document.close();})()" : "0");
                                b.push(')"></iframe>');
                                return b.join("")
                            })
                        }
                    },
                    fileButton: function(b, c, f) {
                        if (!(arguments.length < 3)) {
                            a.call(this, c);
                            var d = this;
                            if (c.validate) this.validate = c.validate;
                            var h = CKEDITOR.tools.extend({}, c),
                                i = h.onClick;
                            h.className = (h.className ? h.className + " " : "") + "cke_dialog_ui_button";
                            h.onClick = function(a) {
                                var f = c["for"];
                                if (!i || i.call(this, a) !== false) {
                                    b.getContentElement(f[0],
                                        f[1]).submit();
                                    this.disable()
                                }
                            };
                            b.on("load", function() {
                                b.getContentElement(c["for"][0], c["for"][1])._.buttons.push(d)
                            });
                            CKEDITOR.ui.dialog.button.call(this, b, h, f)
                        }
                    },
                    html: function() {
                        var a = /^\s*<[\w:]+\s+([^>]*)?>/,
                            b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                            c = /\/$/;
                        return function(f, d, h) {
                            if (!(arguments.length < 3)) {
                                var i = [],
                                    o = d.html;
                                o.charAt(0) != "<" && (o = "<span>" + o + "</span>");
                                var m = d.focus;
                                if (m) {
                                    this.focus = function() {
                                        this.selectParentTab();
                                        typeof m == "function" && m.call(this);
                                        this.fire("focus")
                                    };
                                    if (d.isFocusable) this.isFocusable =
                                        this.isFocusable;
                                    this.keyboardFocusable = true
                                }
                                CKEDITOR.ui.dialog.uiElement.call(this, f, d, i, "span", null, null, "");
                                i = i.join("").match(a);
                                o = o.match(b) || ["", "", ""];
                                if (c.test(o[1])) {
                                    o[1] = o[1].slice(0, -1);
                                    o[2] = "/" + o[2]
                                }
                                h.push([o[1], " ", i[1] || "", o[2]].join(""))
                            }
                        }
                    }(),
                    fieldset: function(a, b, c, f, d) {
                        var h = d.label;
                        this._ = {
                            children: b
                        };
                        CKEDITOR.ui.dialog.uiElement.call(this, a, d, f, "fieldset", null, null, function() {
                            var a = [];
                            h && a.push("<legend" + (d.labelStyle ? ' style="' + d.labelStyle + '"' : "") + ">" + h + "</legend>");
                            for (var b =
                                    0; b < c.length; b++) a.push(c[b]);
                            return a.join("")
                        })
                    }
                }, true);
                CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
                CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    setLabel: function(a) {
                        var b = CKEDITOR.document.getById(this._.labelId);
                        b.getChildCount() < 1 ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a;
                        return this
                    },
                    getLabel: function() {
                        var a = CKEDITOR.document.getById(this._.labelId);
                        return !a || a.getChildCount() <
                            1 ? "" : a.getChild(0).getText()
                    },
                    eventProcessors: d
                }, true);
                CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    click: function() {
                        if (!this._.disabled) return this.fire("click", {
                            dialog: this._.dialog
                        });
                        this.getElement().$.blur();
                        return false
                    },
                    enable: function() {
                        this._.disabled = false;
                        var a = this.getElement();
                        a && a.removeClass("cke_disabled")
                    },
                    disable: function() {
                        this._.disabled = true;
                        this.getElement().addClass("cke_disabled")
                    },
                    isVisible: function() {
                        return this.getElement().getFirst().isVisible()
                    },
                    isEnabled: function() {
                        return !this._.disabled
                    },
                    eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                        onClick: function(a, b) {
                            this.on("click", function() {
                                this.getElement().focus();
                                b.apply(this, arguments)
                            })
                        }
                    }, true),
                    accessKeyUp: function() {
                        this.click()
                    },
                    accessKeyDown: function() {
                        this.focus()
                    },
                    keyboardFocusable: true
                }, true);
                CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                    getInputElement: function() {
                        return CKEDITOR.document.getById(this._.inputId)
                    },
                    focus: function() {
                        var a = this.selectParentTab();
                        setTimeout(function() {
                            var b = a.getInputElement();
                            b && b.$.focus()
                        }, 0)
                    },
                    select: function() {
                        var a = this.selectParentTab();
                        setTimeout(function() {
                            var b = a.getInputElement();
                            if (b) {
                                b.$.focus();
                                b.$.select()
                            }
                        }, 0)
                    },
                    accessKeyUp: function() {
                        this.select()
                    },
                    setValue: function(a) {
                        !a && (a = "");
                        return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
                    },
                    keyboardFocusable: true
                }, h, true);
                CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput;
                CKEDITOR.ui.dialog.select.prototype =
                    CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                        getInputElement: function() {
                            return this._.select.getElement()
                        },
                        add: function(a, b, c) {
                            var f = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
                                d = this.getInputElement().$;
                            f.$.text = a;
                            f.$.value = b === void 0 || b === null ? a : b;
                            c === void 0 || c === null ? CKEDITOR.env.ie ? d.add(f.$) : d.add(f.$, null) : d.add(f.$, c);
                            return this
                        },
                        remove: function(a) {
                            this.getInputElement().$.remove(a);
                            return this
                        },
                        clear: function() {
                            for (var a = this.getInputElement().$; a.length >
                                0;) a.remove(0);
                            return this
                        },
                        keyboardFocusable: true
                    }, h, true);
                CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    getInputElement: function() {
                        return this._.checkbox.getElement()
                    },
                    setValue: function(a, b) {
                        this.getInputElement().$.checked = a;
                        !b && this.fire("change", {
                            value: a
                        })
                    },
                    getValue: function() {
                        return this.getInputElement().$.checked
                    },
                    accessKeyUp: function() {
                        this.setValue(!this.getValue())
                    },
                    eventProcessors: {
                        onChange: function(a, b) {
                            if (CKEDITOR.env.ie) {
                                a.on("load", function() {
                                    var a =
                                        this._.checkbox.getElement();
                                    a.on("propertychange", function(b) {
                                        b = b.data.$;
                                        b.propertyName == "checked" && this.fire("change", {
                                            value: a.$.checked
                                        })
                                    }, this)
                                }, this);
                                this.on("change", b)
                            } else return d.onChange.apply(this, arguments);
                            return null
                        }
                    },
                    keyboardFocusable: true
                }, h, true);
                CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    setValue: function(a, b) {
                        for (var c = this._.children, f, d = 0; d < c.length && (f = c[d]); d++) f.getElement().$.checked = f.getValue() == a;
                        !b && this.fire("change", {
                            value: a
                        })
                    },
                    getValue: function() {
                        for (var a = this._.children, b = 0; b < a.length; b++)
                            if (a[b].getElement().$.checked) return a[b].getValue();
                        return null
                    },
                    accessKeyUp: function() {
                        var a = this._.children,
                            b;
                        for (b = 0; b < a.length; b++)
                            if (a[b].getElement().$.checked) {
                                a[b].getElement().focus();
                                return
                            }
                        a[0].getElement().focus()
                    },
                    eventProcessors: {
                        onChange: function(a, b) {
                            if (CKEDITOR.env.ie) {
                                a.on("load", function() {
                                    for (var a = this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function(a) {
                                        a = a.data.$;
                                        a.propertyName == "checked" && this.$.checked && b.fire("change", {
                                            value: this.getAttribute("value")
                                        })
                                    })
                                }, this);
                                this.on("change", b)
                            } else return d.onChange.apply(this, arguments);
                            return null
                        }
                    },
                    keyboardFocusable: true
                }, h, true);
                CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, h, {
                    getInputElement: function() {
                        var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                        return a.$.forms.length > 0 ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) : this.getElement()
                    },
                    submit: function() {
                        this.getInputElement().getParent().$.submit();
                        return this
                    },
                    getAction: function() {
                        return this.getInputElement().getParent().$.action
                    },
                    registerEvents: function(a) {
                        var b = /^on([A-Z]\w+)/,
                            c, f = function(a, b, c, f) {
                                a.on("formLoaded", function() {
                                    a.getInputElement().on(c, f, a)
                                })
                            },
                            d;
                        for (d in a)
                            if (c = d.match(b)) this.eventProcessors[d] ? this.eventProcessors[d].call(this, this._.dialog, a[d]) : f(this, this._.dialog, c[1].toLowerCase(), a[d]);
                        return this
                    },
                    reset: function() {
                        function a() {
                            c.$.open();
                            if (CKEDITOR.env.isCustomDomain()) c.$.domain =
                                document.domain;
                            var e = "";
                            f.size && (e = f.size - (CKEDITOR.env.ie ? 7 : 0));
                            var s = b.frameId + "_input";
                            c.$.write(['<html dir="' + o + '" lang="' + m + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + o + '" lang="' + m + '" action="', CKEDITOR.tools.htmlEncode(f.action), '"><label id="', b.labelId, '" for="', s, '" style="display:none">', CKEDITOR.tools.htmlEncode(f.label), '</label><input id="', s, '" aria-labelledby="', b.labelId,
                                '" type="file" name="', CKEDITOR.tools.htmlEncode(f.id || "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(e > 0 ? e : ""), '" /></form></body></html>', "<script>window.parent.CKEDITOR.tools.callFunction(" + h + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + i + ")}<\/script>"
                            ].join(""));
                            c.$.close();
                            for (e = 0; e < d.length; e++) d[e].enable()
                        }
                        var b = this._,
                            c = CKEDITOR.document.getById(b.frameId).getFrameDocument(),
                            f = b.definition,
                            d = b.buttons,
                            h = this.formLoadedNumber,
                            i = this.formUnloadNumber,
                            o = b.dialog._.editor.lang.dir,
                            m = b.dialog._.editor.langCode;
                        if (!h) {
                            h = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() {
                                this.fire("formLoaded")
                            }, this);
                            i = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() {
                                this.getInputElement().clearCustomData()
                            }, this);
                            this.getDialog()._.editor.on("destroy", function() {
                                CKEDITOR.tools.removeFunction(h);
                                CKEDITOR.tools.removeFunction(i)
                            })
                        }
                        CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                    },
                    getValue: function() {
                        return this.getInputElement().$.value || ""
                    },
                    setInitValue: function() {
                        this._.initValue =
                            ""
                    },
                    eventProcessors: {
                        onChange: function(a, b) {
                            if (!this._.domOnChangeRegistered) {
                                this.on("formLoaded", function() {
                                    this.getInputElement().on("change", function() {
                                        this.fire("change", {
                                            value: this.getValue()
                                        })
                                    }, this)
                                }, this);
                                this._.domOnChangeRegistered = true
                            }
                            this.on("change", b)
                        }
                    },
                    keyboardFocusable: true
                }, true);
                CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button;
                CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
                CKEDITOR.dialog.addUIElement("text", b);
                CKEDITOR.dialog.addUIElement("password", b);
                CKEDITOR.dialog.addUIElement("textarea", c);
                CKEDITOR.dialog.addUIElement("checkbox", c);
                CKEDITOR.dialog.addUIElement("radio", c);
                CKEDITOR.dialog.addUIElement("button", c);
                CKEDITOR.dialog.addUIElement("select", c);
                CKEDITOR.dialog.addUIElement("file", c);
                CKEDITOR.dialog.addUIElement("fileButton", c);
                CKEDITOR.dialog.addUIElement("html", c);
                CKEDITOR.dialog.addUIElement("fieldset", {
                    build: function(a, b, c) {
                        for (var f = b.children, d, h = [], i = [], o = 0; o < f.length && (d = f[o]); o++) {
                            var m = [];
                            h.push(m);
                            i.push(CKEDITOR.dialog._.uiElementBuilders[d.type].build(a, d, m))
                        }
                        return new CKEDITOR.ui.dialog[b.type](a, i, h, c, b)
                    }
                })
            }
        });
        CKEDITOR.DIALOG_RESIZE_NONE = 0;
        CKEDITOR.DIALOG_RESIZE_WIDTH = 1;
        CKEDITOR.DIALOG_RESIZE_HEIGHT = 2;
        CKEDITOR.DIALOG_RESIZE_BOTH = 3;
        (function() {
            function a() {
                for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)
                    if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
                return null
            }

            function b() {
                for (var a =
                        this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)
                    if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
                return null
            }

            function c(a, b) {
                for (var c = a.$.getElementsByTagName("input"), f = 0, d = c.length; f < d; f++) {
                    var g = new CKEDITOR.dom.element(c[f]);
                    if (g.getAttribute("type").toLowerCase() == "text")
                        if (b) {
                            g.setAttribute("value", g.getCustomData("fake_value") || "");
                            g.removeCustomData("fake_value")
                        } else {
                            g.setCustomData("fake_value", g.getAttribute("value"));
                            g.setAttribute("value", "")
                        }
                }
            }

            function h(a, b) {
                var c = this.getInputElement();
                c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", true));
                a || (this.select ? this.select() : this.focus());
                b && alert(b);
                this.fire("validated", {
                    valid: a,
                    msg: b
                })
            }

            function d() {
                var a = this.getInputElement();
                a && a.removeAttribute("aria-invalid")
            }

            function i(a) {
                var a = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", o).output({
                        id: CKEDITOR.tools.getNextNumber(),
                        editorId: a.id,
                        langDir: a.lang.dir,
                        langCode: a.langCode,
                        editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
                        closeTitle: a.lang.common.close
                    })),
                    b = a.getChild([0, 0, 0, 0, 0]),
                    c = b.getChild(0),
                    f = b.getChild(1);
                if (CKEDITOR.env.ie && !CKEDITOR.env.ie6Compat) {
                    var d = CKEDITOR.env.isCustomDomain(),
                        d = "javascript:void(function(){" + encodeURIComponent("document.open();" + (d ? 'document.domain="' + document.domain + '";' : "") + "document.close();") + "}())";
                    CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + d + '" tabIndex="-1"></iframe>').appendTo(b.getParent())
                }
                c.unselectable();
                f.unselectable();
                return {
                    element: a,
                    parts: {
                        dialog: a.getChild(0),
                        title: c,
                        close: f,
                        tabs: b.getChild(2),
                        contents: b.getChild([3, 0, 0, 0]),
                        footer: b.getChild([3, 0, 1, 0])
                    }
                }
            }

            function f(a, b, c) {
                this.element = b;
                this.focusIndex = c;
                this.tabIndex = 0;
                this.isFocusable = function() {
                    return !b.getAttribute("disabled") && b.isVisible()
                };
                this.focus = function() {
                    a._.currentFocusIndex = this.focusIndex;
                    this.element.focus()
                };
                b.on("keydown", function(a) {
                    a.data.getKeystroke() in {
                        32: 1,
                        13: 1
                    } && this.fire("click")
                });
                b.on("focus", function() {
                    this.fire("mouseover")
                });
                b.on("blur", function() {
                    this.fire("mouseout")
                })
            }

            function e(a, b) {
                this._ = {
                    dialog: a
                };
                CKEDITOR.tools.extend(this, b)
            }

            function g(a) {
                function b(c) {
                    var j = a.getSize(),
                        i = CKEDITOR.document.getWindow().getViewPaneSize(),
                        k = c.data.$.screenX,
                        n = c.data.$.screenY,
                        m = k - f.x,
                        o = n - f.y;
                    f = {
                        x: k,
                        y: n
                    };
                    d.x = d.x + m;
                    d.y = d.y + o;
                    a.move(d.x + h[3] < e ? -h[3] : d.x - h[1] > i.width - j.width - e ? i.width - j.width + (g.lang.dir == "rtl" ? 0 : h[1]) : d.x, d.y + h[0] < e ? -h[0] : d.y - h[2] > i.height - j.height - e ? i.height - j.height + h[2] : d.y, 1);
                    c.data.preventDefault()
                }

                function c() {
                    CKEDITOR.document.removeListener("mousemove",
                        b);
                    CKEDITOR.document.removeListener("mouseup", c);
                    if (CKEDITOR.env.ie6Compat) {
                        var a = w.getChild(0).getFrameDocument();
                        a.removeListener("mousemove", b);
                        a.removeListener("mouseup", c)
                    }
                }
                var f = null,
                    d = null;
                a.getElement().getFirst();
                var g = a.getParentEditor(),
                    e = g.config.dialog_magnetDistance,
                    h = CKEDITOR.skin.margins || [0, 0, 0, 0];
                typeof e == "undefined" && (e = 20);
                a.parts.title.on("mousedown", function(g) {
                    f = {
                        x: g.data.$.screenX,
                        y: g.data.$.screenY
                    };
                    CKEDITOR.document.on("mousemove", b);
                    CKEDITOR.document.on("mouseup", c);
                    d =
                        a.getPosition();
                    if (CKEDITOR.env.ie6Compat) {
                        var e = w.getChild(0).getFrameDocument();
                        e.on("mousemove", b);
                        e.on("mouseup", c)
                    }
                    g.data.preventDefault()
                }, a)
            }

            function j(a) {
                var b, c;

                function f(d) {
                    var m = h.lang.dir == "rtl",
                        o = n.width,
                        p = n.height,
                        q = o + (d.data.$.screenX - b) * (m ? -1 : 1) * (a._.moved ? 1 : 2),
                        l = p + (d.data.$.screenY - c) * (a._.moved ? 1 : 2),
                        u = a._.element.getFirst(),
                        u = m && u.getComputedStyle("right"),
                        s = a.getPosition();
                    s.y + l > k.height && (l = k.height - s.y);
                    if ((m ? u : s.x) + q > k.width) q = k.width - (m ? u : s.x);
                    if (e == CKEDITOR.DIALOG_RESIZE_WIDTH ||
                        e == CKEDITOR.DIALOG_RESIZE_BOTH) o = Math.max(g.minWidth || 0, q - j);
                    if (e == CKEDITOR.DIALOG_RESIZE_HEIGHT || e == CKEDITOR.DIALOG_RESIZE_BOTH) p = Math.max(g.minHeight || 0, l - i);
                    a.resize(o, p);
                    a._.moved || a.layout();
                    d.data.preventDefault()
                }

                function d() {
                    CKEDITOR.document.removeListener("mouseup", d);
                    CKEDITOR.document.removeListener("mousemove", f);
                    if (m) {
                        m.remove();
                        m = null
                    }
                    if (CKEDITOR.env.ie6Compat) {
                        var a = w.getChild(0).getFrameDocument();
                        a.removeListener("mouseup", d);
                        a.removeListener("mousemove", f)
                    }
                }
                var g = a.definition,
                    e =
                    g.resizable;
                if (e != CKEDITOR.DIALOG_RESIZE_NONE) {
                    var h = a.getParentEditor(),
                        j, i, k, n, m, o = CKEDITOR.tools.addFunction(function(g) {
                            n = a.getSize();
                            var e = a.parts.contents;
                            if (e.$.getElementsByTagName("iframe").length) {
                                m = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>');
                                e.append(m)
                            }
                            i = n.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.opera || CKEDITOR.env.ie && CKEDITOR.env.quirks));
                            j = n.width - a.parts.contents.getSize("width",
                                1);
                            b = g.screenX;
                            c = g.screenY;
                            k = CKEDITOR.document.getWindow().getViewPaneSize();
                            CKEDITOR.document.on("mousemove", f);
                            CKEDITOR.document.on("mouseup", d);
                            if (CKEDITOR.env.ie6Compat) {
                                e = w.getChild(0).getFrameDocument();
                                e.on("mousemove", f);
                                e.on("mouseup", d)
                            }
                            g.preventDefault && g.preventDefault()
                        });
                    a.on("load", function() {
                        var b = "";
                        e == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : e == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
                        b = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' +
                            b + " cke_resizer_" + h.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(h.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + o + ', event )"></div>');
                        a.parts.footer.append(b, 1)
                    });
                    h.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(o)
                    })
                }
            }

            function k(a) {
                a.data.preventDefault(1)
            }

            function q(a) {
                var b = CKEDITOR.document.getWindow(),
                    c = a.config,
                    f = c.dialog_backgroundCoverColor || "white",
                    d = c.dialog_backgroundCoverOpacity,
                    g = c.baseFloatZIndex,
                    c = CKEDITOR.tools.genKey(f, d, g),
                    e = v[c];
                if (e) e.show();
                else {
                    g = ['<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", g, "; top: 0px; left: 0px; ", !CKEDITOR.env.ie6Compat ? "background-color: " + f : "", '" class="cke_dialog_background_cover">'];
                    if (CKEDITOR.env.ie6Compat) {
                        var h = CKEDITOR.env.isCustomDomain(),
                            f = "<html><body style=\\'background-color:" + f + ";\\'></body></html>";
                        g.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:');
                        g.push("void((function(){document.open();" + (h ? "document.domain='" +
                            document.domain + "';" : "") + "document.write( '" + f + "' );document.close();})())");
                        g.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')
                    }
                    g.push("</div>");
                    e = CKEDITOR.dom.element.createFromHtml(g.join(""));
                    e.setOpacity(d != void 0 ? d : 0.5);
                    e.on("keydown", k);
                    e.on("keypress", k);
                    e.on("keyup", k);
                    e.appendTo(CKEDITOR.document.getBody());
                    v[c] = e
                }
                a.focusManager.add(e);
                w = e;
                var a = function() {
                        var a = b.getViewPaneSize();
                        e.setStyles({
                            width: a.width +
                                "px",
                            height: a.height + "px"
                        })
                    },
                    j = function() {
                        var a = b.getScrollPosition(),
                            c = CKEDITOR.dialog._.currentTop;
                        e.setStyles({
                            left: a.x + "px",
                            top: a.y + "px"
                        });
                        if (c) {
                            do {
                                a = c.getPosition();
                                c.move(a.x, a.y)
                            } while (c = c._.parentDialog)
                        }
                    };
                u = a;
                b.on("resize", a);
                a();
                (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && e.focus();
                if (CKEDITOR.env.ie6Compat) {
                    var i = function() {
                        j();
                        arguments.callee.prevScrollHandler.apply(this, arguments)
                    };
                    b.$.setTimeout(function() {
                        i.prevScrollHandler = window.onscroll || function() {};
                        window.onscroll = i
                    }, 0);
                    j()
                }
            }

            function l(a) {
                if (w) {
                    a.focusManager.remove(w);
                    a = CKEDITOR.document.getWindow();
                    w.hide();
                    a.removeListener("resize", u);
                    CKEDITOR.env.ie6Compat && a.$.setTimeout(function() {
                        window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
                    }, 0);
                    u = null
                }
            }
            var n = CKEDITOR.tools.cssLength,
                o = '<div class="cke cke_reset_all {editorId} {editorDialogClass}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
            CKEDITOR.dialog = function(c, f) {
                function e() {
                    var a = v._.focusList;
                    a.sort(function(a, b) {
                        return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex
                    });
                    for (var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c
                }

                function k(a) {
                    var b = v._.focusList,
                        a = a || 0;
                    if (!(b.length < 1)) {
                        var c = v._.currentFocusIndex;
                        try {
                            b[c].getInputElement().$.blur()
                        } catch (f) {}
                        for (var d = c = (c + a + b.length) % b.length; a && !b[d].isFocusable();) {
                            d = (d + a + b.length) % b.length;
                            if (d == c) break
                        }
                        b[d].focus();
                        b[d].type == "text" && b[d].select()
                    }
                }

                function n(f) {
                    if (v ==
                        CKEDITOR.dialog._.currentTop) {
                        var d = f.data.getKeystroke(),
                            e = c.lang.dir == "rtl";
                        r = x = 0;
                        if (d == 9 || d == CKEDITOR.SHIFT + 9) {
                            d = d == CKEDITOR.SHIFT + 9;
                            if (v._.tabBarMode) {
                                d = d ? a.call(v) : b.call(v);
                                v.selectPage(d);
                                v._.tabs[d][0].focus()
                            } else k(d ? -1 : 1);
                            r = 1
                        } else if (d == CKEDITOR.ALT + 121 && !v._.tabBarMode && v.getPageCount() > 1) {
                            v._.tabBarMode = true;
                            v._.tabs[v._.currentTabId][0].focus();
                            r = 1
                        } else if ((d == 37 || d == 39) && v._.tabBarMode) {
                            d = d == (e ? 39 : 37) ? a.call(v) : b.call(v);
                            v.selectPage(d);
                            v._.tabs[d][0].focus();
                            r = 1
                        } else if ((d == 13 || d ==
                                32) && v._.tabBarMode) {
                            this.selectPage(this._.currentTabId);
                            this._.tabBarMode = false;
                            this._.currentFocusIndex = -1;
                            k(1);
                            r = 1
                        } else if (d == 13) {
                            d = f.data.getTarget();
                            if (!d.is("a", "button", "select") && (!d.is("input") || d.$.type != "button")) {
                                (d = this.getButton("ok")) && CKEDITOR.tools.setTimeout(d.click, 0, d);
                                r = 1
                            }
                            x = 1
                        } else if (d == 27) {
                            (d = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(d.click, 0, d): this.fire("cancel", {
                                hide: true
                            }).hide !== false && this.hide();
                            x = 1
                        } else return;
                        o(f)
                    }
                }

                function o(a) {
                    r ? a.data.preventDefault(1) :
                        x && a.data.stopPropagation()
                }
                var p = CKEDITOR.dialog._.dialogDefinitions[f],
                    q = CKEDITOR.tools.clone(m),
                    l = c.config.dialog_buttonsOrder || "OS",
                    u = c.lang.dir,
                    s = {},
                    r, x;
                (l == "OS" && CKEDITOR.env.mac || l == "rtl" && u == "ltr" || l == "ltr" && u == "rtl") && q.buttons.reverse();
                p = CKEDITOR.tools.extend(p(c), q);
                p = CKEDITOR.tools.clone(p);
                p = new t(this, p);
                q = i(c);
                this._ = {
                    editor: c,
                    element: q.element,
                    name: f,
                    contentSize: {
                        width: 0,
                        height: 0
                    },
                    size: {
                        width: 0,
                        height: 0
                    },
                    contents: {},
                    buttons: {},
                    accessKeyMap: {},
                    tabs: {},
                    tabIdList: [],
                    currentTabId: null,
                    currentTabIndex: null,
                    pageCount: 0,
                    lastTab: null,
                    tabBarMode: false,
                    focusList: [],
                    currentFocusIndex: 0,
                    hasFocus: false
                };
                this.parts = q.parts;
                CKEDITOR.tools.setTimeout(function() {
                    c.fire("ariaWidget", this.parts.contents)
                }, 0, this);
                q = {
                    position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
                    top: 0,
                    visibility: "hidden"
                };
                q[u == "rtl" ? "right" : "left"] = 0;
                this.parts.dialog.setStyles(q);
                CKEDITOR.event.call(this);
                this.definition = p = CKEDITOR.fire("dialogDefinition", {
                    name: f,
                    definition: p
                }, c).definition;
                if (!("removeDialogTabs" in c._) &&
                    c.config.removeDialogTabs) {
                    q = c.config.removeDialogTabs.split(";");
                    for (u = 0; u < q.length; u++) {
                        l = q[u].split(":");
                        if (l.length == 2) {
                            var w = l[0];
                            s[w] || (s[w] = []);
                            s[w].push(l[1])
                        }
                    }
                    c._.removeDialogTabs = s
                }
                if (c._.removeDialogTabs && (s = c._.removeDialogTabs[f]))
                    for (u = 0; u < s.length; u++) p.removeContents(s[u]);
                if (p.onLoad) this.on("load", p.onLoad);
                if (p.onShow) this.on("show", p.onShow);
                if (p.onHide) this.on("hide", p.onHide);
                if (p.onOk) this.on("ok", function(a) {
                    c.fire("saveSnapshot");
                    setTimeout(function() {
                            c.fire("saveSnapshot")
                        },
                        0);
                    if (p.onOk.call(this, a) === false) a.data.hide = false
                });
                if (p.onCancel) this.on("cancel", function(a) {
                    if (p.onCancel.call(this, a) === false) a.data.hide = false
                });
                var v = this,
                    z = function(a) {
                        var b = v._.contents,
                            c = false,
                            d;
                        for (d in b)
                            for (var f in b[d])
                                if (c = a.call(this, b[d][f])) return
                    };
                this.on("ok", function(a) {
                    z(function(b) {
                        if (b.validate) {
                            var c = b.validate(this),
                                d = typeof c == "string" || c === false;
                            if (d) {
                                a.data.hide = false;
                                a.stop()
                            }
                            h.call(b, !d, typeof c == "string" ? c : void 0);
                            return d
                        }
                    })
                }, this, null, 0);
                this.on("cancel", function(a) {
                    z(function(b) {
                        if (b.isChanged()) {
                            if (!confirm(c.lang.common.confirmCancel)) a.data.hide =
                                false;
                            return true
                        }
                    })
                }, this, null, 0);
                this.parts.close.on("click", function(a) {
                    this.fire("cancel", {
                        hide: true
                    }).hide !== false && this.hide();
                    a.data.preventDefault()
                }, this);
                this.changeFocus = k;
                var y = this._.element;
                c.focusManager.add(y, 1);
                this.on("show", function() {
                    y.on("keydown", n, this);
                    if (CKEDITOR.env.opera || CKEDITOR.env.gecko) y.on("keypress", o, this)
                });
                this.on("hide", function() {
                    y.removeListener("keydown", n);
                    (CKEDITOR.env.opera || CKEDITOR.env.gecko) && y.removeListener("keypress", o);
                    z(function(a) {
                        d.apply(a)
                    })
                });
                this.on("iframeAdded", function(a) {
                    (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", n, this, null, 0)
                });
                this.on("show", function() {
                    e();
                    if (c.config.dialog_startupFocusTab && v._.pageCount > 1) {
                        v._.tabBarMode = true;
                        v._.tabs[v._.currentTabId][0].focus()
                    } else if (!this._.hasFocus) {
                        this._.currentFocusIndex = -1;
                        if (p.onFocus) {
                            var a = p.onFocus.call(this);
                            a && a.focus()
                        } else k(1)
                    }
                }, this, null, 4294967295);
                if (CKEDITOR.env.ie6Compat) this.on("load", function() {
                    var a = this.getElement(),
                        b = a.getFirst();
                    b.remove();
                    b.appendTo(a)
                }, this);
                g(this);
                j(this);
                (new CKEDITOR.dom.text(p.title, CKEDITOR.document)).appendTo(this.parts.title);
                for (u = 0; u < p.contents.length; u++)(s = p.contents[u]) && this.addPage(s);
                this.parts.tabs.on("click", function(a) {
                    var b = a.data.getTarget();
                    if (b.hasClass("cke_dialog_tab")) {
                        b = b.$.id;
                        this.selectPage(b.substring(4, b.lastIndexOf("_")));
                        if (this._.tabBarMode) {
                            this._.tabBarMode = false;
                            this._.currentFocusIndex = -1;
                            k(1)
                        }
                        a.data.preventDefault()
                    }
                }, this);
                u = [];
                s = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
                    type: "hbox",
                    className: "cke_dialog_footer_buttons",
                    widths: [],
                    children: p.buttons
                }, u).getChild();
                this.parts.footer.setHtml(u.join(""));
                for (u = 0; u < s.length; u++) this._.buttons[s[u].id] = s[u]
            };
            CKEDITOR.dialog.prototype = {
                destroy: function() {
                    this.hide();
                    this._.element.remove()
                },
                resize: function() {
                    return function(a, b) {
                        if (!this._.contentSize || !(this._.contentSize.width == a && this._.contentSize.height == b)) {
                            CKEDITOR.dialog.fire("resize", {
                                dialog: this,
                                width: a,
                                height: b
                            }, this._.editor);
                            this.fire("resize", {
                                    width: a,
                                    height: b
                                },
                                this._.editor);
                            this.parts.contents.setStyles({
                                width: a + "px",
                                height: b + "px"
                            });
                            if (this._.editor.lang.dir == "rtl" && this._.position) this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10);
                            this._.contentSize = {
                                width: a,
                                height: b
                            }
                        }
                    }
                }(),
                getSize: function() {
                    var a = this._.element.getFirst();
                    return {
                        width: a.$.offsetWidth || 0,
                        height: a.$.offsetHeight || 0
                    }
                },
                move: function() {
                    var a;
                    return function(b, c, d) {
                        var f = this._.element.getFirst(),
                            e = this._.editor.lang.dir == "rtl";
                        a === void 0 && (a = f.getComputedStyle("position") == "fixed");
                        if (!a || !this._.position || !(this._.position.x == b && this._.position.y == c)) {
                            this._.position = {
                                x: b,
                                y: c
                            };
                            if (!a) var g = CKEDITOR.document.getWindow().getScrollPosition(),
                                b = b + g.x,
                                c = c + g.y;
                            if (e) {
                                g = this.getSize();
                                b = CKEDITOR.document.getWindow().getViewPaneSize().width - g.width - b
                            }
                            c = {
                                top: (c > 0 ? c : 0) + "px"
                            };
                            c[e ? "right" : "left"] = (b > 0 ? b : 0) + "px";
                            f.setStyles(c);
                            d && (this._.moved = 1)
                        }
                    }
                }(),
                getPosition: function() {
                    return CKEDITOR.tools.extend({},
                        this._.position)
                },
                show: function() {
                    var a = this._.element,
                        b = this.definition;
                    !a.getParent() || !a.getParent().equals(CKEDITOR.document.getBody()) ? a.appendTo(CKEDITOR.document.getBody()) : a.setStyle("display", "block");
                    if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) {
                        var c = this.parts.dialog;
                        c.setStyle("position", "absolute");
                        setTimeout(function() {
                            c.setStyle("position", "fixed")
                        }, 0)
                    }
                    this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height ||
                        b.height || b.minHeight);
                    this.reset();
                    this.selectPage(this.definition.contents[0].id);
                    if (CKEDITOR.dialog._.currentZIndex === null) CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex;
                    this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex + 10);
                    if (CKEDITOR.dialog._.currentTop === null) {
                        CKEDITOR.dialog._.currentTop = this;
                        this._.parentDialog = null;
                        q(this._.editor)
                    } else {
                        this._.parentDialog = CKEDITOR.dialog._.currentTop;
                        this._.parentDialog.getElement().getFirst().$.style.zIndex -=
                            Math.floor(this._.editor.config.baseFloatZIndex / 2);
                        CKEDITOR.dialog._.currentTop = this
                    }
                    a.on("keydown", y);
                    a.on(CKEDITOR.env.opera ? "keypress" : "keyup", z);
                    this._.hasFocus = false;
                    CKEDITOR.tools.setTimeout(function() {
                            this.layout();
                            this.parts.dialog.setStyle("visibility", "");
                            this.fireOnce("load", {});
                            CKEDITOR.ui.fire("ready", this);
                            this.fire("show", {});
                            this._.editor.fire("dialogShow", this);
                            this._.parentDialog || this._.editor.focusManager.lock();
                            this.foreach(function(a) {
                                a.setInitValue && a.setInitValue()
                            })
                        }, 100,
                        this)
                },
                layout: function() {
                    var a = CKEDITOR.document.getWindow().getViewPaneSize(),
                        b = this.getSize();
                    this.move(this._.moved ? this._.position.x : (a.width - b.width) / 2, this._.moved ? this._.position.y : (a.height - b.height) / 2)
                },
                foreach: function(a) {
                    for (var b in this._.contents)
                        for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
                    return this
                },
                reset: function() {
                    var a = function(a) {
                        a.reset && a.reset(1)
                    };
                    return function() {
                        this.foreach(a);
                        return this
                    }
                }(),
                setupContent: function() {
                    var a = arguments;
                    this.foreach(function(b) {
                        b.setup &&
                            b.setup.apply(b, a)
                    })
                },
                commitContent: function() {
                    var a = arguments;
                    this.foreach(function(b) {
                        CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
                        b.commit && b.commit.apply(b, a)
                    })
                },
                hide: function() {
                    if (this.parts.dialog.isVisible()) {
                        this.fire("hide", {});
                        this._.editor.fire("dialogHide", this);
                        this.selectPage(this._.tabIdList[0]);
                        var a = this._.element;
                        a.setStyle("display", "none");
                        this.parts.dialog.setStyle("visibility", "hidden");
                        for (J(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
                        if (this._.parentDialog) {
                            var b = this._.parentDialog.getElement().getFirst();
                            b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
                        } else l(this._.editor);
                        if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex - 10;
                        else {
                            CKEDITOR.dialog._.currentZIndex = null;
                            a.removeListener("keydown", y);
                            a.removeListener(CKEDITOR.env.opera ? "keypress" : "keyup", z);
                            var c = this._.editor;
                            c.focus();
                            setTimeout(function() {
                                    c.focusManager.unlock()
                                },
                                0)
                        }
                        delete this._.parentDialog;
                        this.foreach(function(a) {
                            a.resetInitValue && a.resetInitValue()
                        })
                    }
                },
                addPage: function(a) {
                    var b = [],
                        c = a.label ? ' title="' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "",
                        d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                            type: "vbox",
                            className: "cke_dialog_page_contents",
                            children: a.elements,
                            expand: !!a.expand,
                            padding: a.padding,
                            style: a.style || "width: 100%;height:100%"
                        }, b),
                        b = CKEDITOR.dom.element.createFromHtml(b.join(""));
                    b.setAttribute("role", "tabpanel");
                    var f = CKEDITOR.env,
                        e = "cke_" +
                        a.id + "_" + CKEDITOR.tools.getNextNumber(),
                        c = CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"', this._.pageCount > 0 ? " cke_last" : "cke_first", c, a.hidden ? ' style="display:none"' : "", ' id="', e, '"', f.gecko && f.version >= 10900 && !f.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', a.label, "</a>"].join(""));
                    b.setAttribute("aria-labelledby", e);
                    this._.tabs[a.id] = [c, b];
                    this._.tabIdList.push(a.id);
                    !a.hidden && this._.pageCount++;
                    this._.lastTab = c;
                    this.updateStyle();
                    e = this._.contents[a.id] = {};
                    for (f = d.getChild(); d = f.shift();) {
                        e[d.id] = d;
                        typeof d.getChild == "function" && f.push.apply(f, d.getChild())
                    }
                    b.setAttribute("name", a.id);
                    b.appendTo(this.parts.contents);
                    c.unselectable();
                    this.parts.tabs.append(c);
                    if (a.accessKey) {
                        D(this, this, "CTRL+" + a.accessKey, F, B);
                        this._.accessKeyMap["CTRL+" + a.accessKey] = a.id
                    }
                },
                selectPage: function(a) {
                    if (this._.currentTabId != a && this.fire("selectPage", {
                            page: a,
                            currentPage: this._.currentTabId
                        }) !== true) {
                        for (var b in this._.tabs) {
                            var d = this._.tabs[b][0],
                                f = this._.tabs[b][1];
                            if (b != a) {
                                d.removeClass("cke_dialog_tab_selected");
                                f.hide()
                            }
                            f.setAttribute("aria-hidden", b != a)
                        }
                        var e = this._.tabs[a];
                        e[0].addClass("cke_dialog_tab_selected");
                        if (CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat) {
                            c(e[1]);
                            e[1].show();
                            setTimeout(function() {
                                c(e[1], 1)
                            }, 0)
                        } else e[1].show();
                        this._.currentTabId = a;
                        this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                    }
                },
                updateStyle: function() {
                    this.parts.dialog[(this._.pageCount === 1 ? "add" : "remove") + "Class"]("cke_single_page")
                },
                hidePage: function(b) {
                    var c =
                        this._.tabs[b] && this._.tabs[b][0];
                    if (c && this._.pageCount != 1 && c.isVisible()) {
                        b == this._.currentTabId && this.selectPage(a.call(this));
                        c.hide();
                        this._.pageCount--;
                        this.updateStyle()
                    }
                },
                showPage: function(a) {
                    if (a = this._.tabs[a] && this._.tabs[a][0]) {
                        a.show();
                        this._.pageCount++;
                        this.updateStyle()
                    }
                },
                getElement: function() {
                    return this._.element
                },
                getName: function() {
                    return this._.name
                },
                getContentElement: function(a, b) {
                    var c = this._.contents[a];
                    return c && c[b]
                },
                getValueOf: function(a, b) {
                    return this.getContentElement(a,
                        b).getValue()
                },
                setValueOf: function(a, b, c) {
                    return this.getContentElement(a, b).setValue(c)
                },
                getButton: function(a) {
                    return this._.buttons[a]
                },
                click: function(a) {
                    return this._.buttons[a].click()
                },
                disableButton: function(a) {
                    return this._.buttons[a].disable()
                },
                enableButton: function(a) {
                    return this._.buttons[a].enable()
                },
                getPageCount: function() {
                    return this._.pageCount
                },
                getParentEditor: function() {
                    return this._.editor
                },
                getSelectedElement: function() {
                    return this.getParentEditor().getSelection().getSelectedElement()
                },
                addFocusable: function(a, b) {
                    if (typeof b == "undefined") {
                        b = this._.focusList.length;
                        this._.focusList.push(new f(this, a, b))
                    } else {
                        this._.focusList.splice(b, 0, new f(this, a, b));
                        for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++
                    }
                }
            };
            CKEDITOR.tools.extend(CKEDITOR.dialog, {
                add: function(a, b) {
                    if (!this._.dialogDefinitions[a] || typeof b == "function") this._.dialogDefinitions[a] = b
                },
                exists: function(a) {
                    return !!this._.dialogDefinitions[a]
                },
                getCurrent: function() {
                    return CKEDITOR.dialog._.currentTop
                },
                okButton: function() {
                    var a = function(a, b) {
                        b = b || {};
                        return CKEDITOR.tools.extend({
                            id: "ok",
                            type: "button",
                            label: a.lang.common.ok,
                            "class": "cke_dialog_ui_button_ok",
                            onClick: function(a) {
                                a = a.data.dialog;
                                a.fire("ok", {
                                    hide: true
                                }).hide !== false && a.hide()
                            }
                        }, b, true)
                    };
                    a.type = "button";
                    a.override = function(b) {
                        return CKEDITOR.tools.extend(function(c) {
                            return a(c, b)
                        }, {
                            type: "button"
                        }, true)
                    };
                    return a
                }(),
                cancelButton: function() {
                    var a = function(a, b) {
                        b = b || {};
                        return CKEDITOR.tools.extend({
                            id: "cancel",
                            type: "button",
                            label: a.lang.common.cancel,
                            "class": "cke_dialog_ui_button_cancel",
                            onClick: function(a) {
                                a = a.data.dialog;
                                a.fire("cancel", {
                                    hide: true
                                }).hide !== false && a.hide()
                            }
                        }, b, true)
                    };
                    a.type = "button";
                    a.override = function(b) {
                        return CKEDITOR.tools.extend(function(c) {
                            return a(c, b)
                        }, {
                            type: "button"
                        }, true)
                    };
                    return a
                }(),
                addUIElement: function(a, b) {
                    this._.uiElementBuilders[a] = b
                }
            });
            CKEDITOR.dialog._ = {
                uiElementBuilders: {},
                dialogDefinitions: {},
                currentTop: null,
                currentZIndex: null
            };
            CKEDITOR.event.implementOn(CKEDITOR.dialog);
            CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype,
                true);
            var m = {
                    resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
                    minWidth: 600,
                    minHeight: 400,
                    buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
                },
                p = function(a, b, c) {
                    for (var d = 0, f; f = a[d]; d++) {
                        if (f.id == b) return f;
                        if (c && f[c])
                            if (f = p(f[c], b, c)) return f
                    }
                    return null
                },
                s = function(a, b, c, d, f) {
                    if (c) {
                        for (var e = 0, g; g = a[e]; e++) {
                            if (g.id == c) {
                                a.splice(e, 0, b);
                                return b
                            }
                            if (d && g[d])
                                if (g = s(g[d], b, c, d, true)) return g
                        }
                        if (f) return null
                    }
                    a.push(b);
                    return b
                },
                r = function(a, b, c) {
                    for (var d = 0, f; f = a[d]; d++) {
                        if (f.id == b) return a.splice(d,
                            1);
                        if (c && f[c])
                            if (f = r(f[c], b, c)) return f
                    }
                    return null
                },
                t = function(a, b) {
                    this.dialog = a;
                    for (var c = b.contents, d = 0, f; f = c[d]; d++) c[d] = f && new e(a, f);
                    CKEDITOR.tools.extend(this, b)
                };
            t.prototype = {
                getContents: function(a) {
                    return p(this.contents, a)
                },
                getButton: function(a) {
                    return p(this.buttons, a)
                },
                addContents: function(a, b) {
                    return s(this.contents, a, b)
                },
                addButton: function(a, b) {
                    return s(this.buttons, a, b)
                },
                removeContents: function(a) {
                    r(this.contents, a)
                },
                removeButton: function(a) {
                    r(this.buttons, a)
                }
            };
            e.prototype = {
                get: function(a) {
                    return p(this.elements,
                        a, "children")
                },
                add: function(a, b) {
                    return s(this.elements, a, b, "children")
                },
                remove: function(a) {
                    r(this.elements, a, "children")
                }
            };
            var u, v = {},
                w, x = {},
                y = function(a) {
                    var b = a.data.$.ctrlKey || a.data.$.metaKey,
                        c = a.data.$.altKey,
                        d = a.data.$.shiftKey,
                        f = String.fromCharCode(a.data.$.keyCode);
                    if ((b = x[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + f]) && b.length) {
                        b = b[b.length - 1];
                        b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key);
                        a.data.preventDefault()
                    }
                },
                z = function(a) {
                    var b = a.data.$.ctrlKey || a.data.$.metaKey,
                        c = a.data.$.altKey,
                        d = a.data.$.shiftKey,
                        f = String.fromCharCode(a.data.$.keyCode);
                    if ((b = x[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + f]) && b.length) {
                        b = b[b.length - 1];
                        if (b.keyup) {
                            b.keyup.call(b.uiElement, b.dialog, b.key);
                            a.data.preventDefault()
                        }
                    }
                },
                D = function(a, b, c, d, f) {
                    (x[c] || (x[c] = [])).push({
                        uiElement: a,
                        dialog: b,
                        key: c,
                        keyup: f || a.accessKeyUp,
                        keydown: d || a.accessKeyDown
                    })
                },
                J = function(a) {
                    for (var b in x) {
                        for (var c = x[b], d = c.length - 1; d >= 0; d--)(c[d].dialog == a || c[d].uiElement == a) && c.splice(d, 1);
                        c.length === 0 && delete x[b]
                    }
                },
                B = function(a,
                    b) {
                    a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b])
                },
                F = function() {};
            (function() {
                CKEDITOR.ui.dialog = {
                    uiElement: function(a, b, c, d, f, e, g) {
                        if (!(arguments.length < 4)) {
                            var h = (d.call ? d(b) : d) || "div",
                                j = ["<", h, " "],
                                i = (f && f.call ? f(b) : f) || {},
                                k = (e && e.call ? e(b) : e) || {},
                                n = (g && g.call ? g.call(this, a, b) : g) || "",
                                p = this.domId = k.id || CKEDITOR.tools.getNextId() + "_uiElement";
                            this.id = b.id;
                            k.id = p;
                            var m = {};
                            b.type && (m["cke_dialog_ui_" + b.type] = 1);
                            b.className && (m[b.className] = 1);
                            b.disabled && (m.cke_disabled = 1);
                            for (var o = k["class"] &&
                                    k["class"].split ? k["class"].split(" ") : [], p = 0; p < o.length; p++) o[p] && (m[o[p]] = 1);
                            o = [];
                            for (p in m) o.push(p);
                            k["class"] = o.join(" ");
                            if (b.title) k.title = b.title;
                            m = (b.style || "").split(";");
                            if (b.align) {
                                o = b.align;
                                i["margin-left"] = o == "left" ? 0 : "auto";
                                i["margin-right"] = o == "right" ? 0 : "auto"
                            }
                            for (p in i) m.push(p + ":" + i[p]);
                            b.hidden && m.push("display:none");
                            for (p = m.length - 1; p >= 0; p--) m[p] === "" && m.splice(p, 1);
                            if (m.length > 0) k.style = (k.style ? k.style + "; " : "") + m.join("; ");
                            for (p in k) j.push(p + '="' + CKEDITOR.tools.htmlEncode(k[p]) +
                                '" ');
                            j.push(">", n, "</", h, ">");
                            c.push(j.join(""));
                            (this._ || (this._ = {})).dialog = a;
                            if (typeof b.isChanged == "boolean") this.isChanged = function() {
                                return b.isChanged
                            };
                            if (typeof b.isChanged == "function") this.isChanged = b.isChanged;
                            if (typeof b.setValue == "function") this.setValue = CKEDITOR.tools.override(this.setValue, function(a) {
                                return function(c) {
                                    a.call(this, b.setValue.call(this, c))
                                }
                            });
                            if (typeof b.getValue == "function") this.getValue = CKEDITOR.tools.override(this.getValue, function(a) {
                                return function() {
                                    return b.getValue.call(this,
                                        a.call(this))
                                }
                            });
                            CKEDITOR.event.implementOn(this);
                            this.registerEvents(b);
                            this.accessKeyUp && (this.accessKeyDown && b.accessKey) && D(this, a, "CTRL+" + b.accessKey);
                            var q = this;
                            a.on("load", function() {
                                var b = q.getInputElement();
                                if (b) {
                                    var c = q.type in {
                                        checkbox: 1,
                                        ratio: 1
                                    } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : "";
                                    b.on("focus", function() {
                                        a._.tabBarMode = false;
                                        a._.hasFocus = true;
                                        q.fire("focus");
                                        c && this.addClass(c)
                                    });
                                    b.on("blur", function() {
                                        q.fire("blur");
                                        c && this.removeClass(c)
                                    })
                                }
                            });
                            if (this.keyboardFocusable) {
                                this.tabIndex =
                                    b.tabIndex || 0;
                                this.focusIndex = a._.focusList.push(this) - 1;
                                this.on("focus", function() {
                                    a._.currentFocusIndex = q.focusIndex
                                })
                            }
                            CKEDITOR.tools.extend(this, b)
                        }
                    },
                    hbox: function(a, b, c, d, f) {
                        if (!(arguments.length < 4)) {
                            this._ || (this._ = {});
                            var e = this._.children = b,
                                g = f && f.widths || null,
                                h = f && f.height || null,
                                j, i = {
                                    role: "presentation"
                                };
                            f && f.align && (i.align = f.align);
                            CKEDITOR.ui.dialog.uiElement.call(this, a, f || {
                                type: "hbox"
                            }, d, "table", {}, i, function() {
                                var a = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                                for (j = 0; j < c.length; j++) {
                                    var b =
                                        "cke_dialog_ui_hbox_child",
                                        d = [];
                                    j === 0 && (b = "cke_dialog_ui_hbox_first");
                                    j == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                                    a.push('<td class="', b, '" role="presentation" ');
                                    g ? g[j] && d.push("width:" + n(g[j])) : d.push("width:" + Math.floor(100 / c.length) + "%");
                                    h && d.push("height:" + n(h));
                                    f && f.padding != void 0 && d.push("padding:" + n(f.padding));
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && e[j].align) && d.push("text-align:" + e[j].align);
                                    d.length > 0 && a.push('style="' + d.join("; ") + '" ');
                                    a.push(">", c[j], "</td>")
                                }
                                a.push("</tr></tbody>");
                                return a.join("")
                            })
                        }
                    },
                    vbox: function(a, b, c, d, f) {
                        if (!(arguments.length < 3)) {
                            this._ || (this._ = {});
                            var e = this._.children = b,
                                g = f && f.width || null,
                                h = f && f.heights || null;
                            CKEDITOR.ui.dialog.uiElement.call(this, a, f || {
                                type: "vbox"
                            }, d, "div", null, {
                                role: "presentation"
                            }, function() {
                                var b = ['<table role="presentation" cellspacing="0" border="0" '];
                                b.push('style="');
                                f && f.expand && b.push("height:100%;");
                                b.push("width:" + n(g || "100%"), ";");
                                b.push('"');
                                b.push('align="', CKEDITOR.tools.htmlEncode(f && f.align || (a.getParentEditor().lang.dir ==
                                    "ltr" ? "left" : "right")), '" ');
                                b.push("><tbody>");
                                for (var d = 0; d < c.length; d++) {
                                    var j = [];
                                    b.push('<tr><td role="presentation" ');
                                    g && j.push("width:" + n(g || "100%"));
                                    h ? j.push("height:" + n(h[d])) : f && f.expand && j.push("height:" + Math.floor(100 / c.length) + "%");
                                    f && f.padding != void 0 && j.push("padding:" + n(f.padding));
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && e[d].align) && j.push("text-align:" + e[d].align);
                                    j.length > 0 && b.push('style="', j.join("; "), '" ');
                                    b.push(' class="cke_dialog_ui_vbox_child">', c[d], "</td></tr>")
                                }
                                b.push("</tbody></table>");
                                return b.join("")
                            })
                        }
                    }
                }
            })();
            CKEDITOR.ui.dialog.uiElement.prototype = {
                getElement: function() {
                    return CKEDITOR.document.getById(this.domId)
                },
                getInputElement: function() {
                    return this.getElement()
                },
                getDialog: function() {
                    return this._.dialog
                },
                setValue: function(a, b) {
                    this.getInputElement().setValue(a);
                    !b && this.fire("change", {
                        value: a
                    });
                    return this
                },
                getValue: function() {
                    return this.getInputElement().getValue()
                },
                isChanged: function() {
                    return false
                },
                selectParentTab: function() {
                    for (var a = this.getInputElement();
                        (a = a.getParent()) &&
                        a.$.className.search("cke_dialog_page_contents") == -1;);
                    if (!a) return this;
                    a = a.getAttribute("name");
                    this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
                    return this
                },
                focus: function() {
                    this.selectParentTab().getInputElement().focus();
                    return this
                },
                registerEvents: function(a) {
                    var b = /^on([A-Z]\w+)/,
                        c, d = function(a, b, c, d) {
                            b.on("load", function() {
                                a.getInputElement().on(c, d, a)
                            })
                        },
                        f;
                    for (f in a)
                        if (c = f.match(b)) this.eventProcessors[f] ? this.eventProcessors[f].call(this, this._.dialog, a[f]) : d(this, this._.dialog,
                            c[1].toLowerCase(), a[f]);
                    return this
                },
                eventProcessors: {
                    onLoad: function(a, b) {
                        a.on("load", b, this)
                    },
                    onShow: function(a, b) {
                        a.on("show", b, this)
                    },
                    onHide: function(a, b) {
                        a.on("hide", b, this)
                    }
                },
                accessKeyDown: function() {
                    this.focus()
                },
                accessKeyUp: function() {},
                disable: function() {
                    var a = this.getElement();
                    this.getInputElement().setAttribute("disabled", "true");
                    a.addClass("cke_disabled")
                },
                enable: function() {
                    var a = this.getElement();
                    this.getInputElement().removeAttribute("disabled");
                    a.removeClass("cke_disabled")
                },
                isEnabled: function() {
                    return !this.getElement().hasClass("cke_disabled")
                },
                isVisible: function() {
                    return this.getInputElement().isVisible()
                },
                isFocusable: function() {
                    return !this.isEnabled() || !this.isVisible() ? false : true
                }
            };
            CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                getChild: function(a) {
                    if (arguments.length < 1) return this._.children.concat();
                    a.splice || (a = [a]);
                    return a.length < 2 ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
                }
            }, true);
            CKEDITOR.ui.dialog.vbox.prototype =
                new CKEDITOR.ui.dialog.hbox;
            (function() {
                var a = {
                    build: function(a, b, c) {
                        for (var d = b.children, f, e = [], g = [], h = 0; h < d.length && (f = d[h]); h++) {
                            var j = [];
                            e.push(j);
                            g.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, j))
                        }
                        return new CKEDITOR.ui.dialog[b.type](a, g, e, c, b)
                    }
                };
                CKEDITOR.dialog.addUIElement("hbox", a);
                CKEDITOR.dialog.addUIElement("vbox", a)
            })();
            CKEDITOR.dialogCommand = function(a, b) {
                this.dialogName = a;
                CKEDITOR.tools.extend(this, b, true)
            };
            CKEDITOR.dialogCommand.prototype = {
                exec: function(a) {
                    CKEDITOR.env.opera ?
                        CKEDITOR.tools.setTimeout(function() {
                            a.openDialog(this.dialogName)
                        }, 0, this) : a.openDialog(this.dialogName)
                },
                canUndo: false,
                editorFocus: CKEDITOR.env.ie || CKEDITOR.env.webkit
            };
            (function() {
                var a = /^([a]|[^a])+$/,
                    b = /^\d*$/,
                    c = /^\d*(?:\.\d+)?$/,
                    d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
                    f = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                    e = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
                CKEDITOR.VALIDATE_OR = 1;
                CKEDITOR.VALIDATE_AND = 2;
                CKEDITOR.dialog.validate = {
                    functions: function() {
                        var a = arguments;
                        return function() {
                            var b =
                                this && this.getValue ? this.getValue() : a[0],
                                c = void 0,
                                d = CKEDITOR.VALIDATE_AND,
                                f = [],
                                e;
                            for (e = 0; e < a.length; e++)
                                if (typeof a[e] == "function") f.push(a[e]);
                                else break;
                            if (e < a.length && typeof a[e] == "string") {
                                c = a[e];
                                e++
                            }
                            e < a.length && typeof a[e] == "number" && (d = a[e]);
                            var g = d == CKEDITOR.VALIDATE_AND ? true : false;
                            for (e = 0; e < f.length; e++) g = d == CKEDITOR.VALIDATE_AND ? g && f[e](b) : g || f[e](b);
                            return !g ? c : true
                        }
                    },
                    regex: function(a, b) {
                        return function(c) {
                            c = this && this.getValue ? this.getValue() : c;
                            return !a.test(c) ? b : true
                        }
                    },
                    notEmpty: function(b) {
                        return this.regex(a,
                            b)
                    },
                    integer: function(a) {
                        return this.regex(b, a)
                    },
                    number: function(a) {
                        return this.regex(c, a)
                    },
                    cssLength: function(a) {
                        return this.functions(function(a) {
                            return f.test(CKEDITOR.tools.trim(a))
                        }, a)
                    },
                    htmlLength: function(a) {
                        return this.functions(function(a) {
                            return d.test(CKEDITOR.tools.trim(a))
                        }, a)
                    },
                    inlineStyle: function(a) {
                        return this.functions(function(a) {
                            return e.test(CKEDITOR.tools.trim(a))
                        }, a)
                    },
                    equals: function(a, b) {
                        return this.functions(function(b) {
                            return b == a
                        }, b)
                    },
                    notEqual: function(a, b) {
                        return this.functions(function(b) {
                            return b !=
                                a
                        }, b)
                    }
                };
                CKEDITOR.on("instanceDestroyed", function(a) {
                    if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                        for (var b; b = CKEDITOR.dialog._.currentTop;) b.hide();
                        for (var c in v) v[c].remove();
                        v = {}
                    }
                    var a = a.editor._.storedDialogs,
                        d;
                    for (d in a) a[d].destroy()
                })
            })();
            CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                openDialog: function(a, b) {
                    function c(d) {
                        var g = CKEDITOR.dialog._.dialogDefinitions[a];
                        if (!(e && typeof d == "undefined")) {
                            typeof g != "function" && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                            f.openDialog(a,
                                b)
                        }
                    }
                    var d = CKEDITOR.dialog._.dialogDefinitions[a];
                    CKEDITOR.dialog._.currentTop === null && q(this);
                    if (typeof d == "function") {
                        d = this._.storedDialogs || (this._.storedDialogs = {});
                        d = d[a] || (d[a] = new CKEDITOR.dialog(this, a));
                        b && b.call(d, d);
                        d.show();
                        return d
                    }
                    if (d == "failed") {
                        l(this);
                        throw Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
                    }
                    var f = this;
                    if (typeof d == "string") {
                        var e = 1;
                        CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), c, null, 0, 1)
                    }
                    CKEDITOR.skin.loadPart("dialog");
                    return null
                }
            })
        })();
        CKEDITOR.plugins.add("dialog", {
            requires: "dialogui",
            init: function(a) {
                a.on("contentDom", function() {
                    var b = a.editable();
                    b.attachListener(b, "dblclick", function(b) {
                        if (a.readOnly) return false;
                        b = {
                            element: b.data.getTarget()
                        };
                        a.fire("doubleclick", b);
                        b.dialog && a.openDialog(b.dialog);
                        return 1
                    })
                })
            }
        });
        (function() {
            CKEDITOR.plugins.add("a11yhelp", {
                requires: "dialog",
                availableLangs: {
                    en: 1,
                    cs: 1,
                    cy: 1,
                    da: 1,
                    de: 1,
                    el: 1,
                    eo: 1,
                    fa: 1,
                    fi: 1,
                    fr: 1,
                    gu: 1,
                    he: 1,
                    it: 1,
                    mk: 1,
                    nb: 1,
                    nl: 1,
                    no: 1,
                    "pt-br": 1,
                    ro: 1,
                    tr: 1,
                    ug: 1,
                    vi: 1,
                    "zh-cn": 1
                },
                init: function(a) {
                    var b =
                        this;
                    a.addCommand("a11yHelp", {
                        exec: function() {
                            var c = a.langCode,
                                c = b.availableLangs[c] ? c : "en";
                            CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(b.path + "dialogs/lang/" + c + ".js"), function() {
                                a.lang.a11yhelp = b.langEntries[c];
                                a.openDialog("a11yHelp")
                            })
                        },
                        modes: {
                            wysiwyg: 1,
                            source: 1
                        },
                        readOnly: 1,
                        canUndo: false
                    });
                    a.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
                    CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js")
                }
            })
        })();
        CKEDITOR.plugins.add("about", {
            requires: "dialog",
            init: function(a) {
                var b = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
                b.modes = {
                    wysiwyg: 1,
                    source: 1
                };
                b.canUndo = false;
                b.readOnly = 1;
                a.ui.addButton && a.ui.addButton("About", {
                    label: a.lang.about.title,
                    command: "about",
                    toolbar: "about"
                });
                CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
            }
        });
        CKEDITOR.plugins.add("basicstyles", {
            init: function(a) {
                var b = 0,
                    c = function(c, d, e, g) {
                        g = new CKEDITOR.style(g);
                        a.attachStyleStateChange(g, function(b) {
                            !a.readOnly && a.getCommand(e).setState(b)
                        });
                        a.addCommand(e, new CKEDITOR.styleCommand(g));
                        a.ui.addButton && a.ui.addButton(c, {
                            label: d,
                            command: e,
                            toolbar: "basicstyles," + (b = b + 10)
                        })
                    },
                    h = a.config,
                    d = a.lang.basicstyles;
                c("Bold", d.bold, "bold", h.coreStyles_bold);
                c("Italic", d.italic, "italic", h.coreStyles_italic);
                c("Underline", d.underline, "underline", h.coreStyles_underline);
                c("Strike", d.strike, "strike", h.coreStyles_strike);
                c("Subscript", d.subscript, "subscript", h.coreStyles_subscript);
                c("Superscript", d.superscript, "superscript", h.coreStyles_superscript);
                a.setKeystroke([
                    [CKEDITOR.CTRL + 66, "bold"],
                    [CKEDITOR.CTRL + 73, "italic"],
                    [CKEDITOR.CTRL + 85, "underline"]
                ])
            }
        });
        CKEDITOR.config.coreStyles_bold = {
            element: "strong",
            overrides: "b"
        };
        CKEDITOR.config.coreStyles_italic = {
            element: "em",
            overrides: "i"
        };
        CKEDITOR.config.coreStyles_underline = {
            element: "u"
        };
        CKEDITOR.config.coreStyles_strike = {
            element: "strike"
        };
        CKEDITOR.config.coreStyles_subscript = {
            element: "sub"
        };
        CKEDITOR.config.coreStyles_superscript = {
            element: "sup"
        };
        (function() {
            function a(a, b, c, d) {
                if (!a.isReadOnly() && !a.equals(c.editable())) {
                    CKEDITOR.dom.element.setMarker(d, a, "bidi_processed", 1);
                    for (var d = a, f = c.editable();
                        (d =
                            d.getParent()) && !d.equals(f);)
                        if (d.getCustomData("bidi_processed")) {
                            a.removeStyle("direction");
                            a.removeAttribute("dir");
                            return
                        }
                    d = "useComputedState" in c.config ? c.config.useComputedState : 1;
                    if ((d ? a.getComputedStyle("direction") : a.getStyle("direction") || a.hasAttribute("dir")) != b) {
                        a.removeStyle("direction");
                        if (d) {
                            a.removeAttribute("dir");
                            b != a.getComputedStyle("direction") && a.setAttribute("dir", b)
                        } else a.setAttribute("dir", b);
                        c.forceNextSelectionCheck()
                    }
                }
            }

            function b(a, b, c) {
                var d = a.getCommonAncestor(false,
                        true),
                    a = a.clone();
                a.enlarge(c == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                if (a.checkBoundaryOfElement(d, CKEDITOR.START) && a.checkBoundaryOfElement(d, CKEDITOR.END)) {
                    for (var f; d && d.type == CKEDITOR.NODE_ELEMENT && (f = d.getParent()) && f.getChildCount() == 1 && !(d.getName() in b);) d = f;
                    return d.type == CKEDITOR.NODE_ELEMENT && d.getName() in b && d
                }
            }

            function c(c) {
                return {
                    context: "p",
                    refresh: function(a, b) {
                        var c = a.config.useComputedState,
                            d, c = c === void 0 || c;
                        if (!c) {
                            d = b.lastElement;
                            for (var e = a.editable(); d && !(d.getName() in f || d.equals(e));) {
                                var g = d.getParent();
                                if (!g) break;
                                d = g
                            }
                        }
                        d = d || b.block || b.blockLimit;
                        if (d.equals(a.editable()))(e = a.getSelection().getRanges()[0].getEnclosedNode()) && e.type == CKEDITOR.NODE_ELEMENT && (d = e);
                        if (d) {
                            c = c ? d.getComputedStyle("direction") : d.getStyle("direction") || d.getAttribute("dir");
                            a.getCommand("bidirtl").setState(c == "rtl" ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
                            a.getCommand("bidiltr").setState(c == "ltr" ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                        }
                        c =
                            b.block || b.blockLimit;
                        a.fire("contentDirChanged", c ? c.getComputedStyle("direction") : a.lang.dir)
                    },
                    exec: function(f) {
                        var e = f.getSelection(),
                            g = f.config.enterMode,
                            h = e.getRanges();
                        if (h && h.length) {
                            for (var j = {}, p = e.createBookmarks(), h = h.createIterator(), s, r = 0; s = h.getNextRange(1);) {
                                var t = s.getEnclosedNode();
                                if (!t || t && !(t.type == CKEDITOR.NODE_ELEMENT && t.getName() in i)) t = b(s, d, g);
                                t && a(t, c, f, j);
                                var u = new CKEDITOR.dom.walker(s),
                                    v = p[r].startNode,
                                    w = p[r++].endNode;
                                u.evaluator = function(a) {
                                    return !!(a.type == CKEDITOR.NODE_ELEMENT &&
                                        a.getName() in d && !(a.getName() == (g == CKEDITOR.ENTER_P ? "p" : "div") && a.getParent().type == CKEDITOR.NODE_ELEMENT && a.getParent().getName() == "blockquote") && a.getPosition(v) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(w) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING)
                                };
                                for (; t = u.next();) a(t, c, f, j);
                                s = s.createIterator();
                                for (s.enlargeBr = g != CKEDITOR.ENTER_BR; t = s.getNextParagraph(g == CKEDITOR.ENTER_P ? "p" : "div");) a(t, c, f, j)
                            }
                            CKEDITOR.dom.element.clearAllMarkers(j);
                            f.forceNextSelectionCheck();
                            e.selectBookmarks(p);
                            f.focus()
                        }
                    }
                }
            }

            function h(a) {
                var b = a == e.setAttribute,
                    c = a == e.removeAttribute,
                    d = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
                return function(f, e) {
                    if (!this.getDocument().equals(CKEDITOR.document)) {
                        var g;
                        if (g = f == (b || c ? "dir" : "direction") || f == "style" && (c || d.test(e))) {
                            a: {
                                g = this;
                                for (var h = g.getDocument().getBody().getParent(); g;) {
                                    if (g.equals(h)) {
                                        g = false;
                                        break a
                                    }
                                    g = g.getParent()
                                }
                                g = true
                            }
                            g = !g
                        }
                        if (g) {
                            g = this.getDirection(1);
                            h = a.apply(this, arguments);
                            if (g != this.getDirection(1)) {
                                this.getDocument().fire("dirChanged",
                                    this);
                                return h
                            }
                        }
                    }
                    return a.apply(this, arguments)
                }
            }
            var d = {
                    table: 1,
                    ul: 1,
                    ol: 1,
                    blockquote: 1,
                    div: 1
                },
                i = {},
                f = {};
            CKEDITOR.tools.extend(i, d, {
                tr: 1,
                p: 1,
                div: 1,
                li: 1
            });
            CKEDITOR.tools.extend(f, i, {
                td: 1
            });
            CKEDITOR.plugins.add("bidi", {
                init: function(a) {
                    if (!a.blockless) {
                        var b = function(b, c, d, f, e) {
                                a.addCommand(d, new CKEDITOR.command(a, f));
                                if (a.ui.addButton) {
                                    a.ui.addToolbarGroup("bidi", "align", "paragraph");
                                    a.ui.addButton(b, {
                                        label: c,
                                        command: d,
                                        toolbar: "bidi," + e
                                    })
                                }
                            },
                            d = a.lang.bidi;
                        b("BidiLtr", d.ltr, "bidiltr", c("ltr"), 10);
                        b("BidiRtl",
                            d.rtl, "bidirtl", c("rtl"), 20);
                        a.on("contentDom", function() {
                            a.document.on("dirChanged", function(b) {
                                a.fire("dirChanged", {
                                    node: b.data,
                                    dir: b.data.getDirection(1)
                                })
                            })
                        })
                    }
                }
            });
            for (var e = CKEDITOR.dom.element.prototype, g = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"], j = 0; j < g.length; j++) e[g[j]] = CKEDITOR.tools.override(e[g[j]], h)
        })();
        (function() {
            var a = {
                exec: function(a) {
                    var c = a.getCommand("blockquote").state,
                        h = a.getSelection(),
                        d = h && h.getRanges(true)[0];
                    if (d) {
                        var i = h.createBookmarks();
                        if (CKEDITOR.env.ie) {
                            var f =
                                i[0].startNode,
                                e = i[0].endNode,
                                g;
                            if (f && f.getParent().getName() == "blockquote")
                                for (g = f; g = g.getNext();)
                                    if (g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) {
                                        f.move(g, true);
                                        break
                                    }
                            if (e && e.getParent().getName() == "blockquote")
                                for (g = e; g = g.getPrevious();)
                                    if (g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) {
                                        e.move(g);
                                        break
                                    }
                        }
                        var j = d.createIterator();
                        j.enlargeBr = a.config.enterMode != CKEDITOR.ENTER_BR;
                        if (c == CKEDITOR.TRISTATE_OFF) {
                            for (f = []; c = j.getNextParagraph();) f.push(c);
                            if (f.length < 1) {
                                c = a.document.createElement(a.config.enterMode ==
                                    CKEDITOR.ENTER_P ? "p" : "div");
                                e = i.shift();
                                d.insertNode(c);
                                c.append(new CKEDITOR.dom.text("?", a.document));
                                d.moveToBookmark(e);
                                d.selectNodeContents(c);
                                d.collapse(true);
                                e = d.createBookmark();
                                f.push(c);
                                i.unshift(e)
                            }
                            g = f[0].getParent();
                            d = [];
                            for (e = 0; e < f.length; e++) {
                                c = f[e];
                                g = g.getCommonAncestor(c.getParent())
                            }
                            for (c = {
                                    table: 1,
                                    tbody: 1,
                                    tr: 1,
                                    ol: 1,
                                    ul: 1
                                }; c[g.getName()];) g = g.getParent();
                            for (e = null; f.length > 0;) {
                                for (c = f.shift(); !c.getParent().equals(g);) c = c.getParent();
                                c.equals(e) || d.push(c);
                                e = c
                            }
                            for (; d.length > 0;) {
                                c =
                                    d.shift();
                                if (c.getName() == "blockquote") {
                                    for (e = new CKEDITOR.dom.documentFragment(a.document); c.getFirst();) {
                                        e.append(c.getFirst().remove());
                                        f.push(e.getLast())
                                    }
                                    e.replace(c)
                                } else f.push(c)
                            }
                            d = a.document.createElement("blockquote");
                            for (d.insertBefore(f[0]); f.length > 0;) {
                                c = f.shift();
                                d.append(c)
                            }
                        } else if (c == CKEDITOR.TRISTATE_ON) {
                            e = [];
                            for (g = {}; c = j.getNextParagraph();) {
                                for (f = d = null; c.getParent();) {
                                    if (c.getParent().getName() == "blockquote") {
                                        d = c.getParent();
                                        f = c;
                                        break
                                    }
                                    c = c.getParent()
                                }
                                if (d && f && !f.getCustomData("blockquote_moveout")) {
                                    e.push(f);
                                    CKEDITOR.dom.element.setMarker(g, f, "blockquote_moveout", true)
                                }
                            }
                            CKEDITOR.dom.element.clearAllMarkers(g);
                            c = [];
                            f = [];
                            for (g = {}; e.length > 0;) {
                                j = e.shift();
                                d = j.getParent();
                                if (j.getPrevious())
                                    if (j.getNext()) {
                                        j.breakParent(j.getParent());
                                        f.push(j.getNext())
                                    } else j.remove().insertAfter(d);
                                else j.remove().insertBefore(d);
                                if (!d.getCustomData("blockquote_processed")) {
                                    f.push(d);
                                    CKEDITOR.dom.element.setMarker(g, d, "blockquote_processed", true)
                                }
                                c.push(j)
                            }
                            CKEDITOR.dom.element.clearAllMarkers(g);
                            for (e = f.length - 1; e >= 0; e--) {
                                d =
                                    f[e];
                                a: {
                                    g = d;
                                    for (var j = 0, k = g.getChildCount(), q = void 0; j < k && (q = g.getChild(j)); j++)
                                        if (q.type == CKEDITOR.NODE_ELEMENT && q.isBlockBoundary()) {
                                            g = false;
                                            break a
                                        }
                                    g = true
                                }
                                g && d.remove()
                            }
                            if (a.config.enterMode == CKEDITOR.ENTER_BR)
                                for (d = true; c.length;) {
                                    j = c.shift();
                                    if (j.getName() == "div") {
                                        e = new CKEDITOR.dom.documentFragment(a.document);
                                        d && (j.getPrevious() && !(j.getPrevious().type == CKEDITOR.NODE_ELEMENT && j.getPrevious().isBlockBoundary())) && e.append(a.document.createElement("br"));
                                        for (d = j.getNext() && !(j.getNext().type ==
                                                CKEDITOR.NODE_ELEMENT && j.getNext().isBlockBoundary()); j.getFirst();) j.getFirst().remove().appendTo(e);
                                        d && e.append(a.document.createElement("br"));
                                        e.replace(j);
                                        d = false
                                    }
                                }
                        }
                        h.selectBookmarks(i);
                        a.focus()
                    }
                },
                refresh: function(a, c) {
                    this.setState(a.elementPath(c.block || c.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                },
                context: "blockquote"
            };
            CKEDITOR.plugins.add("blockquote", {
                init: function(b) {
                    if (!b.blockless) {
                        b.addCommand("blockquote", a);
                        b.ui.addButton && b.ui.addButton("Blockquote", {
                            label: b.lang.blockquote.toolbar,
                            command: "blockquote",
                            toolbar: "blocks,10"
                        })
                    }
                }
            })
        })();
        "use strict";
        (function() {
            function a(a) {
                function b() {
                    var c = a.editable();
                    c.on(x, function(a) {
                        (!CKEDITOR.env.ie || !u) && s(a)
                    });
                    CKEDITOR.env.ie && c.on("paste", function(b) {
                        if (!v) {
                            h();
                            b.data.preventDefault();
                            s(b);
                            l("paste") || a.openDialog("paste")
                        }
                    });
                    if (CKEDITOR.env.ie) {
                        c.on("contextmenu", i, null, null, 0);
                        c.on("beforepaste", function(a) {
                            a.data && !a.data.$.ctrlKey && i()
                        }, null, null, 0)
                    }
                    c.on("beforecut", function() {
                        !u && o(a)
                    });
                    c.on("mouseup",
                        function() {
                            setTimeout(function() {
                                r()
                            }, 0)
                        });
                    c.on("keyup", r)
                }

                function c(b) {
                    return {
                        type: b,
                        canUndo: b == "cut",
                        startDisabled: true,
                        exec: function() {
                            this.type == "cut" && o();
                            var b;
                            var c = this.type;
                            if (CKEDITOR.env.ie) b = l(c);
                            else try {
                                b = a.document.$.execCommand(c, false, null)
                            } catch (d) {
                                b = false
                            }
                            b || alert(a.lang.clipboard[this.type + "Error"]);
                            return b
                        }
                    }
                }

                function d() {
                    return {
                        canUndo: false,
                        async: true,
                        exec: function(a, b) {
                            var c = function(b, c) {
                                    b && n(b.type, b.dataValue, !!c);
                                    a.fire("afterCommandExec", {
                                        name: "paste",
                                        command: d,
                                        returnValue: !!b
                                    })
                                },
                                d = this;
                            typeof b == "string" ? c({
                                type: "auto",
                                dataValue: b
                            }, 1) : a.getClipboardData(c)
                        }
                    }
                }

                function h() {
                    v = 1;
                    setTimeout(function() {
                        v = 0
                    }, 100)
                }

                function i() {
                    u = 1;
                    setTimeout(function() {
                        u = 0
                    }, 10)
                }

                function l(b) {
                    var c = a.document,
                        d = c.getBody(),
                        e = false,
                        g = function() {
                            e = true
                        };
                    d.on(b, g);
                    (CKEDITOR.env.version > 7 ? c.$ : c.$.selection.createRange()).execCommand(b);
                    d.removeListener(b, g);
                    return e
                }

                function n(b, c, d) {
                    b = {
                        type: b
                    };
                    if (d && !a.fire("beforePaste", b) || !c) return false;
                    b.dataValue = c;
                    return a.fire("paste", b)
                }

                function o() {
                    if (CKEDITOR.env.ie &&
                        !CKEDITOR.env.quirks) {
                        var b = a.getSelection(),
                            c, d, e;
                        if (b.getType() == CKEDITOR.SELECTION_ELEMENT && (c = b.getSelectedElement())) {
                            d = b.getRanges()[0];
                            e = a.document.createText("");
                            e.insertBefore(c);
                            d.setStartBefore(e);
                            d.setEndAfter(c);
                            b.selectRanges([d]);
                            setTimeout(function() {
                                if (c.getParent()) {
                                    e.remove();
                                    b.selectElement(c)
                                }
                            }, 0)
                        }
                    }
                }

                function m(b, c) {
                    var d = a.document,
                        e = a.editable(),
                        g = function(a) {
                            a.cancel()
                        },
                        h = CKEDITOR.env.gecko && CKEDITOR.env.version <= 10902;
                    if (!d.getById("cke_pastebin")) {
                        var j = a.getSelection(),
                            i =
                            j.createBookmarks(),
                            k = new CKEDITOR.dom.element(e.is("body") && !CKEDITOR.env.ie && !CKEDITOR.env.opera ? "body" : "div", d);
                        k.setAttribute("id", "cke_pastebin");
                        var p = 0,
                            d = d.getWindow();
                        if (h) {
                            k.insertAfter(i[0].startNode);
                            k.setStyle("display", "inline")
                        } else {
                            if (CKEDITOR.env.webkit) {
                                e.append(k);
                                p = (e.is("body") ? e : CKEDITOR.dom.element.get(k.$.offsetParent)).getDocumentPosition().y
                            } else e.getAscendant(CKEDITOR.env.ie || CKEDITOR.env.opera ? "body" : "html", 1).append(k);
                            k.setStyles({
                                position: "absolute",
                                top: d.getScrollPosition().y -
                                    p + 10 + "px",
                                width: "1px",
                                height: Math.max(1, d.getViewPaneSize().height - 20) + "px",
                                overflow: "hidden",
                                margin: 0,
                                padding: 0
                            })
                        }
                        if (h = k.getParent().isReadOnly()) {
                            k.setOpacity(0);
                            k.setAttribute("contenteditable", true)
                        } else k.setStyle(a.config.contentsLangDirection == "ltr" ? "left" : "right", "-1000px");
                        a.on("selectionChange", g, null, null, 0);
                        h && k.focus();
                        h = new CKEDITOR.dom.range(k);
                        h.setStartAt(k, CKEDITOR.POSITION_AFTER_START);
                        h.setEndAt(k, CKEDITOR.POSITION_BEFORE_END);
                        h.select();
                        setTimeout(function() {
                            a.unlockSelection();
                            CKEDITOR.env.ie && e.focus();
                            var b;
                            k = CKEDITOR.env.webkit && (b = k.getFirst()) && b.is && b.hasClass("Apple-style-span") ? b : k;
                            j.selectBookmarks(i);
                            a.removeListener("selectionChange", g);
                            k.remove();
                            c(k.getHtml())
                        }, 0)
                    }
                }

                function p(b) {
                    if (a.mode == "wysiwyg") switch (b.data.keyCode) {
                        case CKEDITOR.CTRL + 86:
                        case CKEDITOR.SHIFT + 45:
                            b = a.editable();
                            h();
                            !CKEDITOR.env.ie && b.fire("beforepaste");
                            (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) && b.fire("paste");
                            break;
                        case CKEDITOR.CTRL + 88:
                        case CKEDITOR.SHIFT +
                        46:
                            a.fire("saveSnapshot");
                            setTimeout(function() {
                                a.fire("saveSnapshot")
                            }, 0)
                    }
                }

                function s(b) {
                    var c = {
                            type: "auto"
                        },
                        d = a.fire("beforePaste", c);
                    m(b, function(a) {
                        a = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
                        d && n(c.type, a, 0, 1)
                    })
                }

                function r() {
                    if (a.mode == "wysiwyg") {
                        var b = t("Paste");
                        a.getCommand("cut").setState(t("Cut"));
                        a.getCommand("copy").setState(t("Copy"));
                        a.getCommand("paste").setState(b);
                        a.fire("pasteState", b)
                    }
                }

                function t(b) {
                    var c;
                    if (w && b in {
                            Paste: 1,
                            Cut: 1
                        }) return CKEDITOR.TRISTATE_DISABLED;
                    if (b == "Paste") {
                        CKEDITOR.env.ie && (u = 1);
                        try {
                            c = a.document.$.queryCommandEnabled(b) || CKEDITOR.env.webkit
                        } catch (d) {}
                        u = 0
                    } else {
                        b = a.getSelection();
                        c = b.getRanges();
                        c = b.type != CKEDITOR.SELECTION_NONE && !(c.length == 1 && c[0].collapsed)
                    }
                    return c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                }
                var u = 0,
                    v = 0,
                    w = 0,
                    x = CKEDITOR.env.ie ? "beforepaste" : "paste";
                (function() {
                    a.on("key", p);
                    a.on("contentDom", b);
                    a.on("selectionChange", function(a) {
                        w = a.data.selection.getRanges()[0].checkReadOnly();
                        r()
                    });
                    a.contextMenu && a.contextMenu.addListener(function(a,
                        b) {
                        w = b.getRanges()[0].checkReadOnly();
                        return {
                            cut: t("Cut"),
                            copy: t("Copy"),
                            paste: t("Paste")
                        }
                    })
                })();
                (function() {
                    function b(c, d, e, g, h) {
                        var j = a.lang.clipboard[d];
                        a.addCommand(d, e);
                        a.ui.addButton && a.ui.addButton(c, {
                            label: j,
                            command: d,
                            toolbar: "clipboard," + g
                        });
                        a.addMenuItems && a.addMenuItem(d, {
                            label: j,
                            command: d,
                            group: "clipboard",
                            order: h
                        })
                    }
                    b("Cut", "cut", c("cut"), 10, 1);
                    b("Copy", "copy", c("copy"), 20, 4);
                    b("Paste", "paste", d(), 30, 8)
                })();
                a.getClipboardData = function(b, c) {
                    function d(a) {
                        a.removeListener();
                        a.cancel();
                        c(a.data)
                    }

                    function e(a) {
                        a.removeListener();
                        a.cancel();
                        p = true;
                        c({
                            type: i,
                            dataValue: a.data
                        })
                    }

                    function g() {
                        this.customTitle = b && b.title
                    }
                    var j = false,
                        i = "auto",
                        p = false;
                    if (!c) {
                        c = b;
                        b = null
                    }
                    a.on("paste", d, null, null, 0);
                    a.on("beforePaste", function(a) {
                        a.removeListener();
                        j = true;
                        i = a.data.type
                    }, null, null, 1E3);
                    var m;
                    if (CKEDITOR.env.ie) {
                        a.focus();
                        h();
                        a.editable().fire(x) && !l("paste") && (m = false)
                    } else try {
                        if (a.editable().fire(x) && !a.document.$.execCommand("Paste", false, null)) throw 0;
                    } catch (o) {
                        m = false
                    }
                    if (m === false) {
                        a.removeListener("paste",
                            d);
                        if (j && a.fire("pasteDialog", g)) {
                            a.on("pasteDialogCommit", e);
                            a.on("dialogHide", function(a) {
                                a.removeListener();
                                a.data.removeListener("pasteDialogCommit", e);
                                setTimeout(function() {
                                    p || c(null)
                                }, 10)
                            })
                        } else c(null)
                    }
                }
            }

            function b(a) {
                if (CKEDITOR.env.webkit) {
                    if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html"
                } else if (CKEDITOR.env.ie) {
                    if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html"
                } else if (CKEDITOR.env.gecko ||
                    CKEDITOR.env.opera) {
                    if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html"
                } else return "html";
                return "htmlifiedtext"
            }

            function c(a, b) {
                function c(a) {
                    return CKEDITOR.tools.repeat("</p><p>", ~~(a / 2)) + (a % 2 == 1 ? "<br>" : "")
                }
                b = b.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>");
                b = b.replace(/<\/?[A-Z]+>/g, function(a) {
                    return a.toLowerCase()
                });
                if (b.match(/^[^<]$/)) return b;
                if (CKEDITOR.env.webkit && b.indexOf("<div>") > -1) {
                    b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g,
                        "<div></div>");
                    b.match(/<div>(<br>|)<\/div>/) && (b = "<p>" + b.replace(/(<div>(<br>|)<\/div>)+/g, function(a) {
                        return c(a.split("</div><div>").length + 1)
                    }) + "</p>");
                    b = b.replace(/<\/div><div>/g, "<br>");
                    b = b.replace(/<\/?div>/g, "")
                }
                if ((CKEDITOR.env.gecko || CKEDITOR.env.opera) && a.enterMode != CKEDITOR.ENTER_BR) {
                    CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "<br>"));
                    b.indexOf("<br><br>") > -1 && (b = "<p>" + b.replace(/(<br>){2,}/g, function(a) {
                        return c(a.length / 4)
                    }) + "</p>")
                }
                return i(a, b)
            }

            function h() {
                var a = new CKEDITOR.htmlParser.filter,
                    b = {
                        blockquote: 1,
                        dl: 1,
                        fieldset: 1,
                        h1: 1,
                        h2: 1,
                        h3: 1,
                        h4: 1,
                        h5: 1,
                        h6: 1,
                        ol: 1,
                        p: 1,
                        table: 1,
                        ul: 1
                    },
                    c = CKEDITOR.tools.extend({
                        br: 0
                    }, CKEDITOR.dtd.$inline),
                    d = {
                        p: 1,
                        br: 1,
                        "cke:br": 1
                    },
                    h = CKEDITOR.dtd,
                    i = CKEDITOR.tools.extend({
                        area: 1,
                        basefont: 1,
                        embed: 1,
                        iframe: 1,
                        map: 1,
                        object: 1,
                        param: 1
                    }, CKEDITOR.dtd.$nonBodyContent, CKEDITOR.dtd.$cdata),
                    l = function(a) {
                        delete a.name;
                        a.add(new CKEDITOR.htmlParser.text(" "))
                    },
                    n = function(a) {
                        for (var b = a, c;
                            (b = b.next) && b.name && b.name.match(/^h\d$/);) {
                            c = new CKEDITOR.htmlParser.element("cke:br");
                            c.isEmpty =
                                true;
                            for (a.add(c); c = b.children.shift();) a.add(c)
                        }
                    };
                a.addRules({
                    elements: {
                        h1: n,
                        h2: n,
                        h3: n,
                        h4: n,
                        h5: n,
                        h6: n,
                        img: function(a) {
                            var a = CKEDITOR.tools.trim(a.attributes.alt || ""),
                                b = " ";
                            a && !a.match(/(^http|\.(jpe?g|gif|png))/i) && (b = " [" + a + "] ");
                            return new CKEDITOR.htmlParser.text(b)
                        },
                        td: l,
                        th: l,
                        $: function(a) {
                            var f = a.name,
                                p;
                            if (i[f]) return false;
                            delete a.attributes;
                            if (f == "br") return a;
                            if (b[f]) a.name = "p";
                            else if (c[f]) delete a.name;
                            else if (h[f]) {
                                p = new CKEDITOR.htmlParser.element("cke:br");
                                p.isEmpty = true;
                                if (CKEDITOR.dtd.$empty[f]) return p;
                                a.add(p, 0);
                                p = p.clone();
                                p.isEmpty = true;
                                a.add(p);
                                delete a.name
                            }
                            d[a.name] || delete a.name;
                            return a
                        }
                    }
                });
                return a
            }

            function d(a, b, c) {
                var b = new CKEDITOR.htmlParser.fragment.fromHtml(b),
                    d = new CKEDITOR.htmlParser.basicWriter;
                b.writeHtml(d, c);
                var b = d.getHtml(),
                    b = b.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g, "$1").replace(/(<cke:br \/>){2,}/g, "<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g, "$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g, "$1").replace(/<(cke:)?br( \/)?>/g, "<br>").replace(/<p><\/p>/g, ""),
                    h = 0,
                    b =
                    b.replace(/<\/?p>/g, function(a) {
                        if (a == "<p>") {
                            if (++h > 1) return "</p><p>"
                        } else if (--h > 0) return "</p><p>";
                        return a
                    }).replace(/<p><\/p>/g, "");
                return i(a, b)
            }

            function i(a, b) {
                a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function(a) {
                    return CKEDITOR.tools.repeat("<br>", a.length / 7 * 2)
                }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "<$1div>"));
                return b
            }
            CKEDITOR.plugins.add("clipboard", {
                requires: "dialog",
                init: function(f) {
                    var e;
                    a(f);
                    CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path +
                        "dialogs/paste.js"));
                    f.on("paste", function(a) {
                        var b = a.data.dataValue,
                            c = CKEDITOR.dtd.$block;
                        if (b.indexOf("Apple-") > -1) {
                            b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " ");
                            a.data.type != "html" && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) {
                                return b.replace(/\t/g, "&nbsp;&nbsp; &nbsp;")
                            }));
                            if (b.indexOf('<br class="Apple-interchange-newline">') > -1) {
                                a.data.startsWithEOL = 1;
                                a.data.preSniffing = "html";
                                b = b.replace(/<br class="Apple-interchange-newline">/,
                                    "")
                            }
                            b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")
                        }
                        CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, d) {
                            if (d.toLowerCase() in c) {
                                a.data.preSniffing = "html";
                                return "<" + d
                            }
                            return b
                        }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, d) {
                            if (d in c) {
                                a.data.endsWithEOL = 1;
                                return "</" + d + ">"
                            }
                            return b
                        }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
                        a.data.dataValue = b
                    }, null, null, 3);
                    f.on("paste", function(a) {
                        var a = a.data,
                            j = a.type,
                            i = a.dataValue,
                            q, l = f.config.clipboard_defaultContentType ||
                            "html";
                        q = j == "html" || a.preSniffing == "html" ? "html" : b(i);
                        q == "htmlifiedtext" ? i = c(f.config, i) : j == "text" && q == "html" && (i = d(f.config, i, e || (e = h(f))));
                        a.startsWithEOL && (i = '<br data-cke-eol="1">' + i);
                        a.endsWithEOL && (i = i + '<br data-cke-eol="1">');
                        j == "auto" && (j = q == "html" || l == "html" ? "html" : "text");
                        a.type = j;
                        a.dataValue = i;
                        delete a.preSniffing;
                        delete a.startsWithEOL;
                        delete a.endsWithEOL
                    }, null, null, 6);
                    f.on("paste", function(a) {
                            a = a.data;
                            f.insertHtml(a.dataValue, a.type);
                            setTimeout(function() {
                                f.fire("afterPaste")
                            }, 0)
                        }, null,
                        null, 1E3);
                    f.on("pasteDialog", function(a) {
                        setTimeout(function() {
                            f.openDialog("paste", a.data)
                        }, 0)
                    })
                }
            })
        })();
        (function() {
            var a = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state}"' + (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" : '" href="javascript:void(\'{titleJs}\')"') + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}"';
            if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) a = a + ' onkeypress="return false;"';
            CKEDITOR.env.gecko && (a = a + ' onblur="this.style.cssText = this.style.cssText;"');
            var a = a + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{name}_icon" style="{style}"'),
                a = a + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label">{label}</span>{arrowHtml}</a>',
                b = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "&nbsp;") + "</span>"),
                c = CKEDITOR.addTemplate("button", a);
            CKEDITOR.plugins.add("button", {
                beforeInit: function(a) {
                    a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
                }
            });
            CKEDITOR.UI_BUTTON = "button";
            CKEDITOR.ui.button = function(a) {
                CKEDITOR.tools.extend(this, a, {
                    title: a.label,
                    click: a.click || function(b) {
                        b.execCommand(a.command)
                    }
                });
                this._ = {}
            };
            CKEDITOR.ui.button.handler = {
                create: function(a) {
                    return new CKEDITOR.ui.button(a)
                }
            };
            CKEDITOR.ui.button.prototype = {
                render: function(a, d) {
                    var i = CKEDITOR.env,
                        f = this._.id = CKEDITOR.tools.getNextId(),
                        e = "",
                        g = this.command,
                        j;
                    this._.editor = a;
                    var k = {
                            id: f,
                            button: this,
                            editor: a,
                            focus: function() {
                                CKEDITOR.document.getById(f).focus()
                            },
                            execute: function() {
                                CKEDITOR.env.ie && CKEDITOR.env.version < 7 ? CKEDITOR.tools.setTimeout(function() {
                                    this.button.click(a)
                                }, 0, this) : this.button.click(a)
                            },
                            attach: function(a) {
                                this.button.attach(a)
                            }
                        },
                        q = CKEDITOR.tools.addFunction(function(a) {
                            if (k.onkey) {
                                a = new CKEDITOR.dom.event(a);
                                return k.onkey(k, a.getKeystroke()) !== false
                            }
                        }),
                        l = CKEDITOR.tools.addFunction(function(a) {
                            var b;
                            k.onfocus && (b = k.onfocus(k, new CKEDITOR.dom.event(a)) !== false);
                            CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.preventBubble();
                            return b
                        });
                    k.clickFn = j = CKEDITOR.tools.addFunction(k.execute, k);
                    if (this.modes) {
                        var n = {},
                            o = function() {
                                var b = a.mode;
                                if (b) {
                                    b = this.modes[b] ? n[b] != void 0 ? n[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                                    this.setState(a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b)
                                }
                            };
                        a.on("beforeModeUnload",
                            function() {
                                if (a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED) n[a.mode] = this._.state
                            }, this);
                        a.on("mode", o, this);
                        !this.readOnly && a.on("readOnly", o, this)
                    } else if (g)
                        if (g = a.getCommand(g)) {
                            g.on("state", function() {
                                this.setState(g.state)
                            }, this);
                            e = e + (g.state == CKEDITOR.TRISTATE_ON ? "on" : g.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off")
                        }
                    g || (e = e + "off");
                    o = this.name || this.command;
                    i = {
                        id: f,
                        name: o,
                        label: this.label,
                        state: e,
                        title: this.title,
                        titleJs: i.gecko && i.version >= 10900 && !i.hc ? "" : (this.title || "").replace("'",
                            ""),
                        hasArrow: this.hasArrow ? "true" : "false",
                        keydownFn: q,
                        focusFn: l,
                        clickFn: j,
                        style: CKEDITOR.skin.getIconStyle(o, a.lang.dir == "rtl", this.icon, this.iconOffset),
                        arrowHtml: this.hasArrow ? b.output() : ""
                    };
                    c.output(i, d);
                    if (this.onRender) this.onRender();
                    return k
                },
                setState: function(a) {
                    if (this._.state == a) return false;
                    this._.state = a;
                    var b = CKEDITOR.document.getById(this._.id);
                    if (b) {
                        b.setState(a, "cke_button");
                        return true
                    }
                    return false
                }
            };
            CKEDITOR.ui.prototype.addButton = function(a, b) {
                this.add(a, CKEDITOR.UI_BUTTON, b)
            }
        })();
        CKEDITOR.plugins.add("panelbutton", {
            requires: "button",
            onLoad: function() {
                function a(a) {
                    var c = this._;
                    if (c.state != CKEDITOR.TRISTATE_DISABLED) {
                        this.createPanel(a);
                        c.on ? c.panel.hide() : c.panel.showBlock(this._.id, this.document.getById(this._.id), 4)
                    }
                }
                CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.button,
                    $: function(b) {
                        var c = b.panel;
                        delete b.panel;
                        this.base(b);
                        this.document = c && c.parent && c.parent.getDocument() || CKEDITOR.document;
                        c.block = {
                            attributes: c.attributes
                        };
                        this.hasArrow = true;
                        this.click =
                            a;
                        this._ = {
                            panelDefinition: c
                        }
                    },
                    statics: {
                        handler: {
                            create: function(a) {
                                return new CKEDITOR.ui.panelButton(a)
                            }
                        }
                    },
                    proto: {
                        createPanel: function(a) {
                            var c = this._;
                            if (!c.panel) {
                                var h = this._.panelDefinition || {},
                                    d = this._.panelDefinition.block,
                                    i = h.parent || CKEDITOR.document.getBody(),
                                    f = this._.panel = new CKEDITOR.ui.floatPanel(a, i, h),
                                    h = f.addBlock(c.id, d),
                                    e = this;
                                f.onShow = function() {
                                    e.className && this.element.addClass(e.className + "_panel");
                                    e.setState(CKEDITOR.TRISTATE_ON);
                                    c.on = 1;
                                    e.editorFocus && a.focus();
                                    if (e.onOpen) e.onOpen()
                                };
                                f.onHide = function(d) {
                                    e.className && this.element.getFirst().removeClass(e.className + "_panel");
                                    e.setState(e.modes && e.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                    c.on = 0;
                                    if (!d && e.onClose) e.onClose()
                                };
                                f.onEscape = function() {
                                    f.hide(1);
                                    e.document.getById(c.id).focus()
                                };
                                if (this.onBlock) this.onBlock(f, h);
                                h.onHide = function() {
                                    c.on = 0;
                                    e.setState(CKEDITOR.TRISTATE_OFF)
                                }
                            }
                        }
                    }
                })
            },
            beforeInit: function(a) {
                a.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler)
            }
        });
        CKEDITOR.UI_PANELBUTTON =
            "panelbutton";
        (function() {
            CKEDITOR.plugins.add("panel", {
                beforeInit: function(a) {
                    a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler)
                }
            });
            CKEDITOR.UI_PANEL = "panel";
            CKEDITOR.ui.panel = function(a, b) {
                b && CKEDITOR.tools.extend(this, b);
                CKEDITOR.tools.extend(this, {
                    className: "",
                    css: []
                });
                this.id = CKEDITOR.tools.getNextId();
                this.document = a;
                this.isFramed = this.forceIFrame || this.css.length;
                this._ = {
                    blocks: {}
                }
            };
            CKEDITOR.ui.panel.handler = {
                create: function(a) {
                    return new CKEDITOR.ui.panel(a)
                }
            };
            var a = CKEDITOR.addTemplate("panel",
                    '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'),
                b = CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="application" frameborder="0" src="{src}"></iframe>'),
                c = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
            CKEDITOR.ui.panel.prototype = {
                render: function(h, d) {
                    this.getHolderElement = function() {
                        var a = this._.holder;
                        if (!a) {
                            if (this.isFramed) {
                                var a = this.document.getById(this.id + "_frame"),
                                    b = a.getParent(),
                                    a = a.getFrameDocument();
                                CKEDITOR.env.iOS && b.setStyles({
                                    overflow: "scroll",
                                    "-webkit-overflow-scrolling": "touch"
                                });
                                b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() {
                                    this.isLoaded = true;
                                    if (this.onLoad) this.onLoad()
                                }, this));
                                a.write(c.output(CKEDITOR.tools.extend({
                                    css: CKEDITOR.tools.buildStyleHtml(this.css),
                                    onload: "window.parent.CKEDITOR.tools.callFunction(" + b + ");"
                                }, i)));
                                a.getWindow().$.CKEDITOR = CKEDITOR;
                                a.on("key" + (CKEDITOR.env.opera ? "press" : "down"), function(a) {
                                    var b = a.data.getKeystroke(),
                                        c = this.document.getById(this.id).getAttribute("dir");
                                    this._.onKeyDown && this._.onKeyDown(b) === false ? a.data.preventDefault() : (b == 27 || b == (c == "rtl" ? 39 : 37)) && this.onEscape && this.onEscape(b) === false && a.data.preventDefault()
                                }, this);
                                a = a.getBody();
                                a.unselectable();
                                CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                            } else a = this.document.getById(this.id);
                            this._.holder = a
                        }
                        return a
                    };
                    var i = {
                        id: this.id,
                        langCode: h.langCode,
                        dir: h.lang.dir,
                        cls: this.className,
                        frame: "",
                        env: CKEDITOR.env.cssClass,
                        "z-index": h.config.baseFloatZIndex + 1
                    };
                    if (this.isFramed) i.frame = b.output({
                        id: this.id + "_frame",
                        src: "javascript:void(document.open()," + (CKEDITOR.env.isCustomDomain() ? "document.domain='" + document.domain + "'," : "") + 'document.close())">'
                    });
                    var f = a.output(i);
                    d && d.push(f);
                    return f
                },
                addBlock: function(a, b) {
                    b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(),
                        b);
                    this._.currentBlock || this.showBlock(a);
                    return b
                },
                getBlock: function(a) {
                    return this._.blocks[a]
                },
                showBlock: function(a) {
                    var a = this._.blocks[a],
                        b = this._.currentBlock,
                        c = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                    if (b) {
                        c.removeAttributes(b.attributes);
                        b.hide()
                    }
                    this._.currentBlock = a;
                    c.setAttributes(a.attributes);
                    CKEDITOR.fire("ariaWidget", c);
                    a._.focusIndex = -1;
                    this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
                    a.show();
                    return a
                },
                destroy: function() {
                    this.element &&
                        this.element.remove()
                }
            };
            CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
                $: function(a, b) {
                    this.element = a.append(a.getDocument().createElement("div", {
                        attributes: {
                            tabIndex: -1,
                            "class": "cke_panel_block",
                            role: "presentation"
                        },
                        styles: {
                            display: "none"
                        }
                    }));
                    b && CKEDITOR.tools.extend(this, b);
                    if (!this.attributes.title) this.attributes.title = this.attributes["aria-label"];
                    this.keys = {};
                    this._.focusIndex = -1;
                    this.element.disableContextMenu()
                },
                _: {
                    markItem: function(a) {
                        if (a != -1) {
                            a = this.element.getElementsByTag("a").getItem(this._.focusIndex =
                                a);
                            (CKEDITOR.env.webkit || CKEDITOR.env.opera) && a.getDocument().getWindow().focus();
                            a.focus();
                            this.onMark && this.onMark(a)
                        }
                    }
                },
                proto: {
                    show: function() {
                        this.element.setStyle("display", "")
                    },
                    hide: function() {
                        (!this.onHide || this.onHide.call(this) !== true) && this.element.setStyle("display", "none")
                    },
                    onKeyDown: function(a) {
                        var b = this.keys[a];
                        switch (b) {
                            case "next":
                                for (var a = this._.focusIndex, b = this.element.getElementsByTag("a"), c; c = b.getItem(++a);)
                                    if (c.getAttribute("_cke_focus") && c.$.offsetWidth) {
                                        this._.focusIndex =
                                            a;
                                        c.focus();
                                        break
                                    }
                                return false;
                            case "prev":
                                a = this._.focusIndex;
                                for (b = this.element.getElementsByTag("a"); a > 0 && (c = b.getItem(--a));)
                                    if (c.getAttribute("_cke_focus") && c.$.offsetWidth) {
                                        this._.focusIndex = a;
                                        c.focus();
                                        break
                                    }
                                return false;
                            case "click":
                            case "mouseup":
                                a = this._.focusIndex;
                                (c = a >= 0 && this.element.getElementsByTag("a").getItem(a)) && (c.$[b] ? c.$[b]() : c.$["on" + b]());
                                return false
                        }
                        return true
                    }
                }
            })
        })();
        CKEDITOR.plugins.add("floatpanel", {
            requires: "panel"
        });
        (function() {
            function a(a, h, d, i, f) {
                var f = CKEDITOR.tools.genKey(h.getUniqueId(),
                        d.getUniqueId(), a.lang.dir, a.uiColor || "", i.css || "", f || ""),
                    e = b[f];
                if (!e) {
                    e = b[f] = new CKEDITOR.ui.panel(h, i);
                    e.element = d.append(CKEDITOR.dom.element.createFromHtml(e.render(a), h));
                    e.element.setStyles({
                        display: "none",
                        position: "absolute"
                    })
                }
                return e
            }
            var b = {};
            CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
                $: function(b, h, d, i) {
                    d.forceIFrame = 1;
                    var f = h.getDocument(),
                        i = a(b, f, h, d, i || 0),
                        e = i.element,
                        g = e.getFirst();
                    e.disableContextMenu();
                    this.element = e;
                    this._ = {
                        editor: b,
                        panel: i,
                        parentElement: h,
                        definition: d,
                        document: f,
                        iframe: g,
                        children: [],
                        dir: b.lang.dir
                    };
                    b.on("mode", function() {
                        this.hide()
                    }, this)
                },
                proto: {
                    addBlock: function(a, b) {
                        return this._.panel.addBlock(a, b)
                    },
                    addListBlock: function(a, b) {
                        return this._.panel.addListBlock(a, b)
                    },
                    getBlock: function(a) {
                        return this._.panel.getBlock(a)
                    },
                    showBlock: function(a, b, d, i, f) {
                        var e = this._.panel,
                            g = e.showBlock(a);
                        this.allowBlur(false);
                        a = this._.editor.editable();
                        this._.returnFocus = a.hasFocus ? a : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
                        var j = this.element,
                            a = this._.iframe,
                            k = b.getDocumentPosition(j.getDocument()),
                            q = this._.dir == "rtl",
                            l = k.x + (i || 0),
                            n = k.y + (f || 0);
                        if (q && (d == 1 || d == 4)) l = l + b.$.offsetWidth;
                        else if (!q && (d == 2 || d == 3)) l = l + (b.$.offsetWidth - 1);
                        if (d == 3 || d == 4) n = n + (b.$.offsetHeight - 1);
                        this._.panel._.offsetParentId = b.getId();
                        j.setStyles({
                            top: n + "px",
                            left: 0,
                            display: ""
                        });
                        j.setOpacity(0);
                        j.getFirst().removeStyle("width");
                        if (!this._.blurSet) {
                            var o = CKEDITOR.env.ie ? a : new CKEDITOR.dom.window(a.$.contentWindow);
                            CKEDITOR.event.useCapture = true;
                            o.on("blur", function(a) {
                                if (this.allowBlur() &&
                                    a.data.getTarget().$ == o.$ && this.visible && !this._.activeChild) {
                                    delete this._.returnFocus;
                                    this.hide()
                                }
                            }, this);
                            o.on("focus", function() {
                                this._.focused = true;
                                this.hideChild();
                                this.allowBlur(true)
                            }, this);
                            CKEDITOR.event.useCapture = false;
                            this._.editor.focusManager.add(o);
                            this._.blurSet = 1
                        }
                        e.onEscape = CKEDITOR.tools.bind(function(a) {
                            if (this.onEscape && this.onEscape(a) === false) return false
                        }, this);
                        CKEDITOR.tools.setTimeout(function() {
                            var a = CKEDITOR.tools.bind(function() {
                                if (g.autoSize) {
                                    var a = g.element.$;
                                    if (CKEDITOR.env.gecko ||
                                        CKEDITOR.env.opera) a = a.parentNode;
                                    if (CKEDITOR.env.ie) a = a.document.body;
                                    a = a.scrollWidth;
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((j.$.offsetWidth || 0) - (j.$.clientWidth || 0) + 3));
                                    if (!g.extraWidth) a = a + (g.extraWidth = 4);
                                    j.setStyle("width", a + "px");
                                    a = g.element.$.scrollHeight;
                                    CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((j.$.offsetHeight || 0) - (j.$.clientHeight || 0) + 3));
                                    j.setStyle("height", a + "px");
                                    e._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                } else j.removeStyle("height");
                                q && (l = l - j.$.offsetWidth);
                                j.setStyle("left", l + "px");
                                var b = e.element.getWindow(),
                                    a = j.$.getBoundingClientRect(),
                                    b = b.getViewPaneSize(),
                                    c = a.width || a.right - a.left,
                                    d = a.height || a.bottom - a.top,
                                    f = q ? a.right : b.width - a.left,
                                    h = q ? b.width - a.right : a.left;
                                q ? f < c && (l = h > c ? l + c : b.width > c ? l - a.left : l - a.right + b.width) : f < c && (l = h > c ? l - c : b.width > c ? l - a.right + b.width : l - a.left);
                                c = a.top;
                                b.height - a.top < d && (n = c > d ? n - d : b.height > d ? n - a.bottom + b.height : n - a.top);
                                if (CKEDITOR.env.ie) {
                                    b = a = new CKEDITOR.dom.element(j.$.offsetParent);
                                    b.getName() ==
                                        "html" && (b = b.getDocument().getBody());
                                    b.getComputedStyle("direction") == "rtl" && (l = CKEDITOR.env.ie8Compat ? l - j.getDocument().getDocumentElement().$.scrollLeft * 2 : l - (a.$.scrollWidth - a.$.clientWidth))
                                }
                                var a = j.getFirst(),
                                    i;
                                (i = a.getCustomData("activePanel")) && i.onHide && i.onHide.call(this, 1);
                                a.setCustomData("activePanel", this);
                                j.setStyles({
                                    top: n + "px",
                                    left: l + "px"
                                });
                                j.setOpacity(1)
                            }, this);
                            e.isLoaded ? a() : e.onLoad = a;
                            CKEDITOR.tools.setTimeout(function() {
                                this.focus();
                                this.allowBlur(true);
                                this._.editor.fire("panelShow",
                                    this)
                            }, 0, this)
                        }, CKEDITOR.env.air ? 200 : 0, this);
                        this.visible = 1;
                        this.onShow && this.onShow.call(this)
                    },
                    focus: function() {
                        if (CKEDITOR.env.webkit) {
                            var a = CKEDITOR.document.getActive();
                            !a.equals(this._.iframe) && a.$.blur()
                        }(this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
                    },
                    blur: function() {
                        var a = this._.iframe.getFrameDocument().getActive();
                        a.is("a") && (this._.lastFocused = a)
                    },
                    hide: function(a) {
                        if (this.visible && (!this.onHide || this.onHide.call(this) !== true)) {
                            this.hideChild();
                            CKEDITOR.env.gecko &&
                                this._.iframe.getFrameDocument().$.activeElement.blur();
                            this.element.setStyle("display", "none");
                            this.visible = 0;
                            this.element.getFirst().removeCustomData("activePanel");
                            if (a = a && this._.returnFocus) {
                                CKEDITOR.env.webkit && a.type && a.getWindow().$.focus();
                                a.focus()
                            }
                            delete this._.lastFocused;
                            this._.editor.fire("panelHide", this)
                        }
                    },
                    allowBlur: function(a) {
                        var b = this._.panel;
                        if (a != void 0) b.allowBlur = a;
                        return b.allowBlur
                    },
                    showAsChild: function(a, b, d, i, f, e) {
                        if (!(this._.activeChild == a && a._.panel._.offsetParentId ==
                                d.getId())) {
                            this.hideChild();
                            a.onHide = CKEDITOR.tools.bind(function() {
                                CKEDITOR.tools.setTimeout(function() {
                                    this._.focused || this.hide()
                                }, 0, this)
                            }, this);
                            this._.activeChild = a;
                            this._.focused = false;
                            a.showBlock(b, d, i, f, e);
                            this.blur();
                            (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() {
                                a.element.getChild(0).$.style.cssText += ""
                            }, 100)
                        }
                    },
                    hideChild: function(a) {
                        var b = this._.activeChild;
                        if (b) {
                            delete b.onHide;
                            delete this._.activeChild;
                            b.hide();
                            a && this.focus()
                        }
                    }
                }
            });
            CKEDITOR.on("instanceDestroyed",
                function() {
                    var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances),
                        h;
                    for (h in b) {
                        var d = b[h];
                        a ? d.destroy() : d.element.hide()
                    }
                    a && (b = {})
                })
        })();
        CKEDITOR.plugins.add("colorbutton", {
            requires: "panelbutton,floatpanel",
            init: function(a) {
                function b(b, d, g, h) {
                    var k = CKEDITOR.tools.getNextId() + "_colorBox";
                    a.ui.add(b, CKEDITOR.UI_PANELBUTTON, {
                        label: g,
                        title: g,
                        modes: {
                            wysiwyg: 1
                        },
                        editorFocus: 1,
                        toolbar: "colors," + h,
                        panel: {
                            css: CKEDITOR.skin.getPath("editor"),
                            attributes: {
                                role: "listbox",
                                "aria-label": i.panelTitle
                            }
                        },
                        onBlock: function(b,
                            f) {
                            f.autoSize = true;
                            f.element.addClass("cke_colorblock");
                            f.element.setHtml(c(b, d, k));
                            f.element.getDocument().getBody().setStyle("overflow", "hidden");
                            CKEDITOR.ui.fire("ready", this);
                            var g = f.keys,
                                h = a.lang.dir == "rtl";
                            g[h ? 37 : 39] = "next";
                            g[40] = "next";
                            g[9] = "next";
                            g[h ? 39 : 37] = "prev";
                            g[38] = "prev";
                            g[CKEDITOR.SHIFT + 9] = "prev";
                            g[32] = "click"
                        },
                        onOpen: function() {
                            var b = a.getSelection(),
                                b = b && b.getStartElement(),
                                b = a.elementPath(b),
                                c, b = b.block || b.blockLimit || a.document.getBody();
                            do c = b && b.getComputedStyle(d == "back" ? "background-color" :
                                "color") || "transparent"; while (d == "back" && c == "transparent" && b && (b = b.getParent()));
                            if (!c || c == "transparent") c = "#ffffff";
                            this._.panel._.iframe.getFrameDocument().getById(k).setStyle("background-color", c);
                            return c
                        }
                    })
                }

                function c(b, c, g) {
                    var j = [],
                        k = d.colorButton_colors.split(","),
                        q = CKEDITOR.tools.addFunction(function(c, g) {
                            if (c == "?") {
                                var e = arguments.callee,
                                    i = function(a) {
                                        this.removeListener("ok", i);
                                        this.removeListener("cancel", i);
                                        a.name == "ok" && e(this.getContentElement("picker", "selectedColor").getValue(), g)
                                    };
                                a.openDialog("colordialog", function() {
                                    this.on("ok", i);
                                    this.on("cancel", i)
                                })
                            } else {
                                a.focus();
                                b.hide();
                                a.fire("saveSnapshot");
                                a.removeStyle(new CKEDITOR.style(d["colorButton_" + g + "Style"], {
                                    color: "inherit"
                                }));
                                if (c) {
                                    var j = d["colorButton_" + g + "Style"];
                                    j.childRule = g == "back" ? function(a) {
                                        return h(a)
                                    } : function(a) {
                                        return !(a.is("a") || a.getElementsByTag("a").count()) || h(a)
                                    };
                                    a.applyStyle(new CKEDITOR.style(j, {
                                        color: c
                                    }))
                                }
                                a.fire("saveSnapshot")
                            }
                        });
                    j.push('<a class="cke_colorauto" _cke_focus=1 hidefocus=true title="',
                        i.auto, '" onclick="CKEDITOR.tools.callFunction(', q, ",null,'", c, "');return false;\" href=\"javascript:void('", i.auto, '\')" role="option"><table role="presentation" cellspacing=0 cellpadding=0 width="100%"><tr><td><span class="cke_colorbox" id="', g, '"></span></td><td colspan=7 align=center>', i.auto, '</td></tr></table></a><table role="presentation" cellspacing=0 cellpadding=0 width="100%">');
                    for (g = 0; g < k.length; g++) {
                        g % 8 === 0 && j.push("</tr><tr>");
                        var l = k[g].split("/"),
                            n = l[0],
                            o = l[1] || n;
                        l[1] || (n = "#" + n.replace(/^(.)(.)(.)$/,
                            "$1$1$2$2$3$3"));
                        l = a.lang.colorbutton.colors[o] || o;
                        j.push('<td><a class="cke_colorbox" _cke_focus=1 hidefocus=true title="', l, '" onclick="CKEDITOR.tools.callFunction(', q, ",'", n, "','", c, "'); return false;\" href=\"javascript:void('", l, '\')" role="option"><span class="cke_colorbox" style="background-color:#', o, '"></span></a></td>')
                    }(a.plugins.colordialog && d.colorButton_enableMore === void 0 || d.colorButton_enableMore) && j.push('</tr><tr><td colspan=8 align=center><a class="cke_colormore" _cke_focus=1 hidefocus=true title="',
                        i.more, '" onclick="CKEDITOR.tools.callFunction(', q, ",'?','", c, "');return false;\" href=\"javascript:void('", i.more, "')\"", ' role="option">', i.more, "</a></td>");
                    j.push("</tr></table>");
                    return j.join("")
                }

                function h(a) {
                    return a.getAttribute("contentEditable") == "false" || a.getAttribute("data-nostyle")
                }
                var d = a.config,
                    i = a.lang.colorbutton;
                if (!CKEDITOR.env.hc) {
                    b("TextColor", "fore", i.textColorTitle, 10);
                    b("BGColor", "back", i.bgColorTitle, 20)
                }
            }
        });
        CKEDITOR.config.colorButton_colors = "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF";
        CKEDITOR.config.colorButton_foreStyle = {
            element: "span",
            styles: {
                color: "#(color)"
            },
            overrides: [{
                element: "font",
                attributes: {
                    color: null
                }
            }]
        };
        CKEDITOR.config.colorButton_backStyle = {
            element: "span",
            styles: {
                "background-color": "#(color)"
            }
        };
        CKEDITOR.plugins.colordialog = {
            requires: "dialog",
            init: function(a) {
                a.addCommand("colordialog", new CKEDITOR.dialogCommand("colordialog"));
                CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js")
            }
        };
        CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog);
        CKEDITOR.plugins.add("menu", {
            beforeInit: function(a) {
                for (var b = a.config.menu_groups.split(","), c = a._.menuGroups = {}, h = a._.menuItems = {}, d = 0; d < b.length; d++) c[b[d]] = d + 1;
                a.addMenuGroup = function(a, b) {
                    c[a] = b || 100
                };
                a.addMenuItem = function(a, b) {
                    c[b.group] && (h[a] = new CKEDITOR.menuItem(this, a, b))
                };
                a.addMenuItems = function(a) {
                    for (var b in a) this.addMenuItem(b, a[b])
                };
                a.getMenuItem = function(a) {
                    return h[a]
                };
                a.removeMenuItem = function(a) {
                    delete h[a]
                }
            },
            requires: "floatpanel"
        });
        (function() {
            function a(a) {
                a.sort(function(a, b) {
                    return a.group < b.group ?
                        -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0
                })
            }
            var b = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state}" href="{href}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="menuitem" aria-haspopup="{hasPopup}" aria-disabled="{disabled}" aria-pressed="{pressed}"';
            if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) b = b + ' onkeypress="return false;"';
            CKEDITOR.env.gecko && (b = b + ' onblur="this.style.cssText = this.style.cssText;"');
            var b = b + (' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">'),
                c = CKEDITOR.addTemplate("menuItem", b + '<span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{name}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{arrowHtml}{label}</span></a></span>'),
                h = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>');
            CKEDITOR.menu = CKEDITOR.tools.createClass({
                $: function(a, b) {
                    b = this._.definition = b || {};
                    this.id = CKEDITOR.tools.getNextId();
                    this.editor = a;
                    this.items = [];
                    this._.listeners = [];
                    this._.level = b.level || 1;
                    var c = CKEDITOR.tools.extend({}, b.panel, {
                            css: [CKEDITOR.skin.getPath("editor")],
                            level: this._.level - 1,
                            block: {}
                        }),
                        e = c.block.attributes = c.attributes || {};
                    !e.role && (e.role = "menu");
                    this._.panelDefinition = c
                },
                _: {
                    onShow: function() {
                        var a =
                            this.editor.getSelection(),
                            b = a && a.getStartElement(),
                            c = this.editor.elementPath(),
                            e = this._.listeners;
                        this.removeAll();
                        for (var g = 0; g < e.length; g++) {
                            var h = e[g](b, a, c);
                            if (h)
                                for (var k in h) {
                                    var q = this.editor.getMenuItem(k);
                                    if (q && (!q.command || this.editor.getCommand(q.command).state)) {
                                        q.state = h[k];
                                        this.add(q)
                                    }
                                }
                        }
                    },
                    onClick: function(a) {
                        this.hide();
                        if (a.onClick) a.onClick();
                        else a.command && this.editor.execCommand(a.command)
                    },
                    onEscape: function(a) {
                        var b = this.parent;
                        b ? b._.panel.hideChild(1) : a == 27 && this.hide(1);
                        return false
                    },
                    onHide: function() {
                        this.onHide && this.onHide()
                    },
                    showSubMenu: function(a) {
                        var b = this._.subMenu,
                            c = this.items[a];
                        if (c = c.getItems && c.getItems()) {
                            if (b) b.removeAll();
                            else {
                                b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {
                                    level: this._.level + 1
                                }, true));
                                b.parent = this;
                                b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)
                            }
                            for (var e in c) {
                                var g = this.editor.getMenuItem(e);
                                if (g) {
                                    g.state = c[e];
                                    b.add(g)
                                }
                            }
                            a = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + ("" +
                                a));
                            b.show(a, 2)
                        } else this._.panel.hideChild(1)
                    }
                },
                proto: {
                    add: function(a) {
                        if (!a.order) a.order = this.items.length;
                        this.items.push(a)
                    },
                    removeAll: function() {
                        this.items = []
                    },
                    show: function(b, c, f, e) {
                        if (!this.parent) {
                            this._.onShow();
                            if (!this.items.length) return
                        }
                        var c = c || (this.editor.lang.dir == "rtl" ? 2 : 1),
                            g = this.items,
                            h = this.editor,
                            k = this._.panel,
                            q = this._.element;
                        if (!k) {
                            k = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
                            k.onEscape = CKEDITOR.tools.bind(function(a) {
                                if (this._.onEscape(a) ===
                                    false) return false
                            }, this);
                            k.onShow = function() {
                                k._.panel.getHolderElement().getParent().addClass("cke cke_reset_all")
                            };
                            k.onHide = CKEDITOR.tools.bind(function() {
                                this._.onHide && this._.onHide()
                            }, this);
                            q = k.addBlock(this.id, this._.panelDefinition.block);
                            q.autoSize = true;
                            var l = q.keys;
                            l[40] = "next";
                            l[9] = "next";
                            l[38] = "prev";
                            l[CKEDITOR.SHIFT + 9] = "prev";
                            l[h.lang.dir == "rtl" ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
                            l[32] = CKEDITOR.env.ie ? "mouseup" : "click";
                            CKEDITOR.env.ie && (l[13] = "mouseup");
                            q = this._.element = q.element;
                            l = q.getDocument();
                            l.getBody().setStyle("overflow", "hidden");
                            l.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
                            this._.itemOverFn = CKEDITOR.tools.addFunction(function(a) {
                                clearTimeout(this._.showSubTimeout);
                                this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, h.config.menu_subMenuDelay || 400, this, [a])
                            }, this);
                            this._.itemOutFn = CKEDITOR.tools.addFunction(function() {
                                clearTimeout(this._.showSubTimeout)
                            }, this);
                            this._.itemClickFn = CKEDITOR.tools.addFunction(function(a) {
                                var b = this.items[a];
                                if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1);
                                else if (b.getItems) this._.showSubMenu(a);
                                else this._.onClick(b)
                            }, this)
                        }
                        a(g);
                        for (var l = h.container && h.container.getChild(1), l = ['<div class="cke_menu' + (l && l.hasClass("cke_mixed_dir_content") ? " cke_mixed_dir_content" : "") + '" role="presentation">'], n = g.length, o = n && g[0].group, m = 0; m < n; m++) {
                            var p = g[m];
                            if (o != p.group) {
                                l.push('<div class="cke_menuseparator" role="separator"></div>');
                                o = p.group
                            }
                            p.render(this, m, l)
                        }
                        l.push("</div>");
                        q.setHtml(l.join(""));
                        CKEDITOR.ui.fire("ready",
                            this);
                        this.parent ? this.parent._.panel.showAsChild(k, this.id, b, c, f, e) : k.showBlock(this.id, b, c, f, e);
                        h.fire("menuShow", [k])
                    },
                    addListener: function(a) {
                        this._.listeners.push(a)
                    },
                    hide: function(a) {
                        this._.onHide && this._.onHide();
                        this._.panel && this._.panel.hide(a)
                    }
                }
            });
            CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                $: function(a, b, c) {
                    CKEDITOR.tools.extend(this, c, {
                        order: 0,
                        className: "cke_menubutton__" + b
                    });
                    this.group = a._.menuGroups[this.group];
                    this.editor = a;
                    this.name = b
                },
                proto: {
                    render: function(a, b, f) {
                        var e = typeof this.state ==
                            "undefined" ? CKEDITOR.TRISTATE_OFF : this.state,
                            g = this.getItems,
                            j = "&" + (this.editor.lang.dir == "rtl" ? "9668" : "9658") + ";",
                            a = {
                                id: a.id + ("" + b),
                                name: this.name,
                                label: this.label,
                                state: e == CKEDITOR.TRISTATE_ON ? "on" : e == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off",
                                hasPopup: g ? "true" : "false",
                                disabled: e == CKEDITOR.TRISTATE_DISABLED,
                                pressed: e == CKEDITOR.TRISTATE_ON,
                                title: this.label,
                                href: "javascript:void('" + (this.label || "").replace("'") + "')",
                                hoverFn: a._.itemOverFn,
                                moveOutFn: a._.itemOutFn,
                                clickFn: a._.itemClickFn,
                                index: b,
                                iconStyle: CKEDITOR.skin.getIconStyle(this.name,
                                    this.editor.lang.dir == "rtl", this.icon, this.iconOffset),
                                arrowHtml: g ? h.output({
                                    label: j
                                }) : ""
                            };
                        c.output(a, f)
                    }
                }
            })
        })();
        CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div";
        CKEDITOR.plugins.add("contextmenu", {
            requires: "menu",
            onLoad: function() {
                CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                    base: CKEDITOR.menu,
                    $: function(a) {
                        this.base.call(this, a, {
                            panel: {
                                className: "cke_menu_panel",
                                attributes: {
                                    "aria-label": a.lang.contextmenu.options
                                }
                            }
                        })
                    },
                    proto: {
                        addTarget: function(a, b) {
                            if (CKEDITOR.env.opera && !("oncontextmenu" in document.body)) {
                                var c;
                                a.on("mousedown", function(d) {
                                    d = d.data;
                                    if (d.$.button != 2) d.getKeystroke() == CKEDITOR.CTRL + 1 && a.fire("contextmenu", d);
                                    else if (!b || !(CKEDITOR.env.mac ? d.$.metaKey : d.$.ctrlKey)) {
                                        var f = d.getTarget();
                                        if (!c) {
                                            f = f.getDocument();
                                            c = f.createElement("input");
                                            c.$.type = "button";
                                            f.getBody().append(c)
                                        }
                                        c.setAttribute("style", "position:absolute;top:" + (d.$.clientY - 2) + "px;left:" +
                                            (d.$.clientX - 2) + "px;width:5px;height:5px;opacity:0.01")
                                    }
                                });
                                a.on("mouseup", function(b) {
                                    if (c) {
                                        c.remove();
                                        c = void 0;
                                        a.fire("contextmenu", b.data)
                                    }
                                })
                            }
                            a.on("contextmenu", function(a) {
                                a = a.data;
                                if (!b || !(CKEDITOR.env.webkit ? h : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey)) {
                                    a.preventDefault();
                                    var c = a.getTarget().getDocument(),
                                        d = a.getTarget().getDocument().getDocumentElement(),
                                        g = !c.equals(CKEDITOR.document),
                                        c = c.getWindow().getScrollPosition(),
                                        j = g ? a.$.clientX : a.$.pageX || c.x + a.$.clientX,
                                        k = g ? a.$.clientY : a.$.pageY || c.y +
                                        a.$.clientY;
                                    CKEDITOR.tools.setTimeout(function() {
                                        this.open(d, null, j, k)
                                    }, CKEDITOR.env.ie ? 200 : 0, this)
                                }
                            }, this);
                            if (CKEDITOR.env.opera) a.on("keypress", function(a) {
                                a = a.data;
                                a.$.keyCode === 0 && a.preventDefault()
                            });
                            if (CKEDITOR.env.webkit) {
                                var h, d = function() {
                                    h = 0
                                };
                                a.on("keydown", function(a) {
                                    h = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey
                                });
                                a.on("keyup", d);
                                a.on("contextmenu", d)
                            }
                        },
                        open: function(a, b, c, h) {
                            this.editor.focus();
                            a = a || CKEDITOR.document.getDocumentElement();
                            this.show(a, b, c, h)
                        }
                    }
                })
            },
            beforeInit: function(a) {
                var b =
                    a.contextMenu = new CKEDITOR.plugins.contextMenu(a);
                a.on("contentDom", function() {
                    b.addTarget(a.editable(), a.config.browserContextMenuOnCtrl !== false)
                });
                a.addCommand("contextMenu", {
                    exec: function() {
                        a.contextMenu.open(a.document.getBody())
                    }
                });
                a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
            }
        });
        (function() {
            CKEDITOR.plugins.add("div", {
                requires: "dialog",
                init: function(a) {
                    if (!a.blockless) {
                        var b = a.lang.div;
                        a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
                            contextSensitive: true,
                            refresh: function(a,
                                b) {
                                this.setState("div" in (a.config.div_wrapTable ? b.root : b.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                            }
                        }));
                        a.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv"));
                        a.addCommand("removediv", {
                            exec: function(a) {
                                function b(d) {
                                    if ((d = CKEDITOR.plugins.div.getSurroundDiv(a, d)) && !d.data("cke-div-added")) {
                                        g.push(d);
                                        d.data("cke-div-added")
                                    }
                                }
                                for (var d = a.getSelection(), i = d && d.getRanges(), f, e = d.createBookmarks(), g = [], j = 0; j < i.length; j++) {
                                    f = i[j];
                                    if (f.collapsed) b(d.getStartElement());
                                    else {
                                        f = new CKEDITOR.dom.walker(f);
                                        f.evaluator = b;
                                        f.lastForward()
                                    }
                                }
                                for (j = 0; j < g.length; j++) g[j].remove(true);
                                d.selectBookmarks(e)
                            }
                        });
                        a.ui.addButton && a.ui.addButton("CreateDiv", {
                            label: b.toolbar,
                            command: "creatediv",
                            toolbar: "blocks,50"
                        });
                        if (a.addMenuItems) {
                            a.addMenuItems({
                                editdiv: {
                                    label: b.edit,
                                    command: "editdiv",
                                    group: "div",
                                    order: 1
                                },
                                removediv: {
                                    label: b.remove,
                                    command: "removediv",
                                    group: "div",
                                    order: 5
                                }
                            });
                            a.contextMenu && a.contextMenu.addListener(function(b) {
                                return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? {
                                    editdiv: CKEDITOR.TRISTATE_OFF,
                                    removediv: CKEDITOR.TRISTATE_OFF
                                } : null
                            })
                        }
                        CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js");
                        CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
                    }
                }
            });
            CKEDITOR.plugins.div = {
                getSurroundDiv: function(a, b) {
                    var c = a.elementPath(b);
                    return a.elementPath(c.blockLimit).contains("div", 1)
                }
            }
        })();
        (function() {
            var a = {
                    editorFocus: false,
                    readOnly: 1,
                    exec: function(a) {
                        (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air)
                    }
                },
                b = '<span class="cke_path_empty">&nbsp;</span>',
                c = "";
            if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) c = c + ' onkeypress="return false;"';
            CKEDITOR.env.gecko && (c = c + ' onblur="this.style.cssText = this.style.cssText;"');
            var h = CKEDITOR.addTemplate("pathItem", '<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"' + (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 ? ' onfocus="event.preventBubble();"' : "") + c + ' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');
            CKEDITOR.plugins.add("elementspath", {
                init: function(c) {
                    function i(a) {
                        c.focus();
                        a = c._.elementsPath.list[a];
                        if (a.equals(c.editable())) {
                            var b = c.createRange();
                            b.selectNodeContents(a);
                            b.select()
                        } else c.getSelection().selectElement(a)
                    }

                    function f() {
                        g && g.setHtml(b);
                        delete c._.elementsPath.list
                    }
                    var e = c.ui.spaceId("path"),
                        g, j = "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_";
                    c._.elementsPath = {
                        idBase: j,
                        filters: []
                    };
                    c.on("uiSpace", function(a) {
                        if (a.data.space == "bottom") a.data.html = a.data.html + ('<span id="' +
                            e + '_label" class="cke_voice_label">' + c.lang.elementspath.eleLabel + '</span><span id="' + e + '" class="cke_path" role="group" aria-labelledby="' + e + '_label">' + b + "</span>")
                    });
                    c.on("uiReady", function() {
                        var a = c.ui.space("path");
                        a && c.focusManager.add(a, 1)
                    });
                    var k = CKEDITOR.tools.addFunction(i),
                        q = CKEDITOR.tools.addFunction(function(a, b) {
                            var f = c._.elementsPath.idBase,
                                g, b = new CKEDITOR.dom.event(b);
                            g = c.lang.dir == "rtl";
                            switch (b.getKeystroke()) {
                                case g ? 39:
                                    37:
                                        case 9:
                                    (g = CKEDITOR.document.getById(f + (a + 1))) || (g = CKEDITOR.document.getById(f +
                                        "0"));
                                    g.focus();
                                    return false;
                                case g ? 37:
                                    39:
                                        case CKEDITOR.SHIFT + 9:
                                    (g = CKEDITOR.document.getById(f + (a - 1))) || (g = CKEDITOR.document.getById(f + (c._.elementsPath.list.length - 1)));
                                    g.focus();
                                    return false;
                                case 27:
                                    c.focus();
                                    return false;
                                case 13:
                                case 32:
                                    i(a);
                                    return false
                            }
                            return true
                        });
                    c.on("selectionChange", function(a) {
                        for (var f = c.editable(), i = a.data.selection.getStartElement(), a = [], m = c._.elementsPath.list = [], p = c._.elementsPath.filters; i;) {
                            var s = 0,
                                r;
                            r = i.data("cke-display-name") ? i.data("cke-display-name") : i.data("cke-real-element-type") ?
                                i.data("cke-real-element-type") : i.getName();
                            for (var t = 0; t < p.length; t++) {
                                var u = p[t](i, r);
                                if (u === false) {
                                    s = 1;
                                    break
                                }
                                r = u || r
                            }
                            if (!s) {
                                s = m.push(i) - 1;
                                t = c.lang.elementspath.eleTitle.replace(/%1/, r);
                                r = h.output({
                                    id: j + s,
                                    label: t,
                                    text: r,
                                    jsTitle: "javascript:void('" + r + "')",
                                    index: s,
                                    keyDownFn: q,
                                    clickFn: k
                                });
                                a.unshift(r)
                            }
                            if (i.equals(f)) break;
                            i = i.getParent()
                        }
                        g || (g = CKEDITOR.document.getById(e));
                        f = g;
                        f.setHtml(a.join("") + b);
                        c.fire("elementsPathUpdate", {
                            space: f
                        })
                    });
                    c.on("readOnly", f);
                    c.on("contentDomUnload", f);
                    c.addCommand("elementsPathFocus",
                        a);
                    c.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
                }
            })
        })();
        (function() {
            function a(a, b, c) {
                function d(c) {
                    if ((i = j[c ? "getFirst" : "getLast"]()) && (!i.is || !i.isBlockBoundary()) && (k = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(true))) && (!k.is || !k.isBlockBoundary({
                            br: 1
                        }))) a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](i)
                }
                for (var f = CKEDITOR.plugins.list.listToArray(b.root, c), g = [], e = 0; e < b.contents.length; e++) {
                    var h = b.contents[e];
                    if ((h = h.getAscendant("li", true)) && !h.getCustomData("list_item_processed")) {
                        g.push(h);
                        CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", true)
                    }
                }
                h = null;
                for (e = 0; e < g.length; e++) {
                    h = g[e].getCustomData("listarray_index");
                    f[h].indent = -1
                }
                for (e = h + 1; e < f.length; e++)
                    if (f[e].indent > f[e - 1].indent + 1) {
                        g = f[e - 1].indent + 1 - f[e].indent;
                        for (h = f[e].indent; f[e] && f[e].indent >= h;) {
                            f[e].indent = f[e].indent + g;
                            e++
                        }
                        e--
                    }
                var j = CKEDITOR.plugins.list.arrayToList(f, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode,
                    i, k;
                d(true);
                d();
                j.replace(b.root)
            }

            function b(a, b) {
                this.name = a;
                this.context = this.type =
                    b
            }

            function c(a, b, c, d) {
                for (var f, g; f = a[d ? "getLast" : "getFirst"](o);) {
                    (g = f.getDirection(1)) !== b.getDirection(1) && f.setAttribute("dir", g);
                    f.remove();
                    c ? f[d ? "insertBefore" : "insertAfter"](c) : b.append(f, d)
                }
            }

            function h(a) {
                var b;
                (b = function(b) {
                    var d = a[b ? "getPrevious" : "getNext"](q);
                    if (d && d.type == CKEDITOR.NODE_ELEMENT && d.is(a.getName())) {
                        c(a, d, null, !b);
                        a.remove();
                        a = d
                    }
                })();
                b(1)
            }

            function d(a) {
                return function(b) {
                    var c = b.children;
                    a: {
                        for (var d = b.children, f = d.length, g = 0; g < f; g++) {
                            b = d[g];
                            if (b.name && b.name in m.$list) {
                                b =
                                    g;
                                break a
                            }
                        }
                        b = f
                    }
                    var d = (d = c[b]) && d.previous,
                        e;
                    if (d && (d.name && d.name == "br" || d.value && (e = d.value.match(p))))(!e || !e.index) && d == c[0] ? c[0] = a || CKEDITOR.env.ie ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {}) : d.name == "br" ? c.splice(b - 1, 1) : d.value = d.value.replace(p, "")
                }
            }

            function i(a) {
                return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"]
            }

            function f(a, b, d) {
                a.fire("saveSnapshot");
                d.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
                var f = d.extractContents();
                b.trim(false, true);
                var g = b.createBookmark(),
                    j = a.elementPath(b.startContainer),
                    i = j.lastElement.getAscendant("li", 1);
                (j = j.block.getBogus()) && j.remove();
                (j = f.getLast()) && (j.type == CKEDITOR.NODE_ELEMENT && j.is("br")) && j.remove();
                (j = b.startContainer.getChild(b.startOffset)) ? f.insertBefore(j): b.startContainer.append(f);
                f = d.startPath();
                if (f = f.contains("li"))
                    if (j = e(f))
                        if (i.contains(f)) {
                            c(j, f.getParent(), f);
                            j.remove()
                        } else i.append(j);
                for (; d.checkStartOfBlock() && d.checkEndOfBlock();) {
                    f =
                        d.startPath();
                    i = f.block;
                    if (i.is("li")) {
                        f = i.getParent();
                        i.equals(f.getLast(q)) && i.equals(f.getFirst(q)) && (i = f)
                    }
                    d.moveToPosition(i, CKEDITOR.POSITION_BEFORE_START);
                    i.remove()
                }
                d = d.clone();
                i = a.editable();
                d.setEndAt(i, CKEDITOR.POSITION_BEFORE_END);
                d = new CKEDITOR.dom.walker(d);
                d.evaluator = function(a) {
                    return q(a) && !l(a)
                };
                (d = d.next()) && (d.type == CKEDITOR.NODE_ELEMENT && d.getName() in CKEDITOR.dtd.$list) && h(d);
                b.moveToBookmark(g);
                b.select();
                a.fire("saveSnapshot")
            }

            function e(a) {
                return (a = a.getLast(q)) && a.type ==
                    CKEDITOR.NODE_ELEMENT && a.getName() in g ? a : null
            }
            var g = {
                    ol: 1,
                    ul: 1
                },
                j = CKEDITOR.dom.walker.whitespaces(),
                k = CKEDITOR.dom.walker.bookmark(),
                q = function(a) {
                    return !(j(a) || k(a))
                },
                l = CKEDITOR.dom.walker.bogus();
            CKEDITOR.plugins.list = {
                listToArray: function(a, b, c, d, f) {
                    if (!g[a.getName()]) return [];
                    d || (d = 0);
                    c || (c = []);
                    for (var e = 0, h = a.getChildCount(); e < h; e++) {
                        var j = a.getChild(e);
                        j.type == CKEDITOR.NODE_ELEMENT && j.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(j, b, c, d + 1);
                        if (j.$.nodeName.toLowerCase() ==
                            "li") {
                            var i = {
                                parent: a,
                                indent: d,
                                element: j,
                                contents: []
                            };
                            if (f) i.grandparent = f;
                            else {
                                i.grandparent = a.getParent();
                                if (i.grandparent && i.grandparent.$.nodeName.toLowerCase() == "li") i.grandparent = i.grandparent.getParent()
                            }
                            b && CKEDITOR.dom.element.setMarker(b, j, "listarray_index", c.length);
                            c.push(i);
                            for (var k = 0, p = j.getChildCount(), m; k < p; k++) {
                                m = j.getChild(k);
                                m.type == CKEDITOR.NODE_ELEMENT && g[m.getName()] ? CKEDITOR.plugins.list.listToArray(m, b, c, d + 1, i.grandparent) : i.contents.push(m)
                            }
                        }
                    }
                    return c
                },
                arrayToList: function(a,
                    b, c, d, f) {
                    c || (c = 0);
                    if (!a || a.length < c + 1) return null;
                    for (var e, h = a[c].parent.getDocument(), j = new CKEDITOR.dom.documentFragment(h), i = null, k = c, m = Math.max(a[c].indent, 0), p = null, n, o, l = d == CKEDITOR.ENTER_P ? "p" : "div";;) {
                        var s = a[k];
                        e = s.grandparent;
                        n = s.element.getDirection(1);
                        if (s.indent == m) {
                            if (!i || a[k].parent.getName() != i.getName()) {
                                i = a[k].parent.clone(false, 1);
                                f && i.setAttribute("dir", f);
                                j.append(i)
                            }
                            p = i.append(s.element.clone(0, 1));
                            n != i.getDirection(1) && p.setAttribute("dir", n);
                            for (e = 0; e < s.contents.length; e++) p.append(s.contents[e].clone(1,
                                1));
                            k++
                        } else if (s.indent == Math.max(m, 0) + 1) {
                            o = a[k - 1].element.getDirection(1);
                            k = CKEDITOR.plugins.list.arrayToList(a, null, k, d, o != n ? n : null);
                            !p.getChildCount() && (CKEDITOR.env.ie && !(h.$.documentMode > 7)) && p.append(h.createText(" "));
                            p.append(k.listNode);
                            k = k.nextIndex
                        } else if (s.indent == -1 && !c && e) {
                            if (g[e.getName()]) {
                                p = s.element.clone(false, true);
                                n != e.getDirection(1) && p.setAttribute("dir", n)
                            } else p = new CKEDITOR.dom.documentFragment(h);
                            var i = e.getDirection(1) != n,
                                r = s.element,
                                t = r.getAttribute("class"),
                                O = r.getAttribute("style"),
                                H = p.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (d != CKEDITOR.ENTER_BR || i || O || t),
                                M, Q = s.contents.length;
                            for (e = 0; e < Q; e++) {
                                M = s.contents[e];
                                if (M.type == CKEDITOR.NODE_ELEMENT && M.isBlockBoundary()) {
                                    i && !M.getDirection() && M.setAttribute("dir", n);
                                    var N = M,
                                        R = r.getAttribute("style");
                                    R && N.setAttribute("style", R.replace(/([^;])$/, "$1;") + (N.getAttribute("style") || ""));
                                    t && M.addClass(t)
                                } else if (H) {
                                    if (!o) {
                                        o = h.createElement(l);
                                        i && o.setAttribute("dir", n)
                                    }
                                    O && o.setAttribute("style", O);
                                    t && o.setAttribute("class", t);
                                    o.append(M.clone(1,
                                        1))
                                }
                                p.append(o || M.clone(1, 1))
                            }
                            if (p.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && k != a.length - 1) {
                                (n = p.getLast()) && (n.type == CKEDITOR.NODE_ELEMENT && n.getAttribute("type") == "_moz") && n.remove();
                                (!p.getLast(q) || !(n.type == CKEDITOR.NODE_ELEMENT && n.getName() in CKEDITOR.dtd.$block)) && p.append(h.createElement("br"))
                            }
                            n = p.$.nodeName.toLowerCase();
                            !CKEDITOR.env.ie && (n == "div" || n == "p") && p.appendBogus();
                            j.append(p);
                            i = null;
                            k++
                        } else return null;
                        o = null;
                        if (a.length <= k || Math.max(a[k].indent, 0) < m) break
                    }
                    if (b)
                        for (a = j.getFirst(); a;) {
                            if (a.type ==
                                CKEDITOR.NODE_ELEMENT) {
                                CKEDITOR.dom.element.clearMarkers(b, a);
                                if (a.getName() in CKEDITOR.dtd.$listItem) {
                                    c = a;
                                    h = f = d = void 0;
                                    if (d = c.getDirection()) {
                                        for (f = c.getParent(); f && !(h = f.getDirection());) f = f.getParent();
                                        d == h && c.removeAttribute("dir")
                                    }
                                }
                            }
                            a = a.getNextSourceNode()
                        }
                    return {
                        listNode: j,
                        nextIndex: k
                    }
                }
            };
            var n = /^h[1-6]$/,
                o = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
            b.prototype = {
                exec: function(b) {
                    this.refresh(b, b.elementPath());
                    var c = b.config,
                        d = b.getSelection(),
                        f = d && d.getRanges(true);
                    if (this.state == CKEDITOR.TRISTATE_OFF) {
                        var e =
                            b.editable();
                        if (e.getFirst(q)) {
                            var j = f.length == 1 && f[0];
                            (c = j && j.getEnclosedNode()) && (c.is && this.type == c.getName()) && this.setState(CKEDITOR.TRISTATE_ON)
                        } else {
                            c.enterMode == CKEDITOR.ENTER_BR ? e.appendBogus() : f[0].fixBlock(1, c.enterMode == CKEDITOR.ENTER_P ? "p" : "div");
                            d.selectRanges(f)
                        }
                    }
                    for (var c = d.createBookmarks(true), e = [], i = {}, f = f.createIterator(), k = 0;
                        (j = f.getNextRange()) && ++k;) {
                        var p = j.getBoundaryNodes(),
                            m = p.startNode,
                            o = p.endNode;
                        m.type == CKEDITOR.NODE_ELEMENT && m.getName() == "td" && j.setStartAt(p.startNode,
                            CKEDITOR.POSITION_AFTER_START);
                        o.type == CKEDITOR.NODE_ELEMENT && o.getName() == "td" && j.setEndAt(p.endNode, CKEDITOR.POSITION_BEFORE_END);
                        j = j.createIterator();
                        for (j.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; p = j.getNextParagraph();)
                            if (!p.getCustomData("list_block")) {
                                CKEDITOR.dom.element.setMarker(i, p, "list_block", 1);
                                for (var l = b.elementPath(p), m = l.elements, o = 0, l = l.blockLimit, s, r = m.length - 1; r >= 0 && (s = m[r]); r--)
                                    if (g[s.getName()] && l.contains(s)) {
                                        l.removeCustomData("list_group_object_" + k);
                                        if (m = s.getCustomData("list_group_object")) m.contents.push(p);
                                        else {
                                            m = {
                                                root: s,
                                                contents: [p]
                                            };
                                            e.push(m);
                                            CKEDITOR.dom.element.setMarker(i, s, "list_group_object", m)
                                        }
                                        o = 1;
                                        break
                                    }
                                if (!o) {
                                    o = l;
                                    if (o.getCustomData("list_group_object_" + k)) o.getCustomData("list_group_object_" + k).contents.push(p);
                                    else {
                                        m = {
                                            root: o,
                                            contents: [p]
                                        };
                                        CKEDITOR.dom.element.setMarker(i, o, "list_group_object_" + k, m);
                                        e.push(m)
                                    }
                                }
                            }
                    }
                    for (s = []; e.length > 0;) {
                        m = e.shift();
                        if (this.state == CKEDITOR.TRISTATE_OFF)
                            if (g[m.root.getName()]) {
                                p = b;
                                f = m;
                                m = i;
                                k = s;
                                o = CKEDITOR.plugins.list.listToArray(f.root, m);
                                l = [];
                                for (j = 0; j < f.contents.length; j++) {
                                    r =
                                        f.contents[j];
                                    if ((r = r.getAscendant("li", true)) && !r.getCustomData("list_item_processed")) {
                                        l.push(r);
                                        CKEDITOR.dom.element.setMarker(m, r, "list_item_processed", true)
                                    }
                                }
                                for (var r = f.root.getDocument(), t = void 0, I = void 0, j = 0; j < l.length; j++) {
                                    var C = l[j].getCustomData("listarray_index"),
                                        t = o[C].parent;
                                    if (!t.is(this.type)) {
                                        I = r.createElement(this.type);
                                        t.copyAttributes(I, {
                                            start: 1,
                                            type: 1
                                        });
                                        I.removeStyle("list-style-type");
                                        o[C].parent = I
                                    }
                                }
                                p = CKEDITOR.plugins.list.arrayToList(o, m, null, p.config.enterMode);
                                m = void 0;
                                o =
                                    p.listNode.getChildCount();
                                for (j = 0; j < o && (m = p.listNode.getChild(j)); j++) m.getName() == this.type && k.push(m);
                                p.listNode.replace(f.root)
                            } else {
                                o = b;
                                p = m;
                                j = s;
                                l = p.contents;
                                f = p.root.getDocument();
                                k = [];
                                if (l.length == 1 && l[0].equals(p.root)) {
                                    m = f.createElement("div");
                                    l[0].moveChildren && l[0].moveChildren(m);
                                    l[0].append(m);
                                    l[0] = m
                                }
                                p = p.contents[0].getParent();
                                for (r = 0; r < l.length; r++) p = p.getCommonAncestor(l[r].getParent());
                                t = o.config.useComputedState;
                                o = m = void 0;
                                t = t === void 0 || t;
                                for (r = 0; r < l.length; r++)
                                    for (I = l[r]; C = I.getParent();) {
                                        if (C.equals(p)) {
                                            k.push(I);
                                            !o && I.getDirection() && (o = 1);
                                            I = I.getDirection(t);
                                            m !== null && (m = m && m != I ? null : I);
                                            break
                                        }
                                        I = C
                                    }
                                if (!(k.length < 1)) {
                                    l = k[k.length - 1].getNext();
                                    r = f.createElement(this.type);
                                    j.push(r);
                                    for (t = j = void 0; k.length;) {
                                        j = k.shift();
                                        t = f.createElement("li");
                                        if (j.is("pre") || n.test(j.getName())) j.appendTo(t);
                                        else {
                                            j.copyAttributes(t);
                                            if (m && j.getDirection()) {
                                                t.removeStyle("direction");
                                                t.removeAttribute("dir")
                                            }
                                            j.moveChildren(t);
                                            j.remove()
                                        }
                                        t.appendTo(r)
                                    }
                                    m && o && r.setAttribute("dir", m);
                                    l ? r.insertBefore(l) : r.appendTo(p)
                                }
                            } else this.state ==
                            CKEDITOR.TRISTATE_ON && g[m.root.getName()] && a.call(this, b, m, i)
                    }
                    for (r = 0; r < s.length; r++) h(s[r]);
                    CKEDITOR.dom.element.clearAllMarkers(i);
                    d.selectBookmarks(c);
                    b.focus()
                },
                refresh: function(a, b) {
                    var c = b.blockLimit || b.root,
                        d = b.contains(this.type, 1);
                    d && c.contains(d) ? this.setState(CKEDITOR.TRISTATE_ON) : this.setState(CKEDITOR.TRISTATE_OFF)
                }
            };
            var m = CKEDITOR.dtd,
                p = /[\t\r\n ]*(?:&nbsp;|\xa0)$/,
                s = {
                    elements: {}
                },
                r;
            for (r in m.$listItem) s.elements[r] = d();
            var t = {
                elements: {}
            };
            for (r in m.$listItem) t.elements[r] = d(true);
            CKEDITOR.plugins.add("list", {
                init: function(a) {
                    if (!a.blockless) {
                        a.addCommand("numberedlist", new b("numberedlist", "ol"));
                        a.addCommand("bulletedlist", new b("bulletedlist", "ul"));
                        if (a.ui.addButton) {
                            a.ui.addButton("NumberedList", {
                                label: a.lang.list.numberedlist,
                                command: "numberedlist",
                                toolbar: "list,10"
                            });
                            a.ui.addButton("BulletedList", {
                                label: a.lang.list.bulletedlist,
                                command: "bulletedlist",
                                toolbar: "list,20"
                            })
                        }
                        a.on("key", function(b) {
                            var c = b.data.keyCode;
                            if (a.mode == "wysiwyg" && c in {
                                    8: 1,
                                    46: 1
                                }) {
                                var d = a.getSelection().getRanges()[0],
                                    h = d.startPath();
                                if (d.collapsed) {
                                    var j = c == 8,
                                        k = a.editable(),
                                        p = new CKEDITOR.dom.walker(d.clone());
                                    p.evaluator = function(a) {
                                        return q(a) && !l(a)
                                    };
                                    c = d.clone();
                                    if (j) {
                                        var m, n;
                                        if ((m = h.contains(g)) && d.checkBoundaryOfElement(m, CKEDITOR.START) && (m = m.getParent()) && m.is("li") && (m = e(m))) {
                                            n = m;
                                            m = m.getPrevious(q);
                                            c.moveToPosition(m && l(m) ? m : n, CKEDITOR.POSITION_BEFORE_START)
                                        } else {
                                            p.range.setStartAt(k, CKEDITOR.POSITION_AFTER_START);
                                            p.range.setEnd(d.startContainer, d.startOffset);
                                            if ((m = p.previous()) && m.type == CKEDITOR.NODE_ELEMENT &&
                                                (m.getName() in g || m.is("li"))) {
                                                if (!m.is("li")) {
                                                    p.range.selectNodeContents(m);
                                                    p.reset();
                                                    p.evaluator = i;
                                                    m = p.previous()
                                                }
                                                n = m;
                                                c.moveToElementEditEnd(n)
                                            }
                                        }
                                        if (n) {
                                            f(a, c, d);
                                            b.cancel()
                                        }
                                    } else if (m = h.contains("li")) {
                                        p.range.setEndAt(k, CKEDITOR.POSITION_BEFORE_END);
                                        m = (h = m.getLast(q)) && i(h) ? h : m;
                                        n = 0;
                                        if ((k = p.next()) && k.type == CKEDITOR.NODE_ELEMENT && k.getName() in g && k.equals(h)) {
                                            n = 1;
                                            k = p.next()
                                        } else d.checkBoundaryOfElement(m, CKEDITOR.END) && (n = 1);
                                        if (n && k) {
                                            d = d.clone();
                                            d.moveToElementEditStart(k);
                                            f(a, c, d);
                                            b.cancel()
                                        }
                                    }
                                    setTimeout(function() {
                                        a.selectionChange(1)
                                    })
                                }
                            }
                        })
                    }
                },
                afterInit: function(a) {
                    if (a = a.dataProcessor) {
                        a.dataFilter.addRules(s);
                        a.htmlFilter.addRules(t)
                    }
                }
            })
        })();
        (function() {
            function a(a, b) {
                this.name = b;
                if (this.useIndentClasses = a.config.indentClasses && a.config.indentClasses.length > 0) {
                    this.classNameRegex = RegExp("(?:^|\\s+)(" + a.config.indentClasses.join("|") + ")(?=$|\\s)");
                    this.indentClassMap = {};
                    for (var c = 0; c < a.config.indentClasses.length; c++) this.indentClassMap[a.config.indentClasses[c]] = c + 1
                }
                this.startDisabled = b == "outdent"
            }

            function b(a, b) {
                return (b || a.getComputedStyle("direction")) ==
                    "ltr" ? "margin-left" : "margin-right"
            }

            function c(a) {
                return a.type == CKEDITOR.NODE_ELEMENT && a.is("li")
            }
            var h = {
                    ol: 1,
                    ul: 1
                },
                d = CKEDITOR.dom.walker.whitespaces(true),
                i = CKEDITOR.dom.walker.bookmark(false, true);
            a.prototype = {
                context: "p",
                refresh: function(a, c) {
                    var d = c && c.contains(h),
                        j = c.block || c.blockLimit;
                    if (d) this.setState(CKEDITOR.TRISTATE_OFF);
                    else if (!this.useIndentClasses && this.name == "indent") this.setState(CKEDITOR.TRISTATE_OFF);
                    else if (j)
                        if (this.useIndentClasses) {
                            d = j.$.className.match(this.classNameRegex);
                            j = 0;
                            if (d) {
                                d = d[1];
                                j = this.indentClassMap[d]
                            }
                            this.name == "outdent" && !j || this.name == "indent" && j == a.config.indentClasses.length ? this.setState(CKEDITOR.TRISTATE_DISABLED) : this.setState(CKEDITOR.TRISTATE_OFF)
                        } else {
                            d = parseInt(j.getStyle(b(j)), 10);
                            isNaN(d) && (d = 0);
                            d <= 0 ? this.setState(CKEDITOR.TRISTATE_DISABLED) : this.setState(CKEDITOR.TRISTATE_OFF)
                        } else this.setState(CKEDITOR.TRISTATE_DISABLED)
                },
                exec: function(a) {
                    function e(b) {
                        for (var c = o.startContainer, e = o.endContainer; c && !c.getParent().equals(b);) c = c.getParent();
                        for (; e && !e.getParent().equals(b);) e = e.getParent();
                        if (c && e) {
                            for (var g = c, c = [], j = false; !j;) {
                                g.equals(e) && (j = true);
                                c.push(g);
                                g = g.getNext()
                            }
                            if (!(c.length < 1)) {
                                g = b.getParents(true);
                                for (e = 0; e < g.length; e++)
                                    if (g[e].getName && h[g[e].getName()]) {
                                        b = g[e];
                                        break
                                    }
                                for (var g = k.name == "indent" ? 1 : -1, e = c[0], c = c[c.length - 1], j = CKEDITOR.plugins.list.listToArray(b, q), m = j[c.getCustomData("listarray_index")].indent, e = e.getCustomData("listarray_index"); e <= c.getCustomData("listarray_index"); e++) {
                                    j[e].indent = j[e].indent + g;
                                    if (g > 0) {
                                        var p =
                                            j[e].parent;
                                        j[e].parent = new CKEDITOR.dom.element(p.getName(), p.getDocument())
                                    }
                                }
                                for (e = c.getCustomData("listarray_index") + 1; e < j.length && j[e].indent > m; e++) j[e].indent = j[e].indent + g;
                                c = CKEDITOR.plugins.list.arrayToList(j, q, null, a.config.enterMode, b.getDirection());
                                if (k.name == "outdent") {
                                    var n;
                                    if ((n = b.getParent()) && n.is("li"))
                                        for (var g = c.listNode.getChildren(), l = [], r, e = g.count() - 1; e >= 0; e--)(r = g.getItem(e)) && (r.is && r.is("li")) && l.push(r)
                                }
                                c && c.listNode.replace(b);
                                if (l && l.length)
                                    for (e = 0; e < l.length; e++) {
                                        for (r =
                                            b = l[e];
                                            (r = r.getNext()) && r.is && r.getName() in h;) {
                                            CKEDITOR.env.ie && !b.getFirst(function(a) {
                                                return d(a) && i(a)
                                            }) && b.append(o.document.createText(" "));
                                            b.append(r)
                                        }
                                        b.insertAfter(n)
                                    }
                            }
                        }
                    }

                    function g() {
                        var b = o.createIterator(),
                            c = a.config.enterMode;
                        b.enforceRealBlocks = true;
                        b.enlargeBr = c != CKEDITOR.ENTER_BR;
                        for (var d; d = b.getNextParagraph(c == CKEDITOR.ENTER_P ? "p" : "div");) j(d)
                    }

                    function j(c, d) {
                        if (c.getCustomData("indent_processed")) return false;
                        if (k.useIndentClasses) {
                            var e = c.$.className.match(k.classNameRegex),
                                g =
                                0;
                            if (e) {
                                e = e[1];
                                g = k.indentClassMap[e]
                            }
                            k.name == "outdent" ? g-- : g++;
                            if (g < 0) return false;
                            g = Math.min(g, a.config.indentClasses.length);
                            g = Math.max(g, 0);
                            c.$.className = CKEDITOR.tools.ltrim(c.$.className.replace(k.classNameRegex, ""));
                            g > 0 && c.addClass(a.config.indentClasses[g - 1])
                        } else {
                            e = b(c, d);
                            g = parseInt(c.getStyle(e), 10);
                            isNaN(g) && (g = 0);
                            var h = a.config.indentOffset || 40,
                                g = g + (k.name == "indent" ? 1 : -1) * h;
                            if (g < 0) return false;
                            g = Math.max(g, 0);
                            g = Math.ceil(g / h) * h;
                            c.setStyle(e, g ? g + (a.config.indentUnit || "px") : "");
                            c.getAttribute("style") ===
                                "" && c.removeAttribute("style")
                        }
                        CKEDITOR.dom.element.setMarker(q, c, "indent_processed", 1);
                        return true
                    }
                    for (var k = this, q = {}, l = a.getSelection(), n = l.createBookmarks(1), o, m = (l && l.getRanges(1)).createIterator(); o = m.getNextRange();) {
                        for (var p = o.getCommonAncestor(); p && !(p.type == CKEDITOR.NODE_ELEMENT && h[p.getName()]);) p = p.getParent();
                        if (!p) {
                            var s = o.getEnclosedNode();
                            if (s && s.type == CKEDITOR.NODE_ELEMENT && s.getName() in h) {
                                o.setStartAt(s, CKEDITOR.POSITION_AFTER_START);
                                o.setEndAt(s, CKEDITOR.POSITION_BEFORE_END);
                                p = s
                            }
                        }
                        if (p && o.startContainer.type == CKEDITOR.NODE_ELEMENT && o.startContainer.getName() in h) {
                            s = new CKEDITOR.dom.walker(o);
                            s.evaluator = c;
                            o.startContainer = s.next()
                        }
                        if (p && o.endContainer.type == CKEDITOR.NODE_ELEMENT && o.endContainer.getName() in h) {
                            s = new CKEDITOR.dom.walker(o);
                            s.evaluator = c;
                            o.endContainer = s.previous()
                        }
                        if (p) {
                            var s = p.getFirst(c),
                                r = !!s.getNext(c),
                                t = o.startContainer;
                            (!s.equals(t) && !s.contains(t) || !(k.name == "indent" || k.useIndentClasses || parseInt(p.getStyle(b(p)), 10)) || !j(p, !r && s.getDirection())) &&
                            e(p)
                        } else g()
                    }
                    CKEDITOR.dom.element.clearAllMarkers(q);
                    a.forceNextSelectionCheck();
                    l.selectBookmarks(n)
                }
            };
            CKEDITOR.plugins.add("indent", {
                requires: "list",
                onLoad: function() {
                    (CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat) && CKEDITOR.addCss(".cke_editable ul,.cke_editable ol{\tmargin-left: 0px;\tpadding-left: 40px;}")
                },
                init: function(b) {
                    if (!b.blockless) {
                        b.addCommand("indent", new a(b, "indent"));
                        b.addCommand("outdent", new a(b, "outdent"));
                        if (b.ui.addButton) {
                            b.ui.addButton("Indent", {
                                label: b.lang.indent.indent,
                                command: "indent",
                                toolbar: "indent,20"
                            });
                            b.ui.addButton("Outdent", {
                                label: b.lang.indent.outdent,
                                command: "outdent",
                                toolbar: "indent,10"
                            })
                        }
                        b.on("dirChanged", function(a) {
                            var c = b.createRange();
                            c.setStartBefore(a.data.node);
                            c.setEndAfter(a.data.node);
                            for (var d = new CKEDITOR.dom.walker(c), h; h = d.next();)
                                if (h.type == CKEDITOR.NODE_ELEMENT)
                                    if (!h.equals(a.data.node) && h.getDirection()) {
                                        c.setStartAfter(h);
                                        d = new CKEDITOR.dom.walker(c)
                                    } else {
                                        var i = b.config.indentClasses;
                                        if (i)
                                            for (var l = a.data.dir == "ltr" ? ["_rtl", ""] : ["",
                                                    "_rtl"
                                                ], n = 0; n < i.length; n++)
                                                if (h.hasClass(i[n] + l[0])) {
                                                    h.removeClass(i[n] + l[0]);
                                                    h.addClass(i[n] + l[1])
                                                }
                                        i = h.getStyle("margin-right");
                                        l = h.getStyle("margin-left");
                                        i ? h.setStyle("margin-left", i) : h.removeStyle("margin-left");
                                        l ? h.setStyle("margin-right", l) : h.removeStyle("margin-right")
                                    }
                        })
                    }
                }
            })
        })();
        (function() {
            function a(a, b, c) {
                c = a.config.forceEnterMode || c;
                if (a.mode != "wysiwyg") return false;
                if (!b) b = a.config.enterMode;
                if (!a.elementPath().isContextFor("p")) {
                    b = CKEDITOR.ENTER_BR;
                    c = 1
                }
                a.fire("saveSnapshot");
                b == CKEDITOR.ENTER_BR ?
                    i(a, b, null, c) : f(a, b, null, c);
                a.fire("saveSnapshot");
                return true
            }

            function b(a) {
                for (var a = a.getSelection().getRanges(true), b = a.length - 1; b > 0; b--) a[b].deleteContents();
                return a[0]
            }
            CKEDITOR.plugins.add("enterkey", {
                requires: "indent",
                init: function(b) {
                    b.addCommand("enter", {
                        modes: {
                            wysiwyg: 1
                        },
                        editorFocus: false,
                        exec: function(b) {
                            a(b)
                        }
                    });
                    b.addCommand("shiftEnter", {
                        modes: {
                            wysiwyg: 1
                        },
                        editorFocus: false,
                        exec: function(b) {
                            b.mode == "wysiwyg" && a(b, b.config.shiftEnterMode, 1)
                        }
                    });
                    b.setKeystroke([
                        [13, "enter"],
                        [CKEDITOR.SHIFT +
                            13, "shiftEnter"
                        ]
                    ])
                }
            });
            var c = CKEDITOR.dom.walker.whitespaces(),
                h = CKEDITOR.dom.walker.bookmark();
            CKEDITOR.plugins.enterkey = {
                enterBlock: function(a, d, f, q) {
                    if (f = f || b(a)) {
                        var l = f.document,
                            n = f.checkStartOfBlock(),
                            o = f.checkEndOfBlock(),
                            m = a.elementPath(f.startContainer).block;
                        if (n && o) {
                            if (m && (m.is("li") || m.getParent().is("li"))) {
                                a.execCommand("outdent");
                                return
                            }
                            if (m && m.getParent().is("blockquote")) {
                                m.breakParent(m.getParent());
                                m.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || m.getPrevious().remove();
                                m.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || m.getNext().remove();
                                f.moveToElementEditStart(m);
                                f.select();
                                return
                            }
                        } else if (m && m.is("pre") && !o) {
                            i(a, d, f, q);
                            return
                        }
                        var m = d == CKEDITOR.ENTER_DIV ? "div" : "p",
                            p = f.splitBlock(m);
                        if (p) {
                            var d = p.previousBlock,
                                a = p.nextBlock,
                                n = p.wasStartOfBlock,
                                o = p.wasEndOfBlock,
                                s;
                            if (a) {
                                s = a.getParent();
                                if (s.is("li")) {
                                    a.breakParent(s);
                                    a.move(a.getNext(), 1)
                                }
                            } else if (d && (s = d.getParent()) && s.is("li")) {
                                d.breakParent(s);
                                s = d.getNext();
                                f.moveToElementEditStart(s);
                                d.move(d.getPrevious())
                            }
                            if (!n &&
                                !o) {
                                if (a.is("li")) {
                                    q = f.clone();
                                    q.selectNodeContents(a);
                                    q = new CKEDITOR.dom.walker(q);
                                    q.evaluator = function(a) {
                                        return !(h(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty))
                                    };
                                    (s = q.next()) && (s.type == CKEDITOR.NODE_ELEMENT && s.is("ul", "ol")) && (CKEDITOR.env.ie ? l.createText(" ") : l.createElement("br")).insertBefore(s)
                                }
                                a && f.moveToElementEditStart(a)
                            } else {
                                var r, t;
                                if (d) {
                                    if (d.is("li") || !e.test(d.getName()) && !d.is("pre")) r = d.clone()
                                } else a && (r = a.clone());
                                if (r) q && !r.is("li") && r.renameNode(m);
                                else if (s && s.is("li")) r = s;
                                else {
                                    r = l.createElement(m);
                                    d && (t = d.getDirection()) && r.setAttribute("dir", t)
                                }
                                if (q = p.elementPath) {
                                    s = 0;
                                    for (t = q.elements.length; s < t; s++) {
                                        m = q.elements[s];
                                        if (m.equals(q.block) || m.equals(q.blockLimit)) break;
                                        if (CKEDITOR.dtd.$removeEmpty[m.getName()]) {
                                            m = m.clone();
                                            r.moveChildren(m);
                                            r.append(m)
                                        }
                                    }
                                }
                                CKEDITOR.env.ie || r.appendBogus();
                                r.getParent() || f.insertNode(r);
                                r.is("li") && r.removeAttribute("value");
                                if (CKEDITOR.env.ie && n && (!o || !d.getChildCount())) {
                                    f.moveToElementEditStart(o ?
                                        d : r);
                                    f.select()
                                }
                                f.moveToElementEditStart(n && !o ? a : r)
                            }
                            if (!CKEDITOR.env.ie)
                                if (a) {
                                    l = l.createElement("span");
                                    l.setHtml("&nbsp;");
                                    f.insertNode(l);
                                    l.scrollIntoView();
                                    f.deleteContents()
                                } else r.scrollIntoView();
                            f.select()
                        }
                    }
                },
                enterBr: function(a, c, d, h) {
                    if (d = d || b(a)) {
                        var i = d.document,
                            n = d.checkEndOfBlock(),
                            o = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),
                            m = o.block,
                            o = m && o.block.getName();
                        if (!h && o == "li") f(a, c, d, h);
                        else {
                            if (!h && n && e.test(o))
                                if (n = m.getDirection()) {
                                    i = i.createElement("div");
                                    i.setAttribute("dir",
                                        n);
                                    i.insertAfter(m);
                                    d.setStart(i, 0)
                                } else {
                                    i.createElement("br").insertAfter(m);
                                    CKEDITOR.env.gecko && i.createText("").insertAfter(m);
                                    d.setStartAt(m.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)
                                } else {
                                m = o == "pre" && !CKEDITOR.env.gecko ? i.createText(CKEDITOR.env.ie ? "\r" : "\n") : i.createElement("br");
                                d.deleteContents();
                                d.insertNode(m);
                                if (CKEDITOR.env.ie) d.setStartAt(m, CKEDITOR.POSITION_AFTER_END);
                                else {
                                    i.createText("?").insertAfter(m);
                                    n && m.getParent().appendBogus();
                                    m.getNext().$.nodeValue =
                                        "";
                                    d.setStartAt(m.getNext(), CKEDITOR.POSITION_AFTER_START);
                                    n = null;
                                    if (CKEDITOR.env.gecko) n = i.createElement("br");
                                    else {
                                        n = i.createElement("span");
                                        n.setHtml("&nbsp;")
                                    }
                                    n.insertBefore(m.getNext());
                                    n.scrollIntoView();
                                    n.remove()
                                }
                            }
                            d.collapse(true);
                            d.select()
                        }
                    }
                }
            };
            var d = CKEDITOR.plugins.enterkey,
                i = d.enterBr,
                f = d.enterBlock,
                e = /^h[1-6]$/
        })();
        (function() {
            function a(a, c) {
                var h = {},
                    d = [],
                    i = {
                        nbsp: " ",
                        shy: "­",
                        gt: ">",
                        lt: "<",
                        amp: "&",
                        apos: "'",
                        quot: '"'
                    },
                    a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(a, b) {
                        var f =
                            c ? "&" + b + ";" : i[b];
                        h[f] = c ? i[b] : "&" + b + ";";
                        d.push(f);
                        return ""
                    });
                if (!c && a) {
                    var a = a.split(","),
                        f = document.createElement("div"),
                        e;
                    f.innerHTML = "&" + a.join(";&") + ";";
                    e = f.innerHTML;
                    f = null;
                    for (f = 0; f < e.length; f++) {
                        var g = e.charAt(f);
                        h[g] = "&" + a[f] + ";";
                        d.push(g)
                    }
                }
                h.regex = d.join(c ? "|" : "");
                return h
            }
            CKEDITOR.plugins.add("entities", {
                afterInit: function(b) {
                    var c = b.config;
                    if (b = (b = b.dataProcessor) && b.htmlFilter) {
                        var h = [];
                        c.basicEntities !== false && h.push("nbsp,gt,lt,amp");
                        if (c.entities) {
                            h.length && h.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro");
                            c.entities_latin && h.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml");
                            c.entities_greek && h.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv");
                            c.entities_additional && h.push(c.entities_additional)
                        }
                        var d = a(h.join(",")),
                            i = d.regex ? "[" + d.regex + "]" : "a^";
                        delete d.regex;
                        c.entities && c.entities_processNumerical && (i = "[^ -~]|" + i);
                        var i = RegExp(i, "g"),
                            f = function(a) {
                                return c.entities_processNumerical == "force" || !d[a] ? "&#" + a.charCodeAt(0) + ";" : d[a]
                            },
                            e = a("nbsp,gt,lt,amp,shy", true),
                            g = RegExp(e.regex, "g"),
                            j = function(a) {
                                return e[a]
                            };
                        b.addRules({
                            text: function(a) {
                                return a.replace(g, j).replace(i, f)
                            }
                        })
                    }
                }
            })
        })();
        CKEDITOR.config.basicEntities = !0;
        CKEDITOR.config.entities = !0;
        CKEDITOR.config.entities_latin = !0;
        CKEDITOR.config.entities_greek = !0;
        CKEDITOR.config.entities_additional = "#39";
        CKEDITOR.plugins.add("popup");
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            popup: function(a, b, c, h) {
                b = b || "80%";
                c = c || "70%";
                typeof b == "string" && (b.length > 1 && b.substr(b.length - 1, 1) == "%") && (b = parseInt(window.screen.width * parseInt(b, 10) / 100, 10));
                typeof c == "string" && (c.length > 1 && c.substr(c.length - 1, 1) == "%") && (c = parseInt(window.screen.height * parseInt(c, 10) / 100, 10));
                b < 640 && (b = 640);
                c < 420 && (c =
                    420);
                var d = parseInt((window.screen.height - c) / 2, 10),
                    i = parseInt((window.screen.width - b) / 2, 10),
                    h = (h || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") + ",width=" + b + ",height=" + c + ",top=" + d + ",left=" + i,
                    f = window.open("", null, h, true);
                if (!f) return false;
                try {
                    if (navigator.userAgent.toLowerCase().indexOf(" chrome/") == -1) {
                        f.moveTo(i, d);
                        f.resizeTo(b, c)
                    }
                    f.focus();
                    f.location.href = a
                } catch (e) {
                    window.open(a, null, h, true)
                }
                return true
            }
        });
        (function() {
            function a(a,
                b) {
                var c = [];
                if (b)
                    for (var d in b) c.push(d + "=" + encodeURIComponent(b[d]));
                else return a;
                return a + (a.indexOf("?") != -1 ? "&" : "?") + c.join("&")
            }

            function b(a) {
                a = a + "";
                return a.charAt(0).toUpperCase() + a.substr(1)
            }

            function c() {
                var c = this.getDialog(),
                    d = c.getParentEditor();
                d._.filebrowserSe = this;
                var f = d.config["filebrowser" + b(c.getName()) + "WindowWidth"] || d.config.filebrowserWindowWidth || "80%",
                    c = d.config["filebrowser" + b(c.getName()) + "WindowHeight"] || d.config.filebrowserWindowHeight || "70%",
                    e = this.filebrowser.params || {};
                e.CKEditor = d.name;
                e.CKEditorFuncNum = d._.filebrowserFn;
                if (!e.langCode) e.langCode = d.langCode;
                e = a(this.filebrowser.url, e);
                d.popup(e, f, c, d.config.filebrowserWindowFeatures || d.config.fileBrowserWindowFeatures)
            }

            function h() {
                var a = this.getDialog();
                a.getParentEditor()._.filebrowserSe = this;
                return !a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value || !a.getContentElement(this["for"][0], this["for"][1]).getAction() ? false : true
            }

            function d(b, c, d) {
                var f = d.params || {};
                f.CKEditor = b.name;
                f.CKEditorFuncNum =
                    b._.filebrowserFn;
                if (!f.langCode) f.langCode = b.langCode;
                c.action = a(d.url, f);
                c.filebrowser = d
            }

            function i(a, f, e, q) {
                var l, n;
                for (n in q) {
                    l = q[n];
                    (l.type == "hbox" || l.type == "vbox" || l.type == "fieldset") && i(a, f, e, l.children);
                    if (l.filebrowser) {
                        if (typeof l.filebrowser == "string") l.filebrowser = {
                            action: l.type == "fileButton" ? "QuickUpload" : "Browse",
                            target: l.filebrowser
                        };
                        if (l.filebrowser.action == "Browse") {
                            var o = l.filebrowser.url;
                            if (o === void 0) {
                                o = a.config["filebrowser" + b(f) + "BrowseUrl"];
                                if (o === void 0) o = a.config.filebrowserBrowseUrl
                            }
                            if (o) {
                                l.onClick =
                                    c;
                                l.filebrowser.url = o;
                                l.hidden = false
                            }
                        } else if (l.filebrowser.action == "QuickUpload" && l["for"]) {
                            o = l.filebrowser.url;
                            if (o === void 0) {
                                o = a.config["filebrowser" + b(f) + "UploadUrl"];
                                if (o === void 0) o = a.config.filebrowserUploadUrl
                            }
                            if (o) {
                                var m = l.onClick;
                                l.onClick = function(a) {
                                    var b = a.sender;
                                    return m && m.call(b, a) === false ? false : h.call(b, a)
                                };
                                l.filebrowser.url = o;
                                l.hidden = false;
                                d(a, e.getContents(l["for"][0]).get(l["for"][1]), l.filebrowser)
                            }
                        }
                    }
                }
            }

            function f(a, b, c) {
                if (c.indexOf(";") !== -1) {
                    for (var c = c.split(";"), d = 0; d < c.length; d++)
                        if (f(a,
                                b, c[d])) return true;
                    return false
                }
                return (a = a.getContents(b).get(c).filebrowser) && a.url
            }

            function e(a, b) {
                var c = this._.filebrowserSe.getDialog(),
                    d = this._.filebrowserSe["for"],
                    f = this._.filebrowserSe.filebrowser.onSelect;
                d && c.getContentElement(d[0], d[1]).reset();
                if (!(typeof b == "function" && b.call(this._.filebrowserSe) === false) && !(f && f.call(this._.filebrowserSe, a, b) === false)) {
                    typeof b == "string" && b && alert(b);
                    if (a) {
                        d = this._.filebrowserSe;
                        c = d.getDialog();
                        if (d = d.filebrowser.target || null) {
                            d = d.split(":");
                            if (f =
                                c.getContentElement(d[0], d[1])) {
                                f.setValue(a);
                                c.selectPage(d[0])
                            }
                        }
                    }
                }
            }
            CKEDITOR.plugins.add("filebrowser", {
                requires: "popup",
                init: function(a) {
                    a._.filebrowserFn = CKEDITOR.tools.addFunction(e, a);
                    a.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(this._.filebrowserFn)
                    })
                }
            });
            CKEDITOR.on("dialogDefinition", function(a) {
                var b = a.data.definition,
                    c, d;
                for (d in b.contents)
                    if (c = b.contents[d]) {
                        i(a.editor, a.data.name, b, c.elements);
                        if (c.hidden && c.filebrowser) c.hidden = !f(b, c.id, c.filebrowser)
                    }
            })
        })();
        CKEDITOR.plugins.add("find", {
            requires: "dialog",
            init: function(a) {
                var b = a.addCommand("find", new CKEDITOR.dialogCommand("find"));
                b.canUndo = false;
                b.readOnly = 1;
                a.addCommand("replace", new CKEDITOR.dialogCommand("replace")).canUndo = false;
                if (a.ui.addButton) {
                    a.ui.addButton("Find", {
                        label: a.lang.find.find,
                        command: "find",
                        toolbar: "find,10"
                    });
                    a.ui.addButton("Replace", {
                        label: a.lang.find.replace,
                        command: "replace",
                        toolbar: "find,20"
                    })
                }
                CKEDITOR.dialog.add("find", this.path + "dialogs/find.js");
                CKEDITOR.dialog.add("replace", this.path + "dialogs/find.js")
            }
        });
        CKEDITOR.config.find_highlight = {
            element: "span",
            styles: {
                "background-color": "#004",
                color: "#fff"
            }
        };
        (function() {
            function a(a, b) {
                var c = h.exec(a),
                    d = h.exec(b);
                if (c) {
                    if (!c[2] && d[2] == "px") return d[1];
                    if (c[2] == "px" && !d[2]) return d[1] + "px"
                }
                return b
            }
            var b = CKEDITOR.htmlParser.cssStyle,
                c = CKEDITOR.tools.cssLength,
                h = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
                d = {
                    elements: {
                        $: function(c) {
                            var d = c.attributes;
                            if ((d = (d = (d = d && d["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(d))) && d.children[0]) &&
                                c.attributes["data-cke-resizable"]) {
                                var g = (new b(c)).rules,
                                    c = d.attributes,
                                    h = g.width,
                                    g = g.height;
                                h && (c.width = a(c.width, h));
                                g && (c.height = a(c.height, g))
                            }
                            return d
                        }
                    }
                },
                i = CKEDITOR.plugins.add("fakeobjects", {
                    afterInit: function(a) {
                        (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(d)
                    }
                });
            CKEDITOR.editor.prototype.createFakeElement = function(a, d, g, h) {
                var k = this.lang.fakeobjects,
                    k = k[g] || k.unknown,
                    d = {
                        "class": d,
                        "data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
                        "data-cke-real-node-type": a.type,
                        alt: k,
                        title: k,
                        align: a.getAttribute("align") || ""
                    };
                if (!CKEDITOR.env.hc) d.src = CKEDITOR.getUrl(i.path + "images/spacer.gif");
                g && (d["data-cke-real-element-type"] = g);
                if (h) {
                    d["data-cke-resizable"] = h;
                    g = new b;
                    h = a.getAttribute("width");
                    a = a.getAttribute("height");
                    h && (g.rules.width = c(h));
                    a && (g.rules.height = c(a));
                    g.populate(d)
                }
                return this.document.createElement("img", {
                    attributes: d
                })
            };
            CKEDITOR.editor.prototype.createFakeParserElement = function(a, d, g, h) {
                var i = this.lang.fakeobjects,
                    i = i[g] || i.unknown,
                    q;
                q = new CKEDITOR.htmlParser.basicWriter;
                a.writeHtml(q);
                q = q.getHtml();
                d = {
                    "class": d,
                    "data-cke-realelement": encodeURIComponent(q),
                    "data-cke-real-node-type": a.type,
                    alt: i,
                    title: i,
                    align: a.attributes.align || ""
                };
                if (!CKEDITOR.env.hc) d.src = CKEDITOR.getUrl("images/spacer.gif");
                g && (d["data-cke-real-element-type"] = g);
                if (h) {
                    d["data-cke-resizable"] = h;
                    h = a.attributes;
                    a = new b;
                    g = h.width;
                    h = h.height;
                    g != void 0 && (a.rules.width = c(g));
                    h != void 0 && (a.rules.height = c(h));
                    a.populate(d)
                }
                return new CKEDITOR.htmlParser.element("img", d)
            };
            CKEDITOR.editor.prototype.restoreRealElement =
                function(b) {
                    if (b.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
                    var c = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")), this.document);
                    if (b.data("cke-resizable")) {
                        var d = b.getStyle("width"),
                            b = b.getStyle("height");
                        d && c.setAttribute("width", a(c.getAttribute("width"), d));
                        b && c.setAttribute("height", a(c.getAttribute("height"), b))
                    }
                    return c
                }
        })();
        (function() {
            function a(a) {
                a = a.attributes;
                return a.type == "application/x-shockwave-flash" || c.test(a.src || "")
            }

            function b(a,
                b) {
                return a.createFakeParserElement(b, "cke_flash", "flash", true)
            }
            var c = /\.swf(?:$|\?)/i;
            CKEDITOR.plugins.add("flash", {
                requires: "dialog,fakeobjects",
                onLoad: function() {
                    CKEDITOR.addCss("img.cke_flash{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
                },
                init: function(a) {
                    a.addCommand("flash", new CKEDITOR.dialogCommand("flash"));
                    a.ui.addButton && a.ui.addButton("Flash", {
                        label: a.lang.common.flash,
                        command: "flash",
                        toolbar: "insert,20"
                    });
                    CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js");
                    a.addMenuItems && a.addMenuItems({
                        flash: {
                            label: a.lang.flash.properties,
                            command: "flash",
                            group: "flash"
                        }
                    });
                    a.on("doubleclick", function(a) {
                        var b = a.data.element;
                        if (b.is("img") && b.data("cke-real-element-type") == "flash") a.data.dialog = "flash"
                    });
                    a.contextMenu && a.contextMenu.addListener(function(a) {
                        if (a && a.is("img") && !a.isReadOnly() && a.data("cke-real-element-type") == "flash") return {
                            flash: CKEDITOR.TRISTATE_OFF
                        }
                    })
                },
                afterInit: function(c) {
                    var d = c.dataProcessor;
                    (d = d && d.dataFilter) && d.addRules({
                        elements: {
                            "cke:object": function(d) {
                                var f = d.attributes;
                                if ((!f.classid || !("" + f.classid).toLowerCase()) && !a(d)) {
                                    for (f = 0; f < d.children.length; f++)
                                        if (d.children[f].name == "cke:embed") {
                                            if (!a(d.children[f])) break;
                                            return b(c, d)
                                        }
                                    return null
                                }
                                return b(c, d)
                            },
                            "cke:embed": function(d) {
                                return !a(d) ? null : b(c, d)
                            }
                        }
                    }, 5)
                }
            })
        })();
        CKEDITOR.tools.extend(CKEDITOR.config, {
            flashEmbedTagOnly: !1,
            flashAddEmbedTag: !0,
            flashConvertOnEdit: !1
        });
        (function() {
            function a(a) {
                var b =
                    a == "left" ? "pageXOffset" : "pageYOffset";
                return b in h.$ ? h.$[b] : CKEDITOR.document.$.documentElement[a == "left" ? "scrollLeft" : "scrollTop"]
            }

            function b(b) {
                var f, e = b.config,
                    g = e.floatSpaceDockedOffsetX || 0,
                    j = e.floatSpaceDockedOffsetY || 0,
                    k = e.floatSpacePinnedOffsetX || 0,
                    q = e.floatSpacePinnedOffsetY || 0,
                    l = function(c) {
                        function e(a, b, c) {
                            m.setStyle(b, d(c));
                            m.setStyle("position", a)
                        }

                        function n(a) {
                            var b = u.getDocumentPosition();
                            switch (a) {
                                case "top":
                                    e("absolute", "top", b.y - x - j);
                                    break;
                                case "pin":
                                    e("fixed", "top", q);
                                    break;
                                case "bottom":
                                    e("absolute",
                                        "top", b.y + (w.height || w.bottom - w.top) + j)
                            }
                            f = a
                        }
                        c.name == "focus" && m.show();
                        var o = c.name != "scroll";
                        if (o) {
                            m.removeStyle("left");
                            m.removeStyle("right")
                        }
                        var u = b.editable(),
                            v = m.getClientRect(),
                            w = u.getClientRect(),
                            x = v.height,
                            y = a("left");
                        if (f) {
                            f == "top" && v.top < q ? n("pin") : f == "pin" ? w.top > j + x ? n("top") : w.bottom - v.bottom < x && n("bottom") : f == "bottom" && (w.top > j + x ? n("top") : w.bottom > 2 * x + q && n("pin"));
                            if (o) {
                                c = h.getViewPaneSize();
                                o = c.width / 2;
                                v = w.left > 0 && w.right < c.width && w.width > v.width ? b.lang.dir == "rtl" ? "right" : "left" : o - w.left >
                                    w.right - o ? "left" : "right";
                                m.setStyle(v, d((f == "pin" ? k : g) + (v == "left" ? w.left > 0 ? w.left : 0 : w.right < c.width ? c.width - w.right : 0) + y))
                            }
                        } else {
                            f = "pin";
                            n("pin");
                            l(c)
                        }
                    },
                    e = CKEDITOR.document.getBody(),
                    n = {
                        id: b.id,
                        name: b.name,
                        langDir: b.lang.dir,
                        langCode: b.langCode,
                        "z-index": b.config.baseFloatZIndex - 1
                    },
                    o = b.fire("uiSpace", {
                        space: "top",
                        html: ""
                    }).html;
                if (o) {
                    var m = e.append(CKEDITOR.dom.element.createFromHtml(c.output(CKEDITOR.tools.extend({
                        topId: b.ui.spaceId("top"),
                        content: o,
                        style: "display:none;"
                    }, n))));
                    m.unselectable();
                    b.on("focus", function(a) {
                        l(a);
                        h.on("scroll", l);
                        h.on("resize", l)
                    });
                    b.on("blur", function() {
                        m.hide();
                        h.removeListener("scroll", l);
                        h.removeListener("resize", l)
                    });
                    b.on("destroy", function() {
                        h.removeListener("scroll", l);
                        h.removeListener("resize", l);
                        m.clearCustomData();
                        m.remove()
                    });
                    b.focusManager.hasFocus && m.show();
                    b.focusManager.add(m, 1)
                }
            }
            var c = CKEDITOR.addTemplate("floatcontainer", '<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass +
                '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="presentation" style="{style}"><div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>');
            CKEDITOR.plugins.add("floatingspace", {
                init: function(a) {
                    a.on("contentDom", function() {
                        b(a)
                    })
                }
            });
            var h = CKEDITOR.document.getWindow(),
                d = CKEDITOR.tools.cssLength
        })();
        CKEDITOR.plugins.add("listblock", {
            requires: "panel",
            onLoad: function() {
                var a = CKEDITOR.addTemplate("panel-list", '<ul role="presentation" class="cke_panel_list">{items}</ul>'),
                    b = CKEDITOR.addTemplate("panel-list-item", '<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role="option">{text}</a></li>'),
                    c = CKEDITOR.addTemplate("panel-list-group", '<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>');
                CKEDITOR.ui.panel.prototype.addListBlock = function(a, b) {
                    return this.addBlock(a,
                        new CKEDITOR.ui.listBlock(this.getHolderElement(), b))
                };
                CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.panel.block,
                    $: function(a, b) {
                        var b = b || {},
                            c = b.attributes || (b.attributes = {});
                        (this.multiSelect = !!b.multiSelect) && (c["aria-multiselectable"] = true);
                        !c.role && (c.role = "listbox");
                        this.base.apply(this, arguments);
                        c = this.keys;
                        c[40] = "next";
                        c[9] = "next";
                        c[38] = "prev";
                        c[CKEDITOR.SHIFT + 9] = "prev";
                        c[32] = CKEDITOR.env.ie ? "mouseup" : "click";
                        CKEDITOR.env.ie && (c[13] = "mouseup");
                        this._.pendingHtml = [];
                        this._.pendingList = [];
                        this._.items = {};
                        this._.groups = {}
                    },
                    _: {
                        close: function() {
                            if (this._.started) {
                                var b = a.output({
                                    items: this._.pendingList.join("")
                                });
                                this._.pendingList = [];
                                this._.pendingHtml.push(b);
                                delete this._.started
                            }
                        },
                        getClick: function() {
                            if (!this._.click) this._.click = CKEDITOR.tools.addFunction(function(a) {
                                var b = true;
                                this.multiSelect ? b = this.toggle(a) : this.mark(a);
                                if (this.onClick) this.onClick(a, b)
                            }, this);
                            return this._.click
                        }
                    },
                    proto: {
                        add: function(a, c, i) {
                            var f = CKEDITOR.tools.getNextId();
                            if (!this._.started) {
                                this._.started =
                                    1;
                                this._.size = this._.size || 0
                            }
                            this._.items[a] = f;
                            a = {
                                id: f,
                                val: a,
                                onclick: CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick",
                                clickFn: this._.getClick(),
                                title: i || a,
                                text: c || a
                            };
                            this._.pendingList.push(b.output(a))
                        },
                        startGroup: function(a) {
                            this._.close();
                            var b = CKEDITOR.tools.getNextId();
                            this._.groups[a] = b;
                            this._.pendingHtml.push(c.output({
                                id: b,
                                label: a
                            }))
                        },
                        commit: function() {
                            this._.close();
                            this.element.appendHtml(this._.pendingHtml.join(""));
                            delete this._.size;
                            this._.pendingHtml = []
                        },
                        toggle: function(a) {
                            var b =
                                this.isMarked(a);
                            b ? this.unmark(a) : this.mark(a);
                            return !b
                        },
                        hideGroup: function(a) {
                            var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
                            if (a) {
                                a.setStyle("display", "none");
                                b && b.getName() == "ul" && b.setStyle("display", "none")
                            }
                        },
                        hideItem: function(a) {
                            this.element.getDocument().getById(this._.items[a]).setStyle("display", "none")
                        },
                        showAll: function() {
                            var a = this._.items,
                                b = this._.groups,
                                c = this.element.getDocument(),
                                f;
                            for (f in a) c.getById(a[f]).setStyle("display", "");
                            for (var e in b) {
                                a = c.getById(b[e]);
                                f = a.getNext();
                                a.setStyle("display", "");
                                f && f.getName() == "ul" && f.setStyle("display", "")
                            }
                        },
                        mark: function(a) {
                            this.multiSelect || this.unmarkAll();
                            var a = this._.items[a],
                                b = this.element.getDocument().getById(a);
                            b.addClass("cke_selected");
                            this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", true);
                            this.onMark && this.onMark(b)
                        },
                        unmark: function(a) {
                            var b = this.element.getDocument(),
                                a = this._.items[a],
                                c = b.getById(a);
                            c.removeClass("cke_selected");
                            b.getById(a + "_option").removeAttribute("aria-selected");
                            this.onUnmark && this.onUnmark(c)
                        },
                        unmarkAll: function() {
                            var a = this._.items,
                                b = this.element.getDocument(),
                                c;
                            for (c in a) {
                                var f = a[c];
                                b.getById(f).removeClass("cke_selected");
                                b.getById(f + "_option").removeAttribute("aria-selected")
                            }
                            this.onUnmark && this.onUnmark()
                        },
                        isMarked: function(a) {
                            return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")
                        },
                        focus: function(a) {
                            this._.focusIndex = -1;
                            if (a) {
                                for (var b = this.element.getDocument().getById(this._.items[a]).getFirst(), a = this.element.getElementsByTag("a"),
                                        c, f = -1; c = a.getItem(++f);)
                                    if (c.equals(b)) {
                                        this._.focusIndex = f;
                                        break
                                    }
                                setTimeout(function() {
                                    b.focus()
                                }, 0)
                            }
                        }
                    }
                })
            }
        });
        CKEDITOR.plugins.add("richcombo", {
            requires: "floatpanel,listblock,button",
            beforeInit: function(a) {
                a.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler)
            }
        });
        (function() {
            var a = '<span id="{id}" class="cke_combo cke_combo__{name}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" hidefocus=true title="{title}" tabindex="-1"' +
                (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" : '" href="javascript:void(\'{titleJs}\')"') + ' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"';
            if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) a = a + ' onkeypress="return false;"';
            CKEDITOR.env.gecko && (a = a + ' onblur="this.style.cssText = this.style.cssText;"');
            var a = a + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' +
                    (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : CKEDITOR.env.air ? "&nbsp;" : "") + "</span></span></a></span>"),
                b = CKEDITOR.addTemplate("combo", a);
            CKEDITOR.UI_RICHCOMBO = "richcombo";
            CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                $: function(a) {
                    CKEDITOR.tools.extend(this,
                        a, {
                            canGroup: false,
                            title: a.label,
                            modes: {
                                wysiwyg: 1
                            },
                            editorFocus: 1
                        });
                    a = this.panel || {};
                    delete this.panel;
                    this.id = CKEDITOR.tools.getNextNumber();
                    this.document = a && a.parent && a.parent.getDocument() || CKEDITOR.document;
                    a.className = "cke_combopanel";
                    a.block = {
                        multiSelect: a.multiSelect,
                        attributes: a.attributes
                    };
                    this._ = {
                        panelDefinition: a,
                        items: {},
                        state: CKEDITOR.TRISTATE_OFF
                    }
                },
                proto: {
                    renderHtml: function(a) {
                        var b = [];
                        this.render(a, b);
                        return b.join("")
                    },
                    render: function(a, h) {
                        function d() {
                            var b = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF :
                                CKEDITOR.TRISTATE_DISABLED;
                            this.setState(a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b);
                            this.setValue("")
                        }
                        var i = CKEDITOR.env,
                            f = "cke_" + this.id,
                            e = CKEDITOR.tools.addFunction(function(b) {
                                var d = this._;
                                if (d.state != CKEDITOR.TRISTATE_DISABLED) {
                                    this.createPanel(a);
                                    if (d.on) d.panel.hide();
                                    else {
                                        this.commit();
                                        var f = this.getValue();
                                        f ? d.list.mark(f) : d.list.unmarkAll();
                                        d.panel.showBlock(this.id, new CKEDITOR.dom.element(b), 4)
                                    }
                                }
                            }, this),
                            g = {
                                id: f,
                                combo: this,
                                focus: function() {
                                    CKEDITOR.document.getById(f).getChild(1).focus()
                                },
                                clickFn: e
                            };
                        a.on("mode", d, this);
                        !this.readOnly && a.on("readOnly", d, this);
                        var j = CKEDITOR.tools.addFunction(function(a, b) {
                                var a = new CKEDITOR.dom.event(a),
                                    c = a.getKeystroke();
                                switch (c) {
                                    case 13:
                                    case 32:
                                    case 40:
                                        CKEDITOR.tools.callFunction(e, b);
                                        break;
                                    default:
                                        g.onkey(g, c)
                                }
                                a.preventDefault()
                            }),
                            k = CKEDITOR.tools.addFunction(function() {
                                g.onfocus && g.onfocus()
                            });
                        g.keyDownFn = j;
                        i = {
                            id: f,
                            name: this.name || this.command,
                            label: this.label,
                            title: this.title,
                            titleJs: i.gecko && i.version >= 10900 && !i.hc ? "" : (this.title || "").replace("'",
                                ""),
                            keydownFn: j,
                            focusFn: k,
                            clickFn: e
                        };
                        b.output(i, h);
                        if (this.onRender) this.onRender();
                        return g
                    },
                    createPanel: function(a) {
                        if (!this._.panel) {
                            var b = this._.panelDefinition,
                                d = this._.panelDefinition.block,
                                i = b.parent || CKEDITOR.document.getBody(),
                                f = "cke_combopanel__" + this.name,
                                e = new CKEDITOR.ui.floatPanel(a, i, b),
                                g = e.addListBlock(this.id, d),
                                j = this;
                            e.onShow = function() {
                                this.element.addClass(f);
                                j.setState(CKEDITOR.TRISTATE_ON);
                                g.focus(!j.multiSelect && j.getValue());
                                j._.on = 1;
                                j.editorFocus && a.focus();
                                if (j.onOpen) j.onOpen()
                            };
                            e.onHide = function(b) {
                                this.element.removeClass(f);
                                j.setState(j.modes && j.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                j._.on = 0;
                                if (!b && j.onClose) j.onClose()
                            };
                            e.onEscape = function() {
                                e.hide(1)
                            };
                            g.onClick = function(a, b) {
                                j.onClick && j.onClick.call(j, a, b);
                                b ? j.setValue(a, j._.items[a]) : j.setValue("");
                                e.hide()
                            };
                            this._.panel = e;
                            this._.list = g;
                            e.getBlock(this.id).onHide = function() {
                                j._.on = 0;
                                j.setState(CKEDITOR.TRISTATE_OFF)
                            };
                            this.init && this.init()
                        }
                    },
                    setValue: function(a, b) {
                        this._.value = a;
                        var d = this.document.getById("cke_" +
                            this.id + "_text");
                        if (d) {
                            if (!a && !b) {
                                b = this.label;
                                d.addClass("cke_combo_inlinelabel")
                            } else d.removeClass("cke_combo_inlinelabel");
                            d.setText(typeof b != "undefined" ? b : a)
                        }
                    },
                    getValue: function() {
                        return this._.value || ""
                    },
                    unmarkAll: function() {
                        this._.list.unmarkAll()
                    },
                    mark: function(a) {
                        this._.list.mark(a)
                    },
                    hideItem: function(a) {
                        this._.list.hideItem(a)
                    },
                    hideGroup: function(a) {
                        this._.list.hideGroup(a)
                    },
                    showAll: function() {
                        this._.list.showAll()
                    },
                    add: function(a, b, d) {
                        this._.items[a] = d || a;
                        this._.list.add(a, b, d)
                    },
                    startGroup: function(a) {
                        this._.list.startGroup(a)
                    },
                    commit: function() {
                        if (!this._.committed) {
                            this._.list.commit();
                            this._.committed = 1;
                            CKEDITOR.ui.fire("ready", this)
                        }
                        this._.committed = 1
                    },
                    setState: function(a) {
                        if (this._.state != a) {
                            this.document.getById("cke_" + this.id).setState(a);
                            this._.state = a
                        }
                    }
                },
                statics: {
                    handler: {
                        create: function(a) {
                            return new CKEDITOR.ui.richCombo(a)
                        }
                    }
                }
            });
            CKEDITOR.ui.prototype.addRichCombo = function(a, b) {
                this.add(a, CKEDITOR.UI_RICHCOMBO, b)
            }
        })();
        (function() {
            function a(a, c, h, d, i, f, e, g) {
                for (var j = a.config, k = i.split(";"), i = [], q = {}, l = 0; l < k.length; l++) {
                    var n =
                        k[l];
                    if (n) {
                        var n = n.split("/"),
                            o = {},
                            m = k[l] = n[0];
                        o[h] = i[l] = n[1] || m;
                        q[m] = new CKEDITOR.style(e, o);
                        q[m]._.definition.name = m
                    } else k.splice(l--, 1)
                }
                a.ui.addRichCombo(c, {
                    label: d.label,
                    title: d.panelTitle,
                    toolbar: "styles," + g,
                    panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(j.contentsCss),
                        multiSelect: false,
                        attributes: {
                            "aria-label": d.panelTitle
                        }
                    },
                    init: function() {
                        this.startGroup(d.panelTitle);
                        for (var a = 0; a < k.length; a++) {
                            var b = k[a];
                            this.add(b, q[b].buildPreview(), b)
                        }
                    },
                    onClick: function(c) {
                        a.focus();
                        a.fire("saveSnapshot");
                        var d = q[c];
                        a[this.getValue() == c ? "removeStyle" : "applyStyle"](d);
                        a.fire("saveSnapshot")
                    },
                    onRender: function() {
                        a.on("selectionChange", function(a) {
                            for (var b = this.getValue(), a = a.data.path.elements, c = 0, d; c < a.length; c++) {
                                d = a[c];
                                for (var e in q)
                                    if (q[e].checkElementMatch(d, true)) {
                                        e != b && this.setValue(e);
                                        return
                                    }
                            }
                            this.setValue("", f)
                        }, this)
                    }
                })
            }
            CKEDITOR.plugins.add("font", {
                requires: "richcombo",
                init: function(b) {
                    var c = b.config;
                    a(b, "Font", "family", b.lang.font, c.font_names, c.font_defaultLabel, c.font_style, 30);
                    a(b, "FontSize",
                        "size", b.lang.font.fontSize, c.fontSize_sizes, c.fontSize_defaultLabel, c.fontSize_style, 40)
                }
            })
        })();
        CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif";
        CKEDITOR.config.font_defaultLabel =
            "";
        CKEDITOR.config.font_style = {
            element: "span",
            styles: {
                "font-family": "#(family)"
            },
            overrides: [{
                element: "font",
                attributes: {
                    face: null
                }
            }]
        };
        CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px";
        CKEDITOR.config.fontSize_defaultLabel = "";
        CKEDITOR.config.fontSize_style = {
            element: "span",
            styles: {
                "font-size": "#(size)"
            },
            overrides: [{
                element: "font",
                attributes: {
                    size: null
                }
            }]
        };
        CKEDITOR.plugins.add("format", {
            requires: "richcombo",
            init: function(a) {
                if (!a.blockless) {
                    for (var b = a.config, c = a.lang.format, h = b.format_tags.split(";"), d = {}, i = 0; i < h.length; i++) {
                        var f = h[i];
                        d[f] = new CKEDITOR.style(b["format_" + f]);
                        d[f]._.enterMode = a.config.enterMode
                    }
                    a.ui.addRichCombo("Format", {
                        label: c.label,
                        title: c.panelTitle,
                        toolbar: "styles,20",
                        panel: {
                            css: [CKEDITOR.skin.getPath("editor")].concat(b.contentsCss),
                            multiSelect: false,
                            attributes: {
                                "aria-label": c.panelTitle
                            }
                        },
                        init: function() {
                            this.startGroup(c.panelTitle);
                            for (var a in d) {
                                var b = c["tag_" + a];
                                this.add(a,
                                    d[a].buildPreview(b), b)
                            }
                        },
                        onClick: function(b) {
                            a.focus();
                            a.fire("saveSnapshot");
                            var b = d[b],
                                c = a.elementPath();
                            a[b.checkActive(c) ? "removeStyle" : "applyStyle"](b);
                            setTimeout(function() {
                                a.fire("saveSnapshot")
                            }, 0)
                        },
                        onRender: function() {
                            a.on("selectionChange", function(b) {
                                var c = this.getValue(),
                                    b = b.data.path;
                                if (b.isContextFor("p")) {
                                    this.setState(CKEDITOR.TRISTATE_OFF);
                                    for (var f in d)
                                        if (d[f].checkActive(b)) {
                                            f != c && this.setValue(f, a.lang.format["tag_" + f]);
                                            return
                                        }
                                } else this.setState(CKEDITOR.TRISTATE_DISABLED);
                                this.setValue("")
                            }, this)
                        }
                    })
                }
            }
        });
        CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div";
        CKEDITOR.config.format_p = {
            element: "p"
        };
        CKEDITOR.config.format_div = {
            element: "div"
        };
        CKEDITOR.config.format_pre = {
            element: "pre"
        };
        CKEDITOR.config.format_address = {
            element: "address"
        };
        CKEDITOR.config.format_h1 = {
            element: "h1"
        };
        CKEDITOR.config.format_h2 = {
            element: "h2"
        };
        CKEDITOR.config.format_h3 = {
            element: "h3"
        };
        CKEDITOR.config.format_h4 = {
            element: "h4"
        };
        CKEDITOR.config.format_h5 = {
            element: "h5"
        };
        CKEDITOR.config.format_h6 = {
            element: "h6"
        };
        CKEDITOR.plugins.add("forms", {
            requires: "dialog,fakeobjects",
            onLoad: function() {
                CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n");
                CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}")
            },
            init: function(a) {
                var b = a.lang,
                    c = 0,
                    h = function(d, e, g) {
                        var h = {};
                        e == "form" && (h.context =
                            "form");
                        a.addCommand(e, new CKEDITOR.dialogCommand(e, h));
                        a.ui.addButton && a.ui.addButton(d, {
                            label: b.common[d.charAt(0).toLowerCase() + d.slice(1)],
                            command: e,
                            toolbar: "forms," + (c = c + 10)
                        });
                        CKEDITOR.dialog.add(e, g)
                    },
                    d = this.path + "dialogs/";
                !a.blockless && h("Form", "form", d + "form.js");
                h("Checkbox", "checkbox", d + "checkbox.js");
                h("Radio", "radio", d + "radio.js");
                h("TextField", "textfield", d + "textfield.js");
                h("Textarea", "textarea", d + "textarea.js");
                h("Select", "select", d + "select.js");
                h("Button", "button", d + "button.js");
                var i = CKEDITOR.plugins.get("image");
                i && h("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") + "dialogs/image.js");
                h("HiddenField", "hiddenfield", d + "hiddenfield.js");
                if (a.addMenuItems) {
                    h = {
                        checkbox: {
                            label: b.forms.checkboxAndRadio.checkboxTitle,
                            command: "checkbox",
                            group: "checkbox"
                        },
                        radio: {
                            label: b.forms.checkboxAndRadio.radioTitle,
                            command: "radio",
                            group: "radio"
                        },
                        textfield: {
                            label: b.forms.textfield.title,
                            command: "textfield",
                            group: "textfield"
                        },
                        hiddenfield: {
                            label: b.forms.hidden.title,
                            command: "hiddenfield",
                            group: "hiddenfield"
                        },
                        imagebutton: {
                            label: b.image.titleButton,
                            command: "imagebutton",
                            group: "imagebutton"
                        },
                        button: {
                            label: b.forms.button.title,
                            command: "button",
                            group: "button"
                        },
                        select: {
                            label: b.forms.select.title,
                            command: "select",
                            group: "select"
                        },
                        textarea: {
                            label: b.forms.textarea.title,
                            command: "textarea",
                            group: "textarea"
                        }
                    };
                    !a.blockless && (h.form = {
                        label: b.forms.form.menu,
                        command: "form",
                        group: "form"
                    });
                    a.addMenuItems(h)
                }
                if (a.contextMenu) {
                    !a.blockless && a.contextMenu.addListener(function(a, b, c) {
                        if ((a = c.contains("form",
                                1)) && !a.isReadOnly()) return {
                            form: CKEDITOR.TRISTATE_OFF
                        }
                    });
                    a.contextMenu.addListener(function(a) {
                        if (a && !a.isReadOnly()) {
                            var b = a.getName();
                            if (b == "select") return {
                                select: CKEDITOR.TRISTATE_OFF
                            };
                            if (b == "textarea") return {
                                textarea: CKEDITOR.TRISTATE_OFF
                            };
                            if (b == "input") switch (a.getAttribute("type")) {
                                case "button":
                                case "submit":
                                case "reset":
                                    return {
                                        button: CKEDITOR.TRISTATE_OFF
                                    };
                                case "checkbox":
                                    return {
                                        checkbox: CKEDITOR.TRISTATE_OFF
                                    };
                                case "radio":
                                    return {
                                        radio: CKEDITOR.TRISTATE_OFF
                                    };
                                case "image":
                                    return i ? {
                                            imagebutton: CKEDITOR.TRISTATE_OFF
                                        } :
                                        null;
                                default:
                                    return {
                                        textfield: CKEDITOR.TRISTATE_OFF
                                    }
                            }
                            if (b == "img" && a.data("cke-real-element-type") == "hiddenfield") return {
                                hiddenfield: CKEDITOR.TRISTATE_OFF
                            }
                        }
                    })
                }
                a.on("doubleclick", function(b) {
                    var c = b.data.element;
                    if (!a.blockless && c.is("form")) b.data.dialog = "form";
                    else if (c.is("select")) b.data.dialog = "select";
                    else if (c.is("textarea")) b.data.dialog = "textarea";
                    else if (c.is("img") && c.data("cke-real-element-type") == "hiddenfield") b.data.dialog = "hiddenfield";
                    else if (c.is("input")) switch (c.getAttribute("type")) {
                        case "button":
                        case "submit":
                        case "reset":
                            b.data.dialog =
                                "button";
                            break;
                        case "checkbox":
                            b.data.dialog = "checkbox";
                            break;
                        case "radio":
                            b.data.dialog = "radio";
                            break;
                        case "image":
                            b.data.dialog = "imagebutton";
                            break;
                        default:
                            b.data.dialog = "textfield"
                    }
                })
            },
            afterInit: function(a) {
                var b = a.dataProcessor,
                    c = b && b.htmlFilter,
                    b = b && b.dataFilter;
                CKEDITOR.env.ie && c && c.addRules({
                    elements: {
                        input: function(a) {
                            var a = a.attributes,
                                b = a.type;
                            if (!b) a.type = "text";
                            (b == "checkbox" || b == "radio") && a.value == "on" && delete a.value
                        }
                    }
                });
                b && b.addRules({
                    elements: {
                        input: function(b) {
                            if (b.attributes.type ==
                                "hidden") return a.createFakeParserElement(b, "cke_hidden", "hiddenfield")
                        }
                    }
                })
            }
        });
        CKEDITOR.env.ie && (CKEDITOR.dom.element.prototype.hasAttribute = CKEDITOR.tools.override(CKEDITOR.dom.element.prototype.hasAttribute, function(a) {
            return function(b) {
                this.$.attributes.getNamedItem(b);
                if (this.getName() == "input") switch (b) {
                    case "class":
                        return this.$.className.length > 0;
                    case "checked":
                        return !!this.$.checked;
                    case "value":
                        var c = this.getAttribute("type");
                        return c == "checkbox" || c == "radio" ? this.$.value != "on" : this.$.value
                }
                return a.apply(this,
                    arguments)
            }
        }));
        (function() {
            var a = {
                canUndo: false,
                exec: function(a) {
                    var c = a.document.createElement("hr");
                    a.insertElement(c)
                }
            };
            CKEDITOR.plugins.add("horizontalrule", {
                init: function(b) {
                    if (!b.blockless) {
                        b.addCommand("horizontalrule", a);
                        b.ui.addButton && b.ui.addButton("HorizontalRule", {
                            label: b.lang.horizontalrule.toolbar,
                            command: "horizontalrule",
                            toolbar: "insert,40"
                        })
                    }
                }
            })
        })();
        CKEDITOR.plugins.add("htmlwriter", {
            init: function(a) {
                var b = new CKEDITOR.htmlWriter;
                b.forceSimpleAmpersand = a.config.forceSimpleAmpersand;
                b.indentationChars = a.config.dataIndentationChars || "\t";
                a.dataProcessor.writer = b
            }
        });
        CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
            base: CKEDITOR.htmlParser.basicWriter,
            $: function() {
                this.base();
                this.indentationChars = "\t";
                this.selfClosingEnd = " />";
                this.lineBreakChars = "\n";
                this.sortAttributes = 1;
                this._.indent = 0;
                this._.indentation = "";
                this._.inPre = 0;
                this._.rules = {};
                var a = CKEDITOR.dtd,
                    b;
                for (b in CKEDITOR.tools.extend({}, a.$nonBodyContent, a.$block, a.$listItem, a.$tableContent)) this.setRules(b, {
                    indent: !a[b]["#"],
                    breakBeforeOpen: 1,
                    breakBeforeClose: !a[b]["#"],
                    breakAfterClose: 1,
                    needsSpace: b in a.$block && !(b in {
                        li: 1,
                        dt: 1,
                        dd: 1
                    })
                });
                this.setRules("br", {
                    breakAfterOpen: 1
                });
                this.setRules("title", {
                    indent: 0,
                    breakAfterOpen: 0
                });
                this.setRules("style", {
                    indent: 0,
                    breakBeforeClose: 1
                });
                this.setRules("pre", {
                    breakAfterOpen: 1,
                    indent: 0
                })
            },
            proto: {
                openTag: function(a) {
                    var b = this._.rules[a];
                    this._.afterCloser && (b && b.needsSpace && this._.needsSpace) && this._.output.push("\n");
                    if (this._.indent) this.indentation();
                    else if (b && b.breakBeforeOpen) {
                        this.lineBreak();
                        this.indentation()
                    }
                    this._.output.push("<", a);
                    this._.afterCloser = 0
                },
                openTagClose: function(a, b) {
                    var c = this._.rules[a];
                    if (b) {
                        this._.output.push(this.selfClosingEnd);
                        if (c && c.breakAfterClose) this._.needsSpace = c.needsSpace
                    } else {
                        this._.output.push(">");
                        if (c && c.indent) this._.indentation = this._.indentation + this.indentationChars
                    }
                    c && c.breakAfterOpen && this.lineBreak();
                    a == "pre" && (this._.inPre = 1)
                },
                attribute: function(a, b) {
                    if (typeof b == "string") {
                        this.forceSimpleAmpersand && (b = b.replace(/&amp;/g, "&"));
                        b = CKEDITOR.tools.htmlEncodeAttr(b)
                    }
                    this._.output.push(" ",
                        a, '="', b, '"')
                },
                closeTag: function(a) {
                    var b = this._.rules[a];
                    if (b && b.indent) this._.indentation = this._.indentation.substr(this.indentationChars.length);
                    if (this._.indent) this.indentation();
                    else if (b && b.breakBeforeClose) {
                        this.lineBreak();
                        this.indentation()
                    }
                    this._.output.push("</", a, ">");
                    a == "pre" && (this._.inPre = 0);
                    if (b && b.breakAfterClose) {
                        this.lineBreak();
                        this._.needsSpace = b.needsSpace
                    }
                    this._.afterCloser = 1
                },
                text: function(a) {
                    if (this._.indent) {
                        this.indentation();
                        !this._.inPre && (a = CKEDITOR.tools.ltrim(a))
                    }
                    this._.output.push(a)
                },
                comment: function(a) {
                    this._.indent && this.indentation();
                    this._.output.push("<\!--", a, "--\>")
                },
                lineBreak: function() {
                    !this._.inPre && this._.output.length > 0 && this._.output.push(this.lineBreakChars);
                    this._.indent = 1
                },
                indentation: function() {
                    !this._.inPre && this._.indentation && this._.output.push(this._.indentation);
                    this._.indent = 0
                },
                reset: function() {
                    this._.output = [];
                    this._.indent = 0;
                    this._.indentation = "";
                    this._.afterCloser = 0;
                    this._.inPre = 0
                },
                setRules: function(a, b) {
                    var c = this._.rules[a];
                    c ? CKEDITOR.tools.extend(c,
                        b, true) : this._.rules[a] = b
                }
            }
        });
        (function() {
            CKEDITOR.plugins.add("iframe", {
                requires: "dialog,fakeobjects",
                onLoad: function() {
                    CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
                },
                init: function(a) {
                    var b = a.lang.iframe;
                    CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js");
                    a.addCommand("iframe", new CKEDITOR.dialogCommand("iframe"));
                    a.ui.addButton && a.ui.addButton("Iframe", {
                        label: b.toolbar,
                        command: "iframe",
                        toolbar: "insert,80"
                    });
                    a.on("doubleclick", function(a) {
                        var b = a.data.element;
                        if (b.is("img") && b.data("cke-real-element-type") == "iframe") a.data.dialog = "iframe"
                    });
                    a.addMenuItems && a.addMenuItems({
                        iframe: {
                            label: b.title,
                            command: "iframe",
                            group: "image"
                        }
                    });
                    a.contextMenu && a.contextMenu.addListener(function(a) {
                        if (a && a.is("img") && a.data("cke-real-element-type") == "iframe") return {
                            iframe: CKEDITOR.TRISTATE_OFF
                        }
                    })
                },
                afterInit: function(a) {
                    var b =
                        a.dataProcessor;
                    (b = b && b.dataFilter) && b.addRules({
                        elements: {
                            iframe: function(b) {
                                return a.createFakeParserElement(b, "cke_iframe", "iframe", true)
                            }
                        }
                    })
                }
            })
        })();
        (function() {
            function a(a, b) {
                if (!b) var d = a.getSelection(),
                    b = d.getType() == CKEDITOR.SELECTION_ELEMENT && d.getSelectedElement();
                if (b && b.is("img") && !b.data("cke-realelement") && !b.isReadOnly()) return b
            }

            function b(a) {
                var b = a.getStyle("float");
                if (b == "inherit" || b == "none") b = 0;
                b || (b = a.getAttribute("align"));
                return b
            }
            CKEDITOR.plugins.add("image", {
                requires: "dialog",
                init: function(b) {
                    CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
                    b.addCommand("image", new CKEDITOR.dialogCommand("image"));
                    b.ui.addButton && b.ui.addButton("Image", {
                        label: b.lang.common.image,
                        command: "image",
                        toolbar: "insert,10"
                    });
                    b.on("doubleclick", function(a) {
                        var b = a.data.element;
                        if (b.is("img") && !b.data("cke-realelement") && !b.isReadOnly()) a.data.dialog = "image"
                    });
                    b.addMenuItems && b.addMenuItems({
                        image: {
                            label: b.lang.image.menu,
                            command: "image",
                            group: "image"
                        }
                    });
                    b.contextMenu && b.contextMenu.addListener(function(h) {
                        if (a(b,
                                h)) return {
                            image: CKEDITOR.TRISTATE_OFF
                        }
                    })
                },
                afterInit: function(c) {
                    function h(d) {
                        var h = c.getCommand("justify" + d);
                        if (h) {
                            if (d == "left" || d == "right") h.on("exec", function(f) {
                                var e = a(c),
                                    g;
                                if (e) {
                                    g = b(e);
                                    if (g == d) {
                                        e.removeStyle("float");
                                        d == b(e) && e.removeAttribute("align")
                                    } else e.setStyle("float", d);
                                    f.cancel()
                                }
                            });
                            h.on("refresh", function(f) {
                                var e = a(c);
                                if (e) {
                                    e = b(e);
                                    this.setState(e == d ? CKEDITOR.TRISTATE_ON : d == "right" || d == "left" ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                    f.cancel()
                                }
                            })
                        }
                    }
                    h("left");
                    h("right");
                    h("center");
                    h("block")
                }
            })
        })();
        CKEDITOR.config.image_removeLinkByEmptyURL = !0;
        (function() {
            function a(a, b) {
                var b = b === void 0 || b,
                    c;
                if (b) c = a.getComputedStyle("text-align");
                else {
                    for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) {
                        c = a.getParent();
                        if (!c) break;
                        a = c
                    }
                    c = a.getStyle("text-align") || a.getAttribute("align") || ""
                }
                c && (c = c.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, ""));
                !c && b && (c = a.getComputedStyle("direction") == "rtl" ? "right" : "left");
                return c
            }

            function b(a, b, c) {
                this.editor = a;
                this.name = b;
                this.value = c;
                this.context = "p";
                if (a = a.config.justifyClasses) {
                    switch (c) {
                        case "left":
                            this.cssClassName = a[0];
                            break;
                        case "center":
                            this.cssClassName = a[1];
                            break;
                        case "right":
                            this.cssClassName = a[2];
                            break;
                        case "justify":
                            this.cssClassName = a[3]
                    }
                    this.cssClassRegex = RegExp("(?:^|\\s+)(?:" + a.join("|") + ")(?=$|\\s)")
                }
            }

            function c(a) {
                var b = a.editor,
                    c = b.createRange();
                c.setStartBefore(a.data.node);
                c.setEndAfter(a.data.node);
                for (var f = new CKEDITOR.dom.walker(c), e; e = f.next();)
                    if (e.type == CKEDITOR.NODE_ELEMENT)
                        if (!e.equals(a.data.node) &&
                            e.getDirection()) {
                            c.setStartAfter(e);
                            f = new CKEDITOR.dom.walker(c)
                        } else {
                            var g = b.config.justifyClasses;
                            if (g)
                                if (e.hasClass(g[0])) {
                                    e.removeClass(g[0]);
                                    e.addClass(g[2])
                                } else if (e.hasClass(g[2])) {
                                e.removeClass(g[2]);
                                e.addClass(g[0])
                            }
                            g = e.getStyle("text-align");
                            g == "left" ? e.setStyle("text-align", "right") : g == "right" && e.setStyle("text-align", "left")
                        }
            }
            b.prototype = {
                exec: function(b) {
                    var c = b.getSelection(),
                        i = b.config.enterMode;
                    if (c) {
                        for (var f = c.createBookmarks(), e = c.getRanges(true), g = this.cssClassName, j, k, q = b.config.useComputedState,
                                q = q === void 0 || q, l = e.length - 1; l >= 0; l--) {
                            j = e[l].createIterator();
                            for (j.enlargeBr = i != CKEDITOR.ENTER_BR; k = j.getNextParagraph(i == CKEDITOR.ENTER_P ? "p" : "div");) {
                                k.removeAttribute("align");
                                k.removeStyle("text-align");
                                var n = g && (k.$.className = CKEDITOR.tools.ltrim(k.$.className.replace(this.cssClassRegex, ""))),
                                    o = this.state == CKEDITOR.TRISTATE_OFF && (!q || a(k, true) != this.value);
                                g ? o ? k.addClass(g) : n || k.removeAttribute("class") : o && k.setStyle("text-align", this.value)
                            }
                        }
                        b.focus();
                        b.forceNextSelectionCheck();
                        c.selectBookmarks(f)
                    }
                },
                refresh: function(b, c) {
                    var i = c.block || c.blockLimit;
                    this.setState(i.getName() != "body" && a(i, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                }
            };
            CKEDITOR.plugins.add("justify", {
                init: function(a) {
                    if (!a.blockless) {
                        var d = new b(a, "justifyleft", "left"),
                            i = new b(a, "justifycenter", "center"),
                            f = new b(a, "justifyright", "right"),
                            e = new b(a, "justifyblock", "justify");
                        a.addCommand("justifyleft", d);
                        a.addCommand("justifycenter", i);
                        a.addCommand("justifyright", f);
                        a.addCommand("justifyblock",
                            e);
                        if (a.ui.addButton) {
                            a.ui.addButton("JustifyLeft", {
                                label: a.lang.justify.left,
                                command: "justifyleft",
                                toolbar: "align,10"
                            });
                            a.ui.addButton("JustifyCenter", {
                                label: a.lang.justify.center,
                                command: "justifycenter",
                                toolbar: "align,20"
                            });
                            a.ui.addButton("JustifyRight", {
                                label: a.lang.justify.right,
                                command: "justifyright",
                                toolbar: "align,30"
                            });
                            a.ui.addButton("JustifyBlock", {
                                label: a.lang.justify.block,
                                command: "justifyblock",
                                toolbar: "align,40"
                            })
                        }
                        a.on("dirChanged", c)
                    }
                }
            })
        })();
        CKEDITOR.plugins.add("link", {
            requires: "dialog,fakeobjects",
            onLoad: function() {
                function a(a) {
                    return c.replace(/%1/g, a == "rtl" ? "right" : "left").replace(/%2/g, "cke_contents_" + a)
                }
                var b = "background:url(" + CKEDITOR.getUrl(this.path + "images/anchor.gif") + ") no-repeat %1 center;border:1px dotted #00f;",
                    c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty" + (CKEDITOR.env.ie && CKEDITOR.env.version < 7 ? "" : ",.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]") + "{" + b + "padding-%1:18px;cursor:auto;}" + (CKEDITOR.env.ie ? "a.cke_anchor_empty{display:inline-block;}" : "") + ".%2 img.cke_anchor{" +
                    b + "width:16px;min-height:15px;height:1.15em;vertical-align:" + (CKEDITOR.env.opera ? "middle" : "text-bottom") + ";}";
                CKEDITOR.addCss(a("ltr") + a("rtl"))
            },
            init: function(a) {
                a.addCommand("link", new CKEDITOR.dialogCommand("link"));
                a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor"));
                a.addCommand("unlink", new CKEDITOR.unlinkCommand);
                a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
                a.setKeystroke(CKEDITOR.CTRL + 76, "link");
                if (a.ui.addButton) {
                    a.ui.addButton("Link", {
                        label: a.lang.link.toolbar,
                        command: "link",
                        toolbar: "links,10"
                    });
                    a.ui.addButton("Unlink", {
                        label: a.lang.link.unlink,
                        command: "unlink",
                        toolbar: "links,20"
                    });
                    a.ui.addButton("Anchor", {
                        label: a.lang.link.anchor.toolbar,
                        command: "anchor",
                        toolbar: "links,30"
                    })
                }
                CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
                CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
                a.on("doubleclick", function(b) {
                    var c = CKEDITOR.plugins.link.getSelectedLink(a) || b.data.element;
                    if (!c.isReadOnly())
                        if (c.is("a")) {
                            b.data.dialog = c.getAttribute("name") && (!c.getAttribute("href") ||
                                !c.getChildCount()) ? "anchor" : "link";
                            a.getSelection().selectElement(c)
                        } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c)) b.data.dialog = "anchor"
                });
                a.addMenuItems && a.addMenuItems({
                    anchor: {
                        label: a.lang.link.anchor.menu,
                        command: "anchor",
                        group: "anchor",
                        order: 1
                    },
                    removeAnchor: {
                        label: a.lang.link.anchor.remove,
                        command: "removeAnchor",
                        group: "anchor",
                        order: 5
                    },
                    link: {
                        label: a.lang.link.menu,
                        command: "link",
                        group: "link",
                        order: 1
                    },
                    unlink: {
                        label: a.lang.link.unlink,
                        command: "unlink",
                        group: "link",
                        order: 5
                    }
                });
                a.contextMenu &&
                    a.contextMenu.addListener(function(b) {
                        if (!b || b.isReadOnly()) return null;
                        b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b);
                        if (!b && !(b = CKEDITOR.plugins.link.getSelectedLink(a))) return null;
                        var c = {};
                        b.getAttribute("href") && b.getChildCount() && (c = {
                            link: CKEDITOR.TRISTATE_OFF,
                            unlink: CKEDITOR.TRISTATE_OFF
                        });
                        if (b && b.hasAttribute("name")) c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF;
                        return c
                    })
            },
            afterInit: function(a) {
                var b = a.dataProcessor,
                    c = b && b.dataFilter,
                    b = b && b.htmlFilter,
                    h = a._.elementsPath && a._.elementsPath.filters;
                c && c.addRules({
                    elements: {
                        a: function(b) {
                            var c = b.attributes;
                            if (!c.name) return null;
                            var f = !b.children.length;
                            if (CKEDITOR.plugins.link.synAnchorSelector) {
                                var b = f ? "cke_anchor_empty" : "cke_anchor",
                                    e = c["class"];
                                if (c.name && (!e || e.indexOf(b) < 0)) c["class"] = (e || "") + " " + b;
                                if (f && CKEDITOR.plugins.link.emptyAnchorFix) {
                                    c.contenteditable = "false";
                                    c["data-cke-editable"] = 1
                                }
                            } else if (CKEDITOR.plugins.link.fakeAnchor && f) return a.createFakeParserElement(b, "cke_anchor", "anchor");
                            return null
                        }
                    }
                });
                CKEDITOR.plugins.link.emptyAnchorFix &&
                    b && b.addRules({
                        elements: {
                            a: function(a) {
                                delete a.attributes.contenteditable
                            }
                        }
                    });
                h && h.push(function(b, c) {
                    if (c == "a" && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b) || b.getAttribute("name") && (!b.getAttribute("href") || !b.getChildCount()))) return "anchor"
                })
            }
        });
        CKEDITOR.plugins.link = {
            getSelectedLink: function(a) {
                var b = a.getSelection(),
                    c = b.getSelectedElement();
                if (c && c.is("a")) return c;
                b = b.getRanges(true)[0];
                b.shrink(CKEDITOR.SHRINK_TEXT);
                return a.elementPath(b.getCommonAncestor()).contains("a", 1)
            },
            fakeAnchor: CKEDITOR.env.opera ||
                CKEDITOR.env.webkit,
            synAnchorSelector: CKEDITOR.env.ie,
            emptyAnchorFix: CKEDITOR.env.ie && 8 > CKEDITOR.env.version,
            tryRestoreFakeAnchor: function(a, b) {
                if (b && b.data("cke-real-element-type") && b.data("cke-real-element-type") == "anchor") {
                    var c = a.restoreRealElement(b);
                    if (c.data("cke-saved-name")) return c
                }
            }
        };
        CKEDITOR.unlinkCommand = function() {};
        CKEDITOR.unlinkCommand.prototype = {
            exec: function(a) {
                var b = new CKEDITOR.style({
                    element: "a",
                    type: CKEDITOR.STYLE_INLINE,
                    alwaysRemoveElement: 1
                });
                a.removeStyle(b)
            },
            refresh: function(a,
                b) {
                var c = b.lastElement && b.lastElement.getAscendant("a", true);
                c && c.getName() == "a" && c.getAttribute("href") && c.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
            },
            contextSensitive: 1,
            startDisabled: 1
        };
        CKEDITOR.removeAnchorCommand = function() {};
        CKEDITOR.removeAnchorCommand.prototype = {
            exec: function(a) {
                var b = a.getSelection(),
                    c = b.createBookmarks(),
                    h;
                if (b && (h = b.getSelectedElement()) && (CKEDITOR.plugins.link.fakeAnchor && !h.getChildCount() ? CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,
                        h) : h.is("a"))) h.remove(1);
                else if (h = CKEDITOR.plugins.link.getSelectedLink(a))
                    if (h.hasAttribute("href")) {
                        h.removeAttributes({
                            name: 1,
                            "data-cke-saved-name": 1
                        });
                        h.removeClass("cke_anchor")
                    } else h.remove(1);
                b.selectBookmarks(c)
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.config, {
            linkShowAdvancedTab: !0,
            linkShowTargetTab: !0
        });
        (function() {
            CKEDITOR.plugins.liststyle = {
                requires: "dialog,contextmenu",
                init: function(a) {
                    a.addCommand("numberedListStyle", new CKEDITOR.dialogCommand("numberedListStyle"));
                    CKEDITOR.dialog.add("numberedListStyle",
                        this.path + "dialogs/liststyle.js");
                    a.addCommand("bulletedListStyle", new CKEDITOR.dialogCommand("bulletedListStyle"));
                    CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js");
                    a.addMenuGroup("list", 108);
                    a.addMenuItems({
                        numberedlist: {
                            label: a.lang.liststyle.numberedTitle,
                            group: "list",
                            command: "numberedListStyle"
                        },
                        bulletedlist: {
                            label: a.lang.liststyle.bulletedTitle,
                            group: "list",
                            command: "bulletedListStyle"
                        }
                    });
                    a.contextMenu.addListener(function(a) {
                        if (!a || a.isReadOnly()) return null;
                        for (; a;) {
                            var c =
                                a.getName();
                            if (c == "ol") return {
                                numberedlist: CKEDITOR.TRISTATE_OFF
                            };
                            if (c == "ul") return {
                                bulletedlist: CKEDITOR.TRISTATE_OFF
                            };
                            a = a.getParent()
                        }
                        return null
                    })
                }
            };
            CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
        })();
        "use strict";
        (function() {
            function a(a, b, c, d, f) {
                this.upper = a;
                this.lower = b;
                this.set(c, d, f)
            }

            function b(a, b) {
                if (!a.mouse) return null;
                var c = a.doc,
                    d = a.line.wrap,
                    f = a.mouse,
                    e = new CKEDITOR.dom.element(c.$.elementFromPoint(f.x, f.y));
                if (b && g(a, e)) {
                    d.hide();
                    e = new CKEDITOR.dom.element(c.$.elementFromPoint(f.x,
                        f.y));
                    d.show()
                }
                return !j(e) ? null : e
            }

            function c(a, b) {
                if (!b) return null;
                var c;
                return j(b) ? (c = b.getAscendant(a.triggers, true)) && !c.contains(a.editable) ? c : null : null
            }

            function h(a, b, c) {
                r(a, b);
                r(a, c);
                a = b.size.bottom;
                c = c.size.top;
                return a && c ? 0 | (a + c) / 2 : a || c
            }

            function d(a, b, c) {
                var d = b.getParent();
                if (!d) return null;
                a = new CKEDITOR.dom.range(a.doc);
                if (c) {
                    a.setStartAt(d, CKEDITOR.POSITION_AFTER_START);
                    a.setEndAt(b, CKEDITOR.POSITION_BEFORE_START)
                } else {
                    a.setStartAt(b, CKEDITOR.POSITION_AFTER_END);
                    a.setEndAt(d, CKEDITOR.POSITION_BEFORE_END)
                }
                var b =
                    new CKEDITOR.dom.walker(a),
                    f;
                for (b.guard = function(a) {
                        if (Q(a) && (!M(a) || j(a))) {
                            f = a;
                            return false
                        }
                    }; b[c ? "previous" : "next"](););
                return f
            }

            function i(a) {
                return a.editor.editable().isInline()
            }

            function f(a) {
                var b = a.doc,
                    c = O('<span contenteditable="false" style="' + K + "position:absolute;border-top:1px dashed " + a.boxColor + '"></span>', b);
                C(c, {
                    attach: function() {
                        this.wrap.getParent() || this.wrap.appendTo(a.editable);
                        return this
                    },
                    lineChildren: [C(O('<span title="' + a.editor.lang.magicline.title + '" contenteditable="false">' +
                        E + "</span>", b), {
                        base: K + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + this.path + "images/icon.png) center no-repeat " + a.boxColor + ";cursor:" + (H.opera ? "auto" : "pointer") + ";",
                        looks: ["top:-8px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px", 1), "top:-17px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px 2px 0px 0px", 1), "top:-1px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "0px 0px 2px 2px", 1)]
                    }), C(O(I, b), {
                        base: L + "left:0px;border-left-color:" + a.boxColor + ";",
                        looks: ["border-width:8px 0 8px 8px;top:-8px",
                            "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"
                        ]
                    }), C(O(I, b), {
                        base: L + "right:0px;border-right-color:" + a.boxColor + ";",
                        looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"]
                    })],
                    detach: function() {
                        this.wrap.getParent() && this.wrap.remove();
                        return this
                    },
                    mouseNear: function() {
                        r(a, this);
                        var b = a.holdDistance,
                            c = this.size;
                        return c && a.mouse.y > c.top - b && a.mouse.y < c.bottom + b && a.mouse.x > c.left - b && a.mouse.x < c.right + b ? true : false
                    },
                    place: function() {
                        var b =
                            a.view,
                            c = a.editable,
                            d = a.trigger,
                            f = d.upper,
                            e = d.lower,
                            g = f || e,
                            h = g.getParent(),
                            j = {};
                        this.trigger = d;
                        f && r(a, f, true);
                        e && r(a, e, true);
                        r(a, h, true);
                        i(a) && t(a, true);
                        if (h.equals(c)) {
                            j.left = b.scroll.x;
                            j.right = -b.scroll.x;
                            j.width = ""
                        } else {
                            j.left = g.size.left - g.size.margin.left + b.scroll.x - (i(a) ? b.editable.left + b.editable.border.left : 0);
                            j.width = g.size.outerWidth + g.size.margin.left + g.size.margin.right + b.scroll.x;
                            j.right = ""
                        }
                        if (f && e) j.top = f.size.margin.bottom === e.size.margin.top ? 0 | f.size.bottom + f.size.margin.bottom / 2 :
                            f.size.margin.bottom < e.size.margin.top ? f.size.bottom + f.size.margin.bottom : f.size.bottom + f.size.margin.bottom - e.size.margin.top;
                        else if (f) {
                            if (!e) j.top = f.size.bottom + f.size.margin.bottom
                        } else j.top = e.size.top - e.size.margin.top;
                        if (d.is(J) || j.top > b.scroll.y - 15 && j.top < b.scroll.y + 5) {
                            j.top = i(a) ? 0 : b.scroll.y;
                            this.look(J)
                        } else if (d.is(B) || j.top > b.pane.bottom - 5 && j.top < b.pane.bottom + 15) {
                            j.top = i(a) ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1;
                            this.look(B)
                        } else {
                            if (i(a)) j.top =
                                j.top - (b.editable.top + b.editable.border.top);
                            this.look(F)
                        }
                        i(a) && j.top--;
                        for (var k in j) j[k] = CKEDITOR.tools.cssLength(j[k]);
                        this.setStyles(j)
                    },
                    look: function(a) {
                        if (this.oldLook != a) {
                            for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]);
                            this.oldLook = a
                        }
                    },
                    wrap: new P("span", a.doc)
                });
                for (b = c.lineChildren.length; b--;) c.lineChildren[b].appendTo(c);
                c.look(F);
                c.appendTo(c.wrap);
                c.unselectable();
                c.setOpacity(a.editor.config.magicline_opacity || 1);
                c.lineChildren[0].on("mouseup",
                    function(b) {
                        c.detach();
                        e(a, function(b) {
                            var c = a.line.trigger;
                            b[c.is(w) ? "insertBefore" : "insertAfter"](c.is(w) ? c.lower : c.upper)
                        });
                        a.editor.focus();
                        a.hotParagraph.scrollIntoView();
                        b.data.preventDefault(true)
                    });
                c.on("mousedown", function(a) {
                    a.data.preventDefault(true)
                });
                a.line = c
            }

            function e(a, b) {
                var c = new P("p", a.doc),
                    d = new CKEDITOR.dom.range(a.doc),
                    f = a.doc.createText(E),
                    e = a.editor;
                e.fire("saveSnapshot");
                b(c);
                f.appendTo(c);
                d.moveToPosition(c, CKEDITOR.POSITION_AFTER_START);
                e.getSelection().selectRanges([d]);
                a.hotParagraph = c;
                e.fire("saveSnapshot")
            }

            function g(a, b) {
                if (!j(b)) return false;
                var c = a.line;
                return b.equals(c.wrap) || c.wrap.contains(b)
            }

            function j(a) {
                return a && a.type == CKEDITOR.NODE_ELEMENT && a.$ && a.$.offsetHeight && a.$.offsetWidth
            }

            function k(a) {
                if (!j(a)) return false;
                var b;
                if (!(b = q(a)))
                    if (j(a)) {
                        b = {
                            left: 1,
                            right: 1,
                            center: 1
                        };
                        b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])
                    } else b = false;
                return b
            }

            function q(a) {
                return !!{
                    absolute: 1,
                    fixed: 1,
                    relative: 1
                }[a.getComputedStyle("position")]
            }

            function l(a,
                b) {
                return j(b) ? b.is(a.triggers) : null
            }

            function n(a, b, c) {
                b = b[c ? "getLast" : "getFirst"](a.isRelevant);
                if (!b) return false;
                r(a, b);
                return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y
            }

            function o(f) {
                var e = c(f, b(f, true));
                if (!e || f.editable.equals(e)) return null;
                r(f, e);
                var g = Math.min(f.triggerOffset, 0 | e.size.outerHeight / 2),
                    h = e,
                    i = e;
                if (f.mouse.y > e.size.top - 1 && f.mouse.y < e.size.top + g) {
                    i = d(f, i, true);
                    return j(i) ? new a(i, e, y, z) : i ? false : new a(null, e, w, z, e.equals(f.editable.getFirst(f.isRelevant)) ? J : F)
                }
                if (f.mouse.y >
                    e.size.bottom - g && f.mouse.y < e.size.bottom + 1) {
                    h = d(f, h, false);
                    return j(h) ? new a(e, h, y, z) : h ? false : new a(e, null, x, z, e.equals(f.editable.getLast(f.isRelevant)) && e.size.bottom > f.view.pane.height - f.triggerOffset && e.size.bottom < f.view.pane.height ? B : F)
                }
                return false
            }

            function m(a) {
                var c = b(a, true),
                    d, f, e;
                if (!j(c)) return null;
                e = v(a, function(a, b) {
                    return b.equals(a)
                }, function(a) {
                    return b(a, true)
                }, c);
                d = e.upper;
                f = e.lower;
                if (j(d) && j(f) && f.equals(d.getNext(a.isRelevant))) return e.set(y, D);
                if (d && c.contains(d))
                    for (; !d.getParent().equals(c);) d =
                        d.getParent();
                else d = c.getFirst();
                if (f && c.contains(f))
                    for (; !f.getParent().equals(c);) f = f.getParent();
                else f = c.getLast();
                if (!d || !f) return null;
                if (!j(d) || g(a, d))
                    if (!(d = d.getNext(a.isRelevant))) return null;
                r(a, d);
                var c = Number.MAX_VALUE,
                    i, k, m, p;
                if (d.size.bottom > a.mouse.y) return null;
                for (; f && !f.equals(d);) {
                    if (!(k = d.getNext(a.isRelevant))) break;
                    i = Math.abs(h(a, d, k) - a.mouse.y);
                    if (i < c) {
                        c = i;
                        m = d;
                        p = k
                    }
                    d = k;
                    r(a, d)
                }
                if (!m || !p) return null;
                e.upper = m;
                e.lower = p;
                return e.set(y, D)
            }

            function p(a) {
                var b = a.trigger,
                    c = b.upper,
                    d = b.lower;
                if (!k(d) && !k(c))
                    if (b.is(y)) {
                        if (c && d && !d.equals(c) && !c.equals(d) && !d.contains(c) && !c.contains(d) && l(a, c) && (l(a, d) && j(c) && j(d) && d.equals(c.getNext(a.isRelevant))) && (b.is(D) || b.is(z) && !n(a, c, true) && !n(a, d, false))) return true
                    } else if (b.is(w)) {
                    if (!n(a, d, false) && l(a, d)) return d.getParent().is(A) ? false : true
                } else if (b.is(x) && !n(a, c, true) && l(a, c)) return c.getParent().is(A) ? false : true;
                return false
            }

            function s(a, b, c, d) {
                for (var f = function() {
                        var c = H.ie ? b.$.currentStyle : a.win.$.getComputedStyle(b.$, "");
                        return H.ie ? function(a) {
                            return c[CKEDITOR.tools.cssStyleToDomStyle(a)]
                        } : function(a) {
                            return c.getPropertyValue(a)
                        }
                    }(), e = b.getDocumentPosition(), g = {}, h = {}, j = {}, i = {}, k = N.length; k--;) {
                    g[N[k]] = parseInt(f("border-" + N[k] + "-width"), 10) || 0;
                    j[N[k]] = parseInt(f("padding-" + N[k]), 10) || 0;
                    h[N[k]] = parseInt(f("margin-" + N[k]), 10) || 0
                }(!c || d) && u(a, d);
                i.top = e.y - (c ? 0 : a.view.scroll.y);
                i.left = e.x - (c ? 0 : a.view.scroll.x);
                i.outerWidth = b.$.offsetWidth;
                i.outerHeight = b.$.offsetHeight;
                i.height = i.outerHeight - (j.top + j.bottom + g.top +
                    g.bottom);
                i.width = i.outerWidth - (j.left + j.right + g.left + g.right);
                i.bottom = i.top + i.outerHeight;
                i.right = i.left + i.outerWidth;
                return C({
                    border: g,
                    padding: j,
                    margin: h,
                    ignoreScroll: c
                }, i, true)
            }

            function r(a, b, c) {
                if (!j(b)) return b.size = null;
                if (b.size) {
                    if (b.size.ignoreScroll == c && b.size.date > new Date - G) return null
                } else b.size = {};
                return C(b.size, s(a, b, c), {
                    date: +new Date
                }, true)
            }

            function t(a, b) {
                a.view.editable = s(a, a.editable, b, true)
            }

            function u(a, b) {
                if (!a.view) a.view = {};
                var c = a.view;
                if (b || !(c && c.date > new Date - G)) {
                    var d =
                        a.win,
                        c = d.getScrollPosition(),
                        d = d.getViewPaneSize();
                    C(a.view, {
                        scroll: {
                            x: c.x,
                            y: c.y,
                            width: a.doc.$.documentElement.scrollWidth - d.width,
                            height: a.doc.$.documentElement.scrollHeight - d.height
                        },
                        pane: {
                            width: d.width,
                            height: d.height,
                            bottom: d.height + c.y
                        },
                        date: +new Date
                    }, true)
                }
            }

            function v(b, c, d, f) {
                for (var e = f, g = f, h = 0, j = false, i = false, k = b.view.pane.height, b = b.mouse; b.y + h < k && b.y - h > 0;) {
                    j || (j = !c(e, f));
                    i || (i = !c(g, f));
                    !j && b.y - h > 0 && (e = d({
                        x: b.x,
                        y: b.y - h
                    }));
                    !i && b.y + h < k && (g = d({
                        x: b.x,
                        y: b.y + h
                    }));
                    if (j && i) break;
                    h = h + 2
                }
                return new a(e,
                    g, null, null)
            }
            CKEDITOR.plugins.add("magicline", {
                init: function(e) {
                    var h = e.config,
                        n = h.magicline_triggerOffset || 30,
                        l = {
                            editor: e,
                            triggerOffset: n,
                            holdDistance: 0 | n * (h.magicline_holdDistance || 0.5),
                            boxColor: h.magicline_color || "#ff0000",
                            rtl: h.contentsLangDirection == "rtl",
                            triggers: h.magicline_everywhere ? CKEDITOR.dtd.$block : {
                                table: 1,
                                hr: 1,
                                div: 1,
                                ul: 1,
                                ol: 1,
                                dl: 1
                            }
                        },
                        v, y, D, A;
                    l.isRelevant = function(a) {
                        return j(a) && !g(l, a) && !k(a)
                    };
                    e.on("contentDom", function() {
                        var h = e.editable(),
                            k = e.document,
                            n = e.window;
                        C(l, {
                            editable: h,
                            doc: k,
                            win: n
                        }, true);
                        if (!h.is(CKEDITOR.dtd.$inline)) {
                            i(l) && !q(h) && h.setStyles({
                                position: "relative",
                                top: null,
                                left: null
                            });
                            f.call(this, l);
                            u(l);
                            h.attachListener(e, "beforeUndoImage", function() {
                                l.line.detach()
                            });
                            h.attachListener(e, "beforeGetData", function() {
                                if (l.line.wrap.getParent()) {
                                    l.line.detach();
                                    e.once("getData", function() {
                                        l.line.attach()
                                    }, null, null, 1E3)
                                }
                            }, null, null, 0);
                            h.attachListener(k, "mouseout", function(a) {
                                if (e.mode == "wysiwyg") {
                                    clearTimeout(y);
                                    if (i(l)) {
                                        var b = a.data.$.clientX,
                                            a = a.data.$.clientY;
                                        u(l);
                                        t(l,
                                            true);
                                        var c = l.view.editable,
                                            d = l.view.scroll;
                                        if (!(b > c.left - d.x && b < c.right - d.x) || !(a > c.top - d.y && a < c.bottom - d.y)) {
                                            clearTimeout(A);
                                            A = null;
                                            l.line.detach()
                                        }
                                    } else {
                                        b = new P(a.data.$.relatedTarget || a.data.$.toElement, k);
                                        if (!b.$ || b.is("html")) {
                                            clearTimeout(A);
                                            A = null;
                                            y = CKEDITOR.tools.setTimeout(l.line.detach, 150, l.line)
                                        }
                                    }
                                }
                            });
                            h.attachListener(h, "keyup", function() {
                                l.hiddenMode = 0
                            });
                            h.attachListener(h, "keydown", function(a) {
                                if (e.mode == "wysiwyg") {
                                    a = a.data.getKeystroke();
                                    e.getSelection().getStartElement();
                                    switch (a) {
                                        case 2228240:
                                        case 16:
                                            l.hiddenMode =
                                                1;
                                            l.line.detach()
                                    }
                                }
                            });
                            h.attachListener(i(l) ? h : k, "mousemove", function(c) {
                                clearTimeout(y);
                                D = true;
                                if (!(e.mode != "wysiwyg" || A)) {
                                    var d = {
                                        x: c.data.$.clientX,
                                        y: c.data.$.clientY
                                    };
                                    A = setTimeout(function() {
                                        l.mouse = d;
                                        A = l.trigger = null;
                                        u(l);
                                        if (D && !l.hiddenMode && e.focusManager.hasFocus && !l.line.mouseNear() && (l.element = b(l, true))) {
                                            var c;
                                            var f = l.editable;
                                            c = f.getFirst(l.isRelevant);
                                            var f = f.getLast(l.isRelevant),
                                                g = l.mouse,
                                                h = l.view,
                                                j = l.triggerOffset;
                                            if (!c || !f) c = null;
                                            else {
                                                r(l, c);
                                                r(l, f);
                                                t(l);
                                                c = c.size.top > 0 && g.y > 0 && g.y < c.size.top +
                                                    j ? new a(null, c, w, z, i(l) || h.scroll.y === 0 ? J : F) : f.size.bottom < h.pane.height && g.y > f.size.bottom - j && g.y < h.pane.height ? new a(f, null, x, z, i(l) || f.size.bottom > h.pane.height - j && f.size.bottom < h.pane.height ? B : F) : null
                                            }
                                            if ((l.trigger = c || o(l) || m(l)) && p(l)) l.line.attach().place();
                                            else {
                                                l.trigger = null;
                                                l.line.detach()
                                            }
                                            D = false
                                        }
                                    }, 30)
                                }
                            });
                            h.attachListener(n, "scroll", function() {
                                if (e.mode == "wysiwyg") {
                                    l.line.detach();
                                    if (H.webkit) {
                                        l.hiddenMode = 1;
                                        clearTimeout(v);
                                        v = setTimeout(function() {
                                            l.hiddenMode = 0
                                        }, 50)
                                    }
                                }
                            });
                            h.attachListener(n,
                                "mousedown",
                                function() {
                                    if (e.mode == "wysiwyg") {
                                        l.line.detach();
                                        l.hiddenMode = 1
                                    }
                                });
                            h.attachListener(n, "mouseup", function() {
                                l.hiddenMode = 0
                            });
                            this.backdoor = {
                                boxTrigger: a,
                                isHtml: j,
                                isLine: g,
                                getAscendantTrigger: c,
                                getNonEmptyNeighbour: d,
                                getSize: s,
                                triggerFilter: p,
                                that: l,
                                updateSize: r,
                                updateWindowSize: u
                            }
                        }
                    }, this)
                }
            });
            var w = 128,
                x = 64,
                y = 32,
                z = 16,
                D = 8,
                J = 4,
                B = 2,
                F = 1,
                E = " ",
                A = CKEDITOR.dtd.$listItem,
                G = 100,
                K = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
                L = K + "border-color:transparent;display:block;border-style:solid;",
                I = "<span>" + E + "</span>",
                C = CKEDITOR.tools.extend,
                P = CKEDITOR.dom.element,
                O = P.createFromHtml,
                H = CKEDITOR.env;
            a.prototype = {
                set: function(a, b, c) {
                    this.properties = a + b + (c || F);
                    return this
                },
                is: function(a) {
                    return (this.properties & a) == a
                }
            };
            var M = CKEDITOR.dom.walker.whitespaces(),
                Q = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT, true),
                N = ["top", "left", "right", "bottom"]
        })();
        (function() {
            function a(a) {
                if (!a || a.type != CKEDITOR.NODE_ELEMENT || a.getName() !=
                    "form") return [];
                for (var b = [], c = ["style", "className"], d = 0; d < c.length; d++) {
                    var h = a.$.elements.namedItem(c[d]);
                    if (h) {
                        h = new CKEDITOR.dom.element(h);
                        b.push([h, h.nextSibling]);
                        h.remove()
                    }
                }
                return b
            }

            function b(a, b) {
                if (a && !(a.type != CKEDITOR.NODE_ELEMENT || a.getName() != "form") && b.length > 0)
                    for (var c = b.length - 1; c >= 0; c--) {
                        var d = b[c][0],
                            h = b[c][1];
                        h ? d.insertBefore(h) : d.appendTo(a)
                    }
            }

            function c(c, d) {
                var g = a(c),
                    h = {},
                    i = c.$;
                if (!d) {
                    h["class"] = i.className || "";
                    i.className = ""
                }
                h.inline = i.style.cssText || "";
                if (!d) i.style.cssText =
                    "position: static; overflow: visible";
                b(g);
                return h
            }

            function h(c, d) {
                var g = a(c),
                    h = c.$;
                if ("class" in d) h.className = d["class"];
                if ("inline" in d) h.style.cssText = d.inline;
                b(g)
            }

            function d(a) {
                var b = CKEDITOR.instances,
                    c;
                for (c in b) {
                    var d = b[c];
                    if (d.mode == "wysiwyg" && !d.readOnly) {
                        d = d.document.getBody();
                        d.setAttribute("contentEditable", false);
                        d.setAttribute("contentEditable", true)
                    }
                }
                if (a.editable().hasFocus) {
                    a.toolbox.focus();
                    a.focus()
                }
            }

            function i(a) {
                if (!CKEDITOR.env.ie || CKEDITOR.env.version > 6) return null;
                var b =
                    CKEDITOR.dom.element.createFromHtml('<iframe frameborder="0" tabindex="-1" src="javascript:void((function(){document.open();' + (CKEDITOR.env.isCustomDomain() ? "document.domain='" + this.getDocument().$.domain + "';" : "") + 'document.close();})())" style="display:block;position:absolute;z-index:-1;progid:DXImageTransform.Microsoft.Alpha(opacity=0);"></iframe>');
                return a.append(b, true)
            }
            CKEDITOR.plugins.add("maximize", {
                init: function(a) {
                    function b() {
                        var c = k.getViewPaneSize();
                        o && o.setStyles({
                            width: c.width + "px",
                            height: c.height + "px"
                        });
                        a.resize(c.width, c.height, null, true)
                    }
                    if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var g = a.lang,
                            j = CKEDITOR.document,
                            k = j.getWindow(),
                            q, l, n, o, m = CKEDITOR.TRISTATE_OFF;
                        a.addCommand("maximize", {
                            modes: {
                                wysiwyg: !CKEDITOR.env.iOS,
                                source: !CKEDITOR.env.iOS
                            },
                            readOnly: 1,
                            editorFocus: false,
                            exec: function() {
                                var p = a.container.getChild(1),
                                    s = a.ui.space("contents");
                                if (a.mode == "wysiwyg") {
                                    var r = a.getSelection();
                                    q = r && r.getRanges();
                                    l = k.getScrollPosition()
                                } else {
                                    var t = a.editable().$;
                                    q = !CKEDITOR.env.ie && [t.selectionStart, t.selectionEnd];
                                    l = [t.scrollLeft, t.scrollTop]
                                }
                                if (this.state == CKEDITOR.TRISTATE_OFF) {
                                    k.on("resize", b);
                                    n = k.getScrollPosition();
                                    for (r = a.container; r = r.getParent();) {
                                        r.setCustomData("maximize_saved_styles", c(r));
                                        r.setStyle("z-index", a.config.baseFloatZIndex - 1)
                                    }
                                    s.setCustomData("maximize_saved_styles", c(s, true));
                                    p.setCustomData("maximize_saved_styles", c(p, true));
                                    s = {
                                        overflow: CKEDITOR.env.webkit ? "" : "hidden",
                                        width: 0,
                                        height: 0
                                    };
                                    j.getDocumentElement().setStyles(s);
                                    !CKEDITOR.env.gecko && j.getDocumentElement().setStyle("position",
                                        "fixed");
                                    (!CKEDITOR.env.gecko || !CKEDITOR.env.quirks) && j.getBody().setStyles(s);
                                    CKEDITOR.env.ie ? setTimeout(function() {
                                        k.$.scrollTo(0, 0)
                                    }, 0) : k.$.scrollTo(0, 0);
                                    p.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute");
                                    p.$.offsetLeft;
                                    p.setStyles({
                                        "z-index": a.config.baseFloatZIndex - 1,
                                        left: "0px",
                                        top: "0px"
                                    });
                                    o = i(p);
                                    p.addClass("cke_maximized");
                                    b();
                                    s = p.getDocumentPosition();
                                    p.setStyles({
                                        left: -1 * s.x + "px",
                                        top: -1 * s.y + "px"
                                    });
                                    CKEDITOR.env.gecko && d(a)
                                } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                    k.removeListener("resize",
                                        b);
                                    s = [s, p];
                                    for (r = 0; r < s.length; r++) {
                                        h(s[r], s[r].getCustomData("maximize_saved_styles"));
                                        s[r].removeCustomData("maximize_saved_styles")
                                    }
                                    for (r = a.container; r = r.getParent();) {
                                        h(r, r.getCustomData("maximize_saved_styles"));
                                        r.removeCustomData("maximize_saved_styles")
                                    }
                                    CKEDITOR.env.ie ? setTimeout(function() {
                                        k.$.scrollTo(n.x, n.y)
                                    }, 0) : k.$.scrollTo(n.x, n.y);
                                    p.removeClass("cke_maximized");
                                    if (CKEDITOR.env.webkit) {
                                        p.setStyle("display", "inline");
                                        setTimeout(function() {
                                            p.setStyle("display", "block")
                                        }, 0)
                                    }
                                    if (o) {
                                        o.remove();
                                        o = null
                                    }
                                    a.fire("resize")
                                }
                                this.toggleState();
                                if (r = this.uiItems[0]) {
                                    s = this.state == CKEDITOR.TRISTATE_OFF ? g.maximize.maximize : g.maximize.minimize;
                                    r = CKEDITOR.document.getById(r._.id);
                                    r.getChild(1).setHtml(s);
                                    r.setAttribute("title", s);
                                    r.setAttribute("href", 'javascript:void("' + s + '");')
                                }
                                if (a.mode == "wysiwyg")
                                    if (q) {
                                        CKEDITOR.env.gecko && d(a);
                                        a.getSelection().selectRanges(q);
                                        (t = a.getSelection().getStartElement()) && t.scrollIntoView(true)
                                    } else k.$.scrollTo(l.x, l.y);
                                else {
                                    if (q) {
                                        t.selectionStart = q[0];
                                        t.selectionEnd =
                                            q[1]
                                    }
                                    t.scrollLeft = l[0];
                                    t.scrollTop = l[1]
                                }
                                q = l = null;
                                m = this.state
                            },
                            canUndo: false
                        });
                        a.ui.addButton && a.ui.addButton("Maximize", {
                            label: g.maximize.maximize,
                            command: "maximize",
                            toolbar: "tools,10"
                        });
                        a.on("mode", function() {
                            var b = a.getCommand("maximize");
                            b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : m)
                        }, null, null, 100)
                    }
                }
            })
        })();
        CKEDITOR.plugins.add("newpage", {
            init: function(a) {
                a.addCommand("newpage", {
                    modes: {
                        wysiwyg: 1,
                        source: 1
                    },
                    exec: function(a) {
                        var c = this;
                        a.setData(a.config.newpage_html ||
                            "",
                            function() {
                                a.focus();
                                setTimeout(function() {
                                    a.fire("afterCommandExec", {
                                        name: "newpage",
                                        command: c
                                    });
                                    a.selectionChange()
                                }, 200)
                            })
                    },
                    async: true
                });
                a.ui.addButton && a.ui.addButton("NewPage", {
                    label: a.lang.newpage.toolbar,
                    command: "newpage",
                    toolbar: "document,20"
                })
            }
        });
        CKEDITOR.plugins.add("pagebreak", {
            onLoad: function() {
                var a = ["{", "background: url(" + CKEDITOR.getUrl(this.path + "images/pagebreak.gif") + ") no-repeat center center;", "clear: both;width:100%; _width:99.9%;border-top: #999999 1px dotted;border-bottom: #999999 1px dotted;padding:0;height: 5px;cursor: default;}"].join("").replace(/;/g,
                    " !important;");
                CKEDITOR.addCss("div.cke_pagebreak" + a)
            },
            init: function(a) {
                if (!a.blockless) {
                    a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd);
                    a.ui.addButton && a.ui.addButton("PageBreak", {
                        label: a.lang.pagebreak.toolbar,
                        command: "pagebreak",
                        toolbar: "insert,70"
                    });
                    CKEDITOR.env.opera && a.on("contentDom", function() {
                        a.document.on("click", function(b) {
                            b = b.data.getTarget();
                            b.is("div") && b.hasClass("cke_pagebreak") && a.getSelection().selectElement(b)
                        })
                    })
                }
            },
            afterInit: function(a) {
                var b = a.lang.pagebreak.alt,
                    c = a.dataProcessor,
                    a = c && c.dataFilter;
                (c = c && c.htmlFilter) && c.addRules({
                    attributes: {
                        "class": function(a, b) {
                            var c = a.replace("cke_pagebreak", "");
                            if (c != a) {
                                var f = CKEDITOR.htmlParser.fragment.fromHtml('<span style="display: none;">&nbsp;</span>');
                                b.children.length = 0;
                                b.add(f);
                                f = b.attributes;
                                delete f["aria-label"];
                                delete f.contenteditable;
                                delete f.title
                            }
                            return c
                        }
                    }
                }, 5);
                a && a.addRules({
                    elements: {
                        div: function(a) {
                            var c = a.attributes,
                                i = c && c.style,
                                f = i && a.children.length == 1 && a.children[0];
                            if ((f = f && f.name == "span" && f.attributes.style) &&
                                /page-break-after\s*:\s*always/i.test(i) && /display\s*:\s*none/i.test(f)) {
                                c.contenteditable = "false";
                                c["class"] = "cke_pagebreak";
                                c["data-cke-display-name"] = "pagebreak";
                                c["aria-label"] = b;
                                c.title = b;
                                a.children.length = 0
                            }
                        }
                    }
                })
            },
            requires: "fakeobjects"
        });
        CKEDITOR.plugins.pagebreakCmd = {
            exec: function(a) {
                var b = a.lang.pagebreak.alt,
                    b = CKEDITOR.dom.element.createFromHtml('<div style="page-break-after: always;"contenteditable="false" title="' + b + '" aria-label="' + b + '" data-cke-display-name="pagebreak" class="cke_pagebreak"></div>',
                        a.document);
                a.insertElement(b)
            },
            context: "div"
        };
        (function() {
            function a(a, b) {
                var d = CKEDITOR.cleanWord;
                if (d) b();
                else {
                    var i = CKEDITOR.getUrl(CKEDITOR.config.pasteFromWordCleanupFile || a + "filter/default.js");
                    CKEDITOR.scriptLoader.load(i, b, null, true)
                }
                return !d
            }

            function b(a) {
                a.data.type = "html"
            }
            CKEDITOR.plugins.add("pastefromword", {
                requires: "clipboard",
                init: function(c) {
                    var h = 0,
                        d = this.path;
                    c.addCommand("pastefromword", {
                        canUndo: false,
                        async: true,
                        exec: function(a) {
                            var c = this;
                            h = 1;
                            a.on("beforePaste", b);
                            a.getClipboardData({
                                    title: a.lang.pastefromword.title
                                },
                                function(b) {
                                    b && a.fire("paste", {
                                        type: "html",
                                        dataValue: b.dataValue
                                    });
                                    a.fire("afterCommandExec", {
                                        name: "pastefromword",
                                        command: c,
                                        returnValue: !!b
                                    })
                                })
                        }
                    });
                    c.ui.addButton && c.ui.addButton("PasteFromWord", {
                        label: c.lang.pastefromword.toolbar,
                        command: "pastefromword",
                        toolbar: "clipboard,50"
                    });
                    c.on("pasteState", function(a) {
                        c.getCommand("pastefromword").setState(a.data)
                    });
                    c.on("paste", function(b) {
                        var f = b.data,
                            e = f.dataValue;
                        if (e && (h || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(e))) {
                            var g = a(d, function() {
                                if (g) c.fire("paste",
                                    f);
                                else if (!c.config.pasteFromWordPromptCleanup || h || confirm(c.lang.pastefromword.confirmCleanup)) f.dataValue = CKEDITOR.cleanWord(e, c)
                            });
                            g && b.cancel()
                        }
                    }, null, null, 3)
                }
            })
        })();
        (function() {
            var a = {
                canUndo: false,
                async: true,
                exec: function(b) {
                    b.getClipboardData({
                        title: b.lang.pastetext.title
                    }, function(c) {
                        c && b.fire("paste", {
                            type: "text",
                            dataValue: c.dataValue
                        });
                        b.fire("afterCommandExec", {
                            name: "pastetext",
                            command: a,
                            returnValue: !!c
                        })
                    })
                }
            };
            CKEDITOR.plugins.add("pastetext", {
                requires: "clipboard",
                init: function(b) {
                    b.addCommand("pastetext",
                        a);
                    b.ui.addButton && b.ui.addButton("PasteText", {
                        label: b.lang.pastetext.button,
                        command: "pastetext",
                        toolbar: "clipboard,40"
                    });
                    if (b.config.forcePasteAsPlainText) b.on("beforePaste", function(a) {
                        if (a.data.type != "html") a.data.type = "text"
                    });
                    b.on("pasteState", function(a) {
                        b.getCommand("pastetext").setState(a.data)
                    })
                }
            })
        })();
        (function() {
            var a, b = {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                canUndo: false,
                readOnly: 1,
                exec: function(b) {
                    var h = b.config,
                        d = h.baseHref ? '<base href="' + h.baseHref + '"/>' : "",
                        i = CKEDITOR.env.isCustomDomain();
                    if (h.fullPage) b =
                        b.getData().replace(/<head>/, "$&" + d).replace(/[^>]*(?=<\/title>)/, "$& &mdash; " + b.lang.preview.preview);
                    else {
                        var h = "<body ",
                            f = b.document && b.document.getBody();
                        if (f) {
                            f.getAttribute("id") && (h = h + ('id="' + f.getAttribute("id") + '" '));
                            f.getAttribute("class") && (h = h + ('class="' + f.getAttribute("class") + '" '))
                        }
                        b = b.config.docType + '<html dir="' + b.config.contentsLangDirection + '"><head>' + d + "<title>" + b.lang.preview.preview + "</title>" + CKEDITOR.tools.buildStyleHtml(b.config.contentsCss) + "</head>" + (h + ">") + b.getData() +
                            "</body></html>"
                    }
                    d = 640;
                    h = 420;
                    f = 80;
                    try {
                        var e = window.screen,
                            d = Math.round(e.width * 0.8),
                            h = Math.round(e.height * 0.7),
                            f = Math.round(e.width * 0.1)
                    } catch (g) {}
                    e = "";
                    if (i) {
                        window._cke_htmlToLoad = b;
                        e = 'javascript:void( (function(){document.open();document.domain="' + document.domain + '";document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad = null;})() )'
                    }
                    if (CKEDITOR.env.gecko) {
                        window._cke_htmlToLoad = b;
                        e = a + "preview.html"
                    }
                    e = window.open(e, null, "toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=" +
                        d + ",height=" + h + ",left=" + f);
                    if (!i && !CKEDITOR.env.gecko) {
                        var j = e.document;
                        j.open();
                        j.write(b);
                        j.close();
                        CKEDITOR.env.webkit && setTimeout(function() {
                            j.body.innerHTML = j.body.innerHTML + ""
                        }, 0)
                    }
                }
            };
            CKEDITOR.plugins.add("preview", {
                init: function(c) {
                    if (c.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        a = this.path;
                        c.addCommand("preview", b);
                        c.ui.addButton && c.ui.addButton("Preview", {
                            label: c.lang.preview.preview,
                            command: "preview",
                            toolbar: "document,40"
                        })
                    }
                }
            })
        })();
        CKEDITOR.plugins.add("print", {
            init: function(a) {
                if (a.elementMode !=
                    CKEDITOR.ELEMENT_MODE_INLINE) {
                    a.addCommand("print", CKEDITOR.plugins.print);
                    a.ui.addButton && a.ui.addButton("Print", {
                        label: a.lang.print.toolbar,
                        command: "print",
                        toolbar: "document,50"
                    })
                }
            }
        });
        CKEDITOR.plugins.print = {
            exec: function(a) {
                CKEDITOR.env.opera || (CKEDITOR.env.gecko ? a.window.$.print() : a.document.$.execCommand("Print"))
            },
            canUndo: !1,
            readOnly: 1,
            modes: {
                wysiwyg: !CKEDITOR.env.opera
            }
        };
        CKEDITOR.plugins.add("removeformat", {
            init: function(a) {
                a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat);
                a.ui.addButton && a.ui.addButton("RemoveFormat", {
                    label: a.lang.removeformat.toolbar,
                    command: "removeFormat",
                    toolbar: "cleanup,10"
                });
                a._.removeFormat = {
                    filters: []
                }
            }
        });
        CKEDITOR.plugins.removeformat = {
            commands: {
                removeformat: {
                    exec: function(a) {
                        for (var b = a._.removeFormatRegex || (a._.removeFormatRegex = RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), c = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), h = CKEDITOR.plugins.removeformat.filter, d = a.getSelection().getRanges(1),
                                i = d.createIterator(), f; f = i.getNextRange();) {
                            f.collapsed || f.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                            var e = f.createBookmark(),
                                g = e.startNode,
                                j = e.endNode,
                                k = function(c) {
                                    for (var d = a.elementPath(c), f = d.elements, e = 1, g; g = f[e]; e++) {
                                        if (g.equals(d.block) || g.equals(d.blockLimit)) break;
                                        b.test(g.getName()) && h(a, g) && c.breakParent(g)
                                    }
                                };
                            k(g);
                            if (j) {
                                k(j);
                                for (g = g.getNextSourceNode(true, CKEDITOR.NODE_ELEMENT); g;) {
                                    if (g.equals(j)) break;
                                    k = g.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT);
                                    if (!(g.getName() == "img" && g.data("cke-realelement")) &&
                                        h(a, g))
                                        if (b.test(g.getName())) g.remove(1);
                                        else {
                                            g.removeAttributes(c);
                                            a.fire("removeFormatCleanup", g)
                                        }
                                    g = k
                                }
                            }
                            f.moveToBookmark(e)
                        }
                        a.getSelection().selectRanges(d)
                    }
                }
            },
            filter: function(a, b) {
                for (var c = a._.removeFormat.filters, h = 0; h < c.length; h++)
                    if (c[h](b) === false) return false;
                return true
            }
        };
        CKEDITOR.editor.prototype.addRemoveFormatFilter = function(a) {
            this._.removeFormat.filters.push(a)
        };
        CKEDITOR.config.removeFormatTags = "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var";
        CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign";
        CKEDITOR.plugins.add("resize", {
            init: function(a) {
                var b, c, h, d, i = a.config,
                    f = a.element ? a.element.getDirection(1) : "ltr";
                !i.resize_dir && (i.resize_dir = "both");
                i.resize_maxWidth == void 0 && (i.resize_maxWidth = 3E3);
                i.resize_maxHeight == void 0 && (i.resize_maxHeight = 3E3);
                i.resize_minWidth == void 0 && (i.resize_minWidth = 750);
                i.resize_minHeight == void 0 && (i.resize_minHeight = 250);
                if (i.resize_enabled !== false) {
                    var e = null,
                        g = (i.resize_dir ==
                            "both" || i.resize_dir == "horizontal") && i.resize_minWidth != i.resize_maxWidth,
                        j = (i.resize_dir == "both" || i.resize_dir == "vertical") && i.resize_minHeight != i.resize_maxHeight,
                        k = function(e) {
                            var k = b,
                                m = c,
                                p = k + (e.data.$.screenX - h) * (f == "rtl" ? -1 : 1),
                                e = m + (e.data.$.screenY - d);
                            g && (k = Math.max(i.resize_minWidth, Math.min(p, i.resize_maxWidth)));
                            j && (m = Math.max(i.resize_minHeight, Math.min(e, i.resize_maxHeight)));
                            a.resize(g ? k : null, m)
                        },
                        q = function() {
                            CKEDITOR.document.removeListener("mousemove", k);
                            CKEDITOR.document.removeListener("mouseup",
                                q);
                            if (a.document) {
                                a.document.removeListener("mousemove", k);
                                a.document.removeListener("mouseup", q)
                            }
                        },
                        l = CKEDITOR.tools.addFunction(function(f) {
                            e || (e = a.getResizable());
                            b = e.$.offsetWidth || 0;
                            c = e.$.offsetHeight || 0;
                            h = f.screenX;
                            d = f.screenY;
                            i.resize_minWidth > b && (i.resize_minWidth = b);
                            i.resize_minHeight > c && (i.resize_minHeight = c);
                            CKEDITOR.document.on("mousemove", k);
                            CKEDITOR.document.on("mouseup", q);
                            if (a.document) {
                                a.document.on("mousemove", k);
                                a.document.on("mouseup", q)
                            }
                        });
                    a.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(l)
                    });
                    a.on("uiSpace", function(b) {
                        if (b.data.space == "bottom") {
                            var c = "";
                            g && !j && (c = " cke_resizer_horizontal");
                            !g && j && (c = " cke_resizer_vertical");
                            var d = '<span class="cke_resizer' + c + " cke_resizer_" + f + '" title="' + CKEDITOR.tools.htmlEncode(a.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + l + ', event)"></span>';
                            f == "ltr" && c == "ltr" ? b.data.html = b.data.html + d : b.data.html = d + b.data.html
                        }
                    }, a, null, 100)
                }
            }
        });
        (function() {
            var a = {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                readOnly: 1,
                exec: function(a) {
                    if (a = a.element.$.form) try {
                        a.submit()
                    } catch (c) {
                        a.submit.click &&
                            a.submit.click()
                    }
                }
            };
            CKEDITOR.plugins.add("save", {
                init: function(b) {
                    if (b.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE) {
                        b.addCommand("save", a).modes = {
                            wysiwyg: !!b.element.$.form
                        };
                        b.ui.addButton && b.ui.addButton("Save", {
                            label: b.lang.save.toolbar,
                            command: "save",
                            toolbar: "document,10"
                        })
                    }
                }
            })
        })();
        CKEDITOR.plugins.add("menubutton", {
            requires: "button,menu",
            onLoad: function() {
                var a = function(a) {
                    var c = this._;
                    if (c.state !== CKEDITOR.TRISTATE_DISABLED) {
                        c.previousState = c.state;
                        var h = c.menu;
                        if (!h) {
                            h = c.menu = new CKEDITOR.menu(a, {
                                panel: {
                                    className: "cke_menu_panel",
                                    attributes: {
                                        "aria-label": a.lang.common.options
                                    }
                                }
                            });
                            h.onHide = CKEDITOR.tools.bind(function() {
                                this.setState(this.modes && this.modes[a.mode] ? c.previousState : CKEDITOR.TRISTATE_DISABLED)
                            }, this);
                            this.onMenu && h.addListener(this.onMenu)
                        }
                        if (c.on) h.hide();
                        else {
                            this.setState(CKEDITOR.TRISTATE_ON);
                            h.show(CKEDITOR.document.getById(this._.id), 4)
                        }
                    }
                };
                CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.button,
                    $: function(b) {
                        delete b.panel;
                        this.base(b);
                        this.hasArrow =
                            true;
                        this.click = a
                    },
                    statics: {
                        handler: {
                            create: function(a) {
                                return new CKEDITOR.ui.menuButton(a)
                            }
                        }
                    }
                })
            },
            beforeInit: function(a) {
                a.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler)
            }
        });
        CKEDITOR.UI_MENUBUTTON = "menubutton";
        (function() {
            function a(a, b) {
                var c = 0,
                    d;
                for (d in b)
                    if (b[d] == a) {
                        c = 1;
                        break
                    }
                return c
            }
            var b = "",
                c = function() {
                    var a = this,
                        c = function() {
                            var b = a.config,
                                c = {};
                            c.srcNodeRef = a.document.getWindow().$.frameElement;
                            c.assocApp = "CKEDITOR." + CKEDITOR.version + "@" + CKEDITOR.revision;
                            c.customerid =
                                b.scayt_customerid || "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2";
                            c.customDictionaryIds = b.scayt_customDictionaryIds || "";
                            c.userDictionaryName = b.scayt_userDictionaryName || "";
                            c.sLang = b.scayt_sLang || "en_US";
                            c.onLoad = function() {
                                CKEDITOR.env.ie && CKEDITOR.env.version < 8 || this.addStyle(this.selectorCss(), "padding-bottom: 2px !important;");
                                a.editable().hasFocus && !h.isControlRestored(a) && this.focus()
                            };
                            c.onBeforeChange = function() {
                                h.getScayt(a) && !a.checkDirty() && setTimeout(function() {
                                        a.resetDirty()
                                    },
                                    0)
                            };
                            b = window.scayt_custom_params;
                            if (typeof b == "object")
                                for (var d in b) c[d] = b[d];
                            if (h.getControlId(a)) c.id = h.getControlId(a);
                            var e = new window.scayt(c);
                            e.afterMarkupRemove.push(function(a) {
                                (new CKEDITOR.dom.element(a, e.document)).mergeSiblings()
                            });
                            if (c = h.instances[a.name]) {
                                e.sLang = c.sLang;
                                e.option(c.option());
                                e.paused = c.paused
                            }
                            h.instances[a.name] = e;
                            try {
                                e.setDisabled(h.isPaused(a) === false)
                            } catch (g) {}
                            a.fire("showScaytState")
                        };
                    a.on("contentDom", c);
                    a.on("contentDomUnload", function() {
                        for (var a = CKEDITOR.document.getElementsByTag("script"),
                                b = /^dojoIoScript(\d+)$/i, c = /^https?:\/\/svc\.webspellchecker\.net\/spellcheck\/script\/ssrv\.cgi/i, d = 0; d < a.count(); d++) {
                            var e = a.getItem(d),
                                f = e.getId(),
                                g = e.getAttribute("src");
                            f && (g && f.match(b) && g.match(c)) && e.remove()
                        }
                    });
                    a.on("beforeCommandExec", function(b) {
                        if ((b.data.name == "source" || b.data.name == "newpage") && a.mode == "wysiwyg") {
                            if (b = h.getScayt(a)) {
                                h.setPaused(a, !b.disabled);
                                h.setControlId(a, b.id);
                                b.destroy(true);
                                delete h.instances[a.name]
                            }
                        } else b.data.name == "source" && a.mode == "source" && h.markControlRestore(a)
                    });
                    a.on("afterCommandExec", function(b) {
                        h.isScaytEnabled(a) && a.mode == "wysiwyg" && (b.data.name == "undo" || b.data.name == "redo") && window.setTimeout(function() {
                            h.getScayt(a).refresh()
                        }, 10)
                    });
                    a.on("destroy", function(a) {
                        var a = a.editor,
                            b = h.getScayt(a);
                        if (b) {
                            delete h.instances[a.name];
                            h.setControlId(a, b.id);
                            b.destroy(true)
                        }
                    });
                    a.on("afterSetData", function() {
                        h.isScaytEnabled(a) && window.setTimeout(function() {
                            var b = h.getScayt(a);
                            b && b.refresh()
                        }, 10)
                    });
                    a.on("insertElement", function() {
                        var b = h.getScayt(a);
                        if (h.isScaytEnabled(a)) {
                            CKEDITOR.env.ie &&
                                a.getSelection().unlock(true);
                            window.setTimeout(function() {
                                b.focus();
                                b.refresh()
                            }, 10)
                        }
                    }, this, null, 50);
                    a.on("insertHtml", function() {
                        var b = h.getScayt(a);
                        if (h.isScaytEnabled(a)) {
                            CKEDITOR.env.ie && a.getSelection().unlock(true);
                            window.setTimeout(function() {
                                b.focus();
                                b.refresh()
                            }, 10)
                        }
                    }, this, null, 50);
                    a.on("scaytDialog", function(c) {
                        c.data.djConfig = window.djConfig;
                        c.data.scayt_control = h.getScayt(a);
                        c.data.tab = b;
                        c.data.scayt = window.scayt
                    });
                    var d = a.dataProcessor;
                    (d = d && d.htmlFilter) && d.addRules({
                        elements: {
                            span: function(a) {
                                if (a.attributes["data-scayt_word"] &&
                                    a.attributes["data-scaytid"]) {
                                    delete a.name;
                                    return a
                                }
                            }
                        }
                    });
                    d = CKEDITOR.plugins.undo.Image.prototype;
                    d.equals = CKEDITOR.tools.override(d.equals, function(a) {
                        return function(b) {
                            var c = this.contents,
                                d = b.contents,
                                e = h.getScayt(this.editor);
                            if (e && h.isScaytReady(this.editor)) {
                                this.contents = e.reset(c) || "";
                                b.contents = e.reset(d) || ""
                            }
                            e = a.apply(this, arguments);
                            this.contents = c;
                            b.contents = d;
                            return e
                        }
                    });
                    a.document && c()
                };
            CKEDITOR.plugins.scayt = {
                engineLoaded: false,
                instances: {},
                controlInfo: {},
                setControlInfo: function(a,
                    b) {
                    a && (a.name && typeof this.controlInfo[a.name] != "object") && (this.controlInfo[a.name] = {});
                    for (var c in b) this.controlInfo[a.name][c] = b[c]
                },
                isControlRestored: function(a) {
                    return a && a.name && this.controlInfo[a.name] ? this.controlInfo[a.name].restored : false
                },
                markControlRestore: function(a) {
                    this.setControlInfo(a, {
                        restored: true
                    })
                },
                setControlId: function(a, b) {
                    this.setControlInfo(a, {
                        id: b
                    })
                },
                getControlId: function(a) {
                    return a && a.name && this.controlInfo[a.name] && this.controlInfo[a.name].id ? this.controlInfo[a.name].id :
                        null
                },
                setPaused: function(a, b) {
                    this.setControlInfo(a, {
                        paused: b
                    })
                },
                isPaused: function(a) {
                    if (a && a.name && this.controlInfo[a.name]) return this.controlInfo[a.name].paused
                },
                getScayt: function(a) {
                    return this.instances[a.name]
                },
                isScaytReady: function(a) {
                    return this.engineLoaded === true && "undefined" !== typeof window.scayt && this.getScayt(a)
                },
                isScaytEnabled: function(a) {
                    return (a = this.getScayt(a)) ? a.disabled === false : false
                },
                getUiTabs: function(a) {
                    var b = [],
                        a = a.config.scayt_uiTabs || "1,1,1",
                        a = a.split(",");
                    a[3] = "1";
                    for (var c =
                            0; c < 4; c++) b[c] = typeof window.scayt != "undefined" && typeof window.scayt.uiTags != "undefined" ? parseInt(a[c], 10) && window.scayt.uiTags[c] : parseInt(a[c], 10);
                    return b
                },
                loadEngine: function(a) {
                    if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 || CKEDITOR.env.opera || CKEDITOR.env.air) return a.fire("showScaytState");
                    if (this.engineLoaded === true) return c.apply(a);
                    if (this.engineLoaded == -1) return CKEDITOR.on("scaytReady", function() {
                        c.apply(a)
                    });
                    CKEDITOR.on("scaytReady", c, a);
                    CKEDITOR.on("scaytReady", function() {
                        this.engineLoaded =
                            true
                    }, this, null, 0);
                    this.engineLoaded = -1;
                    var b = document.location.protocol,
                        b = b.search(/https?:/) != -1 ? b : "http:",
                        b = a.config.scayt_srcUrl || b + "//svc.webspellchecker.net/scayt26/loader__base.js",
                        d = h.parseUrl(b).path + "/";
                    if (window.scayt == void 0) {
                        CKEDITOR._djScaytConfig = {
                            baseUrl: d,
                            addOnLoad: [function() {
                                CKEDITOR.fireOnce("scaytReady")
                            }],
                            isDebug: false
                        };
                        CKEDITOR.document.getHead().append(CKEDITOR.document.createElement("script", {
                            attributes: {
                                type: "text/javascript",
                                async: "true",
                                src: b
                            }
                        }))
                    } else CKEDITOR.fireOnce("scaytReady");
                    return null
                },
                parseUrl: function(a) {
                    var b;
                    return a.match && (b = a.match(/(.*)[\/\\](.*?\.\w+)$/)) ? {
                        path: b[1],
                        file: b[2]
                    } : a
                }
            };
            var h = CKEDITOR.plugins.scayt,
                d = function(a, b, c, d, h, i, l) {
                    a.addCommand(d, h);
                    a.addMenuItem(d, {
                        label: c,
                        command: d,
                        group: i,
                        order: l
                    })
                },
                i = {
                    preserveState: true,
                    editorFocus: false,
                    canUndo: false,
                    exec: function(a) {
                        if (h.isScaytReady(a)) {
                            var b = h.isScaytEnabled(a);
                            this.setState(b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_ON);
                            a = h.getScayt(a);
                            a.focus();
                            a.setDisabled(b)
                        } else if (!a.config.scayt_autoStartup &&
                            h.engineLoaded >= 0) {
                            this.setState(CKEDITOR.TRISTATE_DISABLED);
                            h.loadEngine(a)
                        }
                    }
                };
            CKEDITOR.plugins.add("scayt", {
                requires: "menubutton,dialog",
                beforeInit: function(a) {
                    var b = a.config.scayt_contextMenuItemsOrder || "suggest|moresuggest|control",
                        c = "";
                    if ((b = b.split("|")) && b.length)
                        for (var d = 0; d < b.length; d++) c = c + ("scayt_" + b[d] + (b.length != parseInt(d, 10) + 1 ? "," : ""));
                    a.config.menu_groups = c + "," + a.config.menu_groups
                },
                init: function(c) {
                    var e = c.dataProcessor && c.dataProcessor.dataFilter,
                        g = {
                            elements: {
                                span: function(a) {
                                    var b =
                                        a.attributes;
                                    b && b["data-scaytid"] && delete a.name
                                }
                            }
                        };
                    e && e.addRules(g);
                    var j = {},
                        k = {},
                        q = c.addCommand("scaytcheck", i);
                    CKEDITOR.dialog.add("scaytcheck", CKEDITOR.getUrl(this.path + "dialogs/options.js"));
                    e = h.getUiTabs(c);
                    c.addMenuGroup("scaytButton");
                    c.addMenuGroup("scayt_suggest", -10);
                    c.addMenuGroup("scayt_moresuggest", -9);
                    c.addMenuGroup("scayt_control", -8);
                    var g = {},
                        l = c.lang.scayt;
                    g.scaytToggle = {
                        label: l.enable,
                        command: "scaytcheck",
                        group: "scaytButton"
                    };
                    if (e[0] == 1) g.scaytOptions = {
                        label: l.options,
                        group: "scaytButton",
                        onClick: function() {
                            b = "options";
                            c.openDialog("scaytcheck")
                        }
                    };
                    if (e[1] == 1) g.scaytLangs = {
                        label: l.langs,
                        group: "scaytButton",
                        onClick: function() {
                            b = "langs";
                            c.openDialog("scaytcheck")
                        }
                    };
                    if (e[2] == 1) g.scaytDict = {
                        label: l.dictionariesTab,
                        group: "scaytButton",
                        onClick: function() {
                            b = "dictionaries";
                            c.openDialog("scaytcheck")
                        }
                    };
                    g.scaytAbout = {
                        label: c.lang.scayt.about,
                        group: "scaytButton",
                        onClick: function() {
                            b = "about";
                            c.openDialog("scaytcheck")
                        }
                    };
                    c.addMenuItems(g);
                    c.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                        label: l.title,
                        title: CKEDITOR.env.opera ?
                            l.opera_title : l.title,
                        modes: {
                            wysiwyg: 1
                        },
                        toolbar: "spellchecker,20",
                        onRender: function() {
                            q.on("state", function() {
                                this.setState(q.state)
                            }, this)
                        },
                        onMenu: function() {
                            var a = h.isScaytEnabled(c);
                            c.getMenuItem("scaytToggle").label = l[a ? "disable" : "enable"];
                            var b = h.getUiTabs(c);
                            return {
                                scaytToggle: CKEDITOR.TRISTATE_OFF,
                                scaytOptions: a && b[0] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                scaytLangs: a && b[1] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                scaytDict: a && b[2] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                scaytAbout: a && b[3] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                            }
                        }
                    });
                    c.contextMenu && c.addMenuItems && c.contextMenu.addListener(function(b, e) {
                        if (!h.isScaytEnabled(c) || e.getRanges()[0].checkReadOnly()) return null;
                        var g = h.getScayt(c),
                            i = g.getScaytNode();
                        if (!i) return null;
                        var q = g.getWord(i);
                        if (!q) return null;
                        var r = g.getLang(),
                            q = window.scayt.getSuggestion(q, r);
                        if (!q || !q.length) return null;
                        for (var t in j) {
                            delete c._.menuItems[t];
                            delete c.commands[t]
                        }
                        for (t in k) {
                            delete c._.menuItems[t];
                            delete c.commands[t]
                        }
                        j = {};
                        k = {};
                        t = c.config.scayt_moreSuggestions || "on";
                        var r = false,
                            u = c.config.scayt_maxSuggestions;
                        typeof u != "number" && (u = 5);
                        !u && (u = q.length);
                        for (var v = c.config.scayt_contextCommands || "all", v = v.split("|"), w = 0, x = q.length; w < x; w = w + 1) {
                            var y = "scayt_suggestion_" + q[w].replace(" ", "_"),
                                z = function(a, b) {
                                    return {
                                        exec: function() {
                                            g.replace(a, b)
                                        }
                                    }
                                }(i, q[w]);
                            if (w < u) {
                                d(c, "button_" + y, q[w], y, z, "scayt_suggest", w + 1);
                                k[y] = CKEDITOR.TRISTATE_OFF
                            } else if (t == "on") {
                                d(c, "button_" + y, q[w], y, z, "scayt_moresuggest", w + 1);
                                j[y] = CKEDITOR.TRISTATE_OFF;
                                r = true
                            }
                        }
                        if (r) {
                            c.addMenuItem("scayt_moresuggest", {
                                label: l.moreSuggestions,
                                group: "scayt_moresuggest",
                                order: 10,
                                getItems: function() {
                                    return j
                                }
                            });
                            k.scayt_moresuggest = CKEDITOR.TRISTATE_OFF
                        }
                        if (a("all", v) || a("ignore", v)) {
                            d(c, "ignore", l.ignore, "scayt_ignore", {
                                exec: function() {
                                    g.ignore(i)
                                }
                            }, "scayt_control", 1);
                            k.scayt_ignore = CKEDITOR.TRISTATE_OFF
                        }
                        if (a("all", v) || a("ignoreall", v)) {
                            d(c, "ignore_all", l.ignoreAll, "scayt_ignore_all", {
                                exec: function() {
                                    g.ignoreAll(i)
                                }
                            }, "scayt_control", 2);
                            k.scayt_ignore_all = CKEDITOR.TRISTATE_OFF
                        }
                        if (a("all",
                                v) || a("add", v)) {
                            d(c, "add_word", l.addWord, "scayt_add_word", {
                                exec: function() {
                                    window.scayt.addWordToUserDictionary(i)
                                }
                            }, "scayt_control", 3);
                            k.scayt_add_word = CKEDITOR.TRISTATE_OFF
                        }
                        g.fireOnContextMenu && g.fireOnContextMenu(c);
                        return k
                    });
                    e = function(a) {
                        a.removeListener();
                        CKEDITOR.env.opera || CKEDITOR.env.air || c.editable().isInline() ? q.setState(CKEDITOR.TRISTATE_DISABLED) : q.setState(h.isScaytEnabled(c) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                    };
                    c.on("showScaytState", e);
                    c.on("instanceReady", e);
                    if (c.config.scayt_autoStartup) c.on("instanceReady",
                        function() {
                            h.loadEngine(c)
                        })
                },
                afterInit: function(a) {
                    var b, c = function(a) {
                        if (a.hasAttribute("data-scaytid")) return false
                    };
                    a._.elementsPath && (b = a._.elementsPath.filters) && b.push(c);
                    a.addRemoveFormatFilter && a.addRemoveFormatFilter(c)
                }
            })
        })();
        (function() {
            CKEDITOR.plugins.add("selectall", {
                init: function(a) {
                    a.addCommand("selectAll", {
                        modes: {
                            wysiwyg: 1,
                            source: 1
                        },
                        exec: function(a) {
                            var c = a.editable();
                            if (c.is("textarea")) {
                                a = c.$;
                                if (CKEDITOR.env.ie) a.createTextRange().execCommand("SelectAll");
                                else {
                                    a.selectionStart =
                                        0;
                                    a.selectionEnd = a.value.length
                                }
                                a.focus()
                            } else {
                                if (c.is("body")) a.document.$.execCommand("SelectAll", false, null);
                                else {
                                    var h = a.createRange();
                                    h.selectNodeContents(c);
                                    h.select()
                                }
                                a.forceNextSelectionCheck();
                                a.selectionChange()
                            }
                        },
                        canUndo: false
                    });
                    a.ui.addButton && a.ui.addButton("SelectAll", {
                        label: a.lang.selectall.toolbar,
                        command: "selectAll",
                        toolbar: "selection,10"
                    })
                }
            })
        })();
        (function() {
            var a = {
                readOnly: 1,
                preserveState: true,
                editorFocus: false,
                exec: function(a) {
                    this.toggleState();
                    this.refresh(a)
                },
                refresh: function(a) {
                    if (a.document) {
                        var c =
                            this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
                        a.editable()[c]("cke_show_blocks")
                    }
                }
            };
            CKEDITOR.plugins.add("showblocks", {
                onLoad: function() {
                    function a(b) {
                        return ".%1.%2 p,.%1.%2 div,.%1.%2 pre,.%1.%2 address,.%1.%2 blockquote,.%1.%2 h1,.%1.%2 h2,.%1.%2 h3,.%1.%2 h4,.%1.%2 h5,.%1.%2 h6{background-position: top %3;padding-%3: 8px;}".replace(/%1/g, "cke_show_blocks").replace(/%2/g, "cke_contents_" + b).replace(/%3/g, b == "rtl" ? "right" : "left")
                    }
                    CKEDITOR.addCss(".%2 p,.%2 div,.%2 pre,.%2 address,.%2 blockquote,.%2 h1,.%2 h2,.%2 h3,.%2 h4,.%2 h5,.%2 h6{background-repeat: no-repeat;border: 1px dotted gray;padding-top: 8px;}.%2 p{%1p.png);}.%2 div{%1div.png);}.%2 pre{%1pre.png);}.%2 address{%1address.png);}.%2 blockquote{%1blockquote.png);}.%2 h1{%1h1.png);}.%2 h2{%1h2.png);}.%2 h3{%1h3.png);}.%2 h4{%1h4.png);}.%2 h5{%1h5.png);}.%2 h6{%1h6.png);}".replace(/%1/g,
                        "background-image: url(" + CKEDITOR.getUrl(this.path) + "images/block_").replace(/%2/g, "cke_show_blocks ") + a("ltr") + a("rtl"))
                },
                init: function(b) {
                    if (!b.blockless) {
                        var c = b.addCommand("showblocks", a);
                        c.canUndo = false;
                        b.config.startupOutlineBlocks && c.setState(CKEDITOR.TRISTATE_ON);
                        b.ui.addButton && b.ui.addButton("ShowBlocks", {
                            label: b.lang.showblocks.toolbar,
                            command: "showblocks",
                            toolbar: "tools,20"
                        });
                        b.on("mode", function() {
                            c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(b)
                        });
                        b.on("contentDom", function() {
                            c.state !=
                                CKEDITOR.TRISTATE_DISABLED && c.refresh(b)
                        })
                    }
                }
            })
        })();
        (function() {
            var a = {
                preserveState: true,
                editorFocus: false,
                readOnly: 1,
                exec: function(a) {
                    this.toggleState();
                    this.refresh(a)
                },
                refresh: function(a) {
                    if (a.document) {
                        var c = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
                        a.editable()[c]("cke_show_borders")
                    }
                }
            };
            CKEDITOR.plugins.add("showborders", {
                modes: {
                    wysiwyg: 1
                },
                onLoad: function() {
                    var a;
                    a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted",
                        "}"
                    ] : [".%1 table.%2,", ".%1 table.%2 > tr > td, .%1 table.%2 > tr > th,", ".%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,", ".%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,", ".%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th", "{", "border : #d3d3d3 1px dotted", "}"]).join("").replace(/%2/g, "cke_show_border").replace(/%1/g, "cke_show_borders ");
                    CKEDITOR.addCss(a)
                },
                init: function(b) {
                    var c = b.addCommand("showborders", a);
                    c.canUndo = false;
                    b.config.startupShowBorders !==
                        false && c.setState(CKEDITOR.TRISTATE_ON);
                    b.on("mode", function() {
                        c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(b)
                    }, null, null, 100);
                    b.on("contentDom", function() {
                        c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(b)
                    });
                    b.on("removeFormatCleanup", function(a) {
                        a = a.data;
                        b.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && (a.is("table") && (!a.hasAttribute("border") || parseInt(a.getAttribute("border"), 10) <= 0)) && a.addClass("cke_show_border")
                    })
                },
                afterInit: function(a) {
                    var c = a.dataProcessor,
                        a = c && c.dataFilter,
                        c = c &&
                        c.htmlFilter;
                    a && a.addRules({
                        elements: {
                            table: function(a) {
                                var a = a.attributes,
                                    b = a["class"],
                                    c = parseInt(a.border, 10);
                                if ((!c || c <= 0) && (!b || b.indexOf("cke_show_border") == -1)) a["class"] = (b || "") + " cke_show_border"
                            }
                        }
                    });
                    c && c.addRules({
                        elements: {
                            table: function(a) {
                                var a = a.attributes,
                                    b = a["class"];
                                b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/, ""))
                            }
                        }
                    })
                }
            });
            CKEDITOR.on("dialogDefinition", function(a) {
                var c = a.data.name;
                if (c == "table" || c == "tableProperties") {
                    a = a.data.definition;
                    c = a.getContents("info").get("txtBorder");
                    c.commit = CKEDITOR.tools.override(c.commit, function(a) {
                        return function(b, c) {
                            a.apply(this, arguments);
                            var f = parseInt(this.getValue(), 10);
                            c[!f || f <= 0 ? "addClass" : "removeClass"]("cke_show_border")
                        }
                    });
                    if (a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) {
                        a.setup = CKEDITOR.tools.override(a.setup, function(a) {
                            return function() {
                                a.apply(this, arguments);
                                this.setValue(this.getValue().replace(/cke_show_border/, ""))
                            }
                        });
                        a.commit = CKEDITOR.tools.override(a.commit, function(a) {
                            return function(b,
                                c) {
                                a.apply(this, arguments);
                                parseInt(c.getAttribute("border"), 10) || c.addClass("cke_show_border")
                            }
                        })
                    }
                }
            })
        })();
        CKEDITOR.plugins.add("smiley", {
            requires: "dialog",
            init: function(a) {
                a.config.smiley_path = a.config.smiley_path || this.path + "images/";
                a.addCommand("smiley", new CKEDITOR.dialogCommand("smiley"));
                a.ui.addButton && a.ui.addButton("Smiley", {
                    label: a.lang.smiley.toolbar,
                    command: "smiley",
                    toolbar: "insert,50"
                });
                CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js")
            }
        });
        CKEDITOR.config.smiley_images = "regular_smile.gif sad_smile.gif wink_smile.gif teeth_smile.gif confused_smile.gif tounge_smile.gif embaressed_smile.gif omg_smile.gif whatchutalkingabout_smile.gif angry_smile.gif angel_smile.gif shades_smile.gif devil_smile.gif cry_smile.gif lightbulb.gif thumbs_down.gif thumbs_up.gif heart.gif broken_heart.gif kiss.gif envelope.gif".split(" ");
        CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";");
        (function() {
            function a() {
                this.hide();
                this.setStyle("height", this.getParent().$.clientHeight + "px");
                this.setStyle("width", this.getParent().$.clientWidth + "px");
                this.show()
            }
            CKEDITOR.plugins.add("sourcearea", {
                init: function(c) {
                    if (c.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var h = CKEDITOR.plugins.sourcearea;
                        c.addMode("source",
                            function(d) {
                                var h = c.ui.space("contents").getDocument().createElement("textarea");
                                h.setStyles(CKEDITOR.tools.extend({
                                    width: CKEDITOR.env.ie7Compat ? "99%" : "100%",
                                    height: "100%",
                                    resize: "none",
                                    outline: "none",
                                    "text-align": "left"
                                }, CKEDITOR.tools.cssVendorPrefix("tab-size", c.config.sourceAreaTabSize || 4)));
                                var f = [c.lang.editor, c.name].join();
                                h.setAttributes({
                                    dir: "ltr",
                                    tabIndex: CKEDITOR.env.webkit ? -1 : c.tabIndex,
                                    role: "textbox",
                                    "aria-label": f
                                });
                                h.addClass("cke_source cke_reset cke_enable_context_menu");
                                c.ui.space("contents").append(h);
                                h = c.editable(new b(c, h));
                                h.setData(c.getData(1));
                                if (CKEDITOR.env.ie) {
                                    h.attachListener(c, "resize", a, h);
                                    h.attachListener(CKEDITOR.document.getWindow(), "resize", a, h);
                                    CKEDITOR.tools.setTimeout(a, 0, h)
                                }
                                c.fire("ariaWidget", this);
                                d()
                            });
                        c.addCommand("source", h.commands.source);
                        c.ui.addButton && c.ui.addButton("Source", {
                            label: c.lang.sourcearea.toolbar,
                            command: "source",
                            toolbar: "mode,10"
                        });
                        c.on("mode", function() {
                            c.getCommand("source").setState(c.mode == "source" ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                        })
                    }
                }
            });
            var b = CKEDITOR.tools.createClass({
                base: CKEDITOR.editable,
                proto: {
                    setData: function(a) {
                        this.setValue(a);
                        this.editor.fire("dataReady")
                    },
                    getData: function() {
                        return this.getValue()
                    },
                    insertHtml: function() {},
                    insertElement: function() {},
                    insertText: function() {},
                    setReadOnly: function(a) {
                        this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly")
                    },
                    detach: function() {
                        b.baseProto.detach.call(this);
                        this.clearCustomData();
                        this.remove()
                    }
                }
            })
        })();
        CKEDITOR.plugins.sourcearea = {
            commands: {
                source: {
                    modes: {
                        wysiwyg: 1,
                        source: 1
                    },
                    editorFocus: !1,
                    readOnly: 1,
                    exec: function(a) {
                        a.mode == "wysiwyg" && a.fire("saveSnapshot");
                        a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
                        a.setMode(a.mode == "source" ? "wysiwyg" : "source")
                    },
                    canUndo: !1
                }
            }
        };
        CKEDITOR.plugins.add("specialchar", {
            availableLangs: {
                cs: 1,
                cy: 1,
                de: 1,
                en: 1,
                eo: 1,
                et: 1,
                fa: 1,
                fi: 1,
                fr: 1,
                hr: 1,
                it: 1,
                nb: 1,
                nl: 1,
                no: 1,
                tr: 1,
                ug: 1,
                "zh-cn": 1
            },
            requires: "dialog",
            init: function(a) {
                var b = this;
                CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
                a.addCommand("specialchar", {
                    exec: function() {
                        var c =
                            a.langCode,
                            c = b.availableLangs[c] ? c : "en";
                        CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(b.path + "dialogs/lang/" + c + ".js"), function() {
                            CKEDITOR.tools.extend(a.lang.specialchar, b.langEntries[c]);
                            a.openDialog("specialchar")
                        })
                    },
                    modes: {
                        wysiwyg: 1
                    },
                    canUndo: false
                });
                a.ui.addButton && a.ui.addButton("SpecialChar", {
                    label: a.lang.specialchar.toolbar,
                    command: "specialchar",
                    toolbar: "insert,50"
                })
            }
        });
        CKEDITOR.config.specialChars = "! &quot; # $ % &amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ &euro; &lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &reg; &macr; &deg; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml; &OElig; &oelig; &#372; &#374 &#373 &#375; &sbquo; &#8219; &bdquo; &hellip; &trade; &#9658; &bull; &rarr; &rArr; &hArr; &diams; &asymp;".split(" ");
        (function() {
            function a(a, c) {
                var h = a.type,
                    d = c.type;
                return h == d ? 0 : h == CKEDITOR.STYLE_OBJECT ? -1 : d == CKEDITOR.STYLE_OBJECT ? 1 : d == CKEDITOR.STYLE_BLOCK ? 1 : -1
            }
            CKEDITOR.plugins.add("stylescombo", {
                requires: "richcombo",
                init: function(b) {
                    function c(c) {
                        b.getStylesSet(function(d) {
                            if (!f.length) {
                                for (var e, q, l = 0, n = d.length; l < n; l++) {
                                    e = d[l];
                                    if (!(b.blockless && e.element in CKEDITOR.dtd.$block)) {
                                        q = e.name;
                                        e = i[q] = new CKEDITOR.style(e);
                                        e._name = q;
                                        e._.enterMode = h.enterMode;
                                        f.push(e)
                                    }
                                }
                                f.sort(a)
                            }
                            c && c()
                        })
                    }
                    var h = b.config,
                        d = b.lang.stylescombo,
                        i = {},
                        f = [],
                        e;
                    b.ui.addRichCombo("Styles", {
                        label: d.label,
                        title: d.panelTitle,
                        toolbar: "styles,10",
                        panel: {
                            css: [CKEDITOR.skin.getPath("editor")].concat(h.contentsCss),
                            multiSelect: true,
                            attributes: {
                                "aria-label": d.panelTitle
                            }
                        },
                        init: function() {
                            e = this;
                            c(function() {
                                var a, b, c, h, i, n;
                                i = 0;
                                for (n = f.length; i < n; i++) {
                                    a = f[i];
                                    b = a._name;
                                    h = a.type;
                                    if (h != c) {
                                        e.startGroup(d["panelTitle" + h]);
                                        c = h
                                    }
                                    e.add(b, a.type == CKEDITOR.STYLE_OBJECT ? b : a.buildPreview(), b)
                                }
                                e.commit()
                            })
                        },
                        onClick: function(a) {
                            b.focus();
                            b.fire("saveSnapshot");
                            var a =
                                i[a],
                                c = b.elementPath();
                            b[a.checkActive(c) ? "removeStyle" : "applyStyle"](a);
                            b.fire("saveSnapshot")
                        },
                        onRender: function() {
                            b.on("selectionChange", function(a) {
                                for (var b = this.getValue(), a = a.data.path.elements, c = 0, d = a.length, e; c < d; c++) {
                                    e = a[c];
                                    for (var f in i)
                                        if (i[f].checkElementRemovable(e, true)) {
                                            f != b && this.setValue(f);
                                            return
                                        }
                                }
                                this.setValue("")
                            }, this)
                        },
                        onOpen: function() {
                            var a = b.getSelection().getSelectedElement(),
                                a = b.elementPath(a),
                                c = [0, 0, 0, 0];
                            this.showAll();
                            this.unmarkAll();
                            for (var e in i) {
                                var f = i[e],
                                    h = f.type;
                                if (h == CKEDITOR.STYLE_BLOCK && !a.isContextFor(f.element)) this.hideItem(e);
                                else {
                                    if (f.checkActive(a)) this.mark(e);
                                    else if (h == CKEDITOR.STYLE_OBJECT && !f.checkApplicable(a)) {
                                        this.hideItem(e);
                                        c[h]--
                                    }
                                    c[h]++
                                }
                            }
                            c[CKEDITOR.STYLE_BLOCK] || this.hideGroup(d["panelTitle" + CKEDITOR.STYLE_BLOCK]);
                            c[CKEDITOR.STYLE_INLINE] || this.hideGroup(d["panelTitle" + CKEDITOR.STYLE_INLINE]);
                            c[CKEDITOR.STYLE_OBJECT] || this.hideGroup(d["panelTitle" + CKEDITOR.STYLE_OBJECT])
                        },
                        reset: function() {
                            if (e) {
                                delete e._.panel;
                                delete e._.list;
                                e._.committed =
                                    0;
                                e._.items = {};
                                e._.state = CKEDITOR.TRISTATE_OFF
                            }
                            i = {};
                            f = [];
                            c()
                        }
                    });
                    b.on("instanceReady", function() {
                        c()
                    })
                }
            })
        })();
        (function() {
            function a(a) {
                return {
                    editorFocus: false,
                    canUndo: false,
                    modes: {
                        wysiwyg: 1
                    },
                    exec: function(b) {
                        if (b.editable().hasFocus) {
                            var c = b.getSelection(),
                                e;
                            if (e = (new CKEDITOR.dom.elementPath(c.getCommonAncestor(), c.root)).contains({
                                    td: 1,
                                    th: 1
                                }, 1)) {
                                var c = b.createRange(),
                                    g = CKEDITOR.tools.tryThese(function() {
                                        var b = e.getParent().$.cells[e.$.cellIndex + (a ? -1 : 1)];
                                        b.parentNode.parentNode;
                                        return b
                                    }, function() {
                                        var b =
                                            e.getParent(),
                                            b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)];
                                        return b.cells[a ? b.cells.length - 1 : 0]
                                    });
                                if (!g && !a) {
                                    for (var h = e.getAscendant("table").$, g = e.getParent().$.cells, h = new CKEDITOR.dom.element(h.insertRow(-1), b.document), k = 0, q = g.length; k < q; k++) {
                                        var l = h.append((new CKEDITOR.dom.element(g[k], b.document)).clone(false, false));
                                        !CKEDITOR.env.ie && l.appendBogus()
                                    }
                                    c.moveToElementEditStart(h)
                                } else if (g) {
                                    g = new CKEDITOR.dom.element(g);
                                    c.moveToElementEditStart(g);
                                    (!c.checkStartOfBlock() || !c.checkEndOfBlock()) &&
                                    c.selectNodeContents(g)
                                } else return true;
                                c.select(true);
                                return true
                            }
                        }
                        return false
                    }
                }
            }
            var b = {
                    editorFocus: false,
                    modes: {
                        wysiwyg: 1,
                        source: 1
                    }
                },
                c = {
                    exec: function(a) {
                        a.container.focusNext(true, a.tabIndex)
                    }
                },
                h = {
                    exec: function(a) {
                        a.container.focusPrevious(true, a.tabIndex)
                    }
                };
            CKEDITOR.plugins.add("tab", {
                init: function(d) {
                    for (var i = d.config.enableTabKeyTools !== false, f = d.config.tabSpaces || 0, e = ""; f--;) e = e + " ";
                    if (e) d.on("key", function(a) {
                        if (a.data.keyCode == 9) {
                            d.insertHtml(e);
                            a.cancel()
                        }
                    });
                    if (i) d.on("key", function(a) {
                        (a.data.keyCode ==
                            9 && d.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && d.execCommand("selectPreviousCell")) && a.cancel()
                    });
                    d.addCommand("blur", CKEDITOR.tools.extend(c, b));
                    d.addCommand("blurBack", CKEDITOR.tools.extend(h, b));
                    d.addCommand("selectNextCell", a());
                    d.addCommand("selectPreviousCell", a(true))
                }
            })
        })();
        CKEDITOR.dom.element.prototype.focusNext = function(a, b) {
            var c = b === void 0 ? this.getTabIndex() : b,
                h, d, i, f, e, g;
            if (c <= 0)
                for (e = this.getNextSourceNode(a, CKEDITOR.NODE_ELEMENT); e;) {
                    if (e.isVisible() && e.getTabIndex() ===
                        0) {
                        i = e;
                        break
                    }
                    e = e.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT)
                } else
                    for (e = this.getDocument().getBody().getFirst(); e = e.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT);) {
                        if (!h)
                            if (!d && e.equals(this)) {
                                d = true;
                                if (a) {
                                    if (!(e = e.getNextSourceNode(true, CKEDITOR.NODE_ELEMENT))) break;
                                    h = 1
                                }
                            } else d && !this.contains(e) && (h = 1);
                        if (e.isVisible() && !((g = e.getTabIndex()) < 0)) {
                            if (h && g == c) {
                                i = e;
                                break
                            }
                            if (g > c && (!i || !f || g < f)) {
                                i = e;
                                f = g
                            } else if (!i && g === 0) {
                                i = e;
                                f = g
                            }
                        }
                    }
            i && i.focus()
        };
        CKEDITOR.dom.element.prototype.focusPrevious = function(a,
            b) {
            for (var c = b === void 0 ? this.getTabIndex() : b, h, d, i, f = 0, e, g = this.getDocument().getBody().getLast(); g = g.getPreviousSourceNode(false, CKEDITOR.NODE_ELEMENT);) {
                if (!h)
                    if (!d && g.equals(this)) {
                        d = true;
                        if (a) {
                            if (!(g = g.getPreviousSourceNode(true, CKEDITOR.NODE_ELEMENT))) break;
                            h = 1
                        }
                    } else d && !this.contains(g) && (h = 1);
                if (g.isVisible() && !((e = g.getTabIndex()) < 0))
                    if (c <= 0) {
                        if (h && e === 0) {
                            i = g;
                            break
                        }
                        if (e > f) {
                            i = g;
                            f = e
                        }
                    } else {
                        if (h && e == c) {
                            i = g;
                            break
                        }
                        if (e < c && (!i || e > f)) {
                            i = g;
                            f = e
                        }
                    }
            }
            i && i.focus()
        };
        CKEDITOR.plugins.add("table", {
            requires: "dialog",
            init: function(a) {
                function b(a) {
                    return CKEDITOR.tools.extend(a || {}, {
                        contextSensitive: 1,
                        refresh: function(a, b) {
                            this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                        }
                    })
                }
                if (!a.blockless) {
                    var c = a.lang.table;
                    a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                        context: "table"
                    }));
                    a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", b()));
                    a.addCommand("tableDelete", b({
                        exec: function(a) {
                            var b = a.elementPath().contains("table", 1);
                            if (b) {
                                var c = b.getParent();
                                c.getChildCount() == 1 && !c.is("body", "td", "th") && (b = c);
                                a = a.createRange();
                                a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
                                b.remove();
                                a.select()
                            }
                        }
                    }));
                    a.ui.addButton && a.ui.addButton("Table", {
                        label: c.toolbar,
                        command: "table",
                        toolbar: "insert,30"
                    });
                    CKEDITOR.dialog.add("table", this.path + "dialogs/table.js");
                    CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js");
                    a.addMenuItems && a.addMenuItems({
                        table: {
                            label: c.menu,
                            command: "tableProperties",
                            group: "table",
                            order: 5
                        },
                        tabledelete: {
                            label: c.deleteTable,
                            command: "tableDelete",
                            group: "table",
                            order: 1
                        }
                    });
                    a.on("doubleclick", function(a) {
                        if (a.data.element.is("table")) a.data.dialog = "tableProperties"
                    });
                    a.contextMenu && a.contextMenu.addListener(function() {
                        return {
                            tabledelete: CKEDITOR.TRISTATE_OFF,
                            table: CKEDITOR.TRISTATE_OFF
                        }
                    })
                }
            }
        });
        (function() {
            function a(a) {
                function b(a) {
                    if (!(c.length > 0) && a.type == CKEDITOR.NODE_ELEMENT && l.test(a.getName()) && !a.getCustomData("selected_cell")) {
                        CKEDITOR.dom.element.setMarker(d, a, "selected_cell", true);
                        c.push(a)
                    }
                }
                for (var a = a.getRanges(),
                        c = [], d = {}, e = 0; e < a.length; e++) {
                    var f = a[e];
                    if (f.collapsed) {
                        f = f.getCommonAncestor();
                        (f = f.getAscendant("td", true) || f.getAscendant("th", true)) && c.push(f)
                    } else {
                        var f = new CKEDITOR.dom.walker(f),
                            g;
                        for (f.guard = b; g = f.next();)
                            if ((g = g.getAscendant("td") || g.getAscendant("th")) && !g.getCustomData("selected_cell")) {
                                CKEDITOR.dom.element.setMarker(d, g, "selected_cell", true);
                                c.push(g)
                            }
                    }
                }
                CKEDITOR.dom.element.clearAllMarkers(d);
                return c
            }

            function b(b, c) {
                for (var d = a(b), e = d[0], f = e.getAscendant("table"), e = e.getDocument(),
                        g = d[0].getParent(), h = g.$.rowIndex, d = d[d.length - 1], i = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = new CKEDITOR.dom.element(f.$.rows[i]), h = c ? h : i, g = c ? g : d, d = CKEDITOR.tools.buildTableMap(f), f = d[h], h = c ? d[h - 1] : d[h + 1], d = d[0].length, e = e.createElement("tr"), i = 0; f[i] && i < d; i++) {
                    var j;
                    if (f[i].rowSpan > 1 && h && f[i] == h[i]) {
                        j = f[i];
                        j.rowSpan = j.rowSpan + 1
                    } else {
                        j = (new CKEDITOR.dom.element(f[i])).clone();
                        j.removeAttribute("rowSpan");
                        !CKEDITOR.env.ie && j.appendBogus();
                        e.append(j);
                        j = j.$
                    }
                    i = i + (j.colSpan - 1)
                }
                c ? e.insertBefore(g) : e.insertAfter(g)
            }

            function c(b) {
                if (b instanceof CKEDITOR.dom.selection) {
                    for (var d = a(b), e = d[0].getAscendant("table"), f = CKEDITOR.tools.buildTableMap(e), b = d[0].getParent().$.rowIndex, d = d[d.length - 1], g = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = [], h = b; h <= g; h++) {
                        for (var i = f[h], j = new CKEDITOR.dom.element(e.$.rows[h]), k = 0; k < i.length; k++) {
                            var l = new CKEDITOR.dom.element(i[k]),
                                q = l.getParent().$.rowIndex;
                            if (l.$.rowSpan == 1) l.remove();
                            else {
                                l.$.rowSpan = l.$.rowSpan - 1;
                                if (q == h) {
                                    q = f[h + 1];
                                    q[k - 1] ? l.insertAfter(new CKEDITOR.dom.element(q[k -
                                        1])) : (new CKEDITOR.dom.element(e.$.rows[h + 1])).append(l, 1)
                                }
                            }
                            k = k + (l.$.colSpan - 1)
                        }
                        d.push(j)
                    }
                    f = e.$.rows;
                    e = new CKEDITOR.dom.element(f[g + 1] || (b > 0 ? f[b - 1] : null) || e.$.parentNode);
                    for (h = d.length; h >= 0; h--) c(d[h]);
                    return e
                }
                if (b instanceof CKEDITOR.dom.element) {
                    e = b.getAscendant("table");
                    e.$.rows.length == 1 ? e.remove() : b.remove()
                }
                return null
            }

            function h(a, b) {
                for (var c = b ? Infinity : 0, d = 0; d < a.length; d++) {
                    var e;
                    e = a[d];
                    for (var f = b, g = e.getParent().$.cells, h = 0, i = 0; i < g.length; i++) {
                        var j = g[i],
                            h = h + (f ? 1 : j.colSpan);
                        if (j == e.$) break
                    }
                    e =
                        h - 1;
                    if (b ? e < c : e > c) c = e
                }
                return c
            }

            function d(b, c) {
                for (var d = a(b), e = d[0].getAscendant("table"), f = h(d, 1), d = h(d), f = c ? f : d, g = CKEDITOR.tools.buildTableMap(e), e = [], d = [], i = g.length, j = 0; j < i; j++) {
                    e.push(g[j][f]);
                    var k = c ? g[j][f - 1] : g[j][f + 1];
                    k && d.push(k)
                }
                for (j = 0; j < i; j++) {
                    if (e[j].colSpan > 1 && d.length && d[j] == e[j]) {
                        f = e[j];
                        f.colSpan = f.colSpan + 1
                    } else {
                        f = (new CKEDITOR.dom.element(e[j])).clone();
                        f.removeAttribute("colSpan");
                        !CKEDITOR.env.ie && f.appendBogus();
                        f[c ? "insertBefore" : "insertAfter"].call(f, new CKEDITOR.dom.element(e[j]));
                        f = f.$
                    }
                    j = j + (f.rowSpan - 1)
                }
            }

            function i(a, b) {
                var c = a.getStartElement();
                if (c = c.getAscendant("td", 1) || c.getAscendant("th", 1)) {
                    var d = c.clone();
                    CKEDITOR.env.ie || d.appendBogus();
                    b ? d.insertBefore(c) : d.insertAfter(c)
                }
            }

            function f(b) {
                if (b instanceof CKEDITOR.dom.selection) {
                    var b = a(b),
                        c = b[0] && b[0].getAscendant("table"),
                        d;
                    a: {
                        var g = 0;
                        d = b.length - 1;
                        for (var h = {}, i, j; i = b[g++];) CKEDITOR.dom.element.setMarker(h, i, "delete_cell", true);
                        for (g = 0; i = b[g++];)
                            if ((j = i.getPrevious()) && !j.getCustomData("delete_cell") || (j = i.getNext()) &&
                                !j.getCustomData("delete_cell")) {
                                CKEDITOR.dom.element.clearAllMarkers(h);
                                d = j;
                                break a
                            }
                        CKEDITOR.dom.element.clearAllMarkers(h);
                        j = b[0].getParent();
                        if (j = j.getPrevious()) d = j.getLast();
                        else {
                            j = b[d].getParent();
                            d = (j = j.getNext()) ? j.getChild(0) : null
                        }
                    }
                    for (j = b.length - 1; j >= 0; j--) f(b[j]);
                    d ? e(d, true) : c && c.remove()
                } else if (b instanceof CKEDITOR.dom.element) {
                    c = b.getParent();
                    c.getChildCount() == 1 ? c.remove() : b.remove()
                }
            }

            function e(a, b) {
                var c = new CKEDITOR.dom.range(a.getDocument());
                if (!c["moveToElementEdit" + (b ? "End" :
                        "Start")](a)) {
                    c.selectNodeContents(a);
                    c.collapse(b ? false : true)
                }
                c.select(true)
            }

            function g(a, b, c) {
                a = a[b];
                if (typeof c == "undefined") return a;
                for (b = 0; a && b < a.length; b++) {
                    if (c.is && a[b] == c.$) return b;
                    if (b == c) return new CKEDITOR.dom.element(a[b])
                }
                return c.is ? -1 : null
            }

            function j(b, c, d) {
                var e = a(b),
                    f;
                if ((c ? e.length != 1 : e.length < 2) || (f = b.getCommonAncestor()) && f.type == CKEDITOR.NODE_ELEMENT && f.is("table")) return false;
                var h, b = e[0];
                f = b.getAscendant("table");
                var i = CKEDITOR.tools.buildTableMap(f),
                    j = i.length,
                    k = i[0].length,
                    l = b.getParent().$.rowIndex,
                    q = g(i, l, b);
                if (c) {
                    var y;
                    try {
                        var z = parseInt(b.getAttribute("rowspan"), 10) || 1;
                        h = parseInt(b.getAttribute("colspan"), 10) || 1;
                        y = i[c == "up" ? l - z : c == "down" ? l + z : l][c == "left" ? q - h : c == "right" ? q + h : q]
                    } catch (D) {
                        return false
                    }
                    if (!y || b.$ == y) return false;
                    e[c == "up" || c == "left" ? "unshift" : "push"](new CKEDITOR.dom.element(y))
                }
                for (var c = b.getDocument(), J = l, z = y = 0, B = !d && new CKEDITOR.dom.documentFragment(c), F = 0, c = 0; c < e.length; c++) {
                    h = e[c];
                    var E = h.getParent(),
                        A = h.getFirst(),
                        G = h.$.colSpan,
                        K = h.$.rowSpan,
                        E = E.$.rowIndex,
                        L = g(i, E, h),
                        F = F + G * K,
                        z = Math.max(z, L - q + G);
                    y = Math.max(y, E - l + K);
                    if (!d) {
                        G = h;
                        (K = G.getBogus()) && K.remove();
                        G.trim();
                        if (h.getChildren().count()) {
                            if (E != J && A && (!A.isBlockBoundary || !A.isBlockBoundary({
                                    br: 1
                                })))(J = B.getLast(CKEDITOR.dom.walker.whitespaces(true))) && (!J.is || !J.is("br")) && B.append("br");
                            h.moveChildren(B)
                        }
                        c ? h.remove() : h.setHtml("")
                    }
                    J = E
                }
                if (d) return y * z == F;
                B.moveChildren(b);
                CKEDITOR.env.ie || b.appendBogus();
                z >= k ? b.removeAttribute("rowSpan") : b.$.rowSpan = y;
                y >= j ? b.removeAttribute("colSpan") :
                    b.$.colSpan = z;
                d = new CKEDITOR.dom.nodeList(f.$.rows);
                e = d.count();
                for (c = e - 1; c >= 0; c--) {
                    f = d.getItem(c);
                    if (!f.$.cells.length) {
                        f.remove();
                        e++
                    }
                }
                return b
            }

            function k(b, c) {
                var d = a(b);
                if (d.length > 1) return false;
                if (c) return true;
                var d = d[0],
                    e = d.getParent(),
                    f = e.getAscendant("table"),
                    h = CKEDITOR.tools.buildTableMap(f),
                    i = e.$.rowIndex,
                    j = g(h, i, d),
                    k = d.$.rowSpan,
                    l;
                if (k > 1) {
                    l = Math.ceil(k / 2);
                    for (var k = Math.floor(k / 2), e = i + l, f = new CKEDITOR.dom.element(f.$.rows[e]), h = g(h, e), q, e = d.clone(), i = 0; i < h.length; i++) {
                        q = h[i];
                        if (q.parentNode ==
                            f.$ && i > j) {
                            e.insertBefore(new CKEDITOR.dom.element(q));
                            break
                        } else q = null
                    }
                    q || f.append(e, true)
                } else {
                    k = l = 1;
                    f = e.clone();
                    f.insertAfter(e);
                    f.append(e = d.clone());
                    q = g(h, i);
                    for (j = 0; j < q.length; j++) q[j].rowSpan++
                }
                CKEDITOR.env.ie || e.appendBogus();
                d.$.rowSpan = l;
                e.$.rowSpan = k;
                l == 1 && d.removeAttribute("rowSpan");
                k == 1 && e.removeAttribute("rowSpan");
                return e
            }

            function q(b, c) {
                var d = a(b);
                if (d.length > 1) return false;
                if (c) return true;
                var d = d[0],
                    e = d.getParent(),
                    f = e.getAscendant("table"),
                    f = CKEDITOR.tools.buildTableMap(f),
                    h =
                    g(f, e.$.rowIndex, d),
                    i = d.$.colSpan;
                if (i > 1) {
                    e = Math.ceil(i / 2);
                    i = Math.floor(i / 2)
                } else {
                    for (var i = e = 1, j = [], k = 0; k < f.length; k++) {
                        var l = f[k];
                        j.push(l[h]);
                        l[h].rowSpan > 1 && (k = k + (l[h].rowSpan - 1))
                    }
                    for (f = 0; f < j.length; f++) j[f].colSpan++
                }
                f = d.clone();
                f.insertAfter(d);
                CKEDITOR.env.ie || f.appendBogus();
                d.$.colSpan = e;
                f.$.colSpan = i;
                e == 1 && d.removeAttribute("colSpan");
                i == 1 && f.removeAttribute("colSpan");
                return f
            }
            var l = /^(?:td|th)$/;
            CKEDITOR.plugins.tabletools = {
                requires: "table,dialog,contextmenu",
                init: function(g) {
                    function h(a) {
                        return CKEDITOR.tools.extend(a || {}, {
                            contextSensitive: 1,
                            refresh: function(a, b) {
                                this.setState(b.contains({
                                    td: 1,
                                    th: 1
                                }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                            }
                        })
                    }
                    var l = g.lang.table;
                    g.addCommand("cellProperties", new CKEDITOR.dialogCommand("cellProperties", h()));
                    CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js");
                    g.addCommand("rowDelete", h({
                        exec: function(a) {
                            a = a.getSelection();
                            e(c(a))
                        }
                    }));
                    g.addCommand("rowInsertBefore", h({
                        exec: function(a) {
                            a = a.getSelection();
                            b(a, true)
                        }
                    }));
                    g.addCommand("rowInsertAfter", h({
                        exec: function(a) {
                            a =
                                a.getSelection();
                            b(a)
                        }
                    }));
                    g.addCommand("columnDelete", h({
                        exec: function(b) {
                            for (var b = b.getSelection(), b = a(b), c = b[0], d = b[b.length - 1], b = c.getAscendant("table"), f = CKEDITOR.tools.buildTableMap(b), g, h, i = [], j = 0, k = f.length; j < k; j++)
                                for (var l = 0, m = f[j].length; l < m; l++) {
                                    f[j][l] == c.$ && (g = l);
                                    f[j][l] == d.$ && (h = l)
                                }
                            for (j = g; j <= h; j++)
                                for (l = 0; l < f.length; l++) {
                                    d = f[l];
                                    c = new CKEDITOR.dom.element(b.$.rows[l]);
                                    d = new CKEDITOR.dom.element(d[j]);
                                    if (d.$) {
                                        d.$.colSpan == 1 ? d.remove() : d.$.colSpan = d.$.colSpan - 1;
                                        l = l + (d.$.rowSpan - 1);
                                        c.$.cells.length ||
                                            i.push(c)
                                    }
                                }
                            h = b.$.rows[0] && b.$.rows[0].cells;
                            g = new CKEDITOR.dom.element(h[g] || (g ? h[g - 1] : b.$.parentNode));
                            i.length == k && b.remove();
                            g && e(g, true)
                        }
                    }));
                    g.addCommand("columnInsertBefore", h({
                        exec: function(a) {
                            a = a.getSelection();
                            d(a, true)
                        }
                    }));
                    g.addCommand("columnInsertAfter", h({
                        exec: function(a) {
                            a = a.getSelection();
                            d(a)
                        }
                    }));
                    g.addCommand("cellDelete", h({
                        exec: function(a) {
                            a = a.getSelection();
                            f(a)
                        }
                    }));
                    g.addCommand("cellMerge", h({
                        exec: function(a) {
                            e(j(a.getSelection()), true)
                        }
                    }));
                    g.addCommand("cellMergeRight", h({
                        exec: function(a) {
                            e(j(a.getSelection(),
                                "right"), true)
                        }
                    }));
                    g.addCommand("cellMergeDown", h({
                        exec: function(a) {
                            e(j(a.getSelection(), "down"), true)
                        }
                    }));
                    g.addCommand("cellVerticalSplit", h({
                        exec: function(a) {
                            e(k(a.getSelection()))
                        }
                    }));
                    g.addCommand("cellHorizontalSplit", h({
                        exec: function(a) {
                            e(q(a.getSelection()))
                        }
                    }));
                    g.addCommand("cellInsertBefore", h({
                        exec: function(a) {
                            a = a.getSelection();
                            i(a, true)
                        }
                    }));
                    g.addCommand("cellInsertAfter", h({
                        exec: function(a) {
                            a = a.getSelection();
                            i(a)
                        }
                    }));
                    g.addMenuItems && g.addMenuItems({
                        tablecell: {
                            label: l.cell.menu,
                            group: "tablecell",
                            order: 1,
                            getItems: function() {
                                var b = g.getSelection(),
                                    c = a(b);
                                return {
                                    tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
                                    tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                                    tablecell_delete: CKEDITOR.TRISTATE_OFF,
                                    tablecell_merge: j(b, null, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_merge_right: j(b, "right", true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_merge_down: j(b, "down", true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_split_vertical: k(b, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_split_horizontal: q(b, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    tablecell_properties: c.length > 0 ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                                }
                            }
                        },
                        tablecell_insertBefore: {
                            label: l.cell.insertBefore,
                            group: "tablecell",
                            command: "cellInsertBefore",
                            order: 5
                        },
                        tablecell_insertAfter: {
                            label: l.cell.insertAfter,
                            group: "tablecell",
                            command: "cellInsertAfter",
                            order: 10
                        },
                        tablecell_delete: {
                            label: l.cell.deleteCell,
                            group: "tablecell",
                            command: "cellDelete",
                            order: 15
                        },
                        tablecell_merge: {
                            label: l.cell.merge,
                            group: "tablecell",
                            command: "cellMerge",
                            order: 16
                        },
                        tablecell_merge_right: {
                            label: l.cell.mergeRight,
                            group: "tablecell",
                            command: "cellMergeRight",
                            order: 17
                        },
                        tablecell_merge_down: {
                            label: l.cell.mergeDown,
                            group: "tablecell",
                            command: "cellMergeDown",
                            order: 18
                        },
                        tablecell_split_horizontal: {
                            label: l.cell.splitHorizontal,
                            group: "tablecell",
                            command: "cellHorizontalSplit",
                            order: 19
                        },
                        tablecell_split_vertical: {
                            label: l.cell.splitVertical,
                            group: "tablecell",
                            command: "cellVerticalSplit",
                            order: 20
                        },
                        tablecell_properties: {
                            label: l.cell.title,
                            group: "tablecellproperties",
                            command: "cellProperties",
                            order: 21
                        },
                        tablerow: {
                            label: l.row.menu,
                            group: "tablerow",
                            order: 1,
                            getItems: function() {
                                return {
                                    tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
                                    tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
                                    tablerow_delete: CKEDITOR.TRISTATE_OFF
                                }
                            }
                        },
                        tablerow_insertBefore: {
                            label: l.row.insertBefore,
                            group: "tablerow",
                            command: "rowInsertBefore",
                            order: 5
                        },
                        tablerow_insertAfter: {
                            label: l.row.insertAfter,
                            group: "tablerow",
                            command: "rowInsertAfter",
                            order: 10
                        },
                        tablerow_delete: {
                            label: l.row.deleteRow,
                            group: "tablerow",
                            command: "rowDelete",
                            order: 15
                        },
                        tablecolumn: {
                            label: l.column.menu,
                            group: "tablecolumn",
                            order: 1,
                            getItems: function() {
                                return {
                                    tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
                                    tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
                                    tablecolumn_delete: CKEDITOR.TRISTATE_OFF
                                }
                            }
                        },
                        tablecolumn_insertBefore: {
                            label: l.column.insertBefore,
                            group: "tablecolumn",
                            command: "columnInsertBefore",
                            order: 5
                        },
                        tablecolumn_insertAfter: {
                            label: l.column.insertAfter,
                            group: "tablecolumn",
                            command: "columnInsertAfter",
                            order: 10
                        },
                        tablecolumn_delete: {
                            label: l.column.deleteColumn,
                            group: "tablecolumn",
                            command: "columnDelete",
                            order: 15
                        }
                    });
                    g.contextMenu && g.contextMenu.addListener(function(a, b, c) {
                        return (a = c.contains({
                            td: 1,
                            th: 1
                        }, 1)) && !a.isReadOnly() ? {
                            tablecell: CKEDITOR.TRISTATE_OFF,
                            tablerow: CKEDITOR.TRISTATE_OFF,
                            tablecolumn: CKEDITOR.TRISTATE_OFF
                        } : null
                    })
                },
                getSelectedCells: a
            };
            CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
        })();
        CKEDITOR.tools.buildTableMap = function(a) {
            for (var a = a.$.rows, b = -1, c = [], h = 0; h < a.length; h++) {
                b++;
                !c[b] && (c[b] = []);
                for (var d = -1, i = 0; i < a[h].cells.length; i++) {
                    var f =
                        a[h].cells[i];
                    for (d++; c[b][d];) d++;
                    for (var e = isNaN(f.colSpan) ? 1 : f.colSpan, f = isNaN(f.rowSpan) ? 1 : f.rowSpan, g = 0; g < f; g++) {
                        c[b + g] || (c[b + g] = []);
                        for (var j = 0; j < e; j++) c[b + g][d + j] = a[h].cells[i]
                    }
                    d = d + (e - 1)
                }
            }
            return c
        };
        (function() {
            CKEDITOR.plugins.add("templates", {
                requires: "dialog",
                init: function(a) {
                    CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js"));
                    a.addCommand("templates", new CKEDITOR.dialogCommand("templates"));
                    a.ui.addButton && a.ui.addButton("Templates", {
                        label: a.lang.templates.button,
                        command: "templates",
                        toolbar: "doctools,10"
                    })
                }
            });
            var a = {},
                b = {};
            CKEDITOR.addTemplates = function(b, h) {
                a[b] = h
            };
            CKEDITOR.getTemplates = function(b) {
                return a[b]
            };
            CKEDITOR.loadTemplates = function(a, h) {
                for (var d = [], i = 0, f = a.length; i < f; i++)
                    if (!b[a[i]]) {
                        d.push(a[i]);
                        b[a[i]] = 1
                    }
                d.length ? CKEDITOR.scriptLoader.load(d, h) : setTimeout(h, 0)
            }
        })();
        CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")];
        CKEDITOR.config.templates_replaceContent = !0;
        (function() {
            function a(a) {
                function c() {
                    for (var g =
                            f(), h = a.config.toolbarGroups || b(a), i = 0; i < h.length; i++) {
                        var l = h[i];
                        if (l != "/") {
                            typeof l == "string" && (l = h[i] = {
                                name: l
                            });
                            var n, o = l.groups;
                            if (o)
                                for (var m = 0; m < o.length; m++) {
                                    n = o[m];
                                    (n = g[n]) && e(l, n)
                                }(n = g[l.name]) && e(l, n)
                        }
                    }
                    return h
                }

                function f() {
                    var b = {},
                        c, e, f;
                    for (c in a.ui.items) {
                        e = a.ui.items[c];
                        f = e.toolbar || "others";
                        f = f.split(",");
                        e = f[0];
                        f = parseInt(f[1] || -1, 10);
                        b[e] || (b[e] = []);
                        b[e].push({
                            name: c,
                            order: f
                        })
                    }
                    for (e in b) b[e] = b[e].sort(function(a, b) {
                        return a.order == b.order ? 0 : b.order < 0 ? -1 : a.order < 0 ? 1 : a.order < b.order ?
                            -1 : 1
                    });
                    return b
                }

                function e(a, b) {
                    if (b.length) {
                        a.items ? a.items.push("-") : a.items = [];
                        for (var c; c = b.shift();) a.items.push(c.name)
                    }
                }
                var g = a.config.toolbar;
                typeof g == "string" && (g = a.config["toolbar_" + g]);
                return g || c()
            }

            function b(a) {
                return a._.toolbarGroups || (a._.toolbarGroups = [{
                    name: "document",
                    groups: ["mode", "document", "doctools"]
                }, {
                    name: "clipboard",
                    groups: ["clipboard", "undo"]
                }, {
                    name: "editing",
                    groups: ["find", "selection", "spellchecker"]
                }, {
                    name: "forms"
                }, "/", {
                    name: "basicstyles",
                    groups: ["basicstyles", "cleanup"]
                }, {
                    name: "paragraph",
                    groups: ["list", "indent", "blocks", "align"]
                }, {
                    name: "links"
                }, {
                    name: "insert"
                }, "/", {
                    name: "styles"
                }, {
                    name: "colors"
                }, {
                    name: "tools"
                }, {
                    name: "others"
                }, {
                    name: "about"
                }])
            }
            var c = function() {
                this.toolbars = [];
                this.focusCommandExecuted = false
            };
            c.prototype.focus = function() {
                for (var a = 0, b; b = this.toolbars[a++];)
                    for (var c = 0, e; e = b.items[c++];)
                        if (e.focus) {
                            e.focus();
                            return
                        }
            };
            var h = {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                readOnly: 1,
                exec: function(a) {
                    if (a.toolbox) {
                        a.toolbox.focusCommandExecuted = true;
                        CKEDITOR.env.ie || CKEDITOR.env.air ?
                            setTimeout(function() {
                                a.toolbox.focus()
                            }, 100) : a.toolbox.focus()
                    }
                }
            };
            CKEDITOR.plugins.add("toolbar", {
                requires: "button",
                init: function(b) {
                    var i, f = function(a, c) {
                        var h, k = b.lang.dir == "rtl",
                            q = b.config.toolbarGroupCycling,
                            q = q === void 0 || q;
                        switch (c) {
                            case 9:
                            case CKEDITOR.SHIFT + 9:
                                for (; !h || !h.items.length;) {
                                    h = c == 9 ? (h ? h.next : a.toolbar.next) || b.toolbox.toolbars[0] : (h ? h.previous : a.toolbar.previous) || b.toolbox.toolbars[b.toolbox.toolbars.length - 1];
                                    if (h.items.length)
                                        for (a = h.items[i ? h.items.length - 1 : 0]; a && !a.focus;)(a =
                                            i ? a.previous : a.next) || (h = 0)
                                }
                                a && a.focus();
                                return false;
                            case k ? 37:
                                39:
                                    case 40:
                                h = a;
                                do {
                                    h = h.next;
                                    !h && q && (h = a.toolbar.items[0])
                                } while (h && !h.focus);
                                h ? h.focus() : f(a, 9);
                                return false;
                            case k ? 39:
                                37:
                                    case 38:
                                h = a;
                                do {
                                    h = h.previous;
                                    !h && q && (h = a.toolbar.items[a.toolbar.items.length - 1])
                                } while (h && !h.focus);
                                if (h) h.focus();
                                else {
                                    i = 1;
                                    f(a, CKEDITOR.SHIFT + 9);
                                    i = 0
                                }
                                return false;
                            case 27:
                                b.focus();
                                return false;
                            case 13:
                            case 32:
                                a.execute();
                                return false
                        }
                        return true
                    };
                    b.on("uiSpace", function(e) {
                        if (e.data.space == b.config.toolbarLocation) {
                            b.toolbox =
                                new c;
                            var g = CKEDITOR.tools.getNextId(),
                                h = ['<span id="', g, '" class="cke_voice_label">', b.lang.toolbar.toolbars, "</span>", '<span id="' + b.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', g, '" onmousedown="return false;"'],
                                g = b.config.toolbarStartupExpanded !== false,
                                i, q;
                            h.push(g ? ">" : ' style="display:none">');
                            b.config.toolbarCanCollapse && h.push('<span class="cke_toolbox_main">');
                            for (var l = b.toolbox.toolbars, n = a(b), o = 0; o < n.length; o++) {
                                var m, p = 0,
                                    s, r = n[o],
                                    t;
                                if (r) {
                                    if (i) {
                                        h.push("</span>");
                                        q = i = 0
                                    }
                                    if (r === "/") h.push('<span class="cke_toolbar_break"></span>');
                                    else {
                                        t = r.items || r;
                                        for (var u = 0; u < t.length; u++) {
                                            var v, w;
                                            if (v = b.ui.create(t[u]))
                                                if (v.type == CKEDITOR.UI_SEPARATOR) q = i && v;
                                                else {
                                                    w = v.canGroup !== false;
                                                    if (!p) {
                                                        m = CKEDITOR.tools.getNextId();
                                                        p = {
                                                            id: m,
                                                            items: []
                                                        };
                                                        s = r.name && (b.lang.toolbar.toolbarGroups[r.name] || r.name);
                                                        h.push('<span id="', m, '" class="cke_toolbar"', s ? ' aria-labelledby="' + m + '_label"' : "", ' role="toolbar">');
                                                        s && h.push('<span id="', m, '_label" class="cke_voice_label">', s, "</span>");
                                                        h.push('<span class="cke_toolbar_start"></span>');
                                                        var x = l.push(p) - 1;
                                                        if (x > 0) {
                                                            p.previous = l[x - 1];
                                                            p.previous.next = p
                                                        }
                                                    }
                                                    if (w) {
                                                        if (!i) {
                                                            h.push('<span class="cke_toolgroup" role="presentation">');
                                                            i = 1
                                                        }
                                                    } else if (i) {
                                                        h.push("</span>");
                                                        i = 0
                                                    }
                                                    m = function(a) {
                                                        a = a.render(b, h);
                                                        x = p.items.push(a) - 1;
                                                        if (x > 0) {
                                                            a.previous = p.items[x - 1];
                                                            a.previous.next = a
                                                        }
                                                        a.toolbar = p;
                                                        a.onkey = f;
                                                        a.onfocus = function() {
                                                            b.toolbox.focusCommandExecuted || b.focus()
                                                        }
                                                    };
                                                    if (q) {
                                                        m(q);
                                                        q = 0
                                                    }
                                                    m(v)
                                                }
                                        }
                                        if (i) {
                                            h.push("</span>");
                                            q = i = 0
                                        }
                                        p && h.push('<span class="cke_toolbar_end"></span></span>')
                                    }
                                }
                            }
                            b.config.toolbarCanCollapse && h.push("</span>");
                            if (b.config.toolbarCanCollapse && b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                var y = CKEDITOR.tools.addFunction(function() {
                                    b.execCommand("toolbarCollapse")
                                });
                                b.on("destroy", function() {
                                    CKEDITOR.tools.removeFunction(y)
                                });
                                b.addCommand("toolbarCollapse", {
                                    readOnly: 1,
                                    exec: function(a) {
                                        var b = a.ui.space("toolbar_collapser"),
                                            c = b.getPrevious(),
                                            d = a.ui.space("contents"),
                                            e = c.getParent(),
                                            f = parseInt(d.$.style.height, 10),
                                            g = e.$.offsetHeight,
                                            h = b.hasClass("cke_toolbox_collapser_min");
                                        if (h) {
                                            c.show();
                                            b.removeClass("cke_toolbox_collapser_min");
                                            b.setAttribute("title", a.lang.toolbar.toolbarCollapse)
                                        } else {
                                            c.hide();
                                            b.addClass("cke_toolbox_collapser_min");
                                            b.setAttribute("title", a.lang.toolbar.toolbarExpand)
                                        }
                                        b.getFirst().setText(h ? "?" : "?");
                                        d.setStyle("height", f - (e.$.offsetHeight - g) + "px");
                                        a.fire("resize")
                                    },
                                    modes: {
                                        wysiwyg: 1,
                                        source: 1
                                    }
                                });
                                b.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                                h.push('<a title="' + (g ? b.lang.toolbar.toolbarCollapse : b.lang.toolbar.toolbarExpand) + '" id="' + b.ui.spaceId("toolbar_collapser") +
                                    '" tabIndex="-1" class="cke_toolbox_collapser');
                                g || h.push(" cke_toolbox_collapser_min");
                                h.push('" onclick="CKEDITOR.tools.callFunction(' + y + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>")
                            }
                            h.push("</span>");
                            e.data.html = e.data.html + h.join("")
                        }
                    });
                    b.on("destroy", function() {
                        if (this.toolbox) {
                            var a, b = 0,
                                c, d, f;
                            for (a = this.toolbox.toolbars; b < a.length; b++) {
                                d = a[b].items;
                                for (c = 0; c < d.length; c++) {
                                    f = d[c];
                                    f.clickFn && CKEDITOR.tools.removeFunction(f.clickFn);
                                    f.keyDownFn && CKEDITOR.tools.removeFunction(f.keyDownFn)
                                }
                            }
                        }
                    });
                    b.on("uiReady", function() {
                        var a = b.ui.space("toolbox");
                        a && b.focusManager.add(a, 1)
                    });
                    b.addCommand("toolbarFocus", h);
                    b.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
                    b.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
                    b.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
                        create: function() {
                            return {
                                render: function(a, b) {
                                    b.push('<span class="cke_toolbar_separator" role="separator"></span>');
                                    return {}
                                }
                            }
                        }
                    })
                }
            });
            CKEDITOR.ui.prototype.addToolbarGroup = function(a, c, f) {
                var e = b(this.editor),
                    g = c === 0,
                    h = {
                        name: a
                    };
                if (f) {
                    if (f = CKEDITOR.tools.search(e,
                            function(a) {
                                return a.name == f
                            })) {
                        !f.groups && (f.groups = []);
                        if (c) {
                            c = CKEDITOR.tools.indexOf(f.groups, c);
                            if (c >= 0) {
                                f.groups.splice(c + 1, 0, a);
                                return
                            }
                        }
                        g ? f.groups.splice(0, 0, a) : f.groups.push(a);
                        return
                    }
                    c = null
                }
                c && (c = CKEDITOR.tools.indexOf(e, function(a) {
                    return a.name == c
                }));
                g ? e.splice(0, 0, a) : typeof c == "number" ? e.splice(c + 1, 0, h) : e.push(a)
            }
        })();
        CKEDITOR.UI_SEPARATOR = "separator";
        CKEDITOR.config.toolbarLocation = "top";
        (function() {
            function a(a) {
                this.editor = a;
                this.reset()
            }
            CKEDITOR.plugins.add("undo", {
                init: function(b) {
                    function c(a) {
                        d.enabled &&
                            a.data.command.canUndo !== false && d.save()
                    }
                    var d = new a(b),
                        h = b.addCommand("undo", {
                            exec: function() {
                                if (d.undo()) {
                                    b.selectionChange();
                                    this.fire("afterUndo")
                                }
                            },
                            state: CKEDITOR.TRISTATE_DISABLED,
                            canUndo: false
                        }),
                        i = b.addCommand("redo", {
                            exec: function() {
                                if (d.redo()) {
                                    b.selectionChange();
                                    this.fire("afterRedo")
                                }
                            },
                            state: CKEDITOR.TRISTATE_DISABLED,
                            canUndo: false
                        });
                    b.setKeystroke([
                        [CKEDITOR.CTRL + 90, "undo"],
                        [CKEDITOR.CTRL + 89, "redo"],
                        [CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, "redo"]
                    ]);
                    d.onChange = function() {
                        h.setState(d.undoable() ?
                            CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                        i.setState(d.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                    };
                    b.on("beforeCommandExec", c);
                    b.on("afterCommandExec", c);
                    b.on("saveSnapshot", function(a) {
                        d.save(a.data && a.data.contentOnly)
                    });
                    b.on("contentDom", function() {
                        b.editable().on("keydown", function(a) {
                            !a.data.$.ctrlKey && !a.data.$.metaKey && d.type(a)
                        })
                    });
                    b.on("beforeModeUnload", function() {
                        b.mode == "wysiwyg" && d.save(true)
                    });
                    b.on("mode", function() {
                        d.enabled = b.readOnly ? false : b.mode == "wysiwyg";
                        d.onChange()
                    });
                    if (b.ui.addButton) {
                        b.ui.addButton("Undo", {
                            label: b.lang.undo.undo,
                            command: "undo",
                            toolbar: "undo,10"
                        });
                        b.ui.addButton("Redo", {
                            label: b.lang.undo.redo,
                            command: "redo",
                            toolbar: "undo,20"
                        })
                    }
                    b.resetUndo = function() {
                        d.reset();
                        b.fire("saveSnapshot")
                    };
                    b.on("updateSnapshot", function() {
                        d.currentImage && d.update()
                    })
                }
            });
            CKEDITOR.plugins.undo = {};
            var b = CKEDITOR.plugins.undo.Image = function(a) {
                    this.editor = a;
                    a.fire("beforeUndoImage");
                    var b = a.getSnapshot(),
                        c = b && a.getSelection();
                    CKEDITOR.env.ie && b && (b = b.replace(/\s+data-cke-expando=".*?"/g,
                        ""));
                    this.contents = b;
                    this.bookmarks = c && c.createBookmarks2(true);
                    a.fire("afterUndoImage")
                },
                c = /\b(?:href|src|name)="[^"]*?"/gi;
            b.prototype = {
                equals: function(a, b) {
                    var d = this.contents,
                        h = a.contents;
                    if (CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat)) {
                        d = d.replace(c, "");
                        h = h.replace(c, "")
                    }
                    if (d != h) return false;
                    if (b) return true;
                    d = this.bookmarks;
                    h = a.bookmarks;
                    if (d || h) {
                        if (!d || !h || d.length != h.length) return false;
                        for (var i = 0; i < d.length; i++) {
                            var q = d[i],
                                l = h[i];
                            if (q.startOffset != l.startOffset || q.endOffset !=
                                l.endOffset || !CKEDITOR.tools.arrayCompare(q.start, l.start) || !CKEDITOR.tools.arrayCompare(q.end, l.end)) return false
                        }
                    }
                    return true
                }
            };
            var h = {
                    8: 1,
                    46: 1
                },
                d = {
                    16: 1,
                    17: 1,
                    18: 1
                },
                i = {
                    37: 1,
                    38: 1,
                    39: 1,
                    40: 1
                };
            a.prototype = {
                type: function(a) {
                    var a = a && a.data.getKey(),
                        c = a in h,
                        g = this.lastKeystroke in h,
                        j = c && a == this.lastKeystroke,
                        k = a in i,
                        q = this.lastKeystroke in i;
                    if (!(a in d || this.typing) || !c && !k && (g || q) || c && !j) {
                        var l = new b(this.editor),
                            n = this.snapshots.length;
                        CKEDITOR.tools.setTimeout(function() {
                            var a = this.editor.getSnapshot();
                            CKEDITOR.env.ie && (a = a.replace(/\s+data-cke-expando=".*?"/g, ""));
                            if (l.contents != a && n == this.snapshots.length) {
                                this.typing = true;
                                this.save(false, l, false) || this.snapshots.splice(this.index + 1, this.snapshots.length - this.index - 1);
                                this.hasUndo = true;
                                this.hasRedo = false;
                                this.modifiersCount = this.typesCount = 1;
                                this.onChange()
                            }
                        }, 0, this)
                    }
                    this.lastKeystroke = a;
                    if (c) {
                        this.typesCount = 0;
                        this.modifiersCount++;
                        if (this.modifiersCount > 25) {
                            this.save(false, null, false);
                            this.modifiersCount = 1
                        }
                    } else if (!k) {
                        this.modifiersCount = 0;
                        this.typesCount++;
                        if (this.typesCount > 25) {
                            this.save(false, null, false);
                            this.typesCount = 1
                        }
                    }
                },
                reset: function() {
                    this.lastKeystroke = 0;
                    this.snapshots = [];
                    this.index = -1;
                    this.limit = this.editor.config.undoStackSize || 20;
                    this.currentImage = null;
                    this.isLocked = this.hasRedo = this.hasUndo = false;
                    this.resetType()
                },
                resetType: function() {
                    this.typing = false;
                    delete this.lastKeystroke;
                    this.modifiersCount = this.typesCount = 0
                },
                fireChange: function() {
                    this.hasUndo = !!this.getNextImage(true);
                    this.hasRedo = !!this.getNextImage(false);
                    this.resetType();
                    this.onChange()
                },
                save: function(a, c, d) {
                    if (this.isLocked) return false;
                    var h = this.snapshots;
                    c || (c = new b(this.editor));
                    if (c.contents === false || this.currentImage && c.equals(this.currentImage, a)) return false;
                    h.splice(this.index + 1, h.length - this.index - 1);
                    h.length == this.limit && h.shift();
                    this.index = h.push(c) - 1;
                    this.currentImage = c;
                    d !== false && this.fireChange();
                    return true
                },
                restoreImage: function(a) {
                    var b = this.editor,
                        c;
                    if (a.bookmarks) {
                        b.focus();
                        c = b.getSelection()
                    }
                    this.editor.loadSnapshot(a.contents);
                    this.isLocked =
                        true;
                    if (a.bookmarks) c.selectBookmarks(a.bookmarks);
                    else if (CKEDITOR.env.ie) {
                        b = this.editor.document.getBody().$.createTextRange();
                        b.collapse(true);
                        b.select()
                    }
                    this.isLocked = false;
                    this.index = a.index;
                    this.update();
                    this.fireChange()
                },
                getNextImage: function(a) {
                    var b = this.snapshots,
                        c = this.currentImage,
                        d;
                    if (c)
                        if (a)
                            for (d = this.index - 1; d >= 0; d--) {
                                a = b[d];
                                if (!c.equals(a, true)) {
                                    a.index = d;
                                    return a
                                }
                            } else
                                for (d = this.index + 1; d < b.length; d++) {
                                    a = b[d];
                                    if (!c.equals(a, true)) {
                                        a.index = d;
                                        return a
                                    }
                                }
                        return null
                },
                redoable: function() {
                    return this.enabled &&
                        this.hasRedo
                },
                undoable: function() {
                    return this.enabled && this.hasUndo
                },
                undo: function() {
                    if (this.undoable()) {
                        this.save(true);
                        var a = this.getNextImage(true);
                        if (a) return this.restoreImage(a), true
                    }
                    return false
                },
                redo: function() {
                    if (this.redoable()) {
                        this.save(true);
                        if (this.redoable()) {
                            var a = this.getNextImage(false);
                            if (a) return this.restoreImage(a), true
                        }
                    }
                    return false
                },
                update: function() {
                    if (!this.isLocked) this.snapshots.splice(this.index, 1, this.currentImage = new b(this.editor))
                }
            }
        })();
        CKEDITOR.plugins.add("wsc", {
            requires: "dialog",
            init: function(a) {
                a.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = {
                    wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname
                };
                a.ui.addButton && a.ui.addButton("SpellChecker", {
                    label: a.lang.wsc.toolbar,
                    command: "checkspell",
                    toolbar: "spellchecker,10"
                });
                CKEDITOR.dialog.add("checkspell", this.path + "dialogs/wsc.js")
            }
        });
        CKEDITOR.config.wsc_customerId = CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";
        CKEDITOR.config.wsc_customLoaderScript = CKEDITOR.config.wsc_customLoaderScript || null;
        (function() {
            function a(a) {
                var b = this.editor,
                    d = a.document,
                    f = d.body;
                (a = d.getElementById("cke_actscrpt")) && a.parentNode.removeChild(a);
                f.spellcheck = !b.config.disableNativeSpellChecker;
                if (CKEDITOR.env.gecko) {
                    f.contentEditable = false;
                    if (CKEDITOR.env.version < 2E4) {
                        f.innerHTML = f.innerHTML.replace(/^.*<\!-- cke-content-start --\>/, "");
                        setTimeout(function() {
                            var a = new CKEDITOR.dom.range(new CKEDITOR.dom.document(d));
                            a.setStart(new CKEDITOR.dom.node(f),
                                0);
                            b.getSelection().selectRanges([a])
                        }, 0)
                    }
                }
                f.contentEditable = true;
                if (CKEDITOR.env.ie) {
                    f.hideFocus = true;
                    f.disabled = true;
                    f.removeAttribute("disabled")
                }
                delete this._.isLoadingData;
                this.$ = f;
                d = new CKEDITOR.dom.document(d);
                this.setup();
                if (CKEDITOR.env.ie) {
                    d.getDocumentElement().addClass(d.$.compatMode);
                    b.config.enterMode != CKEDITOR.ENTER_P && d.on("selectionchange", function() {
                        var a = d.getBody(),
                            c = b.getSelection(),
                            e = c && c.getRanges()[0];
                        e && (a.getHtml().match(/^<p>&nbsp;<\/p>$/i) && e.startContainer.equals(a)) &&
                            setTimeout(function() {
                                e = b.getSelection().getRanges()[0];
                                if (!e.startContainer.equals("body")) {
                                    a.getFirst().remove(1);
                                    e.moveToElementEditEnd(a);
                                    e.select()
                                }
                            }, 0)
                    })
                }
                CKEDITOR.env.gecko && CKEDITOR.tools.setTimeout(c, 0, this, b);
                try {
                    b.document.$.execCommand("2D-position", false, true)
                } catch (h) {}
                try {
                    b.document.$.execCommand("enableInlineTableEditing", false, !b.config.disableNativeTableHandles)
                } catch (i) {}
                if (b.config.disableObjectResizing) try {
                    this.getDocument().$.execCommand("enableObjectResizing", false, false)
                } catch (n) {
                    this.attachListener(this,
                        CKEDITOR.env.ie ? "resizestart" : "resize",
                        function(a) {
                            a.data.preventDefault()
                        })
                }(CKEDITOR.env.gecko || CKEDITOR.env.ie && b.document.$.compatMode == "CSS1Compat") && this.attachListener(this, "keydown", function(a) {
                    var c = a.data.getKeystroke();
                    if (c == 33 || c == 34)
                        if (CKEDITOR.env.ie) setTimeout(function() {
                            b.getSelection().scrollIntoView()
                        }, 0);
                        else if (b.window.$.innerHeight > this.$.offsetHeight) {
                        var d = b.createRange();
                        d[c == 33 ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
                        d.select();
                        a.data.preventDefault()
                    }
                });
                if (CKEDITOR.env.ie) this.on("blur",
                    function() {
                        try {
                            d.$.selection.empty()
                        } catch (a) {}
                    });
                b.document.getElementsByTag("title").getItem(0).data("cke-title", b.document.$.title);
                if (CKEDITOR.env.ie) b.document.$.title = this._.docTitle;
                CKEDITOR.tools.setTimeout(function() {
                    b.fire("contentDom");
                    if (this._.isPendingFocus) {
                        b.focus();
                        this._.isPendingFocus = false
                    }
                    setTimeout(function() {
                        b.fire("dataReady")
                    }, 0);
                    CKEDITOR.env.ie && setTimeout(function() {
                            if (b.document) {
                                var a = b.document.$.body;
                                a.runtimeStyle.marginBottom = "0px";
                                a.runtimeStyle.marginBottom = ""
                            }
                        },
                        1E3)
                }, 0, this)
            }

            function b(a) {
                a.checkDirty() || setTimeout(function() {
                    a.resetDirty()
                }, 0)
            }

            function c(a) {
                if (!a.readOnly) {
                    var c = a.window,
                        d = a.document,
                        f = d.getBody(),
                        h = f.getFirst(),
                        i = f.getChildren().count();
                    if (!i || i == 1 && h.type == CKEDITOR.NODE_ELEMENT && h.hasAttribute("_moz_editor_bogus_node")) {
                        b(a);
                        var h = CKEDITOR.document,
                            n = h.getDocumentElement(),
                            o = n.$.scrollTop,
                            m = n.$.scrollLeft,
                            p = d.$.createEvent("KeyEvents");
                        p.initKeyEvent("keypress", true, true, c.$, false, false, false, false, 0, 32);
                        d.$.dispatchEvent(p);
                        (o != n.$.scrollTop ||
                            m != n.$.scrollLeft) && h.getWindow().$.scrollTo(m, o);
                        i && f.getFirst().remove();
                        d.getBody().appendBogus();
                        a = a.createRange();
                        a.setStartAt(f, CKEDITOR.POSITION_AFTER_START);
                        a.select()
                    }
                }
            }

            function h() {
                var a = [];
                if (CKEDITOR.document.$.documentMode >= 8) {
                    a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
                    var b = [],
                        c;
                    for (c in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + c + "[contenteditable=false]");
                    a.push(b.join(",") + "{display:inline-block}")
                } else if (CKEDITOR.env.gecko) {
                    a.push("html{height:100% !important}");
                    a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")
                } else CKEDITOR.env.ie && CKEDITOR.env.version < 8 && a.push("body.cke_contents_ltr{margin-right:0}");
                a.push("html{_overflow-y:scroll;cursor:text;*cursor:auto}");
                a.push("img,input,textarea{cursor:default}");
                return a.join("\n")
            }
            CKEDITOR.plugins.add("wysiwygarea", {
                init: function(a) {
                    a.addMode("wysiwyg", function(b) {
                        function c(h) {
                            h && h.removeListener();
                            a.editable(new f(a, d.$.contentWindow.document.body));
                            a.setData(a.getData(1),
                                b)
                        }
                        var d = CKEDITOR.document.createElement("iframe");
                        d.setStyles({
                            width: "100%",
                            height: "100%"
                        });
                        d.addClass("cke_wysiwyg_frame cke_reset");
                        var h = a.ui.space("contents");
                        h.append(d);
                        var l = "document.open();" + (i ? 'document.domain="' + document.domain + '";' : "") + "document.close();",
                            l = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent(l) + "}())" : "",
                            n = CKEDITOR.env.ie || CKEDITOR.env.gecko;
                        if (n) d.on("load", c);
                        var o = [a.lang.editor, a.name].join(),
                            m = a.lang.common.editorHelp;
                        CKEDITOR.env.ie && (o = o + (", " + m));
                        var p = CKEDITOR.tools.getNextId(),
                            s = CKEDITOR.dom.element.createFromHtml('<span id="' + p + '" class="cke_voice_label">' + m + "</span>");
                        h.append(s, 1);
                        a.on("beforeModeUnload", function(a) {
                            a.removeListener();
                            s.remove()
                        });
                        d.setAttributes({
                            frameBorder: 0,
                            "aria-describedby": p,
                            title: o,
                            src: l,
                            tabIndex: a.tabIndex,
                            allowTransparency: "true"
                        });
                        !n && c();
                        if (CKEDITOR.env.webkit) {
                            l = function() {
                                h.setStyle("width", "100%");
                                d.hide();
                                d.setSize("width", h.getSize("width"));
                                h.removeStyle("width");
                                d.show()
                            };
                            d.setCustomData("onResize", l);
                            CKEDITOR.document.getWindow().on("resize", l)
                        }
                        a.fire("ariaWidget", d)
                    })
                }
            });
            var d = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
                i = CKEDITOR.env.isCustomDomain(),
                f = CKEDITOR.tools.createClass({
                    $: function(b) {
                        this.base.apply(this, arguments);
                        this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(b) {
                            CKEDITOR.tools.setTimeout(a, 0, this, b)
                        }, this);
                        this._.docTitle = this.getWindow().getFrame().getAttribute("title")
                    },
                    base: CKEDITOR.editable,
                    proto: {
                        setData: function(a, b) {
                            var c = this.editor;
                            if (b) this.setHtml(a);
                            else {
                                this._.isLoadingData = true;
                                c._.dataStore = {
                                    id: 1
                                };
                                var d = c.config,
                                    f = d.fullPage,
                                    l = d.docType,
                                    n = CKEDITOR.tools.buildStyleHtml(h());
                                f || (n = n + CKEDITOR.tools.buildStyleHtml(c.config.contentsCss));
                                var o = d.baseHref ? '<base href="' + d.baseHref + '" data-cke-temp="1" />' : "";
                                f && (a = a.replace(/<!DOCTYPE[^>]*>/i, function(a) {
                                    c.docType = l = a;
                                    return ""
                                }).replace(/<\?xml\s[^\?]*\?>/i, function(a) {
                                    c.xmlDeclaration = a;
                                    return ""
                                }));
                                c.dataProcessor &&
                                    (a = c.dataProcessor.toHtml(a));
                                if (f) {
                                    /<body[\s|>]/.test(a) || (a = "<body>" + a);
                                    /<html[\s|>]/.test(a) || (a = "<html>" + a + "</html>");
                                    /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$&<title></title>")) : a = a.replace(/<html[^>]*>/, "$&<head><title></title></head>");
                                    o && (a = a.replace(/<head>/, "$&" + o));
                                    a = a.replace(/<\/head\s*>/, n + "$&");
                                    a = l + a
                                } else a = d.docType + '<html dir="' + d.contentsLangDirection + '" lang="' + (d.contentsLanguage || c.langCode) + '"><head><title>' + this._.docTitle + "</title>" + o + n + "</head><body" +
                                    (d.bodyId ? ' id="' + d.bodyId + '"' : "") + (d.bodyClass ? ' class="' + d.bodyClass + '"' : "") + ">" + a + "</body></html>";
                                if (CKEDITOR.env.gecko) {
                                    a = a.replace(/<body/, '<body contenteditable="true" ');
                                    a = a.replace(/<br \/>(?=\s*<\/(:?html|body)>)/, '$&<br type="_moz" />');
                                    CKEDITOR.env.version < 2E4 && (a = a.replace(/<body[^>]*>/, "$&<\!-- cke-content-start --\>"))
                                }
                                a = a.replace(/(?=\s*<\/(:?head)>)/, '<script id="cke_actscrpt" type="text/javascript"' + (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">" + (i ? 'document.domain="' + document.domain +
                                    '";' : "") + "var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "<\/script>");
                                this.clearCustomData();
                                this.clearListeners();
                                c.fire("contentDomUnload");
                                var m = this.getDocument();
                                try {
                                    m.write(a)
                                } catch (p) {
                                    setTimeout(function() {
                                        m.write(a)
                                    }, 0)
                                }
                            }
                        },
                        getData: function(a) {
                            if (a) return this.getHtml();
                            var a = this.editor,
                                b = a.config,
                                c =
                                b.fullPage,
                                f = c && a.docType,
                                h = c && a.xmlDeclaration,
                                i = this.getDocument(),
                                c = c ? i.getDocumentElement().getOuterHtml() : i.getBody().getHtml();
                            CKEDITOR.env.gecko && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
                            a.dataProcessor && (c = a.dataProcessor.toDataFormat(c));
                            b.ignoreEmptyParagraph && (c = c.replace(d, function(a, b) {
                                return b
                            }));
                            h && (c = h + "\n" + c);
                            f && (c = f + "\n" + c);
                            return c
                        },
                        focus: function() {
                            this._.isLoadingData ? this._.isPendingFocus = true : f.baseProto.focus.call(this)
                        },
                        detach: function() {
                            var a = this.editor,
                                b = a.document,
                                c = a.window.getFrame();
                            f.baseProto.detach.call(this);
                            this.clearCustomData();
                            b.getDocumentElement().clearCustomData();
                            c.clearCustomData();
                            CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                            (b = c.removeCustomData("onResize")) && b.removeListener();
                            a.fire("contentDomUnload");
                            c.remove()
                        }
                    }
                });
            CKEDITOR.env.gecko && function() {
                var a = document.body;
                if (a) {
                    var b = a.getAttribute("onpageshow");
                    a.setAttribute("onpageshow", (b ? b + ";" : "") + 'event.persisted&&(function(){var x=CKEDITOR.instances,d,i;for(i in x){d=x[i].document;if(d){d.$.designMode="off";d.$.designMode="on";}}})();')
                } else window.addEventListener("load",
                    arguments.callee, false)
            }()
        })();
        CKEDITOR.config.disableObjectResizing = !1;
        CKEDITOR.config.disableNativeTableHandles = !0;
        CKEDITOR.config.disableNativeSpellChecker = !0;
        CKEDITOR.config.ignoreEmptyParagraph = !0;
        CKEDITOR.config.contentsCss = CKEDITOR.basePath + "contents.css";
        CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,menu,contextmenu,div,elementspath,list,indent,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,format,forms,horizontalrule,htmlwriter,iframe,image,justify,link,liststyle,magicline,maximize,newpage,pagebreak,pastefromword,pastetext,preview,print,removeformat,resize,save,menubutton,scayt,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,templates,toolbar,undo,wsc,wysiwygarea";
        CKEDITOR.config.skin = "kama";
        (function() {
            for (var a = "spellchecker,0,redo-rtl,32,redo,64,undo-rtl,96,undo,128,uicolor,160,templates-rtl,192,templates,224,table,256,specialchar,288,source-rtl,320,source,352,smiley,384,showblocks-rtl,416,showblocks,448,selectall,480,scayt,512,save,544,removeformat,576,print,608,preview-rtl,640,preview,672,createplaceholder,704,editplaceholder,736,pastetext-rtl,768,pastetext,800,pastefromword-rtl,832,pastefromword,864,pagebreak-rtl,896,pagebreak,928,newpage-rtl,960,newpage,992,maximize,1024,bulletedlist-rtl,1056,bulletedlist,1088,numberedlist-rtl,1120,numberedlist,1152,anchor-rtl,1184,anchor,1216,link,1248,unlink,1280,justifyblock,1312,justifycenter,1344,justifyleft,1376,justifyright,1408,indent-rtl,1440,indent,1472,outdent-rtl,1504,outdent,1536,image,1568,iframe,1600,horizontalrule,1632,button,1664,checkbox,1696,form,1728,hiddenfield,1760,imagebutton,1792,radio,1824,select-rtl,1856,select,1888,textarea-rtl,1920,textarea,1952,textfield,1984,flash,2016,find-rtl,2048,find,2080,replace,2112,docprops-rtl,2144,docprops,2176,creatediv,2208,bgcolor,2240,textcolor,2272,copy-rtl,2304,copy,2336,cut-rtl,2368,cut,2400,paste-rtl,2432,paste,2464,blockquote,2496,bidiltr,2528,bidirtl,2560,bold,2592,italic,2624,strike,2656,subscript,2688,superscript,2720,underline,2752,about,2784",
                    b = CKEDITOR.getUrl("plugins/icons.png"), a = a.split(","), c = 0; c < a.length; c++) CKEDITOR.skin.icons[a[c]] = {
                path: b,
                offset: -a[++c]
            }
        })()
    }
})();