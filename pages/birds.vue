<template>
  <section class="section">
    <b-button
      :outlined="!allEnabled"
      @click="setAll(!allEnabled)"
      class="is-reversed"
      type="is-primary"
    >
      Toggle All
    </b-button>

    <div v-for="({ families }, order) in settings.orders" :key="order" class="card">
      <div class="card-content">
        <h3 class="title is-3 is-marginless">
          {{ order }}
          <b-button
            :outlined="!orderEnabled[order]"
            @click="setOrder({ order, enabled: !orderEnabled[order] })"
            class="is-reversed is-vcentered"
            size="is-small"
            type="is-primary"
          >
            Toggle All
          </b-button>
        </h3>
        <div v-for="family in families" :key="family" class="subtitled">
          <h5 class="subtitle is-5 is-gray is-marginless">
            {{ family }} ({{ settings.families[family].commonName }})
            <b-button
              :outlined="!familyEnabled[family]"
              @click="setFamily({ family, enabled: !familyEnabled[family] })"
              size="is-small"
              class="is-reversed"
              type="is-primary"
            >
              Toggle All
            </b-button>
          </h5>
          <div class="buttons">
            <b-button
              v-for="species in settings.families[family].species"
              :key="species"
              :outlined="!settings.species[species].enabled"
              @click="setSpecies({ code: species, enabled: !settings.species[species].enabled })"
              class="is-reversed"
              type="is-primary"
            >
              {{ settings.species[species].commonName }}
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      settings: state => state.settings
    }),
    ...mapGetters({
      allEnabled: 'settings/allEnabled',
      orderEnabled: 'settings/orderEnabled',
      familyEnabled: 'settings/familyEnabled'
    })
  },
  methods: {
    ...mapMutations({
      setSpecies: 'settings/setSpecies',
      setFamily: 'settings/setFamily',
      setAll: 'settings/setAll'
    }),
    ...mapActions({
      setOrder: 'settings/setOrder'
    })
  }
}
</script>
