<template>
  <div class="welcomePage">
    <Modal open="true" noClose="true">
      <h1>Bienvenue sur Fluidmap !</h1>
      <p class="text--xs">Voulez vous que nous vous montrions le chemin ?</p>
      <div class="modal__button">
        <Button
          label="Plus tard"
          extraClass="button--ghost"
        />
        <Button
          label="Je vous suis"
          linkName="OnBoard"
          :linkParams="linkParams"
          linkTitle="Lien vers le onBoard"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
  import Modal from '@/components/elements/Modal.vue'
  import Button from '@/components/molecules/Button.vue'

  export default {
    data () {
      return {
        linkParams: {
          id: 1
        }
      }
    },
    methods: {},
    components: {
      Modal,
      Button
    }
  }
</script>

<style lang="scss" scoped="true">
  .welcomePage {
    width: 100vw;
    height: 100vh;
  }

  .modal__button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 50px 0 0 0;
  }
</style>
