<template>
  <div>
    <h1>Bienvenue sur Fluidmap !</h1>
    <p class="text--xs">Voulez vous que nous vous montrions le chemin ?</p>
    <div class="modal__button">
      <Button
        label="Plus tard"
        linkName="Home"
        extraClass="button--ghost button--primary"
        @eventClick="closeModal"
      />
      <Button
        label="Je vous suis"
        linkName="OnBoard"
        :linkParams="linkParams"
        extraClass="button--primary"
        linkTitle="Lien vers le onBoard"
        @eventClick="closeModal"
      />
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  import Button from '@/components/molecules/Button.vue'

  export default {
    data () {
      return {
        linkParams: {
          id: 1
        }
      }
    },
    methods: {
      ...mapActions([
        'closeModal'
      ])
    },
    components: {
      Button
    }
  }
</script>
