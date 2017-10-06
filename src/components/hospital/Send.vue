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
              <!--<p>既往病史: {{ scope.row.history }}</p>-->
              <p>过敏原: {{ scope.row.guominyuan }}</p>
              <div slot="reference" class="name-wrapper">
                <label>{{ scope.row.name }}</label>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <!--<el-table-column label="既往病史" width="100">-->
          <!--<template scope="scope">-->
            <!--<div slot="reference" class="age-wrapper">-->
              <!--<label>{{ scope.row.history }}</label>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
    props: ['sendVisible','sendLogs','ws','sendData'],
    data() {
      return {
        dialogVisible: false,
        historyDialogVisible: false,
        operation:'',
        sampleData: {create_time:'', update_time:'',name:'',age:'',sex:'',address:'',guominyuan:'',doctor:'',sick:'',detail_sick:''},
        tableData: [{
          create_time: '2016-05-01',
          update_time: '2016-05-02',
          name: 'mike',
          age: '25',
          sex: '男',
          address: 'guangzhou',
          //history: '无',
          guominyuan: '无',
          doctor: '黄品超',
          sick: '感冒',
          detail_sick: '体温39',
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        this._data.dialogVisible = true;
        this._data.operation = "edit";
        this._data.sampleData = row;
        this._props.sendLogs += '\nediting a case';
        this.$emit('update:sendLogs', this._props.sendLogs);
      },
      handleNew() {
        this._data.dialogVisible = true;
        this._props.sendLogs += '\ncreating a new case';
        this.$emit('update:sendLogs', this._props.sendLogs);
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
          //history: '',
          guominyuan: '',
          doctor: '',
          sick: '',
          detail_sick: '',
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
        this._props.sendLogs += '\ndeleting a case';
        this.$emit('update:sendLogs', this._props.sendLogs);
        this._data.tableData.splice(index, 1);
      },
      handleMove(index, row) {
        /*
        * '后台A：接收到转诊请求，对内容解码', 'fabric：验证请求用户权限', 'fabric：执行查询的chaincode，返回查询结果',
          '后台A：接收到查询结果，向对应服务器建立连接', '后台A：向后台B发送转诊信息', '后台B：接收到转诊信息，向fabric查询病人信息', 'fabric：验证请求用户权限',
          'fabric：执行查询的chaincode，返回查询结果', '后台B：打包查询结果和其余信息，发送给医院B', '医院B：接收到转诊请求，同意转诊，并提交附加信息',
          '后台B：接收到处理结果，将结果和附加信息发送给后台A', '后台A：接收到处理结果，将结果和附加信息发送给医院A'
        * */
        let win = this;
        let totalLogs = ['医院A：发送转诊请求','other msg' ];
        let timer = setInterval(function () {
          let logItem = totalLogs.shift();
          if (logItem === undefined) {
            clearInterval(timer);
            return;
          }
          addLogs(logItem);
        }, 1000);

        function addLogs(logMsg) {
          win._props.sendLogs += '\n';
          win._props.sendLogs += logMsg;
          win.$emit('update:sendLogs', win._props.sendLogs);
        }

        win._props.sendData = row;
        win.$emit('update:sendData', win._props.sendData);
        let sendData = {"operation": "send", "hospitalId": "hospital01", "patientId": "patient01", "additionMsg": row};
        console.log('in send ws is ', win._props.ws);
        win._props.ws.send(JSON.stringify(sendData));
        win.handleDelete(index, row);
//        let myws = new WebSocket('ws://localhost:8889/referral/request');
//        myws.onopen = function (event) {
//          //console.log('doctor client open');
//          //myws.send('move' + index + row)
//          let sendData = {"hospitalId": "hospital01","patientId": "patient01","additionMsg": row};
//          myws.send(JSON.stringify(sendData));
//        };
//        myws.onmessage = function (event) {
//          console.log('doctor client gets message');
//          console.log(event.data);
//          win.$message({
//            type: 'success',
//            message: event.data
//          });
//          win.handleDelete(index, row)
//        };
//      }
      },
    }
  }
</script>

<style lang="stylus" scoped>
  #new_record
    width 10%
    float right
</style>
