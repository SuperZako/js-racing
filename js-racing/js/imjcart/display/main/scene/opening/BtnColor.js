/// <reference path="../../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../../lib/lib.ts"/>
/// <reference path="../../../../../imjcart/logic/value/GlobalValue.ts"/>
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
                var opening;
                (function (opening) {
                    var BtnColor = (function (_super) {
                        __extends(BtnColor, _super);
                        function BtnColor(target, id, color) {
                            if (id === void 0) { id = null; }
                            if (color === void 0) { color = null; }
                            var _this = _super.call(this, target) || this;
                            _this._displayImpl = null;
                            _this._buttonImpl = null;
                            _this._id = null;
                            _this._color = null;
                            _this._id = id;
                            _this._color = color;
                            _this.$target.css({
                                backgroundColor: color
                            });
                            //
                            _this._displayImpl = new lib.display.SimpleDisplayImpl(_this.$target);
                            _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_COMPLETE_OPEN_EVENT, function () {
                                _this._buttonImpl.setActive();
                                /*
                                                if (this._id == imjcart.logic.value.Const.ID_COLOR_BODY && this._color == imjcart.logic.value.Const.DEFAULT_BODY_COLOR) {
                                                    this._buttonImpl.setCurrent();
                                                } else if (this._id == imjcart.logic.value.Const.ID_COLOR_WING && this._color == imjcart.logic.value.Const.DEFAULT_WING_COLOR) {
                                                    this._buttonImpl.setCurrent();
                                                } else if (this._id == imjcart.logic.value.Const.ID_COLOR_DRIVER && this._color == imjcart.logic.value.Const.DEFAULT_DRIVER_COLOR) {
                                                    this._buttonImpl.setCurrent();
                                                }
                                */
                            });
                            _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_START_CLOSE_EVENT, function () {
                                _this._buttonImpl.deleteActive();
                            });
                            //
                            _this._buttonImpl = new lib.button.SimpleButtonImpl(_this.$target);
                            _this._buttonImpl.addEventListener(lib.event.Event.BUTTON_CLICK_EVENT, function () {
                                // カラー変更イベント
                                var values = imjcart.logic.value.GlobalValue.getInstance();
                                values.main.dispatchEvent(imjcart.logic.event.ProjectEvent.CHANGE_COLOR_EVENT, { id: _this._id, color: _this._color });
                            });
                            _this._buttonImpl.addEventListener(lib.event.Event.BUTTON_SET_CURRENT_EVENT, function () {
                                // カレント表示
                                _this.$target.addClass("current");
                            });
                            _this._buttonImpl.addEventListener(lib.event.Event.BUTTON_DELETE_CURRENT_EVENT, function () {
                                // カレント解除
                                _this.$target.removeClass("current");
                            });
                            return _this;
                        }
                        BtnColor.prototype.open = function () {
                            this._displayImpl.open(0);
                        };
                        BtnColor.prototype.close = function () {
                            this._displayImpl.close(0);
                        };
                        Object.defineProperty(BtnColor.prototype, "color", {
                            get: function () {
                                return this._color;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        BtnColor.prototype.setCurrent = function () {
                            this._buttonImpl.setCurrent();
                        };
                        BtnColor.prototype.deleteCurrent = function () {
                            this._buttonImpl.deleteCurrent();
                        };
                        return BtnColor;
                    }(lib.base.BaseDisplay));
                    opening.BtnColor = BtnColor;
                })(opening = scene.opening || (scene.opening = {}));
            })(scene = main.scene || (main.scene = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=BtnColor.js.map