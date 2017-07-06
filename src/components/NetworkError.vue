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
                <div v-if='networkErrors.connection'>
                  {{connectionData.errorType}}
                </div>
                <div v-if='networkErrors.dns'>
                  {{dnsData.errorType}}
                </div>
                <div v-if='networkErrors.ssl'>
                  {{sslData.errorType}}
                </div>
                <div v-if='networkErrors.redirects'>
                  {{redirectData.errorType}}
                </div>
                <div v-if='networkErrors.timeout'>
                  {{timeoutData.errorType}}
                </div>
              </div>
            </td>
            <td>
              <div v-if='networkErrors.connection'>
                {{connectionData.description}}
              </div>
              <div v-if='networkErrors.dns'>
                {{dnsData.description}}
              </div>
              <div v-if='networkErrors.ssl'>
                {{sslData.description}}
              </div>
              <div v-if='networkErrors.redirects'>
                {{redirectData.description}}
              </div>
              <div v-if='networkErrors.timeout'>
                {{timeoutData.description}}
              </div>
            </td>
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
                    <div v-if='networkErrors.connection'>
                      <i class="material-icons">build</i>
                      {{connectionData.solutionOne}} <a v-bind:href='connectionData.helpLink' v-if='connectionData.helpLinkBool'>Common Config</a>
                    </div>
                    <div v-if='networkErrors.dns'>
                      <i class="material-icons">build</i>
                      {{dnsData.solutionOne}} <a v-bind:href='dnsData.helpLink' v-if='dnsData.helpLinkBool'>Common Config</a>
                    </div>
                    <div v-if='networkErrors.ssl'>
                      <i class="material-icons">build</i>
                      {{sslData.solutionOne}} <a v-bind:href='sslData.helpLink' v-if='sslData.helpLinkBool'>Common Config</a>
                    </div>
                    <div v-if='networkErrors.redirects'>
                      <i class="material-icons">build</i>
                      {{redirectData.solutionOne}}
                    </div>
                    <div v-if='networkErrors.timeout'>
                      <i class="material-icons">build</i>
                      {{timeoutData.solutionOne}}
                    </div>
                  </li>
                  <li>
                    <div v-if='networkErrors.connection'>
                      <i class="material-icons">build</i>
                      {{connectionData.solutionTwo}}
                    </div>
                    <div v-if='networkErrors.dns'>
                      <i class="material-icons">build</i>
                      {{dnsData.solutionTwo}}  <a v-bind:href='dnsData.helpLink' target='_blank'>FetchDNS</a>
                    </div>
                    <div v-if='networkErrors.ssl'>
                      <i class="material-icons">build</i>
                      {{sslData.solutionTwo}}
                    </div>
                  </li>
                  <li>
                    <div v-if='networkErrors.connection'>
                      <i class="material-icons">build</i>
                      {{connectionData.solutionThree}}
                    </div>
                    <div v-if='networkErrors.dns'>
                      <i class="material-icons">build</i>
                      {{dnsData.solutionThree}}
                    </div>
                    <div v-if='networkErrors.ssl'>
                      <i class="material-icons">build</i>
                      {{sslData.solutionThree}}
                    </div>
                  </li>
                  <li>
                    <div v-if='networkErrors.connection'>
                      <i class="material-icons">build</i>
                      {{connectionData.solutionFour}}
                    </div>
                    <div v-if='networkErrors.dns'>
                      <i class="material-icons">build</i>
                      {{dnsData.solutionFour}}
                    </div>
                    <div v-if='networkErrors.ssl'>
                      <i class="material-icons">build</i>
                      {{sslData.solutionFour}}
                    </div>
                  </li>
                  <li>
                    <div v-if='networkErrors.connection'>
                      <i class="material-icons">build</i>
                      {{connectionData.solutionFive}}
                    </div>
                    <div v-if='networkErrors.dns'>
                      <i class="material-icons">build</i>
                      {{dnsData.solutionFive}}
                    </div>
                    <div v-if='networkErrors.ssl'>
                      <i class="material-icons">build</i>
                      {{sslData.solutionFive}}
                    </div>
                  </li>
                  <li>
                    <div v-if='networkErrors.connection'>
                      <i class="material-icons">build</i>
                      {{connectionData.solutionSix}}
                    </div>
                    <div v-if='networkErrors.dns'>
                      <i class="material-icons">build</i>
                      {{dnsData.solutionSix}}
                    </div>
                    <div v-if='networkErrors.ssl'>
                      <i class="material-icons">build</i>
                      {{sslData.solutionSix}}
                    </div>
                  </li>
                </ul>
              </div>
            </td>
            <td id="script-column">
              <p>
                <div v-if='networkErrors.connection'>
                  <a v-bind:href='connectionData.link'><i class='material-icons'>get_app</i></a>
                  <a v-bind:href='connectionData.scriptLink' id='download-script'>Required Script</a>
                </div>
                <div v-if='networkErrors.ssl'>
                  <a v-bind:href='sslData.link'><i class='material-icons'>get_app</i></a>
                  <a v-bind:href='sslData.scriptLink' id='download-script'>Required Script</a>
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
                    <li>If the issue was not resolved above and has been isolated to the application, this is likely a coding error.</li>
                    <li>The customer's application is probably trying to use the connection folder by hard-coding the location in their app to the wrong location.</li>
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
  props: ['networkErrors'],
  data () {
    return {
      connectionData: {
        errorType: 'Connection Refused',
        description: 'Network Related Connection Error',
        scriptLink: '',
        helpLinkBool: '',
        helpLink: '',
        solutionOne: 'This page is a work in progress!',
        solutionTwo: '',
        solutionThree: '',
        solutionFour: '',
        solutionFive: '',
        solutionSix: ''
      },
      dnsData: {
        errorType: 'DNS Resolution',
        description: 'DNS is improperly configured or cannot be resolved.',
        scriptLink: '',
        helpLinkBool: '',
        helpLink: 'http://dns.beardof.red',
        solutionOne: 'First, check that the domain in the address bar did not redirect before giving the error (exa. google.com -> WWW.google.com)',
        solutionTwo: 'Check the DNS using a remote DNS tool: ',
        solutionThree: 'Sorry, this is a work in progress!',
        solutionFour: '',
        solutionFive: '',
        solutionSix: ''
      },
      sslData: {
        errorType: 'SSL Configuration',
        description: 'SSL is not installed or improperly configured.',
        scriptLink: '',
        helpLinkBool: '',
        helpLink: '',
        solutionOne: 'Sorry, this is a work in progress!',
        solutionTwo: '',
        solutionThree: '',
        solutionFour: '',
        solutionFive: '',
        solutionSix: ''
      },
      redirectData: {
        errorType: 'Too Many Redirects',
        description: 'Caused by too many concurrent redirects, usually due to incorrect forward or hosting settings.',
        scriptLink: '',
        helpLinkBool: '',
        helpLink: '',
        solutionOne: 'Sorry, this is a work in progress!',
        solutionTwo: '',
        solutionThree: '',
        solutionFour: '',
        solutionFive: '',
        solutionSix: ''
      },
      timeoutData: {
        errorType: 'Network Connection Timed Out',
        description: 'Can be caused by local network, ISP or GoDaddy network issues.',
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
</style>
