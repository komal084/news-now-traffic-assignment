<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { ListItem } from '@/models'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import InputBox from '@/components/InputBox.vue'
import SubmitResultMessage from '@/components/SubmitResultMessage.vue'
import SubmitFailureMessage from '@/components/SubmitFailureMessage.vue'

export default Vue.extend({
  name: 'CreateModal',

  components: {
    'action-button': Button,
    'input-box': InputBox,
    'submit-result-message': SubmitResultMessage,
    'submit-failure-message': SubmitFailureMessage,
    Modal
  },

  props: {
    isLargeButton: {
      type: Boolean,
      required: false,
      default: false
    },

    mode: {
      type: String,
      required: false,
      default: ''
    },

    item: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      isAddComplete: false,
      isAddFailed: false,
      name: '',
      isNameErrored: false,
      nameErrorMessages: [],
      list: []
    }
  },

  computed: {
    ...mapGetters(['currentList', 'isLoading']),

    isDisabledSubmit (): boolean {
      return this.$data.isNameErrored || this.$data.name === '';
    }
  },

  methods: {
    ...mapActions(['updateCurrentList']),

    onActivatorClick (openModal: () => void) {
      this.$data.name = this.$props.mode === 'edit' ? this.$props.item : '';
      this.$data.isNameErrored = false;
      this.$data.nameErrorMessages = [];
      openModal();
    },

    updateName (selectedName: string) {
      this.$data.nameErrorMessages = [];

      const isDuplicate = this.currentList.filter((item: ListItem) => item.name === selectedName).length > 0;

      if (selectedName) {
        this.$data.name = selectedName;

        if (isDuplicate) {
          this.$data.isNameErrored = true;
          this.$data.nameErrorMessages.push('This traffic light name already exists.');
        } else if (this.$data.name.length > 12) {
          this.$data.isNameErrored = true;
          this.$data.nameErrorMessages.push('Maximum 12 characters allowed.');
        } else {
          this.$data.isNameErrored = false;
          this.$data.nameErrorMessages = [];
        }
      } else {
        this.$data.name = '';
        this.$data.isNameErrored = true;
        this.$data.nameErrorMessages.push('This field cannot be empty.');
      }
    },

    UpdateList (closeModal: () => void) {
      this.$data.list = this.currentList ? [ ...this.currentList ] : [];
      
      if (this.$props.mode === 'edit') {
        const editItemIndex = this.$data.list.findIndex((i: ListItem) => i.name === this.$props.item);

        if (editItemIndex > -1) {
          this.$data.list[editItemIndex].name = this.$data.name;
        }
      } else {
        this.$data.list.push({
          name: this.$data.name,
          status: 'RED'
        });
      }

      this.updateCurrentList(this.$data.list).then(() => {
        console.log('Successfully added new traffic light in the list.');
        this.$data.isAddComplete = true;
        this.$data.isAddFailed = false;

        setTimeout(() => {
          this.$data.isAddComplete = false;
          closeModal();
          this.$emit('reloadPage');
        }, 3000);
      }).catch((error: Error) => {
        console.error('Failed to add new traffic light in the list.', error);
        this.$data.isAddComplete = false;
        this.$data.isAddFailed = true;

        setTimeout(() => {
          this.$data.isAddFailed = false;
          closeModal();
          this.$emit('reloadPage');
        }, 3000);
      });
    }
  }
});
</script>

<template>
  <modal :size="`sm`">

    <!-- Modal activator section -->
    <template v-slot:activator="{ openModal }">
      <action-button
        :isLarge="isLargeButton"
        :isDisabled="isLoading"
        @click="onActivatorClick(openModal)"
      >
        <i
          class="icon"
          :class="[ mode === 'edit' ? 'icon-pencil-create' : 'icon-alert-close' ]"
        />
        <span> {{ mode === 'edit' ? 'Edit' : 'Add new traffic light' }} </span>
      </action-button>
    </template>

    <!-- Modal header section -->
    <template v-slot:modalHeader>
      <span v-if="!isAddComplete && !isAddFailed && mode !== 'edit'"> Add new traffic light </span>
      <span v-if="!isAddComplete && !isAddFailed && mode === 'edit'"> Edit traffic light </span>
      <span v-if="isAddComplete && !isAddFailed"> Success! </span>
      <span v-if="!isAddComplete && isAddFailed"> Error! </span>
    </template>

    <!-- Modal body section -->
    <template>
      <div
        class="create-form-container"
        v-if="!isAddComplete && !isAddFailed"
      >
        <input-box
          :placeholder="`Please enter text...`"
          :label="`Traffic light name`"
          :value="name"
          @input="updateName($event)"
          :error="isNameErrored"
          :errorMessages="nameErrorMessages"
        />
      </div>

      <submit-result-message v-if="isAddComplete && !isAddFailed">
        <span class="special-text bold-text"> {{ name }} </span>
        <br/>
        {{ mode === 'edit' ? 'is been updated successfully..!!' : 'is been added successfully..!!' }}
      </submit-result-message>

      <submit-failure-message v-if="!isAddComplete && isAddFailed">
        Sorry, this action could not be completed due to server error..!!
      </submit-failure-message>
    </template>

    <!-- Modal footer section -->
    <template
      v-slot:modalFooter="{ closeModal }"
      v-if="!isAddComplete && !isAddFailed"
    >
      <div class="button-group align-items">
        <action-button
          isOutlined
          @click="closeModal"
        >
          <i class="icon icon-clear" />
          Cancel
        </action-button>

        <action-button
          :isDisabled="isDisabledSubmit"
          @click="UpdateList(closeModal)"
        >
          <i class="icon icon-check" />
          {{ mode === 'edit' ? 'Update' : 'Confirm' }}
        </action-button>
      </div>
    </template>
  </modal>
</template>

<style lang="scss" scoped>
  @import '@/styles/common.scss';
</style>
