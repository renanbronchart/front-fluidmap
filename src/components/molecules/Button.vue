<template>
  <button class="button" :class="extraClass" @click.prevent="eventClick">
    <router-link
      :to="{name: linkName, params: linkParams}"
      :title="linkTitle"
      class="button__link"
      v-if='linkName'
    >
    </router-link>
    <span v-if="label">
      {{label}}
    </span>
    <i class="material-icons" v-if='iconName' :class="extraClassIcon">{{iconName}}</i>
  </button>
</template>

<script>
  export default {
    props: {
      label: {
        type: String
      },
      linkName: {
        type: String
      },
      linkParams: {
        type: Object
      },
      linkTitle: {
        default: 'Lien vers une nouvelle étape'
      },
      extraClass: {
        type: String,
        default: ''
      },
      extraClassIcon: {
        type: String,
        default: ''
      },
      iconName: {
        type: String
      }
    },
    methods: {
      eventClick () {
        this.$emit('eventClick')
      }
    }
  }
</script>
