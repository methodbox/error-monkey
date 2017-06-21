<template>
  <header>
    <!-- nav -->
    <div class="navbar-fixed">
      <nav class="nav-color">
        <div class="nav-wrapper">
          <a href="/test" class="brand-logo">Error Monkey</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li v-if='nav.instr'><a class="nav-links" href="#" v-on:click="instructionsNav">Instructions(Hide)</a></li>
            <li v-else><a class="nav-links" href="#" v-on:click="instructionsNav">Instructions(Show)</a></li>
            <li><a class="nav-links" v-on:click="bug">Report a Bug</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: ['nav'],
  methods: {
    instructionsNav () { //  conditionally show Instructions template
      if (this.nav.instr === false) {
        this.nav.instr = true
      } else {
        this.nav.instr = false
      }
    },
    bug () {
      this.$emit('bugEmit')
    }
  }
}
</script>

<style lang="css">
</style>
