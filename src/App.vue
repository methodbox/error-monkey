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
            <input class="mdl-textfield__input" type="text" name="Test Field" id="error-field" placeholder="Enter the Error" v-on:click="searchReset">
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
    <div class="mdl-grid" v-if='common'>
      <div class="mdl-cell mdl-cell--12-col">
        <common-errors v-bind:commonErr='commonErr'></common-errors>
      </div>
    </div>
    <div class="mdl-grid" v-if='serverErr'>
      <div class="mdl-cell mdl-cell--12-col">
        <server-errors v-bind:serverErrs='serverErrs'></server-errors>
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
import Unknown from './components/Unknown'
import commonErrors from './components/commonErrors'
import serverErrors from './components/serverErrors'
export default {
  name: 'app',
  components: {
    Wordpress,
    commonErrors,
    Unknown,
    serverErrors
  },
  data () {
    return {
      //  template booleans - determines if template is rendered
      wordpress: false,
      joomla: false,
      custom: false,
      wp: {
        wpErrorName: '',
        themePlug: ''
      },
      notFound: false,
      unknown: false,
      forbidden: false,
      serverErr: false,
      common: false,
      //  template data - rendered conditionally using v:bind
      commonErr: {
        errorType: '',
        causeOne: '',
        causeTwo: '',
        causeThree: '',
        solutionOne: '',
        solutionTwo: '',
        solutionThree: ''
      },
      serverErrs: {
        errorType: '',
        link: '',
        solutionOne: '',
        solutionTwo: '',
        solutionThree: '',
        solutionFour: '',
        solutionFive: '',
        solutionSix: ''
      }

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
      this.wordpress = false
      this.joomla = false
      this.custom = false
      this.unknown = false
      this.forbidden = false
      this.notFound = false
      this.tmp = false
      this.common = false
      this.internalSerErr = false
      this.serverErrorType = ''
      this.wp.wpErrorName = ''
      this.wp.themePlug = ''
      this.wp.formSubmitted = false
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
      } else if (errorArray[3] === 'redeclare') {
        this.wpEvaluate(errorArray[10].split('/'))
      }
    },
    wpEvaluate (errorPath) {
      //  gets the path of the file calling the error and parses out theme or plugin
      for (let e = 0; e < errorPath.length; e++) {
        if (errorPath[e] === 'themes') {
          this.wp.themePlug = 'Theme'
        } else if (errorPath[e] === 'plugins') {
          this.wp.themePlug = 'Plugin'
        } else if (errorPath[e] === 'wp-admin') {
          this.wp.themePlug = 'Deprecated WP Function - out of date theme or plugin'
        }
      }
    },
    errorFormSubmit (event) {
      let errorText = document.getElementById('error-field')
      let splitError = errorText.value.split(' ')
      if (splitError[0] + ' ' + splitError[1] === 'Fatal error:' || splitError[0] === 'Warning:' && !splitError[1] === 'Unknown:' && !splitError[1] === 'session_start():') {
        this.resetForm()
        this.wpError(splitError)
        this.wordpress = true
      } else if (splitError[5] === 'URL' && (splitError[16] === '404' || splitError[17] === '404')) {
        this.notFoundEvent()
      } else if (splitError[0] === 'Forbidden') {
        this.forbiddenEvent()
      } else if (splitError[0] + ' ' + splitError[1] + ' ' + splitError[2] === 'Internal Server Error') {
        this.iseEvent()
      } else if (splitError[1] === 'Unknown:') {
        this.tmpEvent(splitError[2].split('/'))
      } else if (splitError[1] === 'session_start():') {
        this.tmpEvent(splitError[4])
      } else {
        this.unknownEvent()
      }
      this.searchReset()
    },
    searchReset () {
      document.getElementById('error-field').value = ''
    },
    notFoundEvent () {
      this.resetForm()
      this.common = true
      this.commonErr.errorType = '404 Not Found'
      this.commonErr.causeOne = 'This is a configuration issue.'
      this.commonErr.causeTwo = 'This issue may be caused by the server configuration, but is usually due to a missing or broken htaccess or web.config file.'
      this.commonErr.causeThree = 'If this issue is occurring on the home page, it is possible that something more serious is happening. Review Additional Suggestions.'
      this.commonErr.solutionOne = 'Offer WPPS - if issue is related to Theme/Plugin and NOT malware/hacking'
      this.commonErr.solutionTwo = 'Offer Sucuri Website Security if there is indication of malware/hacking (see: Additional Suggestions)'
      this.commonErr.solutionThree = 'Offer Sucuri if signs of malware/hacking are found (see: Additional Suggestions)'
    },
    iseEvent () {
      this.resetForm()
      this.internalSerErr = true
      this.commonErr.errorType = '500 Internal Server Error'
      this.commonErr.causeOne = ''
      this.commonErr.causeTwo = ''
      this.commonErr.causeThree = ''
      this.commonErr.solutionOne = ''
      this.commonErr.solutionTwo = ''
      this.commonErr.solutionThree = ''
    },
    forbiddenEvent () {
      this.resetForm()
      this.common = true
      this.commonErr.errorType = '403 Forbidden'
      this.commonErr.causeOne = 'Most commonly, this is caused when no index file is present in the document root (folder) the domain points to.'
      this.commonErr.causeTwo = 'Valid file names: index.*, welcome.*, home.* and default.*(* html, php, aspx, asp, shtm, shtml, htm).'
      this.commonErr.causeThree = 'File names are case-sensitive in Linux - this means Index.html is not equal to index.html. This can, but does not always apply to Windows.'
      this.commonErr.solutionOne = 'Offer WPPS - if issue is related to Theme/Plugin and NOT malware/hacking'
      this.commonErr.solutionTwo = 'Offer Sucuri Website Security if there is indication of malware/hacking (see: Additional Suggestions)'
      this.commonErr.solutionThree = 'Offer Sucuri if signs of malware/hacking are found (see: Additional Suggestions)'
    },
    tmpEvent (tmpPath) {
      this.resetForm()
      if (tmpPath === 'session') {
        this.serverErr = true
      } else {
        for (let t = 0; t < tmpPath.length; t++) {
          if (tmpPath[t] === 'tmp') {
            this.serverErr = true
          }
        }
      }
      this.serverErrs.errorType = 'tmp folder or session issue'
      this.serverErrs.link = 'https://confluence.godaddy.com/download/attachments/20748053/phpinfo.php?version=2&modificationDate=1493746207000&api=v2&download=true'
      this.serverErrs.solutionOne = 'For all types of hosting, first check for .ini files in root, home, public_html or httdocs that define /tmp as a specific location.'
      this.serverErrs.solutionTwo = 'Disable this .ini file if it exists and have the customer test again or see if the error is resolved, if not continue to the next step.'
      this.serverErrs.solutionThree = 'First download "phpinfo.php" from the Required Scripts column and upload it to the site root directory'
      this.serverErrs.solutionFour = 'For cPanel, run a php info script and confirm that session.save_path is set to "/tmp". If not, go to a TL.'
      this.serverErrs.solutionFive = 'For Plesk run a php info script and check that session.save_path is set to "C:\\Windows\\Temp" If not, got to a TL.'
      this.serverErrs.solutionSix = 'For 4gh most likely the /tmp folder is full or missing. Take this issue to a TL.'
    },
    unknownEvent () {
      this.resetForm()
      this.unknown = true
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .mdl-list__item {
    font-size: 14px;
  }
  td.mdl-data-table__cell--non-numeric.text-right {
    text-align: right;
  }
  #suggestions-row, #suggestions-row-data {
    max-width: 400px;
  }
</style>
