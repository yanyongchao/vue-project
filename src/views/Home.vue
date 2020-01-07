<template>
  <div>Home</div>
</template>

<script>
export default {
  created () {
    this.$axios.get('/mock/user/info')
      .then(res => {
        console.log(res)
      })
  }
}
</script>
