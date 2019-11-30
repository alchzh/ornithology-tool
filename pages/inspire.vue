<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "Just start  <b-icon
        icon="rocket"
        size="is-large"
      />"
    </h2>
    <form>
      <b-field v-for="(group, groupId) in filterGroups" :label="group.label" :key="groupId">
        <b-checkbox v-for="(filter, filterId) in group.filters" :value="filter.enabled" @input="setFilter({ groupId, filterId, value: $event })" :key="groupId + filterId">
          {{ filter.label }}
        </b-checkbox>
      </b-field>
    </form>
    <b-button @click="getRandomBird">
      Get new bird
    </b-button>
    <div v-if="currentMedia">
      <pre>{{ rawCurrentMedia }}</pre>
      <img v-if="currentMedia.mediaType === 'Photo'" :src="currentMedia.previewUrl" />
      <video
        v-else-if="currentMedia.mediaType === 'Video'"
        controls
        :src="currentMedia.mediaUrl"
        :poster="currentMedia.previewUrl"
        preload="metadata"
        style="height: 360px; width: 640px;">
      </video>
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
      filterGroups: state => state.settings.filterGroups
    }),
    ...mapGetters({
      rawCurrentMedia: 'rawCurrentMedia',
      allFilters: 'settings/allFilters'
    })
  },
  methods: {
    log: console.log.bind(console),
    ...mapActions({
      getRandomBird: 'getRandomBird'
    }),
    ...mapMutations({
      setFilter: 'settings/setFilter'
    })
  }
}
</script>
