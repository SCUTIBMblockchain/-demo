<template>
  <div id="app">
    <Nav></Nav>
    <Referral></Referral>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './components/Nav'
import Referral from './components/hospital/ReferralPorfile'
export default {
  name: 'app',
  components: {
    Nav,
    Referral
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
