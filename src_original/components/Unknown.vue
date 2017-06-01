<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--10-col mdl-cell--1-offset">
      <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp full-width">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Error</th>
            <th class="mdl-data-table__cell--non-numeric">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class='mdl-data-table__cell--non-numeric'>
              <h3>This error is not currently recognized</h3>
              <h5>Please submit this error via email to <a id="mail-error" href="mailto:none@email.com"><i class="material-icons">mail_outline</i>This Person</a></h5>
            </td>
            <td class='mdl-data-table__cell--non-numeric'>
              <ul class='mdl-list'>
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content">
                    <h4>Provide a description including:</h4>
                  </span>
                </li>
                <li class="mdl-list__item">
                  <i class="material-icons">star</i>
                  <span class="mdl-list__item-primary-content">
                    Domain name or URL where the error can be viewed
                  </span>
                </li>
                <li class="mdl-list__item mdl-list__item--two-line">
                  <i class="material-icons">star</i>
                  <span class="mdl-list__item-primary-content">
                    <span>A screenshot if possible</span>
                    <span class="mdl-list__item-sub-title">
                      (Ctrl + Print Screen, then Ctrl + V to paste)
                    </span>
                  </span>
                </li>
                <li class="mdl-list__item mdl-list__item--two-line">
                  <i class="material-icons">star</i>
                  <span class="mdl-list__item-primary-content">
                    <span>Type of application</span>
                    <span class="mdl-list__item-sub-title">
                      (WordPress, Joomla, custom app, etc.)
                    </span>
                  </span>
                </li>
                <li class="mdl-list__item mdl-list__item--two-line">
                  <i class="material-icons">star</i>
                  <span class="mdl-list__item-primary-content">
                    <span>Type of hosting</span>
                    <span class="mdl-list__item-sub-title">
                      (cPanel Shared vs. cPanel server, Vertigo/Legacy server, etc.)
                    </span>
                  </span>
                </li>
                <li class="mdl-list__item mdl-list__item--two-line">
                  <i class="material-icons">star</i>
                  <span class="mdl-list__item-primary-content">
                    <span>Steps to reproduce error</span>
                    <span class="mdl-list__item-sub-title">
                      (click on this, type this, etc.)
                    </span>
                  </span>
                </li>
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
