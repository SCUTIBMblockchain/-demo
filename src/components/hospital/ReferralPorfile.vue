<template>
  <el-dialog title='转诊单' :visible.sync='referralVisible' :before-close="beforeClose" @update:visible='referralStateChange'>
    <span>
       <el-row>
        <el-col :span="5">
            <p>转诊单号: {{ form.Id }}</p>
        </el-col>
        <el-col :span="4">
            <p>创建日期: {{form.Date}}</p>
        </el-col>
        <el-col :offset="11" :span="4" v-show="state==='look'">
            <p>状态: {{this.form.State}}</p>
        </el-col>
      </el-row>
      <hr>
      <el-form ref='patientInfo' :model='form' label-width='80px'>
        <el-row>
          <el-col :span="5">
            <el-form-item label='病人姓名'>
              <el-input v-model='form.Name' :disabled='true'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label='性别' label-width='50px'>
              <el-input v-model='form.Gender' :disabled='true'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label='年龄' label-width='50px'>
              <el-input v-model='form.Age' :disabled='true'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label='民族' label-width='50px'>
              <el-input v-model='form.Nationality' :disabled='true'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label='职业' label-width='50px'>
              <el-input v-model='form.Occupation' :disabled='true'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label='身份证号'>
              <el-input v-model='form.PIN' :disabled='true'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label='籍贯' label-width='50px'>
              <el-input v-model='form.Birthplace' :disabled='true'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label='联系方式'>
              <el-input v-model='form.Phone' :disabled='true'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label='住址' label-width='50px'>
              <el-input v-model='form.Resident' :disabled='true'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span v-show='fromVisiable'>
        <hr>
        <el-form ref='fromInfo' :model='form.FromInfo' label-width='80px'>
          <el-row>
            <el-col :span="7">
              <el-form-item label='转往医院' placeholder='请输入转诊医院的名称'>
                <el-input v-model='form.FromInfo.HospitalName' :disabled='fromDisable'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label='费用类型'>
                <el-select v-model='form.FromInfo.PayWay' placeholder='请选择支付方式' :disabled='fromDisable'>
                  <el-option label='医保' value='医保'></el-option>
                  <el-option label='农合' value='农合'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label='转诊目的'>
                <el-input v-model='form.FromInfo.ReferralType' placeholder='请选择转诊目的' :disabled='fromDisable'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label='诊疗科室'>
                <el-input v-model='form.FromInfo.Section' :disabled='fromDisable'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label='诊疗医生'>
                <el-input v-model='form.FromInfo.Doctor' :disabled='fromDisable'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label='联系电话'>
                <el-input v-model='form.FromInfo.Phone' :disabled='fromDisable'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <el-form-item label='病情简介和注意事项' label-width='150px' >
                <el-input type='textarea' v-model='form.FromInfo.IllnessState'  :disabled='fromDisable'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <el-form-item label='患病家属要求' label-width='150px' >
                <el-input type='textarea' v-model='form.FromInfo.RelationDemand' :disabled='fromDisable'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </span>
      <span v-show='toVisiable'>
        <hr>
        <el-form ref='toInfo' :model='form.ToInfo' label-width='80px'>
          <el-row>
            <el-col :span="5">
              <el-form-item label='接诊科室'>
                <el-input v-model='form.ToInfo.Section' :disabled='toDisable'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label='接诊医生'>
                <el-input v-model='form.ToInfo.Doctor' :disabled='toDisable'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label='联系电话'>
                <el-input v-model='form.ToInfo.Phone' :disabled='toDisable'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </span>
      <span v-show="state=='look'&&form.State=='reject'">
        <hr>
        <el-form ref='fromInfo' :model='form' label-width='80px'>
          <el-row>
            <el-col :span="15">
              <el-form-item label='拒绝理由' label-width='80px' >
                <el-input type='textarea' v-model='form.RejectReason' :disabled='fromDisable'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </span>
    </span>
    <span slot='footer' class='dialog-footer' v-show='sendVisiable'>
    <el-button @click='beforeClose'>取 消</el-button>
    <el-button type='primary' @click='onSubmit'>确 定</el-button>
  </span>
    <span slot='footer' class='dialog-footer' v-show='receiveVisiable'>
    <el-button @click='dialogVisible = false'>取 消</el-button>
    <el-button type='primary' @click='onAccept'>接 收</el-button>
    <el-button type='primary' @click='onReject'>拒 绝</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ['referralVisible', 'state', 'ws', 'info'],
    created () {
    },
    data () {
      return {
        form: {
          Id: '20171010636741',
          Date: '20171012',
          State: 'accept',
          RejectReason: '专家有事不在',
          Name: '赵镇洪',
          PIN: '142703199701012232',
          Gender: '男',
          Age: 26,
          Birthplace: '陕西省忻州市五寨县',
          Nationality: '汉',
          Occupation: '电工',
          Resident: '广东省广州市番禹区番禺小区4栋471号',
          Phone: '13825646512',
          FromInfo: {
            Section: '内科',
            HospitalName: '仁和医院',
            Doctor: '徐宽',
            Phone: '13654681827',
            ReferralType: '治疗重症',
            RelationDemand: '要杨镇宇专家负责',
            PayWay: '医保',
            IllnessState: '长期高烧不退，各种抗生素均无效'
          },
          ToInfo: {
            Section: '内科',
            Doctor: '徐宽',
            Phone: '13427534816'
          }
        },
        dialogVisible: true,
        fromDisable: false,
        fromVisiable: true,
        toDisable: false,
        toVisiable: true,
        sendVisiable: true,
        receiveVisiable: false
      }
    },
    computed: {
    },
    methods: {
      onSubmit () {
        this.$confirm('确认提交？')
          .then(_ => {
            console.log('确认')
          })
          .catch(_ => {
            console.log('取消')
          })
      },
      onAccept () {
        this.$confirm('确认提交？')
          .then(_ => {
            console.log('确认')
          })
          .catch(_ => {
            console.log('取消')
          })
      },
      onReject () {
        this.$prompt('请输入拒绝理由', '确认拒绝', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({
          value
        }) => {
          this.$message({
            type: 'success',
            message: '拒绝理由是: ' + value
          })
        }).catch(() => {})
      },
      beforeClose () {
        this.$emit('updateReferralVisible')
      },
      handleClose (done) { },
      referralStateChange: function () {
        switch (this.state) {
          case 'look':
            this.fromDisable = true
            this.toDisable = true
            this.fromVisiable = true
            this.toVisiable = !(this.form.State === 'reject')
            this.sendVisiable = false
            this.receiveVisiable = false
            break
          case 'send':
            this.fromDisable = false
            this.toDisable = true
            this.fromVisiable = true
            this.toVisiable = false
            this.sendVisiable = true
            this.receiveVisiable = false
            break
          case 'receive':
            this.fromDisable = true
            this.toDisable = false
            this.fromVisiable = true
            this.toVisiable = true
            this.sendVisiable = false
            this.receiveVisiable = true
            break
        }
      }
    }
  }

</script>

<style lang='stylus' scoped>


</style>
