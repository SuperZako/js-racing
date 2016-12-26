/// <reference path="../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../lib/lib.ts"/>
var imjcart;
(function (imjcart) {
    var logic;
    (function (logic) {
        var controller;
        (function (controller) {
            var value;
            (function (value) {
                var ControllerConst = (function () {
                    function ControllerConst() {
                    }
                    return ControllerConst;
                }());
                ControllerConst.KEYCODE_UP = 38;
                ControllerConst.KEYCODE_DOWN = 40;
                ControllerConst.KEYCODE_LEFT = 37;
                ControllerConst.KEYCODE_RIGHT = 39;
                ControllerConst.KEYCODE_SPACE = 32;
                ControllerConst.KEYCODE_SHIFT = 16;
                ControllerConst.KEYCODE_W = 87;
                ControllerConst.KEYCODE_A = 65;
                ControllerConst.KEYCODE_S = 83;
                ControllerConst.KEYCODE_D = 68;
                value.ControllerConst = ControllerConst;
            })(value = controller.value || (controller.value = {}));
        })(controller = logic.controller || (logic.controller = {}));
    })(logic = imjcart.logic || (imjcart.logic = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=ControllerConst.js.map