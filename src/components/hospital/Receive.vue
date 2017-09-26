<template>
  <el-col :span="19" :offset="1" v-show="receiveVisible">
    <!--<el-table :data="patientInfo" border style="width: 75%" max-height="380">-->
      <!--<el-table-column fixed prop="name" label="病人姓名"  ></el-table-column>-->
      <!--<el-table-column prop="time" label="请求到达时间" ></el-table-column>-->
      <!--<el-table-column prop="request" label="请求附带信息" ></el-table-column>-->
      <!--<el-table-column prop="status" label="转诊状态" ></el-table-column>-->
      <!--<el-table-column  label="操作" >-->
        <!--<template scope="scope">-->
          <!--<el-button @click="handleLookat(scope.$index)" type="text" size="small">查看病例信息</el-button>-->
          <!--<el-button @click="handleReferral(scope.$index)" type="text" size="small">确认转诊</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <Case></Case>
    <CaseList v-bind:visible.sync="caseListVisible"></CaseList>
    <Referral v-bind:visible.sync="referralVisible"></Referral>
  </el-col>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import CaseList from '../admin/referral/CaseList'
  import Referral from '../admin/referral/Referral'
  import Case from './Case.vue'
  export default {
    components: {
      ElCol,
      CaseList,
      Referral,
      Case,
    },
    props: ['receiveVisible'],
    data() {
      return {
        caseListVisible: false,
        referralVisible: false,
        patientInfo: [{
          name: '刘备',
          status: '待处理',
          time: '2017-08-21',
          request: 'haha'
        }],
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let win = this;
        let myws = new WebSocket('ws://localhost:4000/');
        myws.onopen = function (event) {
          console.log('接收转诊的医院打开了ws');
          let jsonData = {"operation":"receive","object":"receive这是一条接受转诊的医院发送给服务器的消息"};
          console.log('jsondata is ',jsonData);
          console.log('jsondata to str is ',JSON.stringify(jsonData));
          myws.send(JSON.stringify(jsonData));
          console.log('open()结束')
        };
        myws.onmessage = function (event) {
          console.log('接受转诊的医院接收到来自服务器的消息');
          //console.log(event.data);
          let jsonobj = JSON.parse(event.data);
          if(jsonobj.operation==="move"){
            win.$message({
              type: 'success',
              message: '接收到一个新的转诊请求'
            });
          }else{
            win.$message.error('某些原因导致错误');
          }

        };
      },
      handleLookat () {
        this.caseListVisible = true;
      },
      handleReferral () {
        this.referralVisible = true
      }
    }
  }
</script>
