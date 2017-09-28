<template scope="scope">
  <el-menu default-active="select" theme="light" class="el-menu-vertical" @select="handleSelect">
    <el-menu-item v-for="item in menuItems" :index="item.index" :key="item.index" >{{item.content}}</el-menu-item>
    <el-menu-item id='buttom'></el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    props: ['menuItems','sendVisible','receiveVisible'],
    data() {
      return {

      }
    },
    methods: {
      handleSelect (index) {
        console.log(index);
        if (index==="send"){
          this._props.visible = true;
          console.log('index===send change the of sendVisible visibility');
          this.$emit('update:sendVisible',true);
          this.$emit('update:receiveVisible',false)
        }else {
          this._props.sendVisible = false;
          console.log('index!==send change the visibility of sendVisible false');
          this.$emit('update:sendVisible',false);
          this.$emit('update:receiveVisible',true)
        }
      }
    }
  }
</script>


<style lang="stylus" scoped>
  .el-menu-item
    margin-top 10px
    font-size  23px
  #buttom
    height 400px
</style>
