<<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 16,offset: 4}">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height:36px;">选择病人进行操作</span>
        </div>
        <el-table :data="tableData" height="500" stripe style="width: 100%">
          <el-table-column label="日期" width="150">
            <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="100">
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <label>{{ scope.row.name }}</label>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="年龄" width="80">
            <template scope="scope">
              <div slot="reference" class="age-wrapper">
                  <label>{{ scope.row.age }}</label>
                </div>
              </template>
          </el-table-column>
          <el-table-column label="性别" width="80">
            <template scope="scope">
              <div slot="reference" class="sex-wrapper">
                  <label>{{ scope.row.sex }}</label>
                </div>
              </template>
          </el-table-column>
          <el-table-column label="地址" width="250">
            <template scope="scope">
              <!--<el-popover trigger="hover" placement="top">-->
                <!--<p>住址: {{ scope.row.address }}</p>-->
                <div slot="reference" class="address-wrapper">
                  <label>{{ scope.row.address }}</label>
                </div>
              <!--</el-popover>-->
            </template>
          </el-table-column>
          <el-table-column label="患病" width="100">
            <template scope="scope">
              <!--<el-popover trigger="hover" placement="top">-->
                <!--<p>患病detail</p>-->
                <!--<p>建议detail</p>-->
                <div slot="reference" class="sick-wrapper">
                  <el-button type="text" @click="showSickDetailDialog()" >{{ scope.row.sick }}</el-button>
                </div>
              <!--</el-popover>-->
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template scope="scope">
              <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <EDITCASE :visible.sync="dialogVisible" :edit.sync="sampleData"></EDITCASE>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import EDITCASE from './editCase.vue'
export default {
  name: 'login',
  components: {EDITCASE},
  data() {
    return {
      dialogVisible: false,
      sampleData: {date:'',name:'',age:'',sex:'',sick:'',address:''},
      tableData: [{
        date: '2016-05-02',
        name: '王小虎1号',
        age: '22',
        sex: '男',
        sick: '感冒',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        age: '22',
        sex: '男',
        sick: '感冒',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        age: '22',
        sex: '男',
        sick: '感冒',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        age: '22',
        sex: '男',
        sick: '感冒',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  },
  methods: {
    handleEdit (index, row) {
      this._data.dialogVisible = true
//      this._data.sampleData.date = '2015-05-02'
//      this._data.sampleData.name = 'lisa'
//      this._data.sampleData.age = '21'
//      this._data.sampleData.sex = 'feman'
//      this._data.sampleData.sick = 'nothing'
//      this._data.sampleData.address = 'home'
//      console.log(index, row)
//      console.log(row.date,row.name,row.age,row.sex,row.sick,row.address)
      this._data.sampleData = row
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
</style>
