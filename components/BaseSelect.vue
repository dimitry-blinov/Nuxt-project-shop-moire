<template>
  <fieldset class="form__block">
    <legend class="form__legend">
      {{ title }}
    </legend>
    <label class="form__label form__label--small form__label--select">
      <select v-model="computedValue" class="form__select" name="category">
        <option value="1" disabled>{{ placeholder }}</option>
        <option v-for="item in values" :key="item.id" :value="item.id">
          {{ item.title }}
        </option>
      </select>
    </label>
  </fieldset>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    values: {
      type: Array,
      default: () => [{}]
    },
    value: {
      type: Number,
      default: 1
    }
  },
  computed: {
    computedValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update:value', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
