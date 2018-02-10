<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="preview in previews">
      <Card>
        <div class="card__thumbnail">
          <div class="card__actions">
            <TextInfos
              content="Modifier"
              iconName="mode_edit"
              alignIcon="right"
              @eventClick="update(preview)"/>
            <TextInfos
              content="Supprimer"
              iconName="delete"
              alignIcon="right"
              @eventClick="remove(preview)"/>
          </div>
        </div>
        <div class="card__informations">
          <h3>{{preview.title}}</h3>
          <p class="text--secondary">{{preview.infos}}</p>
          <p class="text--secondary">{{preview.details}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import Card from '@/components/elements/Card.vue'
  import TextInfos from '@/components/molecules/TextInfos.vue'

  export default {
    props: ['previews', 'actions'],
    components: {
      Card,
      TextInfos
    },
    methods: {
      update (preview) {
        this.$emit('update', preview)
      },
      remove (preview) {
        this.$emit('remove', preview)
      }
    }
  }
</script>
