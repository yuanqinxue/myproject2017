<!--
<script src="../server/server.js"></script>
<template>
    &lt;!&ndash;图书详情页组件&ndash;&gt;
    <div id="detail">
        <h3>图书详情页</h3>
        <div class="panel panel-warning">
            <div class="panel-heading">
                书名：<span v-show="!flag">{{book.bookName}}</span>
                <input type="text" v-show="flag" v-model="book.bookName">
            </div>
            <div class="panel-body">
                <img :src="book.bookCover" alt="">
            </div>
            <div class="panel-footer">
                价格：<span v-show="!flag">{{book.bookPrice}}</span>
                <input type="text" v-show="flag" v-model="book.bookPrice">
                <button type="button" class="btn btn-danger" v-show="!flag" @click="remove">删除</button>
                <button type="button" class="btn btn-warning" v-show="!flag" @click="flag=true">修改</button>
                <button type="button" class="btn btn-primary" v-show="flag" @click="update">确认修改</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'detail',
        date(){
            return {
                id: null,
                book: {id: '', bookName: '', bookCover: '', bookPrice: ''},
                flag: false
            }
        },
        beforeMount(){
            this.id = this.$route.params.id;// 得到从列表页传递过来的id
            this.$http.get('/books?id=' + this.id).then(res => {
                this.book = res.body;
            }).catch(err => {
                console.log(err);
            });
        },
        methods: {
            update(){
                this.$http.put('/books', this.book).then(res => {
                    this.$router.push('/list');
                }).catch(err => {
                    console.log(err);
                });
            },
            remove(){
                this.$http.delete('/books?id=' + this.book.id).then(res => {
                    this.$router.push('/list');
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>

<style>

</style>-->


<template>
    <div id="detail">
        <h3>欢迎来到详情页</h3>
        <div class="panel panel-warning">
            <div class="panel-heading">
                书名：<span v-show="!flag">{{book.bookName}}</span>
                <input type="text" v-show="flag" v-model="book.bookName">
            </div>
            <div class="panel-body">
                <img :src="book.bookCover" alt="">
            </div>
            <div class="panel-footer">
                价格：<span v-show="!flag">{{book.bookPrice}}</span>
                <input type="text" v-show="flag" v-model="book.bookPrice">
                <button type="button" class="btn btn-danger" v-show="!flag" @click="remove">删除</button>
                <button type="button" class="btn btn-warning" v-show="!flag" @click="flag=true">修改</button>
                <button type="button" class="btn btn-primary" v-show="flag" @click="update">确认修改</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {id: null, book: {id: '',bookName:'',bookCover: '', bookPrice:''}, flag: false}
        },
        beforeMount() {
            this.id = this.$route.params.id; // 得到从列表页传递过来的id
            this.$http.get('/books?id='+this.id).then(res => {
                this.book = res.body;
            }).catch(err => {
                console.log(err);
            })
        },
        methods: {
            update() {
                this.$http.put('/books', this.book).then(res=>{
                    this.$router.push('/list');
                }).catch(err => {
                    console.log(err);
                })
            },
            remove() {
                this.$http.delete('/books?id='+this.book.id).then(res =>{
                    this.$router.push('/list');
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>