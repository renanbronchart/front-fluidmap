<template>
  <div class="analyse container">
    <div class="analyse__header">
      <div class="analyse__title">
        <h2>{{getTitlePage}}</h2>
        <div class="analyse__actions">
          <Button
            label="Modifier la tranche horaire"
            extraClass="button--primary button--ghost button__analyseAction"
            @eventClick="updatePreset"
          />
          <Button
            label="Ajouter aux favoris"
            extraClass="button--primary button--ghost button__analyseAction"
            @eventClick="addToPreset"
          />
          <Button
            label="Exporter en PDF"
            extraClass="button--primary button__analyseAction"
            @eventClick="exportPdf"
          />
        </div>
      </div>
      <p class="m-t-xl" v-if="isPlacePreset">L'indice de fréquentation est une moyenne faite sur la tranche horaire que vous avez séléctionnée.</p> // à emplacer par le composant
      <div class="analyse__generalInfos">
        <h3 class="analyse__eventTitle m-t-xl" v-if="isEventPreset">{{getCurrentPreset.name}}</h3>
        <div class="general__agenda m-t-md">
          <TextInfos
            content="Lundi ..."
            iconName="today"
            extraClass="information__primary"
          />
          <TextInfos
            content="12 H - 14 H"
            iconName="access_time"
            extraClass="information__primary m-l-lg"
          />
          <TextInfos
            content="12 H - 14 H"
            iconName="location_on"
            extraClass="information__primary m-l-lg"
          />
        </div>
        <div class="general__viewPlace row m-t-md">
          <div class="col-xs-12 col-sm-6 col-md-8">
            <div class="general__map"></div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="general__statistics"></div>
          </div>
        </div>
      </div>
      <Card extraClass="p-lg">
        <div class="analyse__graph">
          <div class="graph__header">
            <h4 class="graph__title">Graphique - Indice de fréquentation</h4>
            <div class="graph__actions"></div>
          </div>
          <div class="graph__view">
          </div>
        </div>
        <div class="graph__tables row m-t-xl">
          <div class="col-xs-12 col-md-6">
            <TableComponent
              title="Pics hauts sur cette période"
              :columns="hightHints.columns"
              :data="hightHints.data"
              extraClass="m-t-lg table--left"
            />
          </div>
          <div class="col-xs-12 col-md-6">
            <TableComponent
              title="Pics bas sur cette période"
              :columns="hightHints.columns"
              :data="hightHints.data"
              extraClass="m-t-lg table--right"
            />
          </div>
        </div>
      </Card>
      <div class="analyse__secondaryInfos row m-t-md">
        <div class="col-xs-12 col-md-6">
          <Card extraClass="p-lg">
            <div class="analyse__eventsSchedules">
              <h4>Autres évènements dans cette tranche horiare 12H-14H</h4>
              <ul>
                <EventInfo
                  v-for="event in events.events"
                  :event="event"
                  @clickEvent="clickEvent(event)"
                  extraClass="event--dashboard p-t-md p-b-md"/>
              </ul>
              <TextInfos
                content="Afficher plus"
                iconName="add"
                extraClass="information__primary text--info cursor--pointer information--right"
                alignIcon="right"
                @eventClick="moreEventsSchedules"
              />

            </div>
            <div class="analyse__eventsNext m-t-lg" v-if="isEventPreset">
              <h4>Évènements suivants entre {{getNextSchedules}}</h4>
              <ul>
                <EventInfo
                  v-for="event in events.eventsSchedules"
                  :event="event"
                  @clickEvent="clickEvent(event)"
                  extraClass="event--dashboard p-t-md p-b-md"/>
              </ul>
              <TextInfos
                content="Afficher plus"
                iconName="add"
                extraClass="information__primary text--info cursor--pointer information--right"
                alignIcon="right"
                @eventClick="moreEventsNext"
              />
            </div>
          </Card>
        </div>

        <div class="col-xs-12 col-md-6">
          <Card extraClass="p-lg">
            <div class="analyse__eventsStations">
              <h4>Stations à proximiter du lieu</h4> // à récupérer sur la place
              <Table
                titlesColumns="un array"
                data="un array d'objet"
              />
              <TextInfos
                content="Afficher plus"
                iconName="add"
                extraClass="information__primary text--info cursor--pointer information--right"
                alignIcon="right"
                @eventClick="moreEventsStations"
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
  import Button from '@/components/molecules/Button.vue'
  import TextInfos from '@/components/molecules/TextInfos.vue'
  import Card from '@/components/elements/Card.vue'
  import TableComponent from '@/components/elements/TableComponent.vue'
  import EventInfo from '@/components/elements/events/EventInfo.vue'

  import { mapGetters, mapState } from 'vuex'

  export default {
    data () {
      return {
        hightHints: {
          data: [
            {
              date: 'date0',
              timestampStart: 'timestampStart0',
              timestampEnd: 'timestampEnd0',
              hint: 'hint0'
            },
            {
              date: 'date1',
              timestampStart: 'timestampStart1',
              timestampEnd: 'timestampEnd1',
              hint: 'hint1'
            },
            {
              date: 'date2',
              timestampStart: 'timestampStart2',
              timestampEnd: 'timestampEnd2',
              hint: 'hint2'
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
        }
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentPreset'
      ]),
      ...mapState([
        'events'
      ]),
      isPlacePreset () {
        return this.getCurrentPreset.type === 'place'
      },
      isEventPreset () {
        return this.getCurrentPreset.type === 'place'
      },
      isNewPreset () {
        return this.$route.name === 'newPreset'
      },
      getTitlePage () {
        return this.isNewPreset ? 'Analyse' : this.getCurrentPreset.name
      }
    },
    mounted () {
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
    methods: {
      exportPdf () {
        alert('export to pdf')

        // ajouter le plugin qui permet de prendre en pdf les éléments d'une page
      },
      addToPreset () {
        alert('add to preset')

        // l'ajouter en front aux presets.
        // Faire une action dans le store. elle modifie le state des presets et push sur l'api
      },
      updatePreset () {
        alert('updatePreset')

        // Retourner sur la carte, ensuite quand on refait une analyse et qu'on fait la
        // demande de sauvegarder (si il y a un id) ou de mettre en favori (si il n'y en a pas)
      }
    },
    components: {
      Card,
      Button,
      TextInfos,
      TableComponent,
      EventInfo
    }
  }
</script>

<style lang="scss">
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/_media-queries.scss';

  .analyse__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .analyse__actions {
    display: inline-flex;
    align-items: center;
  }

  .button__analyseAction {
    margin-left: 20px;
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
