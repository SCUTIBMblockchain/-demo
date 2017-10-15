<template scope="scope">
    <el-col :span="2">
      <el-menu :default-active="menuItems[0].index" theme="light" class="el-menu-vertical-demo" @select="handleSelect">
        <el-menu-item v-for="item in menuItems" :index="item.index" :key="item.index" >{{item.content}}</el-menu-item>
        <!--<el-menu-item id='buttom' index="1-1"></el-menu-item>-->
      </el-menu>
    </el-col>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      ElCol},
    props: ['menuItems','sendVisible','receiveVisible'],
    data() {
      return {

      }
    },
    methods: {
      handleSelect (index) {
        if (index==="send"){
          this._props.visible = true;
          this.$emit('update:sendVisible',true);
          this.$emit('update:receiveVisible',false)
        }else {
          this._props.sendVisible = false;
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
    font-size  20px
  #buttom
    height 400px
</style>
