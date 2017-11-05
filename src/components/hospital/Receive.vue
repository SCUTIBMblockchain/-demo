<template>
  <el-col :span="22" :offset="1" v-show="receiveVisible">
    <!--<Case :message.sync="patientInfo" :ws.sync="ws"></Case>-->
    <el-card class="box_card">
      <h1>待处理</h1>
      <el-table :data="todealTableData" :row-class-name="tableRowClassName" @cell-click="handleCellClick" height="300" width="1050"  >
        <el-table-column label="id" prop="id" width="100">
        </el-table-column>
        <el-table-column label="病人姓名" prop="name" width="100">
        </el-table-column>
        <el-table-column label="性别" prop="gender" width="100">
        </el-table-column>
        <el-table-column label="家庭住址" prop="address" width="300">
        </el-table-column>
        <el-table-column label="目前就诊医院" prop="hospital" width="200">
        </el-table-column>
        <el-table-column label="转诊状态" prop="referralStatus" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" @click="dealReferral(scope.row)">处 理 转 诊</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h1>已处理</h1>
      <el-table :data="dealedTableData" :row-class-name="tableRowClassName" @cell-click="showReferral" height="300" width="1050"  >
        <template>
          <el-table-column label="id" prop="id" width="100">
          </el-table-column>
        </template>
        <el-table-column label="病人姓名" prop="name" width="100">
        </el-table-column>
        <el-table-column label="性别" prop="gender" width="100">
        </el-table-column>
        <el-table-column label="家庭住址" prop="address" width="300">
        </el-table-column>
        <el-table-column label="就诊医院" prop="hospital" width="200">
        </el-table-column>
        <el-table-column label="转诊状态" prop="referralStatus" width="100">
        </el-table-column>
        <el-table-column label="操作状态" prop="operationStatus">
        </el-table-column>
      </el-table>
    </el-card>
    <InformationDialog :InfoDialogVisible="dialogVisible" :patientId="clickPatientId" @updateDialogVisible="updateDialogVisible"></InformationDialog>
    <ReferralProfile v-if="referralVisible" :referralVisible="referralVisible" :info= 'referralInfo' :state.sync = "referralState" :ws = "selfWs" @updateReferralVisible="referralVisible=false" @acceptReferral="accept" @rejectReferral="reject"></ReferralProfile>
  </el-col>
</template>

<script>
  import InformationDialog from './InformationDialog.vue'
  import ReferralProfile from './ReferralPorfile.vue'
  import ElCol from 'element-ui/packages/col/src/col'
  import Case from './Case.vue'
  export default {
    components: {
      Case,
      InformationDialog,
      ReferralProfile
    },
    props: ['receiveVisible', 'ws','patientInfo'],
    data () {
      return {
        caseListVisible: false,
        referralVisible: false,
        dialogVisible: false,
        hospitalId: 'hospital02',
        referralState: 'receive',
        referralInfo: null,
        clickPatientId: '',
        selfWs: this.ws,
        todealTableData: [ /*{
          'id': 'patient09',
          'name': '贺肃',
          'gender': '男',
          'address': '广东省东莞市大石镇大石街道办4层461号',
          'hospital': '广东省仁和医院',
          'referralStatus': '未处理'
        }, {
          'id': 'patient21',
          'name': '辰法',
          'gender': '男',
          'address': '广东省东莞市厚街镇厚街362号',
          'hospital': '广东省仁和医院',
          'referralStatus': '未处理'
        }, {
          'id': 'patient24',
          'name': '钟娟',
          'gender': '女',
          'address': '广东省惠州市惠新镇城中村339号',
          'hospital': '广州市红十字会医院',
          'referralStatus': '未处理'
        }*/],
        dealedTableData: [/*{
          'id': 'patient28',
          'name': '林琅',
          'gender': '男',
          'address': '广东省广州市番禹区大学城华南理工大学C4栋118号',
          'hospital': '华南理工大学附属医院',
          'referralStatus': '已处理',
          'operationStatus': '接受'
        }, {
          'id': 'patient36',
          'name': '孙子良',
          'gender': '男',
          'address': '广东省广州市番禹区番禺小区7栋746号',
          'hospital': '广东省第二人民医院',
          'referralStatus': '已处理',
          'operationStatus': '拒绝'
        }, {
          'id': 'patient37',
          'name': '周运楚',
          'gender': '女',
          'address': '广东省广州市中山二路106号',
          'hospital': '中国人民解放军第421医院',
          'referralStatus': '已处理',
          'operationStatus': '接受'
        }*/ ]
      }
    },
    mounted: function () {
      this.$http.get('/api/receiver/get_todeal_patients/hospital01')
        .then((res) => {
          if (res.status === 200) {
            for (var i=0;i<res.data.patients.length;i++) {
              let todealPatient = {
                'id': '',
                'name': '',
                'gender': '',
                'address': '',
                'hospital': '',
                'referralStatus': '',
              };
              todealPatient.id = res.data.patients[i].Id;
              todealPatient.name = res.data.patients[i].Name;
              todealPatient.gender = res.data.patients[i].Gender;
              todealPatient.address = res.data.patients[i].Resident;
              todealPatient.hospital = res.data.patients[i].State.HospitalName;
              if (res.data.patients[i].State.Referral === 'undeal') {
                todealPatient.referralStatus = '待处理';
              }
              this.todealTableData.push(todealPatient);
            }
          }else {
            console.log('this.$http.get(\'/api/receiver/get_todeal_patients\',this.hospitalId) return is not 200');
          }
        },(err) => {
          this.$message.error('初始化未处理病人时请求错误！')
        });
      this.$http.get('/api/receiver/get_dealed_patients/hospital01')
        .then((res) => {
          if (res.status === 200) {
            for (var i=0;i<res.data.patients.length;i++) {
              let dealedPatient = {
                'id': '',
                'name': '',
                'gender': '',
                'address': '',
                'hospital': '',
                'referralStatus': '',
              };
              dealedPatient.id = res.data.patients[i].Id;
              dealedPatient.name = res.data.patients[i].Name;
              dealedPatient.gender = res.data.patients[i].Gender;
              dealedPatient.address = res.data.patients[i].Resident;
              dealedPatient.hospital = res.data.patients[i].State.HospitalName;
              dealedPatient.referralStatus = '已处理';
              if (res.data.patients[i].State.Referral === 'receive') {
                dealedPatient.operationStatus = '接受';
              }else if(res.data.patients[i].State.Referral === 'reject') {
                dealedPatient.operationStatus = '拒绝';
              }
              this.dealedTableData.push(dealedPatient);
            }
          }else {
            console.log('this.$http.get(\'/api/receiver/get_dealed_patients\',this.hospitalId) return is not 200');
          }
        },(err) => {
          this.$message.error('初始化未处理病人时请求错误！')
        });
    },
    watch: {
      patientInfo (newPaitent){
        if ('id' in newPaitent) {
          console.log('receive a new patient is',newPaitent);
          this.todealTableData.push(newPaitent);//pass
        }else {
          console.log('id not in newPatient');
          return;
        }
        let tmpPatient = {
          'id': '',
          'name': '',
          'gender': '',
          'address': '',
          'hospital': '',
          'referralStatus': '',
          'operationStatus': ''
        };
        tmpPatient.id = newPaitent.id;
        tmpPatient.name = newPaitent.name;
        tmpPatient.gender = newPaitent.gender;
        tmpPatient.address = newPaitent.address;
        tmpPatient.hospital = newPaitent.hospital;
        tmpPatient.referralStatus = newPaitent.referralStatus;
        tmpPatient.operationStatus = newPaitent.operationStatus;
        this.todealTableData.push(tmpPaitent);
      }
    },
    methods: {
      tableRowClassName (row, index) {
        if (row.referralStatus === '未处理') {
          return 'info-row'
        } else {
          if (row.operationStatus === '对方拒绝'||row.operationStatus === '拒绝') {
            return 'negative-row'
          } else if (row.operationStatus === '对方接受'||row.operationStatus === '接受') {
            return 'positive-row'
          }
        }
        return ''
      },
      handleCellClick (row, event) {
        if (event.label === '操作') {
          ;//don't need to do anything
        } else {
          // console.log('other cell click');
          this.clickPatientId = row.id;
          this.dialogVisible = true
        }
      },
      showReferralCase (rowId) {
        alert('row id is' + rowId)
      },
      updateDialogVisible (val) {
        this.dialogVisible = val
      },
      showReferral(row) {
        this.referralInfo = row.id
        this.referralVisible = true
        this.referralState = 'look'

      },
      dealReferral(row) {
        this.referralVisible = true
        this.referralState = 'receive'
        this.referralInfo = row.id
      },
      reject(){
        console.log('this.referralInfo is ',this.referralInfo)
        this.$message.error('reject' + this.referralInfo);
        for(let i=0;i<this.todealTableData.length;i++){
          if(this.todealTableData[i].id === this.referralInfo){
            console.log('in for and if');
            let p = this.todealTableData.splice(i,1);
            //console.log(p);
            //console.log(p[0]);
            p[0].referralStatus = '已处理';
            p[0].operationStatus = '拒绝';
            this.dealedTableData.push(p[0]);
            return;
          }
        }
      },
      accept(){
        console.log('this.referralInfo is ',this.referralInfo)
        this.$message.error('accept' + this.referralInfo);
        for(let i=0;i<this.todealTableData.length;i++){
          if(this.todealTableData[i].id === this.referralInfo){
            let p = this.todealTableData.splice(i,1);
            p[0].referralStatus = '已处理';
            p[0].operationStatus = '接受';
            this.dealedTableData.push(p[0]);
            return;
          }
        }
      }
    }
  }
</script>
<style>
  .el-table .info-row {
    background: white;
  }

  .el-table .positive-row {
    background: lightgreen;
  }

  .el-table .negative-row {
    background: lightcoral;
  }
</style>
