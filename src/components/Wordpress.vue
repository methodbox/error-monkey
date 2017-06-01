<template>
  <!--  WordPress Error Template  -->
  <div class="row">
    <div class="col s10 offset-s1">
      <table class="bordered highlight">
        <thead>
          <tr>
            <th>Error</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="chip">
                <span class="chip-label red accent-3">E</span>
                {{wp.wpErrorName}}
              </div>
            </td>
            <td>This error is always caused by a problem with the application.</td>
          </tr>
          <tr>
            <td>
              <div class="chip">
                <span class="chip-label orange accent-3">C</span>
                Caused by Theme or Plugin
              </div>
            </td>
            <td>{{wp.themePlug}}</td>
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['wp']
    //  import our WP props from the main App.vue
  }
</script>

<style lang="css">
  .full-width {
    width: 80%;
  }
  .more-serious {
    color: red;
  }
</style>
