<template>
    <div class="search">
        <input type="text"
               v-model="keywords"
               @keyup.enter="search">
        <button @click="search">
            <span class="iconfont">&#xe63e;</span>
        </button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keywords: '',
        }
    },
    computed: {
        categoryId() {
            return this.$store.getters.getFoodList.curCategoryId
        },
    },
    methods: {
        search() {
            this.$fetch({
                url: '/api/dish_lists',
                data: {
                    keywords: this.keywords,
                    category_id: this.categoryId,
                },
            }).then((res) => {
                this.$store.commit('updateFoodList', res) //更新状态里的数据
                // console.log(res)
                this.keywords = '' //清空搜索框
            })
        },
    },
}
</script>
<style scoped>
.search {
    width: 300px;
    height: 30px;
    box-sizing: border-box;
    display: flex;
    border: 1px solid #fff;
    border-radius: 50px;
}
.search input {
    background: none;
    border: none;
    width: 270px;
    font-size: 16px;
    color: #fff;
    padding-left: 15px;
}
.search button {
    width: 30px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>