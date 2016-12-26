/// <reference path="../../../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../../../lib/lib.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var imjcart;
(function (imjcart) {
    var display;
    (function (display) {
        var main;
        (function (main) {
            var scene;
            (function (scene) {
                var timeatack;
                (function (timeatack) {
                    var run;
                    (function (run) {
                        var EngineCondition = (function (_super) {
                            __extends(EngineCondition, _super);
                            function EngineCondition(target) {
                                var _this = _super.call(this, target) || this;
                                _this._displayImpl = null;
                                _this._$mater = $("#sceneTimeAtackRunEngineConditionMater");
                                _this._$speed = $("#sceneTimeAtackRunEngineConditionSpeedTxt");
                                _this._rotation = null;
                                _this._speed = null;
                                _this._intervalId = null;
                                //
                                _this._displayImpl = new lib.display.SimpleDisplayImpl(_this.$target);
                                _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_START_OPEN_EVENT, function () {
                                    _this.speed = 0;
                                    _this.power = 0;
                                    _this.gear = 0;
                                    _this.direction = 0;
                                });
                                return _this;
                            }
                            EngineCondition.prototype.open = function () {
                                var _this = this;
                                this._displayImpl.open(0);
                                //
                                if (this._intervalId)
                                    clearInterval(this._intervalId);
                                this._intervalId = setInterval(function () {
                                    _this._$mater.attr("transform", "rotate(" + _this._rotation + " 100 100)");
                                    _this._$speed.text(String(_this._speed));
                                }, 1000 / 10);
                            };
                            EngineCondition.prototype.close = function () {
                                this._displayImpl.close(0);
                            };
                            Object.defineProperty(EngineCondition.prototype, "speed", {
                                set: function (value) {
                                    this._rotation = Math.floor((180 * (Math.abs(value) * 0.5)) + 45);
                                    this._speed = Math.floor(Math.abs(value) * 100);
                                    //this._$mater.attr("transform", "rotate(" + Math.floor((180 * (Math.abs(value) * 0.5)) + 45) + " 100 100)");
                                },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(EngineCondition.prototype, "power", {
                                set: function (value) {
                                },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(EngineCondition.prototype, "gear", {
                                set: function (value) {
                                },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(EngineCondition.prototype, "direction", {
                                set: function (value) {
                                },
                                enumerable: true,
                                configurable: true
                            });
                            return EngineCondition;
                        }(lib.base.BaseDisplay));
                        run.EngineCondition = EngineCondition;
                    })(run = timeatack.run || (timeatack.run = {}));
                })(timeatack = scene.timeatack || (scene.timeatack = {}));
            })(scene = main.scene || (main.scene = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=EngineCondition.js.map