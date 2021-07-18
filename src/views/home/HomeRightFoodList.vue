<template>
    <div>
        <Nodata v-if="!foodList.length" />
        <ul class="foodList">
            <li v-for="food in foodList"
                :key="food.dish_id">
                <img :src="'http://order-api.chenxuehui.com/'+food.image"
                     alt=""
                     @click="showDetail(food)">
                <span v-if="food.recommend"
                      class="iconfont recommend">&#xe60b;</span>
                <div class="bar">
                    <h3>{{food.name}}</h3>
                    <p>
                        <span class="rmb">RMB</span>
                        <span class="price">{{food.price}}/份</span>
                        <button @click="showFoodAttr(food)"><span class="iconfont">&#xe603;</span></button>
                    </p>
                </div>
            </li>
        </ul>

        <Detailed v-if="detailedShow"
                  @closeDetailed='detailedShow=false'
                  :food="curFood" />

        <el-dialog :title="curFood.name"
                   :visible.sync="dialogVisible"
                   :modal-append-to-body="false"
                   width="30%"
                   top="30vh"
                   custom-class="attrDialog">
            <div class="dishHead">
                <div class="title">
                    <p class="price">￥<strong>{{curFood.price}}</strong></p>
                    <p class="star">
                        <el-rate v-model="curFood.stars"
                                 disabled
                                 text-color="#ff9900"></el-rate>
                    </p>
                </div>
                <div class="control">
                    <button @click="addOrDel(-1)"><span class="iconfont">&#xe605;</span></button>
                    <span>{{curFood.num}}</span>
                    <button @click="addOrDel(1)"><span class="iconfont">&#xe603;</span></button>
                </div>
            </div>
            <el-input type="textarea"
                      rows="8"
                      placeholder="请输入备注"
                      v-model="curFood.remarks"></el-input>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import Detailed from './HomeDetailed'
import Nodata from '../Nodata'

export default {
    data() {
        return {
            detailedShow: false, //浮层显示与否
            curFood: {
                //当前点击的菜品数据
            },

            dialogVisible: false, //点菜弹出层是否显示
        }
    },
    components: {
        Detailed,
        Nodata,
    },
    computed: {
        foodList() {
            //获取所有的菜品数据，数据的请求是在nav组件里已经发送了
            return this.$store.getters.getFoodList.lists.docs
        },
        tableId() {
            return this.$store.getters.getTables.cur_id //获取当前用户选的桌子
        },
        ordered() {
            return this.$store.getters.getOrdered //获取已点的数据
        },
    },
    methods: {
        showDetail(food) {
            this.detailedShow = true

            this.curFood = food
        },
        showFoodAttr(food) {
            if (!this.tableId) {
                //这个条件成立，说明用户没有选座，需要跳转到选座页面
                this.$alert('请选择座位')
                    .then(() => this.$router.push('/table'))
                    .catch(() => {})
                return
            }

            //第二种情况，用户选座了，但是没有点菜
            this.dialogVisible = true
            this.curFood = food
            this.$set(this.curFood, 'num', 1) //菜品的数据里没有num，默认情况下需要给一个数字1

            //第三种情况：用户选座了，菜也点了。需要把已点的信息展示出来
            const orderTable = this.ordered.find(
                (table) => table.table_id == this.tableId
            ) //先查桌子有没有点餐
            const orderDish =
                orderTable &&
                orderTable.order_items.find(
                    (dish) => dish.dish_id == food.dish_id
                ) //再查这道有没有点过（如果桌子在已点里没有找到，就会返回undefined，所以查菜的前提条件是桌子必需点过菜，所以用了&&）

            if (orderDish) {
                //走到这里说明这道菜点过了
                this.curFood = orderDish //已点的数据
                this.$set(this.curFood, 'stars', food.stars)
            }
        },
        addOrDel(num) {
            this.curFood.num += num
            if (this.curFood.num <= 0) {
                this.curFood.num = 0
            }
        },
        confirm() {
            if (!this.curFood.num) {
                alert('数量不能为0')
                return
            }

            this.dialogVisible = false

            this.$fetch({
                url: '/api/add_order_item',
                method: 'POST',
                data: {
                    table_id: this.tableId,
                    dish_id: this.curFood.dish_id,
                    num: this.curFood.num,
                    remarks: this.curFood.remarks,
                    selected: true,
                },
            }).then(() => this.$getOrdered()) //更新已点数据
        },
    },
}
</script>

<style scoped>
.foodList {
    font-size: 0;
}
.foodList li {
    display: inline-block;
    position: relative;
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
}
.foodList img {
    width: 350px;
    height: 350px;
    cursor: pointer;
}
.recommend {
    position: absolute;
    left: 5px;
    top: 5px;
    font-size: 50px;
    color: #ff8400;
}
.foodList .bar {
    width: 100%;
    height: 40px;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    background: rgba(0, 0, 0, 0.6);

    display: flex;
    justify-content: space-between;

    position: absolute;
    bottom: 0;
}
.foodList .bar p {
    display: flex;
    align-items: center;
}
.foodList .rmb {
    font-size: 14px;
}
.foodList .price {
    color: #f0e184;
    margin: 0 10px;
}
.foodList .bar button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    background: #ff8400;
    color: #fff;
    border-radius: 50%;
}
.foodList .bar button span {
    font-size: 14px;
}

/* 菜品属性弹出层 */
.dishHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.dishHead .price {
    font-size: 20px;
    color: #ff8400;
}
.dishHead .control {
    display: flex;
}
.dishHead .control button {
    width: 24px;
    height: 24px;
    background: #ff8400;
    color: #fff;
}
.dishHead .control > span {
    width: 30px;
    height: 24px;
    line-height: 24px;
    box-sizing: border-box;
    text-align: center;
    border-top: 1px solid #ff8400;
    border-bottom: 1px solid #ff8400;
}
</style>

<style>
.attrDialog {
    border-radius: 8px;
}
.attrDialog .el-dialog__body {
    padding: 10px 20px;
}
.attrDialog .el-button--primary {
    background: #ff8400;
    border: none;
}
.attrDialog .el-button:hover {
    background: #ffac52;
    border-color: transparent;
    color: #fff;
}
.attrDialog .el-dialog__headerbtn {
    font-size: 22px;
}
.attrDialog .el-rate__icon {
    font-size: 20px;
    margin-right: 0;
}
.attrDialog .el-dialog__title {
    font-size: 28px;
}

.attrDialog .el-textarea__inner,
.attrDialog .el-textarea__inner:hover {
    border: 1px solid #ff8400;
}
</style>