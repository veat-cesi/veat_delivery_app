import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import OrderPage from "@/views/OrderPage.vue";
import AcceptedOrderPage from "@/views/AcceptedOrderPage.vue";
import GiveOrderPage from "@/views/GiveOrderPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/orders'
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrderPage
  },
  {
    path: '/order/:id',
    name: 'AcceptedOrder',
    component: AcceptedOrderPage,
    props: true
  },
  {
    path: '/order/give/:id',
    name: 'GiveOrder',
    component: GiveOrderPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
