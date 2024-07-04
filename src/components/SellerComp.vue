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
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#5052EE' // 0% 处的颜色
          }, {
            offset: 1, color: '#AB6EE5' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
        title: {
          text: '︱商家销售统计',
          textStyle: {
            fontSize: '60px'
          },
          left: 20,
          top: 20,
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true,
        },
        itemStyle: {
          borderRadius: [0, 33, 33, 0],
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: seleItem,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              width: 66,
              color: '#2d3443',
              // 解决背景分段问题
              type: 'solid',
            }
          }
        },
        series: {
          type: 'bar',
          data: seleValue,
          barWidth: 66,
          label: {
            show: true,
            position: 'right',
            textStyle: {
              color: 'white'
            }
          }
        }
      }
      this.chartIn.setOption(options)
    },
    startInterVal() {
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
