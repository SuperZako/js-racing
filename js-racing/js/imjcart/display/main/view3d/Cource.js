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
                var Cource = (function (_super) {
                    __extends(Cource, _super);
                    function Cource(scene) {
                        var _this = _super.call(this) || this;
                        _this._scene = null;
                        _this._startline = null;
                        _this._carLine = null;
                        _this._base = null;
                        _this._grass = null;
                        _this._grassLT = null;
                        _this._grassLB = null;
                        _this._grassRT = null;
                        _this._grassRB = null;
                        _this._sand = null;
                        _this._tree = null;
                        _this._tire = null;
                        _this._wall = null;
                        _this._block = null;
                        _this._map = null;
                        _this._sandMap = null;
                        _this._grassMap = null;
                        _this._roadMap = null;
                        _this._goal = null;
                        _this._scene = scene;
                        //
                        _this._initGrassMap();
                        _this._initRoadMap();
                        _this._initSandMap();
                        //
                        _this._createBase();
                        _this._createRoadLine();
                        _this._createCarLine();
                        _this._createGrass();
                        _this._createGrassLT();
                        _this._createGrassLB();
                        _this._createGrassRT();
                        _this._createGrassRB();
                        _this._createStartline();
                        _this._createWall();
                        _this._createBlock();
                        _this._createTire();
                        _this._createTree();
                        _this._createSand();
                        _this._createSandLine();
                        _this._createSandLine2();
                        _this._createGoal();
                        return _this;
                    }
                    // 道路端の線を作るマップを作成
                    Cource.prototype._initRoadMap = function () {
                        this._map = imjcart.logic.map.value.MapConst.MAP.concat();
                        this._roadMap = [];
                        var i, j, max, max2;
                        for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                            var arr = [];
                            for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_GRASS
                                    || imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_TIRE
                                    || imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_TREE
                                    || imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_BLOCK
                                    || imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_WALL) {
                                    arr.push(null);
                                }
                                else {
                                    arr.push("C");
                                }
                            }
                            this._roadMap.push(arr);
                        }
                        for (i = 0, max = this._roadMap.length; i < max; i = i + 1) {
                            for (j = 0, max2 = this._roadMap[i].length; j < max2; j = j + 1) {
                                var current = this._roadMap[i][j] || null;
                                if (current != null) {
                                    var left = this._roadMap[i][j - 1] || null;
                                    var right = this._roadMap[i][j + 1] || null;
                                    var top = null;
                                    if (1 <= i) {
                                        top = this._roadMap[i - 1][j] || null;
                                    }
                                    var bottom = null;
                                    if (i <= max - 2) {
                                        bottom = this._roadMap[i + 1][j] || null;
                                    }
                                    if (left == null && right != null && top != null && bottom != null) {
                                        this._roadMap[i][j] = "L";
                                    }
                                    else if (left != null && right == null && top != null && bottom != null) {
                                        this._roadMap[i][j] = "R";
                                    }
                                    else if (left != null && right != null && top == null && bottom != null) {
                                        this._roadMap[i][j] = "T";
                                    }
                                    else if (left != null && right != null && top != null && bottom == null) {
                                        this._roadMap[i][j] = "B";
                                    }
                                }
                            }
                        }
                    };
                    // 芝生同士を斜めにつないで、芝生マップを作成
                    Cource.prototype._initGrassMap = function () {
                        this._map = imjcart.logic.map.value.MapConst.MAP.concat();
                        this._grassMap = [];
                        var i, j, max, max2;
                        for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                            var arr = [];
                            for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_GRASS
                                    || imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_TIRE
                                    || imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_TREE
                                    || imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_SAND) {
                                    arr.push("G");
                                }
                                else {
                                    arr.push(null);
                                }
                            }
                            this._grassMap.push(arr);
                        }
                        for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                            for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_GRASS) {
                                    // 左上
                                    if (imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_GRASS
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_TIRE
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_BLOCK
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_WALL
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_TREE) {
                                        if (this._grassMap[i - 1][j] == "LT" || this._grassMap[i - 1][j] == "RT" || this._grassMap[i - 1][j] == "RB") {
                                            this._grassMap[i - 1][j] = "G";
                                        }
                                        else if (this._grassMap[i - 1][j] != "G") {
                                            this._grassMap[i - 1][j] = "LB";
                                        }
                                        if (this._grassMap[i][j - 1] == "LT" || this._grassMap[i][j - 1] == "LB" || this._grassMap[i][j - 1] == "RB") {
                                            this._grassMap[i][j - 1] = "G";
                                        }
                                        else if (this._grassMap[i][j - 1] != "G") {
                                            this._grassMap[i][j - 1] = "RT";
                                        }
                                    }
                                    // 左下
                                    if (imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_GRASS
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_TIRE
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_BLOCK
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_WALL
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_TREE) {
                                        if (this._grassMap[i + 1][j] == "LB" || this._grassMap[i][j + 1] == "RT" || this._grassMap[i][j + 1] == "RB") {
                                            this._grassMap[i + 1][j] = "G";
                                        }
                                        else if (this._grassMap[i + 1][j] != "G") {
                                            this._grassMap[i + 1][j] = "LT";
                                        }
                                        if (this._grassMap[i][j - 1] == "LT" || this._grassMap[i][j - 1] == "LB" || this._grassMap[i][j - 1] == "RT") {
                                            this._grassMap[i][j - 1] = "G";
                                        }
                                        else if (this._grassMap[i][j - 1] != "G") {
                                            this._grassMap[i][j - 1] = "RB";
                                        }
                                    }
                                    // 右上
                                    if (imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_GRASS
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_TIRE
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_BLOCK
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_WALL
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_TREE) {
                                        if (this._grassMap[i][j + 1] == "LB" || this._grassMap[i][j + 1] == "LB" || this._grassMap[i][j + 1] == "RB") {
                                            this._grassMap[i][j + 1] = "G";
                                        }
                                        else if (this._grassMap[i][j + 1] != "G") {
                                            this._grassMap[i][j + 1] = "LT";
                                        }
                                        if (this._grassMap[i - 1][j] == "LB" || this._grassMap[i - 1][j] == "LB" || this._grassMap[i - 1][j] == "RT") {
                                            this._grassMap[i - 1][j] = "G";
                                        }
                                        else if (this._grassMap[i - 1][j] != "G") {
                                            this._grassMap[i - 1][j] = "RB";
                                        }
                                    }
                                    // 右下
                                    if (imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_GRASS
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_TIRE
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_BLOCK
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_WALL
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_TREE) {
                                        if (this._grassMap[i + 1][j] == "LT" || this._grassMap[i + 1][j] == "LB" || this._grassMap[i + 1][j] == "RB") {
                                            this._grassMap[i + 1][j] = "G";
                                        }
                                        else if (this._grassMap[i + 1][j] != "G") {
                                            this._grassMap[i + 1][j] = "RT";
                                        }
                                        if (this._grassMap[i][j + 1] == "LT" || this._grassMap[i][j + 1] == "RT" || this._grassMap[i][j + 1] == "RB") {
                                            this._grassMap[i][j + 1] = "G";
                                        }
                                        else if (this._grassMap[i][j + 1] != "G") {
                                            this._grassMap[i][j + 1] = "LB";
                                        }
                                    }
                                }
                            }
                        }
                    };
                    // 砂地同士を斜めにつないで、砂地マップを作成
                    Cource.prototype._initSandMap = function () {
                        this._map = imjcart.logic.map.value.MapConst.MAP.concat();
                        this._sandMap = [];
                        var i, j, max, max2;
                        for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                            var arr = [];
                            for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_SAND) {
                                    arr.push("S");
                                }
                                else {
                                    arr.push(null);
                                }
                            }
                            this._sandMap.push(arr);
                        }
                        for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                            for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_SAND) {
                                    // 左上
                                    if (imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_SAND
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_BLOCK
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_WALL) {
                                        if (this._sandMap[i - 1][j] == "LT" || this._sandMap[i - 1][j] == "RT" || this._sandMap[i - 1][j] == "RB") {
                                            this._sandMap[i - 1][j] = "S";
                                        }
                                        else if (this._sandMap[i - 1][j] != "S") {
                                            this._sandMap[i - 1][j] = "LB";
                                        }
                                        if (this._sandMap[i][j - 1] == "LT" || this._sandMap[i][j - 1] == "LB" || this._sandMap[i][j - 1] == "RB") {
                                            this._sandMap[i][j - 1] = "S";
                                        }
                                        else if (this._sandMap[i][j - 1] != "S") {
                                            this._sandMap[i][j - 1] = "RT";
                                        }
                                    }
                                    // 左下
                                    if (imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_SAND
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_BLOCK
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j - 1] == imjcart.logic.map.value.MapConst.MAP_KEY_WALL) {
                                        if (this._sandMap[i + 1][j] == "LB" || this._sandMap[i][j + 1] == "RT" || this._sandMap[i][j + 1] == "RB") {
                                            this._sandMap[i + 1][j] = "S";
                                        }
                                        else if (this._sandMap[i + 1][j] != "S") {
                                            this._sandMap[i + 1][j] = "LT";
                                        }
                                        if (this._sandMap[i][j - 1] == "LT" || this._sandMap[i][j - 1] == "LB" || this._sandMap[i][j - 1] == "RT") {
                                            this._sandMap[i][j - 1] = "S";
                                        }
                                        else if (this._sandMap[i][j - 1] != "S") {
                                            this._sandMap[i][j - 1] = "RB";
                                        }
                                    }
                                    // 右上
                                    if (imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_SAND
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_BLOCK
                                        || imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i - 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_WALL) {
                                        if (this._sandMap[i][j + 1] == "LB" || this._sandMap[i][j + 1] == "LB" || this._sandMap[i][j + 1] == "RB") {
                                            this._sandMap[i][j + 1] = "S";
                                        }
                                        else if (this._sandMap[i][j + 1] != "S") {
                                            this._sandMap[i][j + 1] = "LT";
                                        }
                                        if (this._sandMap[i - 1][j] == "LB" || this._sandMap[i - 1][j] == "LB" || this._sandMap[i - 1][j] == "RT") {
                                            this._sandMap[i - 1][j] = "S";
                                        }
                                        else if (this._sandMap[i - 1][j] != "S") {
                                            this._sandMap[i - 1][j] = "RB";
                                        }
                                    }
                                    // 右下
                                    if (imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_SAND
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_BLOCK
                                        || imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] && imjcart.logic.map.value.MapConst.MAP[i + 1][j + 1] == imjcart.logic.map.value.MapConst.MAP_KEY_WALL) {
                                        if (this._sandMap[i + 1][j] == "LT" || this._sandMap[i + 1][j] == "LB" || this._sandMap[i + 1][j] == "RB") {
                                            this._sandMap[i + 1][j] = "S";
                                        }
                                        else if (this._sandMap[i + 1][j] != "S") {
                                            this._sandMap[i + 1][j] = "RT";
                                        }
                                        if (this._sandMap[i][j + 1] == "LT" || this._sandMap[i][j + 1] == "RT" || this._sandMap[i][j + 1] == "RB") {
                                            this._sandMap[i][j + 1] = "S";
                                        }
                                        else if (this._sandMap[i][j + 1] != "S") {
                                            this._sandMap[i][j + 1] = "LB";
                                        }
                                    }
                                }
                            }
                        }
                    };
                    // コース土台
                    Cource.prototype._createBase = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/base.jpg");
                        //texture.minFilter = THREE.NearestFilter;
                        //texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = null;
                        if (imjcart.logic.value.Const.IS_BUMPMAP_ENABLED) {
                            material = new THREE.MeshPhongMaterial({
                                color: 0xffffff,
                                specular: 0x999999,
                                shininess: 10,
                                // ambient: imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR,
                                map: texture,
                                bumpMap: texture,
                                bumpScale: 0.1
                            });
                        }
                        else {
                            material = new THREE.MeshBasicMaterial({ map: texture });
                        }
                        var i, j, max, max2;
                        for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                            for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                mesh.position.set(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2), 0.2, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2));
                                THREE.GeometryUtils.merge(geometry, mesh);
                            }
                        }
                        this._base = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            this._base.receiveShadow = true;
                        }
                        this._scene.add(this._base);
                    };
                    // コースライン
                    Cource.prototype._createRoadLine = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/base2.png");
                        texture.minFilter = THREE.NearestFilter;
                        texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, blending: THREE.NormalBlending });
                        var i, j, max, max2;
                        for (i = 0, max = this._roadMap.length; i < max; i = i + 1) {
                            for (j = 0, max2 = this._roadMap[i].length; j < max2; j = j + 1) {
                                if (this._roadMap[i][j] != null && this._roadMap[i][j] != "C") {
                                    var tagX = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                    var tagY = 0.4;
                                    var tagZ = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                    mesh.position.set(tagX, tagY, tagZ);
                                    mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                    if (this._roadMap[i][j] == "L") {
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                    else if (this._roadMap[i][j] == "R") {
                                        mesh.rotation.z = imjcart.logic.utility.Util.getAngleByRotation(-180);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                    else if (this._roadMap[i][j] == "T") {
                                        mesh.rotation.z = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                    else if (this._roadMap[i][j] == "B") {
                                        mesh.rotation.z = imjcart.logic.utility.Util.getAngleByRotation(90);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                }
                            }
                        }
                        var mesh = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            mesh.receiveShadow = true;
                        }
                        this._scene.add(mesh);
                    };
                    // 車ライン
                    Cource.prototype._createCarLine = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/base3.png");
                        texture.minFilter = THREE.NearestFilter;
                        texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = null;
                        if (imjcart.logic.value.Const.IS_BUMPMAP_ENABLED) {
                            material = new THREE.MeshPhongMaterial({
                                color: 0xffffff,
                                specular: 0x999999,
                                shininess: 10,
                                // ambient: imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR,
                                map: texture,
                                bumpMap: texture,
                                bumpScale: 0.1,
                                transparent: true,
                                blending: THREE.NormalBlending
                            });
                        }
                        else {
                            material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, blending: THREE.NormalBlending });
                        }
                        var i, j, max, max2;
                        for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                            for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_CAR_START_POSITION) {
                                    var y = 0;
                                    var k = 0, max3;
                                    for (k = 0, max3 = 12; k < max3; k = k + 1) {
                                        var x = 0;
                                        if (k % 2) {
                                            x = 6;
                                        }
                                        else {
                                            x = 0;
                                        }
                                        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                        mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                        mesh.position.set(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * (j + x), 0.4, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * (i + y) - 4);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                        y = y + 2;
                                    }
                                }
                            }
                        }
                        this._carLine = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            this._carLine.receiveShadow = true;
                        }
                        this._scene.add(this._carLine);
                    };
                    // 芝生
                    Cource.prototype._createGrass = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/grass.jpg");
                        //texture.minFilter = THREE.NearestFilter;
                        //texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = new THREE.MeshBasicMaterial({ map: texture });
                        var i, j, max, max2;
                        for (i = 0, max = this._grassMap.length; i < max; i = i + 1) {
                            for (j = 0, max2 = this._grassMap[i].length; j < max2; j = j + 1) {
                                if (this._grassMap[i][j] == "G") {
                                    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                    mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                    mesh.position.set(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2), 0.6, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2));
                                    THREE.GeometryUtils.merge(geometry, mesh);
                                }
                            }
                        }
                        this._grass = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            this._grass.receiveShadow = true;
                        }
                        this._scene.add(this._grass);
                    };
                    // 芝生
                    Cource.prototype._createGrassLT = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/grassLT.png");
                        //texture.minFilter = THREE.NearestFilter;
                        //texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, blending: THREE.NormalBlending });
                        var i, j, max, max2;
                        for (i = 0, max = this._grassMap.length; i < max; i = i + 1) {
                            for (j = 0, max2 = this._grassMap[i].length; j < max2; j = j + 1) {
                                if (this._grassMap[i][j] == "LT") {
                                    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                    mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                    mesh.position.set(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2), 0.6, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2));
                                    THREE.GeometryUtils.merge(geometry, mesh);
                                }
                            }
                        }
                        this._grassLT = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            this._grassLT.receiveShadow = true;
                        }
                        this._scene.add(this._grassLT);
                    };
                    // 芝生
                    Cource.prototype._createGrassLB = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/grassLB.png");
                        //texture.minFilter = THREE.NearestFilter;
                        //texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, blending: THREE.NormalBlending });
                        var i, j, max, max2;
                        for (i = 0, max = this._grassMap.length; i < max; i = i + 1) {
                            for (j = 0, max2 = this._grassMap[i].length; j < max2; j = j + 1) {
                                if (this._grassMap[i][j] == "LB") {
                                    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                    mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                    mesh.position.set(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2), 0.6, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2));
                                    THREE.GeometryUtils.merge(geometry, mesh);
                                }
                            }
                        }
                        this._grassLB = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            this._grassLB.receiveShadow = true;
                        }
                        this._scene.add(this._grassLB);
                    };
                    // 芝生
                    Cource.prototype._createGrassRT = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/grassRT.png");
                        //texture.minFilter = THREE.NearestFilter;
                        //texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, blending: THREE.NormalBlending });
                        var i, j, max, max2;
                        for (i = 0, max = this._grassMap.length; i < max; i = i + 1) {
                            for (j = 0, max2 = this._grassMap[i].length; j < max2; j = j + 1) {
                                if (this._grassMap[i][j] == "RT") {
                                    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                    mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                    mesh.position.set(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2), 0.6, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2));
                                    THREE.GeometryUtils.merge(geometry, mesh);
                                }
                            }
                        }
                        this._grassRT = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            this._grassRT.receiveShadow = true;
                        }
                        this._scene.add(this._grassRT);
                    };
                    // 芝生
                    Cource.prototype._createGrassRB = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/grassRB.png");
                        //texture.minFilter = THREE.NearestFilter;
                        //texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, blending: THREE.NormalBlending });
                        var i, j, max, max2;
                        for (i = 0, max = this._grassMap.length; i < max; i = i + 1) {
                            for (j = 0, max2 = this._grassMap[i].length; j < max2; j = j + 1) {
                                if (this._grassMap[i][j] == "RB") {
                                    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                    mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                    mesh.position.set(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2), 0.6, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2));
                                    THREE.GeometryUtils.merge(geometry, mesh);
                                }
                            }
                        }
                        this._grassRB = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            this._grassRB.receiveShadow = true;
                        }
                        this._scene.add(this._grassRB);
                    };
                    // スタートライン
                    Cource.prototype._createStartline = function () {
                        var texture = THREE.ImageUtils.loadTexture("img/startline.png");
                        //texture.minFilter = THREE.NearestFilter;
                        //texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var geometry = new THREE.Geometry();
                        var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, blending: THREE.NormalBlending });
                        var i, j, max, max2;
                        for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                            for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_LAP_START_POINT) {
                                    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                    mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                    mesh.position.set(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2), 0.8, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2));
                                    THREE.GeometryUtils.merge(geometry, mesh);
                                }
                            }
                        }
                        this._startline = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            this._startline.receiveShadow = true;
                        }
                        this._scene.add(this._startline);
                    };
                    // 壁
                    Cource.prototype._createWall = function () {
                        var _this = this;
                        var geometry = new THREE.Geometry();
                        var meshArr = [];
                        var loader = new THREE.OBJMTLLoader();
                        loader.load("models/wall01/wall01.obj", "models/wall01/wall01.mtl", function (object) {
                            object.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                    //var texture = child.material.map;
                                    //child.material = new THREE.MeshPhongMaterial(child.material);
                                    child.material = new THREE.MeshLambertMaterial(child.material);
                                    var material = child.material;
                                    //child.material.shininess = 3;
                                    //child.material.bumpMap = texture;
                                    //child.material.bumpScale = 0.05;
                                    //child.castShadow = true;
                                    material.ambient = new THREE.Color(imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR);
                                    meshArr.push({
                                        mesh: child,
                                        material: child.material
                                    });
                                }
                            });
                            // 配置
                            var i, j, max, max2;
                            for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                                for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                    if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_WALL) {
                                        var tagX = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                        var tagY = 0.6;
                                        var tagZ = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                        var mesh = meshArr[1].mesh.clone();
                                        mesh.position.set(tagX, tagY, tagZ);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                }
                            }
                            _this._wall = new THREE.Mesh(geometry, meshArr[1].material);
                            if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                                _this._wall.castShadow = true;
                            }
                            _this._scene.add(_this._wall);
                        });
                    };
                    // ブロック
                    Cource.prototype._createBlock = function () {
                        var _this = this;
                        var geometry = new THREE.Geometry();
                        var meshArr = [];
                        var loader = new THREE.OBJMTLLoader();
                        loader.load("models/block03/block03.obj", "models/block03/block03.mtl", function (object) {
                            object.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                    //var texture = child.material.map;
                                    //child.material = new THREE.MeshPhongMaterial(child.material);
                                    child.material = new THREE.MeshLambertMaterial(child.material);
                                    var material = child.material;
                                    //child.material.shininess = 3;
                                    //child.material.bumpMap = texture;
                                    //child.material.bumpScale = 0.05;
                                    //child.castShadow = true;
                                    material.ambient = new THREE.Color(imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR);
                                    meshArr.push({
                                        mesh: child,
                                        material: child.material
                                    });
                                }
                            });
                            // 配置
                            var i, j, max, max2;
                            for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                                for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                    if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_BLOCK) {
                                        var tagX = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                        var tagY = 1;
                                        var tagZ = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                        var mesh = meshArr[1].mesh.clone();
                                        mesh.position.set(tagX, tagY, tagZ);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                }
                            }
                            _this._block = new THREE.Mesh(geometry, meshArr[1].material);
                            if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                                _this._block.castShadow = true;
                            }
                            _this._scene.add(_this._block);
                        });
                    };
                    // タイヤ
                    Cource.prototype._createTire = function () {
                        var _this = this;
                        var geometry = new THREE.Geometry();
                        var meshArr = [];
                        var loader = new THREE.OBJMTLLoader();
                        loader.load("models/tire02/tire02.obj", "models/tire02/tire02.mtl", function (object) {
                            object.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                    //var texture = child.material.map;
                                    //child.material = new THREE.MeshPhongMaterial(child.material);
                                    child.material = new THREE.MeshLambertMaterial(child.material);
                                    var material = child.material;
                                    //child.material.shininess = 3;
                                    //child.material.bumpMap = texture;
                                    //child.material.bumpScale = 0.05;
                                    //child.castShadow = true;
                                    material.ambient = new THREE.Color(imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR);
                                    meshArr.push({
                                        mesh: child,
                                        material: child.material
                                    });
                                }
                            });
                            // 配置
                            var i, j, max, max2;
                            for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                                for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                    if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_TIRE) {
                                        var tagX = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                        var tagY = 0.6;
                                        var tagZ = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                        var mesh = meshArr[1].mesh.clone();
                                        mesh.position.set(tagX, tagY, tagZ);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                }
                            }
                            _this._tire = new THREE.Mesh(geometry, meshArr[1].material);
                            if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                                _this._tire.castShadow = true;
                            }
                            _this._scene.add(_this._tire);
                        });
                    };
                    // 木
                    Cource.prototype._createTree = function () {
                        var _this = this;
                        var geometry = new THREE.Geometry();
                        var meshArr = [];
                        var loader = new THREE.OBJMTLLoader();
                        loader.load("models/tree02/tree02.obj", "models/tree02/tree02.mtl", function (object) {
                            object.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                    //var texture = child.material.map;
                                    //child.material = new THREE.MeshPhongMaterial(child.material);
                                    child.material = new THREE.MeshLambertMaterial(child.material);
                                    var material = child.material;
                                    //child.material.shininess = 3;
                                    //child.material.bumpMap = texture;
                                    //child.material.bumpScale = 0.05;
                                    //child.castShadow = true;
                                    material.ambient = new THREE.Color(imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR);
                                    meshArr.push({
                                        mesh: child,
                                        material: child.material
                                    });
                                }
                            });
                            // 配置
                            var i, j, max, max2;
                            for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                                for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                    if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_TREE) {
                                        var tagX = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                        var tagY = 0.6;
                                        var tagZ = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                        var mesh = meshArr[1].mesh.clone();
                                        mesh.position.set(tagX, tagY, tagZ);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                }
                            }
                            _this._tree = new THREE.Mesh(geometry, meshArr[1].material);
                            if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                                _this._tree.castShadow = true;
                            }
                            _this._scene.add(_this._tree);
                        });
                    };
                    // ゴール
                    Cource.prototype._createGoal = function () {
                        var _this = this;
                        var loader = new THREE.OBJMTLLoader();
                        loader.load("models/goal01/goal01.obj", "models/goal01/goal01.mtl", function (object) {
                            object.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                    var material = child.material;
                                    switch (child.material.name) {
                                        case "PostLeft":
                                            material.ambient = new THREE.Color(0x999999);
                                            material.color = new THREE.Color(0x999999);
                                            break;
                                        case "PostRight":
                                            material.ambient = new THREE.Color(0x999999);
                                            material.color = new THREE.Color(0x999999);
                                            break;
                                        case "Banner":
                                            material.ambient = new THREE.Color(0xffffff);
                                            material.color = new THREE.Color(0xffffff);
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
                            // 配置
                            var i, j, max, max2;
                            for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                                for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                    if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_LAP_START_POINT) {
                                        var tagX = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * (j - 2) + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                        var tagY = 0;
                                        var tagZ = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                        object.position.set(tagX, tagY, tagZ);
                                        _this._goal = object;
                                        _this._scene.add(_this._goal);
                                        break;
                                    }
                                }
                            }
                        });
                    };
                    // 砂地
                    Cource.prototype._createSand = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/sand.jpg");
                        //texture.minFilter = THREE.NearestFilter;
                        //texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = null;
                        if (imjcart.logic.value.Const.IS_BUMPMAP_ENABLED) {
                            material = new THREE.MeshPhongMaterial({
                                color: 0xffffff,
                                specular: 0x999999,
                                shininess: 10,
                                // ambient: imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR,
                                map: texture,
                                bumpMap: texture,
                                bumpScale: 0.1,
                                transparent: true,
                                blending: THREE.NormalBlending
                            });
                        }
                        else {
                            material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, blending: THREE.NormalBlending });
                        }
                        var i, j, max, max2;
                        for (i = 0, max = imjcart.logic.map.value.MapConst.MAP.length; i < max; i = i + 1) {
                            for (j = 0, max2 = imjcart.logic.map.value.MapConst.MAP[i].length; j < max2; j = j + 1) {
                                if (imjcart.logic.map.value.MapConst.MAP[i][j] == imjcart.logic.map.value.MapConst.MAP_KEY_SAND) {
                                    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                    mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                    mesh.position.set(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2), 0.8, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2));
                                    THREE.GeometryUtils.merge(geometry, mesh);
                                }
                            }
                        }
                        this._sand = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            this._sand.receiveShadow = true;
                        }
                        this._scene.add(this._sand);
                    };
                    // 砂地ライン
                    Cource.prototype._createSandLine = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/sand2.png");
                        //texture.minFilter = THREE.NearestFilter;
                        //texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = null;
                        if (imjcart.logic.value.Const.IS_BUMPMAP_ENABLED) {
                            material = new THREE.MeshPhongMaterial({
                                color: 0xffffff,
                                specular: 0x999999,
                                shininess: 10,
                                // ambient: imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR,
                                map: texture,
                                bumpMap: texture,
                                bumpScale: 0.1,
                                transparent: true,
                                blending: THREE.NormalBlending
                            });
                        }
                        else {
                            material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, blending: THREE.NormalBlending });
                        }
                        var i, j, max, max2;
                        for (i = 0, max = this._sandMap.length; i < max; i = i + 1) {
                            for (j = 0, max2 = this._sandMap[i].length; j < max2; j = j + 1) {
                                if (this._sandMap[i][j] != null && this._sandMap[i][j] != "S") {
                                    var tagX = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                    var tagY = 0.8;
                                    var tagZ = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                    mesh.position.set(tagX, tagY, tagZ);
                                    mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                    if (this._sandMap[i][j] == "LB") {
                                        mesh.rotation.z = imjcart.logic.utility.Util.getAngleByRotation(0);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                    else if (this._sandMap[i][j] == "RT") {
                                        mesh.rotation.z = imjcart.logic.utility.Util.getAngleByRotation(180);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                }
                            }
                        }
                        var mesh = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            mesh.receiveShadow = true;
                        }
                        this._scene.add(mesh);
                    };
                    // 砂地ライン
                    Cource.prototype._createSandLine2 = function () {
                        var geometry = new THREE.Geometry();
                        var texture = THREE.ImageUtils.loadTexture("img/sand3.png");
                        //texture.minFilter = THREE.NearestFilter;
                        //texture.magFilter = THREE.LinearMipMapLinearFilter;
                        var material = null;
                        if (imjcart.logic.value.Const.IS_BUMPMAP_ENABLED) {
                            material = new THREE.MeshPhongMaterial({
                                color: 0xffffff,
                                specular: 0x999999,
                                shininess: 10,
                                // ambient: imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR,
                                map: texture,
                                bumpMap: texture,
                                bumpScale: 0.1,
                                transparent: true,
                                blending: THREE.NormalBlending
                            });
                        }
                        else {
                            material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, blending: THREE.NormalBlending });
                        }
                        var i, j, max, max2;
                        for (i = 0, max = this._sandMap.length; i < max; i = i + 1) {
                            for (j = 0, max2 = this._sandMap[i].length; j < max2; j = j + 1) {
                                if (this._sandMap[i][j] != null && this._sandMap[i][j] != "S") {
                                    var tagX = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * j + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                    var tagY = 0.8;
                                    var tagZ = imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE * i + (imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE / 2);
                                    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, imjcart.logic.map.value.MapConst.MAP_BLOCK_SIZE, 1, 1), new THREE.MeshBasicMaterial());
                                    mesh.position.set(tagX, tagY, tagZ);
                                    mesh.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                    if (this._sandMap[i][j] == "LT") {
                                        mesh.rotation.z = imjcart.logic.utility.Util.getAngleByRotation(-90);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                    else if (this._sandMap[i][j] == "RB") {
                                        mesh.rotation.z = imjcart.logic.utility.Util.getAngleByRotation(90);
                                        THREE.GeometryUtils.merge(geometry, mesh);
                                    }
                                }
                            }
                        }
                        var mesh = new THREE.Mesh(geometry, material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            mesh.receiveShadow = true;
                        }
                        this._scene.add(mesh);
                    };
                    return Cource;
                }(lib.event.EventDispacher));
                view3d.Cource = Cource;
            })(view3d = main.view3d || (main.view3d = {}));
        })(main = display.main || (display.main = {}));
    })(display = imjcart.display || (imjcart.display = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=Cource.js.map