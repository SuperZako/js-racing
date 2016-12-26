/// <reference path="../../../../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../../../../lib/lib.ts"/>
/// <reference path="../../../../../../../imjcart/display/main/scene/timeatack/run/pausewindow/BtnResume.ts"/>
/// <reference path="../../../../../../../imjcart/display/main/scene/timeatack/run/pausewindow/BtnRetry.ts"/>
/// <reference path="../../../../../../../imjcart/display/main/scene/timeatack/run/pausewindow/save/Save.ts"/>
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
                        var pausewindow;
                        (function (pausewindow) {
                            var PauseWindow = (function (_super) {
                                __extends(PauseWindow, _super);
                                function PauseWindow(target) {
                                    var _this = _super.call(this, target) || this;
                                    _this._displayImpl = null;
                                    _this._btnResume = null;
                                    _this._btnRetry = null;
                                    _this._save = null;
                                    //
                                    _this._btnResume = new pausewindow.BtnResume($("#sceneTimeAtackRunPauseWindowBtnResume"));
                                    _this._btnRetry = new pausewindow.BtnRetry($("#sceneTimeAtackRunPauseWindowBtnRetry"));
                                    _this._save = new pausewindow.save.Save($("#sceneTimeAtackRunPauseWindowSave"));
                                    //
                                    _this._displayImpl = new lib.display.SimpleDisplayImpl(_this.$target);
                                    _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_START_OPEN_EVENT, function () {
                                        _this._startOpen();
                                    });
                                    _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_COMPLETE_CLOSE_EVENT, function () {
                                        _this._completeClose();
                                    });
                                    return _this;
                                }
                                PauseWindow.prototype.open = function () {
                                    this._displayImpl.open(0);
                                };
                                PauseWindow.prototype.close = function () {
                                    this._displayImpl.close(0);
                                };
                                PauseWindow.prototype._startOpen = function () {
                                    this._btnResume.open();
                                    this._btnRetry.open();
                                    //
                                    var values = imjcart.logic.value.GlobalValue.getInstance();
                                    if (values.fastestLapTime) {
                                        this._save.open();
                                    }
                                };
                                PauseWindow.prototype._completeClose = function () {
                                    this._btnResume.close();
                                    this._btnRetry.close();
                                    this._save.close();
                                };
                                // ラップタイム保存完了
                                PauseWindow.prototype.completeSaveLapTime = function () {
                                    this._save.completeSaveLapTime();
                                };
                                return PauseWindow;
                            }(lib.base.BaseDisplay));
                            pausewindow.PauseWindow = PauseWindow;
                        })(pausewindow = run.pausewindow || (run.pausewindow = {}));
                    })(run = timeatack.run || (timeatack.run = {}));
                })(timeatack = scene.timeatack || (scene.timeatack = {}));
            })(scene = main.scene || (main.scene = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=PauseWindow.js.map