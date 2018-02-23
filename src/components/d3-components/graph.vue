<template>
  <div class="graph">
    <div class="graph__header">
      <h5 class="graph__title m-b-md">Graphique - Indice de fréquentation</h5>
      <div class="graph__actions">
        <button @click.prevent="updateData(84)" class="graph__action text--info m-l-md p-sm">Semaine</button>
        <button @click.prevent="updateData(192)" class="graph__action text--info m-l-md p-sm">Jo entier</button>
        <button @click.prevent="updateData(12)" class="graph__action text--info m-l-md p-sm">Jour</button>
      </div>
    </div>

    <svg id="chart"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import HTTP from '@/utils/httpRequest.js'
  import ran from '@/utils/mathRan.js'

  import { mapGetters, mapActions } from 'vuex'

  var margin
  var width
  var height
  var svg
  var echelleX
  var echelleY
  var xAxe
  var yAxe
  var line
  var area
  var beginIndexTimestamp

  export default {
    data () {
      return {
        preset: {},
        timestampsAll: [],
        dataGraph: [],
        theTimestampStart: '',
        theNewDataGraph: []
      }
    },
    mounted () {
      if (this.$route.name === 'presetId') {
        if (this.getAllPresets[this.$route.params.id]) {
          this.preset = this.getAllPresets[this.$route.params.id]
          this.setCurrentPreset(this.preset)
        } else {
          this.$router.push({name: 'Home'})
        }
      } else {
        this.preset = this.getNewPreset

        if (typeof this.preset.name === 'undefined') {
          this.$router.push({name: 'Home'})
        }
      }

      this.theTimestampStart = this.preset.dates[0]
      this.timestampsAll = [...this.getAllTimestamps]

      HTTP.get(`event/place/${this.preset.place_id}`).then(({data}) => {
        const hints = [...data.features.properties.hints]

        const dataGraph = this.timestampsAll.map((timeStart, index) => {
          return [timeStart, hints[index]]
        })

        this.dataGraph = this.calculMedian(dataGraph)
        this.drawGraph()
      })
    },
    computed: {
      ...mapGetters([
        'getAllTimestamps',
        'getCurrentPreset',
        'getNewPreset',
        'getAllPresets'
      ])
    },
    methods: {
      ...mapActions([
        'setCurrentPreset'
      ]),
      hightHintsFiltered () {
        let nombres = [...this.hightHints.data]
        let newNombres = this.calculMedian(nombres)

        newNombres.sort(function (a, b) {
          return a - b
        })

        console.log(newNombres, 'newNombres')

        // {
        //   date: 'date0',
        //   timestampStart: 'timestampStart0',
        //   timestampEnd: 'timestampEnd0',
        //   hint: 'hint0'
        // },
      },
      calculMedian (myArray) {
        // Calcul de la médiane.
        const mediane = d3.median(myArray, function (d) { return +d[1] })

        const array2 = myArray.map((value, index) => {
          let coef = ran[index]

          let newArray = [...value]
          let indice = parseFloat(newArray[1])
          let finalIndice

          if (indice > mediane) {
            finalIndice = (indice - mediane) * coef
          } else {
            finalIndice = (indice + mediane) * coef
          }

          return [newArray[0], finalIndice]
        })

        return array2
      },
      updateData (sliceNumber) {
        // Get the data again
        var newDataGraph = JSON.parse(JSON.stringify(this.dataGraph)).slice(0, sliceNumber)

        newDataGraph.forEach(function (d) {
          d[0] = new Date(d[0] * 1000)
          d[1] = +d[1]
        })

        this.theNewDataGraph = JSON.parse(JSON.stringify(newDataGraph))

        // Scale the range of the data again
        echelleX.domain(d3.extent(newDataGraph, function (d) { return d[0] }))

        echelleY.domain([0, d3.max(newDataGraph, function (d) { return +d[1] })])

        // Select the section we want to apply our changes to
        var svg = d3.select('svg')

        // Make the changes
        svg.selectAll('.line')
          .transition()
          .duration(750)
          .attr('d', line(newDataGraph))
          .style('stroke', 'url(#mainGradientLine)')
          .duration(750)

        svg.selectAll('.area')
          .transition()
          .duration(750)
          .attr('d', area(newDataGraph))
          .duration(750)
        svg.selectAll('.x.axis')
          .transition()
          .duration(750)
          .call(xAxe)
          .duration(750)
        svg.selectAll('.y.axis')
          .transition()
          .duration(750)
          .call(yAxe)
          .duration(750)

        d3.select(window).on('resize', null)

        var resize = function resize () {
          var width = parseInt(d3.select('#chart').style('width')) - margin.left - margin.right
          var height = parseInt(d3.select('#chart').style('height')) - margin.top - margin.bottom

          echelleX.range([0, width])
          echelleY.range([height, 0])

          // Update the axis and text with the new scale
          svg.select('.x.axis')
            .attr('transform', 'translate(' + margin.left + ',' + height + ')')
            .call(xAxe)

          svg.select('.y.axis')
            .attr('transform', 'translate(' + margin.left + ',0)')
            .call(yAxe)

          // Force D3 to recalculate and update the line
          svg.selectAll('.line')
            .attr('d', line(newDataGraph))

          console.log(height, 'line')
          // Force D3 to recalculate and update the line
          svg.selectAll('.area')
            .attr('d', area(newDataGraph))

          // Update the tick marks
          xAxe.ticks(Math.max(width / 75, 2))
          yAxe.ticks(Math.max(height / 50, 2))
        }

        d3.select(window).on('resize', resize)
      },
      drawGraph () {
        var newDataGraph
        margin = {top: 20, right: 0, bottom: 30, left: 60}
        width = parseInt(d3.select('#chart').style('width')) - margin.left - margin.right
        height = parseInt(d3.select('#chart').style('height')) - margin.top - margin.bottom
        beginIndexTimestamp = this.timestampsAll.indexOf(this.theTimestampStart) - 5
        beginIndexTimestamp = beginIndexTimestamp < 0 ? 0 : beginIndexTimestamp

        svg = d3.select('svg')

        echelleX = d3.scaleTime().range([0, width])
        echelleY = d3.scaleLinear().range([height, 0])

        xAxe = d3.axisBottom(echelleX)
        yAxe = d3.axisLeft(echelleY)

        line = d3.line()
          .x(function (d) { return echelleX(d[0]) })
          .y(function (d) { return echelleY(+d[1]) })
          .curve(d3.curveBasis)

        area = d3.area()
          .x(function (d) { return echelleX(d[0]) })
          .y0(height)
          .y1(function (d) { return echelleY(+d[1]) })
          .curve(d3.curveBasis)

        svg.attr({'width': width + margin.left + margin.right, 'height': height + margin.top + margin.bottom})

        newDataGraph = JSON.parse(JSON.stringify(this.dataGraph))
          .slice(beginIndexTimestamp, (beginIndexTimestamp + 12))

        newDataGraph.forEach(function (d) {
          d[0] = new Date(d[0] * 1000)
          d[1] = +d[1]
        })

        this.theNewDataGraph = JSON.parse(JSON.stringify(newDataGraph))

        echelleX.domain(d3.extent(newDataGraph, function (d) { return d[0] }))

        echelleY.domain([0, d3.max(newDataGraph, function (d) { return +d[1] })])

        // area.y0(echelleY(0))

        var resize = function resize () {
          var width = parseInt(d3.select('#chart').style('width')) - margin.left - margin.right
          var height = parseInt(d3.select('#chart').style('height')) - margin.top - margin.bottom

          echelleX.range([0, width])
          echelleY.range([height, 0])

          // Update the axis and text with the new scale
          svg.select('.x.axis')
            .attr('transform', 'translate(' + margin.left + ',' + height + ')')
            .call(xAxe)

          svg.select('.y.axis')
            .attr('transform', 'translate(' + margin.left + ',0)')
            .call(yAxe)

          // Force D3 to recalculate and update the line
          svg.selectAll('.line')
            .attr('d', line)
          // Force D3 to recalculate and update the line
          svg.selectAll('.area')
            .attr('d', area)

          // Update the tick marks
          xAxe.ticks(Math.max(width / 75, 2))
          yAxe.ticks(Math.max(height / 50, 2))
        }

        d3.select(window).on('resize', resize)

        svg.append('g')
          .attr('class', 'x axis')
          .style('font-size', '9px')
          .style('fill', 'none')
          .style('stroke', '#cecece')
          .attr('transform', 'translate(' + margin.left + ',' + height + ')')
          .call(xAxe)

        svg.append('g')
          .attr('class', 'y axis')
          .style('font-size', '11px')
          .style('fill', 'none')
          .style('stroke', '#cecece')
          .attr('transform', 'translate(' + margin.left + ',0)')
          .call(yAxe)

        svg.append('path')
          .datum(newDataGraph)
          .attr('class', 'line')
          .style('fill', 'none')
          .style('stroke', 'url(#mainGradientLine)')
          .style('stroke-width', '2px')
          .attr('transform', 'translate(' + margin.left + ',0)')
          .attr('d', line)

        svg.append('path')
          .datum(newDataGraph)
          .attr('class', 'area')
          .attr('fill', 'url(#mainGradientArea)')
          .attr('transform', 'translate(' + margin.left + ',0)')
          .style('opacity', '.3')
          .attr('d', area)

        var svgDefs = svg.append('defs')

        var mainGradientLine = svgDefs.append('linearGradient')
          .attr('id', 'mainGradientLine')
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', 0).attr('y1', echelleY(0))
          .attr('x2', 0).attr('y2', echelleY(1))

        mainGradientLine.append('stop')
          .attr('class', 'stop-left')
          .attr('offset', '0')

        mainGradientLine.append('stop')
          .attr('class', 'stop-10')
          .attr('offset', '.3')

        mainGradientLine.append('stop')
          .attr('class', 'stop-40')
          .attr('offset', '5')

        mainGradientLine.append('stop')
          .attr('class', 'stop-right')
          .attr('offset', '10')

        var mainGradientArea = svgDefs.append('linearGradient')
          .attr('id', 'mainGradientArea')
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', 0).attr('y1', echelleY(0))
          .attr('x2', 0).attr('y2', echelleY(1))

        mainGradientArea.append('stop')
          .attr('class', 'stop-left')
          .attr('offset', '0')

        mainGradientArea.append('stop')
          .attr('class', 'stop-30')
          .attr('offset', '0.1')

        mainGradientArea.append('stop')
          .attr('class', 'stop-60')
          .attr('offset', '5')

        mainGradientArea.append('stop')
          .attr('class', 'stop-right')
          .attr('offset', '10')
      }
    }
  }
</script>

<style lang='scss'>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/style.scss';

  .graph__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .graph__action {
    border-bottom: 2px solid $color-caribbean-green;
  }

  #chart {
    width: 100%;
    height: 460px;
  }

  .y.axis {
    line {
      stroke: $gray-light;
    }

    path {
      stroke: $gray-light;
    }

    text {
      stroke: $gray-light;
    }
  }

  .x.axis {
    line {
      stroke: $gray-light;
    }

    path {
      stroke: $gray-light;
    }

    text {
      stroke: $gray-light;
    }
  }

  #mainGradientLine {
    .stop-left {
      stop-color: $color-caribbean-green;  /* bottom */
    }

    .stop-10 {
      stop-color: $color-malibu;  /* middle */
    }

    .stop-40 {
      stop-color: $color-blue-ribbon;  /* top */
    }
  }

  #mainGradientArea {
    .stop-left {
      stop-color: #C0DEED;  /* bottom */
    }

    .stop-30 {
      stop-color: #1DCAFF;  /* middle */
    }

    .stop-60 {
      stop-color: #00ACED;  /* red */
    }
  }

  .filled {
    fill: url(#mainGradient);
  }

  .outlined {
    fill: none;
    stroke: url(#mainGradient);
    stroke-width: 4;
  }
</style>
