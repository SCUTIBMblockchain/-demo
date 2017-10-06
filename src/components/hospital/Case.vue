<template>
  <div>
    <el-table :data="tableData" height="500" stripe style="width: 100%">
      <el-table-column prop="update_time" label="更新日期" sortable width="150">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>创建日期: {{ scope.row.create_time }}</p>
            <div slot="reference" class="name-wrapper">
              <span style="margin-left: 10px">{{ scope.row.update_time }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="100">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.sex }},{{ scope.row.age }}岁</p>
            <p>住址: {{ scope.row.address }}</p>
            <!--<p>既往病史: {{ scope.row.history }}</p>-->
            <p>过敏原: {{ scope.row.guominyuan }}</p>
            <div slot="reference" class="name-wrapper">
              <label>{{ scope.row.name }}</label>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column property="create_time" label="就诊时间" width="120" ></el-table-column>
      <el-table-column property="hospital" label="就诊医院" width="100"></el-table-column>
      <el-table-column property="end_time" label="出院时间" width="100" ></el-table-column>

      <el-table-column label="患病情况"  width="150">
        <template scope="scope">
          <div slot="reference" class="sick-wrapper">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)" >{{ scope.row.sick }}</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template scope="scope">
          <el-button type="text" @click="showHistory(scope.$index,scope.row)">查看历史病例</el-button>
          <el-button type="text" @click="rejectMove(scope.$index, scope.row)">拒绝转诊</el-button>
          <el-button type="text" @click="acceptMove(scope.$index, scope.row)">接收转诊</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EDITCASE :visible.sync="dialogVisible"  :operation.sync="operation" :edit.sync="sampleData" v-on:update:edit="updateTableData()"></EDITCASE>
    <TimeLine :visible.sync="historyDialogVisible"></TimeLine>
    <h1>{{message}}</h1>
    <h1>{{tableData}}</h1>
  </div>
</template>

<script>
  import EDITCASE from '../doctor/editCase.vue'
  import TimeLine from '../doctor/Timeline.vue'
  export default {
    components: {
      EDITCASE,
      TimeLine
    },
    props: ['message','ws'],
    data() {
      return {
        dialogVisible: false,
        historyDialogVisible: false,
        operation:'',
        sampleData: {create_time:'', update_time:'',name:'',age:'',sex:'',address:'',history:'',guominyuan:'',doctor:'',sick:''},
        table:[],
        cases: [
          {
            start_time: '2017-9-7',
            end_time: '2017-10-1',
            hospital: '协和医院',
            disease: '懒癌'
          }
        ],
      }
    },
    computed:{
      tableData: function () {
        console.log("create in this.message ? ","create_time" in this.message );
        if ("create_time" in this.message) {
          this.table.push(this.message);
          return this.table
        }
      },
    },
    methods: {
      handleEdit(index, row) {
        this._data.dialogVisible = true;
        this._data.operation = "edit";
        this._data.sampleData = row
      },
      updateTableData() {
        this._data.dialogVisible = false;
        if (this._data.operation === "new") {
          this._data.tableData.push(this._data.sampleData)
        } else if (this._data.operation === "edit") {
        }
      },showHistory(index, row) {
        this._data.historyDialogVisible = true;
      },
      acceptMove(index, row) {
        let sendData = {"operation": "accept"};
        this._props.ws.send(JSON.stringify(sendData));
      },
      rejectMove(index, row) {
        let sendData = {"operation": "reject","hospitalId": "hospital01","patientId": "patient01","additionMsg": row};
        this._props.ws.send(JSON.stringify(sendData));
      },
    }
  }
</script>

<style lang="stylus" scoped>
  #new_record
    width 10%
    float right
</style>
