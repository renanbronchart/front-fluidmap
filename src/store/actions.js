import * as types from '@/store/mutationTypes.js'

export const selectPlaces = ({ commit }, place) => {
  commit(types.SELECT_PLACE, {
    placeSelected: place
  })
}
