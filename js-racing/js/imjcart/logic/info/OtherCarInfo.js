/// <reference path="../../../lib/jquery.d.ts"/>
/// <reference path="../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../lib/lib.ts"/>
var imjcart;
(function (imjcart) {
    var logic;
    (function (logic) {
        var info;
        (function (info) {
            var OtherCarInfo = (function () {
                function OtherCarInfo(id, x, y, bodyAngle, wheelAngle, speed, colorBody, colorWing, colorDriver, name) {
                    if (id === void 0) { id = null; }
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    if (bodyAngle === void 0) { bodyAngle = 0; }
                    if (wheelAngle === void 0) { wheelAngle = 0; }
                    if (speed === void 0) { speed = 0; }
                    if (colorBody === void 0) { colorBody = null; }
                    if (colorWing === void 0) { colorWing = null; }
                    if (colorDriver === void 0) { colorDriver = null; }
                    if (name === void 0) { name = null; }
                    this._id = null;
                    this._name = null;
                    this._x = null;
                    this._y = null;
                    this._bodyAngle = null;
                    this._wheelAngle = null;
                    this._speed = null;
                    this._colorBody = null;
                    this._colorWing = null;
                    this._colorDriver = null;
                    this._id = id;
                    this._x = x;
                    this._y = y;
                    this._bodyAngle = bodyAngle;
                    this._wheelAngle = wheelAngle;
                    this._speed = speed;
                    this._colorBody = colorBody;
                    this._colorWing = colorWing;
                    this._colorDriver = colorDriver;
                    this._name = name;
                }
                Object.defineProperty(OtherCarInfo.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OtherCarInfo.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OtherCarInfo.prototype, "x", {
                    get: function () {
                        return this._x;
                    },
                    set: function (value) {
                        this._x = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OtherCarInfo.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    set: function (value) {
                        this._y = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OtherCarInfo.prototype, "bodyAngle", {
                    get: function () {
                        return this._bodyAngle;
                    },
                    set: function (value) {
                        this._bodyAngle = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OtherCarInfo.prototype, "wheelAngle", {
                    get: function () {
                        return this._wheelAngle;
                    },
                    set: function (value) {
                        this._wheelAngle = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OtherCarInfo.prototype, "speed", {
                    get: function () {
                        return this._speed;
                    },
                    set: function (value) {
                        this._speed = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OtherCarInfo.prototype, "colorBody", {
                    get: function () {
                        return this._colorBody;
                    },
                    set: function (value) {
                        this._colorBody = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OtherCarInfo.prototype, "colorWing", {
                    get: function () {
                        return this._colorWing;
                    },
                    set: function (value) {
                        this._colorWing = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OtherCarInfo.prototype, "colorDriver", {
                    get: function () {
                        return this._colorDriver;
                    },
                    set: function (value) {
                        this._colorDriver = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return OtherCarInfo;
            }());
            info.OtherCarInfo = OtherCarInfo;
        })(info = logic.info || (logic.info = {}));
    })(logic = imjcart.logic || (imjcart.logic = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=OtherCarInfo.js.map