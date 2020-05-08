<template>
  <div>
    <p>Home</p>
    <img src="@/assets/images/solution_offline_left.png" alt="">
    <fs-icon @click="handleClick"/>
  </div>
</template>

<script>
import FsIcon from '@/components/Icon.vue'
export default {
  data () {
    return {
    }
  },
  created () {
    this.$axios.get('/user/info')
      .then((res) => {
      })
  },
  methods: {
    handleClick () {
      console.log([1].includes(1))
    }
  },
  components: {
    FsIcon
  }
}
</script>
