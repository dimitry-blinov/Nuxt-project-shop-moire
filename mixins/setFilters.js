export default {
  name: 'SetFilters',
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
    colorIds: {
      get () {
        return Object.keys(this.$route.query).length ? Number(this.$route.query.colorIds) : []
      },
      set (value) {
        this.$emit('colords', value)
      }
    },
    materialIds: {
      get () {
        return Object.keys(this.$route.query).length ? Number(this.$route.query.materialIds) : []
      },
      set (value) {
        this.$emit('materialIds', value)
      }
    },
    seasonIds: {
      get () {
        return Object.keys(this.$route.query).length ? Number(this.$route.query.seasonIds) : []
      },
      set (value) {
        this.$emit('seasonIds', value)
      }
    },
    minPrice: {
      get () {
        return Object.keys(this.$route.query).length ? Number(this.$route.query.minPrice) : []
      },
      set (value) {
        this.$emit('minPrice', value)
      }
    },
    maxPrice: {
      get () {
        return Object.keys(this.$route.query).length ? Number(this.$route.query.maxPrice) : []
      },
      set (value) {
        this.$emit('maxPrice', value)
      }
    },
    categoryId: {
      get () {
        return Object.keys(this.$route.query).length ? Number(this.$route.query.categoryId) : []
      },
      set (value) {
        this.$emit('categoryId', value)
      }
    }
  },
  watchQuery: ['page', 'limit', 'colorIds', 'materialIds', 'seasonIds', 'minPrice', 'maxPrice', 'categoryId']
}
