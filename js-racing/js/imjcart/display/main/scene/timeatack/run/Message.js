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
                        var Message = (function (_super) {
                            __extends(Message, _super);
                            function Message(target) {
                                var _this = _super.call(this, target) || this;
                                _this._displayImpl = null;
                                _this._$txt = $("#sceneTimeAtackRunMessageTxt");
                                _this._intervalId = null;
                                //
                                _this._displayImpl = new lib.display.SimpleDisplayImpl(_this.$target);
                                _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_START_OPEN_EVENT, function () {
                                    if (_this._intervalId)
                                        clearInterval(_this._intervalId);
                                    _this._intervalId = setInterval(function () {
                                        _this.close();
                                    }, 3000);
                                });
                                _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_COMPLETE_CLOSE_EVENT, function () {
                                    _this._$txt.empty();
                                });
                                return _this;
                            }
                            Message.prototype.open = function () {
                                this._displayImpl.open(0);
                            };
                            Message.prototype.close = function () {
                                this._displayImpl.close(0);
                            };
                            Object.defineProperty(Message.prototype, "message", {
                                set: function (value) {
                                    this._$txt.text(value);
                                },
                                enumerable: true,
                                configurable: true
                            });
                            return Message;
                        }(lib.base.BaseDisplay));
                        run.Message = Message;
                    })(run = timeatack.run || (timeatack.run = {}));
                })(timeatack = scene.timeatack || (scene.timeatack = {}));
            })(scene = main.scene || (main.scene = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=Message.js.map