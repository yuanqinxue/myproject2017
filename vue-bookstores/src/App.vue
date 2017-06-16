<template>
    <!--入口文件组件App-->
    <div id="app">
        <!--导航条组件-->
        <Navbar></Navbar>
        <!--书店内容部分-->
        <div class="container">
            <!--渲染路径匹配到的视图组件-->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {Navbar} from './components';// 引入Navber组件
    export default {// 默认导出
        name:'app',
        components:{// 注册Navber组件
            Navbar
        }
    }
</script>

<style>

</style>