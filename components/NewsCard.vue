<template lang="pug">
div.card(:style="cardStyle")
  section.main
    article.text
    | {{ status.text }}
  section.user
    div.line
    div.names
      div.name
      | {{ status.user.name }}
      div.screen-name
        div
        | @{{ status.user.screen_name }}
    div.icon(:style="profileIconStyle")
    
</template>

<script>
import chroma from 'chroma-js'
import moment from 'moment'

export default {
  props: {
    status: Object
  },
  data () {
    return {
      pos: 0,
      fleshnessScale: chroma.scale(['#4c4c4c', 'green'])
    }
  },
  computed: {
    fleshRate () {
      const secondsPassed = moment().diff(moment(this.status.created_at, 'ddd MMM D HH:mm:ss ZZ YYYY'))
      return 1 / (1 + Math.exp((secondsPassed - 300000000) / 100000000))
    },
    cardBgColor () {
      return this.fleshnessScale(this.fleshRate)
    },
    cardFgColor () {
      if (chroma.contrast(this.cardBgColor, 'white') > 4.3) {
        return chroma('white')
      } else {
        return chroma('black')
      }
    },
    cardStyle () {
      return {
        border: `1px solid ${this.cardBgColor}`,
        color: this.cardBgColor,
        backgroundImage: this.status.media_url ? `linear-gradient( to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.9)), url("${this.status.media_url}")` : ''
      }
    },
    profileIconStyle () {
      return { background: `url(${this.status.user.profile_image_url})` }
    }
  },
  mounted () {
    this.pos = this.$el.getBoundingClientRect().top
  }
}
</script>

<style scoped lang="sass">
.card
  box-sizing: border-box;
  padding: 2rem 2rem 1rem 2rem
  display: grid
  grid-template-rows: 1fr 5rem
  width: 30rem
  background-size: cover
  overhlow: hidden
.main
  text-align: left
  font-size: 1.2rem
  font-weight: 200
  line-height: 2rem
.user
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: center
  > *
    margin-left: 1.5rem
  .line::after
    content: ""
    display: inline-block
    width: 5rem
    border-top: 1px solid
    opacity: 0.5
  .names
    text-align: center
    .name
      font-size: 0.85rem
    .screen-name
      font-size: 0.75rem
      opacity: 0.5
  .icon
    border-radius: 50%
    height: 3rem
    width: 3rem
</style>
