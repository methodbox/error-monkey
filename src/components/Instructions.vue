<template>
  <div id="instructions">
    <h4>Instructions</h4>
    <h5>How to Use This App</h5>
    <p class="read-carefully">Cut and paste your error <span>directly</span> from your browser</p>
    <p>Your results will provide you valuable info:</p>
    <ul class="list-circle">
      <li>A simple description of what the error means</li>
      <li>In most cases, a list of the most common causes</li>
      <li>In all cases, a list of steps to follow for Solutions</li>
      <li>A set of Additional Suggestions if the Solutions are not enough</li>
    </ul>
    <p>Please submit unrecognized errors when prompted to do so.</p>
    <p>This will help improve this app to make it more useful for you!</p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
  .read-carefully {
    font-style: italic;
    color: #ff4081;
  }
  .read-carefully > span {
    font-weight: bold;
  }
  p.read-carefully {
    margin-bottom: 8px;
  }
  ul.list-circle > li{
    list-style-type: circle;
  }
  #instructions {
    text-align: left;
  }
  #instructions > h4 {
    margin: auto;
  }
  #instructions > h5 {
    margin: 8px 0px;
  }
</style>
