<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { request, ajax } from './utils/request'
export default {
  name: 'App',
  data () {
    return {
      request: request,
      ajax: ajax
    }
  }
}
</script>
<style lang="less" src="./style/base.less"></style>
