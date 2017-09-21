import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Admin from '@/components/admin/Admin'
import Doctor from '@/components/doctor/doctor'
import Developer from '@/components/developer/Developer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }, {
      path: '/doctor',
      name: 'doctor',
      component: Doctor
    }, {
      path: '/developer',
      name: 'developer',
      component: Developer
    }
  ]
})
