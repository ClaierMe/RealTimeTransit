<template>
  <div class="search-line">
    <!-- 搜索 -->
    <a class="search-bar" href="#/lineLists">
      <div class="search-inp">搜线路</div>
      <div class="search-icon"></div>
      <div class="search-text">查询</div>
    </a>
    <!-- 站点列表 -->
    <div class="show-station">
      <div class="search-lists" v-if="stationLists.length > 0">
        <div class="search-list" @click="handleStationList(index,stationList.name)" v-for="(stationList,index) in stationLists" :key="index">
          <div class="search-list-left">
            <span class="icon"></span>
            <span class="text">{{stationList.name}}</span>
          </div>
          <div class="search-list-right">{{parseInt(stationList.distance)}}m</div>
        </div>
      </div>
      <div class="no-infos" v-else>
        <div class="no-info"></div>
        <div class="no-info-text">附近暂无公交路线信息</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      stationLists: [],
      inputValue: '',
      latitude: '',
      longitude: '',
      cityCode: '333333'
    }
  },
  methods: {
    // 点击站点列表
    handleStationList (index, stationName) {
      window.location.href = `#/searchLineDetails?stationId=${index}&stationName=${stationName}`
    },
    // 获取站点信息
    async getStation () {
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
        // url: 'station/list?lng=107.13&lat=34.37&limit_distance=500&city_code=333'
        url: `station/list?lng=${this.longitude}&lat=${this.latitude}&limit_distance=500&city_code=${this.cityCode}`
      })
      if (res) this.stationLists = res
      // alert(JSON.stringify(res))
      window.yl.call('hideLoading ')
    }
  },
  created () {
    // 设置标题
    window.yl.call(
      'setTitleBarText',
      {
        title: '附近站点'
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
    // this.getStation()
  },
  mounted () {
    this.getStation()
  }
}
</script>
<style lang="less" scoped>
@import '../style/base.less';
input::-webkit-input-placeholder {
  color: #aaa;
}
.search-line {
  width: 100%;
}
.search-bar {
  display: block;
  position: relative;
  height: 1.173333rem;
  padding: 0.2rem 0.426667rem 0.2rem 0.426667rem;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
  .search-icon {
    position: absolute;
    left: 0.613333rem;
    top: 0.293333rem;
    width: 0.586667rem;
    height: 0.586667rem;
    background: url('../assets/images/search.png') no-repeat;
    background-size: 0.586667rem 0.586667rem;
  }
  .search-inp {
    display: inline-block;
    width: 8rem;
    height: 0.773333rem;
    line-height: 0.78rem;
    background: #ededed;
    border-radius: 6px;
    padding-left: 0.986667rem;
    // padding: .133333rem 0 .133333rem 0.986667rem;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #aaa;
    letter-spacing: 0;
  }
  .search-text {
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 0.426667rem;
    color: #00a0e9;
    letter-spacing: 0;
    margin-left: 0.133333rem;
  }
}
.search-lists {
  .search-list {
    position: relative;
    width: 91%;
    margin: 0 auto;
    height: 1.466667rem;
    border-bottom: 1px solid #cccccc;
    .search-list-left {
      position: absolute;
      top: 30%;
      left: 0;
      height: 0.586667rem;
      .icon {
        vertical-align: top;
        display: inline-block;
        width: 0.586667rem;
        height: 0.586667rem;
        background: url('../assets/images/station@3x.png') no-repeat;
        background-size: 0.586667rem 0.586667rem;
      }
      .text {
        display: inline-block;
        margin-left: 0.266667rem;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #303033;
        height: 0.586667rem;
        line-height: 0.586667rem;
      }
    }
    .search-list-right {
      position: absolute;
      top: 36%;
      right: 0;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #a2a2a2;
      text-align: right;
    }
  }
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
