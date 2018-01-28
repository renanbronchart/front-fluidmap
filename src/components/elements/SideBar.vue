<template>
  <aside class="aside" :class="asideOpen ? 'aside--active' : ''">
    <div class="aside__infos">
      <div class="aside__title">
        <h2 class="h3">Equitation - Femmes</h2>
        <i class="material-icons">arrow_forward</i>
      </div>
      <div class="aside__details">
        <div class="aside__infosEvent">
          <TextInfos
            content="Champs de Mars, Paris"
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
      </div>
    </div>
    <div class="aside__stats">
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
        <div class="stats__ratio">
          <StatsRatio
            countLocal="64"
            countTourist="36"
          />
        </div>
      </div>
    </div>
    <div class="aside__stations">
      <div class="aside__container">
        <Card>
          <div class="card__header" slot="header">
            <p>Stations à proximités</p>
          </div>
          <ul>
            <li v-for='index in 100'>stations</li>
          </ul>
        </Card>
      </div>
    </div>
  </aside>
</template>

<script>
  import TextInfos from '@/components/molecules/TextInfos.vue'
  import StatsHint from '@/components/elements/stats/StatsHint.vue'
  import StatsPeople from '@/components/elements/stats/StatsPeople.vue'
  import StatsRatio from '@/components/elements/stats/StatsRatio.vue'
  import Card from '@/components/elements/Card.vue'

  export default {
    data () {
      return {
        asideOpen: false
      }
    },
    components: {
      TextInfos,
      StatsHint,
      StatsPeople,
      StatsRatio,
      Card
    }
  }
</script>

<style lang="scss" scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .aside {
    width: 525px;
    height: calc(100vh - 170px);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 80px;
    right: 0;
    background: white;
    transform: translateX(525px);
    transition: transform .3s ease-in-out;
    z-index: $z-index-aside;
    padding: 30px 0 0 0;
    &.aside--active {
      transform: translateX(0);
    }
  }

  .aside__infos,
  .aside__stats {
    flex-shrink: 0;
  }

  .aside__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px 0 60px;
  }

  .aside__details {
    padding: 20px 120px 30px 60px;
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
  }

  .stats__hint {
    border-right: 1px solid $dusty-gray;
    padding: 30px 40px;
  }

  .stats__people {

  }

  .aside__stations {
    height: 100%;
    position: relative;
  }

  .aside__container {
    width: 100%;
    height: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
    padding: 30px 120px 30px 60px;
  }
</style>
