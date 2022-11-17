<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ countProducts }} {{ stringProductFormat(countProducts) }}
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <product-filter />

      <section class="catalog">
        <product-per-page :per-page.sync="limit" />
        <product-list :products="products" :colors="colorsProduct" />
        <base-pagination v-model="page" :count="countProducts" :per-page="limit" />
      </section>
    </div>
  </main>
</template>

<script>
import stringProductFormat from '../helpers/stringProductFormat'
import ProductPerPage from '../components/ProductPerPage'
import ProductFilter from '../components/ProductFilter'
import ProductList from '../components/ProductList.vue'
import BasePagination from '../components/BasePagination'

export default {
  name: 'IndexPage',
  components: {
    ProductList,
    ProductFilter,
    BasePagination,
    ProductPerPage
  },
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
    const response = await $axios.$get('https://vue-moire.skillbox.cc/api/products', {
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
      countProducts: null,
      stringProductFormat
    }
  },
  computed: {
    page: {
      get () {
        return Object.keys(this.$route.query).length ? Number(this.$route.query.page) : 1
      },
      set (value) {
        this.$emit('page', value)
      }
    },
    limit: {
      get () {
        return Object.keys(this.$route.query).length ? Number(this.$route.query.limit) : 3
      },
      set (value) {
        this.$emit('limit', value)
      }
    },
    colorsProduct () {
      return this.products
        ? this.products.map(product => ({
          ...product.colors.map(color => ({
            ...color.color
          }))
        }))
        : []
    }
  },
  watchQuery: ['page', 'limit'],
  methods: {}
}
</script>
