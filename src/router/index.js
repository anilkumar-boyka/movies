import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '/', redirect: '/movies' },
    {
      path: '/movies',
      // name: 'Movies',
      component: () => import(`@/components/movies/Movies`),
      children: [{
        path: '',
        name: 'MoviesList',
        component: () => import(`@/components/movies/MoviesList`),
        meta: {
          requiresAuth: true
        },
      }, {
        path: ':imdbId',
        name: 'MovieDetails',
        component: () => import(`@/components/movies/MovieDetails`),
        meta: {
          requiresAuth: true
        },
      }]
    }, {
      path: '/login',
      name: 'Login',
      component: () => import(`@/components/movies/Login`)
    }
  ]
})

router.beforeEach((to, _, next) => {
  if (to.name !== 'Login' && !store.getters.isAuthenticated) return next({ name: 'Login' })
  if (to.name === 'Login' && store.getters.isAuthenticated) return next({ name: 'MoviesList' })
  else next()
})

export default router;