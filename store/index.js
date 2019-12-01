import { stringify } from 'qs'

export const state = () => ({
  currentMedia: null,
  baseUrl: 'https://ebird.org/media/catalog.json' // or https://search.macaulaylibrary.org/catalog.json
})

export const mutations = {
  setCurrentMedia (state, media) {
    state.currentMedia = media
  }
}

export const getters = {
  rawCurrentMedia (state) {
    return JSON.stringify(state.currentMedia)
  }
}

function getRandom (arr) {
  return arr[Math.floor((Math.random() * arr.length))]
}

export const actions = {
  async getRandomMedia ({ commit, state, rootGetters }) {
    const taxonCode = getRandom(rootGetters['settings/enabledSpecies'])
    const results = (await this.$axios.$get(state.baseUrl, {
      params: { taxonCode, ...rootGetters['settings/allFilters'] },
      paramsSerializer: params => stringify(params, { indices: false })
    })).results

    commit('setCurrentMedia', getRandom(results.content))
  }
}
