<template>
  <aside class="aside" :class="getClass">
    <div class="aside__infos">
      <div class="aside__title">
        <h2 class="h3">
          <i class="material-icons cursor--pointer title__back" @click.prevent="backView" v-if="viewEvent">arrow_back</i>
          <span class="title__text">{{getTitleAside}}</span>
        </h2>
        <i class="material-icons cursor--pointer" @click.prevent="closeAside">close</i>
      </div>
      <div class="aside__details">
        <div class="aside__infosEvent">
          <TextInfos
            content="12 H - 14 H"
            iconName="location_on"
            extraClass="information__primary"
          />
          <TextInfos
            content="Lundi - 05.08.2024"
            iconName="event"
            extraClass="information__primary"
          />
        </div>
        <div
          class="aside__image"
          :style="{ backgroundImage: 'url(http://placekitten.com/g/900/500)' }"
        ></div>
        <div class="aside__explanation" v-if="!viewEvent">
          <p>Plusieurs évènements ont lieu à cet endroit et durant cette tranche horaire. Choisissez un évènement à afficher.</p>
        </div>
      </div>
    </div>
    <div class="aside__stats" v-if="viewEvent">
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
    <ListAside
      :title="getTitleList"
    >
      <ul v-if="viewEvent">
        <li v-for="index in 100">stations</li>
      </ul>
      <div v-else>
        <ul class="aside__list">
          <EventDescription
            :event="event"
            extraClass="event--block"
            @clickEvent="clickEvent(event)"
            v-for="event in places.placeSelected.events"
          />
        </ul>
      </div>
    </ListAside>
  </aside>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import TextInfos from '@/components/molecules/TextInfos.vue'
  import StatsHint from '@/components/elements/stats/StatsHint.vue'
  import StatsPeople from '@/components/elements/stats/StatsPeople.vue'
  import ListAside from '@/components/elements/aside/ListAside.vue'
  import EventDescription from '@/components/elements/events/EventDescription.vue'

  export default {
    data () {
      return {
        eventSelected: '',
        viewEvent: false,
        eventsNumber: 4,
        dataEvents: [
          {
            name: 'Natation synchronisé',
            step: 'Duo - Qualification',
            hour: '14h00',
            place: 'Champs de mars, Paris'
          },
          {
            name: 'Natation synchronisé',
            step: 'Duo - Qualification',
            hour: '14h00',
            place: 'Champs de mars, Paris'
          },
          {
            name: 'Natation synchronisé',
            step: 'Duo - Qualification',
            hour: '14h00',
            place: 'Champs de mars, Paris'
          },
          {
            name: 'Natation synchronisé',
            step: 'Duo - Qualification',
            hour: '14h00',
            place: 'Champs de mars, Paris'
          }
        ]
      }
    },
    methods: {
      ...mapActions([
        'deselectPlace'
      ]),
      backView () {
        this.viewEvent = false
        document.querySelector('.aside__container').scrollTop = 0
      },
      closeAside () {
        this.deselectPlace() // faire une promesse dans le store avec setTimeout
        this.backView()
      },
      clickEvent (event) {
        this.eventSelected = event
        this.viewEvent = true
        document.querySelector('.aside__container').scrollTop = 0
      }
    },
    computed: {
      ...mapState([
        'map',
        'places'
      ]),
      getTitleAside () {
        const placeName = this.places.placeSelected.name

        return this.viewEvent ? this.eventSelected.name : placeName
      },
      getTitleList () {
        if (this.viewEvent) {
          return 'Stations à proximité'
        } else {
          return `${this.places.placeSelected.events.length} évènements dans cette tranche`
        }
      },
      getRoute () {
        return this.$route.params.id
      },
      getClass () {
        let extraClass = ''

        if (this.map.placeSelected) {
          extraClass += ' aside--active'
        } else if (parseFloat(this.$route.params.id) === 3) {
          extraClass += ' aside--onboard'
        }

        return extraClass
      }
    },
    components: {
      TextInfos,
      StatsHint,
      StatsPeople,
      ListAside,
      EventDescription
    }
  }
</script>

<style lang="scss" scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .aside {
    width: 524px;
    height: calc(100vh - 170px);
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

  .aside__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px 0 60px;
    .title__text,
    .title__back {
      margin: 0 20px 0 0;
    }
  }

  .aside__details {
    padding: 20px 120px 0 60px;
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
