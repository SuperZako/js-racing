/// <reference path="../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../lib/lib.ts"/>
/// <reference path="../../../../imjcart/logic/map/value/MapConst.ts"/>
/// <reference path="../../../../imjcart/logic/utility/Util.ts"/>
/// <reference path="../../../../imjcart/display/main/view3d/value/View3dConst.ts"/>
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
            var view3d;
            (function (view3d) {
                var Icon = (function (_super) {
                    __extends(Icon, _super);
                    function Icon(scene) {
                        var _this = _super.call(this) || this;
                        _this._scene = null;
                        _this._icon = null;
                        _this._angle = view3d.value.View3dConst.CAMERA_ANGLE_DEFAULT;
                        _this._mode = null;
                        _this._scene = scene;
                        return _this;
                        //
                        //this._createIcon();
                    }
                    Icon.prototype._createIcon = function () {
                        var geometry = new THREE.PlaneGeometry(2, 2);
                        var texture = THREE.ImageUtils.loadTexture("img/icon.png");
                        var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, });
                        this._icon = new THREE.Mesh(geometry, material);
                        //this._scene.add(this._icon);
                    };
                    Object.defineProperty(Icon.prototype, "mode", {
                        // カメラモード
                        set: function (value) {
                            this._mode = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Icon.prototype, "angle", {
                        // カメラアングル
                        set: function (value) {
                            this._angle = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    // 姿勢変更
                    Icon.prototype.setPosture = function (x, z, bodyAngle) {
                        return;
                        //if (this._mode == value.View3dConst.CAMERA_MODE_TIMEATACK_RUN) {
                        //    if (this._angle == value.View3dConst.CAMERA_ANGLE_TOP) {
                        //        this._icon.position.x = x + (39 * Math.sin(bodyAngle));
                        //        this._icon.position.y = 250;
                        //        this._icon.position.z = z + (39 * Math.cos(bodyAngle));
                        //        this._icon.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                        //        this._icon.rotation.y = 0;
                        //        this._icon.rotation.z = bodyAngle - imjcart.logic.utility.Util.getAngleByRotation(180);
                        //    } else if (this._angle == value.View3dConst.CAMERA_ANGLE_BACK) {
                        //        this._icon.position.x = x;
                        //        this._icon.position.y = 5;
                        //        this._icon.position.z = z;
                        //        this._icon.rotation.y = bodyAngle - imjcart.logic.utility.Util.getAngleByRotation(180);
                        //        this._icon.rotation.x = 0;
                        //        this._icon.rotation.z = 0;
                        //    }
                        //}
                    };
                    return Icon;
                }(lib.event.EventDispacher));
                view3d.Icon = Icon;
            })(view3d = main.view3d || (main.view3d = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=Icon.js.map