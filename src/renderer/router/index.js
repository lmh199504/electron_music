import Vue from 'vue'
import Router from 'vue-router'

// import store from ''
Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			name: 'layout',
			component: require('@/components/layout').default,
			children: [
				{
					path: '/',
					redirect: '/musichall'
				},
				{
					path: '/musichall',
					name: 'musichall',
					component: require('@/components/musichall').default
				}, {
					path: '/video',
					name: 'video',
					component: require('@/components/video').default
				}, {
					path: '/radio',
					name: 'radio',
					component: require('@/components/radio').default
				}, {
					path: '/history',
					name: 'history',
					component: require('@/components/history').default
				},
				{
					path: '/try',
					name: 'try',
					component: require('@/components/try').default
				}, {
					path: '/down',
					name: 'down',
					component: require('@/components/down').default
				}, {
					path: '/love',
					name: 'love',
					component: require('@/components/love').default
				}, {
					path: '/discoDetail',
					name: 'discoDetail',
					component: require('@/components/discoDetail/index.vue').default
				}, {
					path: '/ranking',
					name: 'ranking',
					component: require('@/components/ranking/index.vue').default
				}, {
					path: '/singerDetail',
					name: 'singerDetail',
					component: require('@/components/singerDetail/index.vue').default
				}, {
					path: '/numDetail',
					name: 'numDetail',
					component: require('@/components/numDetail/numDetail.vue').default
				}, {
					path: '/vidoeDetail',
					name: 'videoDetail',
					component: require('@/components/videoDetail/videoDetail.vue').default
				}, {
					path: '/center',
					name: 'center',
					component: require('@/components/center/center.vue').default
				}

			]
		},

		{
			path: '*',
			redirect: '/'
		}, {
			path: "/desktoplyric",
			name: 'desktoplyric',
			component: require('@/components/desktoplyric/desktoplyric.vue').default
		}


	],
	linkActiveClass: 'active' // active为路由激活时动态添加的类，类名可以自定义
})


//这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
router.beforeEach((to, from, next) => {
	if (from.path != '/' && to.query.no != 1 && from.query.no != 1) {
		
	}

	next();
});

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}




export default router
