## my-bookstores

### 初始化项目 my-bookstores
```
$ vue init webpack-simple my-bookstores
```

### 运行项目
1.进入项目目录
```
$ cd my-bookstores
```
2.安装项目依赖
```
$ npm install
```
3.开启服务
```
$ npm run dev
```

### 安装第三方依赖
1.代码依赖
```
$ npm install bootstrap vue-router vue-resource -S
```
2.开发依赖
```
$ npm install style-loader body-parser -D
```

### 配置 webpack.config.js 文件
1.配置模块加载解析规则
```
   {
      test: /\.(png|jpg|gif|svg|eot|woff2|woff|ttf)$/,
      loader: 'file-loader',
      options: {
          name: '[name].[ext]?[hash]'
       }
   },
   {
       test: /\.css$/,
       loader: 'style-loader!css-loader'
   }
```
2.配置别名
```
resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'bootstrap$': 'bootstrap/dist/css/bootstrap.css'
        }
    },
```
3.配置express服务器
```
devServer: {
        historyApiFallback: true,
        noInfo: true,
        proxy: {
            '/books': 'http://127.0.0.1:7000'
        }
    },
```

### 入口js文件 main.js
1.需要引入的模块
```
import Vue from 'vue';// 引入vue框架
import App from './App.vue';// 引入App组件
import router from './router/router';// 导入路由配置
import 'bootstrap' // 引入bootstrap插件
import VueResource from 'vue-resource';// 引入vue-resource插件
```
2.使用vue-resource插件，与后端进行数据交互
```
Vue.use(VueResource); // 使用vue-resource插件，与后端进行数据交互
```
3.创建一个Vue根实例
```
new Vue({ // 创建一个根实例
    el: '#app', // 挂载元素
    render: h => h(App), //将组件App渲染到页面
    router, // 注入路由
});
```

### App.vue 组件
1.搭建 template 模板
```
<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
```
2.默认导出App.vue 组件
```
<script>
    import {Navbar} from './components'; // 导入Navbar组件
    export default { // 默认导出组件
        name: 'app',
        component: {
            Navbar
        }
    }
</script>
```

### 将components文件夹内的组件一次性导出 index.js
1.导入组件Navbar.vue, List.vue, Add.vue, Detail.vue
```
import Navbar from './Navbar.vue';
import List from './List.vue';
import Add from './Add.vue';
import Detail from './Detail.vue';
```
2.以解构赋值的方式导出所有组件
```
export {Navbar, List, Add, Detail};
```

### Navbar 组件
1.搭建 template 模板
```
<template>
    <div id="navbar">
        <div class="navbar navbar-default nav-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand">MY BOOKSTORES</a>
                </div>
                <ul class="navbar-nav nav">
                    <li class="active"><router-link to="/list">图书列表</router-link></li>
                    <li><router-link to="/add">添加图书</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>
```

### 配置路由 router.js
1.需要引入的模块
```
import Vue from 'vue'; // 引入vue框架
import VueRouter from 'vue-router'; // 引入vue-router插件
import {List, Add, Detail} from '../components'; // 以解构赋值的方式导入组件List,Add,Detail
```
2.使用vue-router插件
```
Vue.use(vueRouter);
```
3.创建路由表 routes
```
const routes = [
    {path: '/list', name: 'list', component: List},
    {path: '/add', name: 'add', component: Add},
    {path: '/detail/:id', name: 'detail', component: Detail},
    {path: '*', redirect: '/list'},
];
```
4.创建并默认导出路由
```
export default new VueRouter({routes});
```

### List.vue 组件
1.搭建 template 模板
```
<template>
    <div id="list">
        <div class="container">
            <h3>图书列表页</h3>
            <div class="col-sm-3" v-for="book in books">
                <div class="panel panel-warning text-center">
                    <div class="panel panel-heading">
                        书名：<span>{{book.bookName}}</span>
                    </div>
                    <div class="panel panel-heading">
                        <img :src="book.bookCover" alt="">
                    </div>
                    <div class="panel panel-heading">
                        价格：<span>{{book.bookPrice}}</span>
                        <!--<router-link :to="{name:'detail',params:{id:book.id}}">详情</router-link>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
```
2.默认导出 List.vue 组件
```
<script>
    export default {
        name: 'list',
        data(){
            return {books: null};
        },
        beforeMount(){
            this.$http.get('/books').then(res => {
                this.books = res.body;
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>
```
3.模板样式
```
<style>
    #list img {
        width: 150px;
        height: 180px;
    }
</style>
```

### Add.vue 组件 —— 书店图书添加页面
1.搭建 template 模板
```
<template>
    <div id="add">
        <h3>图书添加页</h3>
        <form>
            <div class="form-group">
                <label for="bookName">书名：</label>
                <input type="text" class="form-control" id="bookName" v-model="book.bookName">
            </div>
            <div class="form-group">
                <label for="bookCover">封面：</label>
                <input type="text" class="form-control" id="bookCover" v-model="book.bookCover">
            </div>
            <div class="form-group">
                <label for="bookPrice">价格：</label>
                <input type="text" class="form-control" id="bookPrice" v-model="book.bookPrice">
            </div>
            <button class="btn btn-primary" @click="add">确认添加</button>
        </form>
    </div>
</template>
```
2.默认导出 Add.vue 组件
```
<script>
    export default {
        name:'add',
        data(){
            return {book:{bookName:'',bookCover:'',bookPrice:''}};
        },
        methods:{
            add(){
                if(this.book.bookName&&this.book.bookCover&&this.book.bookPrice){
                    this.$http.post('/books',this.book).then(res=>{
                        this.$router.push('/list');
                    }).catch(err=>{
                        console.log(err);
                    });
                }else {
                    alert('请将图书信息填写完整！');
                }
            }
        }
    }
</script>
```

### Detail.vue 组件 —— 书店图书详情页面
1.搭建 template 模板
```
<template>
    <div id="detail">
        <h3>图书详情页</h3>
        <div class="panel panel-warning text-center">
            <div class="panel panel-heading">
                书名：<span  v-show="!flag">{{book.bookName}}</span>
                <input type="text" v-model="book.bookName"  v-show="flag">
            </div>
            <div class="panel panel-heading">
                <img :src="book.bookCover" alt="">
            </div>
            <div class="panel panel-heading">
                价格：<span v-show="!flag">{{book.bookPrice}}</span>
                <input type="text" v-model="book.bookPrice"  v-show="flag">
                <button type="button" class="btn btn-warning" v-show="!flag" @click="flag=true">修改</button>
                <button type="button" class="btn btn-primary" v-show="flag" @click="update">确认修改</button>
                <button type="button" class="btn btn-danger" v-show="!flag" @click="remove">删除</button>
            </div>
        </div>
    </div>
</template>
```
2.默认导出 Detail.vue 组件
```
<script>
    export default {
        name:'detail',
        data(){
            return {
                id:'',
                flag:false,
                book:{
                    bookName:'',
                    bookCover:'',
                    bookPrice:'',
                    id:''
                }
            }
        },
        beforeMount(){
            this.id = this.$route.params.id;
            this.$http.get('/books?id='+this.id).then(res=>{
                this.book = res.body;
            }).catch(err=>{
                console.log(err);
            });
        },
        methods:{
            remove(){
                this.$http.delete('/books?id='+this.book.id).then(res=>{
                    this.$router.push('/list')
                }).catch(err=>{
                   console.log(err);
                });
            },
            update(){
                this.$http.put('/books',this.book).then(res=>{
                    this.$router.push('/list')
                }).catch(err=>{
                    console.log(err);
                });
            }
        }
    }
</script>
```

### server.js(服务端)
1.需要引入的模块
```
let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
```
2.解析请求体
```
app.use(bodyParser.json());
```
3.封装读取数据的方法
```
let readBooks = function (callBack) {
    fs.readFile('./books.json', 'utf8', (err, data) => {
        if (err || data.length === 0) {
            return data = '[]';
        }
        callBack(JSON.parse(data));
    });
};
```
4.封装写入数据的方法
```
let writeBooks = function (data, callBack) {
    fs.writeFile('./books.json', JSON.stringify(data), callBack)
};
```
5.通过'GET'请求访问路径'/books'
```
app.get('/books', (req, res) => {
    let id = Number(req.query.id);
    if (id) {
        readBooks(books => {
            let book = books.find(function (item) {
                return item.id === id;
            });
            res.send(book);
        });
    } else {
        readBooks(books => {
            res.send(books);
        });
    }
});
```
6.通过'POST'请求访问路径'/books'
```
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
```
7.通过'DELETE'请求访问路径'/books'
```
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
```
8.通过'PUT'请求访问路径'/books'
```
app.put('/books', (req, res) => {
    let book = req.body;
    readBooks(books => {
        books = books.map(item => {
            if (item.id === book.id) {
                return book;
            }
            return item;
        });
        writeBooks(books, err => {
            res.send(book);
        });
    });
});
```
9.监听服务器端口
```
app.listen(7070, function () {
    console.log('监听7070端口');
});
```