/**
 * 参考@zmqcherish 的脚本
 * 删除发现页的轮播广告图(对比了广告和正常的数据，没有区别，所以直接删掉轮播图模块)
 * https://api.weibo.cn/2/search/finder
 *
 * 图片的链接有明显的区别（存在误杀，放弃）
 * 正常的图片url是这样的 "pic": "https://simg.s.weibo.com/ads/daka_1663682707.png",
 * 广告的图片url是这样的 "pic": "https://wx4.sinaimg.cn/large/0024cZx9ly8h6cvd7kzk9j60ji08ijty02.jpg",
 */

const url1 = '/search/finder';
const url2 = '/search/container_timeline';
const url3 = '/search/container_discover';

function modifyMain(url, data) {
    let dataModify = JSON.parse(data);
    // 首次点击发现按钮
    if (url.indexOf(url1) > -1) {
        if (dataModify.channelInfo && dataModify.channelInfo.channels
            && dataModify.channelInfo.channels[0].payload && dataModify.channelInfo.channels[0].payload.items) {
            dataModify.channelInfo.channels[0].payload.items[2] = {};
            console.log('进入发现页，移除轮播模块💕💕');
            return JSON.stringify(dataModify);
        }
    }

    // 发现页面刷新，再次点击发现按钮
    if (url.indexOf(url2) > -1 || url.indexOf(url3) > -1) {
        if (dataModify.items && dataModify.items[2]) {
            dataModify.items[2] = {};
            console.log('刷新发现页，移除轮播模块🤣🤣');
            return JSON.stringify(dataModify);
        }
    }

    console.log('没有广告数据🧧🧧');
    return data;
}

var body = $response.body;
var url = $request.url;

body = modifyMain(url, body);

$done({body});