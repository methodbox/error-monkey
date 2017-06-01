<template>
  <form enctype="text/plain" method="get" action="mailto:chris@methodbox.io">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" id="sample3">
      <label class="mdl-textfield__label" for="sample3">Text...</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" name="first_name" id='mail-first-name'>
      <label class="mdl-textfield__label" for="mail-first-name">First Name</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" name="last_name" id='mail-last-name'>
      <label class="mdl-textfield__label" for="mail-last-name">Last Name</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" name="subject" id='mail-subject'>
      <label class="mdl-textfield__label" for="mail-subject">Subject</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield">
      <textarea class="mdl-textfield__input" type="text" rows= "10" name="body" id="mail-body" ></textarea>
      <label class="mdl-textfield__label" for="sample5">Error and Description</label>
    </div>
  </form>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
