<template>
  <div id="hospital">
    <el-row >
      <el-col :span="3">
        <OperationNav v-bind:menuItems="navItems" :sendVisible.sync="sendVisible" :receiveVisible.sync="receiveVisible"></OperationNav>
      </el-col>
      <el-col :span="21">
        <Receive :receiveVisible="receiveVisible" :receiveLogs.sync="receiveLog" :ws.sync="myws"></Receive>
      </el-col>
      <br/>
      <el-col :span="21">
        <Send :sendVisible="sendVisible" :sendLogs.sync="sendLog" :ws.sync="myws"></Send>
      </el-col>
      <el-col :span="21">
        <textarea id="logRecord" :value.sync="logs" cols="140" rows="10" ></textarea>
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
        sendVisible: true,
        receiveVisible: false,
        //myss:'',
        myws: this.init(),
        sendLog: 'this is a message of send log',
        receiveLog: 'this is a message of receive log',
        navItems: [{
          index: 'receive',
          content: '接收转诊'
        }, {
          index: 'send',
          content: '发送转诊'
        }]
      }
    },
    computed: {
      logs: function () {
        if (this._data.sendVisible && !this._data.receiveVisible){
          return this._data.sendLog
        }else if(!this._data.sendVisible && this._data.receiveVisible) {
          return this._data.receiveLog
        }
      },

    },
    mounted() {
      //this.init();
    },
    methods: {
      init(){
        let win = this;
        console.log('hospital before ws create');
        var myws = new WebSocket('ws://localhost:8889/referral');
        console.log('hospital after ws create , myws  is ',myws);
        myws.onopen = function (event) {
//          win._props.receiveLogs += '\nopening a web socket';
//          win.$emit('update:receiveLogs',win._props.receiveLogs);
        };
        myws.onmessage = function (event) {
          win._props.receiveLogs += '\nreceive a message from ws';
          win.$emit('update:receiveLogs',win._props.receiveLogs);
          let jsonobj = JSON.parse(event.data);
          if(jsonobj.operation==="receive"){
            win.$message({
              type: 'success',
              message: '接收到一个新的转诊请求'
            });
            win.patientInfo.push(jsonobj.additionMsg);
          }else if(jsonobj.operation==="accept"){
            win.$message({
              type: 'success',
              message: '对方同意接收转诊'
            });
          }else if(jsonobj.operation==="reject"){
            win.$message.error('对方拒绝接收转诊');
          }else {
            win.$message.error('某些原因导致错误');
          }
        };
        return myws;
      },
    }
  }

</script>

<style lang="stylus" scoped>
  #logRecord
    margin-left: 5%
    margin-top:  3%
    background-color: black
    color: white
</style>
