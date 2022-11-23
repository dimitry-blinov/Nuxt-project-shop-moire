<template>
  <li class="catalog__item">
    <nuxt-link class="catalog__pic" :to="`/product/${product.id}`">
      <div class="block__img">
        <img :src="productChangeImage" :alt="product.title">
      </div>
    </nuxt-link>

    <h3 class="catalog__title">
      {{ product.title }}
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <base-color :colors="colors" :current-color.sync="currentColor" />
  </li>
</template>

<script>
import numberFormat from '../helpers/numberFormat'
import BaseColor from './BaseColor'

export default {
  name: 'ProductItem',
  filters: {
    numberFormat
  },
  components: {
    BaseColor
  },
  props: {
    product: {
      type: Object,
      default: null
    },
    colors: {
      type: Array,
      default: () => [{}]
    }
  },
  data () {
    return {
      currentColor: this.product.colors[0].color.id
    }
  },
  computed: {
    productChangeImage () {
      return this.product.colors
        .find(color => color.color.id === this.currentColor)?.gallery?.[0].file.url || 'https://lasd.lv/public/assets/no-image.png'
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
