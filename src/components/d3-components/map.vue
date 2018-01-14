<template>
  <div>
    <div id="map"></div>
    <div id="number-records-nd"></div>
    <div id="departement-row-chart"></div>
    <div id="population-chart"></div>
  </div>
</template>

<script>

// const d3 = require('d3')
import * as d3 from 'd3'
import L from 'leaflet'
import * as leafletHeat from '@/assets/leaflet-heat'
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
      path: false,
      heat: false
    }
  },
  mounted () {
    var self = this

    d3Queue.queue()
      .defer(d3.json, 'static/data/densite.json')
      .await(makeGraphs)

    this.map = L.map('map', {
      center: [48.853, 2.333],
      zoom: 10
    })

    var svg = d3.select(this.map.getPanes().overlayPane).append('svg')

    // this.svg = svg
    // console.log(this.svg, 'this.svg')
    var transform = d3.geoTransform({ point: this.projectPoint })
    self.path = d3.geoPath().projection(transform)

    function makeGraphs (error, recordsJson) {
      console.log(recordsJson)
      if (error) {
        console.log('error')
      }
      // Clean data
      var records = [...recordsJson]

      // Create a Crossfilter instance
      var ndx = crossfilter(records)

      console.log(ndx, 'ndx')
      console.log(records, 'records')

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

      // console.log(departementGroup.groupAll().value(), 'populationDim')

      // Charts
      var numberRecordsND = dc.numberDisplay('#number-records-nd')
      var populationBrandChart = dc.rowChart('#population-chart')
      var departementChart = dc.rowChart('#departement-row-chart')

      console.log(populationBrandChart, 'populationBrandChart')
      console.log(departementChart, 'departementChart')

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
        .width(500)
        .height(10000)
        .dimension(populationDim)
        .group(populationGroup)
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(20)
        .xAxis()
        .ticks(10)

      // console.log(populationBrandChart, 'populationBrandChart')
      // console.log(departementChart, 'departementChart')

      // Draw Map
      self.drawMap(svg, allDim)

      // Update the heatmap if any dc chart get filtered
      var dcCharts = [populationBrandChart, departementChart]

      dcCharts.forEach(function (dcChart) {
        console.log(dcChart, 'dcChart')

        // stop here
        dcChart.on('filtered', function (chart, filter) {
          var transitionPoints = new Promise(
            // La fonction de résolution est appelée avec la capacité de
            // tenir ou de rompre la promesse
            function (resolve, reject) {
              d3.select('.leaflet-container')
                .transition()
                .duration(700)
                .style('opacity', '0')
                .transition()
                .duration(500)
                .style('opacity', '1')

              setTimeout(function () {
                resolve('la promesse marche')
              }, 550)
            }
          )

          transitionPoints.then(
            // On affiche un message avec la valeur
            function () {
              self.map.eachLayer(function (layer) {
                self.map.removeLayer(layer)
              })

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
    drawMap (svg, allDim) {
      // var commercesGroup = svg.append('g').attr('class', 'leaflet-zoom-hide')
      // map.setView([31.75, 110], 4)
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 30,
        minZoom: 8,
        id: 'mapbox.streets',
        accessToken: 'sk.eyJ1IjoicmVuYW5icm9uY2hhcnQiLCJhIjoiY2o5OW84enp2MHoyOTMzbndla3cyN3hrcCJ9.DdB659aMvccAu0B6ag8aJA'
      }).addTo(this.map)

      var allDimTop = allDim.top(Infinity)
      // var radius = d3.scaleLinear()
      //   .domain([0, d3.max(allDimTop, function (d) { return +d.fields.population })])
      //   .range([2, 50])

      const maxValue = d3.max(allDimTop, function (d) { return +d.fields.population })

      // HeatMap
      var geoData = []

      // a voir si toujours utiles
      allDimTop.forEach(function (d) {
        geoData.push([d.fields.geo_point_2d[0], d.fields.geo_point_2d[1], ((d.fields.population) / maxValue)])
      })

      // this.featureCommerces = commercesGroup.selectAll('.commerces')
      //   .data(allDimTop)
      //   .enter()
      //   .append('path')
      //   .attr('class', 'commerces')
      //   .attr('d', this.path.pointRadius(function (d) {
      //     return radius(Math.floor((d.fields.population)) * 100)
      //   }))
      //   .style('fill', 'black')
      //   .style('z-index', function (d) { return Math.floor((d.fields.population)) })
      //   .on('mouseover', function (d) {

      //     console.log(d, 'd')
      //   })

      var heat = L.heatLayer(geoData, {
        radius: 10,
        blur: 15,
        maxZoom: 8,
        minZoom: 25,
        // max: 2,
        minOpacity: 0.5
      }).addTo(this.map)

      console.log(heat)
    },
    projectPoint (x, y) {
      var point = this.map.latLngToLayerPoint(new L.LatLng(y, x))

      this.stream.point(point.x, point.y)
    }
  }
}
</script>

<style>
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


  #map {
    width: 100vw;
    height: 50vh;
  }

  .leaflet-tile-pane {
    z-index: -1;
  }

</style>
