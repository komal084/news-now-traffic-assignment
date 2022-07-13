import { ActionContext } from 'vuex'
import { SettingStore, Store, ListItem } from '@/models';

const state = {
  isLoading: false,
  currentList: []
};

const getters = {
  isLoading (state: SettingStore): boolean {
    return state.isLoading;
  },

  currentList (state: SettingStore): ListItem[] {
    return state.currentList;
  }
};

const mutations = {
  setIsLoading (state: SettingStore, isLoading: boolean): void {
    state.isLoading = isLoading;
  },

  setCurrentList (state: SettingStore, list: ListItem[]): void {
    state.currentList = list;
  }
};

const actions = {
  async loadContent (action: ActionContext<SettingStore, Store>): Promise<void> {
    action.commit('setIsLoading', true);
    action.commit('setCurrentList', state.currentList);
    action.commit('setIsLoading', false);
  },

  updateCurrentList (action: ActionContext<SettingStore, Store>, currentList: ListItem[]): void {
    action.commit('setCurrentList', currentList);
  }
};

export const list = {
  state,
  getters,
  mutations,
  actions
};
