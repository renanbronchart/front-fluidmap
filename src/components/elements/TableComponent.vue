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
          <tr v-for="(element, index) in data" class="table__row" v-if="index <= rowTodisplay">
            <td v-for="column in columns" class="table__cell">
              <slot :name="`${column.field}-${index}`">
                {{element[column.field]}}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'title': {
        type: String
      },
      'data': {
        type: Array
      },
      'columns': {
        type: Array
      },
      'extraClass': {
        type: String
      },
      'rowTodisplay': {
        default: 10000
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';


  .table--lastColumnLeft {
    table {
      th:last-child,
      td:last-child {
        text-align: right;
      }
    }
  }

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
      padding: 20px 16px 20px 0;
    }
  }
</style>
