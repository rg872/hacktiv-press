<template>
  <div>
    <h1>Masuk Home</h1>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    //HelloWorld
  },
  beforeCreate: function () {
    this.$store.dispatch('getAllarticles')
  }
}
</script>
