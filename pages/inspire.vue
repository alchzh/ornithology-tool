<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "Just start  <b-icon
        icon="rocket"
        size="is-large"
      />"
    </h2>
    <b-collapse :open="true" aria-id="filtersForm">
      <b-button
        slot="trigger"
        class="button is-primary"
        aria-controls="filtersForm"
      >
        Show Filters
      </b-button>
      <form class="tile is-ancestor">
        <b-field v-for="(group, groupId) in settings.filterGroups" :key="groupId" :label="group.label" class="tile is-parent is-vertical">
          <b-field v-for="(filter, filterId) in group.filters" :key="`${groupId}_${filterId}`">
            <b-checkbox :value="filter.enabled" @input="setFilter({ groupId, filterId, value: $event })">
              {{ filter.label }}
            </b-checkbox>
          </b-field>
        </b-field>
      </form>
    </b-collapse>
    <b-button @click="getRandomMedia">
      Get new bird
    </b-button>
    <div v-if="currentMedia">
      <pre>{{ rawCurrentMedia }}</pre>
      <img v-if="currentMedia.mediaType === 'Photo'" :src="currentMedia.previewUrl">
      <video
        v-else-if="currentMedia.mediaType === 'Video'"
        :src="currentMedia.mediaUrl"
        :poster="currentMedia.previewUrl"
        controls
        preload="metadata"
        style="height: 360px; width: 640px;"
      />
    </div>
    <h3 class="subtitle is-6 has-text-grey">
      Author: <a href="https://github.com/anteriovieira">
        Antério Vieira
      </a>
    </h3>
    <pre>{{ JSON.stringify(allFilters) }}</pre>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      currentMedia: 'currentMedia',
      settings: state => state.settings
    }),
    ...mapGetters({
      rawCurrentMedia: 'rawCurrentMedia',
      allFilters: 'settings/allFilters'
    })
  },
  methods: {
    log: console.log.bind(console),
    ...mapActions({
      getRandomMedia: 'getRandomMedia'
    }),
    ...mapMutations({
      setFilter: 'settings/setFilter',
      setSpecies: 'settings/setSpecies'
    })
  }
}
</script>
