/*利用vue-router路由请求数据*/
import Vue from 'vue';
import VueRouter from 'vue-router'; // 引入vue-router插件
import {List, Add, Detail} from '../components'; // 以解构赋值的形式导入组件

Vue.use(VueRouter); // 初始化vue-router插件

// 创建路由表
const routes = [
    {path: '/list', component: List},
    {path: '/add', component: Add},
    {path: '/detail/:id', name: 'detail', component: Detail},
    {path: '*', redirect: '/list'}
];

export default new VueRouter({routes});// 默认导出创建的router实例
