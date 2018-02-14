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
      <p v-if="isPlacePreset">Attention c'est une recherche sur la place</p>
    </div>
  </div>
</template>

<script>
  import Button from '@/components/molecules/Button.vue'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'getCurrentPreset'
      ]),
      isPlacePreset () {
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
      Button
    }
  }
</script>

<style lang="scss">
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
</style>
