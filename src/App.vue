<template>
  <div class="App">
    <div>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {}
  }
}
</script>

<style lang="less">
.App {
  color: red;
}
</style>
