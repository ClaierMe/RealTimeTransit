<template>
  <div class="flex-container flex flex-column">
    <mt-search v-model="value" :result.sync="result" placeholder="搜索" autofocus>
       <mt-cell v-for="item in result" :key="item.title"
       :href="`#/?value=${value}`"
        :title="item.name"
        :value="item.district">
      </mt-cell>
    </mt-search>
  </div>

</template>

<script>
export default {
  data () {
    return {
      value: '',
      result: [{title: '1', value: 2}, {title: '2', value: 3}]
    }
  },

  methods: {
    listenInput: async (val) => {
      console.log(val, this.$parent)
      let res = await this.$parent.request({
        host: 'https://restapi.amap.com/v3/assistant/inputtips',
        url: `?key=5d1564203934a57a268d0ef563babc03&keywords=${val}`,
        // method: 'POST',
        headers: {
          // withCredentials: false
        }
      })
      console.log(res)
    }
  },

  // computed: {
  //   result: async () => {
  //     console.log(this.value, this.$parent)
  //     let res = await this.$parent.request({
  //       host: 'https://restapi.amap.com/v3/assistant/inputtips',
  //       url: `/?key=5d1564203934a57a268d0ef563babc03&keywords=${this.value}`
  //     })
  //     console.log(res)
  //     return [{title: '1', value: 2}, {title: '2', value: 3}]
  //   }
  // },

  watch: {
    value: async function (e) {
      console.log(e)
      let res = await this.$parent.request({
        baseURL: 'https://restapi.amap.com/v3/assistant/inputtips',
        url: `?key=5d1564203934a57a268d0ef563babc03&keywords=${e}`
      })
      console.log(res)
      if (res) this.result = res
    }
    // result: async () => {
    //   console.log(this.value)
    //   let res = await this.$parent.request({
    //     host: 'https://restapi.amap.com/v3/assistant/inputtips',
    //     url: `/?key=5d1564203934a57a268d0ef563babc03&keywords=${this.value}`
    //   })
    //   console.log(res)
    // }
  },

  created () {}
}
</script>
