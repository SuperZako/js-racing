/// <reference path="../../../lib/jquery.d.ts"/>
/// <reference path="../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../lib/lib.ts"/>
/// <reference path="../../../imjcart/logic/socket/SocketController.ts"/>
/// <reference path="../../../imjcart/logic/value/Const.ts"/>
/// <reference path="../../../imjcart/logic/value/GlobalValue.ts"/>
/// <reference path="../../../imjcart/logic/event/ProjectEvent.ts"/>
/// <reference path="../../../imjcart/logic/info/OtherCarInfo.ts"/>
/// <reference path="../../../imjcart/display/main/view3d/View3d.ts"/>
/// <reference path="../../../imjcart/display/main/scene/Scene.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var imjcart;
(function (imjcart) {
    var display;
    (function (display) {
        var controller;
        (function (controller) {
            var Controller = (function (_super) {
                __extends(Controller, _super);
                function Controller(target) {
                    var _this = _super.call(this, target) || this;
                    _this._displayImpl = null;
                    _this._window = null;
                    _this._id = null;
                    _this._isPortait = true;
                    _this._slope = null;
                    _this._socket = null;
                    _this._$boxOpening = null;
                    _this._$boxController = null;
                    _this._$boxError = null;
                    _this._$btnPlay = null;
                    _this._$btnCamera = null;
                    _this._$btnHandleLeft = null;
                    _this._$btnHandleRight = null;
                    _this._$btnAccelerator = null;
                    _this._$btnBack = null;
                    _this._startTouchEvent = null;
                    _this._endTouchEvent = null;
                    //
                    var values = imjcart.logic.value.GlobalValue.getInstance();
                    values.controller = _this;
                    //
                    _this._$boxOpening = $("#boxOpening");
                    _this._$boxController = $("#boxController");
                    _this._$boxError = $("#boxError");
                    _this._$btnPlay = $("#btnPlay");
                    _this._$btnCamera = $("#btnCamera");
                    _this._$btnHandleLeft = $("#btnHandleLeft");
                    _this._$btnHandleRight = $("#btnHandleRight");
                    _this._$btnAccelerator = $("#btnAccelerator");
                    _this._$btnBack = $("#btnBack");
                    // socket.io
                    _this._socket = new imjcart.logic.socket.SocketController();
                    //
                    _this._id = $("#id").text();
                    var isTouch = ("ontouchstart" in window);
                    _this._startTouchEvent = (isTouch) ? "touchstart" : "mousedown";
                    _this._endTouchEvent = (isTouch) ? "touchend" : "mouseup";
                    //
                    _this._displayImpl = new lib.display.SimpleDisplayImpl(_this.$target);
                    _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_START_OPEN_EVENT, function () {
                        lib.responisive.ResizeManager.getInstance().addEventListener(_this);
                        lib.responisive.ResizeManager.getInstance().dispatchEvent(_this);
                    });
                    _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_COMPLETE_OPEN_EVENT, function () {
                        _this._completeOpen();
                    });
                    //
                    // ---------- イベント ---------- //
                    //
                    // 開始イベント
                    _this.addEventListener(imjcart.logic.event.ProjectEvent.CONTROLLER_START_EVENT, function (evt) {
                        _this._$boxOpening.css({
                            display: "none"
                        });
                        _this._$boxController.css({
                            display: "block"
                        });
                    });
                    // エラー表示イベント
                    _this.addEventListener(imjcart.logic.event.ProjectEvent.CONTROLLER_ERROR_EVENT, function (evt) {
                        _this._$boxOpening.css({
                            display: "none"
                        });
                        _this._$boxController.css({
                            display: "none"
                        });
                        _this._$boxError.css({
                            display: "block"
                        });
                    });
                    //
                    _this._$btnPlay.on("click", function (evt) {
                        evt.preventDefault();
                        _this._play();
                    });
                    //
                    _this._$btnCamera.on(_this._startTouchEvent, function (evt) {
                        evt.preventDefault();
                        _this._changeCameraAngle();
                        _this._$btnCamera.addClass("active");
                    });
                    _this._$btnCamera.on(_this._endTouchEvent, function (evt) {
                        evt.preventDefault();
                        _this._$btnCamera.removeClass("active");
                    });
                    //
                    _this._$btnHandleLeft.on(_this._startTouchEvent, function (evt) {
                        evt.preventDefault();
                        _this._setSteeringAngleLeft();
                    });
                    _this._$btnHandleLeft.on(_this._endTouchEvent, function (evt) {
                        evt.preventDefault();
                        _this._clearSteeringAngle();
                    });
                    //
                    _this._$btnHandleRight.on(_this._startTouchEvent, function (evt) {
                        evt.preventDefault();
                        _this._setSteeringAngleRight();
                    });
                    _this._$btnHandleRight.on(_this._endTouchEvent, function (evt) {
                        evt.preventDefault();
                        _this._clearSteeringAngle();
                    });
                    //
                    _this._$btnAccelerator.on(_this._startTouchEvent, function (evt) {
                        evt.preventDefault();
                        _this._startEngine({
                            value: 1
                        });
                        _this._$btnAccelerator.addClass("active");
                    });
                    _this._$btnAccelerator.on(_this._endTouchEvent, function (evt) {
                        evt.preventDefault();
                        _this._stopEngine();
                        _this._$btnAccelerator.removeClass("active");
                    });
                    //
                    _this._$btnBack.on(_this._startTouchEvent, function (evt) {
                        evt.preventDefault();
                        _this._startEngine({
                            value: -1
                        });
                        _this._$btnBack.addClass("active");
                    });
                    _this._$btnBack.on(_this._endTouchEvent, function (evt) {
                        evt.preventDefault();
                        _this._stopEngine();
                        _this._$btnBack.removeClass("active");
                    });
                    //
                    _this._window = window;
                    $(_this._window).bind("load orientationchange", function (evt) {
                        evt.preventDefault();
                        if (Math.abs(_this._window.orientation) === 90) {
                            _this._isPortait = false;
                        }
                        else {
                            _this._isPortait = true;
                        }
                    });
                    _this._window.addEventListener("devicemotion", function (evt) {
                        evt.preventDefault();
                        var x = evt.accelerationIncludingGravity.x; //横方向の傾斜
                        var y = evt.accelerationIncludingGravity.y; //縦方法の傾斜
                        //var z = evt.accelerationIncludingGravity.z; //上下方向の傾斜
                        var slope = "center";
                        if (_this._isPortait) {
                            if (x <= -4) {
                                slope = "left";
                            }
                            else if (4 <= x) {
                                slope = "right";
                            }
                        }
                        else {
                            if (0 <= x) {
                                if (y <= -4) {
                                    slope = "left";
                                }
                                else if (4 <= y) {
                                    slope = "right";
                                }
                            }
                            else {
                                if (y <= -4) {
                                    slope = "right";
                                }
                                else if (4 <= y) {
                                    slope = "left";
                                }
                            }
                        }
                        if (_this._slope != slope) {
                            _this._slope = slope;
                            _this._changeSteeringAngle();
                        }
                    }, false);
                    return _this;
                }
                Controller.prototype.open = function () {
                    this._displayImpl.open(0);
                };
                Controller.prototype.close = function () {
                    this._displayImpl.close(0);
                };
                Controller.prototype._completeOpen = function () {
                    this._$boxOpening.css({
                        display: "block"
                    });
                };
                Controller.prototype.onResize = function (width, height) {
                    this.$target.css({
                        width: width,
                        height: height
                    });
                    this._$btnCamera.css({
                        height: (height - 40) / 3
                    });
                    this._$btnHandleLeft.css({
                        height: (height - 40) / 3
                    });
                    this._$btnHandleRight.css({
                        height: (height - 40) / 3
                    });
                    this._$btnAccelerator.css({
                        height: (height - 40) / 3
                    });
                    this._$btnBack.css({
                        height: (height - 40) / 3
                    });
                };
                Controller.prototype._play = function () {
                    this._socket.play({
                        id: this._id
                    });
                    // 開始イベント
                    var values = imjcart.logic.value.GlobalValue.getInstance();
                    values.controller.dispatchEvent(imjcart.logic.event.ProjectEvent.CONTROLLER_START_EVENT);
                };
                Controller.prototype._changeCameraAngle = function () {
                    this._socket.changeCameraAngle({
                        id: this._id
                    });
                };
                Controller.prototype._changeSteeringAngle = function () {
                    switch (this._slope) {
                        case "right":
                            this._setSteeringAngleRight();
                            break;
                        case "left":
                            this._setSteeringAngleLeft();
                            break;
                        case "center":
                            this._clearSteeringAngle();
                            break;
                    }
                };
                Controller.prototype._setSteeringAngleLeft = function () {
                    this._socket.setSteeringAngle({
                        id: this._id,
                        value: 0.5
                    });
                    this._$btnHandleLeft.addClass("active");
                    this._$btnHandleRight.removeClass("active");
                };
                Controller.prototype._setSteeringAngleRight = function () {
                    this._socket.setSteeringAngle({
                        id: this._id,
                        value: -0.5
                    });
                    this._$btnHandleRight.addClass("active");
                    this._$btnHandleLeft.removeClass("active");
                };
                Controller.prototype._clearSteeringAngle = function () {
                    this._socket.clearSteeringAngle({
                        id: this._id
                    });
                    this._$btnHandleLeft.removeClass("active");
                    this._$btnHandleRight.removeClass("active");
                };
                Controller.prototype._startEngine = function (params) {
                    var value = params.value;
                    this._socket.startEngine({
                        id: this._id,
                        value: value
                    });
                };
                Controller.prototype._stopEngine = function () {
                    this._socket.stopEngine({
                        id: this._id
                    });
                };
                return Controller;
            }(lib.base.BaseDisplay));
            controller.Controller = Controller;
        })(controller = display.controller || (display.controller = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=Controller.js.map