<template>
  <ul class="catalog__list">
    <product-item v-for="(product, index) in products" :key="product.id" :colors="colors[index]" :product="product" />
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem'

export default {
  name: 'ProductList',
  components: {
    ProductItem
  },
  props: {
    products: {
      type: Array,
      default: null
    },
    colors: {
      type: Array,
      default: () => [{}]
    }
  }

}
</script>

<style scoped>

</style>
