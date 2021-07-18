<template>
    <el-scrollbar wrap-class="scrollWrap"
                  :native="false"
                  id="content">
        <Nodata v-if="!ordered.length" />
        <ul class="orderBox"
            v-if="ordered.length">
            <li v-for="(table,tableIndex) in ordered"
                :key="table.table_id">
                <table>
                    <tbody>
                        <tr v-for="(dish,dishIndex) in table.order_items"
                            :key="dish.dish_id">
                            <td>{{dishIndex+1}}</td>
                            <td><img :src="'http://order-api.chenxuehui.com/'+dish.image"
                                     alt=""></td>
                            <td>{{dish.name}}</td>
                            <td>
                                <button @click="addOrDel(dish, -1, table.table_id)"><span class="iconfont">&#xe605;</span></button>
                                <span class="num">{{dish.num}}</span>
                                <button @click="addOrDel(dish, 1, table.table_id)"><span class="iconfont">&#xe603;</span></button>
                            </td>
                            <td>￥{{dish.price}} x {{dish.num}}</td>
                            <td>{{dish.remarks}}</td>
                            <td>
                                <button @click="select(dish, table.table_id)"
                                        class="select">
                                    <span v-if="dish.selected"
                                          class="iconfont">&#xe641;</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="foot">
                    <div>
                        <span>桌号：<strong>{{table.table_id}}</strong>号桌</span>
                        <span>人数：{{table.people_number}}</span>
                        <span>订单号：{{table.order_sn}}</span>
                        <button @click="addDishes(table.table_id)"
                                class="addDishes">添菜</button>
                    </div>
                    <div>
                        <span>总消费：￥<strong>{{totalPrice(tableIndex)}}</strong></span>
                        <button @click="submitOrder(table)"
                                class="pay">下单</button>
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
        ordered() {
            return this.$store.getters.getOrdered
        },
        totalPrice() {
            //计算总价
            return function (tableIndex) {
                let total = 0
                this.ordered[tableIndex].order_items.forEach(
                    (dish) => (total += dish.price * dish.num)
                )

                return total
            }
        },
        curTableId() {
            return this.$store.getters.getTables.cur_id
        },
    },
    components: {
        Nodata,
    },
    methods: {
        addOrDel(dish, num, table_id) {
            //加减菜
            dish.num += num
            dish.selected = true

            if (dish.num <= 0) {
                dish.num = 0
                dish.selected = false
            }

            //点菜
            this.orderDishes(dish, table_id)
        },
        orderDishes(dish, table_id) {
            //这里请求后不需要再发获取已点数据的请求
            this.$fetch({
                url: '/api/add_order_item',
                method: 'POST',
                data: {
                    table_id,
                    dish_id: dish.dish_id,
                    num: dish.num,
                    remarks: dish.remarks,
                    selected: dish.selected,
                },
            })
        },
        select(dish, table_id) {
            dish.selected = !dish.selected

            //点菜
            this.orderDishes(dish, table_id)
        },
        addDishes(table_id) {
            //添菜
            if (table_id != this.curTableId) {
                //当前点的桌子id与当前桌子id不一致
                this.$fetch({
                    url: '/api/choose_table',
                    method: 'POST',
                    data: {
                        table_id,
                    },
                }).then(() => this.$store.commit('updateCurId', table_id))
            }

            this.$router.push('/')
        },
        submitOrder(table) {
            //下单
            this.$fetch({
                url: '/api/submit_order',
                method: 'POST',
                data: {
                    order_id: table.order_id,
                },
            }).then(() => {
                // this.$store.commit('updateCurId',table_id)
                this.$getOrdered() //获取到已点的数据
                this.$getShopped() //获取到已下单的数据

                //如果下单的桌号与当前桌子的id一样，就删除当前桌子的id
                if (table.table_id == this.curTableId) {
                    this.$store.getters.getTables.cur_id = 0
                }
            })
        },
    },
}
</script>

<style scoped>
.addDishes {
    width: 50px;
    height: 25px;
    background: #a65335;
    border-radius: 5px;
    border: none;
}
.pay {
    width: 80px;
    height: 35px;
    background: #ff8400;
    font-style: 18px;
    border: none;
    border-radius: 5px;
}
</style>