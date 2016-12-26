/// <reference path="../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../lib/lib.ts"/>
var imjcart;
(function (imjcart) {
    var logic;
    (function (logic) {
        var controller;
        (function (controller) {
            var event;
            (function (event) {
                var ControllerEvent = (function () {
                    function ControllerEvent() {
                    }
                    return ControllerEvent;
                }());
                ControllerEvent.START_ENGINE_EVENT = "start_engine_event";
                ControllerEvent.STOP_ENGINE_EVENT = "stop_engine_event";
                ControllerEvent.SET_STEERING_ANGLE_EVENT = "set_steering_angle_event";
                ControllerEvent.CLEAR_STEERING_ANGLE_EVENT = "clear_steering_angle_event";
                ControllerEvent.CHANGE_CAMERA_ANGLE_EVENT = "change_camera_angle_event";
                event.ControllerEvent = ControllerEvent;
            })(event = controller.event || (controller.event = {}));
        })(controller = logic.controller || (logic.controller = {}));
    })(logic = imjcart.logic || (imjcart.logic = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=ControllerEvent.js.map