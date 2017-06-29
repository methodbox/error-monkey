<template>
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
              <h4>This error is not currently recognized</h4>
            </td>
            <td>
              <h5 id="error-email">Please submit this error via email to <a id="mail-error" href="#"><i class="material-icons">mail_outline</i>fake@email.com</a></h5>
              <ul>
                <li>
                  <h6>Provide a description including:</h6>
                </li>
                <li>
                  <i class="material-icons">star</i>
                  Domain name or URL where the error can be viewed
                </li>
                <li>
                  <i class="material-icons">star</i>
                  (Ctrl + Print Screen, then Ctrl + V to paste)
                </li>
                <li>
                  <i class="material-icons">star</i>
                  (WordPress, Joomla, custom app, etc.)
                </li>
                <li>
                  <i class="material-icons">star</i>
                  (cPanel Shared vs. cPanel server, Vertigo/Legacy server, etc.)
                </li>
                <li>
                  <i class="material-icons">star</i>
                  (click on this, type this, etc.)
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
  li > i {
    padding-right: 8px;
  }
  .full-width {
    width: 100%;
  }
  #error-email {
    line-height: 2;
  }
  #mail-error {
    text-decoration: none;
    color: #ff4081;
  }
</style>
