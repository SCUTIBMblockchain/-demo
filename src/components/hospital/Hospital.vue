<template>
  <div id="hospital">
    <h1>hospital</h1>
    <el-row >
      <el-col :span="3">
        <OperationNav v-bind:menuItems="navItems" :sendVisible.sync="sendVisible" :receiveVisible.sync="receiveVisible"></OperationNav>
      </el-col>
      <el-col :span="21">
        <Receive :receiveVisible="receiveVisible"></Receive>
      </el-col>
      <br/>
      <el-col :span="21">
        <Send :sendVisible="sendVisible"></Send>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import OperationNav from './OperationNav.vue'
  import Receive from './Receive'
  import Send from './Send.vue'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      ElCol,
      OperationNav,
      Receive,
      Send,
    },
    data () {
      return {
        sendVisible:false,
        receiveVisible:true,
        navItems: [{
          index: 'receive',
          content: '接收转诊'
        },{
          index: 'send',
          content: '发送转诊'
        }]
      }
    },
    methods: {

    }
  }

</script>
