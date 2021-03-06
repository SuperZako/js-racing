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
                        var coursemap;
                        (function (coursemap) {
                            var CourseMap = (function (_super) {
                                __extends(CourseMap, _super);
                                function CourseMap(target) {
                                    var _this = _super.call(this, target) || this;
                                    _this._displayImpl = null;
                                    _this._$car = null;
                                    _this._$carOther = null;
                                    _this._canvas = null;
                                    _this._context = null;
                                    _this._carX = null;
                                    _this._carY = null;
                                    _this._intervalId = null;
                                    //
                                    _this._$car = $("#sceneTimeAtackRunCourseMapCar");
                                    _this._$carOther = $(".sceneTimeAtackRunCourseMapCarOther");
                                    _this._canvas = document.getElementById("sceneTimeAtackRunCourseMapCanvas");
                                    _this._context = _this._canvas.getContext("2d");
                                    //
                                    _this._displayImpl = new lib.display.SimpleDisplayImpl(_this.$target);
                                    _this._displayImpl.addEventListener(lib.event.Event.DISPLAY_START_OPEN_EVENT, function () {
                                        _this._createCourse();
                                        _this._createCar();
                                    });
                                    return _this;
                                }
                                CourseMap.prototype.open = function () {
                                    this._displayImpl.open(0);
                                };
                                CourseMap.prototype.close = function () {
                                    this._displayImpl.close(0);
                                };
                                CourseMap.prototype.update = function (x, y) {
                                    this._carX = x * imjcart.logic.value.Const.COURSE_MAP_SCALE;
                                    this._carY = y * imjcart.logic.value.Const.COURSE_MAP_SCALE;
                                };
                                CourseMap.prototype._createCourse = function () {
                                    var size = imjcart.logic.value.Const.COURSE_MAP_SCALE / imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE;
                                    this._context.save();
                                    var i, j, max, max2;
                                    for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                                        for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                            if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_LAP_START_POINT) {
                                                this._context.fillStyle = "rgb(255, 0, 0)";
                                                this._context.fillRect((size * j), (size * i), size, size);
                                            }
                                            else if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_TREE) {
                                                this._context.fillStyle = "rgb(0, 100, 0)";
                                                this._context.fillRect((size * j), (size * i), size, size);
                                            }
                                            else if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_TIRE) {
                                                this._context.fillStyle = "rgb(50, 50, 255)";
                                                this._context.fillRect((size * j), (size * i), size, size);
                                            }
                                            else if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_NONE
                                                || imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_CAR_START_POSITION
                                                || imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_LAP_MEDIAN_CENTER_01
                                                || imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_LAP_MEDIAN_CENTER_02) {
                                                this._context.fillStyle = "rgb(255, 255, 255)";
                                                this._context.fillRect((size * j), (size * i), size, size);
                                            }
                                            else {
                                                if (i % 2) {
                                                    this._context.fillStyle = "rgb(120, 160, 80)";
                                                    this._context.fillRect((size * j), (size * i), size, size);
                                                }
                                            }
                                        }
                                    }
                                    this._context.restore();
                                };
                                CourseMap.prototype._createCar = function () {
                                    var _this = this;
                                    this._$car.css({
                                        position: "absolute",
                                        backgroundColor: imjcart.logic.value.GlobalValue.getInstance().colorBody
                                    });
                                    //
                                    if (this._intervalId)
                                        clearInterval(this._intervalId);
                                    this._intervalId = setInterval(function () {
                                        _this._$car.css({
                                            left: _this._carX - 4,
                                            top: _this._carY - 4
                                        });
                                    }, 1000 / 10);
                                };
                                // 他の車追加
                                CourseMap.prototype.addOtherCar = function (id) {
                                    var values = imjcart.logic.value.GlobalValue.getInstance();
                                    var i = 0, max;
                                    for (i = 0, max = values.otherCarInfoArr.length; i < max; i = i + 1) {
                                        var info = values.otherCarInfoArr[i];
                                        if (info.id == id) {
                                            var $carOther = this._$carOther.clone();
                                            $carOther.attr("data-id", id);
                                            $carOther.css({
                                                display: "block",
                                                position: "absolute",
                                                backgroundColor: info.colorBody
                                            });
                                            this.$target.append($carOther);
                                            return;
                                        }
                                    }
                                };
                                // 他の車除去
                                CourseMap.prototype.removeOtherCar = function (id) {
                                    this.$target.find(".sceneTimeAtackRunCourseMapCarOther").each(function () {
                                        if ($(this).attr("data-id") == id) {
                                            $(this).remove();
                                        }
                                    });
                                };
                                // 他の車の姿勢更新
                                CourseMap.prototype.updateOtherCarPosture = function () {
                                    var values = imjcart.logic.value.GlobalValue.getInstance();
                                    var i = 0, max;
                                    for (i = 0, max = values.otherCarInfoArr.length; i < max; i = i + 1) {
                                        var info = values.otherCarInfoArr[i];
                                        this.$target.find(".sceneTimeAtackRunCourseMapCarOther").each(function () {
                                            if ($(this).attr("data-id") == info.id) {
                                                $(this).css({
                                                    left: info.x * imjcart.logic.value.Const.COURSE_MAP_SCALE - 2,
                                                    top: info.y * imjcart.logic.value.Const.COURSE_MAP_SCALE - 2
                                                });
                                            }
                                        });
                                    }
                                };
                                return CourseMap;
                            }(lib.base.BaseDisplay));
                            coursemap.CourseMap = CourseMap;
                        })(coursemap = run.coursemap || (run.coursemap = {}));
                    })(run = timeatack.run || (timeatack.run = {}));
                })(timeatack = scene.timeatack || (scene.timeatack = {}));
            })(scene = main.scene || (main.scene = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=CourseMap.js.map