/// <reference path="../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../lib/lib.ts"/>
/// <reference path="../../../../imjcart/logic/utility/Util.ts"/>


declare namespace THREE {
    export var OBJMTLLoader: any;
};

module imjcart.display.main.view3d {


    export class Car extends lib.event.EventDispacher {

        private _scene: THREE.Scene = null;
        private _group: THREE.Object3D = null;
        private _body: THREE.Mesh = null;
        private _handle: THREE.Mesh = null;
        private _driver: THREE.Mesh = null;
        private _wheelFL: THREE.Mesh = null;
        private _wheelFR: THREE.Mesh = null;
        private _wheelBL: THREE.Mesh = null;
        private _wheelBR: THREE.Mesh = null;
        private _isShowDriver: boolean = true;

        constructor(scene: THREE.Scene) {
            super();
            this._scene = scene;
        }

        public createBody(colors) {
            var bodyColor = colors.body || 0x990000;
            var windColor = colors.wing || 0xFFFFFF;
            var driverHeadColor = colors.driverHead || 0xFFCC00;
            var driverBodyColor = colors.driverBody || 0xFFFFFF;
            // 車
            this._group = new THREE.Object3D();
            this._group.position.set(0, 0.3, 0);
            this._scene.add(this._group);
            // ボディ
            var loader = new THREE.OBJMTLLoader();
            //loader.load("models/car02/car02.obj", "models/car02/car02.mtl", (object) => {
            loader.load("models/car03/car03.obj", "models/car03/car03.mtl", (object) => {
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let material = <any>child.material;
                        switch (child.material.name) {
                            case "Body":
                                material.ambient = new THREE.Color(bodyColor);
                                material.color = new THREE.Color(bodyColor);
                                break;
                            case "Wing":
                                material.ambient = new THREE.Color(windColor);
                                material.color = new THREE.Color(windColor);
                                break;
                            case "Chassis":
                                material.ambient = new THREE.Color(0x111111);
                                material.color = new THREE.Color(0x111111);
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
                this._body = object;
                this._group.add(this._body);
            });
            // ドライバー
            var loader = new THREE.OBJMTLLoader();
            loader.load("models/car02/driver01.obj", "models/car02/driver01.mtl", (object) => {
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let material = <any>child.material;
                        switch (child.material.name) {
                            case "DriverHead":
                                material.ambient = new THREE.Color(driverHeadColor);
                                material.color = new THREE.Color(driverHeadColor);
                                break;
                            case "DriverBody":
                                material.ambient = new THREE.Color(driverBodyColor);
                                material.color = new THREE.Color(driverBodyColor);
                                break;
                            default:
                                material.ambient = new THREE.Color(imjcart.display.main.view3d.value.View3dConst.AMBIENT_COLOR);
                                break;
                        }
                        child.material.side = THREE.DoubleSide;
                        child.material = new THREE.MeshLambertMaterial(child.material);
                    }
                });
                this._driver = object;
                this._group.add(this._driver);
            });
            // ハンドル
            var loader = new THREE.OBJMTLLoader();
            loader.load("models/car02/handle01.obj", "models/car02/handle01.mtl", (object) => {
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let material = <any>child.material;
                        switch (child.material.name) {
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
                        child.material.side = THREE.DoubleSide;
                        child.material = new THREE.MeshLambertMaterial(child.material);
                    }
                });
                this._handle = object;
                this._handle.position.set(0, 2, -1.3);
                this._group.add(this._handle);
            });
            // タイヤ
            loader = new THREE.OBJMTLLoader();
            loader.load("models/wheel01/wheel01.obj", "models/wheel01/wheel01.mtl", (object) => {
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let material = <any>child.material;
                        switch (child.material.name) {
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
                        material.side = THREE.DoubleSide;
                        child.material = new THREE.MeshLambertMaterial(material);
                        if (imjcart.logic.value.Const.IS_SHADOW_ENABLED) {
                            child.castShadow = true;
                        }
                    }
                });
                this._wheelFL = object.clone();
                this._wheelFL.position.set(2.6, 1, 3.5);
                this._group.add(this._wheelFL);
                //
                this._wheelFR = object.clone();
                this._wheelFR.position.set(-2.6, 1, 3.5);
                this._group.add(this._wheelFR);
                //
                this._wheelBL = object.clone();
                this._wheelBL.position.set(2.6, 1, -7);
                this._group.add(this._wheelBL);
                //
                this._wheelBR = object.clone();
                this._wheelBR.position.set(-2.6, 1, -7);
                this._group.add(this._wheelBR);
            });
        }

        public get group(): THREE.Object3D {
            return this._group;
        }

        // 姿勢設定
        public setPosture(x: number, z: number, bodyAngle: number, wheelAngle: number, speed: number): void {
            if (!this._group) return;
            this._group.position.x = x;
            this._group.position.z = z;
            this._group.rotation.y = bodyAngle - (((wheelAngle - imjcart.logic.utility.Util.getAngleByRotation(90)) * 0.2) * speed);
            if (this._wheelFL && this._wheelFL.rotation) this._wheelFL.rotation.y = -wheelAngle + imjcart.logic.utility.Util.getAngleByRotation(90);
            if (this._wheelFR && this._wheelFR.rotation) this._wheelFR.rotation.y = -wheelAngle + imjcart.logic.utility.Util.getAngleByRotation(90);
            this._handle.rotation.x = imjcart.logic.utility.Util.getAngleByRotation(180);
            this._handle.rotation.z = -wheelAngle + imjcart.logic.utility.Util.getAngleByRotation(-90);
            // ボディの振動
            this._body.position.y = (Math.random() * 0.005 * speed);
        }

        // ドライバー表示
        public showDriver(): void {
            if (!this._group) return;
            if (this._isShowDriver) return;
            this._isShowDriver = true;
            this._group.add(this._driver);
        }

        // ドライバー非表示
        public hideDriver(): void {
            if (!this._group) return;
            if (!this._isShowDriver) return;
            this._isShowDriver = false;
            this._group.remove(this._driver);
        }

    }

}