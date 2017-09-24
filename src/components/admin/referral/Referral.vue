<template>
  <el-dialog title="详细信息" :visible.sync="visible" @close="update()"  >
    <el-form ref="form" :model="form" label-width="80px" style="width: 100%;"></el-form>
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
    }
  }
}
</script>
