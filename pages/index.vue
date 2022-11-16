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
        <product-list :products="products" />
        <base-pagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import stringProductFormat from '../helpers/stringProductFormat'
import ProductFilter from '@/components/ProductFilter'
import ProductList from '@/components/ProductList.vue'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'IndexPage',
  components: {
    ProductList,
    ProductFilter,
    BasePagination
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
        ...route.query,
        limit: 3
      }
    })
    return {
      products: response.items.map(product => ({
        ...product,
        image: product.colors[0].gallery ? product.colors[0].gallery[0].file.url : product.colors[1].gallery[0].file.url

      })),
      countProducts: response?.pagination?.total ? response.pagination.total : 0
    }
  },
  data () {
    return {
      products: [],
      productsPerPage: 3,
      countProducts: 0,
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
    }
  },
  watchQuery: ['page'],
  methods: {}
}
</script>
