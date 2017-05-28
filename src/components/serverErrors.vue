<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--1-offset">
      <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp full-width">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Error</th>
            <th class="mdl-data-table__cell--non-numeric">Description</th>
            <th class="mdl-data-table__cell--non-numeric">Required Script</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class='mdl-data-table__cell--non-numeric text-right'>
              <span class="mdl-chip mdl-chip--contact">
                <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">F</span>
                <span class="mdl-chip__text ">{{serverErrs.errorType}}</span>
              </span>
            </td>
            <td class='mdl-data-table__cell--non-numeric'>This error is usually a problem on the server.  It is likely this will need to go to a Tech Lead</td>
            <td></td>
          </tr>
          <tr>
            <td class='mdl-data-table__cell--non-numeric text-right'>
              <span class="mdl-chip mdl-chip--contact">
                <span class="mdl-chip__contact mdl-color--purple mdl-color-text--white">S</span>
                <span class="mdl-chip__text">Recommended Solution</span>
              </span>
            </td>
            <td class='mdl-data-table__cell--non-numeric'>
              <ul class='mdl-list'>
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content">
                    <h4>Troubleshooting</h4>
                  </span>
                </li>
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content">
                    <h5>Follow the list below until a solution is found</h5>
                  </span>
                </li>
                <li class="mdl-list__item">
                  <i class="material-icons">build</i>
                  <span class="mdl-list__item-primary-content">
                    {{serverErrs.solutionOne}}
                  </span>
                </li>
                <li class="mdl-list__item">
                  <i class="material-icons">build</i>
                  <span class="mdl-list__item-primary-content">
                    {{serverErrs.solutionTwo}}
                  </span>
                </li>
                <li class="mdl-list__item">
                  <i class="material-icons">build</i>
                  <span class="mdl-list__item-primary-content">
                    {{serverErrs.solutionThree}}
                  </span>
                </li>
                <li class="mdl-list__item">
                  <i class="material-icons">build</i>
                  <span class="mdl-list__item-primary-content">
                    {{serverErrs.solutionFour}}
                  </span>
                </li>
                <li class="mdl-list__item">
                  <i class="material-icons">build</i>
                  <span class="mdl-list__item-primary-content">
                    {{serverErrs.solutionFive}}
                  </span>
                </li>
                <li class="mdl-list__item">
                  <i class="material-icons">build</i>
                  <span class="mdl-list__item-primary-content">
                    {{serverErrs.solutionSix}}
                  </span>
                </li>
              </ul>
            </td>
            <td>
              <a v-bind:href='serverErrs.link'><i class='material-icons'>get_app</i></a>
              <a v-bind:href='serverErrs.link' id='download-script'>Approved Script</a>
            </td>
          </tr>
          <tr id='suggestions-row'>
            <td></td>
            <td class='mdl-data-table__cell--non-numeric' id="suggestions-row-data">
              <h4>Additional Suggestions:</h4>
              <ul>
                <li>If the issue was not resolved above and has been isolated to the application, this is likely a coding error.</li>
                <li>The customer's application is probably trying to use the tmp folder by hard-coding the location in their app to the wrong location.</li>
                <li id="if-wordpress-suggestion">If this is a WordPress site, we can offer WPPS at this point.</li>
              </ul>
            </td>
            <td></td>
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
  #if-wordpress-suggestion {
    color: darkorchid;
    font-weight: bold;
  }
  #download-script {
    margin-left: 6px;
  }
</style>
