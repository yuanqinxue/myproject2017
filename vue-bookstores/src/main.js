/*入口文件*/
import Vue from 'vue';// 引入vue框架
import App from './App.vue';// 导入App组件
import 'bootstrap';// 导入bootstrap插件
import router from './router/router';// 导入路由配置
import VueResource from 'vue-resource';// 导入vue-resource插件（用于与后端数据交互）

Vue.use(VueResource);// 初始化vue-resource插件

new Vue({// 创建Vue根实例
    el: '#app', // 指定挂载元素
    render: h => h(App), // 给绑定app节点渲染组件App
    router // 注入路由
});
