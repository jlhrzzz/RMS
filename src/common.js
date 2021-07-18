import Vue from 'vue'

//获取分类，注意：不能使用箭头函数！！！！！！！！！！！！！！！
Vue.prototype.$getCategory=function(){
    this.$fetch({
        url:'/api/dish_cate_lists',
    }).then(res=>this.$store.commit('updateCategory', res.cate_lists))
}

//获取桌子
Vue.prototype.$getTable=function(){
    this.$fetch({
        url:'/api/table_lists',
    }).then(res=>this.$store.commit('updateTables', res))
}

//获取已点
Vue.prototype.$getOrdered=function(){
    this.$fetch({
        url:'/api/ordered',
    }).then(res=>this.$store.commit('updateOrdered', res.orders))
}

//获取已下单
Vue.prototype.$getShopped=function(){
    this.$fetch({
        url:'/api/shopped',
    }).then(res=>this.$store.commit('updateShopped', res.orders))
}