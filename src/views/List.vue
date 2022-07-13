<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { getTrafficLightStatus } from '@/services'
import Card from '@/components/Card.vue'
import Title from '@/components/Title.vue'
import EmptyList from '@/components/EmptyList.vue'
import CreateModal from '@/views/CreateModal.vue'
import DeleteModal from '@/views/DeleteModal.vue'
import TrafficLight from '@/components/TrafficLight.vue'
import IndexDisc from '@/components/indexDisc.vue'
import Loader from '@/components/Loader.vue'
import ApiFailureMessage from '@/components/ApiFailureMessage.vue'
import Button from '@/components/Button.vue'
import InlineHint from '@/components/InlineHint.vue'

export default Vue.extend({
  name: 'List',

  components: {
    'wrapper-card': Card,
    'card-title': Title,
    'empty-list': EmptyList,
    'create-modal': CreateModal,
    'delete-modal': DeleteModal,
    'traffic-light': TrafficLight,
    'index-disc': IndexDisc,
    'api-failure-message': ApiFailureMessage,
    'action-button': Button,
    'inline-hint': InlineHint,
    Loader
  },

  data () {
    return {
      list: [],
      isGetError: false,
      settings: {
        currentLight: '',
        previousLight: '',
        redTimer: 1000,
        redCountDown: null,
        yellowTimer: 500,
        yellowCountDown: null,
        greenTimer: 1500,
        greenCountDown: null
      },
      showStatus: false,
      isSuccess: false
    }
  },

  computed: {
    ...mapGetters(['isLoading', 'currentList'])
  },

  methods: {
    async loadContent () {
      await this.$store.dispatch('loadContent').then(() => {
        this.$data.isGetError = false;
        this.$data.list = this.currentList ? [ ...this.currentList ] : [];
      }).catch((error: Error) => {
        console.error('GET API failed to retrieve the traffic light list.', error);
        this.$data.isGetError = true;
      }).finally(() =>{
        this.activateRed();
      });
    },

    activateRed () {
      this.$data.settings.currentLight = 'RED';
      this.$data.settings.redCountDown = this.$data.settings.redTimer / 100;

      let newRedTimer = setInterval(() => {
        this.$data.settings.redCountDown--;

        if (this.$data.settings.redCountDown <= 0) {
          clearInterval(newRedTimer);
          this.$data.settings.previousLight = 'RED';
          this.activateYellow();
        }
      }, this.$data.settings.redTimer);
    },

    activateYellow () {
      this.$data.settings.currentLight = 'YELLOW';
      this.$data.settings.yellowCountDown = this.$data.settings.yellowTimer / 100;

      let newYellowTimer = setInterval(() => {
        this.$data.settings.yellowCountDown--;

        if (this.$data.settings.yellowCountDown <= 0) {
          clearInterval(newYellowTimer);

          if (this.$data.settings.previousLight === 'RED') {
            this.getCurrentStatus();
          } else if (this.$data.settings.previousLight === 'GREEN') {
            this.activateRed();
          }
        }
      }, this.$data.settings.yellowTimer);
    },

    activateGreen () {
      this.$data.settings.currentLight = 'GREEN';
      this.$data.settings.greenCountDown = this.$data.settings.greenTimer / 100;

      let newGreenTimer = setInterval(() => {
        this.$data.settings.greenCountDown--;

        if (this.$data.settings.greenCountDown <= 0) {
          clearInterval(newGreenTimer);
          this.$data.settings.previousLight = 'GREEN';
          this.activateYellow();
        }
      }, this.$data.settings.greenTimer);
    },

    async getCurrentStatus (checkStatus?: string) {
      const currentCode = this.$route.query && this.$route.query.code ? this.$route.query.code as string : '' as string;

      await getTrafficLightStatus(currentCode).then(() => {
        this.activateGreen();
        this.$data.isSuccess = true;
      }).catch(() => {
        this.activateRed();
        this.$data.isSuccess = false;
      }).finally(() => {
        if (checkStatus) {
          this.$data.showStatus = true;

          setTimeout(() => {
            this.$data.showStatus = false;
            this.$data.isSuccess = false;
          }, 3000);
        }
      })
    }
  },

  created () {
    this.loadContent();
  }
});
</script>

<template>
  <wrapper-card class="list">

    <!-- Header section -->
    <card-title class="align-items justify-space-bewteen">

      <!-- Title section -->
      <div class="left-panel align-items">
        <i class="icon icon-settings" />
        Traffic light dashboard
      </div>

      <div
        class="right-panel align-items"
        v-if="list.length && !isLoading && !isGetError"
      >

        <!-- Notification message for manula status check -->
        <inline-hint
          :isSuccess="isSuccess"
          :isError="!isSuccess"
          v-if="showStatus"
        >
          <span class="bold-text"> {{ isSuccess ? 'Working fine - 200' : 'Error occured - 404' }} </span>
        </inline-hint>

        <!-- Manual status check button -->
        <action-button
          isBlueButton
          @click="getCurrentStatus('checkStatus')"
        >
          <i class="icon icon-Union1" />
          Status check
        </action-button>

        <!-- Add new section when list is NOT empty -->
        <create-modal @reloadPage="loadContent" />
      </div>
    </card-title>

    <!-- Body section -->
    <div class="card-body">
      
      <!-- Error message: when getter failed to retrieve the list -->
      <api-failure-message v-if="!isLoading && isGetError" />

      <!-- Add new section when list empty -->
      <empty-list
        :title="`Start adding your first traffic light..!!`"
        v-if="!list.length && !isLoading && !isGetError"
      >
        <template v-slot:content>
          <create-modal
            isLargeButton
            @reloadPage="loadContent"
          />
        </template>
      </empty-list>

      <!-- Trafic lights list -->
      <ul
        class="list-wrapper"
        v-if="list.length && !isLoading && !isGetError"
      >
        <li
          class="align-items"
          v-for="(item, index) in list"
          :key="index"
        >
          <!-- Traffic light index -->
          <index-disc> {{ index + 1 }} </index-disc>

          <!-- Traffic light name -->
          <div class="title special-text bold-text"> {{ item.name }} </div>

          <!-- Traffic light component -->
          <traffic-light :settings="settings" />

          <div class="button-group align-items justify-space-bewteen">
            <!-- Edit button -->
            <create-modal
              :item="item.name"
              :mode="`edit`"
              @reloadPage="loadContent"
            />

            <div class="separator"></div>

            <!-- Delete button -->
            <delete-modal
              :item="item.name"
              @reloadPage="loadContent"
            >
            </delete-modal>
          </div>
        </li>
      </ul>
    </div>

    <!-- Loader for waiting state -->
    <loader
      v-if="isLoading && !isGetError"
      :title="`loading data...`"
      :body="`Please wait for a while, we are preparing your traffic light data settings...`"
    />
  </wrapper-card>
</template>

<style lang="scss" scoped>  
  @import '@/styles/common.scss';

  .list {
    margin: $spacer-lg auto;
    width: 1080px;

    .card-title {
      .right-panel {
        .button {
          margin-right: $spacer-sm;
        }
      }
    }

    .card-body {
      .list-wrapper {
        display: grid;
        grid-template-columns: 24% 24% 24% 24%;
        gap: $spacer;
        margin-bottom: $spacer-mxl;
        width: 100%;

        li {
          min-width: 200px;
          background: $white;
          border-radius: $spacer-sm;
          flex-direction: column;
          padding: $spacer-md;
          cursor: pointer;
          position: relative;

          &:hover {
            background-color: $light-blue;
          }

          .title {
            margin-bottom: $spacer-sm;
            font-size: $font-size-lg;
          }

          .index-disc {
            position: absolute;
            top: $spacer-md;
            left: $spacer-md;
          }

          .button-group {
            margin-top: $spacer;
            width: 100%;

            .separator {
              width: 6px;
              height: 6px;
              background-color: $black;
              border-radius: 100%;
            }
          }
        }
      }
    }
  }
</style>
