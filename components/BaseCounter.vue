<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="removeAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="../static/img/svg/sprite.svg#icon-minus" />
      </svg>
    </button>

    <input v-model="count" type="number" name="count">

    <button type="button" aria-label="Добавить один товар" @click.prevent="addAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="../static/img/svg/sprite.svg#icon-plus" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseCounter',
  props: {
    amount: {
      type: Number,
      default: 1
    }
  },
  computed: {
    count: {
      get () {
        return this.amount
      },
      set (value) {
        if (value < 1) {
          value = 1
        }
        this.$emit('update:amount', +value)
      }
    }
  },
  methods: {
    addAmount () {
      this.$emit('update:amount', this.amount + 1)
    },
    removeAmount () {
      if (this.amount > 0) {
        this.$emit('update:amount', this.amount - 1)
      }
    }
  }
}
</script>

<style scoped>

</style>
