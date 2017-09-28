<template>
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
          <p>既往病史: {{ scope.row.history }}</p>
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
        <el-button type="text" @click="handleDelete(scope.$index, scope.row)">拒绝转诊</el-button>
        <el-button type="text" @click="handleMove(scope.$index, scope.row)">接收转诊</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
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
        }],
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
    methods: {

    }
  }
</script>
