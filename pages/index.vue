<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ countProducts }} {{ stringProducts }}
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <product-filter :page.sync="page" :limit.sync="limit" />

      <section class="catalog">
        <product-per-page :per-page.sync="limit" />
        <product-list :products="products" :colors="colorsProducts" />
        <base-pagination v-model="page" :count="countProducts" :per-page="limit" />
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import stringProductFormat from '../helpers/stringProductFormat'
import ProductPerPage from '../components/ProductPerPage'
import ProductFilter from '../components/ProductFilter'
import ProductList from '../components/ProductList.vue'
import BasePagination from '../components/BasePagination'
import setFilters from '@/mixins/setFilters'

export default {
  name: 'IndexPage',
  components: {
    ProductList,
    ProductFilter,
    BasePagination,
    ProductPerPage
  },
  mixins: [setFilters],
  async asyncData ({
    $axios,
    route
  }) {
    if (!Object.keys(route.query).length) {
      route = {
        ...route,
        query: {
          page: 1,
          limit: 3
        }
      }
    }
    const response = await $axios.$get('/api/products', {
      params: {
        ...route.query
      }
    })
    return {
      products: response.items.map(product => ({
        ...product,
        image: product.colors[0].gallery ? product.colors[0].gallery[0].file.url : product.colors[1].gallery[0].file.url
      })),
      countProducts: response.pagination ? response.pagination.total : response.items.length
    }
  },
  data () {
    return {
      products: [],
      countProducts: null
    }
  },
  computed: {
    colorsProducts () {
      return this.products
        ? this.products.map(product => ([...product.colors.map(color => ({
          ...color.color
        }))]))
        : []
    },

    stringProducts () {
      return stringProductFormat(this.countProducts)
    }
  },
  async created () {
    await Promise.all([this.loadCart()])
  },
  methods: {
    ...mapActions(['createUserKey', 'loadCart'])
  }
}

// TODO: ДОбавить лоадер на смену кол-во товаров на главной странице
</script>
