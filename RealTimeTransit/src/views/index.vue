<template>
  <div class="container">

    <div class="box-header">
      <div class="box">
        <label class="label">线路查询</label>
        <div class="panel">
           <div class="panel-wrapper flex">
             <div class="panel-pos">
             </div>
              <div class="panel-left">
                <a href="#/search?type=origin">
                    <span>出发地: </span>
                    <span>{{startPos}}</span>
                  </a>
                  <a href="#/search?type=desination">
                     <span>目的地: </span>
                     <span>{{endPos}}</span>
                  </a>
              </div>
              <div class="panel-right flex align-center">
                <img src="../assets/fanxiang@3x.png" alt="">
              </div>
          </div>
          <button class="searchBtn">查询</button>
        </div>
      </div>
    </div>

    <div class="box" id="line">
      <label class="label black">已开通线路</label>
    </div>

    <div class="footer flex align-center">
       <a href="#">报名预约</a>
       <a href="#">我的车票</a>
    </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      startPos: '我的位置',
      endPos: ''
    }
  },

  methods: {},

  created () {}
}
</script>
<style lang="less" src="../style/index.less" scoped></style>
