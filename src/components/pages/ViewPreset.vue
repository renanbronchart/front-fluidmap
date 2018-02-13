<template>
  <div>
    <h2>{{getCurrentPreset.name}}</h2>
    <p v-if="isPlacePreset">Attention c'est une recherche sur la place</p>
  </div>
</template>

<script>
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
      }
    },
    mounted () {
      // requete de tous les events avec ces timestamps en parametres (attendre API)
      // requete de tous les events avec les timestamps suivants, dans une période de deux heures (attendre API)

      // requete de tous les hints de la place. (attendre l'API)
    }
  }
</script>
