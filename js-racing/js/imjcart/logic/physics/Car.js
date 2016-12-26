/// <reference path="../../../lib/jquery.d.ts"/>
/// <reference path="../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../lib/lib.ts"/>
/// <reference path="../../../imjcart/logic/physics/Box.ts"/>
/// <reference path="../../../imjcart/logic/physics/value/PhysicsConst.ts"/>
/// <reference path="../../../imjcart/logic/physics/event/PhysicsEvent.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var imjcart;
(function (imjcart) {
    var logic;
    (function (logic) {
        var physics;
        (function (physics) {
            var Car = (function (_super) {
                __extends(Car, _super);
                function Car(context, world, x, y) {
                    var _this = _super.call(this) || this;
                    _this._context = null;
                    _this._world = null;
                    _this._x = null;
                    _this._y = null;
                    _this._isOnEngine = false;
                    _this._enginePower = 0;
                    _this._engineDirection = 0;
                    _this._gear = 0;
                    _this._body = null;
                    _this._frontLeftWheel = null;
                    _this._frontRightWheel = null;
                    _this._rearLeftWheel = null;
                    _this._rearRightWheel = null;
                    _this._steeringAngle = 0;
                    _this._steerSpeed = 1;
                    _this._frontWheels = [];
                    _this._rearWheels = [];
                    _this._frontWheelJoints = [];
                    _this._intervalId = null;
                    _this._isLimitMode = false;
                    _this._limitGearVolume = null;
                    _this._context = context;
                    _this._world = world;
                    _this._x = x;
                    _this._y = y;
                    // 車体
                    var carWidth = 4;
                    var carHeight = 13;
                    var wheelWidth = 2;
                    var wheelHeight = 2;
                    _this._body = new physics.Box(_this._context, _this._world, _this._x, _this._y, carWidth, carHeight, {
                        linearDamping: physics.value.PhysicsConst.CAR_LINEAR_DAMPING,
                        angularDamping: physics.value.PhysicsConst.CAR_ANGULAR_DAMPING
                    }).body;
                    // フロントホイール
                    _this._frontLeftWheel = new physics.Box(_this._context, _this._world, _this._x - carWidth / 2, _this._y - carHeight / 3, wheelWidth, wheelHeight, {}).body;
                    _this._frontRightWheel = new physics.Box(_this._context, _this._world, _this._x + carWidth / 2, _this._y - carHeight / 3, wheelWidth, wheelHeight, {}).body;
                    _this._frontWheels.push(_this._frontLeftWheel);
                    _this._frontWheels.push(_this._frontRightWheel);
                    // リアホイール
                    _this._rearLeftWheel = new physics.Box(_this._context, _this._world, _this._x - carWidth / 2, _this._y + carHeight / 4, wheelWidth, wheelHeight, {}).body;
                    _this._rearRightWheel = new physics.Box(_this._context, _this._world, _this._x + carWidth / 2, _this._y + carHeight / 4, wheelWidth, wheelHeight, {}).body;
                    _this._rearWheels.push(_this._rearLeftWheel);
                    _this._rearWheels.push(_this._rearRightWheel);
                    // フロントホイールジョイント
                    var wheel = null;
                    var jointDef = null;
                    var i = 0, max;
                    for (i = 0, max = _this._frontWheels.length; i < max; i = i + 1) {
                        wheel = _this._frontWheels[i];
                        jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
                        jointDef.Initialize(_this._body, wheel, wheel.GetWorldCenter()); // つながれる2つの物体と，つなぐ位置（前輪の中央）を使って，定義を初期化する
                        jointDef.enableMotor = true; // 車輪を回すようにする
                        jointDef.maxMotorTorque = 100000; // トルクの設定（大きいほど坂道に強くなる）
                        jointDef.enableLimit = true; // 可動範囲設定
                        jointDef.lowerAngle = -1 * physics.value.PhysicsConst.MAX_STEER_ANGLE; // 可動範囲下限(m)
                        jointDef.upperAngle = physics.value.PhysicsConst.MAX_STEER_ANGLE; // 可動範囲上限(m)
                        _this._frontWheelJoints.push(_this._world.CreateJoint(jointDef));
                    }
                    // リアホイールジョイント
                    for (i = 0, max = _this._rearWheels.length; i < max; i = i + 1) {
                        wheel = _this._rearWheels[i];
                        jointDef = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
                        jointDef.Initialize(_this._body, wheel, wheel.GetWorldCenter(), new Box2D.Common.Math.b2Vec2(1, 0));
                        jointDef.enableLimit = true; // 可動範囲設定
                        jointDef.lowerTranslation = 0; // 可動範囲下限(m)
                        jointDef.upperTranslation = 0; // 可動範囲上限(m)
                        _this._world.CreateJoint(jointDef);
                    }
                    return _this;
                }
                Car.prototype.update = function () {
                    // 力
                    var i = 0, max;
                    for (i = 0, max = this._frontWheels.length; i < max; i = i + 1) {
                        var wheel = this._frontWheels[i];
                        var direction = wheel.GetTransform().R.col2.Copy();
                        direction.Multiply(this._enginePower);
                        wheel.ApplyForce(direction, wheel.GetPosition());
                    }
                    // 角度
                    for (i = 0, max = this._frontWheelJoints.length; i < max; i = i + 1) {
                        var wheelJoint = this._frontWheelJoints[i];
                        var angleDiff = this._steeringAngle - wheelJoint.GetJointAngle();
                        wheelJoint.SetMotorSpeed(angleDiff * this._steerSpeed);
                    }
                    // 車の状態変更イベント
                    var position = this._body.GetPosition();
                    var velocity = this._body.GetLinearVelocity();
                    var speedX = Math.abs(velocity.x);
                    var speedY = Math.abs(velocity.y);
                    var speed = 0;
                    if (speedX < speedY) {
                        speed = speedY;
                    }
                    else {
                        speed = speedX;
                    }
                    this.dispatchEvent(imjcart.logic.physics.event.PhysicsEvent.CHANGE_CAR_CONDITION_EVENT, {
                        x: position.x,
                        y: position.y,
                        bodyAngle: this._body.GetAngle(),
                        wheelAngle: this._frontWheelJoints[0].GetJointAngle(),
                        //speed: Math.abs(this._body.GetLinearVelocity().x) + Math.abs(this._body.GetLinearVelocity().y),
                        speed: speed,
                        power: this._enginePower,
                        gear: this._gear,
                        direction: this._engineDirection
                    });
                };
                Car.prototype.startEngine = function (value) {
                    var _this = this;
                    if (this._engineDirection != value)
                        this._gear = 0; // 前進、後退が変わったらギアを初期化
                    this._engineDirection = value;
                    if (!this._isOnEngine) {
                        this._isOnEngine = true;
                        if (this._intervalId)
                            clearInterval(this._intervalId);
                        this._intervalId = setInterval(function () {
                            _this._shiftUp();
                        }, imjcart.logic.physics.value.PhysicsConst.CAR_SHIFTUP_SPEED);
                        this._shiftUp();
                    }
                };
                Car.prototype.stopEngine = function () {
                    var _this = this;
                    if (this._isOnEngine) {
                        this._isOnEngine = false;
                        if (this._intervalId)
                            clearInterval(this._intervalId);
                        this._intervalId = setInterval(function () {
                            _this._shiftDown();
                        }, physics.value.PhysicsConst.CAR_SHIFTDOWN_SPEED);
                        this._shiftDown();
                    }
                };
                Car.prototype.setSteeringAngle = function (value) {
                    this._steeringAngle = -value;
                    this._steerSpeed = 1;
                };
                Car.prototype.clearSteeringAngle = function () {
                    this._steeringAngle = 0;
                    this._steerSpeed = 8;
                };
                Car.prototype._shiftUp = function () {
                    if (this._isLimitMode) {
                        this._gear += 1;
                        if (this._limitGearVolume <= this._gear) {
                            this._gear = this._limitGearVolume;
                        }
                    }
                    else {
                        this._gear += 1;
                        if (1 <= this._engineDirection) {
                            if (physics.value.PhysicsConst.CAR_GEAR_MAX <= this._gear) {
                                this._gear = physics.value.PhysicsConst.CAR_GEAR_MAX;
                            }
                        }
                        else {
                            if (physics.value.PhysicsConst.CAR_GEAR_BACK_MAX <= this._gear) {
                                this._gear = physics.value.PhysicsConst.CAR_GEAR_BACK_MAX;
                            }
                        }
                    }
                    if (0 < this._engineDirection) {
                        this._enginePower = -this._gear * physics.value.PhysicsConst.FORWARD_ENGINE_SPEED * this._engineDirection;
                    }
                    else {
                        this._enginePower = -this._gear * physics.value.PhysicsConst.BACK_ENGINE_SPEED * this._engineDirection;
                    }
                };
                Car.prototype._shiftDown = function () {
                    var gear = this._gear - 1;
                    if (0 <= gear) {
                        this._gear = gear;
                    }
                    if (0 < this._engineDirection) {
                        this._enginePower = -this._gear * physics.value.PhysicsConst.FORWARD_ENGINE_SPEED * this._engineDirection;
                    }
                    else {
                        this._enginePower = -this._gear * physics.value.PhysicsConst.BACK_ENGINE_SPEED * this._engineDirection;
                    }
                };
                // スピードに制限をかける
                Car.prototype.setLimitSpeed = function () {
                    this._isLimitMode = true;
                    this._limitGearVolume = Math.floor(this._gear * 0.6);
                    if (this._limitGearVolume <= 100)
                        this._limitGearVolume = 100;
                    this._gear = this._limitGearVolume;
                    this._shiftUp();
                };
                // スピードの制限をはずす
                Car.prototype.clearLimitSpeed = function () {
                    this._isLimitMode = false;
                    this._shiftUp();
                };
                // 削除
                Car.prototype.remove = function () {
                    this._world.DestroyBody(this._body);
                    this._world.DestroyBody(this._frontLeftWheel);
                    this._world.DestroyBody(this._frontRightWheel);
                    this._world.DestroyBody(this._rearLeftWheel);
                    this._world.DestroyBody(this._rearRightWheel);
                };
                return Car;
            }(lib.event.EventDispacher));
            physics.Car = Car;
        })(physics = logic.physics || (logic.physics = {}));
    })(logic = imjcart.logic || (imjcart.logic = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=Car.js.map