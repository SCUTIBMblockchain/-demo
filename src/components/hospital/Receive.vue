<template>
  <el-col :span="19" :offset="1" v-show="receiveVisible">
    <Case :message.sync="patientInfo" :ws.sync="ws"></Case>
  </el-col>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import Case from './Case.vue'
  export default {
    components: {
      ElCol,
      Case,
    },
    props: ['receiveVisible','receiveLogs','ws','patientInfo'],
    data() {
      return {
        caseListVisible: false,
        referralVisible: false,
        //patientInfo: [],
      }
    },
    mounted() {
      //this.init()
    },
    methods: {
//      init() {
//        let win = this;
//        console.log('in receive hospital before ws create')
//        let myws = new WebSocket('ws://localhost:8889/referral')
//        console.log('in receive hospital after ws create')
//        myws.onopen = function (event) {
//          let sendData = {"message": "receive这是一条接受转诊的医院发送给服务器的消息"}
//          myws.send(JSON.stringify(sendData));
//        };
//        myws.onmessage = function (event) {
//          //console.log('接受转诊的医院接收到来自服务器的消息');
//          //console.log(event.data);
//          let jsonobj = JSON.parse(event.data);
//          //console.log('jsonobj is ',jsonobj);
//          if(jsonobj.operation==="move"){
//            win.$message({
//              type: 'success',
//              message: '接收到一个新的转诊请求'
//            });
//            //console.log('jsonobj.object is ',jsonobj.object);
//            //console.log('this is ',this);
//            //console.log('patientInfo is ',win.patientInfo);
//            win.patientInfo.push(jsonobj.object);
//            //console.log('patientInfo is ',win.patientInfo);
//          }else{
//            win.$message.error('某些原因导致错误');
//          }
//        };
//      },
//      handleLookat () {
//        this.caseListVisible = true;
//      },
//      handleReferral () {
//        this.referralVisible = true
//      }
    }
  }
</script>
