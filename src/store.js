import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {	//存储数据
		category:[	//分类数据

		],
		foodList:{	//菜品数据（当前分类下的菜品）
			lists:{
				docs:[

				]
			},
			//curCategoryId:0,
		},
		ordered:[	//已点数据

		],
		shopped:[	//已下单数据

		],
		tables:{	//桌子的数据
			cur_id:0,
			list:[

			]
		}
	},
	getters: {	//获取数据
		getCategory(state){
			return state.category;
		},
		getFoodList(state){
			return state.foodList;
		},
		getOrdered(state){
			return state.ordered;
		},
		getShopped(state){
			return state.shopped;
		},
		getTables(state){
			return state.tables;
		}
	},
	mutations: {	//更新数据
		updateCategory(state, data){
			state.category=data;
		},
		updateFoodList(state, data){
			state.foodList=data;
		},
		updateOrdered(state, data){
			state.ordered=data;
		},
		updateShopped(state, data){
			state.shopped=data;
		},
		updateTables(state, data){
			state.tables=data;
		},
		updateCurId(state, data){
			state.tables.cur_id=data;
		}
	}
})

export default store