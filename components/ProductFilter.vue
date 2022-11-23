<template>
  <aside class="filter">
    <h2 class="filter__title">
      Фильтры
    </h2>

    <form class="filter__form form">
      <fieldset class="form__block">
        <legend class="form__legend">
          Цена
        </legend>
        <label class="form__label form__label--price" for="priceFrom">
          <input
            id="priceFrom"
            v-model.number="currentMinPrice"
            class="form__input"
            type="text"
            name="min-price"
            placeholder="0"
            @input="changeFilter({ filter: 'minPrice', value: currentMinPrice })"
          >
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price" for="priceTo">
          <input
            id="priceTo"
            v-model.number="currentMaxPrice"
            class="form__input"
            type="text"
            name="max-price"
            :placeholder="maxPriceProduct"
            @input="changeFilter({ filter: 'maxPrice', value: currentMaxPrice })"
          >
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Категория
        </legend>
        <label class="form__label form__label--select" for="category">
          <select
            id="category"
            v-model.number="currentCategoryId"
            class="form__select"
            name="category"
            @change="changeFilter(
              { filter: 'categoryId', value: currentCategoryId })"
          >
            <option value="0">Все категории</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Цвет
        </legend>
        <BaseColor
          :colors="productsColor"
          type="checkbox"
          :current-color.sync="currentColor"
          class="colors--black"
        />
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Материал
        </legend>
        <ul class="check-list">
          <li v-for="material in materials" :key="material.id" class="check-list__item">
            <label class="check-list__label" :for="material.code">
              <input
                :id="material.code"
                v-model="currentMaterial"
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                :value="material.id"
              >
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Коллекция
        </legend>
        <ul class="check-list">
          <li v-for="season in seasons" :key="season.id" class="check-list__item">
            <label class="check-list__label" :for="season.code">
              <input
                :id="season.code"
                v-model="currentSeason"
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="season.id"
              >
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primary" type="submit" @click.prevent="submit()">
        {{ $options.componentData.buttonSubmitText }}
      </button>
      <button
        v-if="checkedObject"
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
      >
        {{ $options.componentData.buttonResetText }}
      </button>
    </form>
  </aside>
</template>

<script>
import { mapActions } from 'vuex'
import BaseColor from '@/components/BaseColor'

export default {
  name: 'ProductFilter',
  components: { BaseColor },
  props: {
    limit: {
      default: 3,
      type: Number
    },
    products: {
      default: () => [],
      type: Array
    }
  },
  componentData: {
    buttonSubmitText: 'Применить',
    buttonResetText: 'Сбросить'
  },
  data () {
    return {
      currentMinPrice: null,
      currentMaxPrice: null,
      currentCategoryId: 0,
      currentColor: [],
      currentMaterial: [],
      currentSeason: [],
      currentQuery: {},

      categoriesData: null,
      materialsData: null,
      seasonsData: null,
      colorsData: null
    }
  },
  computed: {
    checkedObject () {
      return Object.keys(this.$route.query).length
    },
    maxPriceProduct () {
      return Math.max(...Object.values(this.$store.state.products.map(i => i.price)))
    },
    categories () {
      return this.categoriesData ? this.categoriesData.items : []
    },
    productsColor () {
      return this.colorsData ? this.colorsData.items : []
    },
    materials () {
      return this.materialsData ? this.materialsData.items : []
    },
    seasons () {
      return this.seasonsData ? this.seasonsData.items : []
    }
  },
  watch: {
    color (value) {
      this.currentColor = value
    },
    material (value) {
      this.currentMaterial = value
    },
    season (value) {
      this.currentSeason = value
    }
  },
  async created () {
    const values = [
      await this.createdValueArr(this.currentColor, 'colorIds'),
      await this.createdValueArr(this.currentSeason, 'seasonIds'),
      await this.createdValueArr(this.currentMaterial, 'materialIds'),
      await this.loadProducts(),
      await this.loadCategories(),
      await this.loadColors(),
      await this.loadMaterials(),
      await this.loadSeasons()
    ]
    await Promise.all([values])

    if (this.$route.query.minPrice) {
      this.currentMinPrice = +this.$route.query.minPrice
    }
    if (this.$route.query.maxPrice) {
      this.currentMaxPrice = +this.$route.query.maxPrice
    }
    if (this.$route.query.categoryId) {
      this.currentCategoryId = +this.$route.query.categoryId
    }
  },
  methods: {
    ...mapActions(['loadProducts']),
    changeFilter ({
      filter,
      value
    }) {
      this.currentQuery = {
        ...this.currentQuery,
        [filter]: value
      }
    },

    async submit () {
      if (this.$route.query.categoryId && this.$route.query.categoryId === this.currentCategoryId) {
        this.currentQuery = {
          ...this.currentQuery,
          categoryId: this.$route.query.categoryId
        }
      } else {
        this.currentQuery = {
          ...this.currentQuery
        }
      }
      await this.$router.push({
        query: {
          ...this.currentQuery,
          page: 1,
          limit: this.limit,
          colorIds: [...this.currentColor],
          materialIds: [...this.currentMaterial],
          seasonIds: [...this.currentSeason]
        }
      })
    },
    async reset () {
      this.currentQuery = {}
      if (this.$route.query) {
        await this.$router.push({
          query: null
        })
      }
      this.currentColor = []
      this.currentSeason = []
      this.currentMaterial = []
      this.currentMaxPrice = null
      this.currentMinPrice = null
      this.currentCategoryId = 0
    },
    async loadCategories () {
      const response = await this.$axios({
        method: 'GET',
        url: '/api/productCategories'
      })
      this.categoriesData = response.data
    },
    async loadColors () {
      const response = await this.$axios({
        method: 'GET',
        url: '/api/colors'
      })
      this.colorsData = response.data
    },
    async loadMaterials () {
      const response = await this.$axios({
        method: 'GET',
        url: '/api/materials'
      })
      this.materialsData = await response.data
    },
    async loadSeasons () {
      const response = await this.$axios({
        method: 'GET',
        url: '/api/seasons'
      })
      this.seasonsData = await response.data
    },
    createdValueArr (item, value) {
      if (this.$route.query[value]) {
        if (!item.length) {
          if (typeof this.$route.query[value] !== 'string') {
            this.$route.query[value].forEach((p) => {
              item.push(+p)
            })
          } else {
            item.push(+this.$route.query[value])
          }
        }
      }
      return this.$route.query[value]
    }
  }
}
</script>

<style scoped>

</style>
