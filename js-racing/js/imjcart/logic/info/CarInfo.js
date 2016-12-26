/// <reference path="../../../lib/jquery.d.ts"/>
/// <reference path="../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../lib/lib.ts"/>
/// <reference path="../../../imjcart/logic/info/RunningPath.ts"/>
var imjcart;
(function (imjcart) {
    var logic;
    (function (logic) {
        var info;
        (function (info) {
            var CarInfo = (function () {
                function CarInfo(x, y, bodyAngle, wheelAngle, speed, power, gear, direction, colorBody, colorWing, colorDriver, name) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    if (bodyAngle === void 0) { bodyAngle = 0; }
                    if (wheelAngle === void 0) { wheelAngle = 0; }
                    if (speed === void 0) { speed = 0; }
                    if (power === void 0) { power = 0; }
                    if (gear === void 0) { gear = 0; }
                    if (direction === void 0) { direction = 0; }
                    if (colorBody === void 0) { colorBody = null; }
                    if (colorWing === void 0) { colorWing = null; }
                    if (colorDriver === void 0) { colorDriver = null; }
                    if (name === void 0) { name = null; }
                    this._name = null;
                    this._x = null;
                    this._y = null;
                    this._bodyAngle = null;
                    this._wheelAngle = null;
                    this._speed = null;
                    this._power = null;
                    this._gear = null;
                    this._direction = null;
                    this._colorBody = null;
                    this._colorWing = null;
                    this._colorDriver = null;
                    this._runningPath = null;
                    this._x = x;
                    this._y = y;
                    this._bodyAngle = bodyAngle;
                    this._wheelAngle = wheelAngle;
                    this._speed = speed;
                    this._power = power;
                    this._gear = gear;
                    this._direction = direction;
                    this._colorBody = colorBody;
                    this._colorWing = colorWing;
                    this._colorDriver = colorDriver;
                    this._name = name;
                    this._runningPath = new imjcart.logic.info.RunningPath();
                }
                Object.defineProperty(CarInfo.prototype, "runningPath", {
                    get: function () {
                        return this._runningPath;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "x", {
                    get: function () {
                        return this._x;
                    },
                    set: function (value) {
                        this._x = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    set: function (value) {
                        this._y = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "bodyAngle", {
                    get: function () {
                        return this._bodyAngle;
                    },
                    set: function (value) {
                        this._bodyAngle = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "wheelAngle", {
                    get: function () {
                        return this._wheelAngle;
                    },
                    set: function (value) {
                        this._wheelAngle = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "speed", {
                    get: function () {
                        return this._speed;
                    },
                    set: function (value) {
                        this._speed = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "power", {
                    get: function () {
                        return this._power;
                    },
                    set: function (value) {
                        this._power = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "gear", {
                    get: function () {
                        return this._gear;
                    },
                    set: function (value) {
                        this._gear = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "direction", {
                    get: function () {
                        return this._direction;
                    },
                    set: function (value) {
                        this._direction = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "colorBody", {
                    get: function () {
                        return this._colorBody;
                    },
                    set: function (value) {
                        this._colorBody = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "colorWing", {
                    get: function () {
                        return this._colorWing;
                    },
                    set: function (value) {
                        this._colorWing = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CarInfo.prototype, "colorDriver", {
                    get: function () {
                        return this._colorDriver;
                    },
                    set: function (value) {
                        this._colorDriver = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return CarInfo;
            }());
            info.CarInfo = CarInfo;
        })(info = logic.info || (logic.info = {}));
    })(logic = imjcart.logic || (imjcart.logic = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=CarInfo.js.map