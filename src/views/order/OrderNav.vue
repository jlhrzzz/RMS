<template>
    <ul class="navWrap">
        <router-link to="/order/ordered"
                     tag="li">
            <span class="iconfont">&#xe70e;</span>
            <span class="text">已点</span>
        </router-link>
        <router-link to="/order/shopped"
                     tag="li">
            <span class="iconfont">&#xe621;</span>
            <span class="text">已下单</span>
        </router-link>
    </ul>
</template>
<script>
export default {}
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
.navWrap li.active {
    color: #f9d163;
}
.navWrap li span.iconfont {
    font-size: 26px;
    margin-right: 5px;
}
</style>