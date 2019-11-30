export const state = () => ({
  filterGroups: {
    age: {
      filters: {
        a: { label: 'Adult', enabled: false },
        i: { label: 'Immature', enabled: false },
        j: { label: 'Juvenile', enabled: false },
        u: { label: 'Unknown', enabled: false }
      },
      label: 'Age'
    },
    sex: {
      filters: {
        m: { label: 'Male', enabled: false },
        f: { label: 'Female', enabled: false },
        u: { label: 'Unknown', enabled: false }
      },
      label: 'Sex'
    },
    beh: {
      filters: {
        e: { label: 'Foraging or Eating', enabled: false },
        f: { label: 'Flying', enabled: false },
        p: { label: 'Preening', enabled: false }
      },
      label: 'Behaviors'
    },
    bre: {
      filters: {
        cdc: { label: 'Courtship, Display, or Copulation', enabled: false },
        fy: { label: 'Feeding Young', enabled: false },
        cf: { label: 'Carrying Food', enabled: false },
        cfs: { label: 'Carrying Fecal Sac', enabled: false },
        nb: { label: 'Nest Building', enabled: false }
      },
      label: 'Breeding'
    },
    behaviors: {
      filters: {
        s: { label: 'Song', enabled: false },
        c: { label: 'Call', enabled: false },
        nv: { label: 'Non-vocal', enabled: false },
        ds: { label: 'Dawn Song', enabled: false },
        fs: { label: 'Flight Song', enabled: false },
        fc: { label: 'Flight Call', enabled: false },
        dt: { label: 'Duet', enabled: false }
      },
      label: 'Sounds'
    },
    tag: {
      filters: {
        dt: { label: 'Duet', enabled: false },
        env: { label: 'Environmental', enabled: false },
        peo: { label: 'People', enabled: false },
        mul: { label: 'Multiple species', enabled: false },
        in: { label: 'In-hand', enabled: false },
        nes: { label: 'Nest', enabled: false },
        egg: { label: 'Egg(s)', enabled: false },
        hab: { label: 'Habitat', enabled: false },
        wat: { label: 'Watermark', enabled: false },
        bac: { label: 'Back of camera', enabled: false },
        dea: { label: 'Dead', enabled: false },
        fie: { label: 'Field notes/sketch', enabled: false },
        non: { label: 'No bird', enabled: false }
      },
      label: 'Photo tags'
    },
    includeUnconfirmed: {
      filters: {
        T: { label: 'Show Unconfirmed', enabled: false },
        O: { label: 'Only Unconfirmed', enabled: false }
      },
      label: 'Status'
    }
  }
})

export const mutations = {
  setFilter (state, { groupId, filterId, value }) {
    state.filterGroups[groupId].filters[filterId].enabled = value
  },
  setFilterGroups (state, filterGroups) {
    state.filterGroups = filterGroups
  }
}

function getEnabledAsList (filterGroup) {
  return Object.keys(filterGroup.filters).filter(filter => filterGroup.filters[filter].enabled)
}

export const getters = {
  allFilters (state) {
    const mapped = {}

    for (const group in state.filterGroups) {
      mapped[group] = getEnabledAsList(state.filterGroups[group])
    }

    return mapped
  }
}
