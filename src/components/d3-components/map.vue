<template>
  <div id="map__heat"></div>
<!--     <div id="number-records-nd"></div>
    <div id="departement-row-chart"></div>
    <div id="population-chart"></div> -->

</template>

<script>
import { mapState } from 'vuex'

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
  computed: {
    ...mapState([
      'places'
    ])
  },
  mounted () {
    var self = this

    d3Queue.queue()
      .defer(d3.json, '/static/data/densite.json')
      .await(makeGraphs)

    this.map = L.map('map__heat', {
      center: [48.853, 2.333],
      zoom: 13
    })

    var svg = d3.select(this.map.getPanes().overlayPane).append('svg')

    function makeGraphs (error, recordsJson) {
      if (error) {
        console.log('error')
      }
      // Clean data
      var records = [...recordsJson]
      // Create a Crossfilter instance
      var ndx = crossfilter(records)

      // Define Dimensions
      var allDim = ndx.dimension(function (d) { return d.fields })

      // Draw Map
      self.drawMap(svg, allDim, true)

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

        this.drawPlaces()
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
    drawPlaces () {
      var self = this
      var dataPlaces = this.places.places

      var svgPlaces = d3.select(this.map.getPanes().overlayPane).append('svg')
      var placesGroup = svgPlaces.append('g').attr('class', 'leaflet-zoom-hide')

      var featureStation

      var transform = d3.geoTransform({point: projectPoint})
      var path = d3.geoPath().projection(transform)

      var rootWidth, previousWidth

      ready(dataPlaces)

      function ready (dataPlaces) {
        // (dataPlaces are ordered from the bigger one to the smaller one
        // like that, smaller circle will be on the top of bigger ones

        var radius = d3.scaleLinear()
          .domain([0, d3.max(dataPlaces.features, function (d) { return +d.properties.capacity })])
          .range([4, 8])

        featureStation = placesGroup.selectAll('.places')
          .data(dataPlaces.features)
          .enter().append('path')
          .attr('class', 'places')
          .attr('id', function (d) { return d.properties.id })
          .attr('d', path.pointRadius(function (d) {
            return radius(d.properties.capacity)
          }))
          .style('fill', 'black')
          .style('z-index', '100000')
          .style('opacity', '1')
          .on('click', (d) => {
            console.log(d)
          })

        self.map.on('zoom', reset)
        reset()

        // Reposition the SVG to cover the features.
        function reset () {
          var bounds = path.bounds(dataPlaces)
          var topLeft = bounds[0]
          var bottomRight = bounds[1]

          svgPlaces.attr('width', bottomRight[0] - topLeft[0])
            .attr('height', bottomRight[1] - topLeft[1])
            .style('left', topLeft[0] + 'px')
            .style('top', topLeft[1] + 'px')
            .style('overflow', 'visible')

          placesGroup.attr('transform', 'translate(' + -topLeft[0] + ',' + -topLeft[1] + ')')

          if (rootWidth === undefined) { // rootWidth means max range for(dataPlaces radius = 50
            rootWidth = bottomRight[0] - topLeft[0]
            previousWidth = rootWidth
          }

          var newWidth = bottomRight[0] - topLeft[0]
          if (previousWidth !== newWidth) {
            radius.range([4, 8 * (newWidth / rootWidth)])
          }
          featureStation.attr('d', path.pointRadius(function (d) {
            return radius(d.properties.capacity)
          }))
          previousWidth = newWidth
        }
      }

      // Use Leaflet to implement a D3 geometric transformation.
      function projectPoint (y, x) {
        var point = self.map.latLngToLayerPoint(new L.LatLng(y, x))

        this.stream.point(point.x, point.y)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
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
    height: calc(100vh - 170px);
    position: relative;
  }

  .events {
    position: absolute;
    bottom: 0;
    left: 40px;
  }

  .leaflet-tile-pane {
    z-index: -1;
  }

</style>
