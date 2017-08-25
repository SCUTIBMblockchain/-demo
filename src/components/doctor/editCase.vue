<template>
  <el-dialog
    title="病人转诊信息编辑"
    :visible.sync="visible"
    @open="initEditData()"
    @close="updateVisible()"
    size="tiny"
    >
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="block">
          <el-date-picker
            v-model="dateInput"
            align="left"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12">
        <el-input v-model="nameInput" placeholder="姓名"><template slot="prepend">姓名:</template></el-input>
      </el-col>
    </el-row>
    <div style="margin: 20px 0;"></div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input v-model="ageInput" placeholder="年龄"><template slot="prepend">年龄:</template></el-input>
      </el-col>
      <el-col :span="12">
        性别: &nbsp &nbsp &nbsp
        <el-radio class="radio" v-model="radio" label="man">男</el-radio>
        <el-radio class="radio" v-model="radio" label="feman">女</el-radio>
      </el-col>
    </el-row>

    <div style="margin: 20px 0;"></div>
    <el-input v-model="addressInput" placeholder="家庭住址"><template slot="prepend">家庭住址:</template></el-input>
    <div style="margin: 20px 0;"></div>
    <el-input type="textarea" autosize v-model="textarea" placeholder="患病情况"></el-input>
    <div style="margin: 20px 0;"></div>

    <span slot="footer" class="dialog-footer">
    <el-button @click="changeVisible()">取 消</el-button>
    <el-button type="primary" @click="updateEditData()">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {
      ElCol,
      ElInput},
    props: ['visible','edit'],
    data: function () {
      return {
        dialogVisible: this._props.visible,
        nameInput: '',
        ageInput: '',
        radio: 'man',
        //dateInput: '',
        addressInput: '',
        textarea: '',
        dateInput:new Date()
      }
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      changeVisible() {
//        console.log("change visible call,this._props.visible =")
//        console.log(this._props.visible)
        this._props.visible = false
//        console.log("after change the visible,this._props.visible =")
//        console.log(this._props.visible)
      },
      updateVisible(){
        this.$emit('update:visible',false)
      },
      updateEditData(){
        //console.log(this._props.edit)

        //this.$emit('update:visible',false)
      },
      initEditData(){
        this._data.dateInput = new Date(this._props.edit.date)
        this._data.nameInput = this._props.edit.name
        this._data.ageInput = this._props.edit.age
        this._data.radioInput = this._props.edit.sex
        this._data.addressInput = this._props.edit.address
        this._data.textarea = this._props.edit.sick

      }
    }
  }
</script>
