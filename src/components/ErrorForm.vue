<template>
  <form v-on:submit.prevent="errorSubPrevent" autocomplete="">
    <div class="row" id='error-field-row'>
      <div class="col s5 offset-s3">
        <div class="input-field full-width">
          <input type="text" name="Test Field" id="error-field" v-on:click="searchRes">
          <label for="error-field">Enter the Error</label>
        </div>
      </div>
      <div class="col s2 button-spacing">
        <button class="waves-effect waves-light btn pink accent-2" id="submit-button" type="button" v-on:click="errorSub">
          Fix Me
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    errorSubPrevent () {
      this.$emit('errorPreventEmit')
    },
    errorSub () {
      this.$emit('errorSubEmit')
    },
    searchRes () {
      this.$emit('searchResEmit')
    }
  }
}
</script>

<style lang="css">
</style>
