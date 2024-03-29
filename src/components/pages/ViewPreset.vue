<template>
  <div class="analyse container">
    <div class="analyse__header">
      <div class="analyse__title">
        <h2 class="m-t-lg">{{getTitlePage}}</h2>
        <div class="analyse__actions">
          <Button
            label="Modifier la tranche horaire"
            extraClass="button--primary button--ghost button__analyseAction m-t-lg"
            @eventClick="updatePreset"
          />
          <Button
            label="Ajouter aux favoris"
            extraClass="button--primary button--ghost button__analyseAction m-t-lg"
            @eventClick="savePreset"
            v-if="isNewPreset"
          />
          <Button
            label="Exporter en PDF"
            extraClass="button--primary button__analyseAction m-t-lg"
            @eventClick="exportPdf"
          />
        </div>
      </div>
      <p class="m-t-xl" v-if="isPlacePreset">L'indice de fréquentation est une moyenne faite sur la tranche horaire que vous avez séléctionnée.</p> <!-- à remplacer par le composant -->
      <div class="analyse__generalInfos">
        <h3 class="analyse__eventTitle m-t-xl" v-if="isEventPreset">{{preset.name}}</h3>
        <div class="general__agenda m-t-md">
          <TextInfos
            :content="displayDatePreset"
            iconName="today"
            extraClass="information__primary"
            v-if="preset.eventsId"
          />
          <TextInfos
            :content="displaySchedulesPreset"
            iconName="access_time"
            extraClass="information__primary m-l-lg"
            v-if="preset.eventsId"
          />
          <TextInfos
            :content="this.placePreset.properties.name"
            iconName="location_on"
            extraClass="information__primary m-l-lg"
            v-if="this.placePreset.properties"
          />
        </div>
        <div class="general__viewPlace row m-t-md">
          <div class="col-xs-12 col-sm-6 col-md-8 m-b-md">
            <Card :style="{backgroundImage: 'url(' + getMapSrc + ')'}" extraClass="general__map">
              <Button
                iconName="zoom_out_map"
                extraClass="button--round general__mapButton"
                extraClassIcon="m-n"
                @eventClick="updatePreset"
                data-html2canvas-ignore
              />
            </Card>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 m-b-md">
            <div class="general__statistics">
              <Card class="card__pres p-md">
                <p class="text--secondary p-sm">Indice de fréquentation</p>
                <div class="bubble_block">
                  <Bubbles :indice="getIndiceMean"></Bubbles>
                  <h4 class="h1 text--primary m-l-sm">{{Math.round(getIndiceMean * 100) / 100}}</h4>
                </div>
              </Card>
              <Card class="card__pres p-md m-t-md">
                <p class="text--secondary p-sm">Capacité d’accueil</p>
                <div class="capacity_block">
                  <i class="material-icons text--danger icn--md m-t-sm">person</i>
                  <h4 class="h1 text--danger m-l-sm">
                    {{ this.placePreset.properties.capacity }}<br>
                    <p class="text--secondary">personnes</p>
                  </h4>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Card extraClass="p-lg">
        <div class="analyse__graph">
          <div class="graph__view">
            <Graph></Graph>
          </div>
        </div>
        <div class="graph__tables row m-t-xl">
          <div class="col-xs-12 col-md-6">
            <TableComponent
              title="Pics hauts sur cette période"
              :columns="hightHints.columns"
              :data="hightHints.data"
              extraClass="m-t-lg table--left table--lastColumnLeft"
            />
          </div>
          <div class="col-xs-12 col-md-6">
            <TableComponent
              title="Pics bas sur cette période"
              :columns="hightHints.columns"
              :data="hightHints.data"
              extraClass="m-t-lg table--right table--lastColumnLeft"
            />
          </div>
        </div>
      </Card>
      <div class="analyse__secondaryInfos row m-t-md">
        <div class="col-xs-12 col-md-6">
          <Card extraClass="p-lg">
            <div class="analyse__eventsSchedules">
              <h4>Autres évènements dans cette tranche horaire {{getSchedulesPreset}}</h4>
              <p class="text--secondary text--center m-t-xxl m-b-xxl" v-if="eventsShowFiltered.length === 0">Il n'y a pas d'évènement dans cette période</p>
              <ul>
                <EventInfo
                  v-for="(event, index) in eventsShowFiltered"
                  :event="event"
                  v-if="index <= eventsShow.count"
                  extraClass="event--dashboard p-t-md p-b-md"/>
              </ul>
              <TextInfos
                :content="eventsShow.showMoreLabel ? 'Afficher plus' : 'Afficher moins'"
                :iconName="eventsShow.showMoreLabel ? 'add' : 'remove'"
                extraClass="information__primary text--info cursor--pointer information--right"
                alignIcon="right"
                @eventClick="showOrHide('eventsShow')"
              />

            </div>
            <div class="analyse__eventsNext m-t-lg" v-if="isEventPreset">
              <h4>Évènements suivants entre {{getSchedulesPresetNext}}</h4>
              <p class="text--secondary text--center m-t-xxl m-b-xxl" v-if="events.eventsSchedules.length === 0">Il n'y a pas d'évènement dans la période suivante période</p>
              <ul>
                <EventInfo
                  v-for="(event, index) in events.eventsSchedules"
                  :event="event"
                  v-if="index <= eventSchedulesShow.count"
                  extraClass="event--dashboard p-t-md p-b-md"/>
              </ul>
              <TextInfos
                :content="eventSchedulesShow.showMoreLabel ? 'Afficher plus' : 'Afficher moins'"
                :iconName="eventSchedulesShow.showMoreLabel ? 'add' : 'remove'"
                extraClass="information__primary text--info cursor--pointer information--right"
                alignIcon="right"
                @eventClick="showOrHide('eventSchedulesShow')"
              />
            </div>
          </Card>
        </div>

        <div class="col-xs-12 col-md-6">
          <Card extraClass="p-lg">
            <div class="analyse__eventsStations">
              <h4>Stations à proximiter du lieu</h4>
              <p class="text--secondary text--center m-t-xxl m-b-xxl" v-if="getStationsData.length === 0">Il n'y a pas de stations très proche de ce lieu</p>
              <TableComponent
                :columns="stationsData.columns"
                :data="getStationsData"
                extraClass="m-t-sm table--lastColumnLeft"
                :rowTodisplay="stationsShow.count"
                v-else
              >
                <div v-for="(data, index) in getStationsData" :slot="`station-${index}`">
                  <p class="text--bold m-b-sm">{{data.name}}</p>
                  <StationIcon
                    :number="line.count"
                    :hexa="line.background"
                    :fontColor="line.color"
                    extraClass="m-r-sm"
                    v-for="line in data.lines"
                  />
                </div>

                <div v-for="(data, index) in getStationsData" :slot="`indice-${index}`">
                  <Notifications
                    extraClass="notification__primary text--white"
                    :count="data.hint"
                  />
                </div>
              </TableComponent>
              <TextInfos
                :content="stationsShow.showMoreLabel ? 'Afficher plus' : 'Afficher moins'"
                :iconName="stationsShow.showMoreLabel ? 'add' : 'remove'"
                extraClass="information__primary text--info cursor--pointer information--right"
                alignIcon="right"
                @eventClick="showOrHide('stationsShow')"
              />
            </div>
          </Card>
        </div>
      </div>
      <div class="analyse__exportAction m-t-md">
        <Button
          label="Exporter en PDF"
          extraClass="button--primary button__analyseAction"
          @eventClick="exportPdf"
        />
      </div>
    </div>

  </div>
</template>

<script>
  import parameterize from 'parameterize-string'
  import * as d3 from 'd3'
  import ran from '@/utils/mathRan.js'

  import HTTP from '@/utils/httpRequest.js'
  import associateStations from '@/utils/associateStations.js'
  import exportToPdf from '@/utils/exportPdfCanvas.js'
  import s3 from '@/utils/amazonBucket.js'

  import Button from '@/components/molecules/Button.vue'
  import TextInfos from '@/components/molecules/TextInfos.vue'
  import Notifications from '@/components/molecules/Notifications.vue'
  import Card from '@/components/elements/Card.vue'
  import TableComponent from '@/components/elements/TableComponent.vue'
  import EventInfo from '@/components/elements/events/EventInfo.vue'
  import StationIcon from '@/components/molecules/StationIcon.vue'
  import Bubbles from '@/components/molecules/Bubbles.vue'
  import Graph from '@/components/d3-components/graph'

  import { mapState, mapGetters, mapActions } from 'vuex'

  import mapDate from '@/utils/manipulateDate.js'

  export default {
    data () {
      return {
        preset: {},
        placePreset: {},
        eventsShow: {
          data: [],
          count: 3,
          showMoreLabel: true
        },
        eventSchedulesShow: {
          data: [],
          count: 3,
          showMoreLabel: true
        },
        stationsShow: {
          data: [],
          count: 3,
          showMoreLabel: true
        },
        hightHints: {
          data: [
            {
              date: '08.08.2024',
              timestampStart: '12h00',
              timestampEnd: '14h00',
              hint: '1'
            },
            {
              date: '08.08.2024',
              timestampStart: '18h00',
              timestampEnd: '20h00',
              hint: '0.2'
            },
            {
              date: '08.08.2024',
              timestampStart: '20h00',
              timestampEnd: '23h00',
              hint: '3'
            }
          ],
          columns: [
            {
              field: 'date',
              label: 'Date'
            },
            {
              field: 'timestampStart',
              label: 'Heure de début'
            },
            {
              field: 'timestampEnd',
              label: 'Heure de fin'
            },
            {
              field: 'hint',
              label: 'Indice'
            }
          ]
        },
        stationsData: {
          columns: [
            {
              field: 'station',
              label: 'Gare'
            },
            {
              field: 'indice',
              label: 'Indice'
            }
          ]
        }
      }
    },
    computed: {
      ...mapState([
        'events',
        'map'
      ]),
      ...mapGetters([
        'getCurrentPreset',
        'getNewPreset',
        'isEditionMode',
        'getLengthPreset',
        'getAllPresets'
      ]),
      getRouteName () {
        return this.$route.name
      },
      isPlacePreset () {
        return this.preset.type === 'place'
      },
      isEventPreset () {
        return this.preset.type === 'event'
      },
      isNewPreset () {
        return this.$route.name === 'newPreset'
      },
      getTitlePage () {
        return this.isNewPreset ? 'Analyse' : this.preset.name
      },
      getSchedulesPreset () {
        const dates = this.preset.dates

        return typeof dates === 'undefined' ? '' : mapDate.extandedSchedules(dates[0], dates[1])
      },
      getSchedulesPresetNext () {
        const dates = this.preset.dates

        return typeof dates === 'undefined' ? '' : mapDate.getSchedulesDisplay(dates[1])
      },
      getIndiceMean () {
        return d3.mean(this.placePreset.properties.hints, function (d) { return +d })
      },
      eventsShowFiltered () {
        const names = []

        return this.eventsShow.data.filter((elem, pos, arr) => {
          if (names.indexOf(elem.name) < 0) {
            names.push(elem.name)
            return true
          }
        })
      },
      hightHintsFiltered () {
        // const hints = []
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
      lowHintsFiltered () {
        // const hints = []
      },
      getMapSrc () {
        if (this.isNewPreset) {
          return this.map.instantImage
        } else {
          return this.preset.mapImage
        }
      },
      displayDatePreset () {
        const dates = this.preset.dates
        const date = mapDate.getDateWithDay(dates[0]) || ''

        return date
      },
      displaySchedulesPreset () {
        const dates = this.preset.dates

        return mapDate.extandedSchedules(dates[0], dates[1]) || ''
      },
      getStationsData () {
        const names = []

        const stationsShowFiltered = this.stationsShow.data.filter((elem) => {
          if (names.indexOf(elem.name) < 0) {
            names.push(elem.name)
            return true
          }
        })

        const newStations = stationsShowFiltered.map(station => {
          let theStation = {...station}
          let stationParameterize = parameterize(theStation.name)

          let stationWithLines = associateStations.find(station => {
            return parameterize(station.stationName) === stationParameterize
          })

          let lines = typeof stationWithLines === 'undefined' ? [] : [...stationWithLines.lines]
          const meanValue = d3.mean(theStation.hints, function (d) { return +d }) || 1

          const stationFormate = {
            name: theStation.name,
            lines,
            hint: Math.round(meanValue)
          }

          return stationFormate
        })

        return newStations
      }
    },
    mounted () {
      if (this.getRouteName === 'presetId') {
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

      // this.preset = this.getRouteName === 'newPreset' ? this.getNewPreset : this.getCurrentPreset

      // if (typeof this.preset.name === 'undefined') {
      //   alert('plop')
      //   this.$router.push({name: 'Home'})
      // }

      if (this.isPlacePreset) {
        HTTP.get(`event/place/${this.preset.place_id}?timestampStart=${this.preset.dates[0]}&timestampEnd=${this.preset.dates[1]}`).then(({data}) => {
          const placePreset = data.features
          this.placePreset = placePreset

          this.eventsShow.data = placePreset.properties.events
          // this.hints.data = placePreset.properties.hints
          this.stationsShow.data = placePreset.properties.stations_closest
          // this.stationsShow.data =
        }).catch(error => {
          console.log('error view preset', error)
        })
      } else {
        HTTP.get(`event/place/${this.preset.place_id}?timestampStart=${this.preset.dates[0]}&timestampEnd=${this.preset.dates[1]}`).then(({data}) => {
          const placePreset = data.features
          this.placePreset = placePreset

          this.eventsShow.data = placePreset.properties.events
          // this.hightHints.data = placePreset.properties.hints
          this.stationsShow.data = placePreset.properties.stations_closest
        }).catch(error => {
          console.log('error view preset', error)
        })
      }
      // Si eventsId.length > 1 ,
      // alors requete api de currentPreset.place_id ou chercher par l'id avec tous les places
      // + requete events place_id dans la tranche horaire : `event/place/${currentPreset.place_id}/events?time`

      // Si eventsId.length === 1 ,
      // alors requete api de l'event : currentPreset.eventsId[0] ou chercher par l'id avec tous les events
      // + requete events place_id dans la tranche horaire : `event/place/${currentPreset.place_id}/events?time`
      // + requete de tous les events avec timestamps en parametres (attendre API)
      // + requete de tous les events avec les dates suivants, dans une période de deux heures (attendre API)

      // requete de tous les hints de la place. (attendre l'API)

      // après avoir reçu tous les hints, mettre le graph en place
    },
    destroyed () {
      this.removeNewPreset()

      if (!this.isEditionMode) {
        this.removeCurrentPreset()
      }
    },
    methods: {
      ...mapActions([
        'saveNewPreset',
        'removeNewPreset',
        'removeCurrentPreset',
        'switchEditionMode',
        'selectPlaces',
        'selectEvent',
        'setValueSliders',
        'setExpandedDate',
        'openAlert',
        'setCurrentPreset'
      ]),
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
      showOrHide (section) {
        const showMoreLabel = this[section]['showMoreLabel']

        if (showMoreLabel) {
          this[section]['count'] += 100
        } else {
          this[section]['count'] -= 100
        }

        this[section]['showMoreLabel'] = !showMoreLabel
      },
      exportPdf () {
        var src = document.querySelector('.analyse.container')

        this.openAlert({
          content: 'Cette opération s\'effectuera dans moins d\'une minute',
          autoclose: true,
          iconName: 'info'
        })

        exportToPdf(src, 2, 80)
      },
      savePreset () {
        this.sendCanvasToS3(this.map.instantImage)
      },
      sendCanvasToS3 (canvas) {
        // eslint-disable-next-line
        const buf = new Buffer(canvas.replace(/^data:image\/\w+;base64,/, ''), 'base64')
        const photoKey = `preset_img/${parseFloat(this.getLengthPreset) + 1}.png`

        s3.upload({
          Key: photoKey,
          ContentType: 'image/png',
          Body: buf,
          ACL: 'public-read'
        }, (err, {Location}) => {
          if (err) {
            return console.log('There was an error uploading your photo: ', err.message)
          } else {
            this.preset.mapImage = Location
            this.saveNewPreset(this.preset)

            this.$router.push({name: 'presets'})
          }
        })
      },
      updatePreset () {
        const timestampStart = this.preset.map.dates[0]
        const timestapEnd = this.preset.map.dates[1]
        const valueDays = mapDate.getDateDisplay(timestampStart)
        const valueHours = mapDate.getSchedulesDisplay(timestampStart)
        const valueExpandedHours = `${mapDate.getHourDisplay(timestampStart)}H - ${mapDate.getHourDisplay(timestapEnd)}H`

        if (this.getRouteName === 'presetId') {
          this.switchEditionMode(true)
        }

        if (this.isEventPreset) {
          HTTP.get(`event/${this.preset.eventsId[0]}`).then(({data}) => {
            this.selectEvent(data)

            this.$router.push({name: 'Home'})
          })
        } else {
          // enlever peut être la requete et rechercher dans nos places du store
          HTTP.get(`event/place/${this.preset.place_id}`).then(({data}) => {
            this.selectPlaces(data.features.properties)

            this.$router.push({name: 'Home'})
          })
        }

        this.setValueSliders({
          valueDays,
          valueHours
        })

        this.setExpandedDate({
          date: valueDays,
          schedules: valueExpandedHours
        })
      }
    },
    components: {
      Card,
      Button,
      TextInfos,
      TableComponent,
      EventInfo,
      Notifications,
      StationIcon,
      Graph,
      Bubbles
    }
  }
</script>

<style lang='scss'>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/_media-queries.scss';

  .card__pres {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bubble_block {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 2px;
      background: linear-gradient(to bottom, $color-blue, $color-malibu);
    }
  }

  .capacity_block {
    position: relative;
    display: flex;
    align-items: top;
    justify-content: center;
    padding: 20px;
    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 2px;
      background: linear-gradient(to bottom, #fe012c, #fe029b);
    }
  }

  .analyse__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .analyse__actions {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .button__analyseAction {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }

  .general__map {
    width: 100%;
    height: 162px;
    position: relative;
    background-size: cover;
    background-position: center;
    background-origin: center;
    @include medium {
      height: 380px;
    }
    .general__mapButton {
      position: absolute;
      bottom: 24px;
      right: 24px;
    }
  }

  .general__agenda {
    display: flex;
  }

  .table--left {
    @include large {
      padding-right: 40px;
    }
  }

  .table--right {
    @include large {
      padding-left: 40px;
    }
  }

  .analyse__exportAction {
    display: flex;
    justify-content: flex-end;
  }

  .event--dashboard {
    & + .event--dashboard {
      border-top: 1px solid $gray-lighter;
    }
  }

</style>
