<template>
  <el-col :span="19" :offset="1" v-show="receiveVisible">
    <el-table :data="patientInfo" border style="width: 75%" max-height="380">
      <el-table-column fixed prop="name" label="病人姓名"  ></el-table-column>
      <el-table-column prop="time" label="请求到达时间" ></el-table-column>
      <el-table-column prop="request" label="请求附带信息" ></el-table-column>
      <el-table-column prop="status" label="转诊状态" ></el-table-column>
      <el-table-column  label="操作" >
        <template scope="scope">
          <el-button @click="handleLookat(scope.$index)" type="text" size="small">查看病例信息</el-button>
          <el-button @click="handleReferral(scope.$index)" type="text" size="small">确认转诊</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    methods: {
      handleLookat () {
        this.caseListVisible = true;
      },
      handleReferral () {
        this.referralVisible = true
      }
    }
  }
</script>
