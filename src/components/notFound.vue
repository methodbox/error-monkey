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
                <span class="mdl-chip__text ">404 Not Found</span>
              </span>
            </td>
            <td class='mdl-data-table__cell--non-numeric'>This is a configuration issue.</td>
          </tr>
          <tr>
            <td class='mdl-data-table__cell--non-numeric'>
              <span class="mdl-chip mdl-chip--contact">
                <span class="mdl-chip__contact mdl-color--purple mdl-color-text--white">C</span>
                <span class="mdl-chip__text">Common Causes</span>
              </span>
            </td>
            <td class='mdl-data-table__cell--non-numeric'>
              <ul class='mdl-list'>
                <li class="mdl-list__item mdl-list__item--two-line">
                  <span class="mdl-list__item-primary-content">
                    <span>Multiple Causes</span>
                    <span class="mdl-list__item-sub-title">
                      This issue may be caused by the server configuration, but is usually due to a missing or broken htaccess or web.config file.
                    </span>
                    <span class="mdl-list__item-sub-title">
                      If this issue is occurring on the home page, it is possible that something more serious is happening. Review Additional Suggestions.
                    </span>
                    <span class="mdl-list__item-sub-title">
                      If the issue also references a 403 error, this site may be missing a file that is being called.
                    </span>
                  </span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class='mdl-data-table__cell--non-numeric'>
              <span class="mdl-chip mdl-chip--contact">
                <span class="mdl-chip__contact mdl-color--purple mdl-color-text--white">S</span>
                <span class="mdl-chip__text">Recommended Solution</span>
              </span>
            </td>
            <td class='mdl-data-table__cell--non-numeric'>
              <ul class='mdl-list'>
                <li class="mdl-list__item mdl-list__item--two-line">
                  <span class="mdl-list__item-primary-content">
                    <span>Offer Services</span>
                    <span class="mdl-list__item-sub-title">
                      WPPS
                    </span>
                    <span class="mdl-list__item-sub-title">
                      Expert Service
                    </span>
                  </span>
                </li>
              </ul>
            </td>
          </tr>
          <tr id='suggestions-row'>
            <td class='mdl-data-table__cell--non-numeric' id="suggestions-row-data">
              Additional Suggestions:
              <ul>
                <li>Review the files to be sure an index file is found</li>
                <li>Look for signs of malware and hacking
                  <ul>
                    <li>Suspicious or odd file names</li>
                    <li>Review htaccess or web.config for references to odd file names</li>
                    <li>Review htaccess or web.config for references to odd domain names</li>
                  </ul>
                </li>
                <li>Refer them to their developer</li>
                <li>Advise them WordPress.org provides the default htaccess and web.config code.</li>
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
  props: ['notFound']
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

  #suggestions-row, #suggestions-row-data {
    max-width: 400px;
  }
</style>
