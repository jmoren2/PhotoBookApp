import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '../store/auth/auth'
import { albumInfo } from '../store/albums/albums'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    albumInfo
  }
})
