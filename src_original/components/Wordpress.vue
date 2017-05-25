<template>
  <!--  WordPress Error Template  -->
  <div>
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
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col mdl-cell--2-offset">
        <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp full-width" v-show="formSubmitted && themePlug">
          <thead>
            <tr>
              <th class="mdl-data-table__cell--non-numeric">Error</th>
              <th class="mdl-data-table__cell--non-numeric">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="ctufs">
              <td class="mdl-data-table__cell--non-numeric">
                <span class="mdl-chip mdl-chip--contact">
                  <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">F</span>
                  <span class="mdl-chip__text ">{{ctufs}}</span>
                </span>
              </td>
              <td class='mdl-data-table__cell--non-numeric'>This error is always caused by a problem with the application.</td>
            </tr>
            <tr v-if="themePlug">
              <td class='mdl-data-table__cell--non-numeric'>
                <span class="mdl-chip mdl-chip--contact">
                  <span class="mdl-chip__contact mdl-color--purple mdl-color-text--white">C</span>
                  <span class="mdl-chip__text">Caused by Theme or Plugin</span>
                </span>
              </td>
              <td class='mdl-data-table__cell--non-numeric'>{{themePlug}}</td>
            </tr>
            <tr v-if="themePlug">
              <td class='mdl-data-table__cell--non-numeric'>
                <span class="mdl-chip mdl-chip--contact">
                  <span class="mdl-chip__contact mdl-color--purple mdl-color-text--white">S</span>
                  <span class="mdl-chip__text">Recommended Solution</span>
                </span>
              </td>
              <td class='mdl-data-table__cell--non-numeric'>
                Sell WPPS
              </td>
            </tr>
            <tr v-show="themePlug">
              <td class='mdl-data-table__cell--non-numeric'>
                Additional Suggestions:
                <ul>
                  <li>Refer them to their developer</li>
                  <li>Suggest running updates, if possible</li>
                  <li>Refer to the theme or plugin developer</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <unknown-error v-if="!themePlug && formSubmitted && !notFound"></unknown-error>
    <four-four v-if="notFound"></four-four>
  </div>
</template>

<script>
import UnknownError from './Unknown.vue'
import fourFour from './404.vue'
export default {
  components: {
    UnknownError,
    fourFour
  },
  data () {
    return {
      notFound: false,
      internalSerErr: false,
      serverErrorType: '',
      errorUrl: '',
      ctufs: '',
      themePlug: '',
      formSubmitted: false,
      unknown: false
    }
  },
  props: ['wordpress'],
  methods: {
    resetForm () {
      this.notFound = false
      this.internalSerErr = false
      this.errorUrl = ''
      this.ctufs = ''
      this.themePlug = ''
      this.formSubmitted = false
      this.unknown = false
    },
    errorFormSubmit (event) {
      this.resetForm()
      let errorText = document.getElementById('error-field')
      let splitError = errorText.value.split(' ')
      this.formSubmitted = true
      if (splitError[0] + ' ' + splitError[1] === 'Fatal error:' || splitError[0] === 'Warning:') {
        //  handle WP fatal errors related to plugins & themes
        console.log('Evaluating WP Theme/Plugin Error...')
        if (splitError[2] === 'Call') {
          let errorPath = splitError[8].split('/')
          for (let t = 0; t < errorPath.length; t++) {
            if (errorPath[t] === 'themes') {
              this.themePlug = 'Theme'
            }
          }
        }
        if (splitError[2] === 'require_once():') {
          let errorPath = splitError[9].split('/')
          for (let r = 0; r < errorPath.length; r++) {
            if (errorPath[r] === 'plugins') {
              this.themePlug = 'Plugin'
            }
          }
        }
        if (splitError[0] === 'Warning:') {
          let errorPath = splitError[12].split('/')
          for (let w = 0; w < errorPath.length; w++) {
            if (errorPath[w] === 'plugins') {
              this.themePlug = 'Plugin'
            }
          }
        }
        for (let u = 0; u < 6; u++) {
          //  grab "fatal error" and call to undef function
          this.ctufs += splitError[u].substring(0, 30) + ' '
        }
      } else if (splitError[5] === 'URL' && splitError[16] === '404') {
        this.notFound = true
        this.errorUrl = splitError[6]
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

<style lang="css">
  .full-width {
    width: 80%;
  }

  button#error-submit-button {
    margin-left: 20px;
    margin-top: 14px;
  }
</style>
