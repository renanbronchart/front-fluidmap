<template>
  <div class="text--center">
    <h1>Bienvenue sur Fluidmap !</h1>
    <p class="text--lg text--secondary m-t-sm">Voulez vous que nous vous montrions le chemin ?</p>
    <div class="modal__button">
      <Button
        label="Plus tard"
        linkName="Home"
        extraClass="button--ghost button--primary button--fixed m-r-md"
        @eventClick="closeModal"
      />
      <Button
        label="Je vous suis"
        linkName="OnBoard"
        :linkParams="linkParams"
        extraClass="button--primary button--fixed"
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

<style lang='scss'>
  .modal__button {
    display: flex;
    justify-content: center;
    margin: 80px 0 0 0;
  }
</style>
