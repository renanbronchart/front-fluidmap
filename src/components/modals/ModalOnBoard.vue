<template>
  <div class="modal__onBoard">
    <div class="onBoard__description">
      <Notifications :count='count' v-if="count > 0" extraClass="tooltip__notification text--bold m-r-md"/>
      <p class="tooltip__content text--secondary">{{text}}</p>
    </div>
    <Button
      extraClass="button--ghost button--primary tooltip__button m-t-md"
      :label="labelButton"
      v-if="labelButton"
      :linkName="linkName"
      :linkParams="linkParams"
      :linkTitle="linkTitle"
    />
  </div>
</template>

<script>
  import Button from '@/components/molecules/Button.vue'
  import Notifications from '@/components/molecules/Notifications.vue'

  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      extraClass: {
        type: String,
        default: ''
      },
      count: {},
      labelButton: {
        type: String
      },
      linkName: {
        type: String
      },
      linkParams: {
        type: Object,
        default: {}
      },
      linkTitle: {
        default: 'Lien vers une nouvelle étape'
      }
    },
    components: {
      Button,
      Notifications
    }
  }
</script>

<style lang='scss' scoped>
  .modal__onBoard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .onBoard__description {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .notification {
      padding: 8px 12px;
    }
  }
</style>
