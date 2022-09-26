/**
 * author@fmz200
 *
 * 1、更改养了个羊返回的地图
 * 抓包url：https://cat-match.easygame2021.com/sheep/v1/game/map_info_ex
 * 返回的数据：
 * {
 *   "err_code" : 0,
 *   "err_msg" : "",
 *   "data" : {
 *     "map_md5" : [
 *       "046ef1bab26e5b9bfe2473ded237b572",
 *       "d9d5f97bbf1c587b34da2120da77c22e"
 *     ],
 *     "map_seed" : [
 *       4232401885,
 *       132803809,
 *       1943796078,
 *       1076140864
 *     ],
 *     "map_seed_2" : "1665528879"  // 与2中的MapSeed2是一致的
 *   }
 * }
 *
 *
 * 2、养了个羊通关接口
 * 抓包url：https://cat-match.easygame2021.com/sheep/v1/game/game_over_ex
 * 请求的数据：
 * {
 *   "MatchPlayInfo" : "CAMiBAgMEAEiBAgOEAEiBAgNEAEiBAgAEAMiBAgJEAMiBAgPEAMiBAgCEAIiBAgBEAIiBAgKEAIiBAgLEAEiBAgQEAEiBAgFEAEiBAgEEAIiBAgHEAIiBAgREAIiBAgGEAMiBAgDEAMiBAgIEAM=",
 *   "Version" : "0.0.1", // 固定的
 *   "MapSeed2" : "1665500217", // 与1中的map_seed_2是一致的
 *   "skin" : 1, // 换装皮肤
 *   "rank_time" : 20, // 游戏时间 秒
 *   "rank_role" : 1, // 1未使用道具，2使用过道具
 *   "rank_state" : 1, // 1过关，2失败
 *   "rank_score" : 1 // 固定的
 * }
 *
 * 配置QX重写：在[rewrite_remote]下填写👇🏻配置
 * https://raw.githubusercontent.com/fmz200/jd_scripts/master/others/sheep/sheep.conf, tag=养了个羊更改地图@fmz200, update-interval=172800, opt-parser=false, enabled=true
 */

function modifyMain(url) {
    if (url.indexOf("map_info_ex") > -1) {
        let dataModify = JSON.parse($response.body);
        console.log('更改地图开始...');
        if (dataModify.data && dataModify.data.map_md5) {
            let map_md5_new = dataModify.data.map_md5;
            console.log('更改前的地图id为：' + map_md5_new);
            map_md5_new[1] = map_md5_new[0];
            console.log('更改后的地图id为：' + map_md5_new);
            dataModify.data.map_md5 = map_md5_new;
            console.log('更改地图结束...');
            return JSON.stringify(dataModify);
        }
        console.log('没有更改地图🧧🧧');
    }

    if (url.indexOf("game_over_ex") > -1) {
        let dataModify = JSON.parse($request.body);
        console.log('更改通关接口请求参数开始...');
        dataModify.rank_time = '1203'; // 通关时间 秒
        dataModify.rank_state = '1'; // 通关时间 秒
        console.log('更改后的数据为：' + dataModify);
        console.log('更改通关接口请求参数结束...');
        return JSON.stringify(dataModify);
    }

}

var url = $request.url;

body = modifyMain(url);

$done({body});