<template>
  <div class="com-cont">
    <div class="com-echarts" ref='trend_ref'>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartIn: null,
      alldata: null,
    }
  },
  mounted() {
    this.initecharts()
    this.getData()
    window.addEventListener('resize', this.screenUpdate)
    this.screenUpdate()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenUpdate)
  },
  methods: {
    initecharts() {
      this.chartIn = this.$echarts.init(this.$refs.trend_ref, 'chalk')
      const initoption = {}
      this.chartIn.setOption(initoption)
    },
    async getData() {
      this.updateecharts()
    },
    updateecharts() {
      const dataoptions = {
      }
      this.chartIn.setOption(dataoptions)
    },
    // 当浏览器的分辨力发生改变时，调用方法完成适配
    screenUpdate() {
      const textSize = this.$refs.trend_ref.offsetWidth / 100 * 3.6
      const adpterOptions = {
      }
      this.chartIn.setOption(adpterOptions)
      // 手动调用图表的resize
      this.chartIn.resize()
    }
  }
}
</script>

<style></style>