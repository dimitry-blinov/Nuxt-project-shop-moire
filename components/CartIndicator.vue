<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="../static/img/svg/sprite.svg#icon-cart" />
    </svg>
    <span class="header__count" aria-label="Количество товаров">
      {{ $store.state.cartProducts.length }}
    </span>
  </router-link>
</template>

<script>
export default {
  name: 'CartIndicator'

}
</script>

<style scoped>

</style>
