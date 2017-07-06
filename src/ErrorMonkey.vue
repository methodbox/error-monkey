<template>
  <div>
    <app-header v-bind:nav='nav' v-on:bugEmit="bugReport"></app-header>
    <span id='version'>v1.3.3</span>
    <div id="errorMonkey">
      <div class="row">
        <div class="col s4 offset-s4">
          <img src="./assets/error-monkey-icon@0.25x.png">
          <h3>Error Monkey</h3>
        </div>
        <div class="col s4" v-if="nav.instr">
          <instructions></instructions>
        </div>
      </div>
      <error-field v-on:errorPreventEmit='errorFormSubmit' v-on:errorSubEmit='errorFormSubmit' v-on:searchResEmit='searchReset'></error-field>
      <div class="row" v-if='unknown'>
        <div class="col s12">
          <unknown></unknown>
        </div>
      </div>
      <div class="row" v-if='wp.wpBool || application'>
        <div class="col s12">
          <app-error v-bind:wp="wp, app"></app-error>
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
      <div class="row" v-if='network'>
        <div class="col s12">
          <network-error v-bind:networkErrors='networkErrors'></network-error>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header'
import ErrorField from './components/ErrorField'
import AppError from './components/AppError'
import Unknown from './components/Unknown'
import CommonError from './components/CommonError'
import ServerError from './components/ServerError'
import NetworkError from './components/NetworkError'
import Instructions from './components/Instructions'
export default {
  name: 'errorMonkey',
  components: {
    AppHeader,
    ErrorField,
    AppError,
    CommonError,
    ServerError,
    NetworkError,
    Unknown,
    Instructions
  },
  data () {
    return {
      nav: {
        instr: true //  conditional for displaying Instructions on-click
      },
      application: false, //  booleans to determine which template is rendered
      app: {
        syntax: false,
        fatal: false
      },
      common: false,
      server: false,
      network: false,
      unknown: false, //  unrecognized errors template
      wp: { //  WP errors template props
        wpBool: false,
        theme: false,
        plugin: false,
        themePlug: false,
        errorName: null,
        wpPhpLimits: {
          memory: false,
          execTime: false,
          inputTime: false
        }
      },
      commonErrors: { //  common errors template props
        notFound: false,
        forbidden: false
      },
      serverErrors: { //  server errors template props
        tmp: false,
        internal: false,
        database: false,
        phpLimits: false,
        phpLimit: { //  php limits-specific props
          memory: false,
          execTime: false,
          inputTime: false
        },
        unknown: false
      },
      networkErrors: {//  network errors template props
        connection: false,
        dns: false,
        ssl: false,
        redirects: false,
        timeout: false
      }
    }
  },
  methods: {
    resetForm () {
      this.application = false
      this.app.syntax = false
      this.app.fatal = false
      this.wp.wpBool = false
      this.wp.theme = false
      this.wp.plugin = false
      this.wp.themePlug = false
      this.wp.wpPhpLimits.memory = false
      this.wp.wpPhpLimits.execTime = false
      this.wp.wpPhpLimits.inputTime = false
      this.common = false
      this.commonErrors.notFound = false
      this.commonErrors.forbidden = false
      this.server = false
      this.serverErrors.tmp = false
      this.serverErrors.internal = false
      this.serverErrors.database = false
      this.serverErrors.phpLimits = false
      this.serverErrors.phpLimit.memory = false
      this.serverErrors.phpLimit.execTime = false
      this.serverErrors.phpLimit.inputTime = false
      this.serverErrors.unknown = false
      this.network = false
      this.networkErrors.connection = false
      this.networkErrors.dns = false
      this.networkErrors.ssl = false
      this.networkErrors.redirects = false
      this.unknown = false
    },
    searchReset () {
      document.getElementById('error-field').value = ''
    },
    errorFormSubmit () {
      this.resetForm()
      let errorText = document.getElementById('error-field')
      let parseError = errorText.value.split(' ') // parse the error
      let wpParseError = errorText.value.split('/') // parse the path in the error - looking for WP values
      let appArray = this.appFilter(parseError) //  pass the error to a filter and store results in an array
      let wpArray = this.wpFilter(wpParseError, errorText)
      let networkArray = this.networkFilter(parseError)
      let serverArray = this.serverFilter(parseError)
      let commonArray = this.commonFilter(parseError, errorText)
      if (appArray.length !== 0) {
        this.appEvent(appArray[0])
      }
      if (wpArray.length !== 0) { //  check if the err array has a value
        if (serverArray.length !== 0) {
          this.wpEvent(serverArray[0], errorText) // fire a sub event to handle rendering the proper template
        } else {
          this.wpEvent(wpArray[0], errorText)
        }
      }
      if (networkArray.length !== 0) {
        this.networkEvent(networkArray[0])
      }
      if (serverArray.length !== 0) {
        if (wpArray.length === 0) {
          this.serverEvent(serverArray[0])
        }
      }
      if (commonArray.length !== 0) {
        if (commonArray[0] !== 'wp()') {
          this.commonEvent(commonArray)
        } else if (commonArray[0] === 'wp()') {
          this.wpEvent(commonArray, errorText)
        }
      }
      if (appArray.length === 0 && wpArray.length === 0 && commonArray.length === 0 && serverArray.length === 0 && networkArray.length === 0) {
        this.unknownEvent()
      }
    },
    appFilter (error) {
      const appErr = error.filter((err) => {
        switch (err) {
          case 'Parse':
            return err
          case 'syntax':
            return err
          case 'Fatal':
            return err
          case 'undefined':
            return err
        }
      })
      return appErr
    },
    wpFilter (error, wpText) {
      const wpErr = error.filter((err) => {
        switch (err) {
          case 'themes':
            return err
          case 'plugins':
            return err
          case 'wp-admin':
            return err
          case 'wp-includes':
            return err
        }
      })
      return wpErr
    },
    networkFilter (error) {
      const networkErr = error.filter((err) => {
        switch (err) {
          case 'ERR_CONNECTION_REFUSED':
            return err
          case 'ERR_NAME_NOT_RESOLVED':
            return err
          case 'DNS_PROBE_FINISHED_NXDOMAIN':
            return err
          case 'ERR_CERT_COMMON_NAME_INVALID':
            return err
          case 'ERR_SSL_VERSION_OR_CIPHER_MISMATCH':
            return err
          case 'ERR_TOO_MANY_REDIRECTS':
            return err
          case 'ERR_CONNECTION_TIMED_OUT':
            return err
        }
      })
      return networkErr
    },
    serverFilter (error) {
      const serverErr = error.filter((err) => {
        switch (err) {
          case 'session_start():':
            return err
          case 'Unknown:':
            return err
          case 'database':
            return err
          case 'Internal':
            return err
          case '500':
            return err
          case 'memory':
            return err
          case 'exhausted':
            return err
          case '(using':
            return err
        }
      })
      return serverErr
    },
    commonFilter (error, commonText) {
      const commonErr = error.filter((err) => {
        switch (err) {
          case 'Forbidden':
            return err
          case 'Not':
            return err
          case 'Found':
            return err
          case 'wp()':
            return err
        }
      })
      return commonErr
    },
    appEvent (error) {
      switch (error) {
        case 'Parse':
          this.app.syntax = true
          break
        case 'syntax':
          this.app.syntax = true
          break
        case 'Fatal':
          this.app.fatal = true
          break
        case 'undefined':
          this.app.fatal = true
          break
      }
      this.application = true
    },
    wpEvent (errorPath, errorName) { //  conditional rendering methods for templates
      switch (errorPath) {
        case 'themes':
          this.wp.theme = true
          break
        case 'plugins':
          this.wp.plugin = true
          break
        case 'wp-admin':
          this.wp.themePlug = true
          break
        case 'wp-includes':
          this.wp.themePlug = true
          break
        case 'memory':
          this.wp.wpPhpLimits.memory = true
          this.wp.themePlug = 'WordPress Application Exceeded PHP Memory Limit'
          break
        default:
          this.wp.themePlug = 'WordPress Application Error'
      }
      this.application = true
      this.wp.wpBool = true
      this.wp.errorName = errorName.value.substring(0, 12) // grab parse of error value and set as desc
    },
    networkEvent (networkErrorType) {
      switch (networkErrorType) {
        case 'ERR_CONNECTION_REFUSED':
          this.networkErrors.connection = true
          break
        case 'ERR_NAME_NOT_RESOLVED':
          this.networkErrors.dns = true
          break
        case 'DNS_PROBE_FINISHED_NXDOMAIN':
          this.networkErrors.dns = true
          break
        case 'ERR_CERT_COMMON_NAME_INVALID':
          this.networkErrors.ssl = true
          break
        case 'ERR_SSL_VERSION_OR_CIPHER_MISMATCH':
          this.networkErrors.ssl = true
          break
        case 'ERR_TOO_MANY_REDIRECTS':
          this.networkErrors.redirects = true
          break
        case 'ERR_CONNECTION_TIMED_OUT':
          this.networkErrors.timeout = true
          break
      }
      this.network = true
    },
    serverEvent (serverErrorType) {
      switch (serverErrorType) {
        case 'session_start():':
          this.serverErrors.tmp = true
          break
        case 'Unknown:':
          this.serverErrors.tmp = true
          break
        case 'database':
          this.serverErrors.database = true
          break
        case 'Internal':
          this.serverErrors.internal = true
          break
        case '500':
          this.serverErrors.internal = true
          break
        case 'memory':
          this.serverErrors.phpLimits = true
          this.serverErrors.phpLimit.memory = true
          break
        case '(using':
          this.serverErrors.database = true
          break
      }
      this.server = true
    },
    commonEvent (commonErrorType) {
      if (commonErrorType[0] === 'Forbidden') {
        this.commonErrors.forbidden = true
      } else if (commonErrorType[0] + ' ' + commonErrorType[1] === 'Not Found') {
        this.commonErrors.notFound = true
      }
      this.common = true
    },
    unknownEvent () {
      this.unknown = true
    },
    bugReport () { //  conditionally show how to report a bug
      if (this.unknown === false) {
        this.unknown = true
      } else {
        this.unknown = false
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
    min-width: 180px;
    overflow: hidden;
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
  #errorMonkey {
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
  #version {
    color: rgba(48,79,254, .8);
    font-weight: lighter;
    padding: 10px;
    line-height: 1.75;
  }
</style>
