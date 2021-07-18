<template >
    <div id="admin">
        <div class="left">
            <img src="../../assets/images/logo.png"
                 alt="">
            <ul>
                <router-link to="/"
                             tag="li">
                    <span class="iconfont">&#xe600;</span>首页
                </router-link>
                <router-link to="/admin/category"
                             tag="li">
                    <span class="iconfont">&#xe606;</span>分类
                </router-link>
                <router-link to="/admin/dish"
                             tag="li">
                    <span class="iconfont">&#xee58;</span>菜品
                </router-link>
                <router-link to="/admin/table"
                             tag="li">
                    <span class="iconfont">&#xe617;</span>餐桌
                </router-link>
            </ul>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {}
</script>
<style >
.left {
    width: 300px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: #3f3f3f;
}
.left img {
    width: 80%;
    display: block;
    margin: 50px auto;
}
.left li {
    font-size: 16px;
    color: #fff;
    line-height: 60px;
    padding-left: 30px;
    border-bottom: 1px solid #2b2b2b;
    cursor: pointer;
}
.left li span {
    margin-right: 20px;
}
.left li.active,
.left li:hover {
    background: #2b2b2b;
}

.right {
    min-height: 100vh;
    background: #e0e3e8;
    box-sizing: border-box;
    padding: 40px 20px;
    /* margin-left: ; */
    margin-left: 300px;
}
</style>