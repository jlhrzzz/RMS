<template>
    <div>
        <SubBar></SubBar>
        <router-view></router-view>
    </div>
</template>
<script>
import SubBar from '../../components/SubBar.vue'
export default {
    components: {
        SubBar,
    },

    // created() {
    //     this.$getCategory()
    // },
}
</script>
<style>
body {
    background: url(../../assets/images/productor_bg.jpg) no-repeat top;
    background-size: cover;
    background-attachment: fixed;
}

#content {
    position: fixed;
    top: 80px;
    right: 20px;
    bottom: 20px;
    left: 300px;
    background: rgba(255, 255, 255, 0.2);

    box-sizing: border-box;
    padding: 10px;

    overflow: hidden;
}

#navBar {
    position: fixed;
    left: 300px;
    right: 0;

    height: 80px;
    padding: 0 20px;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #fff;
}

/* 滚动条样式 */
.el-scrollbar {
    margin-right: -30px;
}
.scrollWrap {
    padding: 15px;
}
/* 滑块的父级 */
.el-scrollbar__bar.is-vertical {
    right: 15px;
}
.el-scrollbar__thumb {
    /* 滑块的透明度 */
    background-color: rgba(255, 255, 255, 0.5);
}
.el-scrollbar__thumb:hover {
    /* 滑块鼠标放上去的样式 */
    background-color: rgba(255, 255, 255, 0.5);
}
</style>