<template>
    <!--图书列表组件-->
    <div id="list">
        <h3>图书列表页</h3>
        <div class="col-md-3" v-for="book in books">
            <div class="panel panel-warning">
                <div class="panel-heading  text-center">
                    书名：<span>{{book.bookName}}</span>
                </div>
                <div class="panel-body  text-center">
                    <img :src="book.bookCover" alt="">
                </div>
                <div class="panel-footer">
                    价格：<span>{{book.bookPrice}}</span>
                    <router-link class="pull-right" :to="{name:'detail',params:{id:book.id}}">详情</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default { // 默认导出组件
        name: 'list',
        data(){ // 数据
            return {books: null}
        },
        beforeMount(){ // 组件挂载前请求数据
            // GET请求
            this.$http.get('/books').then(res => {
                this.books = res.body;
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>

<style lang="css" scoped>
    #list img {
        width: 150px;
        height: 180px;
    }
</style> 