<template>
  <section class="section">
    <b-button
      :outlined="!allEnabled"
      @click="setAll(!allEnabled)"
      type="is-primary"
    >
      Toggle All
    </b-button>

    <div v-for="({ families }, order) in settings.orders" :key="order">
      <h3 class="title is-3">
        {{ order }}
        <b-button
          :outlined="!orderEnabled[order]"
          @click="setOrder({ order, enabled: !orderEnabled[order] })"
          type="is-primary"
        >
          Toggle All
        </b-button>
      </h3>
      <div v-for="family in families" class="subtitled" :key="family">
        <h5 class="subtitle is-5">
          {{ family }} ({{ settings.families[family].commonName }})
          <b-button
            :outlined="!familyEnabled[family]"
            @click="setFamily({ family, enabled: !familyEnabled[family] })"
            type="is-primary"
          >
            Toggle All
          </b-button>
        </h5>
        <b-button
          v-for="species in settings.families[family].species"
          :key="species"
          :outlined="!settings.species[species].enabled"
          @click="setSpecies({ code: species, enabled: !settings.species[species].enabled })"
          type="is-primary"
        >
          {{ settings.species[species].commonName }}
        </b-button>
      </div>
    </div>
  </section>
</template>

<style>
.subtitled:first-of-type > .subtitle {
  margin-top: -1.25em;
}
</style>

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
      setSpecies: 'settings/setSpecies'
    }),
    ...mapActions({
      setAll: 'settings/setAll',
      setOrder: 'settings/setOrder',
      setFamily: 'settings/setFamily'
    })
  }
}
</script>
