<template>
  <el-dialog
    title="病人历史记录"
    :visible.sync="visible"
    @close="updateVisible()"
    size="large"
  >

    <div class="htmleaf-container">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="VivaTimeline">
              <dl>
                <dt>2016</dt>
                <dd class="pos-left clearfix">
                  <div class="circ"></div>
                  <div class="time">Feb 03</div>
                  <div class="events">
                    <div class="events-header" @click="handleShow()">Event Heading</div>
                    <div class="events-body">
                      <div class="row">
                        <div class="events-desc">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                      </div>
                    </div>
                  </div>
                </dd>
                <dt>2015</dt>
                <dt>2014</dt>
                <dt>2013</dt>
                <dt>2012</dt>
                <dt>2011</dt>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {
      ElCol
    },
    props: ['visible'],
    data: function () {
      return {
        dialogVisible: this._props.visible
      }
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      changeVisible() {
        this._props.visible = false
      },
      updateVisible() {
        this.$emit('update:visible', false)
      },
      handleShow(){
        alert('show')
      }
    }
  }
</script>

<style>
  .rad {
    #background: none repeat scroll 0 0 #FF3300;
    border-radius: 78.5px;
    width: 20px;
    height: 50px;

    #color: #FFFFFF;
    #padding:44px 50px;
    #position: absolute;
  }
  .VivaTimeline dl {
    position: relative;
    top: 0;
    padding: 20px 0;
    margin: 0
  }

  .VivaTimeline dl:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    z-index: 100;
    width: 2px;
    margin-left: -1px;
    content: '';
    background-color: #ccd1d9
  }

  .VivaTimeline dl dt {
    position: relative;
    top: 30px;
    z-index: 200;
    width: 120px;
    padding: 3px 5px;
    margin: 0 auto 30px;
    font-weight: 400;
    color: #fff;
    text-align: center;
    background-color: #aab2bd;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px
  }

  .VivaTimeline dl dd {
    position: relative;
    z-index: 200
  }

  .VivaTimeline dl dd .circ {
    position: absolute;
    top: 40px;
    left: 50%;
    z-index: 200;
    width: 22px;
    height: 22px;
    margin-left: -11px;
    background-color: #4fc1e9;
    border: 4px solid #f5f7fa;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%
  }

  .VivaTimeline dl dd .time {
    position: absolute;
    top: 31px;
    left: 50%;
    display: inline-block;
    width: 100px;
    padding: 10px 20px;
    color: #4fc1e9
  }

  .VivaTimeline dl dd .events {
    position: relative;
    width: 47%;
    padding: 10px 0 0;
    margin-top: 31px;
    background-color: #CCC;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px
  }

  .VivaTimeline dl dd .events:before {
    position: absolute;
    top: 12px;
    width: 0;
    height: 0;
    content: '';
    border-style: solid;
    border-width: 6px
  }

  .VivaTimeline dl dd .events .events-object {
    margin: 0 auto;
  }

  .VivaTimeline dl dd .events .events-header {
    min-height: 30px;
    line-height: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  .VivaTimeline dl dd .events .events-body {
    overflow: hidden;
    zoom: 1;
    background-color: #EEE;
    padding: 10px;
  }
  .VivaTimeline dl dd .events .events-body .row{
    display:none;
  }

  .VivaTimeline dl dd .events .events-body .events-desc {
    text-indent: 2em;
    padding: 0 15px;
  }

  .VivaTimeline dl dd .events .events-footer {
    text-align:center;
  }
  .VivaTimeline dl dd .events .events-footer ol {
    list-style: none;
    margin: 0 auto;
    padding: 0;
  }
  .VivaTimeline dl dd .events .events-footer ol li {
    background: #32b487;
    border-radius: 5px;
    margin: 10px;
    display: inline-block;
    width: 10px;
    height: 10px;
    cursor: pointer;
  }
  .VivaTimeline dl dd .events .events-footer ol .active{
    transform: scale(2);
  }

  .VivaTimeline dl dd.pos-right .time {
    margin-left: -100px;
    text-align: right
  }

  .VivaTimeline dl dd.pos-right .events {
    float: right
  }

  .VivaTimeline dl dd.pos-right .events:before {
    left: -12px;
    border-color: transparent #CCC transparent transparent
  }

  .VivaTimeline dl dd.pos-left .time {
    margin-left: 0;
    text-align: left
  }

  .VivaTimeline dl dd.pos-left .events {
    float: left
  }

  .VivaTimeline dl dd.pos-left .events:before {
    right: -12px;
    border-color: transparent transparent transparent #CCC
  }

  .VivaTimeline .carousel-indicators{
    bottom: 0;
  }

  @media screen and (max-width: 767px) {
    .VivaTimeline dl:before {
      left: 90px
    }
    .VivaTimeline dl dt {
      margin: 0 30px 30px
    }
    .VivaTimeline dl dd .circ {
      left: 90px
    }
    .VivaTimeline dl dd .time {
      left: 20px
    }
    .VivaTimeline dl dd.pos-left .time {
      padding: 10px 0;
      margin-left: 0;
      text-align: left
    }
    .VivaTimeline dl dd.pos-left .events {
      float: right;
      width: 73%;
      margin-right: 4%;
    }
    .VivaTimeline dl dd.pos-left .events:before {
      left: -12px;
      border-color: transparent #CCC transparent transparent
    }
    .VivaTimeline dl dd.pos-right .time {
      padding: 10px 0;
      margin-left: 0;
      text-align: left
    }
    .VivaTimeline dl dd.pos-right .events {
      float: right;
      width: 73%;
      margin-right: 4%;
    }
    /*
    .VivaTimeline dl dd .events .events-body {
        display: none;
    }
    .VivaTimeline dl dd .events .events-footer {
        display: none;
    }
    */
  }

  @media screen and (max-width: 500px) {
    .VivaTimeline dl dd.pos-left .events {
      float: right;
      width: 63%;
      margin-right: 4%;
    }
    .VivaTimeline dl dd.pos-right .events {
      float: right;
      width: 63%;
      margin-right: 4%;
    }
  }
</style>
