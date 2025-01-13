
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from "../store/user";
const routes = [
  {
    path: '/register',
    name: 'Register',
    meta: {requiresAuth: true},
    component:  () => import('../views/Register.vue'),
  },
  {
    path: '/room/:nickname',
    name: 'RoomList',
    meta: {requiresAuth: true},
    component: () => import('../views/Room.vue'),
  },
  {
    path: '/add-room',
    name: 'AddRoom',
    meta: {requiresAuth: true},
    component: () => import('../views/AddRoom.vue'),
  },
  {
    path: '/',
    name: 'Login',
    meta: {requiresAuth: true},
    component:  () => import('../views/Login.vue'),
  }

  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const user = useUserStore()
//   if(to.meta.requiresAuth && user.user.access_token) {
//       if(to.name == 'login' && to.name != 'home' ){
//           next({name:'home'})
//       } else {
//           next()
//       }
//   } else {
//       if(to.name != 'login'){
//           next({name:'login'})
//       } else {
//           next()
//       }
//   }
// })

export default router;