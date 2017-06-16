/*使用express构建服务端*/
let express = require('express'); // 导入express模块
let app = express();// 创建一个express实例
let fs = require('fs'); // 导入fs模块
let bodyParser = require('body-parser'); // 导入中间件body-parser模块

app.use(bodyParser.json()); // 解析请求体

// 封装读取方法readBooks
let readBooks = function (callBack) {
    fs.readFile('./books.json', 'utf8', (err, data) => {
        if (err || data.length === 0) {
            data = '[]';
        }
        callBack(JSON.parse(data));
    });
};

// 封装写入方法
let writeBooks = function (data, callBack) {
    fs.writeFile('./books.json', JSON.stringify(data), callBack);
};

// 处理'GET'请求时的路径'/books' 的请求
app.get('/books', (req, res) => {
    let id = Number(req.query.id);//得到前端传递过来的id并转化为数字类型
    if (id) { // 如果有id（前端发送过来请求的数据）返回id那一条数据
        readBooks(books => {
            let book = books.find(function (item) {
                return item.id === id;
            });
            res.send(book);
        });
    } else { // 返回所有数据
        readBooks(function (books) {
            res.send(books);
        });
    }
});

// 处理'POST'请求时的路径'/books' 的请求
app.post('/books', (req, res) => {
    let book = req.body;
    readBooks(books => {
        book.id = books[books.length - 1].id + 1;
        books.push(book);
        writeBooks(books, err => {
            res.send(book);
        });
    });
});

// 处理'DELETE'请求时的路径'/books' 的请求
app.delete('/books', (req, res) => {
    let id = req.query.id;
    readBooks(books => {
        books = books.filter(item => {
            return item.id != id;
        });
        writeBooks(books, err => {
            res.send({});
        });
    });
});

// 处理'PUT'请求时的路径'/books' 的请求
app.put('/books', (req, res) => {
    readBooks(books => {
        books = books.map(item => {
            if (item.id == req.body.id) {
                return req.body;
            }
            return item;
        });
        writeBooks(books, err => {
            res.send(req.body);
        });
    });
});

app.listen(4000, function () {
    console.log('监听4000端口');
});