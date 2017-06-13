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
                <div v-if='commonErrors.notFound'>
                  {{notFoundData.errorType}}
                </div>
                <div v-if='commonErrors.forbidden'>
                  {{forbiddenData.errorType}}
                </div>
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
                    <div v-if='commonErrors.notFound'>
                      {{notFoundData.causeOne}}
                    </div>
                    <div v-if='commonErrors.forbidden'>
                      {{forbiddenData.causeOne}}
                    </div>
                  </li>
                  <li>
                    <div v-if='commonErrors.notFound'>
                      {{notFoundData.causeTwo}}
                    </div>
                    <div v-if='commonErrors.forbidden'>
                      {{forbiddenData.causeTwo}}
                    </div>
                  </li>
                  <li>
                    <div v-if='commonErrors.notFound'>
                      {{notFoundData.causeThree}}
                    </div>
                    <div v-if='commonErrors.forbidden'>
                      {{forbiddenData.causeThree}}
                    </div>
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
                    <div v-if='commonErrors.notFound'>
                      {{notFoundData.solutionOne}}
                    </div>
                    <div v-if='commonErrors.forbidden'>
                      {{forbiddenData.solutionOne}}
                    </div>
                  </li>
                  <li class="web-sec">
                    <div v-if='commonErrors.notFound'>
                      {{notFoundData.solutionTwo}}
                    </div>
                    <div v-if='commonErrors.forbidden'>
                      {{forbiddenData.solutionTwo}}
                    </div>
                  </li>
                  <li>
                    <div v-if='commonErrors.notFound'>
                      {{notFoundData.solutionThree}}
                    </div>
                    <div v-if='commonErrors.forbidden'>
                      {{forbiddenData.solutionThree}}
                    </div>
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
  props: ['commonErrors'],
  data () {
    return {
      notFoundData: {
        errorType: '404 Not Found',
        causeOne: 'This is a configuration issue.',
        causeTwo: 'This issue may be caused by the server configuration, but is usually due to a missing or broken htaccess or web.config file.',
        causeThree: 'If this issue is occurring on the home page, it is possible that something more serious is happening. Review Additional Suggestions.',
        solutionOne: 'Offer WPPS for WordPress sites after verifying this is not related to malware/hacking (See: Additional Suggestions)',
        solutionTwo: 'Offer Sucuri Website Security if there is indication of malware/hacking (see: Additional Suggestions)'
      },
      forbiddenData: {
        errorType: '403 Forbidden',
        causeOne: 'Most commonly, this is caused when no index file is present in the document root (folder) the domain points to.',
        causeTwo: 'Valid file names: index.*, welcome.*, home.* and default.*(* html, php, aspx, asp, shtm, shtml, htm).',
        causeThree: 'File names are case-sensitive in Linux - this means Index.html is not equal to index.html. This can, but does not always apply to Windows.',
        solutionOne: 'Offer WPPS - if issue is related to Theme/Plugin and NOT malware/hacking',
        solutionTwo: 'Offer Sucuri Website Security if there is indication of malware/hacking (see: Additional Suggestions)'
      }
    }
  }
}
</script>

<style lang="css">
  .more-serious {
    color: red;
  }
</style>
