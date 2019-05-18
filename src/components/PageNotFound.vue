<template>
  <div>
    404 Page not Found
    <a href="/">Go Home</a>
  </div>
</template>

<script>
  export default {
    created () {
      this.$store.dispatch('setCurrentPage', 'Page not found!')
    }
  }
</script>