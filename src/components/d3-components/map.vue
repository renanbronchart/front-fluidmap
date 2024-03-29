<template>
  <div class="map__heatContainer">
    <div id="map__heat">
      <Button
        label="?"
        linkName="Welcome"
        extraClass="button--round map__presetLink text--white text--sm"
        extraClassIcon="m-n"
        data-html2canvas-ignore
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Button from '@/components/molecules/Button.vue'

import * as d3 from 'd3'
import L from 'leaflet'
import * as leafletHeat from '@/assets/js/leaflet-heat'

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
    ...mapState({
      'places': 'places',
      'mapState': 'map'
    }),
    removePlaceActive () {
      if (!this.mapState.placeSelected) {
        d3.selectAll('.place--active').classed('.place--active', false)
      }
    }
  },
  watch: {
    'mapState.placeSelected' (newState, oldState) {
      if (!newState) {
        d3.selectAll('.place--active')
          .classed('place--active', false)
          .style('fill', 'black')
          .style('stroke-width', '0')
          .classed('place--hover', false)
      }
    },
    'mapState.dataHeat' (newState, oldState) {
      if (newState.length > 0) {
        this.redrawHeatMap(newState)
      }
    }
  },
  mounted () {
    this.openAlert({
      content: 'Votre contenu est en train de charger',
      autoclose: false
    })

    this.map = L.map('map__heat', {
      center: [48.853, 2.333],
      zoom: 13,
      maxZoom: 15,
      minZoom: 13,
      zoomAnimation: true,
      touchZoom: true,
      tapTolerance: 50,
      tap: true,
      inertia: true,
      inertiaDeceleration: 400,
      updateWhenIdle: false,
      draggable: true,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      preferCanvas: true,
      maxBoundsViscosity: 0.5
    })

    this.map.zoomControl.setPosition('bottomright')

    setTimeout(() => {
      this.drawMap()
    }, 100)
  },
  methods: {
    ...mapActions([
      'selectPlaces',
      'openAlert',
      'closeAlert'
    ]),
    drawHeatMap (heatPoints) {
      // const maxValue = d3.max(heatPoints, function (d) { return +d.properties.hint })
      // const maxValue = 10
      const geoData = []

      heatPoints.forEach(function (d) {
        if (d.geometry.coordinates !== null && !isNaN(+d.geometry.coordinates[0]) && !isNaN(+d.geometry.coordinates[1])) {
          geoData.push([+d.geometry.coordinates[0], +d.geometry.coordinates[1], d.properties.hint])
        }
      })

      this.heatLayer = L.heatLayer(geoData, {
        radius: 20,
        blur: 70,
        maxZoom: 6,
        minZoom: 12,
        max: 10,
        id: 'heatmap.population',
        minOpacity: 0.2,
        gradient: {0.01: '#42d5fc', 1: '#103dd8'} // mettre plus foncé aux deux couleurs, la deuxieme doit etre la premiere , et la deuxime beaucoup plus foncé.
      }).addTo(this.map)
    },
    redrawHeatMap (newState) {
      let transitionPoints = new Promise((resolve, reject) => {
        d3.select('.leaflet-heatmap-layer')
          .transition()
          .duration(700)
          .style('opacity', '0')
          .transition()
          .duration(500)
          .style('opacity', '1')

        setTimeout(function () {
          resolve('la promesse marche')
        }, 550)
      })

      transitionPoints.then((val) => {
        if (this.heatLayer) {
          this.map.removeLayer(this.heatLayer)
        }

        this.drawHeatMap(newState)

        this.closeAlert()
      }).catch(() => {
        console.log('la grosse promesse rompue')
      })
    },
    drawMap () {
      L.tileLayer('https://api.mapbox.com/styles/v1/renanbronchart/cjcjqu77v9elo2soyghb33i8h/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 30,
        minZoom: 10,
        preferCanvas: true,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicmVuYW5icm9uY2hhcnQiLCJhIjoiY2o5OW82cG1jMHdxZTMzcXRxbThnczZuMSJ9.zrdXIR4UBPh8195XRQPLtQ'
      }).addTo(this.map)

      this.drawPlaces()
    },
    drawPlaces () {
      var self = this
      var dataPlaces = this.places.places || []
      var svgPlaces = d3.select(this.map.getPanes().overlayPane).append('svg').style('z-index', '10000')
      var placesGroup = svgPlaces.append('g').attr('class', 'leaflet-zoom-hide')
      var featurePlaces
      var transform = d3.geoTransform({point: projectPoint})
      var path = d3.geoPath().projection(transform)
      var rootWidth, previousWidth
      var radius = d3.scaleLinear()
        .domain([0, d3.max(dataPlaces.features, function (d) { return +d.properties.capacity })])
        .range([4, 6])

      featurePlaces = placesGroup.selectAll('.place')
        .data(dataPlaces.features)
        .enter().append('path')
        .attr('class', 'place')
        .attr('id', function (d) { return d.properties.id })
        .attr('d', path.pointRadius(function (d) {
          return radius(d.properties.capacity)
        }))
        .style('fill', 'black')
        .style('opacity', '1')
        .on('mouseover', function (d) {
          const strokeWidth = this.getBoundingClientRect().width / 2

          d3.select(this).style('fill', 'white')
          d3.select(this).style('stroke', 'black')
          d3.select(this).style('stroke-width', strokeWidth)
          d3.select(this).classed('place--hover', true)
        })
        .on('mouseout', function (d) {
          if (!d3.select(this).classed('place--active') || !self.mapState.placeSelected) {
            d3.select(this).style('fill', 'black')
            d3.select(this).style('stroke-width', '0')
            d3.select(this).classed('place--hover', false)
          }
        })
        .on('click', function (d) {
          const strokeWidth = this.getBoundingClientRect().width / 2
          self.selectPlaces(d.properties)

          d3.selectAll('.place')
            .classed('place--active', false)
            .classed('place--hover', false)
            .style('fill', 'black')
            .style('stroke-width', '0')

          d3.select(this)
            .classed('place--active', true)
            .style('fill', 'white')
            .style('stroke', 'black')
            .style('stroke-width', strokeWidth)
        })

      this.map.on('zoom', reset)
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
          radius.range([4, 6 * (newWidth / rootWidth)])
        }
        featurePlaces.attr('d', path.pointRadius(function (d) {
          return radius(d.properties.capacity)
        }))
        previousWidth = newWidth
      }
      // Use Leaflet to implement a D3 geometric transformation.
      function projectPoint (y, x) {
        var point = self.map.latLngToLayerPoint(new L.LatLng(y, x))

        this.stream.point(point.x, point.y)
      }
    }
  },
  components: {
    Button
  }
}
</script>

<style lang='scss'>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/style.scss';
  @import '~stylesheets/components/_buttons.scss';

  .map {
    position: relative;
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


    .map__heatContainer {
      width: 100vw;
      position: fixed;
      top: 80px;
      bottom: 90px;
      transition: bottom .3s ease-in-out;
      #map__heat {
        height: 100%;
        position: relative;
      }
    }

    .events {
      position: absolute;
      bottom: 0;
      left: 40px;
    }

    .place--hover {
      cursor: pointer;
    }


    .map__presetLink {
      position: absolute;
      top: 40px;
      left: 40px;
      z-index: $z-index-preset-link;
    }

    &.map--active {
      .map__heatContainer {
        position: fixed;
        top: 80px;
        bottom: 250px;
        @include medium {
          bottom: 90px;
        }
      }
    }

    /* leaflet overide */
    /****************************/
    /****************************/
    /****************************/
    .leaflet-tile-pane {
      z-index: -1;
    }

    .leaflet-touch .leaflet-control-layers,
    .leaflet-touch .leaflet-bar {
      border: 0;
    }

    .leaflet-control-zoom {
      a.leaflet-control-zoom-in,
      a.leaflet-control-zoom-out {
        @extend .button;
        @extend .button--round;
        font-size: 18px;
        line-height: 40px;
        margin: 30px 30px 10px 30px;
      }
      a.leaflet-control-zoom-out {
        margin-top: 0;
      }
    }

    /****************************/
    /****************************/
  }

</style>
