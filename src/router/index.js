import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getCat } from './routeConfig'
import App from '../App.vue'

const staticRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/books',
    name: 'books',
    component: () => import(/*webpackChunkName: "BooksView"*/'../views/BooksView.vue')
  },
  {
    path: '/trolley',
    name: 'trolley',
    component: () => import('../views/TrolleyView.vue')
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import('../views/FavoriteView.vue')
  },
  {
    path: '/access',
    name: 'access',
    component: () => import('../views/FavoriteView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/*webpackChunkName: "logout"*/'../views/LogOutView.vue')
  },
  {
    path: '/buynow',
    name: 'buynow',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/addproduct',
    name: 'addproduct',
    component: () => import('../views/AddProductView.vue')
  }
]

async function generateCategoryRoutes() {
  try {
    const categories = await getCat();
    return categories.map(item => ({
      path: item.path,
      name: item.name,
      component: () => import('../views/BooksView.vue')
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

const categoryComponents = await generateCategoryRoutes();

const router = createRouter({
  history: createWebHistory("shop"),
  routes: [...staticRoutes, ...categoryComponents],
})

export default router
