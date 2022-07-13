<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Card'
});
</script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .card {
    border: 1px solid $black;
    border-radius: $card-border-radius;
    background: $white;
    padding: $spacer-mxl;
  }
</style>
