import { App } from '@/core/vue'
import tasks from '@/api/tasks'

export default {
  namespaced: true,

  state: {
    list: [],
    data: {},

    projectId: null,

    isLoading: true

  },

  getters: {
    projectId () {
      return App.$route.params.projectId
    },

    params (state, getters) {
      return {
        projectId: getters.projectId
      }
    }
  },

  mutations: {
    setDataSource (state, dataSource) {
      const data = {}
      state.list = []

      dataSource.forEach(item => {
        state.list.push(item.id)
        data[item.id] = item
      })

      state.data = data
    },

    reset (state) {
      state.list = []
      state.data = {}
    },

    addItem (state, item) {
      state.list.splice(0, 0, item.id)
      App.$set(state.data, item.id, item)
    },

    destroyItem (state, id) {
      App.$delete(state.data, id)
      state.list.splice(state.list.indexOf(id), 1)
    },

    updateComment (state, {id, comment}) {
      state.data[id].comment = comment
    },

    updateStatus (state, {id, status}) {
      state.data[id].status = status
    },

    updateDuetime (state, {id, duetime}) {
      state.data[id].duetime = duetime
    },

    addArea (state, {taskId, areaId}) {
      App.$set(state.data[taskId].areas, areaId, {
        task_id: taskId,
        area_id: areaId,
        location_id: null,
        location: {}
      })
    },

    removeArea (state, {taskId, areaId}) {
      App.$delete(state.data[taskId].areas, areaId)
    },

    updateAreaLocation (state, {taskId, areaId, locationId, location}) {
      state.data[taskId].areas[areaId].location_id = locationId
      state.data[taskId].areas[areaId].location = location
    },

    startLoading (state) {
      state.isLoading = true
    },

    finishLoading (state) {
      state.isLoading = false
    }

  },

  actions: {
    async search ({getters, commit}) {
      const params = {}
      commit('startLoading')
      try {
        commit('setDataSource', await tasks.search({
          ...params,
          ...getters.params
        }))
      } finally {
        commit('finishLoading')
      }
    },

    async destroy ({commit}, params) {
      await tasks.destroy(params)
      commit('destroyItem', params.id)
    },

    async create({commit}, params) {
      const item = await tasks.create(params)
      commit('addItem', item)

      return item.id
    },

    async updateComment ({commit}, params) {
      await tasks.updateComment(params)
      commit('updateComment', params)
    },

    async updateStatus ({commit}, params) {
      await tasks.updateStatus(params)
      commit('updateStatus', params)
    },

    async updateDuetime ({commit}, params) {
      await tasks.updateDuetime(params)
      commit('updateDuetime', params)
    },

    async addArea ({commit}, params) {
      await tasks.addArea(params)
      commit('addArea', params)
    },

    async removeArea ({commit}, params) {
      await tasks.removeArea(params)
      commit('removeArea', params)
    },

    async updateAreaLocation ({commit}, params) {
      commit('updateAreaLocation', {
        ...params,
        location: await tasks.updateAreaLocation(params)
      }) 
    }
  }
}
