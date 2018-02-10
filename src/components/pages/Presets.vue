<template>
  <section class="presets">
    <div class="container--fluid">
      <Title
        title="Mes favoris"
        :subtitle="getSubtitle"
      />

      <ListCardsPreview :previews="presets" @update="update" @remove="remove" />
    </div>
  </section>
</template>

<script>
  import Title from '@/components/elements/dashboard/global/Title.vue'
  import ListCardsPreview from '@/components/elements/ListCardsPreview.vue'

  export default {
    data () {
      return {
        presets: [
          {
            title: 'Mon favori',
            infos: '09/08/2018',
            details: '14H00:16H00'
          },
          {
            title: 'Mon favori',
            infos: '09/08/2018',
            details: '14H00:16H00'
          },
          {
            title: 'Mon favori',
            infos: '09/08/2018',
            details: '14H00:16H00'
          }
        ]
      }
    },
    computed: {
      getSubtitle () {
        return `${this.presets.length} favoris enregistrés`
      }
    },
    methods: {
      update (preset) {
        console.log(preset, 'update')
      },
      remove (preset) {
        console.log(preset, 'remove')
      }
    },
    components: {
      Title,
      ListCardsPreview
    }
  }
</script>
