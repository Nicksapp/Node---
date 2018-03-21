const superagent = require('superagent');
const cheerio = require('cheerio');

const config = require('./config'); // url 等配置

// 单页文本爬取
superagent.get(config.URL.DOUBAN_EXPLORE).end(function(err, res) {
    if (err) {
        throw Error(err);
    }
    const $ = cheerio.load(res.text); // 解析 get 到的 html 超文本

    let result = [];
    $('#gallery_main_frame .item').each(function(index, item) { // 20条今日精选
        const _this = $(item);
        result.push({
            author: {
                name: _this.find('.usr-pic a')[1] ? $(_this.find('.usr-pic a')[1]).text() : '',
                avatar: _this.find('.usr-pic a img').attr('src'),
            },
            image: _this.find('.pic a').attr('style') ? _this.find('.pic a').attr('style').match(/(http).*(jpg|png)/g)[0] : '',
            title: _this.find('.content .title a').text(),
            desc: _this.find('.content p a').text(),
            id: _this.attr('data-item_id'),
            pointUrl: _this.find('.pic a').attr('href'),
        })
    })
    console.log(JSON.stringify(result))
})