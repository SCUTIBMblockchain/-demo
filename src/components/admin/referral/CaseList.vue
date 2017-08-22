<template>
    <el-dialog title="课程班级信息" :visible.sync="visible" @close="update()"  >
        <el-table ref="MyTable" highlight-current-row  @current-change="handleCurrentChange" :data="cases">
          <el-table-column property="start_time" label="就诊时间" width="200" ></el-table-column>
          <el-table-column property="hospital" label="就诊医院" width="100"></el-table-column>
          <el-table-column property="disease" label="疾病" width="200" ></el-table-column>
          <el-table-column property="end_time" label="出院时间" width="200" ></el-table-column>
          <el-table-column  label="操作" fixed="right" >
              <template scope="scope">
                <el-button @click="handleShow(scope.$index)" type="text" size="small">查看详情</el-button>
              </template> 
            </templeate>
          </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
export default {
  props: ['visible'],
  data () {
    return {
      cases: [
        {
          start_time: '2017-9-7',
          end_time: '2017-10-1',
          hospital: '协和医院',
          disease: '懒癌'
        }
      ],
      currentRow: null
    }
  },
  computed: {
  },
  methods: {
    update () {
      this.$emit('update:visible', false)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleShow (index) {
      console.log(this.section)
    }
  }
}
</script>