<template lang="pug">
  section.container
    h1.title
    | #traP1News
    ul.news-list
      li.news(v-for="(status, index) in users" :key="index")
        NewsCard(:status="status")
</template>

<script>
import axios from '~/plugins/axios'
import NewsCard from '~/components/NewsCard'

export default {
  components: {
    NewsCard
  },
  async asyncData () {
    let { data } = await axios.get('/api/news')
    return { users: data }
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped lang="sass">
.title
  margin: 30px 0
.news-list
  display: flex
  justify-content: center
  list-style: none
  flex-wrap: wrap
.news
  margin: 10px 20px
</style>
