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
            format="yyyy-MM-dd"
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
        <el-radio class="radio" v-model="radio" label="female">女</el-radio>
      </el-col>
    </el-row>

    <div style="margin: 20px 0;"></div>
    <el-input v-model="addressInput" placeholder="家庭住址"><template slot="prepend">家庭住址:</template></el-input>
    <div style="margin: 20px 0;"></div>

    <el-input v-model="historyInput" placeholder="既往病史"><template slot="prepend">既往病史:</template></el-input>
    <div style="margin: 20px 0;"></div>
    <el-input v-model="guominyuanInput" placeholder="过敏原"><template slot="prepend">过敏原:</template></el-input>
    <div style="margin: 20px 0;"></div>
    <el-input v-model="doctorInput" placeholder="主治医生"><template slot="prepend">主治医生:</template></el-input>
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
    props: ['visible','edit','operation'],
    data: function () {
      return {
        dialogVisible: this._props.visible,
        nameInput: '',
        ageInput: '',
        radio: 'man',
        //dateInput: '',
        addressInput: '',
        historyInput: '',
        guominyuanInput: '',
        doctorInput: '',
        textarea: '',
        dateInput:''
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
        //console.log(new Date(this._data.dateInput).format("yyyy-MM-dd"))

        this._props.edit.name = this._data.nameInput;
        this._props.edit.age = this._data.ageInput;
        console.log(this._data.radioInput);
        if (this._data.radio=="man"){
          this._props.edit.sex = "男"
        }else if(this._data.radio=="female"){
          this._props.edit.sex = "女"
        }
        //this._props.edit.sex = this._data.radioInput
        this._props.edit.address = this._data.addressInput;
        this._props.edit.history = this._data.historyInput;
        this._props.edit.guominyuan = this._data.guominyuanInput;
        this._props.edit.doctor = this._data.doctorInput;
        this._props.edit.sick = this._data.textarea;
        this._props.edit.update_time = new Date(this._data.dateInput).format("yyyy-MM-dd");
        this._props.visible = false;
        this.$emit('update:edit',this._props.edit)
      },
      initEditData(){
        //if(this._props.edit.date)
        //alert(this._props.edit.date)
        //console.log(this._props.edit.date)
        this._data.dateInput = new Date(this._props.edit.update_time);
        this._data.nameInput = this._props.edit.name;
        this._data.ageInput = this._props.edit.age;
        console.log(this._props.edit.sex);
        if (this._props.edit.sex == "男"){
          this._data.radio = "man"
        }else if (this._props.edit.sex == "女"){
          this._data.radio = "female"
        }

        this._data.addressInput = this._props.edit.address;
        this._data.historyInput = this._props.edit.history;
        this._data.guominyuanInput = this._props.edit.guominyuan
        this._data.doctorInput = this._props.edit.doctor;
        this._data.textarea = this._props.edit.sick

      }
    }
  }
</script>
