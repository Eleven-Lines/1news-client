<template lang="pug">
  section.container
    div.hash #
    input.title(v-model="tag")
    ul.news-list
      li.news(v-for="(status, index) in data.data" :key="index")
        NewsCard(:status="status")
</template>

<script>
import axios from '~/plugins/axios'
import NewsCard from '~/components/NewsCard'

export default {
  components: {
    NewsCard
  },
  data () {
    return {
      data: [],
      tag: 'traP1news'
    }
  },
  watch: {
    async tag () {
      this.data = await axios.get(`/api/news?tag=${this ? this.tag : 'traP1news'}`)
    }
  },
  async mounted () {
    this.data = await axios.get(`/api/news?tag=traP1news`)
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped lang="sass">
.hash
  content: "#"
  display: inline-block
  font-size: 5rem
  font-weight: 600
  color: gray
  margin-right: 2rem
  transform: translateY(12px)
.title
  font-weight: 600
  display: inline-block
  font-size: 3rem
  color: #333333
  letter-spacing: 0.3rem
  appearance: none
  border: none
  outline: none
  border-bottom: 1px solid gray
  margin-bottom: 5rem
.title:focus
  appearance: none
  box-shadow: none
  border: none
  outline: none
  border-bottom: 1px solid green


.news-list
  display: flex
  justify-content: center
  list-style: none
  flex-wrap: wrap
.news
  margin: 10px 20px
</style>
