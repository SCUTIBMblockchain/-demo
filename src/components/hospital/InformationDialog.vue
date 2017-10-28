<template>
  <div id="information dialog">
    <el-dialog
      title="查看信息"
      size="large"
      @open="beforeOpen"
      :close-on-press-escape="false"
      :before-close="beforeClose"
      :visible="selfVisible">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="病人基本信息" name="1">
          <el-form>
            <el-row :gutter="50">
              <el-col :span="4">
                <el-form-item label="姓名">
                  <el-input placeholder="姓名" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="病人 id">
                  <el-input placeholder="id" :value="this.selfPatientId" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="性别">
                  <el-input placeholder="性别" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="年龄">
                  <el-input placeholder="年龄" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="民族">
                  <el-input placeholder="民族" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="联系电话">
                  <el-input placeholder="联系电话" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="50">
              <el-col :span="4">
                <el-form-item label="居住地">
                  <el-input placeholder="居住地" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="身份证">
                  <el-input placeholder="身份证" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="婚姻状态">
                  <el-input placeholder="婚姻状态" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="籍贯">
                  <el-input placeholder="籍贯" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="职业">
                  <el-input placeholder="职业" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">

              </el-col>
            </el-row>
          </el-form>
          <hr>
          <label>亲属</label>
          <el-form>
            <el-row :gutter="50">
              <el-col :span="4">
                <el-form-item label="亲属姓名">
                  <el-input placeholder="亲属姓名" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="亲属联系电话">
                  <el-input placeholder="亲属联系电话" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="与病人关系">
                  <el-input placeholder="关系" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <hr>
          <label>不良嗜好</label>
          <el-form>
            <el-row :gutter="50">
              <el-col :span="4">
                <el-form-item label="抽烟">
                  <el-input placeholder="抽烟" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="嗜酒">
                  <el-input placeholder="嗜酒" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <hr>
          <label>病史</label>
          <el-form>
            <el-row :gutter="50">
              <el-col :span="4">
                <el-form-item label="过敏原">
                  <el-input placeholder="过敏原" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="感染病史">
                  <el-input placeholder="感染病史" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="遗传病史">
                  <el-input placeholder="遗传病史" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <hr>
          <label>状态</label>
          <el-form :inline="true">
            <el-row :gutter="50">
              <el-col :span="4">
                <el-form-item label="当前医院">
                  <el-input placeholder="当前医院" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="转诊状态">
                  <el-input placeholder="转诊状态" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="病例信息" name="2">
          <el-table :data="tableData"  ref="referralTable" @cell-click="handleCellClick" height="300" width="1050"  >
            <el-table-column label="id" prop="id" width="100">
            </el-table-column>
            <el-table-column label="时间" prop="time" width="100">
            </el-table-column>
            <el-table-column label="就诊医院" prop="hospital" width="100">
            </el-table-column>
            <el-table-column label="医生" prop="doctor">
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
    <Case :caseVisible="caseVisible" :caseId="clickRowId" @updateCaseVisible="updateCaseVisible"></Case>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  import ElRow from "element-ui/packages/row/src/row";
  import Case from "./Case.vue"
  export default {
    components: {
      ElRow,
      ElInput,
      ElCol,
      ElFormItem,
      ElForm,
      Case,
    },
    props: ['InfoDialogVisible','patientId'],
  data() {
    return {
      selfVisible: this.InfoDialogVisible,
      caseVisible: false,
      activeNames: ['1',],
      selfPatientId: this.patientId,
      tableData: [{'id': '120417',
      'time': '2017',
      'hospital': 'hospitalA',
      'doctor': '刘威',
      }],
      clickRowId: '',
    };
  },
  watch: {
    InfoDialogVisible (val) {
        this.selfVisible = val;
    },
    patientId (val) {
      this.selfPatientId = val;
    }
  },
  methods: {
    beforeOpen() {

    },
    beforeClose() {
      this.$emit('updateDialogVisible',false);
    },
    handleCellClick(row,event) {
      //console.log(row)
      this.clickRowId = row.id;
      this.caseVisible = true;
      this.InfoDialogVisible = false
    },
    updateCaseVisible(val){
      this.caseVisible = val;
      this.InfoDialogVisible = true
    }
  },
}
</script>

