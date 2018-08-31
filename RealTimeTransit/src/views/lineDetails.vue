<template>
  <div class="container">
    <!-- 头部 -->
    <div class="head" v-if="lineLists.line">
      <div class="rode-from-to">
        <div class="from">{{lineLists.line.station_start}}</div>
        <span class="icon"></span>
        <div class="to">{{lineLists.line.station_end}}</div>
      </div>
      <div class="times">
        <div class="begin">
          <span class="icon"></span>
          <span class="text">{{lineLists.line.first_time}}</span>
        </div>
        <div class="finish">
          <span class="icon"></span>
          <span class="text">{{lineLists.line.last_time}}</span>
        </div>
        <div class="money">票价:{{lineLists.line.price_detail || '无'}}</div>
      </div>
      <div class="right" @click="changeDrection">
        <div class="icon"></div>
        <div class="text">换向</div>
      </div>
    </div>
    <!-- 中部 -->
    <div class="content" v-if="lineLists.line">
      <div class="con">
        <div class="left">
          <div class="top">{{lineLists.station_amount}}</div>
          <div class="next">{{lineLists.distance}}</div>
        </div>
        <div class="mid">到达</div>
        <div class="right">{{lineLists.station_name}}</div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer" v-if="lineLists.station">
      <div class="progress-wrapper">
        <div class="progress" :style="{width: progressWidth + 'rem'}">
          <div class="positions">
            <div class="position" v-for="(list,index) in lineLists.station" :key="index" :class="`position${list.flag}`"></div>
          </div>
          <div class="cars">
            <div class="car" v-for="(list,index) in lineLists.station" :key="index" :class="`car-${list.car_act}`"></div>
          </div>
          <div class="cars-in">
            <div class="car" v-for="(list,index) in lineLists.station" :key="index" :class="`car-${list.car_act}`"></div>
          </div>
          <div class="dots">
            <div class="dot" v-for="(list,index) in lineLists.station" :key="index" :class="`dot${list.flag}`"></div>
          </div>
          <div class="arrows">
            <div class="arrow" v-for="(list,index) in lineLists.station" :key="index"></div>
          </div>
          <div class="station-lists" id="station-lists">
            <div class="station-list" v-for="(list,index) in lineLists.station" :key="index" :class="`station-list${list.flag}`" @click="handleclick(list.name)">{{list.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data" v-else>暂无数据</div>
  </div>
</template>
<script>
import { urlQueryString } from '../utils/common.js'
export default {
  data () {
    return {
      progressWidth: 10,
      cityCode: '3333',
      latitude: '',
      longitude: '',
      lineLists: {},
      timer: null
    }
  },
  methods: {
    // 点击站点名
    handleclick (name) {
      this.stationName = name
      let direction = this.lineLists.direction
      this.getLineDetails2(direction, name)
    },
    // 点击换向
    changeDrection () {
      let direction = this.lineLists.direction
      if (direction === 0) {
        direction = 1
      } else {
        direction = 0
      }
      // console.log(direction)
      this.getLineDetails2(direction, this.$route.query.stationName || '')
    },
    // 设置标题
    setTitle () {
      let line = this.$route.query.lineName || urlQueryString('lineName')
      if (line) {
        window.yl.call(
          'setTitleBarText',
          {
            title: `${line}详情`
          },
          {
            onSuccess: function (a) {
              // alert('success')
            },
            onFail: function (a) {
              // alert('fail')
            }
          }
        )
      }
    },
    // 获取线路详细信息
    async getLineDetails () {
      window.yl.call(
        'showLoading ',
        {
          content: '正在加载中…',
          duration: 3000
        },
        {
          onSuccess: function (a) {
            // alert('success')
          },
          onFail: function (a) {
            // alert('fail')
          }
        }
      )
      let res = await this.$parent.request({
        url: `line/detail_by_line_id?lng=${this.longitude}&lat=${
          this.latitude
        }&line_id=${this.$route.query.lineId}&direction=${
          this.$route.query.direction
        }&city_code=${this.cityCode}&station_name=${this.$route.query
          .stationName || ''}`
      })
      if (res) this.lineLists = res
      // alert(JSON.stringify(res))
      this.$nextTick(() => {
        if (this.lineLists.station) {
          this.progressWidth =
            (this.lineLists.station.length - 1) * 90 / 75 +
            this.lineLists.station.length * 10 / 75
        }
      })
      window.yl.call('hideLoading ')
    },
    // 获取线路详细信息
    async getLineDetails2 (direction, stationName) {
      window.yl.call(
        'showLoading ',
        {
          content: '正在加载中…',
          duration: 3000
        },
        {
          onSuccess: function (a) {
            // alert('success')
          },
          onFail: function (a) {
            // alert('fail')
          }
        }
      )
      let res = await this.$parent.request({
        url: `line/detail_by_line_id?lng=${this.longitude}&lat=${
          this.latitude
        }&line_id=${
          this.$route.query.lineId
        }&direction=${direction}&city_code=${
          this.cityCode
        }&station_name=${stationName}`
      })
      if (res) this.lineLists = res
      // alert(JSON.stringify(res))
      console.log(document.querySelector('.station-lists').offsetWidth)
      this.$nextTick(() => {
        if (this.lineLists.station) {
          this.progressWidth =
            (this.lineLists.station.length - 1) * 90 / 75 +
            this.lineLists.station.length * 10 / 75
        }
      })
      window.yl.call('hideLoading')
    }
  },
  created () {
    this.setTitle()
    // 获取位置
    window.yl.call(
      'getLocation',
      {},
      {
        onSuccess: function (res) {
          // this.getStation()
          // alert(JSON.stringify(res.param))
          if (res.param) {
            this.latitude = res.param.latitude
            this.longitude = res.param.longitude
            // alert(1)
          }
        },
        onFail: function (res) {
          alert('获取地理位置失败')
        }
      }
    )
    this.getLineDetails()
  },
  mounted () {
    let that = this
    this.timer = setInterval(function () {
      that.getLineDetails()
    }, 300000)
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.no-data {
  width: 100%;
  text-align: center;
  margin: 100px auto;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #595d60;
  height: 0.586667rem;
  line-height: 0.586667rem;
}
.progress-wrapper {
  float: left;
}
.container {
  //   width: 100%;
  font-family: PingFangSC-Regular;
}
.head {
  position: relative;
  width: 100%;
  height: 2.186667rem;
  padding: 0.426667rem;
  box-sizing: border-box;
  border-bottom: 1px solid #d9d9d9;
  background: #fff;
  .rode-from-to {
    .from,
    .to {
      display: inline-block;
      height: 0.533333rem;
      line-height: 0.533333rem;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #505064;
    }
    .icon {
      display: inline-block;
      width: 0.586667rem;
      height: 0.24rem;
      margin-left: 0.133333rem;
      background: url('../assets/jiantou@3x.png') no-repeat;
      background-size: contain;
    }
    .to {
      margin-left: 0.133333rem;
    }
  }
  .times {
    margin-top: 0.213333rem;
    .begin {
      display: inline-block;
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 0.48rem;
        height: 0.48rem;
        background: url('../assets/images/shou@3x.png') no-repeat;
        background-size: contain;
      }
      .text {
        display: inline-block;
        height: 0.533333rem;
        line-height: 0.533333rem;
        font-size: 14px;
        color: #a2a2a2;
      }
    }
    .finish {
      display: inline-block;
      margin-left: 5px;
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 0.48rem;
        height: 0.48rem;
        background: url('../assets/images/mo@3x.png') no-repeat;
        background-size: contain;
      }
      .text {
        display: inline-block;
        height: 0.533333rem;
        line-height: 0.533333rem;
        font-size: 14px;
        color: #a2a2a2;
      }
    }
    .money {
      display: inline-block;
      margin-left: 5px;
      height: 0.533333rem;
      line-height: 0.533333rem;
      font-size: 14px;
      color: #a2a2a2;
    }
  }
  .right {
    position: absolute;
    top: 0.52rem;
    right: 0.426667rem;
    .icon {
      width: 0.72rem;
      height: 0.72rem;
      background: url('../assets/images/commutation@3x.png') no-repeat;
      background-size: contain;
    }
    .text {
      margin-top: 0.053333rem;
      font-family: PingFangSC-Regular;
      font-size: 10px;
      color: #a2a2a2;
      text-align: center;
    }
  }
}
.content {
  width: 100%;
  // padding: 0.253333rem 0.426667rem 0 0.426667rem;
  // box-sizing: border-box;
  .con {
    vertical-align: top;
    position: relative;
    width: 9.146667rem;
    height: 2.72rem;
    background: url(../assets/images/frame@3x.png) no-repeat;
    background-size: 9.146667rem 2.72rem;
    margin: 0.253333rem auto 0 auto;
    .left {
      position: absolute;
      top: 0.653333rem;
      left: 0.933333rem;
      .top {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #0079c5;
        text-align: center;
        height: 0.6rem;
        line-height: 0.6rem;
      }
      .next {
        font-size: 12px;
        color: #a2a2a2;
        text-align: center;
        height: 0.44rem;
        line-height: 0.44rem;
      }
    }
    .mid {
      position: absolute;
      top: 1.026667rem;
      left: 3.6rem;
      font-size: 12px;
      color: #a2a2a2;
      text-align: center;
      height: 0.44rem;
      line-height: 0.44rem;
    }
    .right {
      position: absolute;
      top: 0.946667rem;
      right: 0.96rem;
      font-size: 10px;
      color: #303033;
      text-align: right;
      height: 0.6rem;
      line-height: 0.6rem;
    }
  }
}
.footer {
  // overflow-x: scroll;
  -webkit-overflow-scrolling : touch;
  height: 11.92rem;
  &::-webkit-scrollbar {
    width: 0;
  }
  .progress {
    position: relative;
    //宽不确定
    // width: 10rem;
    height: 0.133333rem;
    background: #d8d8d8;
    border-radius: 10px;
    margin: 0.88rem 0.426667rem 0 0.426667rem;
    .positions {
      position: absolute;
      top: -0.506667rem;
      left: 0;
      z-index: 100;
      .position {
        display: inline-block;
        width: 0.48rem;
        height: 0.48rem;
        box-sizing: border-box;
        // background: url('../assets/images/rechargebox@3x.png') no-repeat;
        // background-size: 0.48rem 0.48rem;
        margin-left: 0.853333rem;
        &:nth-child(1) {
          margin-left: -0.16rem;
        }
        &:nth-last-child(1) {
          position: absolute;
          right: -50px;
        }
      }
      .position1 {
        background: url('../assets/images/rechargebox@3x.png') no-repeat;
        background-size: 0.48rem 0.48rem;
      }
    }
    .cars {
      position: absolute;
      top: -0.4rem;
      left: 0;
      .car {
        display: inline-block;
        width: 0.8rem;
        height: 0.4rem;
        // background: url('../assets/images/busweidao@3x.png') no-repeat;
        // background-size: contain;
        margin-left: 0.533333rem;
        box-sizing: border-box;
        &:nth-child(1) {
          margin-left: 0.346667rem;
        }
        &:nth-last-child(1) {
          display: none;
        }
      }
      .car-out {
        background: url('../assets/images/busweidao@3x.png') no-repeat;
        background-size: contain;
      }
    }
    .cars-in {
      position: absolute;
      top: -0.4rem;
      left: -0.666667rem;
      .car {
        display: inline-block;
        width: 0.8rem;
        height: 0.4rem;
        // background: url('../assets/images/busweidao@3x.png') no-repeat;
        // background-size: contain;
        margin-left: 0.533333rem;
        box-sizing: border-box;
        &:nth-child(1) {
          // display: none;
          margin-left: 0.346667rem;
        }
        &:nth-last-child(1) {
          display: none;
        }
      }
      .car-in {
        background: url('../assets/images/busweidao@3x.png') no-repeat;
        background-size: contain;
      }
    }
    .dots {
      position: absolute;
      top: -0.266667rem;
      left: 0;
      .dot {
        display: inline-block;
        width: 0.133333rem;
        height: 0.133333rem;
        background: #d8d8d8;
        border: 1px solid #ffffff;
        border-radius: 50%;
        box-sizing: border-box;
        z-index: 5;
        margin-left: 1.2rem;
        &:nth-child(1) {
          margin-left: 0;
        }
      }
      .dot1 {
        background: #00a0e9;
      }
    }
    .arrows {
      position: absolute;
      top: -0.266667rem;
      left: 0;
      .arrow {
        display: inline-block;
        width: 0.133333rem;
        height: 0.133333rem;
        background: url('../assets/images/row.png') no-repeat;
        background-size: contain;
        margin-left: 1.2rem;
        box-sizing: border-box;
        z-index: 5;
        &:nth-child(1) {
          margin-left: 0.733333rem;
        }
      }
    }
    .station-lists {
      position: absolute;
      top: 0.453333rem;
      // margin-top: 0px;
      left: 0;
      .station-list {
        vertical-align: top;
        display: inline-block;
        width: 0.426667rem;
        font-size: 16px;
        color: #303033;
        text-align: center;
        margin-left: 0.906667rem;
        &:nth-child(1) {
          margin-left: 0;
        }
        &:nth-child(2) {
          margin-left: 0.756667rem;
        }
        &:nth-last-child(1) {
          margin-left: 0.7rem;
        }
      }
      .station-list1 {
        color: #00a0e9;
      }
    }
  }
}
</style>
