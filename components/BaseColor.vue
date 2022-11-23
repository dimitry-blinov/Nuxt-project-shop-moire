<template>
  <ul class="colors">
    <li
      v-for="item in colors"
      :key="item.id"
      class="colors__item"
      :class="{'colors__active': item.id === currentColor}"
    >
      <label class="colors__label">
        <input
          v-model="computedColor"
          class="colors__radio sr-only"
          :type="type"
          :value="item.id"
        >
        <span
          class="colors__value"
          :class="{'value--black': item.title === 'white'}"
          :style="{backgroundColor: item.code}"
        />
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BaseColor',
  props: {
    colors: {
      type: Array,
      default: () => [{}]
    },
    currentColor: {
      type: [Array, Number],
      default: () => [] || 0
    },
    type: {
      default: 'radio',
      type: String
    }
  },
  computed: {
    computedColor: {
      get () {
        return this.currentColor
      },
      set (value) {
        this.$emit('update:currentColor', value)
      }
    }
  }
}
</script>
<style scoped>
.colors__active {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 50%;
}
</style>
