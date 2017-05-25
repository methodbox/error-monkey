<template>
  <div id="app">
    <img src="./assets/error-monkey-icon@0.25x.png">
    <h3>Error Monkey</h3>
    <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="custom-check">
      <input type="radio" id="custom-check" class="mdl-radio__button error-type" name="options" value="Custom">
      <span class="mdl-radio__label">Unknown/Custom</span>
    </label>
    <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="wp-check">
      <input type="radio" id="wp-check" class="mdl-radio__button error-type" name="options" value="WordPress" v-on:click="wordpressChecked">
      <span class="mdl-radio__label">WordPress</span>
    </label>
    <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="jm-check">
      <input type="radio" id="jm-check" class="mdl-radio__button error-type" name="options" value="Joomla">
      <span class="mdl-radio__label">Joomla</span>
    </label>
    <div class="mdl-grid" v-show='wordpress'>
      <div class="mdl-cell mdl-cell--12-col">
        <wordpress></wordpress>
      </div>
    </div>
  </div>
</template>

<script>
import Wordpress from './components/Wordpress'

export default {
  name: 'app',
  components: {
    Wordpress
  },
  data () {
    return {
      errorType: 'custom',
      wordpress: false,
      ctufs: '',
      themePlug: ''
    }
  },
  methods: {
    wordpressChecked () {
      this.wordpress = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
