/**
 * author@fmz200
 * 更改养了个羊返回的地图
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
 *     "map_seed_2" : "1665528879"
 *   }
 * }
 *
 * 配置QX重写：在[rewrite_remote]下填写👇🏻配置
 * https://raw.githubusercontent.com/fmz200/jd_scripts/master/others/sheep/sheep.conf, tag=养了个羊更改地图@fmz200, update-interval=172800, opt-parser=false, enabled=true
 */

function modifyMain(data) {
    let dataModify = JSON.parse(data);
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
    console.log('没有更改地图，方法结束🧧🧧');
}

var body = $response.body;
body = modifyMain(body);

$done({body});