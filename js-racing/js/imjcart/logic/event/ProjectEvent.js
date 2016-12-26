/// <reference path="../../../lib/jquery.d.ts"/>
/// <reference path="../../../lib/box2dweb.d.ts"/>
/// <reference path="../../../lib/lib.ts"/>
var imjcart;
(function (imjcart) {
    var logic;
    (function (logic) {
        var event;
        (function (event) {
            var ProjectEvent = (function () {
                function ProjectEvent() {
                }
                return ProjectEvent;
            }());
            ProjectEvent.CHANGE_SCENE_EVENT = "change_scene_event"; // シーン変更イベント
            ProjectEvent.CHANGE_TIMEATACK_SCENE_EVENT = "change_timeatack_scene_event"; // タイムアタックシーン変更イベント
            ProjectEvent.RENDER_CAR_EVENT = "render_car_event"; // 車の描画更新イベント
            ProjectEvent.CHANGE_CAMERA_ANGLE_EVENT = "change_camera_angle_event"; // カメラアングル変更イベント
            ProjectEvent.ADD_OTHER_CAR_EVENT = "add_other_car_event"; // 他の車追加イベント
            ProjectEvent.REMOVE_OTHER_CAR_EVENT = "remove_other_car_event"; // 他の車削除イベント
            ProjectEvent.RENDER_OTHER_CAR_EVENT = "render_other_car_event"; // 他の車の描画更新イベント
            ProjectEvent.EMIT_ID_FROM_SERVER_EVENT = "emit_id_from_server_event"; // サーバーからソケットIDを取得したイベント
            ProjectEvent.CONTROLLER_START_EVENT = "controller_start_event"; // コントローラー、開始イベント
            ProjectEvent.CONTROLLER_ERROR_EVENT = "controller_error_event"; // コントローラー、エラー表示イベント
            ProjectEvent.CHANGE_COLOR_EVENT = "change_color_event"; // カラー変更イベント
            ProjectEvent.SET_NAME_EVENT = "set_name_event"; // 名前設定イベント
            ProjectEvent.SET_FASTEST_LAP_EVENT = "set_fastest_lap_event"; // ファステストラップ設定
            ProjectEvent.PAUSE_TIMEATTACK_EVENT = "pause_timeattack_event"; // タイムアタック一時停止イベント
            ProjectEvent.RESUME_TIMEATTACK_EVENT = "resume_timeattack_event"; // タイムアタック再開イベント
            ProjectEvent.RETRY_TIMEATTACK_EVENT = "retry_timeattack_event"; // タイムアタックリトライイベント
            ProjectEvent.SAVE_LAPTIME_EVENT = "save_laptime_event"; // ラップタイム保存イベント
            ProjectEvent.COMPLETE_SAVE_LAPTIME_EVENT = "complete_save_laptime_event"; // ラップタイム保存完了イベント
            ProjectEvent.GET_RANKING_FROM_CLIENT_EVENT = "get_ranking_from_client_event"; // ランキングデータリクエストイベント
            ProjectEvent.GET_RANKING_FROM_SERVER_EVENT = "get_ranking_from_server_event"; // ランキングデータ受信イベント
            event.ProjectEvent = ProjectEvent;
        })(event = logic.event || (logic.event = {}));
    })(logic = imjcart.logic || (imjcart.logic = {}));
})(imjcart || (imjcart = {}));
//# sourceMappingURL=ProjectEvent.js.map