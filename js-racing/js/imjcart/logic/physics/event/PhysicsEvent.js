/// <reference path="../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../lib/lib.ts"/>
var imjcart;
(function (imjcart) {
    var logic;
    (function (logic) {
        var physics;
        (function (physics) {
            var event;
            (function (event) {
                var PhysicsEvent = (function () {
                    function PhysicsEvent() {
                    }
                    return PhysicsEvent;
                }());
                PhysicsEvent.CHANGE_CAR_CONDITION_EVENT = "change_car_condition_event";
                event.PhysicsEvent = PhysicsEvent;
            })(event = physics.event || (physics.event = {}));
        })(physics = logic.physics || (logic.physics = {}));
    })(logic = imjcart.logic || (imjcart.logic = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=PhysicsEvent.js.map