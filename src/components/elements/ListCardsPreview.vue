<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="preview in previews">
      <Card :class="extraClassCard">
        <div class="card__thumbnail" :style="{backgroundImage: 'url(' + preview.imageSrc + ')'}">
          <div class="card__actions">
            <TextInfos
              content="Modifier"
              iconName="mode_edit"
              alignIcon="right"
              extraClass="text--white cursor--pointer"
              @eventClick="update(preview)"/>
            <TextInfos
              content="Supprimer"
              iconName="delete"
              alignIcon="right"
              extraClass="text--white m-t-md cursor--pointer"
              @eventClick="remove(preview)"/>
          </div>
        </div>
        <div class="card__informations cursor--pointer" @click="clickOnInformations(preview)">
          <h4 class="m-b-xs">{{preview.title}}</h4>
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
    props: ['extraClassCard', 'previews', 'actions'],
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
      },
      clickOnInformations (preview) {
        this.$emit('clickOnInformations', preview)
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/_media-queries.scss';

  .card__thumbnail {
    width: 100%;
    height: 180px;
    position: relative;
    background-size: cover;
    background-position: center;
    background-origin: center;
    overflow: hidden;
    @include medium {
      height: 140px;
    }

    .card__actions {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      background-color: rgba(0, 0, 0, .4);
    }

    &:hover {
      .card__actions {
        opacity: 1;
      }
    }
  }

  .card__informations {
    padding: 14px;
  }
</style>
