/// <reference path="../../../../../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../../../../../lib/lib.ts"/>
/// <reference path="../../../../../../../../imjcart/display/main/scene/timeatack/run/pausewindow/save/BtnSave.ts"/>
/// <reference path="../../../../../../../../imjcart/display/main/scene/timeatack/run/pausewindow/save/BtnTweet.ts"/>
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
                            var save;
                            (function (save) {
                                var Save = (function (_super) {
                                    __extends(Save, _super);
                                    function Save(target) {
                                        var _this = _super.call(this, target) || this;
                                        _this._displayImpl = null;
                                        _this._btnSave = null;
                                        _this._btnTweet = null;
                                        _this._$form = null;
                                        _this._$progress = null;
                                        _this._$complete = null;
                                        _this._$completeRank = null;
                                        _this._$completeLength = null;
                                        _this._$completeLapTime = null;
                                        _this._$completeName = null;
                                        _this._$comment = null;
                                        _this._$lapTime = null;
                                        _this._$name = null;
                                        //
                                        _this._btnSave = new save.BtnSave($("#sceneTimeAtackRunPauseWindowSaveBtnSave"));
                                        _this._btnSave.addEventListener("save_laptime", function (evt) {
                                            _this._saveLapTime();
                                        });
                                        _this._btnTweet = new save.BtnTweet($("#sceneTimeAtackRunPauseWindowSaveBtnTweet"));
                                        _this._btnTweet.addEventListener("tweet_laptime", function (evt) {
                                            _this._tweetLapTime();
                                        });
                                        _this._$form = $("#sceneTimeAtackRunPauseWindowSaveForm");
                                        _this._$progress = $("#sceneTimeAtackRunPauseWindowSaveProgress");
                                        _this._$complete = $("#sceneTimeAtackRunPauseWindowSaveComplete");
                                        _this._$completeRank = $("#sceneTimeAtackRunPauseWindowSaveCompleteRank");
                                        _this._$completeLength = $("#sceneTimeAtackRunPauseWindowSaveCompleteLength");
                                        _this._$completeLapTime = $("#sceneTimeAtackRunPauseWindowSaveCompleteLapTime");
                                        _this._$completeName = $("#sceneTimeAtackRunPauseWindowSaveCompleteName");
                                        _this._$lapTime = $("#sceneTimeAtackRunPauseWindowSaveLapTime");
                                        _this._$name = $("#sceneTimeAtackRunPauseWindowSaveName");
                                        _this._$comment = $("#sceneTimeAtackRunPauseWindowSaveComment");
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
                                    Save.prototype.open = function () {
                                        this._displayImpl.open(0);
                                    };
                                    Save.prototype.close = function () {
                                        this._displayImpl.close(0);
                                    };
                                    Save.prototype._startOpen = function () {
                                        var values = imjcart.logic.value.GlobalValue.getInstance();
                                        if (!values.lapTimeInfo || values.lapTimeInfo.time != values.fastestLapTime) {
                                            this._$form.css({
                                                display: "block"
                                            });
                                            this._$progress.css({
                                                display: "none"
                                            });
                                            this._$complete.css({
                                                display: "none"
                                            });
                                            this._btnSave.open();
                                            this._btnTweet.close();
                                            this._$comment.val("");
                                            if (values.name)
                                                this._$name.val(values.name);
                                            this._$lapTime.text(imjcart.logic.utility.Util.formatTime(values.fastestLapTime));
                                        }
                                        else {
                                            this._$form.css({
                                                display: "none"
                                            });
                                            this._$progress.css({
                                                display: "none"
                                            });
                                            this._$complete.css({
                                                display: "block"
                                            });
                                            this._btnTweet.open();
                                        }
                                    };
                                    Save.prototype._completeClose = function () {
                                        this._btnSave.close();
                                        this._btnTweet.close();
                                    };
                                    Save.prototype._saveLapTime = function () {
                                        // ラップタイム保存イベント
                                        var values = imjcart.logic.value.GlobalValue.getInstance();
                                        values.main.dispatchEvent(imjcart.logic.event.ProjectEvent.SAVE_LAPTIME_EVENT, {
                                            name: this._$name.val(),
                                            comment: this._$comment.val()
                                        });
                                        this._$form.css({
                                            display: "none"
                                        });
                                        this._$progress.css({
                                            display: "block"
                                        });
                                        this._$complete.css({
                                            display: "none"
                                        });
                                    };
                                    Save.prototype._tweetLapTime = function () {
                                        // ラップタイムツイート
                                        var values = imjcart.logic.value.GlobalValue.getInstance();
                                        var url = imjcart.logic.value.Const.TWEET_URL;
                                        var hash = imjcart.logic.value.Const.TWEET_HASHTAG;
                                        var time = imjcart.logic.utility.Util.formatTime(values.lapTimeInfo.time);
                                        var rank = values.lapTimeInfo.rank;
                                        var length = values.lapTimeInfo.length;
                                        var name = values.lapTimeInfo.name;
                                        var comment = "";
                                        if (values.lapTimeInfo.comment)
                                            comment = values.lapTimeInfo.comment;
                                        var text = name + " " + time + " (" + rank + "th/" + length + ") " + comment;
                                        text.replace(/[\n\r]/g, "");
                                        text = encodeURIComponent(text);
                                        window.open("http://twitter.com/share?text=" + text + "&hashtags=" + hash + "&url=" + url, "tweetwindow", "width=640, height=480, menubar=no, toolbar=no, scrollbars=no");
                                    };
                                    // ラップタイム保存完了
                                    Save.prototype.completeSaveLapTime = function () {
                                        var values = imjcart.logic.value.GlobalValue.getInstance();
                                        this._$completeRank.text(String(values.lapTimeInfo.rank));
                                        this._$completeLength.text(String(values.lapTimeInfo.length));
                                        this._$completeLapTime.text(imjcart.logic.utility.Util.formatTime(values.lapTimeInfo.time));
                                        this._$completeName.text(values.lapTimeInfo.name);
                                        this._$form.css({
                                            display: "none"
                                        });
                                        this._$progress.css({
                                            display: "none"
                                        });
                                        this._$complete.css({
                                            display: "block"
                                        });
                                        this._btnSave.close();
                                        this._btnTweet.open();
                                    };
                                    return Save;
                                }(lib.base.BaseDisplay));
                                save.Save = Save;
                            })(save = pausewindow.save || (pausewindow.save = {}));
                        })(pausewindow = run.pausewindow || (run.pausewindow = {}));
                    })(run = timeatack.run || (timeatack.run = {}));
                })(timeatack = scene.timeatack || (scene.timeatack = {}));
            })(scene = main.scene || (main.scene = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=Save.js.map