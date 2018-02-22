<template>
  <section class="presets">
    <div class="container--fluid">
      <Title
        title="Mes favoris"
        :subtitle="getSubtitle"
      />

      <ListCardsPreview
        :previews="presetsFormating"
        extraClassCard="m-t-lg"
        @update="update"
        @remove="remove"
        @clickOnInformations="showPreset"
      />
    </div>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import Title from '@/components/elements/dashboard/global/Title.vue'
  import ListCardsPreview from '@/components/elements/ListCardsPreview.vue'

  import mapDate from '@/utils/manipulateDate.js'

  export default {
    computed: {
      ...mapState([
        'presets'
      ]),
      getSubtitle () {
        return `${this.presets.presets.length} favoris enregistrés`
      },
      presetsFormating () {
        const presets = [...this.presets.presets]

        const presetsFomat = presets.map((preset) => {
          preset.title = preset.name
          preset.infos = mapDate.getDate(preset.dates[0])
          preset.details = mapDate.extandedSchedules(preset.dates[0], preset.dates[1])
          preset.id = preset.id
          preset.imageSrc = preset.mapImage

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
        'selectPreset',
        'deletePreset',
        'setCurrentPreset'
      ]),
      update (preset) {
        this.selectPreset(preset)
        this.$router.push({name: 'Home'})
      },
      remove (preset) {
        this.deletePreset(preset)
      },
      showPreset (preset) {
        this.setCurrentPreset(preset)
        this.$router.push({name: 'presetId', params: {id: preset.id}})
      }
    },
    components: {
      Title,
      ListCardsPreview
    }
  }
</script>
