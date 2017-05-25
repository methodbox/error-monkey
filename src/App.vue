<template>
  <div id="app">
    <img src="./assets/error-monkey-icon@0.25x.png">
    <h3>Error Monkey</h3>
    <div class="mdl-grid mdl-grid--no-spacing">
      <div class="mdl-cell--2-col mdl-cell--3-offset mdl-grid--no-spacing">
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="custom-check">
          <input type="radio" id="custom-check" class="mdl-radio__button error-type" name="options" value="Custom" v-on:click="customChecked">
          <span class="mdl-radio__label">Unknown/Custom</span>
        </label>
      </div>
      <div class="mdl-cell--2-col mdl-grid--no-spacing">
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="wp-check">
          <input type="radio" id="wp-check" class="mdl-radio__button error-type" name="options" value="WordPress" v-on:click="wordpressChecked" checked>
          <span class="mdl-radio__label">WordPress</span>
        </label>
      </div>
      <div class="mdl-cell--2-col mdl-grid--no-spacing">
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="jm-check">
          <input type="radio" id="jm-check" class="mdl-radio__button error-type" name="options" value="Joomla" v-on:click="joomlaChecked">
          <span class="mdl-radio__label">Joomla</span>
        </label>
      </div>
    </div>
    <form v-on:submit.prevent="errorFormSubmit">
      <div class="mdl-grid">
        <div class="mdl-cell--5-col mdl-cell--3-offset mdl-grid--no-spacing">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
            <input class="mdl-textfield__input" type="text" name="Test Field" id="error-field" placeholder="Enter the Error" v-on:click="wpReset">
          </div>
        </div>
        <div class="mdl-cell-1-col button-spacing">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="error-submit-button" type="button" v-on:click="errorFormSubmit">
            Fix Me
          </button>
        </div>
      </div>
    </form>
    <div class="mdl-grid" v-if='wordpress'>
      <div class="mdl-cell mdl-cell--12-col">
        <wordpress v-bind:wp="wp"></wordpress>
      </div>
    </div>
    <div class="mdl-grid" v-if='notFound.notFoundBool'>
      <div class="mdl-cell mdl-cell--12-col">
        <four-oh-four></four-oh-four>
      </div>
    </div>
    <div class="mdl-grid" v-if='unknown'>
      <div class="mdl-cell mdl-cell--12-col">
        <unknown></unknown>
      </div>
    </div>
  </div>
</template>

<script>
import Wordpress from './components/Wordpress'
import fourOhFour from './components/notFound'
import Unknown from './components/Unknown'
export default {
  name: 'app',
  components: {
    Wordpress,
    fourOhFour,
    Unknown
  },
  data () {
    return {
      wordpress: false,
      joomla: false,
      custom: false,
      wp: {
        wpErrorName: '',
        themePlug: ''
      },
      notFound: {
        notFoundBool: false,
        notFoundUrl: ''
      },
      unknown: false
    }
  },
  methods: {
    wordpressChecked () {
      this.wordpress = true
      this.joomla = false
      this.custom = false
    },
    joomlaChecked () {
      this.wordpress = false
      this.joomla = true
      this.custom = false
    },
    customChecked () {
      this.wordpress = false
      this.joomla = false
      this.custom = true
    },
    resetForm () {
      this.notFound.notFoundBool = false
      this.internalSerErr = false
      this.serverErrorType = ''
      this.errorUrl = ''
      this.wp.wpErrorName = ''
      this.wp.themePlug = ''
      this.wp.formSubmitted = false
      this.unknown = false
    },
    wpError (errorArray) {
      //  parse the error sent from errorFormSubmit
      for (let u = 0; u < 6; u++) {
        //  grabs the general error and passes it to
        this.wp.wpErrorName += errorArray[u].substring(0, 30) + ' '
      }
      //  evaluate the WP error type and pass the path of the file calling the error to wpEvaluate()
      if (errorArray[2] === 'Call') {
        this.wpEvaluate(errorArray[8].split('/'))
      } else if (errorArray[2] === 'Class') {
        this.wpEvaluate(errorArray[7].split('/'))
      } else if (errorArray[1] === 'Unknown:') {
        this.wpEvaluate(errorArray[2].split('/'))
      } else if (errorArray[2] === 'require_once():') {
        this.wpEvaluate(errorArray[9].split('/'))
      } else if (errorArray[0] === 'Warning:') {
        this.wpEvaluate(errorArray[12].split('/'))
      }
    },
    wpEvaluate (errorPath) {
      //  gets the path of the file calling the error and parses out theme or plugin
      for (let e = 0; e < errorPath.length; e++) {
        if (errorPath[e] === 'themes') {
          this.wp.themePlug = 'Theme'
        } else if (errorPath[e] === 'plugins') {
          this.wp.themePlug = 'Plugin'
        }
      }
    },
    errorFormSubmit (event) {
      this.resetForm()
      let errorText = document.getElementById('error-field')
      let splitError = errorText.value.split(' ')
      if (splitError[0] + ' ' + splitError[1] === 'Fatal error:' || splitError[0] === 'Warning:') {
        this.wpError(splitError)
        this.wordpress = true
      } else if (splitError[5] === 'URL' && splitError[16] === '404') {
        this.notFound.notFoundBool = true
        this.notFound.notFoundUrl = splitError[6]
      } else if (splitError[0] + ' ' + splitError[1] + ' ' + splitError[2] === 'Internal Server Error') {
        this.internalSerErr = true
        this.serverErrorType = '500 Internal Server Error'
      } else {
        this.unknown = true
      }
    },
    wpReset () {
      document.getElementById('error-field').value = ''
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
