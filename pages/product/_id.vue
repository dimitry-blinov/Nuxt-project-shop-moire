<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <nuxt-link class="breadcrumbs__link" :to="{path: '/'}">
            Каталог
          </nuxt-link>
        </li>
        <li class="breadcrumbs__item">
          <nuxt-link
            class="breadcrumbs__link"
            :to="{path: '/', query: {
              categoryId: product.category.id,
              page: 1,
              limit: 3
            }}"
          >
            {{ product.category.title }}
          </nuxt-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="productChangeImage" alt="Название товара">
        </div>
        <ul class="pics__list">
          <li v-for="color in product.colors" :key="color.id" class="pics__item">
            <a
              href="#"
              class="pics__link"
              :class="{'pics__link--current': changeActive(color, productChangeImage)}"
              @click.prevent="currentColor = color.color.id"
            >
              <img
                width="98"
                height="98"
                :src="changeSrc(color)"
                :alt="product.title"
              >
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <base-counter :amount.sync="amount" />

              <b class="item__price">
                {{ product.price }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">
                  Цвет
                </legend>
                <base-color :colors="colors" :current-color.sync="currentColor" />
              </fieldset>

              <base-select
                :values="sizes"
                :value.sync="currentSize"
                :title="'Размер'"
                :placeholder="'Выберите размер'"
              />
            </div>

            <button class="item__button button button--primary" type="submit" :disabled="disabledBtn">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import BaseColor from '~/components/BaseColor.vue'
import BaseSelect from '~/components/BaseSelect.vue'
import BaseCounter from '~/components/BaseCounter.vue'

export default {
  name: 'Id',
  components: {
    BaseColor,
    BaseSelect,
    BaseCounter
  },
  async asyncData ({
    $axios,
    params
  }) {
    const response = await $axios.$get('https://vue-moire.skillbox.cc/api/products/' + params.id, {})
    response.image = response.colors[0].gallery ? response.colors[0].gallery[0].file.url : response.colors[1].gallery[0].file.url
    return {
      product: response,
      productId: response.id,
      currentColor: response.colors[0].color.id,
      colors: response.colors.map(item => ({ ...item.color })),
      sizes: response.sizes

    }
  },
  data () {
    return {
      product: {},
      currentColor: 0,
      currentSize: 1,
      productId: 0,
      amount: 1,
      colors: [],
      sizes: []
    }
  },
  computed: {
    productChangeImage () {
      return this.product.colors
        .find(color => color.color.id === this.currentColor)?.gallery?.[0].file.url || 'https://lasd.lv/public/assets/no-image.png'
    },
    disabledBtn () {
      return this.currentSize === 1 || this.amount === 0
    }
  },
  methods: {
    ...mapActions(['addProductCart']),
    changeActive (value, computed) {
      return value?.gallery?.[0].file.url === computed
    },
    changeSrc (value) {
      return value.gallery ? value.gallery[0].file.url : 0
    },
    async addToCart () {
      await this.addProductCart({
        productId: this.productId,
        colorId: this.currentColor,
        sizeId: this.currentSize,
        quantity: this.amount
      })
    }
  }
}
</script>

<style scoped>

</style>
