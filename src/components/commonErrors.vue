<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col">
      <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp full-width">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Error</th>
            <th class="mdl-data-table__cell--non-numeric">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class='mdl-data-table__cell--non-numeric text-right'>
              <span class="mdl-chip mdl-chip--contact">
                <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">F</span>
                <span class="mdl-chip__text ">{{commonErr.errorType}}</span>
              </span>
            </td>
            <td class='mdl-data-table__cell--non-numeric'>This is a configuration issue.</td>
          </tr>
          <tr>
            <td class='mdl-data-table__cell--non-numeric text-right'>
              <span class="mdl-chip mdl-chip--contact">
                <span class="mdl-chip__contact mdl-color--orange mdl-color-text--white">C</span>
                <span class="mdl-chip__text">Common Causes</span>
              </span>
            </td>
            <td class='mdl-data-table__cell--non-numeric'>
              <ul class='mdl-list'>
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content">
                    <h4>Multiple Causes</h4>
                  </span>
                </li>
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content">
                    {{commonErr.causeOne}}
                  </span>
                </li>
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content">
                    {{commonErr.causeTwo}}
                  </span>
                </li>
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content">
                    {{commonErr.causeThree}}
                  </span>
                </li>
              </ul>
            </td>
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
                    <h4>Offer Services</h4>
                  </span>
                </li>
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content">
                    {{commonErr.solutionOne}}
                  </span>
                </li>
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content">
                    {{commonErr.solutionTwo}}
                  </span>
                </li>
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content more-serious">
                    {{commonErr.solutionThree}}
                  </span>
                </li>
              </ul>
            </td>
          </tr>
          <tr id='suggestions-row'>
            <td class='mdl-data-table__cell--non-numeric' id="suggestions-row-data">
              <h4>Additional Suggestions:</h4>
              <ul>
                <li>Review the files to be sure an index file is found</li>
                <li>Look for signs of <span class='more-serious'>malware and hacking</span>
                  <ul>
                    <li>Suspicious or odd file names</li>
                    <li>Review htaccess or web.config for references to odd file names</li>
                    <li>Review htaccess or web.config for references to odd domain names</li>
                  </ul>
                </li>
                <li>Refer them to their developer</li>
                <li>Advise them WordPress.org provides guidance.</li>
              </ul>
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
  .mdl-list__item-primary-content > h4 {
    line-height: 6px;
  }
</style>
