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
        <el-table-column label="家庭住址" prop="address" width="100">
        </el-table-column>
        <el-table-column label="就诊医院" prop="hospital" width="100">
        </el-table-column>
        <el-table-column label="转诊状态" prop="referralStatus" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" @click="acceptReferral(scope.row)">接受</el-button>,
            <el-button type="text" @click="rejectReferral(scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h1>已处理</h1>
      <el-table :data="dealedTableData" :row-class-name="tableRowClassName" @cell-click="handleCellClick" height="300" width="1050"  >
        <template>
          <el-table-column label="id" prop="id" width="100">
          </el-table-column>
        </template>
        <el-table-column label="病人姓名" prop="name" width="100">
        </el-table-column>
        <el-table-column label="性别" prop="gender" width="100">
        </el-table-column>
        <el-table-column label="家庭住址" prop="address" width="100">
        </el-table-column>
        <el-table-column label="就诊医院" prop="hospital" width="100">
        </el-table-column>
        <el-table-column label="转诊状态" prop="referralStatus" width="100">
        </el-table-column>
        <el-table-column label="操作状态" prop="operationStatus">
        </el-table-column>
      </el-table>
    </el-card>
    <InformationDialog :InfoDialogVisible="dialogVisible" @updateDialogVisible="updateDialogVisible"></InformationDialog>

  </el-col>
</template>

<script>
  import InformationDialog from './InformationDialog.vue'
  import ElCol from 'element-ui/packages/col/src/col'
  import Case from './Case.vue'
  export default {
    components: {
      Case,
      InformationDialog
    },
    props: ['receiveVisible','ws'],
    data () {
      return {
        caseListVisible: false,
        referralVisible: false,
        dialogVisible: false,
        todealTableData: [{
          'id': '2011',
          'name': 'jack',
          'gender': 'man',
          'address': 'home',
          'hospital': 'hospitalA',
          'referralStatus': '未处理'
        }, {
          'id': '2011',
          'name': 'jack',
          'gender': 'man',
          'address': 'home',
          'hospital': 'hospitalA',
          'referralStatus': '未处理'
        }, {
          'id': '2011',
          'name': 'jack',
          'gender': 'man',
          'address': 'home',
          'hospital': 'hospitalA',
          'referralStatus': '未处理'
        }],
        dealedTableData: [{
          'id': '2011',
          'name': 'jack',
          'gender': 'man',
          'address': 'home',
          'hospital': 'hospitalA',
          'referralStatus': '已处理',
          'operationStatus': '接受'
        }, {
          'id': '2011',
          'name': 'jack',
          'gender': 'man',
          'address': 'home',
          'hospital': 'hospitalA',
          'referralStatus': '已处理',
          'operationStatus': '拒绝'
        }, {
          'id': '2011',
          'name': 'jack',
          'gender': 'man',
          'address': 'home',
          'hospital': 'hospitalA',
          'referralStatus': '已处理',
          'operationStatus': '接受'
        }]
      }
    },
    methods: {
      tableRowClassName (row ,index) {
        if (row.referralStatus === '未处理') {
          return 'info-row'
        } else {
          if (row.operationStatus === '拒绝') {
            return 'negative-row'
          } else if (row.operationStatus === '接受') {
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
          this.dialogVisible = true;
        }
      },
      acceptReferral(row){
      console.log(row.id,'accept')
      },
      rejectReferral(row) {
        console.log(row.id,'reject')
      },
      showReferralCase (rowId) {
        alert('row id is' + rowId)
      },
      updateDialogVisible (val) {
        this.dialogVisible = val
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
