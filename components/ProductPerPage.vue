<template>
  <div class="perpage">
    <span class="perpage__title">
      Количество товаров на странице:
    </span>
    <label class="form__label form__label--small form__label--select">
      <select v-model="perPageProduct" class="form__select" name="category">
        <option
          v-for="item in limits"
          :key="item.id"
          :value="item.value"
        >
          {{ item.value }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
// TODO: Поправить нейминг методов, пропсов
export default {
  name: 'ProductDisplaying',
  props: {
    page: {
      type: Number,
      default: 1
    },
    perPage: {
      default: 3,
      type: Number
    },
    limits: {
      default: () => [
        {
          id: 1,
          value: 3
        },
        {
          id: 2,
          value: 6
        },
        {
          id: 3,
          value: 9
        }
      ],
      type: Array
    }
  },
  computed: {
    perPageProduct: {
      get () {
        return this.perPage
      },
      set (limit) {
        this.$router.push({
          query: {
            page: this.page,
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
