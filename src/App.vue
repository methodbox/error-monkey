<template>
  <div>
    <header>
      <div>
        <!-- nav -->
        <div class="navbar-fixed">
          <nav class="nav-color">
            <div class="nav-wrapper">
              <a href="/test" class="brand-logo">Error Monkey</a>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a class="nav-links" href="#" v-on:click="instructionsNav">Instructions</a></li>
                <li><a class="nav-links" v-on:click="unknownEvent">Report a Bug</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
    <div>
      <div id="app">
        <div class="row">
          <div class="col s4 offset-s4">
            <img src="./assets/error-monkey-icon@0.25x.png">
            <h3>Error Monkey</h3>
          </div>
          <div class="col s4">
            <instructions v-if="nav.instr"></instructions>
          </div>
        </div>
        <form v-on:submit.prevent="errorFormSubmit" autocomplete="">
          <div class="row" id='error-field-row'>
            <div class="col s5 offset-s3">
              <div class="input-field full-width">
                <input type="text" name="Test Field" id="error-field" v-on:click="searchReset">
                <label for="error-field">Enter the Error (cut and paste directly from the web page)</label>
              </div>
            </div>
            <div class="col s2 button-spacing">
              <button class="waves-effect waves-light btn pink accent-2" id="submit-button" type="button" v-on:click="errorFormSubmit">
                Fix Me
              </button>
            </div>
          </div>
        </form>
        <div class="row" v-if='wordpress'>
          <div class="col s12">
            <wordpress v-bind:wp="wp, errorName"></wordpress>
          </div>
        </div>
        <div class="row" v-if='common'>
          <div class="col s12">
            <common-error v-bind:commonErrors='commonErrors'></common-error>
          </div>
        </div>
        <div class="row" v-if='server'>
          <div class="col s12">
            <server-error v-bind:serverErrors='serverErrors'></server-error>
          </div>
        </div>
        <div class="row" v-if='unknown'>
          <div class="col s12">
            <unknown></unknown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Wordpress from './components/Wordpress'
import Unknown from './components/Unknown'
import CommonError from './components/CommonError'
import ServerError from './components/ServerError'
import Instructions from './components/Instructions'
export default {
  name: 'app',
  components: {
    Wordpress,
    CommonError,
    ServerError,
    Unknown,
    Instructions
  },
  data () {
    return {
      nav: {
        //  conditional for displaying Instructions on-click
        instr: false
      },
      //  A short description of the error - WP & Server error templates are passed this value
      errorName: '',
      //  booleans to determine which template is rendered
      wordpress: false,
      common: false,
      server: false,
      //  unrecognized errors template
      unknown: false,
      //  WP errors template props
      wp: {
        themePlug: ''
      },
      //  common errors template props
      commonErrors: {
        notFound: false,
        forbidden: false
      },
      //  server errors template props
      serverErrors: {
        tmp: false,
        internal: false,
        fiveHundred: false
      }
    }
  },
  methods: {
    resetForm () {
      this.wordpress = false
      this.common = false
      this.commonErrors.forbidden = false
      this.commonErrors.notFound = false
    },
    searchReset () {
      document.getElementById('error-field').value = ''
    },
    errorFormSubmit () {
      this.resetForm()
      let errorText = document.getElementById('error-field')
      let parseError = errorText.value.split(' ')// parse the error
      let wpParseError = errorText.value.split('/')// parse the path in the error - looking for WP values
      //  filter to determine the error type
      let wpFilter = wpParseError.filter(function (err) {
        //  filter out error-related values
        if (err === 'themes' || err === 'plugins' || err === 'wp-admin') {
          return err//  send them to an array
        }
      })

      let commonFilter = parseError.filter(function (err) {
        if (err === 'Forbidden' || err === 'Not' || err === 'Found') {
          return err
        }
      })
      //  filter out server error related values
      let serverFilter = parseError.filter(function (err) {
        if (err === 'session_start():' || err === 'Unknown:') {
          return err
        }
      })
      //  evaluate the error down to specific template type
      if (wpFilter.length !== 0) { //  check if the err array has a value
        this.wpEvaluate(wpFilter) // fire a sub event to handle rendering the proper template
        this.errorName = errorText.value.substring(0, 12) // grab parse of error value and set as desc
      }
      if (commonFilter.length !== 0) {
        this.commonEvent(commonFilter)
      }
      if (serverFilter.length !== 0) {
        this.serverEvent(serverFilter)
      }
    },
    //  template conditional rendering methods
    wpEvaluate (errorPath) {
      let wpError = errorPath[0]
      //  gets the path of the file calling the error and parses out 'themes' or 'plugins'
      if (wpError === 'themes') {
        this.wordpress = true// sets the conditional to render the proper template
        this.wp.themePlug = 'Theme' //  sets the theme or plugin value for WP template
      } else if (wpError === 'plugins') {
        this.wordpress = true
        this.wp.themePlug = 'Plugin'
      } else if (wpError === 'wp-admin' || wpError === 'wp-includes') {
        this.wordpress = true
        this.wp.themePlug = 'Theme or Plugin'
      }
    },
    commonEvent (commonErrorType) {
      this.common = true
      if (commonErrorType[0] === 'Forbidden') {
        this.commonErrors.forbidden = true
      } else if (commonErrorType[0] + ' ' + commonErrorType[1] === 'Not Found') {
        this.commonErrors.notFound = true
      }
    },
    serverEvent (serverErrorType) {
      let serverError = serverErrorType[0]
      if (serverError === 'session_start():' || serverError === 'Unknown:') {
        this.server = true
        this.serverErrors.tmp = true
      }
    },
    unknownEvent () {
      this.resetForm()
      this.unknown = true
    },
    instructionsNav () {
      if (this.nav.instr === false) {
        this.nav.instr = true
      } else {
        this.nav.instr = false
      }
    }
  }
}
</script>

<style>
  nav {
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 2px 0 rgba(0,0,0,0.12), 0 1px 1px -2px rgba(0,0,0,0.2);
  }
  nav.nav-color {
    background: #fff;
  }
  a {
   color: rgb(255,64,129)
  }
  a.brand-logo {
    padding-left: 50px;
  }
  a.brand-logo, .nav-links {
    color: rgb(255,64,129);
  }
  div.table-data-row {
    border-left: 1px solid rgb(255,64,129)
  }
  span.chip-label {
      float: left;
      margin: 0 8px 0 -12px;
      height: 32px;
      width: 32px;
      border-radius: 50%;
      text-align: center;
      color: #fff;
      font-weight: 600;
      font-size: 20px;
  }
  .chip {
    margin-left: 10%;
  }
  .td-chip {
    min-width: 300px;
  }
  .col.s2.button-spacing {
    width: 200px;
    margin-left: -40px;
  }
  .li-padding {
    border-left: 1px solid rgb(255,64,129);
    padding-left: 20px;
    margin-top: 5px;
    line-height: 2;
  }
  .suggestions-list {
    padding-left: 16px;
  }
  .wpps {
    color: #0073aa;
    font-weight: 600;
  }
  .web-sec {
    color: darkorchid;
    font-weight: 600;
  }
  .wp {
    color: #0073aa;
  }
  input#error-field:focus {
    border-bottom: 1px solid #304ffe;
    box-shadow: 0 1px 0 0 #304ffe;
  }
  input#error-field:focus+label {
    color: #304ffe;
  }
  button#submit-button {
    margin-top: 20px;
  }
  #app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  #nav-mobile {
    padding-right: 50px;
  }
</style>
