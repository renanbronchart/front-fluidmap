<template>
  <div class="text--center">
    <h1>Bienvenue sur Fluidmap !</h1>
    <p class="text--lg text--secondary m-t-sm">Voulez vous que nous vous montrions le chemin ?</p>
    <div class="modal__button">
      <Button
        label="Plus tard"
        linkName="Home"
        extraClass="button--ghost button--primary button--fixed m-t-md"
        @eventClick="closeModal"
      />
      <Button
        label="Je vous suis"
        linkName="OnBoard"
        :linkParams="linkParams"
        extraClass="button--primary button--fixed m-t-md"
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
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/_media-queries.scss';

  .modal .modal__content {
    /*margin-top: 40%;*/
  }

  .modal__button {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 32px 0 0 0;
    @include medium {
      margin: 60px 0 0 0;
      flex-direction: row;
    }
  }
</style>
