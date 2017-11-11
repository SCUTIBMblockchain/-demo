<template>
  <el-col :span="22" :offset="1" v-show="receiveVisible">
    <!--<Case :message.sync="patientInfo" :ws.sync="ws"></Case>-->
    <el-card class="box_card">
      <h1>待处理</h1>
      <el-table :data="todealTableData" :row-class-name="tableRowClassName" @cell-click="handleCellClick" height="300" width="1550"  >
        <el-table-column label="referral id" prop="Id" width="150">
        </el-table-column>
        <el-table-column label="病人姓名" prop="Name" width="100">
        </el-table-column>
        <el-table-column label="转诊状态" prop="State" width="100">
        </el-table-column>
        <el-table-column label="时间" prop="Date" width="100">
        </el-table-column>
        <el-table-column label="转诊目的" prop="FromInfo.ReferralType" width="100">
        </el-table-column>
        <el-table-column label="病情" prop="FromInfo.IllnessState" width="200">
        </el-table-column>
        <el-table-column label="请求转诊医院" prop="FromInfo.HospitalName" width="100">
        </el-table-column>
        <el-table-column label="转出科室" prop="FromInfo.Section" width="100">
        </el-table-column>
        <el-table-column label="请求转诊医生" prop="FromInfo.Doctor" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" @click="dealReferral(scope.row)">处 理 转 诊</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h1>已处理</h1>
      <el-table :data="dealedTableData" :row-class-name="tableRowClassName" @cell-click="showReferral" height="300" width="1050"  >
          <el-table-column label="referral id" prop="Id" width="150">
          </el-table-column>
          <el-table-column label="病人姓名" prop="Name" width="100">
          </el-table-column>
          <el-table-column label="转诊状态" prop="State" width="100">
          </el-table-column>
          <el-table-column label="时间" prop="Date" width="100">
          </el-table-column>
          <el-table-column label="转诊目的" prop="FromInfo.ReferralType" width="100">
          </el-table-column>
          <el-table-column label="病情" prop="FromInfo.IllnessState" width="200">
          </el-table-column>
          <el-table-column label="请求转诊医院" prop="FromInfo.HospitalName" width="100">
          </el-table-column>
          <el-table-column label="转出科室" prop="FromInfo.Section" width="100">
          </el-table-column>
          <el-table-column label="请求转诊医生" prop="FromInfo.Doctor">
          </el-table-column>
      </el-table>
    </el-card>
    <InformationDialog :InfoDialogVisible="dialogVisible" :patientId="clickPatientId" @updateDialogVisible="updateDialogVisible"></InformationDialog>
    <ReferralProfile :referralVisible="referralVisible" :info= 'referralInfo' :state.sync = "referralState" :ws = "selfWs" @updateReferralVisible="referralVisible=false" @acceptReferral="accept" @rejectReferral="reject"></ReferralProfile>
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
        todealTableData: [ {
          "Id": "20171010001",
          "State": "undeal",
          "Date": "20171012",
          "PatientId": "patient01",
          "Name": "王建国",
          "PIN": "142703199701012232",
          "Gender": "男",
          "Age": 20,
          "Resident": "广东省广州市番禹区番禺小区4栋502号",
          "Phone": "13825646512",
          "Birthplace": "陕西省忻州市五寨县",
          "Nationality": "汉",
          "Occupation": "电工",
          "FromInfo": {
            "Section": "内科",
            "HospitalName": "仁和医院",
            "Doctor": "张伟",
            "Phone": "13654681827",
            "ReferralType": "治疗重症",
            "RelationDemand": "要王伟专家负责",
            "PayWay": "医保",
            "IllnessState": "长期高烧不退，各种抗生素均无效"
          },
          "ToInfo": {
            "Section": "内科",
            "Doctor": "王伟",
            "Phone": "13427534816",
            "RejectReason": "王伟专家要出差"
          }
        }],
        dealedTableData: [
          {
            "Id": "20171010001",
            "State": "dealed",
            "Date": "20171012",
            "PatientId": "patient02",
            "Name": "王建国",
            "PIN": "142703199701012232",
            "Gender": "男",
            "Resident": "广东省广州市番禹区番禺小区4栋502号",
            "Phone": "13825646512",
            "Age": 20,
            "Birthplace": "陕西省忻州市五寨县",
            "Nationality": "汉",
            "Occupation": "电工",
            "FromInfo": {
              "Section": "内科",
              "HospitalName": "仁和医院",
              "Doctor": "张伟",
              "Phone": "13654681827",
              "ReferralType": "治疗重症",
              "RelationDemand": "要王伟专家负责",
              "PayWay": "医保",
              "IllnessState": "长期高烧不退，各种抗生素均无效"
            },
            "ToInfo": {
              "Section": "内科",
              "Doctor": "王伟",
              "Phone": "13427534816",
              "RejectReason": "王伟专家要出差"
            }
          }
        ]
      }
    },
    mounted: function () {
      this.$http.get('/api/referralProfileInfo/queryUndealByHospitalId/',this.hospitalId)
        .then((res) => {
          if(res.status === 200) {
            this.todealTableData.length = 0 //clear the todealTableData
            for (let i=0;i<res.data.referralInfo.length;i++) {
              let todealReferral = {
                "Id": res.data.referralInfo[i].Id,
                "State": res.data.referralInfo[i].State,
                "Date": res.data.referralInfo[i].Date,
                "PatientId": res.data.referralInfo[i].PatientId,
                "Name": res.data.referralInfo[i].Name,
                "FromInfo": {
                  "Section": res.data.referralInfo[i].FromInfo.Section,
                  "HospitalName": res.data.referralInfo[i].FromInfo.HospitalName,
                  "Doctor": res.data.referralInfo[i].FromInfo.Doctor,
                  "ReferralType": res.data.referralInfo[i].FromInfo.ReferralType,
                  "IllnessState": res.data.referralInfo[i].FromInfo.IllnessState
                },
              }
              this.todealTableData.push(todealReferral)
            }
          }else {
            console.log('this.$http.get(\'/api/referralProfileInfo/queryUndealByHospitalId/\',this.hospitalId) return is not 200')
          }
        },(err) => {
          this.$message.error('this.$http.get(\'/api/referralProfileInfo/queryUndealByHospitalId/\',this.hospitalId) return error')
          console.log('/api/referralProfileinfo/queryUndealByHospitalId/ err msg is '+err)
        })

//      this.$http.get('/api/receiver/get_todeal_patients/hospital01')
//        .then((res) => {
//          if (res.status === 200) {
//            for (var i=0;i<res.data.patients.length;i++) {
//              let todealPatient = {
//                'id': '',
//                'name': '',
//                'gender': '',
//                'address': '',
//                'hospital': '',
//                'referralStatus': '',
//                'referralId': '',
//              };
//              todealPatient.id = res.data.patients[i].Id;
//              todealPatient.name = res.data.patients[i].Name;
//              todealPatient.gender = res.data.patients[i].Gender;
//              todealPatient.address = res.data.patients[i].Resident;
//              todealPatient.hospital = res.data.patients[i].State.HospitalName;
//              todealPatient.referralId = res.data.patients[i].State.ReferralId;
//              if (res.data.patients[i].State.Referral === 'undeal') {
//                todealPatient.referralStatus = '待处理';
//              }
//              this.todealTableData.push(todealPatient);
//            }
//          }else {
//            console.log('this.$http.get(\'/api/receiver/get_todeal_patients\',this.hospitalId) return is not 200');
//          }
//        },(err) => {
//          this.$message.error('初始化未处理病人时请求错误！')
//        });
//      this.$http.get('/api/receiver/get_dealed_patients/hospital01')
//        .then((res) => {
//          if (res.status === 200) {
//            for (var i=0;i<res.data.patients.length;i++) {
//              let dealedPatient = {
//                'id': '',
//                'name': '',
//                'gender': '',
//                'address': '',
//                'hospital': '',
//                'referralStatus': '',
//                'referralId': '',
//              };
//              dealedPatient.id = res.data.patients[i].Id;
//              dealedPatient.name = res.data.patients[i].Name;
//              dealedPatient.gender = res.data.patients[i].Gender;
//              dealedPatient.address = res.data.patients[i].Resident;
//              dealedPatient.hospital = res.data.patients[i].State.HospitalName;
//              dealedPatient.referralId = res.data.patients[i].State.ReferralId;
//              dealedPatient.referralStatus = '已处理';
//              if (res.data.patients[i].State.Referral === 'receive') {
//                dealedPatient.operationStatus = '接受';
//              }else if(res.data.patients[i].State.Referral === 'reject') {
//                dealedPatient.operationStatus = '拒绝';
//              }
//              this.dealedTableData.push(dealedPatient);
//            }
//          }else {
//            console.log('this.$http.get(\'/api/receiver/get_dealed_patients\',this.hospitalId) return is not 200');
//          }
//        },(err) => {
//          this.$message.error('初始化未处理病人时请求错误！')
//        });
      this.$http.get('/api/referralProfileInfo/queryByHospitalId/',this.hospitalId)
        .then((res) => {
          if(res.status === 200) {
            this.todealTableData.length = 0 //clear the todealTableData
            for (let i=0;i<res.data.referralInfo.length;i++) {
              let todealReferral = {
                "Id": res.data.referralInfo[i].Id,
                "State": res.data.referralInfo[i].State,
                "Date": res.data.referralInfo[i].Date,
                "PatientId": res.data.referralInfo[i].PatientId,
                "Name": res.data.referralInfo[i].Name,
                "FromInfo": {
                  "Section": res.data.referralInfo[i].FromInfo.Section,
                  "HospitalName": res.data.referralInfo[i].FromInfo.HospitalName,
                  "Doctor": res.data.referralInfo[i].FromInfo.Doctor,
                  "ReferralType": res.data.referralInfo[i].FromInfo.ReferralType,
                  "IllnessState": res.data.referralInfo[i].FromInfo.IllnessState
                },
              }
              this.todealTableData.push(todealReferral)
            }
          }else {
            console.log('this.$http.get(\'/api/referralProfileInfo/queryByHospitalId/\',this.hospitalId) return is not 200')
          }
        },(err) => {
          this.$message.error('this.$http.get(\'/api/referralProfileInfo/queryByHospitalId/\',this.hospitalId) return error')
          console.log('/api/referralProfileInfo/queryByHospitalId/ err msg is '+err)
        })
    },
    watch: {
      patientInfo (newPaitent){
        if ('Id' in newPaitent) {
          console.log('receive a new patient is',newPaitent);
          var tmpPatient = {
              "Id": newPaitent.Id,
              "State": newPaitent.State,
              "Date": newPaitent.Date,
              "PatientInfo": newPaitent.PatientId,
              "Name": newPaitent.Name,
              "FromInfo": {
                "Section": newPaitent.FromInfo.Section,
                "HospitalName": newPaitent.FromInfo.HospitalName,
                "Doctor": newPaitent.FromInfo.Doctor,
                "ReferralType": newPaitent.FromInfo.ReferralType,
                "IllnessState": newPaitent.FromInfo.IllnessState
              },
          }
          //console.log('tmp patient is',tmpPatient);
//          tmpPatient.id = newPaitent.Id;
//          tmpPatient.name = newPaitent.Name;
//          tmpPatient.gender = newPaitent.Gender;
//          tmpPatient.address = newPaitent.Resident;
//          tmpPatient.hospital = newPaitent.State.HospitalName;
//          tmpPatient.referralStatus = newPaitent.State.Referral;
//          tmpPatient.operationStatus = '待处理';
          console.log('tmp patient now is',tmpPatient);
          this.todealTableData.push({
            "Id": newPaitent.Id,
            "State": newPaitent.State,
            "Date": newPaitent.Date,
            "PatientInfo": newPaitent.PatientId,
            "Name": newPaitent.Name,
            "FromInfo": {
              "Section": newPaitent.FromInfo.Section,
              "HospitalName": newPaitent.FromInfo.HospitalName,
              "Doctor": newPaitent.FromInfo.Doctor,
              "ReferralType": newPaitent.FromInfo.ReferralType,
              "IllnessState": newPaitent.FromInfo.IllnessState
            },
          });
        }else {
          console.log('id not in newPatient');
          return;
        }

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
          //this.$message.error('look'+row.referralId);
          this.clickPatientId = row.PatientId;
          // alert('patient id is '+row.PatientId)
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
        this.$message.error('look'+row.Id);
        this.referralInfo = row.Id;
        this.referralVisible = true
        this.referralState = 'look'

      },
      dealReferral(row) {
        this.$message.error('receive'+row.Id);
        this.referralVisible = true
        this.referralState = 'receive'
        this.referralInfo = row.Id
      },
      reject(){
        console.log('this.referralInfo is ',this.referralInfo)
        this.$message.error('reject' + this.referralInfo);
        for(let i=0;i<this.todealTableData.length;i++){
          if(this.todealTableData[i].Id === this.referralInfo){
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
          if(this.todealTableData[i].Id === this.referralInfo){
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
