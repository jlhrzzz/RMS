<template>
    <el-scrollbar wrap-class="scrollWrap"
                  :native="false"
                  id="content">
        <Nodata v-if="!shopped.length" />
        <ul class="orderBox shopped"
            v-if="shopped.length">
            <li v-for="(table) in shopped"
                :key="table.table_id">
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>菜品名称</th>
                            <th>价格/数量</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dish, dishIndex) in table.order_items"
                            :key="dish.dish_id">
                            <td>{{dishIndex+1}}</td>
                            <td>
                                <img :src="'http://order-api.chenxuehui.com/'+dish.image"
                                     alt="">
                                <span>{{dish.name}}</span>
                            </td>
                            <td>￥{{dish.price}} x {{dish.num}}</td>
                            <td>{{dish.status?'已上菜':'待上菜'}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="foot">
                    <div>
                        <span>桌号：<strong>{{table.table_id}}</strong>号桌</span>
                        <span>人数：{{table.people_number}}</span>
                        <span>订单号：{{table.order_sn}}</span>
                        <span>下单时间：{{table.paytime}}</span>
                    </div>
                    <div>
                        <span>总消费：￥<strong>{{table.amount}}</strong></span>
                    </div>
                </div>
            </li>
        </ul>
    </el-scrollbar>
</template>
<script>
import Nodata from '../Nodata'

export default {
    computed: {
        shopped() {
            return this.$store.getters.getShopped
        },
    },
    components: {
        Nodata,
    },
}
</script>
<style scoped>
.shopped li {
    padding: 0;
}
.shopped th {
    height: 60px;
    background: rgba(255, 255, 255, 0.25);
    color: #fff;
    text-align: center;
    font-weight: normal;
}
.shopped td:nth-child(2) {
    width: 25%;
    text-align: left;
    padding-left: 60px;
}
.shopped img {
    margin-right: 10px;
    vertical-align: middle;
}
.shopped td:nth-child(4) {
    font-size: 16px;
}
.shopped .foot {
    padding: 15px 20px;
}
</style>