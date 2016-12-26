/// <reference path="../../../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../../../lib/lib.ts"/>
/// <reference path="../../../../../../imjcart/logic/value/GlobalValue.ts"/>
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
                        var BtnPause = (function (_super) {
                            __extends(BtnPause, _super);
                            function BtnPause(target) {
                                var _this = _super.call(this, target) || this;
                                _this._displayImpl = null;
                                _this._buttonImpl = null;
                                //
                                _this._displayImpl = new lib.display.SimpleDisplayImpl(_this.$target);
                                _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_COMPLETE_OPEN_EVENT, function () {
                                    _this._buttonImpl.setActive();
                                });
                                _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_START_CLOSE_EVENT, function () {
                                    _this._buttonImpl.deleteActive();
                                });
                                _this._buttonImpl = new lib.button.SimpleButtonImpl(_this.$target);
                                _this._buttonImpl.addEventListener(lib.event.Event.BUTTON_CLICK_EVENT, function () {
                                    // タイムアタック一時停止イベント
                                    var values = imjcart.logic.value.GlobalValue.getInstance();
                                    values.main.dispatchEvent(imjcart.logic.event.ProjectEvent.PAUSE_TIMEATTACK_EVENT);
                                });
                                return _this;
                            }
                            BtnPause.prototype.open = function () {
                                this._displayImpl.open(0);
                            };
                            BtnPause.prototype.close = function () {
                                this._displayImpl.close(0);
                            };
                            return BtnPause;
                        }(lib.base.BaseDisplay));
                        run.BtnPause = BtnPause;
                    })(run = timeatack.run || (timeatack.run = {}));
                })(timeatack = scene.timeatack || (scene.timeatack = {}));
            })(scene = main.scene || (main.scene = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=BtnPause.js.map