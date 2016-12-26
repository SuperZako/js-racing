/// <reference path="../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../lib/lib.ts"/>
var imjcart;
(function (imjcart) {
    var logic;
    (function (logic) {
        var physics;
        (function (physics) {
            var value;
            (function (value) {
                var PhysicsConst = (function () {
                    function PhysicsConst() {
                    }
                    return PhysicsConst;
                }());
                PhysicsConst.MAX_STEER_ANGLE = Math.PI / 8; // タイヤの最大角度
                //static FORWARD_ENGINE_SPEED:number = 0.001; // 最高速
                PhysicsConst.FORWARD_ENGINE_SPEED = 0.00001; // 最高速
                //static BACK_ENGINE_SPEED:number = 0.0005; // 最高速
                PhysicsConst.BACK_ENGINE_SPEED = 0.000005; // 最高速
                PhysicsConst.CAR_LINEAR_DAMPING = 2; // 小さいほど直線速度の減衰が小さくなる
                //static CAR_LINEAR_DAMPING:number = 50; // 小さいほど直線速度の減衰が小さくなる
                PhysicsConst.CAR_ANGULAR_DAMPING = 30; // 小さいほど角速度の減衰が小さくなる
                //static CAR_GEAR_MAX:number = 11; // ギアの最大値
                PhysicsConst.CAR_GEAR_MAX = 1100; // ギアの最大値
                PhysicsConst.CAR_GEAR_BACK_MAX = 200; // ギアの最大値
                PhysicsConst.CAR_SHIFTUP_SPEED = 6; // シフトアップのスピード
                PhysicsConst.CAR_SHIFTDOWN_SPEED = 2; // シフトダウンのスピード
                value.PhysicsConst = PhysicsConst;
            })(value = physics.value || (physics.value = {}));
        })(physics = logic.physics || (logic.physics = {}));
    })(logic = imjcart.logic || (imjcart.logic = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=PhysicsConst.js.map