<template>
  <el-col  :span="22" :offset="1" v-show="sendVisible">
    <el-card class="box-card">
      <h1>未转诊</h1>
      <el-table :data="undealTableData" :row-class-name="tableRowClassName" @cell-click="handleCellClick" height="300" width="1050"  >
        <el-table-column label="id" prop="id" width="100">
        </el-table-column>
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
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" @click="createReferral(scope.row)">生成转诊单</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        <el-table-column label="就诊医院" prop="hospital" width="200">
        </el-table-column>
        <el-table-column label="转诊状态" prop="referralStatus">
        </el-table-column>
      </el-table>
      <h1>处理历史</h1>
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
    <ReferralProfile :referralVisible="referralVisible" :state.sync = "referralState" :ws = "ws" :info = 'referralInfo' @updateReferralVisible="referralVisible=false" @updateReferralPatientId="movePatientFromUndeal"></ReferralProfile>
  </el-col>
</template>

<script>
  import InformationDialog from './InformationDialog'
  import ReferralProfile from './ReferralPorfile.vue'
  export default {
    components: {
      InformationDialog,
      ReferralProfile
    },
    props: ['sendVisible','patientInfo','ws'],
    data() {
      return {
        dialogVisible: false,
        referralVisible: false,
        referralState: 'send',
        referralInfo: null,
        clickPatientId: '',
        hospitalId: 'hospital01',
        undealTableData: [ /* {
        referralPatient:{},
        undealTableData: [{
          'id': 'patient01',
          'name': '赵镇洪',
          'gender': '男',
          'address': '广东省广州市番禹区番禺小区4栋471号',
          'hospital': '广东省人民医院',
          'referralStatus': '未处理',
        },{
          'id': 'patient02',
          'name': '林欣军',
          'gender': '男',
          'address': '广东省广州市天河区朝霞园1栋122号',
          'hospital': '广东省人民医院',
          'referralStatus': '被拒绝',
        },{
          'id': 'patient03',
          'name': '何树镇',
          'gender': '男',
          'address': '广东省广州市番禹区北海路工业园C栋2号',
          'hospital': '广东省人民医院',
          'referralStatus': '未处理',
        }*/],
        todealTableData: [/* {
          'id': 'patient08',
          'name': '刘欣',
          'gender': '女',
          'address': '广东省佛山市狮山站狮山公园区7栋82号',
          'hospital': '广东省人民医院',
          'referralStatus': '未处理',
        },{
          'id': 'patient06',
          'name': '谢家腾',
          'gender': '男',
          'address': '广东省佛山市区盐步工业园C栋412号',
          'hospital': '广东省人民医院',
          'referralStatus': '未处理',
        },{
          'id': 'patient10',
          'name': '陈玉语',
          'gender': '女',
          'address': '广东省广州市番禹区大石街道办662号',
          'hospital': '广东省人民医院',
          'referralStatus': '未处理',
        }*/ ],
        dealedTableData: [/* {
          'id': 'patient31',
          'name': '蔡文馨',
          'gender': '女',
          'address': '广东省广州市番禹区荔联街道202号',
          'hospital': '华南理工大学附属医院',
          'referralStatus': '被接受',
          'operationStatus': '对方接受',
        },{
          'id': 'patient22',
          'name': '马骏偕',
          'gender': '男',
          'address': '广东省广州市番禹区小谷围街道办331号',
          'hospital': '华南理工大学附属医院',
          'referralStatus': '被拒绝',
          'operationStatus': '对方拒绝',
        },{
          'id': 'patient26',
          'name': '木裕',
          'gender': '男',
          'address': '广东省广州市番禹区麻涌镇城中村582号',
          'hospital': '华南理工大学附属医院',
          'referralStatus': '被接受',
          'operationStatus': '对方接受',
        }*/ ],
      }
    },
    mounted: function() {
      this.$http.get('/api/sender/get_undeal_patients/hospital02')
        .then((res) => {
          if(res.status === 200) {
            // alert(res.data);
            for (var i=0;i<res.data.patients.length;i++){
              let undealPatient = {
                'id': '',
                'name': '',
                'gender': '',
                'address': '',
                'hospital': '',
                'referralStatus': '',
              };
              undealPatient.id = res.data.patients[i].Id;
              undealPatient.name = res.data.patients[i].Name;
              undealPatient.gender = res.data.patients[i].Gender;
              undealPatient.address = res.data.patients[i].Resident;
              undealPatient.hospital = res.data.patients[i].State.HospitalName;
              if(res.data.patients[i].State.Referral === 'normal'){
                undealPatient.referralStatus = '未转诊';
              }
              this.undealTableData.push(undealPatient);
            }
          }else {
            alert('初始化未处理病人时失败!')
          }
        }, (eor) => {
          this.$message.error('初始化未处理病人时请求错误！')
        });
      this.$http.get('/api/sender/get_todeal_patients/hospital02')
        .then((res) => {
          if(res.status === 200) {
            // alert(res.data);
            for (let i=0;i<res.data.patients.length;i++){
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
              if(res.data.patients[i].State.Referral === 'undeal'){
                todealPatient.referralStatus = '待处理';
              }
              this.todealTableData.push(todealPatient);
            }
          }else {
            alert('初始化待处理病人时失败!')
          }
        }, (eor) => {
          this.$message.error('初始化待处理病人时请求错误！')
        });
      this.$http.get('/api/sender/get_dealed_patients/hospital02')
        .then((res) => {
          if(res.status === 200) {
            console.log(res.data);
            for (let i=0;i<res.data.patients.length;i++){
              let dealedPatient = {
                'id': '',
                'name': '',
                'gender': '',
                'address': '',
                'hospital': '',
                'referralStatus': '',
                'operationStatus': '',
              };
              dealedPatient.id = res.data.patients[i].Id;
              dealedPatient.name = res.data.patients[i].Name;
              dealedPatient.gender = res.data.patients[i].Gender;
              dealedPatient.address = res.data.patients[i].Resident;
              dealedPatient.hospital = res.data.patients[i].State.HospitalName;
              if(res.data.patients[i].State.Referral === 'receive'){
                dealedPatient.referralStatus = '已处理';
                dealedPatient.operationStatus = '对方接受';
              }else if(res.data.patients[i].State.Referral === 'reject'){
                dealedPatient.referralStatus = '已处理';
                dealedPatient.operationStatus = '对方拒绝';
              }
              this.dealedTableData.push(dealedPatient);
            }
          }else {
            alert('初始化已处理病人时失败!')
          }
        }, (eor) => {
          this.$message.error('初始化已处理病人时请求错误！')
        });
    },
    watch: {
      patientInfo(newPatient){
        if('id' in newPatient){
          ;//pass
        }else {
          console.log('id not in new Patients');
          return;
        }
        let tmpPatient = {
          'id': '',
          'name': '',
          'gender': '',
          'address': '',
          'hospital': '',
          'referralStatus': '',
          'operationStatus': '',
        };
        tmpPatient.id = newPatient.Id;
        tmpPatient.name = newPatient.Name;
        tmpPatient.gender = newPatient.Gender;
        tmpPatient.address = newPatient.Resident;
        tmpPatient.hospital = newPatient.State.HospitalName;
        if(newPatient.State.Referral === 'reject'){
          tmpPatient.referralStatus = '被拒绝';
        }
        this.undealTableData.push(tmpPatient);
      }
    },
    methods: {
      tableRowClassName(row,index) {
        if(row.referralStatus === '未转诊'){
          return 'info-row'
        } else if (row.operationStatus === '对方拒绝') {
          return 'negative-row';
        }else if(row.operationStatus === '对方接受') {
          return 'positive-row';
        }
        return '';
      },
      handleCellClick(row,event) {
        if(event.label === '操作') {
          //this.showReferralCase(row.id)
        }else {
          this.clickPatientId = row.id;
          this.dialogVisible = true;
        }
      },
      showReferral (row) {
        this.referralVisible = true
        this.referralState = 'look'
        this.referralInfo = row.id
      },
      showReferralCase(rowId){
        //console.log('calling referral case');
        //console.log('row',row)
        //alert('row id is ' + rowId)
      },
      updateDialogVisible(val){
        this.dialogVisible = val;
      },
      movePatientFromUndeal(){
        let id = this.referralInfo
        console.log('calling the emit event function');
        console.log('id is ',id);
        for(let i=0;i<this.undealTableData.length;i++){
          if(this.undealTableData[i].id === id){
            let p = this.undealTableData.splice(i, 1);
            console.log('p is',p[0]);
            //p.referralStatus = '待处理';
            console.log(typeof(p[0]));
            p[0].referralStatus = '未处理'
            this.todealTableData.push(p[0]);
          }
        }
        console.log('after calling');
      },
      createReferral(row) {
        this.referralState = 'send';
        this.referralVisible = true;
        this.referralInfo = row.id
      },
//      handleNew() {
//
//        this._data.dialogVisible = true;
//        this._props.sendLogs += '\ncreating a new case';
//        this.$emit('update:sendLogs', this._props.sendLogs);
//        Date.prototype.format = function (format) {
//          var o = {
//            "M+": this.getMonth() + 1, //month
//            "d+": this.getDate(),    //day
//            "h+": this.getHours(),   //hour
//            "m+": this.getMinutes(), //minute
//            "s+": this.getSeconds(), //second
//            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
//            "S": this.getMilliseconds() //millisecond
//          }
//          if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
//            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//          for (var k in o) if (new RegExp("(" + k + ")").test(format))
//            format = format.replace(RegExp.$1,
//              RegExp.$1.length === 1 ? o[k] :
//                ("00" + o[k]).substr(("" + o[k]).length));
//          return format;
//        };
//        let tmp = {
//          create_time: new Date().format("yyyy-MM-dd"),
//          receive_time: new Date().format("yyyy-MM-dd"),
//          name: '',
//          age: '',
//          sex: '男',
//          address: '',
//          //history: '',
//          guominyuan: '',
//          doctor: '',
//          sick: '',
//          detail_sick: '',
//        };
//        this._data.operation = "new";
//        this._data.sampleData = tmp
//      },
//      updateTableData() {
//        this._data.dialogVisible = false;
//        if (this._data.operation === "new") {
//          this.table.push(this._data.sampleData)
//        } else if (this._data.operation === "edit") {
//
//        }
//      },
//      showHistory(index, row) {
//        this._data.historyDialogVisible = true;
//      },
//      handleDelete(index, row) {
//        this._props.sendLogs += '\ndeleting a case';
//        this.$emit('update:sendLogs', this._props.sendLogs);
//        this.table.splice(index, 1);
//      },
//      handleMove(index, row) {
//        let win = this;
//        let totalLogs = ['医院A：发送转诊请求','后台A：接收到转诊请求，对内容解码', 'fabric：验证请求用户权限', 'fabric：执行查询的chaincode，返回查询结果',
//          '后台A：接收到查询结果，向对应服务器建立连接', '后台A：向后台B发送转诊信息', '后台B：接收到转诊信息，向fabric查询病人信息', 'fabric：验证请求用户权限',
//          'fabric：执行查询的chaincode，返回查询结果', '后台B：打包查询结果和其余信息，发送给医院B', '医院B：接收到转诊请求，同意转诊，并提交附加信息',
//          '后台B：接收到处理结果，将结果和附加信息发送给后台A', '后台A：接收到处理结果，将结果和附加信息发送给医院A' ];
//        let timer = setInterval(function () {
//          let logItem = totalLogs.shift();
//          if (logItem === undefined) {
//            clearInterval(timer);
//            return;
//          }
//          addLogs(logItem);
//        }, 1000);
//
//        function addLogs(logMsg) {
//          win._props.sendLogs += '\n';
//          win._props.sendLogs += logMsg;
//          win.$emit('update:sendLogs', win._props.sendLogs);
//        }
//
//        win._props.sendData = row;
//        win.$emit('update:sendData', win._props.sendData);
//        let sendData = {"operation": "send", "hospitalId": "hospital01", "patientId": "patient01", "additionMsg": row};
//        console.log('in send ws is ', win._props.ws);
//        win._props.ws.send(JSON.stringify(sendData));
//        win.handleDelete(index, row);
////        let myws = new WebSocket('ws://localhost:8889/referral/request');
////        myws.onopen = function (event) {
////          //console.log('doctor client open');
////          //myws.send('move' + index + row)
////          let sendData = {"hospitalId": "hospital01","patientId": "patient01","additionMsg": row};
////          myws.send(JSON.stringify(sendData));
////        };
////        myws.onmessage = function (event) {
////          console.log('doctor client gets message');
////          console.log(event.data);
////          win.$message({
////            type: 'success',
////            message: event.data
////          });
////          win.handleDelete(index, row)
////        };
////      }
//      },
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
