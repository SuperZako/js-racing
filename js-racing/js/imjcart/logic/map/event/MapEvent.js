/// <reference path="../../../../lib/jquery.d.ts"/>
/// <reference path="../../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../../lib/lib.ts"/>
var imjcart;
(function (imjcart) {
    var logic;
    (function (logic) {
        var map;
        (function (map) {
            var event;
            (function (event) {
                var MapEvent = (function () {
                    function MapEvent() {
                    }
                    return MapEvent;
                }());
                MapEvent.START_LAP_EVENT = "start_lap_event";
                MapEvent.RECORD_LAPTIME_EVENT = "record_laptime_event";
                MapEvent.IN_GRASS_EVENT = "into_grass_event";
                MapEvent.OUT_GRASS_EVENT = "out_grass_event";
                event.MapEvent = MapEvent;
            })(event = map.event || (map.event = {}));
        })(map = logic.map || (logic.map = {}));
    })(logic = imjcart.logic || (imjcart.logic = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=MapEvent.js.map