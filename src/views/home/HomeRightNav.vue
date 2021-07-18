<template>
    <ul class="navWrap">
        <li :class="{active:0==cur}"
            @click="showFood()">
            <span class="iconfont">&#xe618;</span>
            <span class="text">推荐</span>
        </li>
        <li v-for="(nav,index) in navs"
            :key="nav.id"
            :class="{active:index + 1 == cur}"
            @click="showFood(index+1,nav.id)">
            <span class="iconfont"
                  v-html="nav.icon"></span>
            <span class="text">{{nav.name}}</span>
        </li>
    </ul>
</template>
<script>
export default {
    data() {
        return {
            cur: 0,
        }
    },
    mounted() {
        this.$getCategory()
        this.showFood()
    },
    computed: {
        navs() {
            return this.$store.getters.getCategory
        },
    },
    methods: {
        showFood(index = 0, id = 0) {
            // console.log(index)
            this.cur = index //选项卡

            this.getFood({ category_id: id }) //请求当前的id
        },
        getFood(data) {
            this.$fetch({
                url: '/api/dish_lists',
                data,
            }).then((res) => {
                //这里是请求成功后要执行的代码，需要把数据更新到状态里
                this.$set(res, 'curCategoryId', data ? data.category_id : 0) //更新数据，如果传了数据就读取数据里的
                //category_id，如果没有传输数据就表示推荐调用了，传
                this.$store.commit('updateFoodList', res)
            })
        },
    },
}
</script>
<style scoped>
.navWrap {
    display: flex;
}
.navWrap li {
    font-size: 24px;
    margin-right: 40px;
    cursor: pointer;
}

.navWrap li:hover,
.navWrap li.active {
    color: #f9d163;
}
.navWrap li span.iconfont {
    font-size: 26px;
    margin-right: 5px;
}
</style>