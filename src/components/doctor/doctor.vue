<<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 16,offset: 4}">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height:36px;">选择病人进行操作</span>
          <span><el-button id="new_record" @click="handleNew()">新增记录</el-button></span>
        </div>
        <el-table :data="tableData" :default-sort = "{prop: 'update_time', order: 'descending'}" height="500" stripe style="width: 100%">
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
              <!--<el-popover trigger="hover" placement="top">-->
                <!--<p>患病detail</p>-->
                <!--<p>建议detail</p>-->
                <div slot="reference" class="sick-wrapper">
                  <el-button type="text" @click="handleEdit(scope.$index, scope.row)" >{{ scope.row.sick }}</el-button>
                </div>
              <!--</el-popover>-->
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template scope="scope">
              <el-button type="text" @click="showHistory(scope.$index,scope.row)">查看历史病例</el-button>
              <!--<el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <EDITCASE :visible.sync="dialogVisible"  :operation.sync="operation" :edit.sync="sampleData" v-on:update:edit="updateTableData()"></EDITCASE>
        <TimeLine :visible.sync="historyDialogVisible"></TimeLine>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import EDITCASE from './editCase.vue'
import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
import TimeLine from './Timeline.vue'
export default {
  name: 'login',
  components: {
    ElButton,
    EDITCASE,
    TimeLine
  },
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
      }, {
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
      }, {
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
      }, {
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
    handleEdit (index, row) {
      this._data.dialogVisible = true;
//      this._data.sampleData.date = '2015-05-02'
//      this._data.sampleData.name = 'lisa'
//      this._data.sampleData.age = '21'
//      this._data.sampleData.sex = 'feman'
//      this._data.sampleData.sick = 'nothing'
//      this._data.sampleData.address = 'home'
//      console.log(index, row)
//      console.log(row.date,row.name,row.age,row.sex,row.sick,row.address)
      this._data.operation = "edit";
      this._data.sampleData = row
    },
    handleNew () {
      this._data.dialogVisible = true;
      Date.prototype.format = function(format)
      {
        var o = {
          "M+" : this.getMonth()+1, //month
          "d+" : this.getDate(),    //day
          "h+" : this.getHours(),   //hour
          "m+" : this.getMinutes(), //minute
          "s+" : this.getSeconds(), //second
          "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
          "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
          (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
          format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
              ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
      }
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
    updateTableData(){
      this._data.dialogVisible = false;
      if (this._data.operation=="new"){
        this._data.tableData.push(this._data.sampleData)
      }else if (this._data.operation=="edit") {
        ;
      }

    },
    showHistory(index,row){
      this._data.historyDialogVisible = true;
    },
    handleDelete (index, row) {
      console.log(index, row)
      alert('you click delete')
    },
    showSickDetailDialog () {
//      this.dialogVisible = isVisible
      alert("detail")
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-card
    margin-top 80px
    margin-bottom 200px
  .el-input
    margin 12px 0
  .el-button
    width 30%
    margin-top 12px
  .el-menu-item
    margin-top 10px
    margin-left 20px
    font-size  25px
    margin-bottom 10px
  #new_record
    width 10%
    float right
  #multi_delete
    width 10%
    float right
</style>
