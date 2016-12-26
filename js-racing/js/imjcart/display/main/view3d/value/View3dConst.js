/// <reference path="../../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../../lib/lib.ts"/>
var imjcart;
(function (imjcart) {
    var display;
    (function (display) {
        var main;
        (function (main) {
            var view3d;
            (function (view3d) {
                var value;
                (function (value) {
                    var View3dConst = (function () {
                        function View3dConst() {
                        }
                        return View3dConst;
                    }());
                    View3dConst.CAMERA_MODE_OPENING = "camera_mode_opening"; // カメラモード（オープニング）
                    View3dConst.CAMERA_MODE_TIMEATACK_RUN = "camera_mode_timeatack_run"; // カメラモード（タイムアタック・走行）
                    //
                    View3dConst.CAMERA_ANGLE_TOP = "camera_angle_top"; // カメラアングル（車の上から）
                    View3dConst.CAMERA_ANGLE_BACK = "camera_angle_back"; // カメラアングル（車の後方から）
                    View3dConst.CAMERA_ANGLE_INSIDE = "camera_angle_inside"; // カメラアングル（運転席）
                    View3dConst.CAMERA_ANGLE_DEFAULT = View3dConst.CAMERA_ANGLE_BACK;
                    //
                    View3dConst.AMBIENT_COLOR = 0x666666;
                    value.View3dConst = View3dConst;
                })(value = view3d.value || (view3d.value = {}));
            })(view3d = main.view3d || (main.view3d = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=View3dConst.js.map