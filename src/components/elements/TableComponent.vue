<template>
  <div class="table" :class="extraClass">
    <h5 class="m-b-lg" v-if="title">{{title}}</h5>
    <div class="table__container">
      <table class="table__content">
        <thead class="table__head">
          <tr class="table__row">
            <th v-for="column in columns" class="table__cell">
              {{column.label}}
            </th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="element in data" class="table__row">
            <td v-for="column in columns" class="table__cell">
              {{element[column.field]}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'title',
      'data',
      'columns',
      'extraClass'
    ]
  }
</script>

<style lang="scss" scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .table__container {
    max-width: 100%;
    width: 100%;
    overflow: auto;
  }

  .table__content {
    min-width: 100%;
  }

  .table__row {
    & + .table__row {
      border-top: 1px solid $gray-lighter
    }
  }

  .table__cell {
    text-align: left;
  }

  .table__head {
    .table__cell {
      color: $gray-light;
      padding: 8px 16px 8px 0;
    }
  }

  .table__body {
    .table__cell {
      padding: 24px 16px 24px 0;
    }
  }
</style>
