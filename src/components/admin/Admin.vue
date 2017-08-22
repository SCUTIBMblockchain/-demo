<template>
  <el-row>
    <el-col :span="3">
      <VerticalNav v-bind:menuItems="navItems"></VerticalNav>
    </el-col>
    <el-col :span="21">
      <el-table :data="patientInfo" border style="width: 75%" max-height="380">
        <el-table-column fixed prop="name" label="病人姓名"  ></el-table-column>
        <el-table-column prop="genda" label="性别" ></el-table-column>
        <el-table-column prop="time" label="请求时间" ></el-table-column>
        <el-table-column prop="request" label="请求信息" ></el-table-column>
        <el-table-column prop="status" label="状态" ></el-table-column>
        <el-table-column  label="操作" >
          <template scope="scope">
            <el-button @click="handleLookat(scope.$index)" type="text" size="small">查看病例信息</el-button>
            <el-button @click="handleReferral(scope.$index)" type="text" size="small">转诊</el-button>
          </template> 
        </el-table-column>
      </el-table>
      <CaseList v-bind:visible.sync="caseListVisible"></CaseList>
      <Referral v-bind:visible.sync="referralVisible"></Referral>
    </el-col>
  </el-row>
</template>

<script>
import VerticalNav from '../VerticalNav.vue'
import CaseList from './referral/CaseList'
import Referral from './referral/Referral'

export default {
  components: {
    VerticalNav,
    CaseList,
    Referral
  },
  data () {
    return {
      navItems: [{
        index: 'referral',
        content: '处理转诊'
      }],
      patientInfo: [{
        name: '刘备',
        status: '待处理',
        genda: '男',
        time: '2017-08-21',
        request: 'haha'
      }],
      caseListVisible: false,
      referralVisible: false
    }
  },
  methods: {
    handleLookat () {
      this.caseListVisible = true
      alert(this.caseListVisible)
    },
    handleReferral () {
      this.referralVisible = true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-table
    margin-top 29px
    margin-left 35px
    font-size  15px
    margin-bottom 10px 
</style>