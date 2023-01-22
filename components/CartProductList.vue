<template>
  <ul class="cart__list">
    <cart-product-item v-for="product in products" :key="product.product.id" :product="product.product" />
  </ul>
</template>

<script>
import CartProductItem from '@/components/CartProductItem.vue'

export default {
  name: 'CartProductList',
  components: {
    CartProductItem
  },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
