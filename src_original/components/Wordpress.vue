<template>
  <!--  WordPress Error Template  -->
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col mdl-cell--2-offset">
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
                  <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">Err</span>
                  <span class="mdl-chip__text ">{{wp.wpErrorName}}</span>
                </span>
              </td>
              <td class='mdl-data-table__cell--non-numeric'>This error is always caused by a problem with the application.</td>
            </tr>
            <tr>
              <td class='mdl-data-table__cell--non-numeric text-right'>
                <span class="mdl-chip mdl-chip--contact">
                  <span class="mdl-chip__contact mdl-color--orange mdl-color-text--white">C</span>
                  <span class="mdl-chip__text">Caused by Theme or Plugin</span>
                </span>
              </td>
              <td class='mdl-data-table__cell--non-numeric'>{{wp.themePlug}}</td>
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
                      Offer WPPS - if issue is related to Theme/Plugin and NOT malware/hacking
                    </span>
                  </li>
                  <li class="mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                      Offer Sucuri Website Security if there is indication of malware/hacking (see: Additional Suggestions)
                    </span>
                  </li>
                  <li class="mdl-list__item">
                    <span class="mdl-list__item-primary-content more-serious">
                      If there is indication of malware/hacking AND Theme/Plugin errors offer Sucuri Website Security and WPPS
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class='mdl-data-table__cell--non-numeric'>
                Additional Suggestions:
                <ul>
                  <li>Refer them to their developer</li>
                  <li>Suggest running updates, if possible</li>
                  <li>Refer to the theme or plugin developer</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
  button#error-submit-button {
    margin-left: 20px;
    margin-top: 14px;
  }
</style>
