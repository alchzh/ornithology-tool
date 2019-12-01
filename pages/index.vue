<template>
  <section class="section">
    <b-collapse :open="false" aria-id="filtersForm" class="card">
      <div
        slot="trigger"
        slot-scope="props"
        class="card-header"
        role="button"
        aria-controls="filtersForm"
      >
        <p class="card-header-title">
          Filters
        </p>
        <a class="card-header-icon">
          <b-icon
            :icon="props.open ? 'menu-down' : 'menu-up'"
          />
        </a>
      </div>
      <div class="card-content">
        <div class="columns is-multiline">
          <div v-for="(group, groupId) in settings.filterGroups" class="panel column">
            <p class="panel-heading">
              {{ group.label }}
            </p>
            <div v-for="(filter, filterId) in group.filters" :key="`${groupId}_${filterId}`" class="panel-block">
              <b-checkbox :value="filter.enabled" @input="setFilter({ groupId, filterId, value: $event })">
                {{ filter.label }}
              </b-checkbox>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>

    <pre>{{ JSON.stringify(allFilters) }}</pre>

    <div class="box has-margin-top-5">
      <b-button @click="getRandomMedia">
        Get new bird
      </b-button>
      <div v-if="currentMedia" class="columns is-multiline is-vcentered">
        <div class="column is-two-thirds">
          <div class="columns is-centered">
            <div class="column is-narrow">
              <v-zoomer v-if="currentMedia.mediaType === 'Photo'" style="height: 360px; cursor: zoom-in;">
                <img :src="currentMedia.previewUrl" draggable="false" ondragstart="return false;">
              </v-zoomer>
              <video
                v-else-if="currentMedia.mediaType === 'Video'"
                :src="currentMedia.mediaUrl"
                :poster="currentMedia.previewUrl"
                controls
                preload="metadata"
                style="height: 360px;"
              />
              <h6 class="subtitle is-6">
                © {{ currentMedia.userDisplayName }} | {{ currentMedia.obsDttm }}<br>
                Macaulay Library ML{{ currentMedia.catalogId }} | eBird Checklist {{ currentMedia.eBirdChecklistId }}
              </h6>
            </div>
          </div>
        </div>
        <div class="column is-one-third panel">
          <p class="panel-heading">
            What is this bird?
          </p>
          <a
            v-for="(choice, idx) in choices"
            :key="idx"
            @click="submitAnswer(idx)"
            :class="{'is-danger': choice.status === 'wrong', 'is-success': choice.status === 'correct'}"
            class="panel-block"
          >
            {{ settings.species[choice.species].commonName }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import { random, sample, sampleSize } from 'lodash'
import { stringify } from 'qs'

export default {
  data () {
    return {
      currentMedia: null,
      correctIndex: null,
      choices: null,
      submitted: null,
      baseUrl: 'https://ebird.org/media/catalog.json'
    }
  },
  computed: {
    ...mapState({
      settings: state => state.settings
    }),
    ...mapGetters({
      allFilters: 'settings/allFilters',
      enabledSpecies: 'settings/enabledSpecies'
    }),
    rawCurrentMedia () {
      return JSON.stringify(this.currentMedia)
    }
  },
  methods: {
    log: console.log.bind(console),

    async getRandomMedia () {
      const choices = sampleSize(this.enabledSpecies, 4)
      const idx = random(choices.length - 1)

      const results = (await this.$axios.$get(this.baseUrl, {
        params: { taxonCode: choices[idx], ...this.allFilters },
        paramsSerializer: params => stringify(params, { indices: false })
      })).results

      this.currentMedia = sample(results.content)
      this.choices = choices.map(choice => ({ species: choice, status: null }))
      this.correctIndex = idx
      this.submitted = false
    },
    submitAnswer (idx) {
      if (this.submitted) {
        return
      }

      if (idx !== this.correctIndex) {
        this.choices[idx].status = 'wrong'
      }

      this.choices[this.correctIndex].status = 'correct'

      this.submitted = true
    },
    ...mapMutations({
      setFilter: 'settings/setFilter',
      setSpecies: 'settings/setSpecies'
    })
  }
}
</script>
