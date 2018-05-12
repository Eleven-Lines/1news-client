<template lang="pug">
div.card
  section.main
    div.media(v-if="status.media_url")
    div.media-cover(v-if="status.media_url")
    article.text(v-if="status.media_url")
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
export default {
  props: {
    status: Object
  },
  computed: {
    profileIconStyle () {
      return { background: `url(${this.status.user.profile_image_url})` }
    }
  }
}
</script>

<style scoped lang="sass">
.card
  border: 1px solid #BDBDBD;
  box-sizing: border-box;
  padding: 2rem 2rem 1rem 2rem
  display: grid
  grid-template-rows: 1fr 6rem
  width: 30rem
.main
  text-align: left
  font-size: 1.2rem
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
    border-top: 1px solid #BDBDBD;
  .names
    text-align: center
    .name
      font-size: 0.85rem
    .screen-name
      font-size: 0.75rem
      color: #BDBDBD
  .icon
    border-radius: 50%
    height: 3rem
    width: 3rem
</style>
