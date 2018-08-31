<template>
  <div class="containt">
    <div class="line">线路</div>
    <div class="line-lists" v-if="lists.length > 0">
      <div class="line-list" v-for="(list,ind) in lists" :key="ind">
        <mt-swipe :auto="0" :showIndicators="true">
          <mt-swipe-item class="left">
            <a :href="`#/lineDetails?lineName=${list[0].line_name}&lineId=${list[0].line_id}&stationName=${list[0].station_name}&direction=${list[0].direction}`">
              <div class="rode">{{list[0].line_name}}</div>
              <div class="rode-from-to">
                <div class="from">{{list[0].station_start}}</div>
                <span class="icon"></span>
                <div class="to">{{list[0].station_end}}</div>
              </div>
              <div class="times">
                <div class="begin">
                  <span class="icon"></span>
                  <span class="text">{{list[0].first_time}}</span>
                </div>
                <div class="finish">
                  <span class="icon"></span>
                  <span class="text">{{list[0].last_time}}</span>
                </div>
                <div class="money">票价:{{list[0].price_detail || '无'}}</div>
              </div>
            </a>
          </mt-swipe-item>
          <mt-swipe-item class="right">
            <a :href="`#/lineDetails?lineName=${list[1].line_name}&lineId=${list[1].line_id}&stationName=${list[1].station_name}&direction=${list[1].direction}`">
              <div class="rode">{{list[1].line_name}}</div>
              <div class="rode-from-to">
                <div class="from">{{list[1].station_start}}</div>
                <span class="icon"></span>
                <div class="to">{{list[1].station_end}}</div>
              </div>
              <div class="times">
                <div class="begin">
                  <span class="icon"></span>
                  <span class="text">{{list[1].first_time}}</span>
                </div>
                <div class="finish">
                  <span class="icon"></span>
                  <span class="text">{{list[1].last_time}}</span>
                </div>
                <div class="money">票价:{{list[1].price_detail || '无'}}</div>
              </div>
            </a>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="footer"></div>
    </div>
    <div class="no-infos" v-else>
      <div class="no-info"></div>
      <div class="no-info-text">附近暂无公交路线信息</div>
    </div>
  </div>
</template>
<script>
import { urlQueryString } from '../utils/common.js'
export default {
  data () {
    return {
      lists: [],
      cityCode: '333'
    }
  },
  methods: {
    // 获取站点的线路列表
    async getLineLists () {
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
      let stationName = this.$route.query.stationName || urlQueryString('stationName')
      let res = await this.$parent.request({
        url: `line/list_by_station?station_name=${stationName}&city_code=${
          this.cityCode
        }`
      })
      if (res) this.lists = res
      window.yl.call('hideLoading ')
      // alert(JSON.stringify(res))
    },
    // 设置头部标题
    setTittle () {
      let stationName =
        this.$route.query.stationName || urlQueryString('stationName')
      if (stationName) {
        window.yl.call(
          'setTitleBarText',
          {
            title: stationName
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
    }
  },
  created () {
    this.setTittle()
    this.getLineLists()
  },
  mounted () {
  }
}
</script>
<style lang="less" src="../style/newminitui.less">
</style>

<style lang="less" scoped>
.containt {
  font-family: PingFangSC-Regular;
  width: 100%;
  padding: 0 0.426667rem 0 0.426667rem;
  box-sizing: border-box;
}
.line {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #303033;
  height: 0.6rem;
  line-height: 0.6rem;
  margin: 0.426667rem 0 0.266667rem 0;
}
.line-lists {
  .line-list {
    width: 100%;
    height: 3.2rem;
    background: #ffffff;
    box-shadow: 0 1px 10px 0 rgba(0, 121, 197, 0.14);
    border-radius: 10px;
    box-sizing: border-box;
    margin-top: 0.266667rem;
    .left,
    .right {
      box-sizing: border-box;
      padding: 0.32rem 0.426667rem 0.293333rem 0.426667rem;
      .rode {
        height: 0.666667rem;
        line-height: 0.666667rem;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #303033;
      }
      .rode-from-to {
        margin-top: 0.213333rem;
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
    }
  }
}
.footer {
  width: 100%;
  height: 20px;
}
.no-infos {
  .no-info {
    width: 3.973333rem;
    height: 3.973333rem;
    margin: 1.546667rem auto 0.426667rem auto;
    background: url('../assets/images/norecord@3x.png') no-repeat;
    background-size: 3.973333rem 3.973333rem;
  }
  .no-info-text {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #595d60;
    text-align: center;
    height: 0.586667rem;
    line-height: 0.586667rem;
  }
}
</style>
