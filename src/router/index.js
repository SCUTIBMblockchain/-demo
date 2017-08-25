import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Doctor from '@/components/doctor/doctor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: Doctor
    }
  ]
})
