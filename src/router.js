import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		component: () => import('./views/home/Home'),
		meta: {
			requireLogin: true,
		},
		children: [{ //Home加载后，HomeRight要做为它的子路由加载，但是并没对应的地址，所以path就为空
				path: "",
				component: () => import('./views/home/HomeRight'),
			},
			{
				path: 'order',
				component: () => import('./views/order/Order'),
				redirect: 'order/ordered',
				children: [{
						path: 'ordered',
						component: () => import('./views/order/Ordered'),
					},
					{
						path: 'shopped',
						component: () => import('./views/order/Shopped'),
					}
				]
			},
			{
				path: 'table',
				component: () => import('./views/Table')
			}
		]
	},
	{
		path: '/login',
		component: () => import('./views/Login'),
		beforeEnter(to, from, next) { //如果是已登录的状态进入到这个组件，就让它跳转到首页
			if (localStorage.getItem('order:isLogin') != null) {
				//登录状态，跳转到首页
				next('/');
			} else {
				next();
			}
		}
	},
	{
		path: '/admin',
		component: () => import('./views/admin/Admin'),
		redirect: 'admin/category',
		meta: {
			requireLogin: true,
		},
		children: [{
				path: 'category',
				component: () => import('./views/admin/DishCategory'),
			},
			{
				path: 'dish',
				component: () => import('./views/admin/DishEdit'),
			},
			{
				path: 'table',
				component: () => import('./views/admin/Table'),
			},
		]
	}
]

const router = new VueRouter({
	routes,
	linkExactActiveClass: 'active',
	linkActiveClass: 'ac',
	// mode: 'history',
})

router.beforeEach((to, from, next) => { //全局守卫
	const isRequire = to.matched.some(item => item.meta.requireLogin); //这个值为true，表示这个路由需要登录

	if (isRequire) { //需要登录 
		if (localStorage.getItem('order:isLogin') == null) { //用户没有登录
			next('/login');
		} else { //用户已经登录了
			next();
		}
	} else { //不需要登录 
		next();
	}
});

export default router