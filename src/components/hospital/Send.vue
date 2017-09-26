<template>
  <el-col  :span="19" :offset="1" v-show="sendVisible">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height:36px;">选择病人进行操作</span>
        <span><el-button id="new_record" @click="handleNew()">新增记录</el-button></span>
      </div>
      <el-table :data="tableData"  height="500" stripe style="width: 100%">
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
              <p>既往病史: {{ scope.row.history }}</p>
              <p>过敏原: {{ scope.row.guominyuan }}</p>
              <div slot="reference" class="name-wrapper">
                <label>{{ scope.row.name }}</label>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="既往病史" width="100">
          <template scope="scope">
            <div slot="reference" class="age-wrapper">
              <label>{{ scope.row.history }}</label>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="过敏原" width="80">
          <template scope="scope">
            <div slot="reference" class="sex-wrapper">
              <label>{{ scope.row.guominyuan }}</label>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="负责医生" width="100">
          <template scope="scope">
            <div slot="reference" class="address-wrapper">
              <label>{{ scope.row.doctor }}</label>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="患病情况"  width="250">
          <template scope="scope">
            <div slot="reference" class="sick-wrapper">
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)" >{{ scope.row.sick }}</el-button>
            </div>
            <!--</el-popover>-->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="350">
          <template scope="scope">
            <el-button type="text" @click="showHistory(scope.$index,scope.row)">查看历史病例</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" @click="handleMove(scope.$index, scope.row)">转诊</el-button>
          </template>
        </el-table-column>
      </el-table>
      <EDITCASE :visible.sync="dialogVisible"  :operation.sync="operation" :edit.sync="sampleData" v-on:update:edit="updateTableData()"></EDITCASE>
      <TimeLine :visible.sync="historyDialogVisible"></TimeLine>
    </el-card>
  </el-col>
</template>

<script>
  import EDITCASE from '../doctor/editCase.vue'
  import TimeLine from '../doctor/Timeline.vue'

  export default {
    components: {
      EDITCASE,
      TimeLine,
    },
    props: ['sendVisible'],
    data() {
      return {
        dialogVisible: false,
        historyDialogVisible: false,
        operation:'',
        sampleData: {create_time:'', update_time:'',name:'',age:'',sex:'',address:'',history:'',guominyuan:'',doctor:'',sick:''},
        tableData: [{
          create_time: '2016-05-01',
          update_time: '2016-05-02',
          name: '王小虎1号',
          age: '22',
          sex: '男',
          address: '上海市普陀区金沙江路 1518 弄',
          history: '无',
          guominyuan: '无',
          doctor: '黄品超',
          sick: '感冒'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        this._data.dialogVisible = true;
        this._data.operation = "edit";
        this._data.sampleData = row
      },
      handleNew() {
        this._data.dialogVisible = true;
        Date.prototype.format = function (format) {
          var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(),    //day
            "h+": this.getHours(),   //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
            "S": this.getMilliseconds() //millisecond
          }
          if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
              RegExp.$1.length === 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
          return format;
        };
        let tmp = {
          create_time: new Date().format("yyyy-MM-dd"),
          update_time: new Date().format("yyyy-MM-dd"),
          name: '',
          age: '',
          sex: '男',
          address: '',
          history: '',
          guominyuan: '',
          doctor: '',
          sick: ''
        };
        this._data.operation = "new";
        this._data.sampleData = tmp
      },
      updateTableData() {
        this._data.dialogVisible = false;
        if (this._data.operation === "new") {
          this._data.tableData.push(this._data.sampleData)
        } else if (this._data.operation === "edit") {

        }
      },
      showHistory(index, row) {
        this._data.historyDialogVisible = true;
      },
      handleDelete(index, row) {
        this._data.tableData.splice(index, 1);
      },
      handleMove(index, row) {
        let win = this;
        let myws = new WebSocket('ws://localhost:4000/ws');
        myws.onopen = function (event) {
          console.log('doctor client open');
          let jsonData = {"operation":"send","object":row};
          console.log(jsonData);
          myws.send(JSON.stringify(jsonData));
        };
        myws.onmessage = function (event) {
          console.log('doctor client gets message');
          console.log(event.data);
          win.$message({
            type: 'success',
            message: event.data
          });
          win.handleDelete(index, row)
        };
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #new_record
    width 10%
    float right
</style>
