<template>
  <!--  commonErrors template  -->
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
                {{commonErr.errorType}}
              </div>
            </td>
            <td>This is a configuration issue.</td>
          </tr>
          <tr>
            <td>
              <div class="chip">
                <span class="chip-label orange accent-3">C</span>
                Common Causes
              </div>
            </td>
            <td class='row'>
              <div class="col s12 table-data-row">
                <ul>
                  <li>
                    <h4>Multiple Causes</h4>
                  </li>
                  <li>
                    {{commonErr.causeOne}}
                  </li>
                  <li>
                    {{commonErr.causeTwo}}
                  </li>
                  <li>
                    {{commonErr.causeThree}}
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="chip">
                <span class="chip-label deep-purple">S</span>
                Recommended Solution
              </div>
            </td>
            <td class='row'>
              <div class="col s12 table-data-row">
                <ul>
                  <li>
                    <h4>Offer Services</h4>
                  </li>
                  <li class="wpps">
                    {{commonErr.solutionOne}}
                  </li>
                  <li class="web-sec">
                    {{commonErr.solutionTwo}}
                  </li>
                  <li>
                    {{commonErr.solutionThree}}
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div class="col s12">
                <div class="suggestions-list">
                  <h5>Additional Suggestions:</h5>
                  <ul>
                    <li>Review the files to be sure an index file is found</li>
                    <li>Refer them to their developer</li>
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
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commonErr']
}
</script>

<style lang="css">
  .more-serious {
    color: red;
  }
</style>
