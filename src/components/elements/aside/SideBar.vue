<template>
  <aside class="aside" :class="getClassAside">
    <div class="aside__infos">
      <div class="aside__header">
        <h2 class="h3 aside__title">
          <i
            class="material-icons cursor--pointer title__back text--secondary"
            @click.prevent="backView"
            v-if="map.eventSelected">
            arrow_back
          </i>
          <span class="title__text h3">{{getTitleAside}}</span>
        </h2>
        <i class="material-icons cursor--pointer text--secondary" @click.prevent="closeAside">close</i>
      </div>
      <div class="aside__details">
        <div class="aside__infosEvent">
          <TextInfos
            :content="getPlaceSelected.name"
            iconName="location_on"
            extraClass="information__primary m-r-sm"
            v-if="map.eventSelected"
          />
          <TextInfos
            :content="getDateSelected"
            iconName="event"
            extraClass="information__primary"
          />
        </div>
        <div
          class="aside__image"
          :style="{ backgroundImage: 'url(' + getImageAside + ')' }"
        ></div>
        <div class="aside__explanation" v-if="!map.eventSelected">
          <p class="text--secondary">Plusieurs évènements ont lieu à cet endroit et durant cette tranche horaire. Choisissez un évènement à afficher.</p>
        </div>
      </div>
    </div>
    <div class="aside__stats" v-if="map.eventSelected">
      <div class="stats__hint">
        <StatsHint
          hintMark="4"
        />
      </div>
      <div class="stats__people">
        <div class="stats__capacity">
          <StatsPeople
            count="90000"
          />
        </div>
      </div>
    </div>
    <ListAside>
      <div slot="header" class="card__header">
        <p class="text--primary">{{getTitleList}}</p>
      </div>
      <div v-if="map.eventSelected">
        <TableComponent
          :columns="stationsData.columns"
          :data="getStationsData"
          extraClass="m-t-sm p-l-lg p-r-lg table--lastColumnLeft"
          :rowTodisplay="stationsShow.count"
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
      </div>
      <div v-else>
        <ul class="aside__list">
          <EventDescription
            :event="event"
            extraClass="event--block"
            @clickEvent="clickEvent(event)"
            v-for="event in getEventsByTimestamps"
          />
        </ul>
      </div>
    </ListAside>
  </aside>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import manipulateDate from '@/utils/manipulateDate.js'
  import parameterize from 'parameterize-string'
  import * as d3 from 'd3'

  import arrayImageSport from '@/utils/arrayImageSport.js'
  import associateStations from '@/utils/associateStations.js'

  import TextInfos from '@/components/molecules/TextInfos.vue'
  import Notifications from '@/components/molecules/Notifications.vue'
  import StationIcon from '@/components/molecules/StationIcon.vue'
  import StatsHint from '@/components/elements/stats/StatsHint.vue'
  import StatsPeople from '@/components/elements/stats/StatsPeople.vue'
  import ListAside from '@/components/elements/aside/ListAside.vue'
  import EventDescription from '@/components/elements/events/EventDescription.vue'
  import TableComponent from '@/components/elements/TableComponent.vue'

  export default {
    data () {
      return {
        stationsShow: {
          count: 3,
          showMoreLabel: true
        },
        stationsData: {
          data: [
            {
              name: `Gare de l'Est`,
              indice: '6'
            },
            {
              name: 'Gare du Nord',
              indice: '5'
            },
            {
              name: 'PORTE DE VINCENNES',
              indice: '1'
            },
            {
              name: `Gare de lyon`,
              indice: '6'
            },
            {
              name: 'Riquet',
              indice: '5'
            },
            {
              name: 'Bastille',
              indice: '9'
            }
          ],
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
    methods: {
      ...mapActions([
        'deselectPlace',
        'selectEvent',
        'deselectEvent'
      ]),
      backView () {
        const asideContainer = document.querySelector('.aside__container')

        this.deselectEvent()

        if (asideContainer) {
          asideContainer.scrollTop = 0
        }
      },
      closeAside () {
        this.deselectPlace() // faire une promesse dans le store avec setTimeout
        this.backView()
      },
      clickEvent (event) {
        this.selectEvent(event)

        document.querySelector('.aside__container').scrollTop = 0
      }
    },
    computed: {
      ...mapState([
        'map',
        'planning',
        'places',
        'events'
      ]),
      ...mapGetters([
        'getTimestampsMap',
        'getDayValue',
        'getSchedulesValue',
        'getPlaceSelected'
      ]),
      propertiesPlaceSelected () {
        return this.places.placeSelected
      },
      getImageAside () {
        if (this.map.eventSelected) {
          const nameParametrize = parameterize(this.events.eventSelected.name)
          const sportsName = [...arrayImageSport]

          const sportName = sportsName.find((sport) => {
            return nameParametrize.indexOf(sport) >= 0
          })

          return `${process.env.AMAZON_STATIC_URL}events/${sportName}.png`
        } else {
          return `${process.env.AMAZON_STATIC_URL}places/${parameterize(this.propertiesPlaceSelected.name)}.png`
        }
      },
      getEventsByTimestamps () {
        const events = [...this.propertiesPlaceSelected.events]

        if (events.length === 0) {
          return []
        }

        return events.filter(event => {
          const eventStart = event.dates[0]

          return eventStart >= this.getTimestampsMap[0] && eventStart <= this.getTimestampsMap[1]
        })
      },
      getDateSelected () {
        if (this.map.eventSelected) {
          const dates = [...this.events.eventSelected.dates]

          return `${manipulateDate.getSchedulesDisplayConcat(dates[0])}`
        } else {
          return `${this.getDayValue}, ${this.getSchedulesValue}`
        }
      },
      getTitleAside () {
        return this.map.eventSelected ? this.events.eventSelected.name : this.propertiesPlaceSelected.name
      },
      getTitleList () {
        if (this.map.eventSelected) {
          return 'Stations à proximité'
        } else {
          return `${this.getEventsByTimestamps.length} évènements dans cette tranche`
        }
      },
      getRoute () {
        return this.$route.params.id
      },
      getClassAside () {
        let extraClass = ''

        if (this.map.placeSelected) {
          extraClass += ' aside--active'
          this.$emit('openSidebar')
        } else if (parseFloat(this.$route.params.id) === 3) {
          extraClass += ' aside--onboard'
        }

        return extraClass
      },
      getStationsData () {
        const names = []

        const stationsShowFiltered = this.propertiesPlaceSelected.stations_closest.filter((elem) => {
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
          const meanValue = typeof theStation.hints === 'undefined' ? 1 : d3.mean(theStation.hints, function (d) { return +d })

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
    components: {
      TextInfos,
      StatsHint,
      StatsPeople,
      ListAside,
      EventDescription,
      TableComponent,
      Notifications,
      StationIcon
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/style.scss';

  .aside {
    width: 524px;
    max-width: 100%;
    bottom: 90px;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 80px;
    right: 0;
    overflow: auto;
    background: white;
    transform: translateX(524px);
    transition: transform .3s ease-in-out;
    z-index: $z-index-aside;
    padding: 30px 0 0 0;
    &.aside--active,
    &.aside--onboard {
      transform: translateX(0);
    }
  }

  .aside__infos,
  .aside__stats {
    flex-shrink: 0;
  }

  .aside__explanation {
    margin: 20px 0 0 0;
  }

  .aside__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    .title__text,
    .title__back {
      margin: 0 20px 0 0;
    }
    @include medium {
      padding: 0 40px 0 60px;
    }
  }

  .aside__title {
    display: flex;
    align-items: center;
  }

  .aside__details {
    padding: 20px 16px 0 16px;
    @include medium {
      padding: 20px 120px 0 60px;
    }
  }

  .aside__infosEvent {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .aside__image {
    width: 100%;
    height: 100px;
    position: relative;
    border-radius: $border-radius-base;
    overflow: hidden;
    background-size: cover;
    background-alignment: center;
    margin: 15px 0 0 0;
    &:after {
      content: ' ';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(to left, $color-blue-ribbon, $color-malibu);
      opacity: .3;
    }
  }

  .aside__stats {
    display: flex;
    align-items: center;
    border-top: 1px solid $dusty-gray;
    border-bottom: 1px solid $dusty-gray;
    margin: 30px 0 0 0;
  }

  .stats__hint {
    width: 40%;
    border-right: 1px solid $dusty-gray;
    padding: 30px 40px;
  }

  .stats__people {
    width: 60%;
    border-right: 1px solid $dusty-gray;
    padding: 30px 40px;
  }

  .aside__list {
    padding: 30px;
  }
</style>
