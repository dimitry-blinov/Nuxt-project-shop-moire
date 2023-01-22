<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          3 товара
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field" />
        <cart-product-list :products="products" />
      </form>
      <div class="cart__block">
        <p class="cart__desc">
          Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
        </p>
        <p class="cart__price">
          Итого: <span>4 070 ₽</span>
        </p>

        <button class="cart__button button button--primary" type="submit">
          Оформить заказ
        </button>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import CartProductList from '@/components/CartProductList.vue'

export default {
  name: 'Cart',
  components: {
    CartProductList
  },
  computed: {
    ...mapGetters({
      cartProducts: 'cartDetailProducts'
    }),
    products () {
      return this.cartProducts
    }
  }
}

// TODO: вынести breadcrumbs  в компоненты
</script>

<style scoped>

</style>
