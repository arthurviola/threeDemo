const state = {
    version: '0.1',
    scale: 1,
    loadProgress: false,
    levelName: '',
    cameraControl: 'orbit'
}

const mutations = {
    SET_VERSION: (state, version) => {
        state.version = version
    },
    SET_SCALE: (state, scale) => {
        state.scale = scale
    },
    SET_LOADPROGRESS: (state, loadProgress) => {
        state.loadProgress = loadProgress
    },
    SET_LEVELNAME: (state, levelName) => {
        state.levelName = levelName
    },
    SET_CAMERACONTROL: (state, cameraControl) => {
        state.cameraControl = cameraControl
    }
}

const actions = {
    setVersion ({ commit }, version) {
        commit('SET_VERSION', version)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
