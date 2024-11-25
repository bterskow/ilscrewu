
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import PageVue from '@/pages/index.vue';
import Error404Vue from '@/components/Error404.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:user_id',
      name: 'page',
      component: PageVue,
      props: true
    },
    {
      path: '/error404',
      name: 'error404',
      component: Error404Vue
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {top: 0};
  }
})

router.beforeEach((to, from, next) => {
  const allowedRoutes = ['page', 'error404'];
  if (!allowedRoutes.includes(to.name)) {
    return next({name: 'error404'})
  }

  return next();
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
