<template>
  <div>
    <p v-if='test'>Test works</p>
    <p>Test is false</p>
  </div>
</template>

<script>
export default {
  props: ['test']
}
</script>

<style lang="css">
</style>
