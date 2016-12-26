/// <reference path="../../../lib/jquery.d.ts"/>
/// <reference path="../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../lib/lib.ts"/>
var imjcart;
(function (imjcart) {
    var logic;
    (function (logic) {
        var value;
        (function (value) {
            var Const = (function () {
                function Const() {
                }
                return Const;
            }());
            //static IS_VIEW3D_DEBUG_MODE:boolean = true;
            Const.IS_VIEW3D_DEBUG_MODE = false;
            //static IS_PHYSICS_DEBUG_MODE:boolean = true;
            Const.IS_PHYSICS_DEBUG_MODE = false;
            Const.IS_SHADOW_ENABLED = false;
            //static IS_SHADOW_ENABLED:boolean = true;
            Const.IS_BUMPMAP_ENABLED = false;
            //static IS_BUMPMAP_ENABLED:boolean = true;
            Const.FPS = 30;
            Const.STAGE_WIDTH = 800;
            Const.STAGE_HEIGHT = 600;
            Const.ID_SCENE_OPENING = "id_scene_opening";
            Const.ID_SCENE_TIMEATACK = "id_scene_timeatack";
            Const.ID_SCENE_TIMEATACK_RUN = "id_scene_timeatack_run";
            //
            Const.COURSE_MAP_SCALE = 10; // コースマップのスケール
            Const.LAP_TIME_LIST_MAX = 5; // ラップタイムを最大いくつまで表示させるか
            //
            Const.SOCKET_EMIT_OTHER_CARS_CONDITION_FPS = 4; // 自車の情報送信と他車の情報受信のフレームレート
            //
            Const.CONTROLLER_URL = "http://js-racing.knockknock.jp:3000/controller.html";
            Const.BITLY_USERNAME = "knockknock0912";
            Const.BITLY_API_KEY = "R_41ed8c9ea9b83700a848aab57a379f86";
            // スマフォコントローラーのイベント
            Const.CONTROLLER_EVENT_KEY_PLAY = "play";
            Const.CONTROLLER_EVENT_KEY_START_ENGINE = "start_engine";
            Const.CONTROLLER_EVENT_KEY_STOP_ENGINE = "stop_engine";
            Const.CONTROLLER_EVENT_KEY_SET_STEERING_ANGLE = "set_steering_angle";
            Const.CONTROLLER_EVENT_KEY_CLEAR_STEERING_ANGLE = "clear_steering_angle";
            Const.CONTROLLER_EVENT_KEY_CHANGE_CAMERA_ANGLE = "change_camera_angle";
            // カラー変更箇所
            Const.ID_COLOR_BODY = "id_color_body";
            Const.ID_COLOR_WING = "id_color_wing";
            Const.ID_COLOR_DRIVER = "id_color_driver";
            Const.DEFAULT_BODY_COLOR = "#cc0000";
            Const.DEFAULT_WING_COLOR = "#ffffff";
            Const.DEFAULT_DRIVER_COLOR = "#ff6600";
            //
            Const.FOOTER_HEIGHT = 30; // フッターの高さ
            Const.RANKING_HEIGHT = 120; // ランキングの高さ
            //
            Const.TWEET_HASHTAG = "jsracing"; //
            Const.TWEET_URL = "http://js-racing.knockknock.jp"; //
            //
            Const.MAX_GHOST_COUNT = 5; // ゴーストを最大いくつ表示するか（10件中）
            value.Const = Const;
        })(value = logic.value || (logic.value = {}));
    })(logic = imjcart.logic || (imjcart.logic = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=Const.js.map