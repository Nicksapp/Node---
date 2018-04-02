const superagent = require('superagent');
const cheerio = require('cheerio');

const config = require('../config'); // url 等配置

superagent.get(config.URL.MOOC_LIST)
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36')
    .end(function(err, response) {
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
        console.log(result)
    })