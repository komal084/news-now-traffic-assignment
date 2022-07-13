import Vue from 'vue'
import Vuex from 'vuex'
import { Store } from '@/models'
import { list } from '@/store/list'

Vue.use(Vuex)

export default new Vuex.Store<Store>({
  modules: {
    list
  }
});
