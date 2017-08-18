<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height:36px;">Please sign in</span>
        </div>
        <el-form ref="form" :model="form" label-position="top">
          <el-form-item label="账号"  required="ture">
            <el-input v-model="form.account" placeholder="请输入账号" type="text"></el-input>         
          </el-form-item>
          <el-form-item label="密码" required="ture">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input> 
          </el-form-item>
          <el-form-item label="角色" required="ture">
            <el-select v-model="form.role" placeholder="请选择角色">
              <el-option label="学生" value="student"></el-option>
              <el-option label="教师" value="instructor"></el-option>
              <el-option label="管理员" value="admin"></el-option>
            </el-select> 
          </el-form-item>
          <el-form-item>
            <el-button type="primary">登录</el-button> 
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default{
    name: 'hello',
    data () {
      return {
        form: {
          account: '',
          password: '',
          role: 'student'
        }
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
    width 100%
    margin-top 12px
  .el-menu-item
    margin-top 10px
    margin-left 20px
    font-size  25px
    margin-bottom 10px
</style>