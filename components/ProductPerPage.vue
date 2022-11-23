<template>
  <div class="perpage">
    <span class="perpage__title">
      Количество товаров на странице:
    </span>
    <label class="form__label form__label--small form__label--select">
      <select v-model="computedPerPage" class="form__select" name="category">
        <option
          v-for="(value, index) in values"
          :key="index"
          :value="value"
        >
          {{ value }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'ProductPerPage',
  props: {
    perPage: {
      default: 3,
      type: Number
    },
    values: {
      default: () => [3, 6, 9, 12, 15],
      type: Array
    }
  },
  computed: {
    computedPerPage: {
      get () {
        return this.perPage
      },
      set (limit) {
        this.$router.push({
          query: {
            ...this.$route.query,
            page: 1,
            limit
          }
        })
        this.$emit('update:perPage', limit)
      }
    }
  }
}
</script>

<style scoped>

</style>
