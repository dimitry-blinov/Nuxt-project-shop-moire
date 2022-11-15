<template>
  <header class="header container">
    <div class="header__wrapper">
      <nuxt-link class="header__info" to="/">
        Каталог
      </nuxt-link>

      <a class="header__logo">
        <img src="../static/img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116" height="34">
      </a>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>
      <!--      <CartIndicator/>-->
    </div>
  </header>
</template>

<script>
// import CartIndicator from '@/components/CartIndicator.vue';

export default {
  name: 'HeaderItem'
  // components: { CartIndicator },
}
</script>

<style scoped>

</style>
