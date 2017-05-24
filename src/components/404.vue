<template>
  <!--  404 server error template  -->
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--1-offset">
      <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp full-width">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Error</th>
            <th class="mdl-data-table__cell--non-numeric">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="mdl-data-table__cell--non-numeric">
              <span class="mdl-chip mdl-chip--contact">
                <span class="mdl-chip__contact mdl-color--red mdl-color-text--white">F</span>
                <span class="mdl-chip__text ">{{serverErrorType}}</span>
              </span>
            </td>
            <td class='mdl-data-table__cell--non-numeric'>This error is always caused by a problem with the application.</td>
          </tr>
          <tr>
            <td class='mdl-data-table__cell--non-numeric'>
              <span class="mdl-chip mdl-chip--contact">
                <span class="mdl-chip__contact mdl-color--purple mdl-color-text--white">C</span>
                <span class="mdl-chip__text">Caused by Application or Server Config</span>
              </span>
            </td>
            <td class='mdl-data-table__cell--non-numeric'>
              <ul class='mdl-list'>
                <li class="mdl-list__item mdl-list__item--two-line">
                  <span class="mdl-list__item-primary-content">
                    <span>Recommended Solution(s)</span>
                    <span class="mdl-list__item-sub-title">
                      This issue may be caused by the server configuration, but is usually due to a missing or broken htaccess file.
                    </span>
                    <span class="mdl-list__item-sub-title">
                      Sell WPPS or Expert Service
                    </span>
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
                <li>Advise them WordPress.org provides the default htaccess code.</li>
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
  data () {
    return {
      serverErrorType: '404 Not Found'
    }
  }
}
</script>

<style lang="css">
  .full-width {
    width: 100%;
  }
  #mail-error {
    text-decoration: none;
  }
  li > i {
    padding-right: 8px;
  }

  ul.mdl-list {
    border-left: 1px solid rgb(255,64,129);
  }
</style>
