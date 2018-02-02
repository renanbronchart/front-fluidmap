<template>
  <div>
    <Tooltip
      :text='getText'
      :count='getStepId'
      :labelButton='getLabelButton'
      linkName="OnBoard"
      :linkParams="getLinkParams"
      :linkTitle="getLinkTitle"
    />
    <OverlayHole />
  </div>
</template>

<script>
  import Tooltip from '@/components/elements/Tooltip.vue'
  import OverlayHole from '@/components/onBoard/overlayHole.vue'

  export default {
    data () {
      return {
        stepTexts: [
          'Grâce à ces deux frises, vous pouvez sélectionner un jour et une tranche horaire, et ainsi influencer l’affichage de la carte de chaleur.',
          'Ces points sont des lieux où un évènement des J.O. aura lieu. En cliquant dessus, vous pourrez affichez les détails prévisionnels liés à celui-ci. La carte de chaleur colorée que vous pouvez voir en fond sera influencée par l’évènement sélectionné.',
          'Ce volet affiche les détails de l’évènement choisi.',
          'Ce tirroir vous affiche tous les évènements qui ont lieu pendant le jour et la tranche horaire que vous aurez choisie. En cliquant sur l’un d’eux, vous afficherez le détail de cet évènements dans le volet latéral droit.',
          'Enfin, ce bouton vous permet de visualiser l’analyse complète de l’évènement choisi. Nous vous conseillons de créer un compte afin de pouvoir accéder à cette analyse et profiter plainement de ce que Fluidmap a à vous offrir. À vous de jouer !'
        ]
      }
    },
    computed: {
      getStepId () {
        return this.$route.params.id
      },
      getText () {
        return this.stepTexts[this.getStepId - 1]
      },
      getLabelButton () {
        return this.getStepId === 5 ? `C'est parti !` : 'Suivant'
      },
      getLinkParams () {
        const nextStepId = parseFloat(this.getStepId) + 1

        return {id: nextStepId}
      },
      getLinkTitle () {
        return `Lien vers l'étape ${this.getStepId} du on board`
      }
    },
    created () {
      const stepId = this.getStepId
      // rajouter le cookie, si il a déjà vu le onboard ou pas.
      if (stepId <= 0 || stepId > 5) {
        this.$router.push({name: 'Home'})
      }
    },
    components: {
      Tooltip,
      OverlayHole
    }
  }
</script>

<style lang="scss" scoped>

</style>
