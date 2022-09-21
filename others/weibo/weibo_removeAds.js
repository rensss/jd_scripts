/**
 * 参考@zmqcherish的脚本
 * 删除发现页的轮播广告图
 * https://api.weibo.cn/2/search/finder
 *
 * 图片的链接有明显的区别
 * 正常的图片url是这样的 "pic": "https://simg.s.weibo.com/ads/daka_1663682707.png",
 * 广告的图片url是这样的 "pic": "https://wx4.sinaimg.cn/large/0024cZx9ly8h6cvd7kzk9j60ji08ijty02.jpg",
 */

function modifyMain(data) {
    let dataModify = JSON.parse(data);
    if (dataModify.channelInfo.channels[0].payload.items[2]) {
        dataModify.channelInfo.channels[0].payload.items[2] = {};
        return JSON.stringify(dataModify);
    } else {
        return data;
    }
}

var body = $response.body;

body = modifyMain(body);

$done({body});