<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TrafficLight',

  props: {
    settings: {
      type: Object,
      required: true
    }
  }
});
</script>

<template>
  <div class="traffic-light">
    <div
      class="light red"
      :class="{ active: settings.currentLight === 'RED'}"
    >
      <span> {{ settings.redCountDown }} </span>
    </div>

    <div
      class="light yellow"
      :class="{ active: settings.currentLight === 'YELLOW' }"
    >
      <span> {{ settings.yellowCountDown }} </span>
    </div>

    <div
      class="light green"
      :class="{ active: settings.currentLight === 'GREEN' }"
    >
      <span> {{ settings.greenCountDown }} </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>  
  @import '@/styles/common.scss';

  .traffic-light {
    width: 68px;
    border-radius: 8px;
    background: $black;
    padding: $spacer;

    .light {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      margin-bottom: $spacer-sm;
      opacity: 0.4;
      transition: opacity 0.2s;
      position: relative;

      span {
        transition: opacity 0.2s;
        color: $white;
        font-size: $font-size-3xl;
        position: absolute;
        right: 0;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        opacity: 0;
        visibility: hidden;
      }

      &.active {
        opacity: 1;

        span {
          opacity: 1;
          visibility: visible;
        }
      }

      &.red {
        background: $error-color;
      }

      &.yellow {
        background: $yellow;
      }

      &.green {
        background: $success-color;
        margin-bottom: 0;
      }
    }
  }
</style>
