<template>
  <div class="row">
    <div class="col s10 offset-s1">
      <table class="bordered highlight">
        <thead>
          <tr>
            <th>Error</th>
            <th>Description</th>
            <th>Required Script</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="td-chip">
              <div class="chip">
                <span class="chip-label red accent-3">E</span>
                {{serverErrs.errorType}}
              </div>
            </td>
            <td>{{serverErrs.description}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="td-chip">
              <div class="chip">
                <span class="chip-label deep-purple">S</span>
                Recommended Solution
              </div>
            </td>
            <td class='row'>
              <div class="col s12 table-data-row">
                <ul>
                  <li>
                    <h4>Troubleshooting</h4>
                  </li>
                  <li>
                    <i class="material-icons">build</i>
                    {{serverErrs.solutionOne}} <a v-bind:href='serverErrs.helpLink' v-if='serverErrs.helpLinkBool'>Common Config</a>
                  </li>
                  <li>
                    <i class="material-icons">build</i>
                    {{serverErrs.solutionTwo}}
                  </li>
                  <li>
                    <i class="material-icons">build</i>
                    {{serverErrs.solutionThree}}
                  </li>
                  <li>
                    <i class="material-icons">build</i>
                    {{serverErrs.solutionFour}}
                  </li>
                  <li>
                    <i class="material-icons">build</i>
                    {{serverErrs.solutionFive}}
                  </li>
                  <li>
                    <i class="material-icons">build</i>
                    {{serverErrs.solutionSix}}
                  </li>
                </ul>
              </div>
            </td>
            <td id="script-column">
              <p>
                <a v-bind:href='serverErrs.link'><i class='material-icons'>get_app</i></a>
                <a v-bind:href='serverErrs.scriptLink' id='download-script'>Required Script</a>
              </p>
            </td>
          </tr>
          <tr>
            <td></td>
            <div class="col s12">
              <div class="suggestions-list">
                <td>
                  <h5>Additional Suggestions:</h5>
                  <ul>
                    <li>If the issue was not resolved above and has been isolated to the application, this is likely a coding error.</li>
                    <li>The customer's application is probably trying to use the tmp folder by hard-coding the location in their app to the wrong location.</li>
                    <li>If this is a <span class="wp">WordPress</span> site, we can offer <span class="wpps">WPPS</span> at this point.</li>
                  </ul>
                </td>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['serverErrs'],
  data () {
    return {
      tmpData: {
        errorType: 'tmp folder or session issue',
        description: 'This error is usually a problem on the server.  It is likely this will need to go to a Tech Lead',
        link: 'https://confluence.godaddy.com/download/attachments/20748053/phpinfo.php?version=2&modificationDate=1493746207000&api=v2&download=true',
        helpLinkBool: false,
        solutionOne: 'All hosting: check for .ini files in root, home, public_html or httdocs that define /tmp as a specific location',
        solutionTwo: 'Disable any .ini file and have the customer test again, continue to the next step if not resolved',
        solutionThree: 'First download "phpinfo.php" from the Required Scripts column and upload it to the site root directory',
        solutionFour: 'cPanel: Visit domain.com/phpinfo.php. Verify session.save_path is set to "/tmp". If not, go to a TL',
        solutionFive: 'Plesk: Visit domain.com/phpinfo.php. Verify session.save_path is set to "C:\\Windows\\Temp" If not, got to a TL',
        solutionSix: 'For 4gh most likely the /tmp folder is full or missing. Take this issue to a TL'
      },
      databaseData: {
        errorType: 'Database connection',
        description: 'Something has prevented the application from connecting to the database. This can be an application or server issue.',
        scriptLink: 'https://confluence.godaddy.com/download/attachments/20748053/mysql.php?version=3&modificationDate=1434049926000&api=v2&download=true',
        helpLinkBool: true,
        helpLink: 'https://www.godaddy.com/help/what-are-the-connection-strings-for-my-applications-database-5199',
        solutionOne: 'First make sure the DB exists. Ask the customer for the DB name. Or find it in the config file: ',
        solutionTwo: 'If this is cPanel or Plesk, make sure there is a user assigned to the database.',
        solutionThree: 'Try to access the DB via PHPMyAdmin - if this is accessible, then the app should be able to connect, too.',
        solutionFour: 'Use the script from Required Scripts column to test the connection w/your own user/password.',
        solutionFive: 'If neither PHPMyAdmin or your test script can connect to the database, take this issue to a Tech Lead',
        solutionSix: 'If your test script worked and this IS a WordPress site offer WPPS.'
      },
      fiveHundredData: {
        errorType: '500 Internal Server Error',
        description: 'This error is generic and means the application had a problem, but may be related to a problem on the server.',
        link: 'http://localhost:3000',
        helpLinkBool: false,
        solutionOne: 'If this is a PHP-based site (check for index.php), trying running a test script. You can download one from the Required Script column.',
        solutionTwo: 'If your test script also produces a 500 or ISE error, try disabling the .htaccess file. If the error still occurs, take this to a Tech Lead.',
        solutionThree: 'If your test script worked and this is not a WordPress site, the customer or their developer will need to address the issue on their own.',
        solutionFour: 'If your test script worked and this IS a WordPress site, this issue is caused by WP or a theme or plugin. Offer WPPS.',
        solutionFive: '',
        solutionSix: ''
      }
    }
  }
}
</script>

<style>
  .hand {
    color: green;
  }

  .face {
    color: gold;
  }

  .face-inner {
    color: grey;
  }
  #download-script {
    margin-left: 6px;
    color: rgb(255,64,129);
  }
  #script-column {
    min-width: 160px;
  }
</style>
