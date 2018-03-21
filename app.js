const domain = require('domain');
const express = require('express');
// const bodyParser = require('body-parser');
const AV = require('leancloud-storage');
const app = express();

const apiRouter = require('./api');

// 使用 LeanEngine 中间件
// app.use(AV.express());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// 未处理异常捕获 middleware
// app.use((req, res, next) => {
//     var d = domain.create();
//     d.add(req);
//     d.add(res);
//     d.on('error', (err) => {
//         console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err);
//         if (!res.finished) {
//             res.statusCode = 500;
//             res.setHeader('content-type', 'application/json; charset=UTF-8');
//             res.end('uncaughtException');
//         }
//     });
//     d.run(next);
// });
// api配置
app.use('/api', apiRouter);

app.use(express.static('public'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

module.exports = app;