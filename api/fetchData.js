const superagent = require('superagent');
const cheerio = require('cheerio');

const config = require('../config'); // url 等配置

var fetchData = {};

// 单页文本爬取
fetchData.douHomeMain = function (req, res) {
    return superagent
        .get(config.URL.DOUBAN_EXPLORE)
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36')
        .end(function(err, response) {
        if (err) {
            console.log(err)
        }
        const $ = cheerio.load(response.text); // 解析 get 到的 html 超文本

        var result = [];
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
        res.send(JSON.stringify(result)) 
    })
}

fetchData.getMooc = function (req, res) {
    const page = req.query.page || 1;
    
    return superagent.get(config.URL.MOOC_LIST + '?page=' + page)
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36')
        .end(function (err, response) {
            if (err) {
                throw Error(err);
            }
            const $ = cheerio.load(response.text);

            var result = [];
            $('.moco-course-list .course-card-container').each(function (index, item) {
                const _this = $(item);

                result.push({
                    href: 'https://www.imooc.com' + _this.find('.course-card').attr('href'),
                    image: _this.find('.course-banner').attr('src'),
                    tag: [].slice.call(_this.find('.course-label label')).reduce(function (pre, main) { return pre.concat($(main).text()) }, []),
                    title: _this.find('.course-card-name').text(),
                    level: _this.find('.course-card-info span')[0] ? $(_this.find('.course-card-info span')[0]).text() : '',
                    people_num: _this.find('.course-card-info span')[1] ? $(_this.find('.course-card-info span')[1]).text() : '',
                    dsc: _this.find('.course-card-desc').text()
                })
            })
            res.send(JSON.stringify(result)) 
        })
}

module.exports = fetchData;
