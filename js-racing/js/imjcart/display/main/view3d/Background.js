/// <reference path="../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../lib/lib.ts"/>
/// <reference path="../../../../imjcart/logic/map/value/MapConst.ts"/>
/// <reference path="../../../../imjcart/logic/utility/Util.ts"/>
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
                var Background = (function (_super) {
                    __extends(Background, _super);
                    function Background(scene) {
                        var _this = _super.call(this) || this;
                        _this._scene = null;
                        _this._field = null;
                        _this._sky = null;
                        _this._scene = scene;
                        //
                        _this._createField();
                        _this._createSky();
                        return _this;
                    }
                    Background.prototype._createField = function () {
                        var geometry = new THREE.CircleGeometry(2500, 30);
                        var texture = THREE.ImageUtils.loadTexture("img/field.jpg");
                        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                        texture.repeat.set(500, 500);
                        var material = new THREE.MeshBasicMaterial({ map: texture });
                        this._field = new THREE.Mesh(geometry, material);
                        this._field.position.set(imjcart.logic.map.value.MapConst.MAP_CENTER_X, 0, imjcart.logic.map.value.MapConst.MAP_CENTER_Z);
                        this._field.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                        this._scene.add(this._field);
                    };
                    Background.prototype._createSky = function () {
                        var geometry = new THREE.CylinderGeometry(2500, 2500, 750, 30, 1, true);
                        var texture = THREE.ImageUtils.loadTexture("img/sky.jpg");
                        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                        texture.repeat.set(5, 1);
                        var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
                        this._sky = new THREE.Mesh(geometry, material);
                        this._sky.position.set(imjcart.logic.map.value.MapConst.MAP_CENTER_X, 375, imjcart.logic.map.value.MapConst.MAP_CENTER_Z);
                        this._scene.add(this._sky);
                    };
                    return Background;
                }(lib.event.EventDispacher));
                view3d.Background = Background;
            })(view3d = main.view3d || (main.view3d = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=Background.js.map