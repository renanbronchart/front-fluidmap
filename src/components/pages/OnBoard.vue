<template>
  <div>
    <Tooltip
      :text='getTooltipInfos.text'
      :count='getStepId'
      :labelButton='getLabelButton'
      :linkName="getLinkName"
      :linkParams="getLinkParams"
      :linkTitle="getLinkTitle"
      :extraClass="getTooltipInfos.extraClass"
      v-if="screenSm"
    />
    <Modal
      modalStaticOpen="true"
      noClose="true"
      extraClass="modal--light"
      v-else
    >
      <ModalOnBoard
        :text='getTooltipInfos.text'
        :count='getStepId'
        :labelButton='getLabelButton'
        :linkName="getLinkName"
        :linkParams="getLinkParams"
        :linkTitle="getLinkTitle"
        :extraClass="getTooltipInfos.extraClass"
      />
    </Modal>
    <OverlayHole />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  import Tooltip from '@/components/elements/Tooltip.vue'
  import OverlayHole from '@/components/onBoard/OverlayHole.vue'
  import Modal from '@/components/elements/Modal.vue'
  import ModalOnBoard from '@/components/modals/ModalOnBoard.vue'

  export default {
    data () {
      return {
        windowWidth: 0,
        step: [
          {
            text: 'Grâce à ces deux frises, vous pouvez sélectionner un jour et une tranche horaire, et ainsi influencer l’affichage de la carte de chaleur.',
            extraClass: 'tooltip--slider'
          },
          {
            text: 'Ces points sont des lieux où un évènement des J.O. aura lieu. En cliquant dessus, vous pourrez affichez les détails prévisionnels liés à celui-ci. La carte de chaleur colorée que vous pouvez voir en fond sera influencée par l’évènement sélectionné.',
            extraClass: 'tooltip--map'
          },
          {
            text: 'Ce volet affiche les détails de l’évènement choisi.',
            extraClass: 'tooltip--aside tooltip--right'
          },
          {
            text: 'Ce tirroir vous affiche tous les évènements qui ont lieu pendant le jour et la tranche horaire que vous aurez choisie. En cliquant sur l’un d’eux, vous afficherez le détail de cet évènements dans le volet latéral droit.',
            extraClass: 'tooltip--list'
          },
          {
            text: 'Enfin, ce bouton vous permet de visualiser l’analyse complète de l’évènement choisi. Nous vous conseillons de créer un compte afin de pouvoir accéder à cette analyse et profiter plainement de ce que Fluidmap a à vous offrir. À vous de jouer !',
            extraClass: 'tooltip--sliderRight tooltip--rightBottom'
          }
        ]
      }
    },
    computed: {
      getStepId () {
        return parseFloat(this.$route.params.id)
      },
      getTooltipInfos () {
        return this.step[this.getStepId - 1]
      },
      getLabelButton () {
        return this.getStepId === 5 ? `C'est parti !` : 'Suivant'
      },
      getLinkName () {
        return this.getStepId === 5 ? 'Home' : 'OnBoard'
      },
      getLinkParams () {
        const nextStepId = this.getStepId === 5 ? '' : this.getStepId + 1

        return {id: nextStepId}
      },
      getLinkTitle () {
        return `Lien vers l'étape ${this.getStepId} du on board`
      },
      screenSm () {
        return this.windowWidth > 768
      }
    },
    methods: {
      ...mapActions([
        'openModal',
        'closeModal'
      ]),
      handleResize () {
        this.windowWidth = window.innerWidth
      }
    },
    created () {
      const stepId = this.getStepId
      // rajouter le cookie, si il a déjà vu le onboard ou pas.
      if (stepId <= 0 || stepId > 5) {
        this.$router.push({name: 'Home'})
      }

      this.handleResize()
    },
    mounted () {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.handleResize)
    },
    components: {
      Tooltip,
      OverlayHole,
      Modal,
      ModalOnBoard
    }
  }
</script>

<style lang="scss" scoped>

</style>
