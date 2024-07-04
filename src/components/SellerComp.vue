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
    // 分辨率发生改变时，改变与窗口大小相关的参数
    window.addEventListener('resize', this.screenUpdate)
    this.screenUpdate()
  },
  destroyed() {
    clearInterval(this.timeId)
    // 组件销毁后将监听器取消掉
    window.removeEventListener('resize', this.screenUpdate)
  },
  methods: {
    initecharts() {
      this.chartIn = this.$echarts.init(this.$refs.seller_ref, 'chalk')
      const initoptions = {
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
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#2d3443',
              // 解决背景分段问题
              type: 'solid',
            }
          }
        },
        series: {
          type: 'bar',
          label: {
            show: true,
            position: 'right',
            textStyle: {
              color: 'white'
            }
          }
        }
      }
      this.chartIn.setOption(initoptions)

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

      const dataoptions = {
        yAxis: {
          data: seleItem,
        },
        series: {
          data: seleValue,
        }
      }
      this.chartIn.setOption(dataoptions)
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
    },
    // 当浏览器的分辨力发生改变时，调用方法完成适配
    screenUpdate() {
      const textSize = this.$refs.seller_ref.offsetWidth / 100 * 3.6
      const adpterOptions = {
        title: {
          textStyle: {
            fontSize: textSize
          },
        },
        itemStyle: {
          borderRadius: [0, textSize / 2, textSize / 2, 0],
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: textSize,
            }
          }
        },
        series: {
          barWidth: textSize,
        }
      }
      this.chartIn.setOption(adpterOptions)
      // 手动调用图表的resize
      this.chartIn.resize()
    }
  }
}
</script>

<style></style>
