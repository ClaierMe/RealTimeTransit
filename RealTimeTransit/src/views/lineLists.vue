<template>
  <div class="container">
    <!-- 搜索 -->
    <div class="search-bar">
      <input type="text" name="search" ref="input" autofocus v-focus v-model="inputValue" maxlength="10" @input="handleOnInput()" class="search-inp" placeholder="搜线路">
      <div class="search-icon"></div>
      <div class="search-text" @click="handleCancel">取消</div>
    </div>
    <!-- 线路列表 -->
    <div class="line-lists" v-if="lineLists.length >0">
      <div class="line">线路</div>
      <div class="line-list" @click="handleLineList(lineList.line_id,lineList.name)" v-for="(lineList,index) in lineLists" :key="index">
        <div class="list-wrapper">
          <span class="icon"></span>
          <span class="text">{{lineList.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      lineLists: [],
      inputValue: '',
      cityCode: '3333'
    }
  },
  methods: {
    // input有输入
    handleOnInput () {
      this.searchLine()
    },
    // 点击取消按钮
    handleCancel () {
      this.$router.go(-1)
    },
    // 点击线路列表
    handleLineList (index, lineName) {
      window.location.href = `#/lineDetails?lineId=${index}&lineName=${lineName}`
    },
    // 搜素线路
    async searchLine () {
      let res = await this.$parent.request({
        url: `line/search_by_line?line=${this.inputValue}&city_code=${
          this.cityCode
        }`
      })
      if (res) this.lineLists = res
      // alert(JSON.stringify(res))
    }
  },
  created () {
    // 设置标题
    window.yl.call(
      'setTitleBarText',
      {
        title: '线路搜索'
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
    // 隐藏头部bar
    if (window.AlipayJSBridge) {
      // alert(222)
      /* eslint-disable-next-line */
      AlipayJSBridge.call('setTransparentTitle', {
        transparentTitle: 'none'
      })
      /* eslint-disable-next-line */
      AlipayJSBridge.call('hideOptionMenu')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs['input'].focus()
    })
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  input::-webkit-input-placeholder {
    color: #aaa;
  }
}
.search-bar {
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
    width: 8rem;
    height: 0.773333rem;
    border: none;
    outline: none;
    // line-height: 0.773333rem;
    background: #ededed;
    border-radius: 6px;
    padding: 0.133333rem 0 0.133333rem 0.986667rem;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #303033;
    letter-spacing: 0;
    // line-height: .533333rem;
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
.line-lists {
  .line {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #303033;
    letter-spacing: 0;
    padding: 0.426667rem 0 0.32rem 0.426667rem;
    box-sizing: border-box;
  }
  .line-list {
    position: relative;
    width: 91%;
    margin: 0 auto;
    height: 1.466667rem;
    border-bottom: 1px solid #cccccc;
    .list-wrapper {
      position: absolute;
      top: 0.44rem;
      left: 0;
      .icon {
        vertical-align: top;
        display: inline-block;
        width: 0.586667rem;
        height: 0.586667rem;
        background: url('../assets/images/line.png') no-repeat;
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
  }
}
</style>
