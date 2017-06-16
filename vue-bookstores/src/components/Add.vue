<template>
    <!--图书添加页组件-->
    <div id="add">
        <h3>图书添加页</h3>
        <form>
            <div class="form-group">
                <label for="bookName" class="control-label">书名</label>
                <input type="text" class="form-control" id="bookName" v-model="book.bookName">
            </div>
            <div class="form-group">
                <label for="bookCover" class="control-label">封面</label>
                <input type="text" class="form-control" id="bookCover" v-model="book.bookCover">
            </div>
            <div class="form-group">
                <label for="bookPrice" class="control-label">价格</label>
                <input type="text" class="form-control" id="bookPrice" v-model="book.bookPrice">
            </div>
            <button class="btn btn-primary" @click="add">确认添加</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'add',
        data(){
            return {book: {bookName: '', bookCover: '', bookPrice: ''}}
        },
        methods: {
            add(){
                if (this.book.bookName && this.book.bookCover && this.book.bookPrice) {
                    this.$http.post('/books', this.book).then(res => {
                        this.$router.push('/list')
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    alert('请强图书信息填写完整！')
                }
            }
        }
    }
</script>

<style>

</style> 