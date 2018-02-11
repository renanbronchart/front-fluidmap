<template>
  <section class="presets">
    <div class="container--fluid">
      <Title
        title="Mes favoris"
        :subtitle="getSubtitle"
      />

      <ListCardsPreview :previews="presetsFormating" @update="update" @remove="remove" />
    </div>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import Title from '@/components/elements/dashboard/global/Title.vue'
  import ListCardsPreview from '@/components/elements/ListCardsPreview.vue'

  export default {
    computed: {
      ...mapState([
        'presets'
      ]),
      getSubtitle () {
        return `${this.presets.presets.length} favoris enregistrés`
      },
      presetsFormating () {
        const presetsFomat = this.presets.presets.map((preset) => {
          preset.title = preset.name
          preset.infos = preset.timestampStart
          preset.details = preset.timestampStart

          return preset
        })

        return presetsFomat
      }
    },
    mounted () {
      this.getPresets()
    },
    methods: {
      ...mapActions([
        'getPresets',
        'selectPreset'
      ]),
      update (preset) {
        this.selectPreset(preset)
        this.$router.push({name: 'Home'})
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
