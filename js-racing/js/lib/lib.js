/// <reference path="jquery.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lib;
(function (lib) {
    var event;
    (function (event) {
        var Event = (function () {
            function Event() {
            }
            return Event;
        }());
        Event.RESIZE_EVENT = "resize_event";
        Event.SCROLL_EVENT = "scroll_event";
        Event.TIMER_EVENT = "timer_event";
        Event.TIMER_COMPLETE_EVENT = "timer_complete_event";
        Event.LOADER_ERROR_EVENT = "loader_error_event";
        Event.LOADER_PROGRESS_EVENT = "loader_progress_event";
        Event.LOADER_COMPLETE_EVENT = "loader_complete_event";
        Event.DISPLAY_START_OPEN_EVENT = "display_start_open_event";
        Event.DISPLAY_COMPLETE_OPEN_EVENT = "display_complete_open_event";
        Event.DISPLAY_START_CLOSE_EVENT = "display_start_close_event";
        Event.DISPLAY_COMPLETE_CLOSE_EVENT = "display_complete_close_event";
        Event.BUTTON_SET_OVER_EVENT = "button_set_over_event";
        Event.BUTTON_DELETE_OVER_EVENT = "button_delete_over_event";
        Event.BUTTON_SET_CURRENT_EVENT = "button_set_current_event";
        Event.BUTTON_DELETE_CURRENT_EVENT = "button_delete_current_event";
        Event.BUTTON_SET_ACTIVE_EVENT = "button_set_active_event";
        Event.BUTTON_DELETE_ACTIVE_EVENT = "button_delete_active_event";
        Event.BUTTON_CLICK_EVENT = "button_click_event";
        event.Event = Event;
        var EventListener = (function () {
            function EventListener(type, callback) {
                this.type = null;
                this.callback = null;
                this.type = type;
                this.callback = callback;
            }
            return EventListener;
        }());
        var EventDispacher = (function () {
            function EventDispacher() {
                this._$window = null;
                this._listeners = [];
                var scope = this;
                this._$window = $(window);
                this._$window.on("scroll", function () {
                    scope.dispatchEvent(lib.event.Event.SCROLL_EVENT);
                });
                this._$window.on("resize", function () {
                    scope.dispatchEvent(lib.event.Event.RESIZE_EVENT);
                });
            }
            EventDispacher.prototype.dispatchEvent = function (type, object) {
                if (object === void 0) { object = null; }
                if (type == lib.event.Event.RESIZE_EVENT) {
                    var width = this._$window.width();
                    var height = this._$window.height();
                    var i = 0, max;
                    for (i = 0, max = this._listeners.length; i < max; i = i + 1) {
                        var listener = this._listeners[i];
                        if (listener.type == type) {
                            listener.callback({ width: width, height: height });
                        }
                    }
                }
                else if (type == lib.event.Event.SCROLL_EVENT) {
                    var top = this._$window.scrollTop();
                    var left = this._$window.scrollLeft();
                    var i = 0, max;
                    for (i = 0, max = this._listeners.length; i < max; i = i + 1) {
                        var listener = this._listeners[i];
                        if (listener.type == type) {
                            listener.callback({ top: top, left: left });
                        }
                    }
                }
                else {
                    var i = 0, max;
                    for (i = 0, max = this._listeners.length; i < max; i = i + 1) {
                        var listener = this._listeners[i];
                        if (listener.type == type) {
                            if (object != null) {
                                listener.callback(object);
                            }
                            else {
                                listener.callback();
                            }
                        }
                    }
                }
            };
            EventDispacher.prototype.addEventListener = function (type, callback) {
                var listener = new EventListener(type, callback);
                this._listeners.push(listener);
            };
            EventDispacher.prototype.removeEventListener = function (type, callback) {
                var arr = [];
                var i = 0, max;
                for (i = 0, max = this._listeners.length; i < max; i = i + 1) {
                    var listener = this._listeners[i];
                    if (listener.type != type || listener.callback != callback) {
                        arr.push(listener);
                    }
                }
                this._listeners = arr;
            };
            return EventDispacher;
        }());
        event.EventDispacher = EventDispacher;
    })(event = lib.event || (lib.event = {}));
    var utility;
    (function (utility) {
        var PlatFormInfo = (function () {
            function PlatFormInfo() {
                this._ieVer = null;
                this._isTouchDevice = false;
                this._isSmartPhone = false;
                PlatFormInfo._instance = this;
                var userAgent = window.navigator.userAgent.toLowerCase();
                var appVersion = window.navigator.appVersion.toLowerCase();
                if (userAgent.indexOf("msie") != -1 && appVersion.indexOf("msie 6.") != -1) {
                    this._ieVer = 6;
                }
                else if (userAgent.indexOf("msie") != -1 && appVersion.indexOf("msie 7.") != -1) {
                    this._ieVer = 7;
                }
                else if (userAgent.indexOf("msie") != -1 && appVersion.indexOf("msie 8.") != -1) {
                    this._ieVer = 8;
                }
                else {
                    this._ieVer = 9;
                }
                if (0 <= userAgent.indexOf("iphone") || 0 <= userAgent.indexOf("ipad") || 0 <= userAgent.indexOf("ipod") || 0 <= userAgent.indexOf("android")) {
                    this._isTouchDevice = true;
                }
                else {
                    this._isTouchDevice = false;
                }
                if (0 <= userAgent.indexOf("iphone") || 0 <= userAgent.indexOf("android")) {
                    this._isSmartPhone = true;
                }
                else {
                    this._isSmartPhone = false;
                }
            }
            PlatFormInfo.getInstance = function () {
                if (PlatFormInfo._instance === null) {
                    PlatFormInfo._instance = new PlatFormInfo();
                }
                return PlatFormInfo._instance;
            };
            PlatFormInfo.prototype.getIeVer = function () {
                return this._ieVer;
            };
            PlatFormInfo.prototype.getIsTouchDevice = function () {
                return this._isTouchDevice;
            };
            PlatFormInfo.prototype.getIsSmartPhone = function () {
                return this._isSmartPhone;
            };
            return PlatFormInfo;
        }());
        PlatFormInfo._instance = null;
        utility.PlatFormInfo = PlatFormInfo;
        var Timer = (function (_super) {
            __extends(Timer, _super);
            function Timer(duration, repeat) {
                if (duration === void 0) { duration = null; }
                if (repeat === void 0) { repeat = 0; }
                var _this = _super.call(this) || this;
                _this._intervalId = null;
                _this._count = null;
                _this._duration = null;
                _this._repeat = null;
                if (duration != null)
                    _this._duration = duration;
                _this._repeat = repeat;
                return _this;
            }
            Timer.prototype.start = function (duration, repeat) {
                if (duration === void 0) { duration = null; }
                if (repeat === void 0) { repeat = null; }
                if (duration != null)
                    this._duration = duration;
                if (repeat != null)
                    this._repeat = repeat;
                if (this._duration == null)
                    return;
                //
                this._count = 0;
                var scope = this;
                this._intervalId = setInterval(function () {
                    scope._on();
                }, this._duration);
            };
            Timer.prototype.reset = function () {
                if (this._intervalId) {
                    clearInterval(this._intervalId);
                }
            };
            Timer.prototype._on = function () {
                this.dispatchEvent(lib.event.Event.TIMER_EVENT, { count: this._count });
                if (0 < this._repeat && this._repeat - 1 <= this._count) {
                    this.reset();
                    this.dispatchEvent(lib.event.Event.TIMER_COMPLETE_EVENT, { count: this._count });
                }
                this._count++;
            };
            return Timer;
        }(lib.event.EventDispacher));
        utility.Timer = Timer;
        var ArrayUtility = (function () {
            function ArrayUtility() {
            }
            ArrayUtility.shuffle = function (arr) {
                var copy = [], n = arr.length, i;
                while (n) {
                    i = Math.floor(Math.random() * arr.length);
                    if (i in arr) {
                        copy.push(arr[i]);
                        delete arr[i];
                        n--;
                    }
                }
                return copy;
            };
            return ArrayUtility;
        }());
        utility.ArrayUtility = ArrayUtility;
        var SnsLinks = (function () {
            function SnsLinks() {
            }
            SnsLinks.openTwWindow = function (url, txt, hash) {
                if (!url || !txt)
                    return;
                txt = (hash) ? txt + " " + hash : txt;
                window.open("http://twitter.com/share?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(txt), "twitter", "width=640, height=480, menubar=no, toolbar=no, scrollbars=yes");
            };
            SnsLinks.openFbWindow = function (url) {
                window.open("http://www.facebook.com/share.php?u=" + encodeURIComponent(url) + "", "facebook", "width=640, height=480, menubar=no, toolbar=no, scrollbars=yes");
            };
            return SnsLinks;
        }());
        utility.SnsLinks = SnsLinks;
    })(utility = lib.utility || (lib.utility = {}));
    var tween;
    (function (tween) {
        var Easing = (function () {
            function Easing() {
            }
            return Easing;
        }());
        // Linear
        Easing.LINEAR = "linear";
        // 1 : SineCurve
        Easing.EASE_IN_SINE = "easeInSine";
        Easing.EASE_OUT_SINE = "easeOutSine";
        Easing.EASE_INOUT_SINE = "easeInOutSine";
        // 2 : QuadraticCurve
        Easing.EASE_IN_QUAD = "easeInQuad";
        Easing.EASE_OUT_QUAD = "easeOutQuad";
        Easing.EASE_INOUT_QUAD = "easeInOutQuad";
        // 3 : CubicCurve
        Easing.EASE_IN_CUBIC = "easeInCubic";
        Easing.EASE_OUT_CUBIC = "easeOutCubic";
        Easing.EASE_INOUT_CUBIC = "easeInOutCubic";
        // 4 : QuarticCurve
        Easing.EASE_IN_QUART = "easeInQuart";
        Easing.EASE_OUT_QUART = "easeOutQuart";
        Easing.EASE_INOUT_QUART = "easeInOutQuart";
        // 5 : QuinticCurve
        Easing.EASE_IN_QUINT = "easeInQuint";
        Easing.EASE_OUT_QUINT = "easeOutQuint";
        Easing.EASE_INOUT_QUINT = "easeInOutQuint";
        // 6 : ExponentialCurve
        Easing.EASE_IN_EXPO = "easeInExpo";
        Easing.EASE_OUT_EXPO = "easeOutExpo";
        Easing.EASE_INOUT_EXPO = "easeInOutExpo";
        // CircularCurve
        Easing.EASE_IN_CIRC = "easeInCirc";
        Easing.EASE_OUT_CIRC = "easeOutCirc";
        Easing.EASE_INOUT_CIRC = "easeInOutCirc";
        // ElasticCurve
        Easing.EASE_IN_ELASTIC = "easeInElastic";
        Easing.EASE_OUT_ELASTIC = "easeOutElastic";
        Easing.EASE_INOUT_ELASTIC = "easeInOutElastic";
        // Back
        Easing.EASE_IN_BACK = "easeInBack";
        Easing.EASE_OUT_BACK = "easeOutBack";
        Easing.EASE_INOUT_BACK = "easeInOutBack";
        // Bounce
        Easing.EASE_IN_BOUNCE = "easeInBounce";
        Easing.EASE_OUT_BOUNCE = "easeOutBounce";
        Easing.EASE_INOUT_BOUNCE = "easeInOutBounce";
        tween.Easing = Easing;
    })(tween = lib.tween || (lib.tween = {}));
    var loader;
    (function (loader_1) {
        var ImageLoader = (function (_super) {
            __extends(ImageLoader, _super);
            function ImageLoader(src) {
                if (src === void 0) { src = null; }
                var _this = _super.call(this) || this;
                _this._$img = null;
                _this._src = null;
                _this._isLoaded = false;
                _this._src = src;
                return _this;
            }
            ImageLoader.prototype.load = function (src) {
                if (src === void 0) { src = null; }
                if (this._isLoaded)
                    return;
                if (src && src != "")
                    this._src = src;
                if (!this._src || this._src == "") {
                    this._error();
                }
                else {
                    if (this._$img == null)
                        this._$img = $("<img>");
                    var scope = this;
                    this._$img.off("load").one("load", function () {
                        scope._complete();
                    });
                    this._$img.off("error").one("error", function () {
                        scope._error();
                    });
                    this._$img.attr("src", this._src);
                }
            };
            ImageLoader.prototype.unload = function () {
                this._isLoaded = false;
                if (this._$img != null) {
                    this._$img.remove();
                    this._$img = null;
                }
            };
            ImageLoader.prototype._complete = function () {
                if (this._$img != null) {
                    this._$img.remove();
                    this._$img = null;
                }
                this._isLoaded = true;
                this.dispatchEvent(lib.event.Event.LOADER_COMPLETE_EVENT, { src: this._src });
            };
            ImageLoader.prototype._error = function () {
                this._isLoaded = true;
                this.dispatchEvent(lib.event.Event.LOADER_ERROR_EVENT, { src: this._src });
            };
            return ImageLoader;
        }(lib.event.EventDispacher));
        loader_1.ImageLoader = ImageLoader;
        var ImagesLoader = (function (_super) {
            __extends(ImagesLoader, _super);
            function ImagesLoader(arr, duration) {
                if (arr === void 0) { arr = null; }
                if (duration === void 0) { duration = 0; }
                var _this = _super.call(this) || this;
                _this._loaders = [];
                _this.srcArr = [];
                _this._timer = null;
                _this._isLoaded = false;
                _this._duration = null;
                _this._loaded = null;
                _this._total = null;
                _this.srcArr = arr;
                _this._duration = duration;
                return _this;
            }
            ImagesLoader.prototype.load = function (arr, duration) {
                if (arr === void 0) { arr = null; }
                if (duration === void 0) { duration = 0; }
                if (this._isLoaded)
                    return;
                if (arr)
                    this.srcArr = arr;
                if (0 < duration)
                    this._duration = duration;
                if (1 <= this.srcArr.length) {
                    var scope = this;
                    var i = 0, max;
                    for (i = 0, max = this.srcArr.length; i < max; i = i + 1) {
                        var src = this.srcArr[i];
                        var loader = new lib.loader.ImageLoader(src);
                        loader.addEventListener(lib.event.Event.LOADER_ERROR_EVENT, function (evt) {
                            scope._errorLoad(evt);
                        });
                        loader.addEventListener(lib.event.Event.LOADER_COMPLETE_EVENT, function (evt) {
                            scope.completeLoad(evt);
                        });
                        this._loaders.push(loader);
                    }
                    this._total = this._loaders.length;
                    this._loaded = 0;
                    //
                    if (0 < this._duration) {
                        this._timer = new lib.utility.Timer(this._duration, this._total);
                        this._timer.addEventListener(lib.event.Event.TIMER_EVENT, function (evt) {
                            scope._startLoad(evt);
                        });
                        this._timer.start();
                    }
                    else {
                        for (i = 0, max = this._loaders.length; i < max; i = i + 1) {
                            var loader = this._loaders[i];
                            loader.load();
                        }
                    }
                }
                else {
                    this.dispatchEvent(lib.event.Event.LOADER_COMPLETE_EVENT, { total: this._total });
                    this._isLoaded = true;
                }
            };
            ImagesLoader.prototype.unload = function () {
                this._isLoaded = false;
                var i = 0, max;
                for (i = 0, max = this._loaders.length; i < max; i = i + 1) {
                    var loader = this._loaders[i];
                    loader.unload();
                }
                this._loaders = [];
                if (this._timer) {
                    this._timer.reset();
                }
            };
            ImagesLoader.prototype._startLoad = function (evt) {
                var loader = this._loaders[evt.count];
                loader.load();
            };
            ImagesLoader.prototype._errorLoad = function (evt) {
                this._loaded++;
                this.dispatchEvent(lib.event.Event.LOADER_ERROR_EVENT, { src: evt.src, total: this._total, loaded: this._loaded });
                this._checkCompleteLoad();
            };
            ImagesLoader.prototype.completeLoad = function (evt) {
                this._loaded++;
                this.dispatchEvent(lib.event.Event.LOADER_PROGRESS_EVENT, { src: evt.src, total: this._total, loaded: this._loaded });
                this._checkCompleteLoad();
            };
            ImagesLoader.prototype._checkCompleteLoad = function () {
                if (this._total <= this._loaded) {
                    this.dispatchEvent(lib.event.Event.LOADER_COMPLETE_EVENT, { total: this._total });
                    this._isLoaded = true;
                    this.unload();
                }
            };
            return ImagesLoader;
        }(lib.event.EventDispacher));
        loader_1.ImagesLoader = ImagesLoader;
        var ImagesLoader2 = (function (_super) {
            __extends(ImagesLoader2, _super);
            function ImagesLoader2(arr, duraiton) {
                if (arr === void 0) { arr = null; }
                if (duraiton === void 0) { duraiton = 0; }
                var _this = _super.call(this, null, duraiton) || this;
                _this._$images = [];
                var scope = _this;
                //
                if (arr) {
                    _this.srcArr = [];
                    _this._$images = [];
                    var i = 0, max;
                    for (i = 0, max = arr.length; i < max; i = i + 1) {
                        var $item = arr[i];
                        $item.find("img[data-src]").each(function (i) {
                            scope.srcArr.push($(this).attr("data-src"));
                            scope._$images.push($(this));
                        });
                    }
                }
                return _this;
            }
            ImagesLoader2.prototype.load = function (arr, duraiton) {
                if (arr === void 0) { arr = null; }
                if (duraiton === void 0) { duraiton = 0; }
                var scope = this;
                //
                if (arr) {
                    this.srcArr = [];
                    this._$images = [];
                    var i = 0, max;
                    for (i = 0, max = arr.length; i < max; i = i + 1) {
                        var $item = arr[i];
                        $item.find("img[data-src]").each(function (i) {
                            scope.srcArr.push($(this).attr("data-src"));
                            scope._$images.push($(this));
                        });
                    }
                }
                _super.prototype.load.call(this, null, duraiton);
            };
            ImagesLoader2.prototype.completeLoad = function (evt) {
                var i = 0, max;
                for (i = 0, max = this._$images.length; i < max; i = i + 1) {
                    var $image = this._$images[i];
                    var src = $image.attr("data-src");
                    $image.removeAttr("data-src");
                    $image.attr("src", src);
                }
                //
                _super.prototype.completeLoad.call(this, evt);
            };
            return ImagesLoader2;
        }(ImagesLoader));
        loader_1.ImagesLoader2 = ImagesLoader2;
    })(loader = lib.loader || (lib.loader = {}));
    var base;
    (function (base) {
        var BaseDisplay = (function (_super) {
            __extends(BaseDisplay, _super);
            function BaseDisplay(target, id, style) {
                if (id === void 0) { id = null; }
                if (style === void 0) { style = null; }
                var _this = _super.call(this) || this;
                _this.$target = null;
                _this.id = null;
                //
                _this.$target = target;
                if (id != null) {
                    _this.id = id;
                }
                else {
                    _this.id = "id" + new Date().getTime() + "_" + Math.floor(Math.random() * 10000);
                }
                if (style)
                    _this.setStyle(style);
                return _this;
            }
            BaseDisplay.prototype.setStyle = function (style) {
                this.$target.css(style);
            };
            return BaseDisplay;
        }(lib.event.EventDispacher));
        base.BaseDisplay = BaseDisplay;
        var OpenCloseDisplay = (function (_super) {
            __extends(OpenCloseDisplay, _super);
            function OpenCloseDisplay(target, displayImpl, id, style) {
                if (displayImpl === void 0) { displayImpl = null; }
                if (id === void 0) { id = null; }
                if (style === void 0) { style = null; }
                var _this = _super.call(this, target, id, style) || this;
                _this.displayImpl = null;
                if (displayImpl) {
                    _this.displayImpl = displayImpl;
                    _this.addDisplayEventListener();
                }
                return _this;
            }
            OpenCloseDisplay.prototype.addDisplayEventListener = function () {
                if (!this.displayImpl)
                    return;
                var scope = this;
                this.displayImpl.addEventListener(lib.event.Event.DISPLAY_START_OPEN_EVENT, function () {
                    scope.startOpen();
                });
                this.displayImpl.addEventListener(lib.event.Event.DISPLAY_COMPLETE_OPEN_EVENT, function () {
                    scope.completeOpen();
                });
                this.displayImpl.addEventListener(lib.event.Event.DISPLAY_START_CLOSE_EVENT, function () {
                    scope.startClose();
                });
                this.displayImpl.addEventListener(lib.event.Event.DISPLAY_COMPLETE_OPEN_EVENT, function () {
                    scope.completeClose();
                });
            };
            OpenCloseDisplay.prototype.removeDisplayEventListener = function () {
                if (!this.displayImpl)
                    return;
                var scope = this;
                this.displayImpl.removeEventListener(lib.event.Event.DISPLAY_START_OPEN_EVENT, function () {
                    scope.startOpen();
                });
                this.displayImpl.removeEventListener(lib.event.Event.DISPLAY_COMPLETE_OPEN_EVENT, function () {
                    scope.completeOpen();
                });
                this.displayImpl.removeEventListener(lib.event.Event.DISPLAY_START_CLOSE_EVENT, function () {
                    scope.startClose();
                });
                this.displayImpl.removeEventListener(lib.event.Event.DISPLAY_COMPLETE_OPEN_EVENT, function () {
                    scope.completeClose();
                });
            };
            OpenCloseDisplay.prototype.open = function (delay) {
                if (delay === void 0) { delay = 0; }
                if (this.displayImpl)
                    this.displayImpl.open(delay);
            };
            OpenCloseDisplay.prototype.close = function (delay) {
                if (delay === void 0) { delay = 0; }
                if (this.displayImpl)
                    this.displayImpl.close(delay);
            };
            //
            OpenCloseDisplay.prototype.startOpen = function () {
            };
            OpenCloseDisplay.prototype.completeOpen = function () {
            };
            OpenCloseDisplay.prototype.startClose = function () {
            };
            OpenCloseDisplay.prototype.completeClose = function () {
            };
            return OpenCloseDisplay;
        }(BaseDisplay));
        base.OpenCloseDisplay = OpenCloseDisplay;
        var OpenCloseButtonDisplay = (function (_super) {
            __extends(OpenCloseButtonDisplay, _super);
            function OpenCloseButtonDisplay(target, buttonImpl, displayImpl, id, style) {
                if (buttonImpl === void 0) { buttonImpl = null; }
                if (displayImpl === void 0) { displayImpl = null; }
                if (id === void 0) { id = null; }
                if (style === void 0) { style = null; }
                var _this = _super.call(this, target, displayImpl, id, style) || this;
                _this.buttonImpl = null;
                if (buttonImpl) {
                    _this.buttonImpl = buttonImpl;
                    _this.addButtonEventListener();
                }
                return _this;
            }
            OpenCloseButtonDisplay.prototype.addButtonEventListener = function () {
                if (!this.buttonImpl)
                    return;
                var scope = this;
                this.buttonImpl.addEventListener(lib.event.Event.BUTTON_CLICK_EVENT, function () {
                    scope.onClick();
                });
                this.buttonImpl.addEventListener(lib.event.Event.BUTTON_SET_ACTIVE_EVENT, function () {
                    scope.onSetActive();
                });
                this.buttonImpl.addEventListener(lib.event.Event.BUTTON_DELETE_ACTIVE_EVENT, function () {
                    scope.onDeleteActive();
                });
                this.buttonImpl.addEventListener(lib.event.Event.BUTTON_SET_CURRENT_EVENT, function () {
                    scope.onSetCurrent();
                });
                this.buttonImpl.addEventListener(lib.event.Event.BUTTON_DELETE_CURRENT_EVENT, function () {
                    scope.onDeleteCurrent();
                });
            };
            OpenCloseButtonDisplay.prototype.removeButtonEventListener = function () {
                if (!this.buttonImpl)
                    return;
                var scope = this;
                this.buttonImpl.removeEventListener(lib.event.Event.BUTTON_CLICK_EVENT, function () {
                    scope.onClick();
                });
                this.buttonImpl.removeEventListener(lib.event.Event.BUTTON_SET_ACTIVE_EVENT, function () {
                    scope.onSetActive();
                });
                this.buttonImpl.removeEventListener(lib.event.Event.BUTTON_DELETE_ACTIVE_EVENT, function () {
                    scope.onDeleteActive();
                });
                this.buttonImpl.removeEventListener(lib.event.Event.BUTTON_SET_CURRENT_EVENT, function () {
                    scope.onSetCurrent();
                });
                this.buttonImpl.removeEventListener(lib.event.Event.BUTTON_DELETE_CURRENT_EVENT, function () {
                    scope.onDeleteCurrent();
                });
            };
            OpenCloseButtonDisplay.prototype.setActive = function () {
                if (this.buttonImpl)
                    this.buttonImpl.setActive();
            };
            OpenCloseButtonDisplay.prototype.deleteActive = function () {
                if (this.buttonImpl)
                    this.buttonImpl.deleteActive();
            };
            OpenCloseButtonDisplay.prototype.setCurrent = function () {
                if (this.buttonImpl)
                    this.buttonImpl.setCurrent();
            };
            OpenCloseButtonDisplay.prototype.deleteCurrent = function () {
                if (this.buttonImpl)
                    this.buttonImpl.deleteCurrent();
            };
            //
            OpenCloseButtonDisplay.prototype.onClick = function () {
            };
            OpenCloseButtonDisplay.prototype.onSetActive = function () {
            };
            OpenCloseButtonDisplay.prototype.onDeleteActive = function () {
            };
            OpenCloseButtonDisplay.prototype.onSetCurrent = function () {
            };
            OpenCloseButtonDisplay.prototype.onDeleteCurrent = function () {
            };
            return OpenCloseButtonDisplay;
        }(OpenCloseDisplay));
        base.OpenCloseButtonDisplay = OpenCloseButtonDisplay;
        var ResponsiveDisplay = (function (_super) {
            __extends(ResponsiveDisplay, _super);
            function ResponsiveDisplay(target, id, position) {
                if (id === void 0) { id = null; }
                if (position === void 0) { position = "relative"; }
                var _this = _super.call(this, target, id, position) || this;
                //
                var scope = _this;
                _this.addEventListener(lib.event.Event.RESIZE_EVENT, function (evt) {
                    scope.onResize(evt);
                });
                _this.addEventListener(lib.event.Event.SCROLL_EVENT, function (evt) {
                    scope.onScroll(evt);
                });
                return _this;
            }
            ResponsiveDisplay.prototype.onResize = function (evt) {
            };
            ResponsiveDisplay.prototype.onScroll = function (evt) {
            };
            return ResponsiveDisplay;
        }(BaseDisplay));
        base.ResponsiveDisplay = ResponsiveDisplay;
    })(base = lib.base || (lib.base = {}));
    var display;
    (function (display) {
        var Const = (function () {
            function Const() {
            }
            return Const;
        }());
        Const.CLASS_NAME_OPEN = "open";
        Const.CLASS_NAME_CLOSE = "close";
        var AbsDisplayImpl = (function (_super) {
            __extends(AbsDisplayImpl, _super);
            function AbsDisplayImpl(target) {
                var _this = _super.call(this) || this;
                _this.$target = null;
                _this.isOpen = false;
                _this._intervalId = null;
                _this.$target = target;
                return _this;
            }
            AbsDisplayImpl.prototype.open = function (delay) {
                if (delay === void 0) { delay = 0; }
                if (this.isOpen) {
                    return;
                }
                this.isOpen = true;
                if (0 < delay) {
                    var scope = this;
                    if (this._intervalId)
                        clearTimeout(this._intervalId);
                    setTimeout(function () {
                        scope.startOpen();
                    }, delay);
                }
                else {
                    this.startOpen();
                }
            };
            AbsDisplayImpl.prototype.startOpen = function () {
                this.dispatchEvent(lib.event.Event.DISPLAY_START_OPEN_EVENT, { $target: this.$target });
                this.onOpen();
            };
            AbsDisplayImpl.prototype.onOpen = function () {
                this.completeOpen();
            };
            AbsDisplayImpl.prototype.completeOpen = function () {
                this.dispatchEvent(lib.event.Event.DISPLAY_COMPLETE_OPEN_EVENT, { $target: this.$target });
            };
            AbsDisplayImpl.prototype.close = function (delay) {
                if (delay === void 0) { delay = 0; }
                if (!this.isOpen) {
                    return;
                }
                this.isOpen = false;
                if (0 < delay) {
                    var scope = this;
                    if (this._intervalId)
                        clearTimeout(this._intervalId);
                    this._intervalId = setTimeout(function () {
                        scope.startClose();
                    }, delay);
                }
                else {
                    this.startClose();
                }
            };
            AbsDisplayImpl.prototype.startClose = function () {
                this.dispatchEvent(lib.event.Event.DISPLAY_START_CLOSE_EVENT, { $target: this.$target });
                this.onClose();
            };
            AbsDisplayImpl.prototype.onClose = function () {
                this.completeClose();
            };
            AbsDisplayImpl.prototype.completeClose = function () {
                this.dispatchEvent(lib.event.Event.DISPLAY_COMPLETE_CLOSE_EVENT, { $target: this.$target });
            };
            return AbsDisplayImpl;
        }(lib.event.EventDispacher));
        display.AbsDisplayImpl = AbsDisplayImpl;
        var SimpleDisplayImpl = (function (_super) {
            __extends(SimpleDisplayImpl, _super);
            function SimpleDisplayImpl(target) {
                var _this = _super.call(this, target) || this;
                _this.$target.css({ display: "none" });
                return _this;
            }
            SimpleDisplayImpl.prototype.onOpen = function () {
                this.$target.css({ display: "block" });
                this.completeOpen();
            };
            SimpleDisplayImpl.prototype.onClose = function () {
                this.$target.css({ display: "none" });
                this.completeClose();
            };
            return SimpleDisplayImpl;
        }(AbsDisplayImpl));
        display.SimpleDisplayImpl = SimpleDisplayImpl;
        var CssDisplayImpl = (function (_super) {
            __extends(CssDisplayImpl, _super);
            function CssDisplayImpl(target) {
                return _super.call(this, target) || this;
            }
            CssDisplayImpl.prototype.onOpen = function () {
                this.$target.addClass(Const.CLASS_NAME_OPEN);
                this.completeOpen();
            };
            CssDisplayImpl.prototype.onClose = function () {
                this.$target.addClass(Const.CLASS_NAME_CLOSE);
                this.completeClose();
            };
            return CssDisplayImpl;
        }(AbsDisplayImpl));
        display.CssDisplayImpl = CssDisplayImpl;
        var FadeDisplayImpl = (function (_super) {
            __extends(FadeDisplayImpl, _super);
            function FadeDisplayImpl(target) {
                var _this = _super.call(this, target) || this;
                _this.duration = 500;
                _this.easing = "linear";
                _this.$target.css({ display: "none" });
                return _this;
            }
            FadeDisplayImpl.prototype.onOpen = function () {
                var scope = this;
                this.$target.css({
                    display: "block",
                    opacity: 0
                }).animate({
                    opacity: 1
                }, {
                    duration: this.duration,
                    easing: this.easing,
                    complete: function () {
                        scope.completeOpen();
                    }
                });
            };
            FadeDisplayImpl.prototype.onClose = function () {
                var scope = this;
                this.$target.animate({
                    opacity: 0
                }, {
                    duration: this.duration,
                    easing: this.easing,
                    complete: function () {
                        $(this).css({
                            display: "none"
                        });
                        scope.completeClose();
                    }
                });
            };
            return FadeDisplayImpl;
        }(AbsDisplayImpl));
        display.FadeDisplayImpl = FadeDisplayImpl;
    })(display = lib.display || (lib.display = {}));
    var button;
    (function (button) {
        var Const = (function () {
            function Const() {
            }
            return Const;
        }());
        Const.CLASS_NAME_OVER = "over";
        Const.CLASS_NAME_CURRENT = "current";
        var AbsButtonImpl = (function (_super) {
            __extends(AbsButtonImpl, _super);
            function AbsButtonImpl(target, id) {
                if (id === void 0) { id = null; }
                var _this = _super.call(this) || this;
                _this.$target = null;
                _this.id = null;
                _this.isActive = false;
                _this.isCurrent = false;
                _this.id = id;
                _this.$target = target;
                _this.$target.css({ cursor: "default" });
                var scope = _this;
                _this.$target.on("click", function (evt) {
                    evt.preventDefault();
                    if (scope.isActive) {
                        scope.onClick(evt);
                    }
                });
                _this.$target.on("mouseenter", function (evt) {
                    if (!scope.isCurrent && scope.isActive) {
                        scope.onOver(evt);
                    }
                });
                _this.$target.on("mouseleave", function (evt) {
                    if (!scope.isCurrent && scope.isActive) {
                        scope.onOut(evt);
                    }
                });
                return _this;
            }
            AbsButtonImpl.prototype.setActive = function () {
                if (this.isActive) {
                    return;
                }
                this.isActive = true;
                this.$target.css({ cursor: "pointer" });
                this.dispatchEvent(lib.event.Event.BUTTON_SET_ACTIVE_EVENT, { $target: this.$target, id: this.id });
            };
            AbsButtonImpl.prototype.deleteActive = function () {
                if (!this.isActive) {
                    return;
                }
                this.isActive = false;
                this.$target.css({ cursor: "default" });
                this.dispatchEvent(lib.event.Event.BUTTON_DELETE_ACTIVE_EVENT, { $target: this.$target, id: this.id });
            };
            AbsButtonImpl.prototype.setCurrent = function () {
                if (this.isCurrent) {
                    return;
                }
                this.isCurrent = true;
                this.dispatchEvent(lib.event.Event.BUTTON_SET_CURRENT_EVENT, { $target: this.$target, id: this.id });
            };
            AbsButtonImpl.prototype.deleteCurrent = function () {
                if (!this.isCurrent) {
                    return;
                }
                this.isCurrent = false;
                this.dispatchEvent(lib.event.Event.BUTTON_DELETE_CURRENT_EVENT, { $target: this.$target, id: this.id });
            };
            AbsButtonImpl.prototype.onOver = function (evt) {
                this.dispatchEvent(lib.event.Event.BUTTON_SET_OVER_EVENT, { $target: this.$target, id: this.id });
            };
            AbsButtonImpl.prototype.onOut = function (evt) {
                this.dispatchEvent(lib.event.Event.BUTTON_DELETE_OVER_EVENT, { $target: this.$target, id: this.id });
            };
            AbsButtonImpl.prototype.onClick = function (evt) {
                this.dispatchEvent(lib.event.Event.BUTTON_CLICK_EVENT, { $target: this.$target, id: this.id });
            };
            return AbsButtonImpl;
        }(lib.event.EventDispacher));
        button.AbsButtonImpl = AbsButtonImpl;
        var SimpleButtonImpl = (function (_super) {
            __extends(SimpleButtonImpl, _super);
            function SimpleButtonImpl(target) {
                return _super.call(this, target) || this;
            }
            SimpleButtonImpl.prototype.setActive = function () {
                _super.prototype.setActive.call(this);
                //
            };
            SimpleButtonImpl.prototype.deleteActive = function () {
                _super.prototype.deleteActive.call(this);
                //
            };
            SimpleButtonImpl.prototype.setCurrent = function () {
                _super.prototype.setCurrent.call(this);
                //
            };
            SimpleButtonImpl.prototype.deleteCurrent = function () {
                _super.prototype.deleteCurrent.call(this);
                //
            };
            SimpleButtonImpl.prototype.onOver = function (evt) {
                _super.prototype.onOver.call(this, evt);
                //
            };
            SimpleButtonImpl.prototype.onOut = function (evt) {
                _super.prototype.onOut.call(this, evt);
                //
            };
            SimpleButtonImpl.prototype.onClick = function (evt) {
                _super.prototype.onClick.call(this, evt);
                //
            };
            return SimpleButtonImpl;
        }(AbsButtonImpl));
        button.SimpleButtonImpl = SimpleButtonImpl;
        var CssButtonImpl = (function (_super) {
            __extends(CssButtonImpl, _super);
            function CssButtonImpl(target) {
                return _super.call(this, target) || this;
            }
            CssButtonImpl.prototype.setActive = function () {
                _super.prototype.setActive.call(this);
                //
            };
            CssButtonImpl.prototype.deleteActive = function () {
                _super.prototype.deleteActive.call(this);
                //
            };
            CssButtonImpl.prototype.setCurrent = function () {
                _super.prototype.setCurrent.call(this);
                //
                this.$target.addClass(Const.CLASS_NAME_CURRENT);
                this.$target.removeClass(Const.CLASS_NAME_OVER);
            };
            CssButtonImpl.prototype.deleteCurrent = function () {
                _super.prototype.deleteCurrent.call(this);
                //
                this.$target.removeClass(Const.CLASS_NAME_CURRENT);
                this.$target.removeClass(Const.CLASS_NAME_OVER);
            };
            CssButtonImpl.prototype.onOver = function (evt) {
                _super.prototype.onOver.call(this, evt);
                //
                this.$target.addClass(Const.CLASS_NAME_OVER);
            };
            CssButtonImpl.prototype.onOut = function (evt) {
                _super.prototype.onOut.call(this, evt);
                //
                this.$target.removeClass(Const.CLASS_NAME_OVER);
            };
            CssButtonImpl.prototype.onClick = function (evt) {
                _super.prototype.onClick.call(this, evt);
                //
            };
            return CssButtonImpl;
        }(AbsButtonImpl));
        button.CssButtonImpl = CssButtonImpl;
    })(button = lib.button || (lib.button = {}));
    var responisive;
    (function (responisive) {
        var ResizeManager = (function () {
            function ResizeManager() {
                this._listeners = null;
                this._$window = null;
                this._width = null;
                this._height = null;
                ResizeManager._instance = this;
                this._listeners = [];
                var scope = this;
                this._$window = $(window);
                this._$window.on("resize", function () {
                    scope.onResize();
                });
                this._width = this._$window.width();
                this._height = this._$window.height();
            }
            ResizeManager.getInstance = function () {
                if (ResizeManager._instance === null) {
                    ResizeManager._instance = new ResizeManager();
                }
                return ResizeManager._instance;
            };
            ResizeManager.prototype.dispatchEvent = function (listener) {
                if (listener === void 0) { listener = null; }
                if (listener != null) {
                    listener.onResize(this._width, this._height);
                }
                else {
                    this.onResize();
                }
            };
            ResizeManager.prototype.addEventListener = function (listener) {
                var flg = true;
                var i = 0, max;
                for (i = 0, max = this._listeners.length; i < max; i = i + 1) {
                    if (this._listeners[i].id == listener.id) {
                        flg = false;
                        break;
                    }
                }
                if (flg) {
                    this._listeners.push(listener);
                }
            };
            ResizeManager.prototype.removeEventListener = function (listener) {
                return;
                //var arr = [];
                //var i = 0, max;
                //for (i = 0, max = this._listeners.length; i < max; i = i + 1) {
                //    if (this._listeners[i].id != listener.id) {
                //        arr.push(listener);
                //    }
                //}
                //this._listeners = arr;
            };
            ResizeManager.prototype.onResize = function () {
                this._width = this._$window.width();
                this._height = this._$window.height();
                var i = 0, max;
                for (i = 0, max = this._listeners.length; i < max; i = i + 1) {
                    this._listeners[i].onResize(this._width, this._height);
                }
            };
            return ResizeManager;
        }());
        ResizeManager._instance = null;
        responisive.ResizeManager = ResizeManager;
        var ScrollManager = (function () {
            function ScrollManager() {
                this._listeners = null;
                this._$window = null;
                this._top = null;
                this._left = null;
                ScrollManager._instance = this;
                this._listeners = [];
                var scope = this;
                this._$window = $(window);
                this._$window.on("scroll", function () {
                    scope.onScroll();
                });
                this._top = this._$window.scrollTop();
                this._left = this._$window.scrollLeft();
            }
            ScrollManager.getInstance = function () {
                if (ScrollManager._instance === null) {
                    ScrollManager._instance = new ScrollManager();
                }
                return ScrollManager._instance;
            };
            ScrollManager.prototype.dispatchEvent = function (listener) {
                if (listener === void 0) { listener = null; }
                if (listener != null) {
                    listener.onScroll(this._top, this._left);
                }
                else {
                    this.onScroll();
                }
            };
            ScrollManager.prototype.addEventListener = function (listener) {
                var flg = true;
                var i = 0, max;
                for (i = 0, max = this._listeners.length; i < max; i = i + 1) {
                    if (this._listeners[i].id == listener.id) {
                        flg = false;
                        break;
                    }
                }
                if (flg) {
                    this._listeners.push(listener);
                }
            };
            ScrollManager.prototype.removeEventListener = function (listener) {
                var arr = [];
                var i = 0, max;
                for (i = 0, max = this._listeners.length; i < max; i = i + 1) {
                    if (this._listeners[i].id != listener.id) {
                        arr.push(listener);
                    }
                }
                this._listeners = arr;
            };
            ScrollManager.prototype.onScroll = function () {
                this._top = this._$window.scrollTop();
                this._left = this._$window.scrollLeft();
                var i = 0, max;
                for (i = 0, max = this._listeners.length; i < max; i = i + 1) {
                    this._listeners[i].onScroll(this._top, this._left);
                }
            };
            return ScrollManager;
        }());
        ScrollManager._instance = null;
        responisive.ScrollManager = ScrollManager;
    })(responisive = lib.responisive || (lib.responisive = {}));
    var collection;
    (function (collection_1) {
        var DisplayInfo = (function () {
            function DisplayInfo(id, display, displayImpl, buttonImpl, $target) {
                if (displayImpl === void 0) { displayImpl = null; }
                if (buttonImpl === void 0) { buttonImpl = null; }
                if ($target === void 0) { $target = null; }
                this.displayImpl = null;
                this.buttonImpl = null;
                this.$target = null;
                this.id = id;
                this.display = display;
                if (displayImpl)
                    this.displayImpl = displayImpl;
                if (buttonImpl)
                    this.buttonImpl = buttonImpl;
                if ($target)
                    this.$target = $target;
            }
            return DisplayInfo;
        }());
        collection_1.DisplayInfo = DisplayInfo;
        var DisplayCollection = (function () {
            function DisplayCollection(collection) {
                if (collection === void 0) { collection = null; }
                this._collection = [];
                if (collection)
                    this._collection = collection;
            }
            DisplayCollection.prototype.getLength = function () {
                return this._collection.length;
            };
            DisplayCollection.prototype.getInfo = function (index) {
                return this._collection[index];
            };
            DisplayCollection.prototype.getInfoById = function (id) {
                var i = 0, max;
                for (i = 0, max = this._collection.length; i < max; i = i + 1) {
                    var info = this._collection[i];
                    if (info.id == id) {
                        return info;
                    }
                }
                return null;
            };
            DisplayCollection.prototype.pushInfo = function (info) {
                this._collection.push(info);
            };
            return DisplayCollection;
        }());
        collection_1.DisplayCollection = DisplayCollection;
    })(collection = lib.collection || (lib.collection = {}));
})(lib || (lib = {}));
//# sourceMappingURL=lib.js.map