<template>
  <el-row class="login">
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
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button> 
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login',
  date () {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },
  methods: {}
}
</script>
