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
  props: ['serverErrs']
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
