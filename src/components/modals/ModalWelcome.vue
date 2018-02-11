<template>
  <div>
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
  </div>
</template>

<script>
  import Button from '@/components/molecules/Button.vue'

  export default {
    data () {
      return {
        linkParams: {
          id: 1
        }
      }
    },
    components: {
      Button
    }
  }
</script>
