<template>
  <div class="com-cont">
    <div class="com-echarts" ref='seller_ref'>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartIn: null,
      alldata: null,
    }
  },
  mounted () {
    this.initecharts()
    this.getData()
  },
  methods: {
    initecharts () {
      this.chartIn = this.$echarts.init(this.$refs.seller_ref)
    },
    async getData () {
      const { data } = await this.$http.get('/seller')
      console.log(data)
      this.alldata = data
      this.updateecharts()
    },
    updateecharts () {
      this.chartIn.setOptions({
        xAxis: {},
        yAxis: {},
      })
    }
  }
}
</script>

<style></style>
