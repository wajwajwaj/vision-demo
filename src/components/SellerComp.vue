<template>
  <div class="com-cont">
    <div class="com-echarts" ref='seller_ref'>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartIn: null,
      alldata: null,
      // 当前页
      currPage: 1,
      // 总页数
      totalPage: 0,
      timeId: null,
    }
  },
  mounted() {
    this.initecharts()
    this.getData()
  },
  destroyed() {
    clearInterval(this.timeId)
  },
  methods: {
    initecharts() {
      this.chartIn = this.$echarts.init(this.$refs.seller_ref, 'chalk')
      // 对图表进行鼠标的监听
      this.chartIn.on('mouseover', () => {
        clearInterval(this.timeId)
      })
      this.chartIn.on('mouseout', () => {
        this.startInterVal()
      })
    },
    async getData() {
      const { data } = await this.$http.get('/seller')
      console.log(data)
      this.alldata = data.sort((a, b) => a.value - b.value)
      this.totalPage = this.alldata.length % 5 === 0 ? this.alldata.length / 5 : this.alldata.length / 5 + 1
      this.startInterVal()
      this.updateecharts()
    },
    updateecharts() {
      const start = (this.currPage - 1) * 5
      const end = this.currPage * 5
      const showData = this.alldata.slice(start, end)
      const seleItem = showData.map(item => {
        return item.name
      })
      const seleValue = showData.map(item => {
        return item.value
      })

      const options = {
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: seleItem

        },
        series: {
          type: 'bar',
          data: seleValue
        }
      }
      this.chartIn.setOption(options)
    },
    startInterVal () {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.currPage++
        // 从0开始播放
        if (this.currPage > this.totalPage) {
          this.currPage = 1
        }
        this.updateecharts()
      }, 3000)
    }
  }
}
</script>

<style></style>
