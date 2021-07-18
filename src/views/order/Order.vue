<template>
    <div>
        <div id="navBar">
            <OrderNav></OrderNav>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import OrderNav from './OrderNav.vue'

export default {
    components: {
        OrderNav,
    },
}
</script>

<style>
.orderBox {
    width: 95%;
    margin: 0 auto;
    padding-top: 20px;
}
.orderBox li {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 40px;
    padding: 20px;
}
.orderBox img {
    width: 80px;
    height: 80px;
}
.orderBox table {
    width: 100%;
}
.orderBox tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
.orderBox td {
    padding: 10px 0;
    text-align: center;
    color: #fff;
}
.orderBox td:nth-child(1) {
    width: 5%;
}
.orderBox td:nth-child(6) {
    width: 20%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.orderBox button {
    width: 30px;
    height: 30px;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.5);
    vertical-align: middle;
}
.orderBox button span {
    font-size: 12px;
}
.orderBox button select span {
    font-size: 20px;
}
.orderBox .num {
    width: 60px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    box-sizing: border-box;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    font-size: 12px;
    vertical-align: middle;
}
.orderBox td:nth-child(4) {
    font-size: 0;
}

.orderBox .foot {
    display: flex;
    justify-content: space-between;
    padding: 15px 10px 0;
    color: #fff;
}
.orderBox .foot span {
    margin-right: 40px;
}
.orderBox .foot strong {
    color: #ffcb4e;
    font-size: 20px;
}
</style>