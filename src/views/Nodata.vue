<template>
    <div class="nodata">
        <span class="iconfont">&#xe613;</span>
        <span>暂无数据...</span>
    </div>
</template>
<script>
export default {}
</script>
<style>
.nodata {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;

    font-size: 20px;
    color: #fff;
}
.nodata span.iconfont {
    font-size: 200px;
    color: #ffc107;
    margin-bottom: 20px;
}
</style>