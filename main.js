const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.set('views', path.join(__dirname, 'view')); // 两个设置
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static'))); // 静态资源
const connection = mysql.createConnection({ // 建立数据库进行连接
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '521587',
    database: 'hushien',
    insecureAuth: true
});
connection.connect(err => {
    if (err) {
        throw err;
    }
});
// 获取详情ye
app.get('/detail', (req, res) => {
    res.end(require('fs').readFileSync(path.join(__dirname, 'view', 'detail.html')));
});
// 渲染列表页
app.get('/lis', (req, res) => {
    connection.query('select * from yk', (err, result) => {
        console.log(result);
        if (err) {
            throw err;
        } else {
            res.render('list', {
                data: result
            });
        }
    });
});
// post请求ID跳转到详情页
app.post('/ls', (req, res) => {
    connection.query('select * from yk where id=?', [req.body.id], (err, result) => {
        res.send(JSON.stringify(result));
    });
});
app.listen(8080);
