<template>
  <div id="map__heat"></div>
<!--     <div id="number-records-nd"></div>
    <div id="departement-row-chart"></div>
    <div id="population-chart"></div> -->
</template>

<script>

// const d3 = require('d3')
import * as d3 from 'd3'
import L from 'leaflet'
import * as leafletHeat from '@/assets/js/leaflet-heat'
import dc from 'dc'
import crossfilter from 'crossfilter'
import * as d3Queue from 'd3-queue'

console.log(leafletHeat, 'leaflet')

export default {
  name: 'MapHome',
  data () {
    return {
      map: false,
      svg: false,
      commercesGroup: false,
      featureCommerces: false,
      rootWidth: false,
      previousWidth: false,
      population: false,
      path: false,
      heat: false,
      mapLayer: false,
      heatLayer: false
    }
  },
  mounted () {
    var self = this

    d3Queue.queue()
      .defer(d3.json, '/static/data/densite.json')
      .await(makeGraphs)

    this.map = L.map('map__heat', {
      center: [48.853, 2.333],
      zoom: 10
    })

    var svg = d3.select(this.map.getPanes().overlayPane).append('svg')

    // this.svg = svg
    var transform = d3.geoTransform({ point: this.projectPoint })
    self.path = d3.geoPath().projection(transform)

    function makeGraphs (error, recordsJson) {
      if (error) {
        console.log('error')
      }
      // Clean data
      var records = [...recordsJson]
      // Create a Crossfilter instance
      var ndx = crossfilter(records)

      // Define Dimensions
      var populationDim = ndx.dimension(function (d) {
        return d.fields.population > 20 ? '< 20' : '> 20'
      })
      var departementDim = ndx.dimension(function (d) { return d.fields.nom_dept })
      var allDim = ndx.dimension(function (d) { return d.fields })

      // Group Data
      var populationGroup = populationDim.group()
      var departementGroup = departementDim.group()
      var all = ndx.groupAll()

      // Charts
      var numberRecordsND = dc.numberDisplay('#number-records-nd')
      var populationBrandChart = dc.rowChart('#population-chart')
      var departementChart = dc.rowChart('#departement-row-chart')

      numberRecordsND
        .formatNumber(d3.format('d'))
        .valueAccessor(function (d) { return d })
        .group(all)

      departementChart
        .width(200)
        .height(510)
        .dimension(departementDim)
        .group(departementGroup)
        .ordering(function (d) { return -d.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(10)
        .xAxis()
        .ticks(4)

      populationBrandChart
        .width(600)
        .height(300)
        .dimension(populationDim)
        .group(populationGroup)
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(20)
        .xAxis()
        .ticks(10)

      // Draw Map
      self.drawMap(svg, allDim, true)

      // Update the heatmap if any dc chart get filtered
      var dcCharts = [populationBrandChart, departementChart]

      dcCharts.forEach(function (dcChart) {
        // stop here
        dcChart.on('filtered', function (chart, filter) {
          var transitionPoints = new Promise(
            // La fonction de résolution est appelée avec la capacité de
            // tenir ou de rompre la promesse
            function (resolve, reject) {
              d3.selectAll('.leaflet-heatmap-layer')
                .transition()
                .duration(700)
                .style('opacity', '0')
                .transition()
                .duration(600)
                .style('opacity', '1')

              setTimeout(function () {
                resolve('la promesse marche')
              }, 550)
            }
          )

          transitionPoints.then(
            // On affiche un message avec la valeur
            function () {
              self.map.removeLayer(self.heatLayer)
              self.drawMap(svg, allDim)
            })
            .catch(
              // Promesse rejetée
              function () {
                console.log('promesse rompue')
              })
        })
      })

      dc.renderAll()
    }
  },
  methods: {
    drawMap (svg, allDim, mapConstruct) {
      // var commercesGroup = svg.append('g').attr('class', 'leaflet-zoom-hide')
      // map.setView([31.75, 110], 4)
      if (mapConstruct) {
        this.mapLayer = L.tileLayer('https://api.mapbox.com/styles/v1/renanbronchart/cjcjqu77v9elo2soyghb33i8h/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
          maxZoom: 30,
          minZoom: 10,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoicmVuYW5icm9uY2hhcnQiLCJhIjoiY2o5OW82cG1jMHdxZTMzcXRxbThnczZuMSJ9.zrdXIR4UBPh8195XRQPLtQ'
        }).addTo(this.map)
      }

      const allDimTop = allDim.top(Infinity)
      const maxValue = d3.max(allDimTop, function (d) { return +d.fields.population })

      // HeatMap
      var geoData = []

      // a voir si toujours utiles
      allDimTop.forEach(function (d) {
        geoData.push([d.fields.geo_point_2d[0], d.fields.geo_point_2d[1], ((d.fields.population) / maxValue)])
      })

      this.population = geoData
      console.log(geoData, 'geoData')

      var heatData = typeof this.heatLayer._heat === 'undefined' ? [] : this.heatLayer._heat._data
      console.log(heatData, 'thisheatlayer')

      var newGeoData = heatData.filter((el) => {
        return geoData.indexOf(el) === -1
      })

      console.log(newGeoData, 'newGeoData')
      console.log(geoData, '*****************************')

      this.heatLayer = L.heatLayer(geoData, {
        radius: 15,
        blur: 20,
        maxZoom: 8,
        minZoom: 25,
        id: 'heatmap.population',
        minOpacity: 0.2,
        gradient: {0.1: '#42d5fc', 0.6: '#0027fd'}
      }).addTo(this.map)

      d3.select('.leaflet-heatmap-layer')
    },
    projectPoint (x, y) {
      var point = this.map.latLngToLayerPoint(new L.LatLng(y, x))

      this.stream.point(point.x, point.y)
    }
  }
}
</script>

<style lang='scss' scoped>
  body {
    overflow: hidden;
  }

  .station {
    stroke: black;
  }

  .line {
    stroke-width: 5;
    fill: none;
    z-index: 1;
  }

  .box {
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.8);
    border-radius: 6px;
    box-sizing: border-box;
    display: none;
    padding: 10px;
    display: block;
    color: white;
  }

  .box-title {
    width: 100%;
    font-weight: bold;
    font-size: 150%;
    border-bottom: 1px solid white;
  }

  .right-box {
    position: absolute;
    right: 15px;
    top: 15px;
    min-width: 300px;
  }


  #map__heat {
    width: 100vw;
    height: calc(100vh - 160px);
  }

  .leaflet-tile-pane {
    z-index: -1;
  }

</style>
