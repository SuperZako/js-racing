/// <reference path="../../../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../../../lib/lib.ts"/>
/// <reference path="../../../../../../imjcart/logic/value/Const.ts"/>
/// <reference path="../../../../../../imjcart/logic/utility/Util.ts"/>
/// <reference path="../../../../../../imjcart/display/main/scene/timeatack/run/BtnSave.ts"/>
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
                        var LapTime = (function (_super) {
                            __extends(LapTime, _super);
                            function LapTime(target) {
                                var _this = _super.call(this, target) || this;
                                _this._displayImpl = null;
                                _this._btnSave = null;
                                _this._$current = $("#sceneTimeAtackRunLapTimeCurrent");
                                _this._$fastest = $("#sceneTimeAtackRunLapTimeFastest");
                                _this._$fastestTxt = $("#sceneTimeAtackRunLapTimeFastestTxt");
                                _this._$list = $("#sceneTimeAtackRunLapTimeList");
                                _this._$listItem = null;
                                _this._isExixtFastest = false;
                                // 保存ボタン
                                _this._btnSave = new run.BtnSave($("#sceneTimeAtackRunBtnSave"));
                                _this._$listItem = _this._$list.find("li").clone();
                                _this._$list.empty();
                                //
                                _this._displayImpl = new lib.display.SimpleDisplayImpl(_this.$target);
                                _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_START_OPEN_EVENT, function () {
                                    _this.currentTime = 0;
                                });
                                return _this;
                            }
                            LapTime.prototype.open = function () {
                                this._displayImpl.open(0);
                            };
                            LapTime.prototype.close = function () {
                                this._displayImpl.close(0);
                            };
                            Object.defineProperty(LapTime.prototype, "fastestLap", {
                                set: function (value) {
                                    if (!this._isExixtFastest) {
                                        this._isExixtFastest = true;
                                        this._$fastest.css({
                                            display: "block"
                                        });
                                        this._btnSave.open();
                                    }
                                    this._$fastestTxt.text(imjcart.logic.utility.Util.formatTime(value));
                                },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(LapTime.prototype, "currentTime", {
                                set: function (value) {
                                    this._$current.text(imjcart.logic.utility.Util.formatTime(value));
                                },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(LapTime.prototype, "lapTimeArr", {
                                set: function (arr) {
                                    // これまでのラップタイムを表示
                                    this._$list.empty();
                                    var j = 0;
                                    for (var i = arr.length - 1; 0 <= i; i--) {
                                        var time = arr[i];
                                        var $listItem = this._$listItem.clone();
                                        $listItem.find(".sceneTimeAtackRunLapTimeListLap").text(i + 1 + "");
                                        $listItem.find(".sceneTimeAtackRunLapTimeListTime").text(imjcart.logic.utility.Util.formatTime(time));
                                        this._$list.append($listItem);
                                        j++;
                                        if (imjcart.logic.value.Const.LAP_TIME_LIST_MAX <= j)
                                            break;
                                    }
                                },
                                enumerable: true,
                                configurable: true
                            });
                            return LapTime;
                        }(lib.base.BaseDisplay));
                        run.LapTime = LapTime;
                    })(run = timeatack.run || (timeatack.run = {}));
                })(timeatack = scene.timeatack || (scene.timeatack = {}));
            })(scene = main.scene || (main.scene = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=LapTime.js.map