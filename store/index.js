import { stringify } from 'qs'

export const state = () => ({
  enabledBirds: [{ taxonCode: 'wanalb' }, { taxonCode: 'molfly1' }],
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
  async getRandomBird ({ commit, state, rootGetters }) {
    let results

    do {
      const taxonCode = getRandom(state.enabledBirds).taxonCode

      results = await this.$axios.$get(state.baseUrl, {
        params: { taxonCode, ...rootGetters['settings/allFilters'] },
        paramsSerializer: params => stringify(params, { indices: false })
      }).results
    } while (!results || results.length === 0)

    commit('setCurrentMedia', getRandom(results.content))
  }
}
