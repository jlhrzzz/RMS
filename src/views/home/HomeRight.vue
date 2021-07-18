<template>
    <div>
        <div id="navBar">
            <Nav></Nav>
            <Search></Search>
        </div>
        <el-scrollbar wrap-class="scrollWrap"
                      :native="false"
                      id="content">
            <FoodList></FoodList>
        </el-scrollbar>
    </div>
</template>
<script>
import Nav from './HomeRightNav'
import Search from './HomeRightSearch'
import FoodList from './HomeRightFoodList'

export default {
    components: {
        Nav,
        Search,
        FoodList,
    },
}
</script>
<style>
</style>