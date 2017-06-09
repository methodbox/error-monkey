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
            <common-errors v-bind:commonErrors='commonErrors'></common-errors>
          </div>
        </div>
        <div class="row" v-if='serverErr'>
          <div class="col s12">
            <server-errors v-bind:serverErrs='serverErrs'></server-errors>
          </div>
        </div>
        <div class="row" v-if='unknown'>
          <div class="col s12">
            <unknown></unknown>
          </div>
        </div>
        <div class="row" v-if='testView'>
          <div class="col s12">
            <test v-bind:test='test'></test>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Wordpress from './components/Wordpress'
import Unknown from './components/Unknown'
import commonErrors from './components/commonErrors'
import serverErrors from './components/serverErrors'
import Instructions from './components/Instructions'
import Test from './components/Test'
export default {
  name: 'app',
  components: {
    Wordpress,
    commonErrors,
    Unknown,
    serverErrors,
    Instructions,
    Test
  },
  data () {
    return {
      nav: {
        //  conditional for displaying Instructions on-click
        instr: false
      },
      //  booleans to determine which template is rendered
      wordpress: false,
      common: false,
      testView: false,
      test: false,
      //  A short description of the error - WP & Server error templates are passed this value
      errorName: '',
      //  WP specific errors template
      wp: {
        themePlug: ''
      },
      //  common errors template
      commonErrors: {
        notFound: false,
        forbidden: false
      },
      //  unrecognized errors template
      unknown: false,
      //  server errors template
      serverErr: false,
      feedbackForm: false,
      serverErrs: {
        errorType: '',
        description: '',
        scriptLink: '',
        helpLink: '',
        helpLinkBool: false,
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
    instructionsNav () {
      if (this.nav.instr === false) {
        this.nav.instr = true
      } else {
        this.nav.instr = false
      }
    },
    resetForm () {
      this.wordpress = false
      this.common = false
      this.commonErrors.forbidden = false
      this.commonErrors.notFound = false
    },
    errorFormSubmit (event) {
      this.resetForm()
      let errorText = document.getElementById('error-field')
      let parseError = errorText.value.split(' ')
      let wpParseError = errorText.value.split('/')
      let wpFilter = wpParseError.filter(function (err) {
        if (err === 'themes' || err === 'plugins' || err === 'wp-admin') {
          return err
        }
      })
      let commonFilter = parseError.filter(function (err) {
        if (err === 'Forbidden' || err === 'Not' || err === 'Found') {
          return err
        }
      })
      let serverFilter = parseError.filter(function (err) {
        console.log(err)
      })
      //  sends to wpEvaluate to determine if the error is WP if wpFilter is not empty
      if (wpFilter.length !== 0) {
        this.wpEvaluate(wpFilter)
        this.errorName = errorText.value.substring(0, 12)
      }
      //  fires common event if commonFilter is not empty
      if (commonFilter.length !== 0) {
        this.commonEvent(commonFilter)
      }
      //  fires server error event if serverFilter is not empty
      if (serverFilter.length !== 0) {
        console.log('test')
      }
    },
    wpEvaluate (errorPath) {
      let wpError = errorPath[0]
      //  gets the path of the file calling the error and parses out theme or plugin
      if (wpError === 'themes') {
        console.log('Theme')
        this.wordpress = true
        this.wp.themePlug = 'Theme'
      } else if (wpError === 'plugins') {
        console.log('Plugins')
        this.wordpress = true
        this.wp.themePlug = 'Plugin'
      } else if (wpError === 'wp-admin') {
        console.log('Either')
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
    searchReset () {
      document.getElementById('error-field').value = ''
    },
    testEvent () {
      this.test = true
      this.testView = true
    },
    fiveHundredEvent () {
      this.resetForm()
      this.serverErrs.errorType = 'Database connection'
      this.serverErrs.description = 'Something has prevented the application from connecting to the database. This can be an application or server issue.'
      this.serverErrs.scriptLink = 'https://confluence.godaddy.com/download/attachments/20748053/mysql.php?version=3&modificationDate=1434049926000&api=v2&download=true'
      this.serverErrs.helpLinkBool = true
      this.serverErrs.helpLink = 'https://www.godaddy.com/help/what-are-the-connection-strings-for-my-applications-database-5199'
      this.serverErrs.solutionOne = 'First make sure the DB exists. Ask the customer for the DB name. Or find it in the config file: '
      this.serverErrs.solutionTwo = 'If this is cPanel or Plesk, make sure there is a user assigned to the database.'
      this.serverErrs.solutionThree = 'Try to access the DB via PHPMyAdmin - if this is accessible, then the app should be able to connect, too.'
      this.serverErrs.solutionFour = 'Use the script from Required Scripts column to test the connection w/your own user/password.'
      this.serverErrs.solutionFive = 'If neither PHPMyAdmin or your test script can connect to the database, take this issue to a Tech Lead'
      this.serverErrs.solutionSix = 'If your test script worked and this IS a WordPress site offer WPPS.'
      this.serverErr = true
    },
    iseEvent () {
      this.resetForm()
      this.serverErrs.errorType = '500 Internal Server Error'
      this.serverErrs.description = 'This error is generic and means the application had a problem, but may be related to a problem on the server.'
      this.serverErrs.link = 'http://localhost:3000'
      this.serverErrs.helpLinkBool = false
      this.serverErrs.solutionOne = 'If this is a PHP-based site (check for index.php), trying running a test script. You can download one from the Required Script column.'
      this.serverErrs.solutionTwo = 'If your test script also produces a 500 or ISE error, try disabling the .htaccess file. If the error still occurs, take this to a Tech Lead.'
      this.serverErrs.solutionThree = 'If your test script worked and this is not a WordPress site, the customer or their developer will need to address the issue on their own.'
      this.serverErrs.solutionFour = 'If your test script worked and this IS a WordPress site, this issue is caused by WP or a theme or plugin. Offer WPPS.'
      this.serverErrs.solutionFive = ''
      this.serverErrs.solutionSix = ''
      this.serverErr = true
    },
    tmpEvent (tmpPath) {
      this.resetForm()
      this.serverErrs.errorType = 'tmp folder or session issue'
      this.serverErrs.description = 'This error is usually a problem on the server.  It is likely this will need to go to a Tech Lead'
      this.serverErrs.link = 'https://confluence.godaddy.com/download/attachments/20748053/phpinfo.php?version=2&modificationDate=1493746207000&api=v2&download=true'
      this.serverErrs.helpLinkBool = false
      this.serverErrs.solutionOne = 'All hosting: check for .ini files in root, home, public_html or httdocs that define /tmp as a specific location'
      this.serverErrs.solutionTwo = 'Disable any .ini file and have the customer test again, continue to the next step if not resolved'
      this.serverErrs.solutionThree = 'First download "phpinfo.php" from the Required Scripts column and upload it to the site root directory'
      this.serverErrs.solutionFour = 'cPanel: Visit domain.com/phpinfo.php. Verify session.save_path is set to "/tmp". If not, go to a TL'
      this.serverErrs.solutionFive = 'Plesk: Visit domain.com/phpinfo.php. Verify session.save_path is set to "C:\\Windows\\Temp" If not, got to a TL'
      this.serverErrs.solutionSix = 'For 4gh most likely the /tmp folder is full or missing. Take this issue to a TL'
      if (tmpPath === 'session') {
        this.serverErr = true
      } else {
        for (let t = 0; t < tmpPath.length; t++) {
          if (tmpPath[t] === 'tmp') {
            this.serverErr = true
          }
        }
      }
    },
    unknownEvent () {
      this.resetForm()
      this.unknown = true
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
