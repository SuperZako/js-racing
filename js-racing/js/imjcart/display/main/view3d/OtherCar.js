/// <reference path="../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../lib/lib.ts"/>
/// <reference path="../../../../imjcart/logic/utility/Util.ts"/>
/// <reference path="../../../../imjcart/logic/value/Const.ts"/>
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
                var OtherCar = (function (_super) {
                    __extends(OtherCar, _super);
                    function OtherCar(scene, id) {
                        var _this = _super.call(this) || this;
                        _this._scene = null;
                        _this._id = null;
                        _this._group = null;
                        _this._body = null;
                        _this._handle = null;
                        _this._driver = null;
                        _this._wheelFL = null;
                        _this._wheelFR = null;
                        _this._wheelBL = null;
                        _this._wheelBR = null;
                        _this._x = null;
                        _this._z = null;
                        _this._bodyAngle = null;
                        _this._wheelAngle = null;
                        _this._speed = null;
                        _this._lastX = null;
                        _this._lastZ = null;
                        _this._lastBodyAngle = null;
                        _this._lastWheelAngle = null;
                        _this._lastSpeed = null;
                        _this._subX = null;
                        _this._subZ = null;
                        _this._subBodyAngle = null;
                        _this._subWheelAngle = null;
                        _this._subSpeed = null;
                        _this._step = null;
                        _this._intervalId = null;
                        _this._scene = scene;
                        _this._id = id;
                        _this._createBody();
                        return _this;
                    }
                    Object.defineProperty(OtherCar.prototype, "id", {
                        get: function () {
                            return this._id;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    OtherCar.prototype.remove = function () {
                        this._scene.remove(this._group);
                        this._body = null;
                        this._wheelFL = null;
                        this._wheelFR = null;
                        this._wheelBL = null;
                        this._wheelBR = null;
                        this._group = null;
                        if (this._intervalId)
                            clearInterval(this._intervalId);
                    };
                    OtherCar.prototype._createBody = function () {
                        var _this = this;
                        var colorBody = null;
                        var colorWing = null;
                        var colorDriver = null;
                        var values = imjcart.logic.value.GlobalValue.getInstance();
                        var i = 0, max;
                        for (i = 0, max = values.otherCarInfoArr.length; i < max; i = i + 1) {
                            var info = values.otherCarInfoArr[i];
                            if (info.id == this._id) {
                                colorBody = info.colorBody;
                                colorWing = info.colorWing;
                                colorDriver = info.colorDriver;
                                break;
                            }
                        }
                        // 車
                        this._group = new THREE.Object3D();
                        this._group.position.set(0, 0.5, 0);
                        this._scene.add(this._group);
                        // ボディ
                        var loader = new THREE.OBJMTLLoader();
                        loader.load("models/car03/car03.obj", "models/car03/car03.mtl", function (object) {
                            object.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                    var material = child.material;
                                    switch (child.material.name) {
                                        case "Body":
                                            material.ambient = new THREE.Color(colorBody);
                                            material.color = new THREE.Color(colorBody);
                                            break;
                                        case "Wing":
                                            material.ambient = new THREE.Color(colorWing);
                                            material.color = new THREE.Color(colorWing);
                                            break;
                                        case "Chassis":
                                            material.ambient = new THREE.Color(0x111111);
                                            material.color = new THREE.Color(0x111111);
                                            break;
                                        case "Handle":
                                            material.ambient = new THREE.Color(0x333333);
                                            material.color = new THREE.Color(0x333333);
                                            break;
                                        default:
                                            material.ambient = new THREE.Color(imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR);
                                            break;
                                    }
                                    material.side = THREE.DoubleSide;
                                    material.specular = 0xffffff;
                                    material.shininess = 200;
                                    material.metal = true;
                                    //child.material = new THREE.MeshLambertMaterial(child.material);
                                    child.material = new THREE.MeshPhongMaterial(material);
                                    if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                                        child.castShadow = true;
                                    }
                                }
                            });
                            _this._body = object;
                            _this._group.add(_this._body);
                        });
                        // ドライバー
                        var loader = new THREE.OBJMTLLoader();
                        loader.load("models/car02/driver01.obj", "models/car02/driver01.mtl", function (object) {
                            object.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                    var material = child.material;
                                    switch (child.material.name) {
                                        case "DriverHead":
                                            material.ambient = new THREE.Color(colorDriver);
                                            material.color = new THREE.Color(colorDriver);
                                            break;
                                        case "DriverBody":
                                            material.ambient = new THREE.Color(colorDriver);
                                            material.color = new THREE.Color(colorDriver);
                                            break;
                                        default:
                                            material.ambient = new THREE.Color(imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR);
                                            break;
                                    }
                                    material.side = THREE.DoubleSide;
                                    child.material = new THREE.MeshLambertMaterial(material);
                                }
                            });
                            _this._driver = object;
                            _this._group.add(_this._driver);
                        });
                        // ハンドル
                        var loader = new THREE.OBJMTLLoader();
                        loader.load("models/car02/handle01.obj", "models/car02/handle01.mtl", function (object) {
                            object.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                    var material = child.material;
                                    switch (material.name) {
                                        case "Body":
                                            material.ambient = new THREE.Color(0x333333);
                                            material.color = new THREE.Color(0x333333);
                                            break;
                                        case "Screen":
                                            material.ambient = new THREE.Color(0x339999);
                                            material.color = new THREE.Color(0x339999);
                                            break;
                                        case "ButtonR":
                                            material.ambient = new THREE.Color(0xFF0000);
                                            material.color = new THREE.Color(0xFF0000);
                                            break;
                                        case "ButtonB":
                                            material.ambient = new THREE.Color(0x0000FF);
                                            material.color = new THREE.Color(0x0000FF);
                                            break;
                                        case "ButtonY":
                                            material.ambient = new THREE.Color(0xFFCC00);
                                            material.color = new THREE.Color(0xFFCC00);
                                            break;
                                        default:
                                            material.ambient = new THREE.Color(imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR);
                                            break;
                                    }
                                    material.side = THREE.DoubleSide;
                                    child.material = new THREE.MeshLambertMaterial(material);
                                }
                            });
                            _this._handle = object;
                            _this._handle.position.set(0, 2, -1.3);
                            _this._group.add(_this._handle);
                        });
                        // タイヤ
                        loader = new THREE.OBJMTLLoader();
                        loader.load("models/wheel01/wheel01.obj", "models/wheel01/wheel01.mtl", function (object) {
                            object.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                    var material = child.material;
                                    switch (material.name) {
                                        case "Wheel":
                                            material.ambient = new THREE.Color(0x333333);
                                            material.color = new THREE.Color(0x333333);
                                            break;
                                        case "Tire":
                                            material.ambient = new THREE.Color(0x000000);
                                            material.color = new THREE.Color(0x000000);
                                            break;
                                        default:
                                            material.ambient = new THREE.Color(imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR);
                                            break;
                                    }
                                    child.material.side = THREE.DoubleSide;
                                    child.material = new THREE.MeshLambertMaterial(child.material);
                                    if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                                        child.castShadow = true;
                                    }
                                }
                            });
                            _this._wheelFL = object.clone();
                            _this._wheelFL.position.set(2.6, 1, 3.5);
                            _this._group.add(_this._wheelFL);
                            //
                            _this._wheelFR = object.clone();
                            _this._wheelFR.position.set(-2.6, 1, 3.5);
                            _this._group.add(_this._wheelFR);
                            //
                            _this._wheelBL = object.clone();
                            _this._wheelBL.position.set(2.6, 1, -7);
                            _this._group.add(_this._wheelBL);
                            //
                            _this._wheelBR = object.clone();
                            _this._wheelBR.position.set(-2.6, 1, -7);
                            _this._group.add(_this._wheelBR);
                        });
                        // 受け取った姿勢をフレームレートで配分
                        this._intervalId = setInterval(function () {
                            _this._onSmoothPosture();
                        }, 1000 / imjcart.logic.value.Const.FPS);
                    };
                    Object.defineProperty(OtherCar.prototype, "group", {
                        get: function () {
                            return this._group;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    // 姿勢設定
                    OtherCar.prototype.setPosture = function (x, z, bodyAngle, wheelAngle, speed) {
                        bodyAngle = bodyAngle - (((wheelAngle - imjcart.logic.utility.Util.getAngleByRotation(90)) * 0.2) * speed);
                        wheelAngle = -wheelAngle + imjcart.logic.utility.Util.getAngleByRotation(90);
                        // 初回
                        if (this._x == null || this._z == null || this._bodyAngle == null || this._wheelAngle == null) {
                            this._x = x;
                            this._z = z;
                            this._bodyAngle = bodyAngle;
                            this._wheelAngle = wheelAngle;
                            this._speed = speed;
                        }
                        //
                        this._lastX = this._x;
                        this._lastZ = this._z;
                        this._lastBodyAngle = this._bodyAngle;
                        this._lastWheelAngle = this._wheelAngle;
                        this._lastSpeed = this._speed;
                        this._x = x;
                        this._z = z;
                        this._bodyAngle = bodyAngle;
                        this._wheelAngle = wheelAngle;
                        this._speed = speed;
                        // 差分抽出
                        this._subX = x - this._lastX;
                        this._subZ = z - this._lastZ;
                        this._subBodyAngle = bodyAngle - this._lastBodyAngle;
                        this._subWheelAngle = wheelAngle - this._lastWheelAngle;
                        this._subSpeed = speed - this._lastSpeed;
                        //
                        this._step = 0;
                    };
                    // 姿勢更新
                    OtherCar.prototype._onSmoothPosture = function () {
                        var parcent = (imjcart.logic.value.Const.SOCKET_EMIT_OTHER_CARS_CONDITION_FPS / imjcart.logic.value.Const.FPS) * this._step;
                        this._step = this._step + 1;
                        //
                        if (this._group) {
                            this._group.position.x = this._lastX + (this._subX * parcent);
                            this._group.position.z = this._lastZ + (this._subZ * parcent);
                            this._group.rotation.y = this._lastBodyAngle + (this._subBodyAngle * parcent);
                        }
                        if (this._wheelFL && this._wheelFR) {
                            this._wheelFL.rotation.y = this._lastWheelAngle + (this._subWheelAngle * parcent);
                            this._wheelFR.rotation.y = this._lastWheelAngle + (this._subWheelAngle * parcent);
                        }
                        if (this._body) {
                            // ボディの振動
                            this._body.position.y = (Math.random() * 0.005 * (this._lastSpeed + (this._subSpeed * parcent)));
                        }
                    };
                    return OtherCar;
                }(lib.event.EventDispacher));
                view3d.OtherCar = OtherCar;
            })(view3d = main.view3d || (main.view3d = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=OtherCar.js.map