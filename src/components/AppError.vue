  <template>
  <!--  Application Error Template  -->
  <div class="row">
    <div class="col s10 offset-s1">
      <table class="bordered highlight">
        <thead>
          <tr>
            <th>Error</th>
            <th>Description</th>
            <th v-if='wp.wpPhpLimits.memory'>Required Script</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="chip">
                <span class="chip-label red accent-3">E</span>
                {{wp.errorName}}
              </div>
            </td>
            <td v-if='wp.wpBool'>{{wordpress.description}}</td>
            <td v-if='wp.wpPhpLimits.memory'></td><!-- spacer -->
          </tr>
          <tr>
            <td>
              <div class="chip">
                <span class="chip-label orange accent-3">C</span>
                <span v-if='wp.wpBool'>{{wordpress.cause}}</span>
              </div>
            </td>
            <td>
              <span v-if='wp.theme'>{{wordpress.theme}}</span>
              <span v-if='wp.plugin'>{{wordpress.plugin}}</span>
              <span v-if='wp.themePlug'>{{wordpress.themePlug}}</span>
            </td>
            <td v-if='wp.wpPhpLimits.memory'></td>
          </tr>
          <tr v-if='wp.wpPhpLimits.memory'>
            <td>
              <div class="chip">
                <span class="chip-label yellow accent-3">C</span>
                PHP Memory Limit
              </div>
            </td>
            <td>The application requires a higher limit of PHP Memory.</td>
            <td v-if='wp.wpPhpLimits.memory'></td>
          </tr>
          <tr>
            <td>
              <div class="chip">
                <span class="chip-label deep-purple">S</span>
                Recommended Solution
              </div>
            </td>
            <td class="row">
              <div class="col s12 table-data-row">
                <ul v-if='wp.wpPhpLimits.memory' id="wp-memory" >
                  <li>
                    <h4>Troubleshooting</h4>
                  </li>
                  <li>
                    <i class="material-icons">build</i>
                    Check for php.ini, php5.ini, or .user.ini files in the site's directory or hosting root directory.
                  </li>
                  <li>
                    <i class="material-icons">build</i>
                    Advise the customer they can make this change using the applicable "ini" file, or that this may be the cause.
                  </li>
                  <li>
                    <i class="material-icons">build</i>
                    If they already have an "ini" file, run a php info script to be sure it's taking effect.
                  </li>
                  <li>
                    <i class="material-icons">build</i>
                    If the limit listed in their file is displayed in php info, continue to Offer Services.
                  </li>
                </ul>
                <ul>
                  <li>
                    <h4>Offer Services</h4>
                  </li>
                  <li>
                    Offer <span class="wpps">WPPS</span> - if issue is related to Theme/Plugin and NOT malware/hacking
                  </li>
                  <li>
                    Offer <span class="web-sec">Sucuri Website Security</span> if there is indication of <span class="more-serious">malware/hacking</span> (see: Additional Suggestions)
                  </li>
                  <li>
                    If there is indication of malware/hacking AND Theme/Plugin errors offer <span class="web-sec">Sucuri Website Security</span> and <span class="wpps">WPPS</span>
                  </li>
                </ul>
              </div>
            </td>
            <td v-if='wp.wpPhpLimits.memory'>
              <p>
                <div>
                  <a href='https://confluence.godaddy.com/download/attachments/20748053/phpinfo.php?version=2&modificationDate=1493746207000&api=v2&download=true'><i class='material-icons'>get_app</i></a>
                  <a href='https://confluence.godaddy.com/download/attachments/20748053/phpinfo.php?version=2&modificationDate=1493746207000&api=v2&download=true' id='download-script'>Required Script</a>
                </div>
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
                    <li>Refer them to their developer</li>
                    <li>Suggest running updates, if possible</li>
                    <li>Refer to the theme or plugin developer</li>
                    <li>Advise them WordPress.org provides guidance.</li>
                    <br>
                    <li>Look for signs of <span class='more-serious'>malware and hacking</span></li>
                    <div class="li-padding">
                      <li>Suspicious or odd file names</li>
                      <li>Excessive folders and files (exa. folder w/hundreds of html files with common brand names)</li>
                      <li>Review htaccess or web.config for references to odd file names</li>
                      <li>Review htaccess or web.config for references to odd domain names</li>
                    </div>
                  </ul>
                </td>
              </div>
            </div>
            <td wp.wpPhpLimits.memory></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['wp', 'syntax'], //  import our WP props from the main App.vue
    data () {
      return {
        wordpress: {
          theme: 'Theme',
          plugin: 'Plugin',
          themePlug: 'Theme or Plugin',
          app: 'WP Core Application',
          cause: 'Caused by Theme or Plugin:',
          description: 'This error is always caused by a problem with the application.',
          scriptLink: '',
          helpLinkBool: '',
          helpLink: '',
          solutionOne: 'Sorry, this is a work in progress!',
          solutionTwo: '',
          solutionThree: '',
          solutionFour: '',
          solutionFive: '',
          solutionSix: ''
        }
      }
    }
  }
</script>

<style lang="css">
  .full-width {
    width: 80%;
  }
  .more-serious {
    color: red;
  }
  #wp-memory {
    margin-bottom: 30px;
  }
</style>
