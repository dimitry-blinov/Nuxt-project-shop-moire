<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <nuxt-link class="breadcrumbs__link" to="/">
            Каталог
          </nuxt-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#">
            Носки
          </a>
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
          <img width="570" height="570" :src="product.image" alt="Название товара">
        </div>
        <!--
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/product-square-2.jpg" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/product-square-3.jpg" alt="Название товара">
            </a>
          </li>
        </ul>
        -->
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus" />
                  </svg>
                </button>

                <input type="text" value="1" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus" />
                  </svg>
                </button>
              </div>

              <b class="item__price">
                {{ product.price }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">
                  Цвет
                </legend>
                <ul class="colors colors--black">
                  <li class="colors__item">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" value="blue" checked="">
                      <span class="colors__value" style="background-color: #73B6EA;" />
                    </label>
                  </li>
                  <li class="colors__item">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" value="yellow">
                      <span class="colors__value" style="background-color: #FFBE15;" />
                    </label>
                  </li>
                  <li class="colors__item">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" value="gray">
                      <span class="colors__value" style="background-color: #939393;" /></label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">
                  Размер
                </legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" name="category">
                    <option value="value1">37-39</option>
                    <option value="value2">40-42</option>
                    <option value="value3">42-50</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primary" type="submit">
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
export default {
  name: 'Id',
  async asyncData ({
    $axios,
    params
  }) {
    const response = await $axios.$get('https://vue-moire.skillbox.cc/api/products/' + params.id, {})
    response.image = response.colors[0].gallery ? response.colors[0].gallery[0].file.url : response.colors[1].gallery[0].file.url
    return {
      product: response
    }
  },
  data () {
    return {
      product: {}
    }
  }
}
</script>

<style scoped>

</style>
